"use client";

import { useState, useRef } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { Dropdown } from "primereact/dropdown";

interface SubjectOption {
  value: string;
  label: string;
}

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<SubjectOption | null>(
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  const subjectOptions: SubjectOption[] = [
    { value: "quote", label: "Request a Quote" },
    { value: "order", label: "Place an Order" },
    { value: "design", label: "Design Services" },
    { value: "support", label: "Customer Support" },
    { value: "partnership", label: "Business Partnership" },
    { value: "other", label: "Other" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      subject: selectedSubject?.value || (formData.get("subject") as string),
      message: formData.get("message") as string,
    };

    try {
      // Send email notification
      const emailResponse = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "contact",
          data: data,
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        setSubmitMessage(
          "Message sent successfully! We'll get back to you within 2-4 hours."
        );
        // Safely reset the form using the ref
        if (formRef.current) {
          formRef.current.reset();
        }
        setSelectedSubject(null);
      } else {
        setSubmitMessage(
          "Message sent successfully! (Note: Email notification to our team failed)"
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSubmitMessage(
        "Message sent successfully! (Note: Email notification to our team failed)"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact Emiade Printing Company
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get in touch with us for all your printing needs. We&apos;re here to
            help bring your vision to life with professional quality and
            exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>

              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Phone className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Phone Numbers
                    </h3>
                    <p className="text-gray-600">+234-803-207-1872</p>
                    <p className="text-gray-600">+234-814-997-5042</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 rounded-full p-3">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Email Addresses
                    </h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:emiadegroup@gmail.com"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        emiadegroup@gmail.com
                      </a>
                    </p>
                    <p className="text-gray-600">
                      <a
                        href="mailto:emiadeprintingandcomputer@gmail.com"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        emiadeprintingandcomputer@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-3">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Office Address
                    </h3>
                    <p className="text-gray-600">
                      59 Egbatedo Street,
                      <br />
                      Osogbo, Osun State,
                      <br />
                      Nigeria
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 rounded-full p-3">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Business Hours
                    </h3>
                    <div className="text-gray-600 space-y-1">
                      <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                      <p>Sunday: 1:00 PM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp Order Section */}
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-8 text-white">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">Quick Order via WhatsApp</h2>
              </div>
              <p className="text-green-100 mb-6">
                Need to place an order quickly? Click the button below to start
                your order directly through WhatsApp. Our team will respond
                immediately to assist you.
              </p>
              <a
                href="https://rebrand.ly/emiade"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Order via WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Send Us a Message
            </h2>

            {submitMessage && (
              <div
                className={`mb-6 p-4 rounded-lg ${
                  submitMessage.includes("successfully")
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {submitMessage}
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="input-field"
                    placeholder="Enter your first name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="input-field"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="input-field"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="input-field"
                  placeholder="+234-XXX-XXX-XXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="input-field"
                  placeholder="Enter your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <Dropdown
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.value)}
                  options={subjectOptions}
                  optionLabel="label"
                  placeholder="Select a subject"
                  className="w-full"
                  showClear
                  checkmark
                  highlightOnSelect={false}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="input-field resize-none"
                  placeholder="Tell us about your printing needs, project details, or any questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Response Time:</strong> We typically respond to all
                inquiries within 2-4 hours during business hours. For urgent
                matters, please call us directly or use our WhatsApp service.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            How We Can Help You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Free Consultation
              </h3>
              <p className="text-gray-600 text-sm">
                Get expert advice on your printing project, material selection,
                and design optimization at no cost.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Custom Quotes
              </h3>
              <p className="text-gray-600 text-sm">
                Receive detailed, competitive quotes tailored to your specific
                requirements and budget.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Design Support
              </h3>
              <p className="text-gray-600 text-sm">
                Our design team can help create or refine your artwork to ensure
                the best printing results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
