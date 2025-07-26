import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    const recipientEmail = process.env.NEXT_ORDER_EMAIL || 'emiadegroup@gmail.com';

    let subject = '';
    let emailContent = '';

    if (type === 'order') {
      subject = `New Order Submission - ${data.customerInfo?.name || 'Unknown Customer'}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Order Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Emiade Prints</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #374151; margin-top: 0;">Customer Information</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${data.customerInfo?.name || 'Not provided'}</p>
              <p><strong>Email:</strong> ${data.customerInfo?.email || 'Not provided'}</p>
              <p><strong>Phone:</strong> ${data.customerInfo?.phone || 'Not provided'}</p>
              <p><strong>Address:</strong> ${data.customerInfo?.address || 'Not provided'}</p>
            </div>
            
            <h2 style="color: #374151;">Order Details</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Product Category:</strong> ${data.product || 'Not specified'}</p>
              <p><strong>Subcategory:</strong> ${data.subcategory || 'Not specified'}</p>
              <p><strong>Quantity:</strong> ${(data.quantity || 0).toLocaleString()} pieces</p>
              <p><strong>Pricing:</strong> To be discussed during consultation</p>
            </div>
            
            <h2 style="color: #374151;">Specifications</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Size:</strong> ${data.specifications?.size || 'Not specified'}</p>
              <p><strong>Material:</strong> ${data.specifications?.material || 'Not specified'}</p>
              <p><strong>Urgency:</strong> ${data.specifications?.urgency || 'Not specified'}</p>
            </div>
            
            <h2 style="color: #374151;">Files</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Number of files uploaded:</strong> ${(data.files || []).length}</p>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0; color: #92400e; font-style: italic;">
                This order was submitted through the Emiade Prints website.
              </p>
            </div>
          </div>
        </div>
      `;
    } else if (type === 'contact') {
      subject = `New Contact Form Submission - ${data.firstName || ''} ${data.lastName || ''}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Emiade Prints</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <h2 style="color: #374151; margin-top: 0;">Contact Information</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Name:</strong> ${data.firstName || ''} ${data.lastName || ''}</p>
              <p><strong>Email:</strong> ${data.email || 'Not provided'}</p>
              <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
              <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
            </div>
            
            <h2 style="color: #374151;">Message Details</h2>
            <div style="background: #f9fafb; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
              <p><strong>Subject:</strong> ${data.subject || 'No subject'}</p>
              <p><strong>Message:</strong></p>
              <div style="background: white; padding: 10px; border-radius: 4px; border: 1px solid #d1d5db;">
                <p style="margin: 0; white-space: pre-wrap;">${data.message || 'No message content'}</p>
              </div>
            </div>
            
            <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin-top: 20px;">
              <p style="margin: 0; color: #92400e; font-style: italic;">
                This message was submitted through the Emiade Prints contact form.
              </p>
            </div>
          </div>
        </div>
      `;
    }

    // Check if Resend API key is available
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is missing');
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using Resend
    const { data: emailData, error } = await resend.emails.send({
      from: 'Emiade Prints <onboarding@resend.dev>',
      to: recipientEmail,
      subject: subject,
      html: emailContent,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to send email', error: error.message },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', emailData);
    return NextResponse.json({ 
      success: true, 
      message: 'Email sent successfully',
      recipientEmail,
      subject,
      emailId: emailData?.id
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to send email' },
      { status: 500 }
    );
  }
} 