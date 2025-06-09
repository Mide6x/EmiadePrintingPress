"use client";

import { useState, useEffect } from "react";
import { Calculator, Info } from "lucide-react";

interface PriceCalculatorProps {
  basePrice: number;
  onPriceChange?: (price: number, details: PriceBreakdown) => void;
}

interface PriceBreakdown {
  basePrice: number;
  quantity: number;
  sizeMultiplier: number;
  materialMultiplier: number;
  urgencyMultiplier: number;
  subtotal: number;
  discount: number;
  total: number;
}

const PriceCalculator = ({
  basePrice,
  onPriceChange,
}: PriceCalculatorProps) => {
  const [quantity, setQuantity] = useState(100);
  const [size, setSize] = useState("standard");
  const [material, setMaterial] = useState("standard");
  const [urgency, setUrgency] = useState("standard");
  const [priceBreakdown, setPriceBreakdown] = useState<PriceBreakdown | null>(
    null
  );

  const sizeOptions = {
    small: { label: "Small (A6)", multiplier: 0.7 },
    standard: { label: "Standard (A5)", multiplier: 1.0 },
    large: { label: "Large (A4)", multiplier: 1.5 },
    xlarge: { label: "Extra Large (A3)", multiplier: 2.2 },
  };

  const materialOptions = {
    standard: { label: "Standard Paper", multiplier: 1.0 },
    premium: { label: "Premium Paper", multiplier: 1.3 },
    glossy: { label: "Glossy Finish", multiplier: 1.4 },
    matte: { label: "Matte Finish", multiplier: 1.2 },
    cardstock: { label: "Card Stock", multiplier: 1.6 },
  };

  const urgencyOptions = {
    standard: { label: "Standard (5-7 days)", multiplier: 1.0 },
    express: { label: "Express (2-3 days)", multiplier: 1.3 },
    rush: { label: "Rush (24 hours)", multiplier: 1.8 },
  };

  const calculatePrice = () => {
    const sizeMultiplier =
      sizeOptions[size as keyof typeof sizeOptions].multiplier;
    const materialMultiplier =
      materialOptions[material as keyof typeof materialOptions].multiplier;
    const urgencyMultiplier =
      urgencyOptions[urgency as keyof typeof urgencyOptions].multiplier;

    const subtotal =
      basePrice *
      quantity *
      sizeMultiplier *
      materialMultiplier *
      urgencyMultiplier;

    // Bulk discount calculation
    let discount = 0;
    if (quantity >= 1000) discount = 0.15; // 15% for 1000+
    else if (quantity >= 500) discount = 0.1; // 10% for 500+
    else if (quantity >= 250) discount = 0.05; // 5% for 250+

    const discountAmount = subtotal * discount;
    const total = subtotal - discountAmount;

    const breakdown: PriceBreakdown = {
      basePrice,
      quantity,
      sizeMultiplier,
      materialMultiplier,
      urgencyMultiplier,
      subtotal,
      discount: discountAmount,
      total,
    };

    setPriceBreakdown(breakdown);
    onPriceChange?.(total, breakdown);
  };

  useEffect(() => {
    calculatePrice();
  }, [quantity, size, material, urgency, basePrice]);

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <Calculator className="h-5 w-5 text-purple-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">
          Price Calculator
        </h3>
      </div>

      <div className="space-y-6">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            max="10000"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="input-field"
            placeholder="Enter quantity"
          />
          <p className="text-xs text-gray-500 mt-1">Minimum order: 1 piece</p>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="input-field"
          >
            {Object.entries(sizeOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Material */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material & Finish
          </label>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="input-field"
          >
            {Object.entries(materialOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Urgency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Time
          </label>
          <select
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            className="input-field"
          >
            {Object.entries(urgencyOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Breakdown */}
        {priceBreakdown && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-gray-900 mb-3">Price Breakdown</h4>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base price per unit:</span>
              <span>₦{priceBreakdown.basePrice.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Quantity:</span>
              <span>{priceBreakdown.quantity.toLocaleString()} pieces</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal:</span>
              <span>₦{priceBreakdown.subtotal.toLocaleString()}</span>
            </div>

            {priceBreakdown.discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Bulk discount:</span>
                <span>-₦{priceBreakdown.discount.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span className="text-gray-900">Total:</span>
                <span className="text-purple-600">
                  ₦{priceBreakdown.total.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                ₦{(priceBreakdown.total / priceBreakdown.quantity).toFixed(2)}{" "}
                per piece
              </div>
            </div>
          </div>
        )}

        {/* Bulk Discount Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start">
            <Info className="h-4 w-4 text-blue-600 mt-0.5 mr-2" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Bulk Discounts Available:</p>
              <ul className="space-y-0.5">
                <li>• 250+ pieces: 5% discount</li>
                <li>• 500+ pieces: 10% discount</li>
                <li>• 1000+ pieces: 15% discount</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCalculator;
