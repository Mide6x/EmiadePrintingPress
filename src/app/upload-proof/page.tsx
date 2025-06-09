"use client";

import { useState } from "react";
import { CreditCard, Upload, CheckCircle } from "lucide-react";
import FileUploader from "../../../components/ui/FileUploader";

export default function UploadProofPage() {
  const [orderId, setOrderId] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
  };

  const handleSubmit = () => {
    if (!orderId.trim()) {
      alert("Please enter your order ID");
      return;
    }

    if (uploadedFiles.length === 0) {
      alert("Please upload your payment proof");
      return;
    }

    // Here you would typically send the files to your backend
    console.log("Payment proof submitted:", { orderId, files: uploadedFiles });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Proof Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for uploading your payment proof. Our team will verify
              your payment and update your order status within 24 hours.
            </p>
            <div className="space-y-2 text-sm text-gray-500">
              <p>
                Order ID: <span className="font-medium">{orderId}</span>
              </p>
              <p>
                Files uploaded:{" "}
                <span className="font-medium">{uploadedFiles.length}</span>
              </p>
            </div>
            <div className="mt-6">
              <a
                href="/track-order"
                className="btn-primary inline-flex items-center"
              >
                Track Your Order
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <CreditCard className="h-12 w-12 text-purple-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Payment Proof
          </h1>
          <p className="text-lg text-gray-600">
            Upload a screenshot or photo of your payment confirmation to verify
            your order
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          {/* Order ID Input */}
          <div>
            <label
              htmlFor="orderId"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Order ID *
            </label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your order ID (e.g., EPC-2024-001)"
              className="input-field"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              You can find your order ID in the confirmation email we sent you
            </p>
          </div>

          {/* File Upload */}
          <FileUploader
            type="payment-proof"
            onFileUpload={handleFileUpload}
            maxFiles={3}
            maxSizePerFile={5}
            acceptedTypes={[".jpg", ".jpeg", ".png", ".pdf"]}
          />

          {/* Bank Details */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-3">
              Bank Transfer Details
            </h3>
            <div className="space-y-2 text-sm text-blue-700">
              <div className="flex justify-between">
                <span>Bank Name:</span>
                <span className="font-medium">First Bank of Nigeria</span>
              </div>
              <div className="flex justify-between">
                <span>Account Number:</span>
                <span className="font-medium">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span>Account Name:</span>
                <span className="font-medium">Emiade Printing Company Ltd</span>
              </div>
              <div className="flex justify-between">
                <span>Sort Code:</span>
                <span className="font-medium">011</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-amber-800 mb-2">
              Important Instructions
            </h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>
                • Include your order ID in the payment reference/narration
              </li>
              <li>
                • Upload a clear screenshot showing the transaction details
              </li>
              <li>• Ensure the amount, date, and reference are visible</li>
              <li>• We will verify your payment within 24 hours</li>
            </ul>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Upload className="h-4 w-4 mr-2" />
            Submit Payment Proof
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact us at{" "}
            <a
              href="mailto:design@presscompany.com?subject=Payment Verification Help"
              className="text-purple-600 hover:text-purple-700"
            >
              design@presscompany.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
