"use client";

import { useState, useEffect, useCallback } from "react";
import { Dropdown } from "primereact/dropdown";

interface OptionType {
  value: string;
  label: string;
}

interface QuoteCalculatorProps {
  onQuoteRequest: (specifications: {
    quantity: number;
    size: string;
    material: string;
    urgency: string;
  }) => void;
}

export default function QuoteCalculator({
  onQuoteRequest,
}: QuoteCalculatorProps) {
  const [quantity, setQuantity] = useState<number>(100);
  const [size, setSize] = useState<OptionType>({
    value: "other",
    label: "Other (To be discussed)",
  });
  const [material, setMaterial] = useState<OptionType>({
    value: "other",
    label: "Other (To be discussed)",
  });
  const [urgency, setUrgency] = useState<OptionType>({
    value: "standard",
    label: "Standard (3-5 days)",
  });

  const sizeOptions: OptionType[] = [
    { value: "other", label: "Other (To be discussed)" },
    { value: "small", label: "Small (A6)" },
    { value: "standard", label: "Standard (A5)" },
    { value: "large", label: "Large (A4)" },
    { value: "xlarge", label: "Extra Large (A3)" },
  ];

  const materialOptions: OptionType[] = [
    { value: "other", label: "Other (To be discussed)" },
    { value: "standard", label: "Standard Paper" },
    { value: "premium", label: "Premium Paper" },
    { value: "glossy", label: "Glossy Finish" },
    { value: "matte", label: "Matte Finish" },
    { value: "cardstock", label: "Card Stock" },
  ];

  const urgencyOptions: OptionType[] = [
    { value: "standard", label: "Standard (3-5 days)" },
    { value: "express", label: "Express (1-2 days)" },
    { value: "rush", label: "Rush (Same day)" },
  ];

  const updateSpecifications = useCallback(() => {
    onQuoteRequest({
      quantity,
      size: size.value,
      material: material.value,
      urgency: urgency.value,
    });
  }, [quantity, size, material, urgency, onQuoteRequest]);

  useEffect(() => {
    updateSpecifications();
  }, [updateSpecifications]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Quote Calculator
      </h3>

      <div className="space-y-4">
        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <Dropdown
            value={size}
            onChange={(e) => setSize(e.value)}
            options={sizeOptions}
            optionLabel="label"
            placeholder="Select Size"
            className="w-full"
          />
        </div>

        {/* Material & Finish */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Material & Finish
          </label>
          <Dropdown
            value={material}
            onChange={(e) => setMaterial(e.value)}
            options={materialOptions}
            optionLabel="label"
            placeholder="Select Material"
            className="w-full"
          />
        </div>

        {/* Delivery Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Time
          </label>
          <Dropdown
            value={urgency}
            onChange={(e) => setUrgency(e.value)}
            options={urgencyOptions}
            optionLabel="label"
            placeholder="Select Delivery Time"
            className="w-full"
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Note:</strong> Size and Material & Finish selections will be
          finalized during client consultation based on what&apos;s best for
          your specific order requirements.
        </p>
      </div>

      {(!size || !material || !urgency) && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Please select all options to get a quote
          </p>
        </div>
      )}
    </div>
  );
}
