import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  startingPrice: number;
  features: string[];
  popular?: boolean;
}

export default function ProductCard({
  id,
  name,
  description,
  image,
  startingPrice,
  features,
  popular = false,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gray-100">
        <Image
          src={image}
          alt={`${name} - ${description}`}
          fill
          className="object-cover"
        />
        {popular && (
          <div className="absolute top-2 left-2 bg-amber-500 text-white px-2 py-1 rounded text-xs font-medium">
            Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        {/* Features */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
          <ul className="space-y-1">
            {features.slice(0, 3).map((feature, index) => (
              <li
                key={index}
                className="text-xs text-gray-600 flex items-center"
              >
                <span className="w-1 h-1 bg-purple-600 rounded-full mr-2"></span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-lg font-bold text-purple-600">
              ₦{startingPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/order?product=${id}`}
          className="inline-flex items-center justify-center w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Get Quote
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
