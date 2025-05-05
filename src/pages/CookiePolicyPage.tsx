import React from 'react';
import { Cookie, Shield, Key, FileText, Settings, Clock, AlertTriangle, HelpCircle } from 'lucide-react';

const CookiePolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary-800 dark:bg-primary-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
            <p className="text-lg opacity-90">
              How HMPS Azamgarh uses cookies and similar technologies
            </p>
          </div>
        </div>
      </section>

      {/* Cookie Policy Content */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <Cookie className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Cookie Policy for HMPS Azamgarh Website</h2>
                  <p className="text-gray-500 dark:text-gray-400">Last updated: July 2024</p>
                </div>
              </div>

              <p>
                This Cookie Policy explains how Harish Chandra Mishra Public School ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at <a href="/" className="text-primary-600 dark:text-primary-400 hover:underline">hmpsazamgarh.org</a> ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Key className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">What Are Cookies?</h3>
              </div>

              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>

              <p>
                Cookies set by the website owner (in this case, HMPS Azamgarh) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <FileText className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Types of Cookies We Use</h3>
              </div>

              <p>We use the following types of cookies on our Website:</p>

              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <Shield className="text-primary-600 dark:text-primary-400 mr-3 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <strong className="font-medium text-gray-900 dark:text-white">Essential Cookies:</strong>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Settings className="text-primary-600 dark:text-primary-400 mr-3 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <strong className="font-medium text-gray-900 dark:text-white">Functional Cookies:</strong>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Key className="text-primary-600 dark:text-primary-400 mr-3 mt-1 flex-shrink-0" size={18} />
                  <div>
                    <strong className="font-medium text-gray-900 dark:text-white">Authentication Cookies:</strong>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      These cookies help us identify users and remember their login information to improve their experience on our website, particularly for the student and staff portals.
                    </p>
                  </div>
                </li>
              </ul>

              <div className="flex items-center mt-8 mb-4">
                <Clock className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">How Long Will Cookies Stay on My Device?</h3>
              </div>

              <p>
                The length of time that a cookie will remain on your computer or mobile device depends on whether it is a "persistent" or "session" cookie. Session cookies will remain on your device until you stop browsing. Persistent cookies remain on your computer or mobile device until they expire or are deleted.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <AlertTriangle className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">How to Control Cookies</h3>
              </div>

              <p>
                You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can negatively impact your user experience and parts of our website may no longer be fully accessible.
              </p>

              <p>
                Most browsers automatically accept cookies, but you can choose whether or not to accept cookies through your browser controls, often found in your browser's "Tools" or "Preferences" menu. For more information on how to modify your browser settings or how to block, manage or filter cookies, you can visit <a href="https://www.allaboutcookies.org" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <HelpCircle className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Contact Us</h3>
              </div>

              <p>
                If you have any questions about our use of cookies or other technologies, please contact us at:
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
                  This Cookie Policy is part of and is incorporated into our Terms and Conditions. We reserve the right to change this Cookie Policy at any time in accordance with this provision.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiePolicyPage; 