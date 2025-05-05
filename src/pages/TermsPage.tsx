import React from 'react';
import { FileText, BookOpen, AlertTriangle, Info, HelpCircle, Scale, Users, Mail } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary-800 dark:bg-primary-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-lg opacity-90">
              Guidelines governing the use of HMPS Azamgarh website and services
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <FileText className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Terms and Conditions for HMPS Azamgarh</h2>
                  <p className="text-gray-500 dark:text-gray-400">Last updated: July 2024</p>
                </div>
              </div>

              <p>
                Welcome to the Harish Chandra Mishra Public School website. By accessing or using our website, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, please do not use our website.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <BookOpen className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Website Usage</h3>
              </div>

              <p>
                The content of this website is for general information and use only. It is subject to change without notice. This website uses cookies to monitor browsing preferences. Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness, or suitability of the information and materials found or offered on this website for any particular purpose.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <AlertTriangle className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Limitations of Liability</h3>
              </div>

              <p>
                Your use of any information or materials on this website is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services, or information available through this website meet your specific requirements.
              </p>

              <p>
                This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance, and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Info className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Information Accuracy</h3>
              </div>

              <p>
                We strive to provide accurate and up-to-date information on our website. However, we do not warrant that the information on this website is complete, true, accurate, or non-misleading. The information provided is for general guidance only and should not be relied upon as the sole basis for making decisions without consulting primary, more accurate, more complete, or more timely sources of information.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <HelpCircle className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Admission Information</h3>
              </div>

              <p>
                Information regarding admissions, fees, and academic programs is provided for informational purposes only. While we make reasonable efforts to ensure accuracy, the final authority on admissions, fees, and program requirements rests with the school administration. Prospective students and parents should contact the school directly for the most current and official information.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Scale className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Governing Law</h3>
              </div>

              <p>
                Any claim relating to the HMPS Azamgarh website shall be governed by the laws of India without regard to its conflict of law provisions. General Terms and Conditions applicable to Use of a Website.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Users className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">External Links</h3>
              </div>

              <p>
                Our website may contain links to external websites that are not provided or maintained by us. We do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Mail className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Contact Us</h3>
              </div>

              <p>
                If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
              </p>

              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="m-0"><strong>Harish Chandra Mishra Public School</strong><br />
                Kartalpur Bypass (Saraimandraj)<br />
                Azamgarh 276001 (U.P.)<br />
                Email: hmpsazamgarh@gmail.com<br />
                Phone: +91 788701 12393, +91 78870 12394</p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By using our website, you acknowledge that you have read and understand these Terms and Conditions. We reserve the right to modify these terms at any time, so please review them frequently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage; 