import React from 'react';
import { AlertTriangle, Megaphone, Link2, ExternalLink, Check, X, HelpCircle } from 'lucide-react';

const DisclaimerPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary-800 dark:bg-primary-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Disclaimer</h1>
            <p className="text-lg opacity-90">
              Important information about the use of our website and services
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer Content */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <Megaphone className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Website Disclaimer</h2>
                  <p className="text-gray-500 dark:text-gray-400">Last updated: July 2024</p>
                </div>
              </div>

              <p className="lead">
                The information provided by Harish Chandra Mishra Public School ("we," "us," or "our") on our website (hmpsazamgarh.org) is for general informational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <AlertTriangle className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">No Liability</h3>
              </div>

              <p>
                Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Link2 className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">External Links Disclaimer</h3>
              </div>

              <p>
                The site may contain (or you may be sent through the site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
              </p>

              <p>
                We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site or any website or feature linked in any banner or other advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you and third-party providers of products or services.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <ExternalLink className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Professional Disclaimer</h3>
              </div>

              <p>
                The site cannot and does not contain education or academic advice. The educational and academic information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
              </p>

              <p>
                We do not provide any kind of education or academic advice. The use or reliance of any information contained on this site is solely at your own risk.
              </p>

              <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg my-8">
                <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white flex items-center">
                  <Check className="text-green-500 mr-2" size={20} />
                  What We Provide
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>General information about our school, programs, and activities</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Resources for current students and parents</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="text-green-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>News and updates about school events</span>
                  </li>
                </ul>

                <h4 className="text-lg font-bold mb-4 mt-6 text-gray-800 dark:text-white flex items-center">
                  <X className="text-red-500 mr-2" size={20} />
                  What We Don't Provide
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Professional educational consultation or personalized academic advice</span>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Guarantee of admission or academic results</span>
                  </li>
                  <li className="flex items-start">
                    <X className="text-red-500 mr-2 mt-1 flex-shrink-0" size={16} />
                    <span>Official academic records or transcripts through the website</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center mt-8 mb-4">
                <HelpCircle className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Contact Us</h3>
              </div>

              <p>
                If you have any questions about this Disclaimer, please contact us at:
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
                  By using our website, you hereby consent to our disclaimer and agree to its terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DisclaimerPage; 