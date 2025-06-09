"use client";

import { useState } from "react";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
} from "lucide-react";

interface OrderStatus {
  id: string;
  status:
    | "pending"
    | "confirmed"
    | "printing"
    | "ready"
    | "shipped"
    | "delivered";
  customerName: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  orderDate: string;
  estimatedDelivery: string;
  paymentStatus: "pending" | "paid" | "failed";
  timeline: {
    step: string;
    date: string;
    completed: boolean;
    description: string;
  }[];
}

const OrderTracker = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Mock order data - in real app, this would come from API
  const mockOrders: Record<string, OrderStatus> = {
    "EPC-2024-001": {
      id: "EPC-2024-001",
      status: "printing",
      customerName: "John Doe",
      productName: "Business Cards",
      quantity: 500,
      totalAmount: 15000,
      orderDate: "2024-01-15",
      estimatedDelivery: "2024-01-22",
      paymentStatus: "paid",
      timeline: [
        {
          step: "Order Placed",
          date: "2024-01-15",
          completed: true,
          description: "Order received and confirmed",
        },
        {
          step: "Payment Verified",
          date: "2024-01-15",
          completed: true,
          description: "Payment confirmed",
        },
        {
          step: "In Production",
          date: "2024-01-16",
          completed: true,
          description: "Your order is being printed",
        },
        {
          step: "Quality Check",
          date: "2024-01-20",
          completed: false,
          description: "Final quality inspection",
        },
        {
          step: "Ready for Pickup",
          date: "2024-01-21",
          completed: false,
          description: "Order ready for collection",
        },
        {
          step: "Delivered",
          date: "2024-01-22",
          completed: false,
          description: "Order delivered to customer",
        },
      ],
    },
    "EPC-2024-002": {
      id: "EPC-2024-002",
      status: "pending",
      customerName: "Jane Smith",
      productName: "Flyers",
      quantity: 1000,
      totalAmount: 25000,
      orderDate: "2024-01-16",
      estimatedDelivery: "2024-01-25",
      paymentStatus: "pending",
      timeline: [
        {
          step: "Order Placed",
          date: "2024-01-16",
          completed: true,
          description: "Order received",
        },
        {
          step: "Payment Verification",
          date: "",
          completed: false,
          description: "Awaiting payment confirmation",
        },
        {
          step: "In Production",
          date: "",
          completed: false,
          description: "Production will start after payment",
        },
        {
          step: "Quality Check",
          date: "",
          completed: false,
          description: "Final quality inspection",
        },
        {
          step: "Ready for Pickup",
          date: "",
          completed: false,
          description: "Order ready for collection",
        },
        {
          step: "Delivered",
          date: "",
          completed: false,
          description: "Order delivered to customer",
        },
      ],
    },
  };

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const order = mockOrders[orderId.toUpperCase()];
      if (order) {
        setOrderStatus(order);
        setError("");
      } else {
        setOrderStatus(null);
        setError("Order not found. Please check your order ID and try again.");
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "confirmed":
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case "printing":
        return <Package className="h-5 w-5 text-purple-500" />;
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-blue-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "printing":
        return "bg-purple-100 text-purple-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Track Your Order
        </h2>

        {/* Search Form */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="orderId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., EPC-2024-001)"
                className="input-field"
                onKeyPress={(e) => e.key === "Enter" && handleTrackOrder()}
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleTrackOrder}
                disabled={loading}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50"
              >
                <Search className="h-4 w-4" />
                <span>{loading ? "Searching..." : "Track Order"}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Order Status Display */}
        {orderStatus && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details
                </h3>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(orderStatus.status)}
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      orderStatus.status
                    )}`}
                  >
                    {orderStatus.status.charAt(0).toUpperCase() +
                      orderStatus.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold">{orderStatus.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p className="font-semibold">{orderStatus.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Product</p>
                  <p className="font-semibold">{orderStatus.productName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quantity</p>
                  <p className="font-semibold">
                    {orderStatus.quantity.toLocaleString()} pieces
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold">
                    ₦{orderStatus.totalAmount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Status</p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      orderStatus.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : orderStatus.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {orderStatus.paymentStatus.charAt(0).toUpperCase() +
                      orderStatus.paymentStatus.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold">
                    {new Date(orderStatus.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="font-semibold">
                    {new Date(
                      orderStatus.estimatedDelivery
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Progress
              </h3>
              <div className="space-y-4">
                {orderStatus.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p
                          className={`text-sm font-medium ${
                            step.completed ? "text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {step.step}
                        </p>
                        {step.date && (
                          <p className="text-xs text-gray-500">
                            {new Date(step.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <p
                        className={`text-xs ${
                          step.completed ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Notice */}
            {orderStatus.paymentStatus === "pending" && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-800">
                      Payment Required
                    </h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your order is on hold pending payment verification. Please
                      upload your payment proof or contact us for assistance.
                    </p>
                    <div className="mt-3">
                      <a
                        href="/upload-proof"
                        className="text-sm bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-md transition-colors"
                      >
                        Upload Payment Proof
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sample Order IDs */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">
            Sample Order IDs for Testing:
          </h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• EPC-2024-001 (In Production)</p>
            <p>• EPC-2024-002 (Pending Payment)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracker;
