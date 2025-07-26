import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "../../../../components/ui/ProductCard";

export default function DigitalCatalogPage() {
  const digitalProducts = [
    {
      id: "business-cards",
      name: "Business Cards",
      description:
        "Professional business cards with premium finishes. Perfect for networking and making lasting impressions.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center",
      startingPrice: 5000,
      category: "digital" as const,
      features: [
        "Premium cardstock",
        "Multiple finishes",
        "Fast turnaround",
        "Custom designs",
      ],
      popular: true,
    },
    {
      id: "flyers",
      name: "Flyers & Leaflets",
      description:
        "Eye-catching flyers for marketing campaigns, events, and promotions.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center",
      startingPrice: 3000,
      category: "digital" as const,
      features: [
        "Full color printing",
        "Various sizes",
        "Bulk discounts",
        "High-quality paper",
      ],
    },
    {
      id: "brochures",
      name: "Brochures",
      description:
        "Professional brochures for showcasing your products and services.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center",
      startingPrice: 8000,
      category: "digital" as const,
      features: [
        "Tri-fold & bi-fold",
        "Glossy finish",
        "Premium paper",
        "Custom layouts",
      ],
    },
    {
      id: "posters",
      name: "Posters",
      description:
        "Large format posters for advertising, events, and decorative purposes.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center",
      startingPrice: 12000,
      category: "digital" as const,
      features: [
        "Large format",
        "Weather resistant",
        "Vibrant colors",
        "Multiple sizes",
      ],
    },
    {
      id: "banners",
      name: "Banners & Signage",
      description:
        "Durable banners and signs for outdoor and indoor advertising.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center",
      startingPrice: 20000,
      category: "digital" as const,
      features: [
        "Weather resistant",
        "Large format",
        "Vinyl material",
        "Custom sizes",
      ],
    },
    {
      id: "stickers",
      name: "Stickers & Labels",
      description:
        "Custom stickers and labels for branding, packaging, and promotional use.",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop&crop=center",
      startingPrice: 2500,
      category: "digital" as const,
      features: [
        "Waterproof",
        "Various shapes",
        "Strong adhesive",
        "Custom designs",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Printing Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide high-quality printing services for your businesses,
            brands, birthdays, anniversaries, weddings and other events, with
            quick turnaround times.
          </p>
        </div>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Why Choose Emiade Prints?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fast Turnaround
              </h3>
              <p className="text-gray-600 text-sm">
                Most orders completed within 24-48 hours with our express
                service available.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Vibrant Colors
              </h3>
              <p className="text-gray-600 text-sm">
                State-of-the-art digital presses ensure crisp, vibrant colors
                every time.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Cost Effective
              </h3>
              <p className="text-gray-600 text-sm">
                Perfect for small quantities without the setup costs of offset
                printing.
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {digitalProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your Printing Project?
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Get a free quote for your printing needs. Our team is ready to help
            bring your vision to life with professional quality and fast
            turnaround.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/order"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center justify-center"
            >
              Get Quote Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <a
              href="mailto:emiadegroup@gmail.com?subject=Printing Inquiry"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Designer
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              File Requirements
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• High-resolution files (300 DPI minimum)</li>
              <li>• PDF, AI, PSD, or high-res JPG/PNG formats</li>
              <li>• CMYK color mode for best results</li>
              <li>• Include bleed area for full-bleed designs</li>
              <li>• Text should be outlined or fonts embedded</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Turnaround Times
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Standard: 3-5 business days</li>
              <li>• Express: 1-2 business days (+30%)</li>
              <li>• Rush: Same day/24 hours (+50%)</li>
              <li>• Large format: 2-4 business days</li>
              <li>• Custom projects: Quote on request</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
