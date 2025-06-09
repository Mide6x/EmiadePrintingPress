import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  category: "digital" | "offset" | "promotional";
  features: string[];
  popular?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  image,
  startingPrice,
  category,
  features,
  popular = false,
}: ProductCardProps) => {
  return (
    <div
      className={`relative bg-white rounded-lg shadow-md border hover:shadow-lg transition-shadow duration-300 ${
        popular ? "border-amber-500 border-2" : "border-gray-200"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
          Popular
        </div>
      )}

      {/* Product Image */}
      <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              category === "digital"
                ? "bg-blue-100 text-blue-800"
                : category === "offset"
                ? "bg-green-100 text-green-800"
                : "bg-purple-100 text-purple-800"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Features */}
        <ul className="space-y-1 mb-4">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="text-xs text-gray-500 flex items-center">
              <span className="w-1 h-1 bg-purple-600 rounded-full mr-2"></span>
              {feature}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500">Starting from</span>
            <div className="text-xl font-bold text-purple-600">
              ₦{startingPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link
            href={`/catalog/${category}/${id}`}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Link>
          <Link
            href={`/order?product=${id}`}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
