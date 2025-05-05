import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import Button from '../components/Button';
import { sendToDiscord } from '../utils/discord';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    error: boolean;
    message: string;
    loading: boolean;
  }>({
    submitted: false,
    error: false,
    message: '',
    loading: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Please fill all required fields.',
        loading: false
      });
      return;
    }

    // Set loading state
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Sending your message...',
      loading: true
    });
    
    try {
      // Send message to Discord webhook
      await sendToDiscord({
        username: "Contact Form Bot",
        embeds: [
          {
            title: "New Contact Form Submission",
            color: 0x4f46e5, // primary-600 color
            fields: [
              { name: "Name", value: formData.name, inline: true },
              { name: "Email", value: formData.email, inline: true },
              { name: "Phone", value: formData.phone || "Not provided", inline: true },
              { name: "Subject", value: formData.subject || "Not specified", inline: false },
              { name: "Message", value: formData.message, inline: false }
            ],
            timestamp: new Date().toISOString(),
          }
        ]
      });

      // Show success message
      setFormStatus({
        submitted: true,
        error: false,
        message: 'Thank you for your message. We will get back to you soon!',
        loading: false
      });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Failed to send your message. Please try again later or contact us directly.',
        loading: false
      });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg opacity-90">
              We're here to help and answer any questions you might have. 
              We look forward to hearing from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information and Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-lg h-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <MapPin size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                      <p className="text-gray-600">
                        HMPS Azamgarh,<br />
                        Civil Lines, Azamgarh,<br />
                        Uttar Pradesh - 276001
                      </p>
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <Phone size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                      <p className="text-gray-600">+91 1234567890</p>
                      <p className="text-gray-600">+91 9876543210</p>
                    </div>
                  </div>
                  
                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <Mail size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                      <p className="text-gray-600">info@hmpsazamgarh.org</p>
                      <p className="text-gray-600">admissions@hmpsazamgarh.org</p>
                    </div>
                  </div>
                  
                  {/* Office Hours */}
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 p-3 rounded-full">
                      <Clock size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Office Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-600">Saturday: 9:00 AM - 1:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                
                {formStatus.submitted && (
                  <div className={`mb-6 p-4 rounded-lg ${formStatus.error ? 'bg-red-50 text-red-800' : 'bg-green-50 text-green-800'}`}>
                    {formStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        required
                        disabled={formStatus.loading}
                      />
                    </div>
                    
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        required
                        disabled={formStatus.loading}
                      />
                    </div>
                    
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        disabled={formStatus.loading}
                      />
                    </div>
                    
                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                        disabled={formStatus.loading}
                      >
                        <option value="">Please select</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Admissions">Admissions</option>
                        <option value="Academics">Academics</option>
                        <option value="Events">Events</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                      required
                      disabled={formStatus.loading}
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={formStatus.loading}
                  >
                    {formStatus.loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Us</h2>
          <div className="rounded-lg overflow-hidden h-[400px] shadow-md">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57487.38562099436!2d83.15099272551563!3d26.073601410971794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991badba5bb151b%3A0xe36342c27050c51d!2sAzamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1667921793854!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="HMPS Azamgarh Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What are the admission procedures?</h3>
              <p className="text-gray-600">
                Admission procedures vary by grade level. Generally, they include an application form, 
                previous academic records, and an entrance test. Please visit our Admissions page for detailed information.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What are the school timings?</h3>
              <p className="text-gray-600">
                School hours are from 8:00 AM to 2:30 PM, Monday through Friday. 
                Administrative offices remain open until 4:00 PM on weekdays and until 1:00 PM on Saturdays.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is transportation available?</h3>
              <p className="text-gray-600">
                Yes, we provide transportation services covering major areas of Azamgarh district. 
                Bus routes and schedules can be obtained from the administrative office.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What extracurricular activities are offered?</h3>
              <p className="text-gray-600">
                We offer a wide range of extracurricular activities including sports, music, dance, 
                art, debate, and various clubs. Students are encouraged to participate in activities that interest them.
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Are scholarships available?</h3>
              <p className="text-gray-600">
                Yes, we offer merit-based and need-based scholarships. Details about eligibility criteria 
                and application process can be found in the Admissions section or by contacting our administrative office.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;