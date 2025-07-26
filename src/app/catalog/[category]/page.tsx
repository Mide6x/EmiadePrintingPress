import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SubCategory {
  id: string;
  name: string;
  description: string;
  features: string[];
}

interface CategoryData {
  name: string;
  description: string;
  subcategories: SubCategory[];
}

const categoryDataMap: Record<string, CategoryData> = {
  "other-boxes": {
    name: "Other Boxes",
    description:
      "Specialized packaging solutions for various industries and applications.",
    subcategories: [
      {
        id: "paperbags",
        name: "Paper Bags",
        description:
          "Eco-friendly paper bags for retail, shopping, and promotional use.",
        features: [
          "Eco-friendly",
          "Custom printing",
          "Various sizes",
          "Handle options",
        ],
      },
      {
        id: "corrugated-boxes",
        name: "Corrugated Boxes",
        description: "Strong and durable packaging for shipping and storage.",
        features: [
          "High strength",
          "Custom sizes",
          "Printing options",
          "Stackable",
        ],
      },
      {
        id: "kraft-boxes",
        name: "Kraft Boxes",
        description:
          "Natural kraft paper boxes with rustic appeal and sustainability.",
        features: [
          "Natural finish",
          "Eco-friendly",
          "Custom printing",
          "Various sizes",
        ],
      },
      {
        id: "display-boxes",
        name: "Display Boxes",
        description:
          "Attractive packaging designed for retail display and presentation.",
        features: [
          "Window options",
          "Custom printing",
          "Display-ready",
          "Premium finish",
        ],
      },
      {
        id: "box-inserts",
        name: "Box Inserts",
        description:
          "Custom inserts to protect and organize products within boxes.",
        features: [
          "Custom fit",
          "Product protection",
          "Various materials",
          "Precise cutting",
        ],
      },
      {
        id: "packaging-sleeves",
        name: "Packaging Sleeves",
        description: "Slip-on sleeves for product packaging and branding.",
        features: [
          "Easy application",
          "Custom printing",
          "Various sizes",
          "Cost-effective",
        ],
      },
      {
        id: "full-stamping",
        name: "Full Stamping",
        description:
          "Premium packaging with full foil stamping for luxury appeal.",
        features: [
          "Foil stamping",
          "Luxury finish",
          "Custom designs",
          "Premium materials",
        ],
      },
      {
        id: "paper-boxes",
        name: "Paper Boxes",
        description: "Versatile paper boxes for various packaging needs.",
        features: [
          "Custom printing",
          "Various sizes",
          "Eco-friendly",
          "Cost-effective",
        ],
      },
    ],
  },
  "rigid-box": {
    name: "Rigid Box",
    description:
      "Premium packaging solutions with superior strength and presentation.",
    subcategories: [
      {
        id: "rigid-boxes",
        name: "Rigid Boxes",
        description: "High-quality rigid boxes for premium product packaging.",
        features: [
          "Superior strength",
          "Premium finish",
          "Custom printing",
          "Luxury appeal",
        ],
      },
      {
        id: "collapsible-rigid-boxes",
        name: "Collapsible Rigid Boxes",
        description:
          "Space-efficient rigid boxes that can be collapsed for storage.",
        features: [
          "Collapsible design",
          "Space saving",
          "Premium quality",
          "Custom printing",
        ],
      },
      {
        id: "magnetic-closure-rigid-boxes",
        name: "Magnetic Closure Rigid Boxes",
        description:
          "Luxury boxes with magnetic closure for premium presentation.",
        features: [
          "Magnetic closure",
          "Luxury finish",
          "Premium materials",
          "Custom designs",
        ],
      },
      {
        id: "telescope-rigid-boxes",
        name: "Telescope Rigid Boxes",
        description:
          "Two-piece rigid boxes with telescoping lid for elegant presentation.",
        features: [
          "Telescope design",
          "Elegant presentation",
          "Custom printing",
          "Premium materials",
        ],
      },
    ],
  },
  "folding-carton-box": {
    name: "Folding Carton Box",
    description:
      "Versatile folding carton solutions for various packaging needs.",
    subcategories: [
      {
        id: "folding-carton-boxes",
        name: "Folding Carton Boxes",
        description: "Standard folding carton boxes for product packaging.",
        features: [
          "Cost-effective",
          "Custom printing",
          "Various sizes",
          "Easy assembly",
        ],
      },
      {
        id: "retail-paper-boxes",
        name: "Retail Paper Boxes",
        description: "Attractive boxes designed for retail display and sales.",
        features: [
          "Retail-ready",
          "Custom printing",
          "Display-friendly",
          "Various sizes",
        ],
      },
      {
        id: "medical-paper-boxes",
        name: "Medical Paper Boxes",
        description:
          "Specialized boxes for medical and pharmaceutical products.",
        features: [
          "Medical grade",
          "Compliance ready",
          "Custom printing",
          "Safety standards",
        ],
      },
      {
        id: "cosmetic-paper-boxes",
        name: "Cosmetic Paper Boxes",
        description: "Elegant packaging for cosmetic and beauty products.",
        features: [
          "Elegant design",
          "Custom printing",
          "Premium finish",
          "Beauty industry",
        ],
      },
    ],
  },
  cards: {
    name: "Cards",
    description:
      "Specialized card printing for various applications and industries.",
    subcategories: [
      {
        id: "flash-cards",
        name: "Flash Cards",
        description:
          "Educational flash cards for learning and training purposes.",
        features: [
          "Educational",
          "Durable printing",
          "Various sizes",
          "Custom content",
        ],
      },
      {
        id: "game-cards",
        name: "Game Cards",
        description: "High-quality cards for board games and card games.",
        features: [
          "Game quality",
          "Durable finish",
          "Custom designs",
          "Various sizes",
        ],
      },
      {
        id: "playing-cards",
        name: "Playing Cards",
        description:
          "Professional playing cards for casinos and entertainment.",
        features: [
          "Casino quality",
          "Durable finish",
          "Custom designs",
          "Professional grade",
        ],
      },
      {
        id: "gaming-cards",
        name: "Gaming Cards",
        description: "Specialized cards for collectible card games and gaming.",
        features: [
          "Gaming quality",
          "Custom artwork",
          "Durable finish",
          "Collectible grade",
        ],
      },
      {
        id: "scratch-off-cards",
        name: "Scratch Off Cards",
        description: "Promotional scratch-off cards for marketing campaigns.",
        features: [
          "Scratch-off coating",
          "Custom printing",
          "Promotional use",
          "Various sizes",
        ],
      },
      {
        id: "affirmation-cards",
        name: "Affirmation Cards",
        description:
          "Inspirational cards for motivation and personal development.",
        features: [
          "Inspirational",
          "Custom content",
          "Premium finish",
          "Personal development",
        ],
      },
      {
        id: "conversation-cards",
        name: "Conversation Cards",
        description:
          "Interactive cards for social gatherings and team building.",
        features: [
          "Interactive",
          "Social use",
          "Custom content",
          "Team building",
        ],
      },
      {
        id: "tarot-cards",
        name: "Tarot Cards",
        description:
          "Professional tarot cards for spiritual and entertainment use.",
        features: [
          "Spiritual use",
          "Custom artwork",
          "Professional finish",
          "Traditional design",
        ],
      },
      {
        id: "oracle-cards",
        name: "Oracle Cards",
        description:
          "Modern oracle cards for spiritual guidance and meditation.",
        features: [
          "Modern design",
          "Spiritual use",
          "Custom artwork",
          "Meditation aid",
        ],
      },
    ],
  },
  calendar: {
    name: "Calendar",
    description: "Custom calendar printing for businesses and personal use.",
    subcategories: [
      {
        id: "wall-calendar",
        name: "Wall Calendar",
        description: "Large format wall calendars for home and office use.",
        features: [
          "Large format",
          "Custom artwork",
          "Monthly layout",
          "Premium paper",
        ],
      },
      {
        id: "desk-calendar",
        name: "Desk Calendar",
        description: "Compact desk calendars for workspace organization.",
        features: [
          "Desk size",
          "Custom printing",
          "Daily layout",
          "Professional design",
        ],
      },
      {
        id: "three-month-calendar",
        name: "Three-Month Calendar",
        description: "Quarterly calendars for planning and organization.",
        features: [
          "Quarterly view",
          "Custom printing",
          "Planning aid",
          "Professional design",
        ],
      },
      {
        id: "deskpad-calendar",
        name: "Deskpad Calendar",
        description: "Large desk pad calendars for detailed planning.",
        features: [
          "Large format",
          "Detailed layout",
          "Custom printing",
          "Planning tool",
        ],
      },
      {
        id: "magnetic-dry-erase-calendar",
        name: "Magnetic Dry Erase Calendar",
        description: "Reusable magnetic calendars for ongoing planning.",
        features: [
          "Reusable",
          "Magnetic backing",
          "Dry erase",
          "Custom printing",
        ],
      },
    ],
  },
  "flyer-poster": {
    name: "Flyer & Poster",
    description:
      "Marketing materials for advertising and promotional campaigns.",
    subcategories: [
      {
        id: "flyer",
        name: "Flyer",
        description:
          "Cost-effective flyers for marketing and promotional campaigns.",
        features: [
          "Cost-effective",
          "Custom printing",
          "Various sizes",
          "Quick turnaround",
        ],
      },
      {
        id: "brochure",
        name: "Brochure",
        description:
          "Professional brochures for business and service promotion.",
        features: [
          "Professional design",
          "Custom printing",
          "Folded layout",
          "Business use",
        ],
      },
      {
        id: "poster",
        name: "Poster",
        description: "Large format posters for advertising and events.",
        features: [
          "Large format",
          "High impact",
          "Custom printing",
          "Event use",
        ],
      },
      {
        id: "custom-art",
        name: "Custom Art",
        description:
          "Custom artwork printing for artistic and decorative purposes.",
        features: [
          "Custom artwork",
          "High quality",
          "Various sizes",
          "Artistic use",
        ],
      },
      {
        id: "presentation-folder",
        name: "Presentation Folder",
        description:
          "Professional folders for business presentations and documents.",
        features: [
          "Professional",
          "Document storage",
          "Custom printing",
          "Business use",
        ],
      },
    ],
  },
  "catalog-magazine": {
    name: "Catalog & Magazine",
    description:
      "Professional publishing solutions for businesses and organizations.",
    subcategories: [
      {
        id: "catalog",
        name: "Catalog",
        description:
          "Product catalogs for showcasing merchandise and services.",
        features: [
          "Product showcase",
          "Custom printing",
          "Professional layout",
          "Business use",
        ],
      },
      {
        id: "magazine",
        name: "Magazine",
        description:
          "Professional magazines for content publishing and distribution.",
        features: [
          "Content publishing",
          "Professional layout",
          "Custom printing",
          "Distribution ready",
        ],
      },
      {
        id: "booklet",
        name: "Booklet",
        description: "Compact booklets for information and promotional use.",
        features: [
          "Compact size",
          "Information sharing",
          "Custom printing",
          "Portable",
        ],
      },
      {
        id: "lookbook",
        name: "Lookbook",
        description: "Fashion and style lookbooks for showcasing collections.",
        features: [
          "Fashion focus",
          "High quality",
          "Custom printing",
          "Style showcase",
        ],
      },
      {
        id: "manual",
        name: "Manual",
        description: "Instructional manuals for products and services.",
        features: [
          "Instructional",
          "Clear layout",
          "Custom printing",
          "Technical content",
        ],
      },
      {
        id: "zine",
        name: "Zine",
        description: "Independent publications for creative and niche content.",
        features: [
          "Independent",
          "Creative content",
          "Custom printing",
          "Niche focus",
        ],
      },
      {
        id: "portfolio",
        name: "Portfolio",
        description:
          "Professional portfolios for showcasing work and achievements.",
        features: [
          "Professional",
          "Work showcase",
          "Custom printing",
          "Career use",
        ],
      },
      {
        id: "newsletter",
        name: "Newsletter",
        description: "Regular newsletters for communication and updates.",
        features: [
          "Regular publication",
          "Communication",
          "Custom printing",
          "Updates",
        ],
      },
      {
        id: "journal",
        name: "Journal",
        description:
          "Academic and professional journals for research and publication.",
        features: [
          "Academic",
          "Research focus",
          "Professional layout",
          "Publication ready",
        ],
      },
    ],
  },
  book: {
    name: "Book",
    description: "Professional book printing for authors and publishers.",
    subcategories: [
      {
        id: "exercise-book",
        name: "Exercise Book",
        description: "Educational exercise books for students and learning.",
        features: [
          "Educational",
          "Student use",
          "Custom printing",
          "Learning aid",
        ],
      },
      {
        id: "yearbook",
        name: "Yearbook",
        description: "School yearbooks for commemorating academic years.",
        features: [
          "School use",
          "Commemorative",
          "Custom printing",
          "Memory book",
        ],
      },
      {
        id: "childrens-book",
        name: "Children's Book",
        description: "Colorful books designed for children and young readers.",
        features: [
          "Child-friendly",
          "Colorful",
          "Custom printing",
          "Educational",
        ],
      },
      {
        id: "comic-book",
        name: "Comic Book",
        description: "Graphic novels and comic books for entertainment.",
        features: [
          "Graphic content",
          "Entertainment",
          "Custom printing",
          "Visual storytelling",
        ],
      },
      {
        id: "art-book",
        name: "Art Book",
        description: "High-quality art books for showcasing artistic work.",
        features: [
          "Art showcase",
          "High quality",
          "Custom printing",
          "Visual content",
        ],
      },
      {
        id: "cookbook",
        name: "Cookbook",
        description: "Recipe books for culinary enthusiasts and professionals.",
        features: [
          "Culinary",
          "Recipe focused",
          "Custom printing",
          "Food photography",
        ],
      },
      {
        id: "graphic-novel",
        name: "Graphic Novel",
        description: "Sophisticated graphic novels for mature readers.",
        features: [
          "Mature content",
          "Sophisticated",
          "Custom printing",
          "Visual storytelling",
        ],
      },
      {
        id: "photography-book",
        name: "Photography Book",
        description: "Photo books for showcasing photographic work.",
        features: [
          "Photography",
          "High quality",
          "Custom printing",
          "Visual content",
        ],
      },
      {
        id: "painted-edges-book",
        name: "Painted Edges Book",
        description: "Premium books with painted page edges for luxury appeal.",
        features: [
          "Luxury finish",
          "Painted edges",
          "Premium quality",
          "Custom printing",
        ],
      },
      {
        id: "large-format-book",
        name: "Large Format Book",
        description:
          "Oversized books for special presentations and coffee table use.",
        features: [
          "Large format",
          "Coffee table",
          "Custom printing",
          "Special presentation",
        ],
      },
      {
        id: "scratch-off-book",
        name: "Scratch Off Book",
        description:
          "Interactive books with scratch-off elements for engagement.",
        features: [
          "Interactive",
          "Scratch-off",
          "Custom printing",
          "Engagement",
        ],
      },
      {
        id: "pop-up-book",
        name: "Pop-Up Book",
        description: "Interactive pop-up books for children and collectors.",
        features: [
          "Interactive",
          "Pop-up elements",
          "Custom printing",
          "Collectible",
        ],
      },
      {
        id: "manga",
        name: "Manga",
        description:
          "Japanese-style manga books for entertainment and collection.",
        features: [
          "Manga style",
          "Entertainment",
          "Custom printing",
          "Japanese art",
        ],
      },
    ],
  },
  binding: {
    name: "Binding",
    description:
      "Professional binding services for documents and publications.",
    subcategories: [
      {
        id: "hardcover-book",
        name: "Hardcover Book",
        description: "Premium hardcover binding for books and publications.",
        features: [
          "Premium quality",
          "Durable",
          "Custom printing",
          "Professional",
        ],
      },
      {
        id: "paperback-book",
        name: "Paperback Book",
        description:
          "Cost-effective paperback binding for books and publications.",
        features: [
          "Cost-effective",
          "Lightweight",
          "Custom printing",
          "Portable",
        ],
      },
      {
        id: "board-book",
        name: "Board Book",
        description: "Durable board books for children and young readers.",
        features: [
          "Child-friendly",
          "Durable",
          "Custom printing",
          "Educational",
        ],
      },
      {
        id: "stapled-book",
        name: "Stapled Book",
        description: "Simple stapled binding for booklets and publications.",
        features: [
          "Simple",
          "Cost-effective",
          "Custom printing",
          "Quick turnaround",
        ],
      },
      {
        id: "spiral-bound-book",
        name: "Spiral Bound Book",
        description: "Spiral binding for manuals and reference materials.",
        features: ["Lay-flat", "Reference use", "Custom printing", "Practical"],
      },
      {
        id: "wire-o-bound-book",
        name: "Wire-O Bound Book",
        description:
          "Wire-o binding for professional presentations and reports.",
        features: [
          "Professional",
          "Lay-flat",
          "Custom printing",
          "Presentation ready",
        ],
      },
      {
        id: "singer-sewn-book",
        name: "Singer Sewn Book",
        description:
          "Traditional sewn binding for premium books and publications.",
        features: [
          "Traditional",
          "Premium quality",
          "Custom printing",
          "Durable",
        ],
      },
    ],
  },
  "custom-design": {
    name: "Custom Design & Prints",
    description:
      "Bespoke design and printing services for unique requirements.",
    subcategories: [
      {
        id: "custom-design",
        name: "Custom Design & Prints",
        description:
          "Completely customized design and printing solutions for unique projects.",
        features: [
          "Custom design",
          "Unique projects",
          "Consultation",
          "Bespoke solutions",
        ],
      },
    ],
  },
};

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const categoryData = categoryDataMap[category];

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <p className="text-xl text-gray-600">
              The requested category does not exist.
            </p>
            <Link
              href="/"
              className="text-purple-600 hover:text-purple-800 mt-4 inline-block"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {categoryData.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {categoryData.description}
          </p>
        </div>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categoryData.subcategories.map((subcategory: SubCategory) => (
            <div
              key={subcategory.id}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {subcategory.name}
              </h3>
              <p className="text-gray-600 mb-4">{subcategory.description}</p>
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">Features:</h4>
                <ul className="space-y-1">
                  {subcategory.features.map(
                    (feature: string, index: number) => (
                      <li
                        key={index}
                        className="text-sm text-gray-600 flex items-center"
                      >
                        <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Your {categoryData.name} Project?
          </h2>
          <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
            Get a free quote for your {categoryData.name.toLowerCase()} needs.
            Our team is ready to help bring your vision to life with
            professional quality and fast turnaround.
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
              href="mailto:emiadegroup@gmail.com?subject=Inquiry for {categoryData.name}"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Designer
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
