import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ dimensions: string[] }> }
) {
  const resolvedParams = await params;
  const dimensions = resolvedParams.dimensions;
  const width = parseInt(dimensions[0]) || 300;
  const height = parseInt(dimensions[1]) || 200;

  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="#e5e7eb" rx="8"/>
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="#6b7280" font-family="Arial, sans-serif" font-size="14">
        ${width} × ${height}
      </text>
      <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial, sans-serif" font-size="12">
        Product Image
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
} 