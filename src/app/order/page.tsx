"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import QuoteCalculator from "../../../components/ui/PriceCalculator";
import FileUploader from "../../../components/ui/FileUploader";
import SuccessModal from "../../../components/ui/SuccessModal";

interface OrderData {
  product: string;
  subcategory: string;
  quantity: number;
  specifications: {
    size: string;
    material: string;
    urgency: string;
  };
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  files: File[];
}

interface ProductCategory {
  id: string;
  name: string;
  subcategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  basePrice: number;
}

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [orderData, setOrderData] = useState<OrderData>({
    product: "",
    subcategory: "",
    quantity: 100,
    specifications: {
      size: "standard",
      material: "standard",
      urgency: "standard",
    },
    customerInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
    files: [],
  });

  const productCategories: ProductCategory[] = [
    {
      id: "other-boxes",
      name: "Other Boxes",
      subcategories: [
        { id: "paperbags", name: "Paper Bags", basePrice: 50 },
        { id: "corrugated-boxes", name: "Corrugated Boxes", basePrice: 80 },
        { id: "kraft-boxes", name: "Kraft Boxes", basePrice: 60 },
        { id: "display-boxes", name: "Display Boxes", basePrice: 100 },
        { id: "box-inserts", name: "Box Inserts", basePrice: 40 },
        { id: "packaging-sleeves", name: "Packaging Sleeves", basePrice: 30 },
        { id: "full-stamping", name: "Full Stamping", basePrice: 120 },
        { id: "paper-boxes", name: "Paper Boxes", basePrice: 70 },
      ],
    },
    {
      id: "rigid-box",
      name: "Rigid Box",
      subcategories: [
        { id: "rigid-boxes", name: "Rigid Boxes", basePrice: 150 },
        {
          id: "collapsible-rigid-boxes",
          name: "Collapsible Rigid Boxes",
          basePrice: 130,
        },
        {
          id: "magnetic-closure-rigid-boxes",
          name: "Magnetic Closure Rigid Boxes",
          basePrice: 180,
        },
        {
          id: "telescope-rigid-boxes",
          name: "Telescope Rigid Boxes",
          basePrice: 200,
        },
      ],
    },
    {
      id: "folding-carton-box",
      name: "Folding Carton Box",
      subcategories: [
        {
          id: "folding-carton-boxes",
          name: "Folding Carton Boxes",
          basePrice: 90,
        },
        { id: "retail-paper-boxes", name: "Retail Paper Boxes", basePrice: 75 },
        {
          id: "medical-paper-boxes",
          name: "Medical Paper Boxes",
          basePrice: 85,
        },
        {
          id: "cosmetic-paper-boxes",
          name: "Cosmetic Paper Boxes",
          basePrice: 95,
        },
      ],
    },
    {
      id: "cards",
      name: "Cards",
      subcategories: [
        { id: "flash-cards", name: "Flash Cards", basePrice: 40 },
        { id: "game-cards", name: "Game Cards", basePrice: 35 },
        { id: "playing-cards", name: "Playing Cards", basePrice: 30 },
        { id: "gaming-cards", name: "Gaming Cards", basePrice: 45 },
        { id: "scratch-off-cards", name: "Scratch Off Cards", basePrice: 50 },
        { id: "affirmation-cards", name: "Affirmation Cards", basePrice: 40 },
        { id: "conversation-cards", name: "Conversation Cards", basePrice: 40 },
        { id: "tarot-cards", name: "Tarot Cards", basePrice: 55 },
        { id: "oracle-cards", name: "Oracle Cards", basePrice: 55 },
      ],
    },
    {
      id: "calendar",
      name: "Calendar",
      subcategories: [
        { id: "wall-calendar", name: "Wall Calendar", basePrice: 120 },
        { id: "desk-calendar", name: "Desk Calendar", basePrice: 80 },
        {
          id: "three-month-calendar",
          name: "Three-Month Calendar",
          basePrice: 100,
        },
        { id: "deskpad-calendar", name: "Deskpad Calendar", basePrice: 90 },
        {
          id: "magnetic-dry-erase-calendar",
          name: "Magnetic Dry Erase Calendar",
          basePrice: 150,
        },
      ],
    },
    {
      id: "flyer-poster",
      name: "Flyer & Poster",
      subcategories: [
        { id: "flyer", name: "Flyer", basePrice: 25 },
        { id: "brochure", name: "Brochure", basePrice: 60 },
        { id: "poster", name: "Poster", basePrice: 80 },
        { id: "custom-art", name: "Custom Art", basePrice: 100 },
        {
          id: "presentation-folder",
          name: "Presentation Folder",
          basePrice: 70,
        },
      ],
    },
    {
      id: "catalog-magazine",
      name: "Catalog & Magazine",
      subcategories: [
        { id: "catalog", name: "Catalog", basePrice: 150 },
        { id: "magazine", name: "Magazine", basePrice: 120 },
        { id: "booklet", name: "Booklet", basePrice: 80 },
        { id: "lookbook", name: "Lookbook", basePrice: 200 },
        { id: "manual", name: "Manual", basePrice: 100 },
        { id: "zine", name: "Zine", basePrice: 60 },
        { id: "portfolio", name: "Portfolio", basePrice: 180 },
        { id: "newsletter", name: "Newsletter", basePrice: 90 },
        { id: "journal", name: "Journal", basePrice: 110 },
      ],
    },
    {
      id: "book",
      name: "Book",
      subcategories: [
        { id: "exercise-book", name: "Exercise Book", basePrice: 80 },
        { id: "yearbook", name: "Yearbook", basePrice: 300 },
        { id: "childrens-book", name: "Children's Book", basePrice: 150 },
        { id: "comic-book", name: "Comic Book", basePrice: 120 },
        { id: "art-book", name: "Art Book", basePrice: 250 },
        { id: "cookbook", name: "Cookbook", basePrice: 180 },
        { id: "graphic-novel", name: "Graphic Novel", basePrice: 200 },
        { id: "photography-book", name: "Photography Book", basePrice: 280 },
        {
          id: "painted-edges-book",
          name: "Painted Edges Book",
          basePrice: 220,
        },
        { id: "large-format-book", name: "Large Format Book", basePrice: 350 },
        { id: "scratch-off-book", name: "Scratch Off Book", basePrice: 160 },
        { id: "pop-up-book", name: "Pop-Up Book", basePrice: 400 },
        { id: "manga", name: "Manga", basePrice: 140 },
      ],
    },
    {
      id: "binding",
      name: "Binding",
      subcategories: [
        { id: "hardcover-book", name: "Hardcover Book", basePrice: 200 },
        { id: "paperback-book", name: "Paperback Book", basePrice: 120 },
        { id: "board-book", name: "Board Book", basePrice: 180 },
        { id: "stapled-book", name: "Stapled Book", basePrice: 80 },
        { id: "spiral-bound-book", name: "Spiral Bound Book", basePrice: 100 },
        { id: "wire-o-bound-book", name: "Wire-O Bound Book", basePrice: 110 },
        { id: "singer-sewn-book", name: "Singer Sewn Book", basePrice: 160 },
      ],
    },
    {
      id: "custom-design",
      name: "Custom Design and Prints",
      subcategories: [
        {
          id: "custom-design",
          name: "Custom Design and Prints",
          basePrice: 200,
        },
      ],
    },
  ];

  const selectedCategory = productCategories.find(
    (cat) => cat.id === orderData.product
  );
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (sub) => sub.id === orderData.subcategory
  );

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuoteRequest = (specifications: {
    quantity: number;
    size: string;
    material: string;
    urgency: string;
  }) => {
    setOrderData((prev) => ({
      ...prev,
      specifications: {
        size: specifications.size,
        material: specifications.material,
        urgency: specifications.urgency,
      },
      quantity: specifications.quantity,
    }));
  };

  const handleFileUpload = (files: File[]) => {
    setOrderData((prev) => ({ ...prev, files }));
  };

  const handleSubmitOrder = async () => {
    // Validate that user has completed specifications step
    if (currentStep < 2) {
      setSuccessMessage(
        "Please complete all steps before submitting your order."
      );
      setShowSuccessModal(true);
      return;
    }

    try {
      // Send email notification
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "order",
          data: orderData,
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        console.log("Order submitted:", orderData);
        setSuccessMessage(
          "Order submitted successfully! You will receive an invoice via email. We've also sent a notification to our team."
        );
        setShowSuccessModal(true);
      } else {
        console.error(
          "Failed to send email notification:",
          emailResult.message
        );
        setSuccessMessage(
          "Order submitted successfully! You will receive an invoice via email. (Note: Email notification to our team failed)"
        );
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      setSuccessMessage(
        "Order submitted successfully! You will receive an invoice via email. (Note: Email notification to our team failed)"
      );
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage("");

    // Reset form and go back to step 1 after successful submission
    if (successMessage.includes("successfully")) {
      setCurrentStep(1);
      setOrderData({
        product: "",
        subcategory: "",
        quantity: 100,
        specifications: {
          size: "standard",
          material: "standard",
          urgency: "standard",
        },
        customerInfo: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
        files: [],
      });
    }
  };

  const steps = [
    {
      number: 1,
      title: "Product Selection",
      description: "Choose your product and subcategory",
    },
    {
      number: 2,
      title: "Specifications",
      description: "Customize your order details",
    },
    {
      number: 3,
      title: "Design Files",
      description: "Upload your design files",
    },
    {
      number: 4,
      title: "Customer Info",
      description: "Provide your contact details",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Place Your Order
          </h1>
          <p className="text-lg text-gray-600">
            Follow the steps below to place your printing order
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-gray-300 text-gray-500"
                  }`}
                >
                  {step.number}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-purple-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden sm:block w-16 h-0.5 ml-4 ${
                      currentStep > step.number
                        ? "bg-purple-600"
                        : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Step 1: Product Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Select Product
              </h2>

              <div className="space-y-6">
                {/* Product Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <Dropdown
                    value={selectedCategory}
                    onChange={(e) => {
                      setOrderData((prev) => ({
                        ...prev,
                        product: e.value?.id || "",
                        subcategory: "", // Reset subcategory when category changes
                      }));
                    }}
                    options={productCategories}
                    optionLabel="name"
                    placeholder="Select Product Category"
                    className="w-full"
                    showClear
                    checkmark
                    highlightOnSelect={false}
                  />
                </div>

                {/* Subcategory */}
                {selectedCategory && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory
                    </label>
                    <Dropdown
                      value={selectedSubcategory}
                      onChange={(e) => {
                        setOrderData((prev) => ({
                          ...prev,
                          subcategory: e.value?.id || "",
                        }));
                      }}
                      options={selectedCategory.subcategories}
                      optionLabel="name"
                      placeholder="Select Subcategory"
                      className="w-full"
                      showClear
                      checkmark
                      highlightOnSelect={false}
                    />
                  </div>
                )}

                {/* Custom Design Description */}
                {selectedCategory?.id === "custom-design" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-sm text-blue-800">
                      <strong>Custom Design and Prints:</strong> Can&apos;t find
                      a sample of your concepts or ideas in our catalog yet? Let
                      us know what you want and we&apos;ll work with you to
                      bring your vision to life.
                    </p>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={orderData.quantity}
                    onChange={(e) =>
                      setOrderData((prev) => ({
                        ...prev,
                        quantity: parseInt(e.target.value) || 1,
                      }))
                    }
                    className="input-field max-w-xs"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum order: 1 piece
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Specifications */}
          {currentStep === 2 && selectedSubcategory && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Customize Your Order
              </h2>

              <QuoteCalculator onQuoteRequest={handleQuoteRequest} />
            </div>
          )}

          {/* Step 3: Design Files */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Design Files
              </h2>

              <FileUploader onFilesSelected={handleFileUpload} />
            </div>
          )}

          {/* Step 4: Customer Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={orderData.customerInfo.name}
                    onChange={(e) =>
                      setOrderData((prev) => ({
                        ...prev,
                        customerInfo: {
                          ...prev.customerInfo,
                          name: e.target.value,
                        },
                      }))
                    }
                    className="input-field"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={orderData.customerInfo.email}
                    onChange={(e) =>
                      setOrderData((prev) => ({
                        ...prev,
                        customerInfo: {
                          ...prev.customerInfo,
                          email: e.target.value,
                        },
                      }))
                    }
                    className="input-field"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={orderData.customerInfo.phone}
                    onChange={(e) =>
                      setOrderData((prev) => ({
                        ...prev,
                        customerInfo: {
                          ...prev.customerInfo,
                          phone: e.target.value,
                        },
                      }))
                    }
                    className="input-field"
                    placeholder="+234-XXX-XXX-XXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    value={orderData.customerInfo.address}
                    onChange={(e) =>
                      setOrderData((prev) => ({
                        ...prev,
                        customerInfo: {
                          ...prev.customerInfo,
                          address: e.target.value,
                        },
                      }))
                    }
                    className="input-field"
                    rows={3}
                    placeholder="Enter your delivery address"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Product:</span>
                    <span className="font-medium">
                      {selectedCategory?.name || "No category selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subcategory:</span>
                    <span className="font-medium">
                      {selectedSubcategory?.name || "No subcategory selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span className="font-medium">
                      {orderData.quantity.toLocaleString()} pieces
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Files uploaded:</span>
                    <span className="font-medium">
                      {orderData.files.length} files
                    </span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-purple-600">To be discussed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmitOrder}
              disabled={
                currentStep < 2 ||
                !selectedSubcategory ||
                !orderData.customerInfo.name ||
                !orderData.customerInfo.email
              }
              className="flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Submit Order
            </button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        title="Order Submitted"
        message={successMessage}
        type="success"
      />
    </div>
  );
}
