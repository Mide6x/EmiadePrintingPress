import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface InvoiceData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  items: {
    name: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  orderDate: string;
  dueDate: string;
  paymentInstructions: {
    bankName: string;
    accountNumber: string;
    accountName: string;
    sortCode: string;
  };
}

export async function generateInvoicePDF(invoiceData: InvoiceData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const { width, height } = page.getSize();
  const margin = 50;
  let yPosition = height - margin;

  // Colors
  const primaryColor = rgb(0.486, 0.231, 0.929); // Purple
  const accentColor = rgb(0.961, 0.620, 0.043); // Gold
  const textColor = rgb(0.2, 0.2, 0.2);

  // Header
  page.drawRectangle({
    x: 0,
    y: height - 80,
    width: width,
    height: 80,
    color: primaryColor,
  });

  page.drawText('EMIADE PRINTING COMPANY', {
    x: margin,
    y: height - 40,
    size: 24,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  page.drawText('Professional Printing Services', {
    x: margin,
    y: height - 60,
    size: 12,
    font: font,
    color: rgb(0.9, 0.9, 0.9),
  });

  // Invoice title and number
  yPosition = height - 120;
  page.drawText('INVOICE', {
    x: width - 150,
    y: yPosition,
    size: 20,
    font: boldFont,
    color: primaryColor,
  });

  page.drawText(`#${invoiceData.orderId}`, {
    x: width - 150,
    y: yPosition - 25,
    size: 14,
    font: font,
    color: textColor,
  });

  // Company details
  yPosition = height - 160;
  const companyDetails = [
    '123 Printing Street',
    'Lagos, Nigeria',
    'Phone: +234-XXX-XXX-XXXX',
    'Email: design@presscompany.com',
  ];

  companyDetails.forEach((detail, index) => {
    page.drawText(detail, {
      x: margin,
      y: yPosition - (index * 15),
      size: 10,
      font: font,
      color: textColor,
    });
  });

  // Customer details
  yPosition = height - 260;
  page.drawText('Bill To:', {
    x: margin,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: textColor,
  });

  const customerDetails = [
    invoiceData.customerName,
    invoiceData.customerEmail,
    invoiceData.customerPhone,
    invoiceData.customerAddress,
  ];

  customerDetails.forEach((detail, index) => {
    page.drawText(detail, {
      x: margin,
      y: yPosition - 20 - (index * 15),
      size: 10,
      font: font,
      color: textColor,
    });
  });

  // Invoice dates
  const invoiceDates = [
    `Invoice Date: ${new Date(invoiceData.orderDate).toLocaleDateString()}`,
    `Due Date: ${new Date(invoiceData.dueDate).toLocaleDateString()}`,
  ];

  invoiceDates.forEach((date, index) => {
    page.drawText(date, {
      x: width - 200,
      y: yPosition - 20 - (index * 15),
      size: 10,
      font: font,
      color: textColor,
    });
  });

  // Items table header
  yPosition = height - 380;
  const tableHeaders = ['Description', 'Qty', 'Unit Price', 'Total'];
  const columnWidths = [250, 60, 80, 80];
  let xPosition = margin;

  // Table header background
  page.drawRectangle({
    x: margin - 5,
    y: yPosition - 5,
    width: width - (margin * 2) + 10,
    height: 25,
    color: rgb(0.95, 0.95, 0.95),
  });

  tableHeaders.forEach((header, index) => {
    page.drawText(header, {
      x: xPosition,
      y: yPosition,
      size: 10,
      font: boldFont,
      color: textColor,
    });
    xPosition += columnWidths[index];
  });

  // Items
  yPosition -= 30;
  invoiceData.items.forEach((item) => {
    xPosition = margin;
    
    // Item name
    page.drawText(item.name, {
      x: xPosition,
      y: yPosition,
      size: 10,
      font: boldFont,
      color: textColor,
    });
    
    // Item description
    page.drawText(item.description, {
      x: xPosition,
      y: yPosition - 12,
      size: 8,
      font: font,
      color: rgb(0.5, 0.5, 0.5),
    });
    
    xPosition += columnWidths[0];
    
    // Quantity
    page.drawText(item.quantity.toString(), {
      x: xPosition,
      y: yPosition,
      size: 10,
      font: font,
      color: textColor,
    });
    xPosition += columnWidths[1];
    
    // Unit price
    page.drawText(`₦${item.unitPrice.toLocaleString()}`, {
      x: xPosition,
      y: yPosition,
      size: 10,
      font: font,
      color: textColor,
    });
    xPosition += columnWidths[2];
    
    // Total
    page.drawText(`₦${item.total.toLocaleString()}`, {
      x: xPosition,
      y: yPosition,
      size: 10,
      font: font,
      color: textColor,
    });
    
    yPosition -= 35;
  });

  // Totals
  yPosition -= 20;
  const totalsX = width - 200;
  
  // Subtotal
  page.drawText('Subtotal:', {
    x: totalsX,
    y: yPosition,
    size: 10,
    font: font,
    color: textColor,
  });
  page.drawText(`₦${invoiceData.subtotal.toLocaleString()}`, {
    x: totalsX + 80,
    y: yPosition,
    size: 10,
    font: font,
    color: textColor,
  });

  // Discount
  if (invoiceData.discount > 0) {
    yPosition -= 15;
    page.drawText('Discount:', {
      x: totalsX,
      y: yPosition,
      size: 10,
      font: font,
      color: textColor,
    });
    page.drawText(`-₦${invoiceData.discount.toLocaleString()}`, {
      x: totalsX + 80,
      y: yPosition,
      size: 10,
      font: font,
      color: rgb(0, 0.7, 0),
    });
  }

  // Total
  yPosition -= 20;
  page.drawRectangle({
    x: totalsX - 10,
    y: yPosition - 5,
    width: 150,
    height: 20,
    color: primaryColor,
  });

  page.drawText('TOTAL:', {
    x: totalsX,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });
  page.drawText(`₦${invoiceData.total.toLocaleString()}`, {
    x: totalsX + 80,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: rgb(1, 1, 1),
  });

  // Payment instructions
  yPosition -= 60;
  page.drawText('Payment Instructions:', {
    x: margin,
    y: yPosition,
    size: 12,
    font: boldFont,
    color: primaryColor,
  });

  const paymentDetails = [
    `Bank: ${invoiceData.paymentInstructions.bankName}`,
    `Account Number: ${invoiceData.paymentInstructions.accountNumber}`,
    `Account Name: ${invoiceData.paymentInstructions.accountName}`,
    `Sort Code: ${invoiceData.paymentInstructions.sortCode}`,
    '',
    'Please include your order ID in the payment reference.',
    'Upload payment proof at: www.emiadeprints.com/upload-proof',
  ];

  paymentDetails.forEach((detail, index) => {
    page.drawText(detail, {
      x: margin,
      y: yPosition - 20 - (index * 15),
      size: 10,
      font: font,
      color: textColor,
    });
  });

  // Footer
  page.drawText('Thank you for your business!', {
    x: margin,
    y: 80,
    size: 12,
    font: boldFont,
    color: accentColor,
  });

  page.drawText('For questions about this invoice, contact us at design@presscompany.com', {
    x: margin,
    y: 60,
    size: 8,
    font: font,
    color: textColor,
  });

  return await pdfDoc.save();
}

export function generateOrderId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `EPC-${year}${month}${day}-${random}`;
}

export function calculateDueDate(orderDate: string, daysToAdd: number = 7): string {
  const date = new Date(orderDate);
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
} 