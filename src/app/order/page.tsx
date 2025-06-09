"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import PriceCalculator from "../../../components/ui/PriceCalculator";
import FileUploader from "../../../components/ui/FileUploader";

interface OrderData {
  product: string;
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
  totalPrice: number;
}

export default function OrderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [orderData, setOrderData] = useState<OrderData>({
    product: "business-cards",
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
    totalPrice: 0,
  });

  const products = [
    {
      id: "business-cards",
      name: "Business Cards",
      basePrice: 50,
      category: "digital",
    },
    { id: "flyers", name: "Flyers", basePrice: 30, category: "digital" },
    { id: "brochures", name: "Brochures", basePrice: 80, category: "digital" },
    { id: "banners", name: "Banners", basePrice: 200, category: "digital" },
    { id: "books", name: "Books", basePrice: 150, category: "offset" },
    { id: "magazines", name: "Magazines", basePrice: 120, category: "offset" },
    {
      id: "mugs",
      name: "Custom Mugs",
      basePrice: 300,
      category: "promotional",
    },
    {
      id: "tshirts",
      name: "T-Shirts",
      basePrice: 250,
      category: "promotional",
    },
  ];

  const selectedProduct = products.find((p) => p.id === orderData.product);

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

  const handlePriceChange = (price: number) => {
    setOrderData((prev) => ({ ...prev, totalPrice: price }));
  };

  const handleFileUpload = (files: File[]) => {
    setOrderData((prev) => ({ ...prev, files }));
  };

  const handleSubmitOrder = () => {
    // Here you would typically send the order to your backend
    console.log("Order submitted:", orderData);
    alert(
      "Order submitted successfully! You will receive an invoice via email."
    );
  };

  const steps = [
    {
      number: 1,
      title: "Product Selection",
      description: "Choose your product and quantity",
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      orderData.product === product.id
                        ? "border-purple-600 bg-purple-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setOrderData((prev) => ({ ...prev, product: product.id }))
                    }
                  >
                    <h3 className="font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 capitalize">
                      {product.category} printing
                    </p>
                    <p className="text-lg font-bold text-purple-600 mt-2">
                      From ₦{product.basePrice.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

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
              </div>
            </div>
          )}

          {/* Step 2: Specifications */}
          {currentStep === 2 && selectedProduct && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Customize Your Order
              </h2>

              <PriceCalculator
                basePrice={selectedProduct.basePrice}
                onPriceChange={handlePriceChange}
              />
            </div>
          )}

          {/* Step 3: Design Files */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Design Files
              </h2>

              <FileUploader
                type="design"
                onFileUpload={handleFileUpload}
                maxFiles={5}
                maxSizePerFile={10}
              />
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
                    <span className="font-medium">{selectedProduct?.name}</span>
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
                      <span className="text-purple-600">
                        ₦{orderData.totalPrice.toLocaleString()}
                      </span>
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
              className="flex items-center px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Submit Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
