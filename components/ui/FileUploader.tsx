"use client";

import { useState, useRef } from "react";
import {
  Upload,
  X,
  FileText,
  Image,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface FileUploaderProps {
  type: "design" | "payment-proof";
  onFileUpload?: (files: File[]) => void;
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
  acceptedTypes?: string[];
}

interface UploadedFile {
  file: File;
  id: string;
  preview?: string;
  status: "uploading" | "success" | "error";
  progress: number;
}

const FileUploader = ({
  type,
  onFileUpload,
  maxFiles = 5,
  maxSizePerFile = 10,
  acceptedTypes = type === "design"
    ? [".pdf", ".ai", ".psd", ".jpg", ".jpeg", ".png", ".svg"]
    : [".jpg", ".jpeg", ".png", ".pdf"],
}: FileUploaderProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach((file) => {
      // Check file count
      if (uploadedFiles.length + validFiles.length >= maxFiles) {
        errors.push(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Check file size
      if (file.size > maxSizePerFile * 1024 * 1024) {
        errors.push(
          `${file.name} is too large. Maximum size is ${maxSizePerFile}MB`
        );
        return;
      }

      // Check file type
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        errors.push(`${file.name} is not a supported file type`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join("\n"));
    }

    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const uploadFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map((file) => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      status: "uploading",
      progress: 0,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadedFile) => {
      simulateUpload(uploadedFile.id);
    });

    onFileUpload?.(files);
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles((prev) =>
        prev.map((file) => {
          if (file.id === fileId) {
            const newProgress = Math.min(
              file.progress + Math.random() * 30,
              100
            );
            return {
              ...file,
              progress: newProgress,
              status: newProgress === 100 ? "success" : "uploading",
            };
          }
          return file;
        })
      );
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setUploadedFiles((prev) =>
        prev.map((file) =>
          file.id === fileId
            ? { ...file, progress: 100, status: "success" }
            : file
        )
      );
    }, 2000);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension || "")) {
      return <Image className="h-5 w-5 text-blue-500" />;
    }
    return <FileText className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {type === "design" ? "Upload Design Files" : "Upload Payment Proof"}
        </h3>
        <p className="text-sm text-gray-600">
          {type === "design"
            ? "Upload your design files or let our team create designs for you"
            : "Upload a screenshot or photo of your payment confirmation"}
        </p>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? "border-purple-500 bg-purple-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={acceptedTypes.join(",")}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 mb-2">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Supported formats: {acceptedTypes.join(", ")}
        </p>
        <p className="text-xs text-gray-400">
          Maximum {maxFiles} files, {maxSizePerFile}MB per file
        </p>
      </div>

      {/* File List */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-900">Uploaded Files</h4>
          {uploadedFiles.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
            >
              {uploadedFile.preview ? (
                <img
                  src={uploadedFile.preview}
                  alt={`Preview of ${uploadedFile.file.name}`}
                  className="h-10 w-10 object-cover rounded"
                />
              ) : (
                getFileIcon(uploadedFile.file.name)
              )}

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(uploadedFile.file.size / 1024 / 1024).toFixed(2)} MB
                </p>

                {uploadedFile.status === "uploading" && (
                  <div className="mt-1">
                    <div className="bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadedFile.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Uploading... {Math.round(uploadedFile.progress)}%
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {uploadedFile.status === "success" && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {uploadedFile.status === "error" && (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <button
                  onClick={() => removeFile(uploadedFile.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Design Assistance */}
      {type === "design" && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-blue-800">
                Need Design Help?
              </h4>
              <p className="text-sm text-blue-700 mt-1">
                Don&apos;t have design files? Our professional designers can
                create stunning designs for you.
              </p>
              <div className="mt-3">
                <a
                  href="mailto:design@presscompany.com?subject=Design Assistance Request"
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md transition-colors"
                >
                  Contact Designer
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Instructions */}
      {type === "payment-proof" && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-amber-800">
                Payment Instructions
              </h4>
              <p className="text-sm text-amber-700 mt-1">
                After making your bank transfer, upload a clear screenshot or
                photo of your payment confirmation. Include the transaction
                reference number if visible.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
