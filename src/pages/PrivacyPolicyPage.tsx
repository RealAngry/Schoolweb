import React from 'react';
import { Shield, Lock, FileText, Clock, Users, Eye, Settings, Mail } from 'lucide-react';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-primary-800 dark:bg-primary-900 text-white py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg opacity-90">
              How Harish Chandra Mishra Public School handles and protects your information
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="flex items-center mb-8">
                <div className="mr-4 p-3 bg-primary-100 dark:bg-primary-900 rounded-full">
                  <Shield className="text-primary-600 dark:text-primary-400" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white m-0">Privacy Policy for HMPS Azamgarh</h2>
                  <p className="text-gray-500 dark:text-gray-400">Last updated: July 2024</p>
                </div>
              </div>

              <p>
                At Harish Chandra Mishra Public School, Azamgarh, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website or interact with our school services.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Lock className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Information We Collect</h3>
              </div>

              <p>
                We collect several types of information from and about users of our website, including:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span><strong>Personal information:</strong> Such as name, email address, postal address, phone number, and other identifiers that you voluntarily provide when applying for admission, contacting us, or registering for events.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span><strong>Educational information:</strong> Academic records, test scores, and other educational data necessary for admission or enrollment purposes.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span><strong>Usage information:</strong> Information about your visits to and use of our website, including IP address, browser type, access times, and pages viewed.</span>
                </li>
              </ul>

              <div className="flex items-center mt-8 mb-4">
                <FileText className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">How We Use Your Information</h3>
              </div>

              <p>
                We use the information we collect primarily to:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Process admission applications and enrollment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Communicate with parents, students, and visitors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Send notifications about school events, programs, and news</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Improve our website and educational services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Comply with legal obligations</span>
                </li>
              </ul>

              <div className="flex items-center mt-8 mb-4">
                <Clock className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Retention of Information</h3>
              </div>

              <p>
                We retain personal information for as long as necessary to fulfill the purposes for which it was collected, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Users className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Information Sharing and Disclosure</h3>
              </div>

              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties without your consent, except:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>To educational authorities and regulatory bodies as required by law</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>To trusted third parties who assist us in operating our website, conducting our business, or servicing you, provided they agree to keep this information confidential</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>When we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety</span>
                </li>
              </ul>

              <div className="flex items-center mt-8 mb-4">
                <Eye className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Your Rights</h3>
              </div>

              <p>
                You have certain rights regarding your personal information, including:
              </p>

              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Right to access your personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Right to correct inaccurate or incomplete information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Right to request deletion of your personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary-600 dark:text-primary-400 mr-2 mt-1">•</span>
                  <span>Right to restrict or object to processing of your information</span>
                </li>
              </ul>

              <div className="flex items-center mt-8 mb-4">
                <Settings className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Cookies and Tracking Technologies</h3>
              </div>

              <p>
                Our website may use cookies and similar tracking technologies to enhance your experience, analyze usage, and gather information about how visitors interact with our site. You can control the use of cookies at the individual browser level, but disabling cookies may limit your use of certain features on our website.
              </p>

              <div className="flex items-center mt-8 mb-4">
                <Mail className="text-primary-600 dark:text-primary-400 mr-3 flex-shrink-0" size={20} />
                <h3 className="text-xl font-bold text-gray-800 dark:text-white m-0">Contact Us</h3>
              </div>

              <p>
                If you have questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:
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
                  This Privacy Policy may be updated periodically to reflect changes in our practices. We encourage you to review this page regularly for the latest information on our privacy practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage; 