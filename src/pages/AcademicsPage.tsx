import React from 'react';
import { BookOpen, Calendar, Download, Users, GraduationCap, FileText, Clock } from 'lucide-react';
import Button from '../components/Button';

const AcademicsPage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Academic Excellence</h1>
            <p className="text-lg opacity-90">
              Discover our comprehensive academic programs designed to nurture intellectual 
              curiosity and prepare students for future success.
            </p>
          </div>
        </div>
      </section>

      {/* Programs Overview */}
      <section id="programs" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Academic Programs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Primary Section */}
            <div className="bg-primary-50 rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-primary-600 flex items-center justify-center">
                <div className="text-white text-center">
                  <BookOpen size={48} className="mx-auto mb-2" />
                  <h3 className="text-xl font-bold">Primary Section</h3>
                  <p className="text-sm opacity-80">Classes I to V</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Our primary education program focuses on building strong foundations through 
                  engaging, activity-based learning experiences that nurture curiosity and creativity.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Child-centered teaching approach
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Focus on language, mathematics, and environmental studies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Integrated arts, sports, and cultural activities
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Regular assessment of learning outcomes
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Secondary Section */}
            <div className="bg-primary-50 rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-primary-700 flex items-center justify-center">
                <div className="text-white text-center">
                  <BookOpen size={48} className="mx-auto mb-2" />
                  <h3 className="text-xl font-bold">Secondary Section</h3>
                  <p className="text-sm opacity-80">Classes VI to X</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Our secondary education program offers a balanced curriculum with academic rigor 
                  and opportunities for extracurricular growth to develop well-rounded individuals.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Comprehensive curriculum covering all major subjects
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Specialized faculty for each subject area
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Regular laboratory work for science subjects
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Preparation for board examinations
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Higher Secondary Section */}
            <div className="bg-primary-50 rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 bg-primary-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <BookOpen size={48} className="mx-auto mb-2" />
                  <h3 className="text-xl font-bold">Higher Secondary</h3>
                  <p className="text-sm opacity-80">Classes XI & XII</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Our higher secondary program prepares students for university education and 
                  future careers with specialized tracks tailored to their interests and abilities.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Specialized streams: Science, Commerce, and Humanities
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Advanced laboratory facilities for practical learning
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Career counseling and college preparation
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Competitive examination coaching
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Curriculum</h2>
            <p className="text-gray-600 text-center mb-10">
              Our curriculum is designed to provide a balanced and comprehensive education that develops 
              intellectual, physical, emotional, and social capabilities of students.
            </p>
            
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <BookOpen size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Academic Subjects</h3>
                    <p className="text-gray-600 mb-3">
                      Our core academic curriculum includes language studies (Hindi, English, Sanskrit), 
                      mathematics, sciences, social sciences, and information technology.
                    </p>
                    <p className="text-gray-600">
                      Each subject is taught by specialized teachers using a combination of theoretical 
                      instruction and practical application to ensure comprehensive understanding.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <Users size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Co-Curricular Activities</h3>
                    <p className="text-gray-600 mb-3">
                      We integrate arts, music, dance, and drama into our curriculum to foster 
                      creativity and cultural awareness among students.
                    </p>
                    <p className="text-gray-600">
                      Regular workshops, performances, and exhibitions provide opportunities for 
                      students to showcase their talents and gain confidence in public presentation.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <GraduationCap size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Life Skills Education</h3>
                    <p className="text-gray-600 mb-3">
                      We incorporate life skills education including communication, critical thinking, 
                      problem-solving, and ethical decision-making into our curriculum.
                    </p>
                    <p className="text-gray-600">
                      Through structured programs and situational learning, students develop 
                      essential skills for personal and professional success.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="bg-primary-100 p-3 rounded-full mr-4">
                    <FileText size={24} className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Assessment and Evaluation</h3>
                    <p className="text-gray-600 mb-3">
                      Our assessment system includes continuous evaluation through classwork, 
                      homework, projects, and periodic tests to monitor student progress.
                    </p>
                    <p className="text-gray-600">
                      We follow a comprehensive evaluation approach that considers academic 
                      performance, classroom participation, and overall development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Admissions */}
      <section id="admissions" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admissions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Admission Process</h3>
              <p className="text-gray-600 mb-6">
                HMPS Azamgarh welcomes applications from students who wish to be part of our 
                educational community. Our admission process is designed to be fair and transparent.
              </p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Step 1: Application Submission</h4>
                  <p className="text-gray-600 text-sm">
                    Complete and submit the application form along with required documents including 
                    birth certificate, previous academic records, and passport-sized photographs.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Step 2: Entrance Assessment</h4>
                  <p className="text-gray-600 text-sm">
                    Students applying for Classes II and above will take an entrance assessment to 
                    evaluate their academic readiness for the respective grade level.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Step 3: Interview</h4>
                  <p className="text-gray-600 text-sm">
                    Selected candidates and their parents/guardians will be invited for an interview 
                    with the admission committee to understand mutual expectations.
                  </p>
                </div>
                
                <div className="border-l-4 border-primary-500 pl-4 py-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Step 4: Admission Confirmation</h4>
                  <p className="text-gray-600 text-sm">
                    Successful candidates will receive an admission offer. Confirmation requires payment 
                    of admission fee and submission of remaining documents within the specified timeframe.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 space-y-4">
                <Button as="a" href="#" variant="primary" className="w-full">
                  Download Application Form <Download size={16} className="ml-2" />
                </Button>
                <Button as="a" href="#" variant="outline" className="w-full">
                  View Fee Structure
                </Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Admission Information</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-4">Admission Timeline 2025-26</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Application Forms Available</span>
                    <span className="font-medium text-gray-800">January 15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Date for Submission</span>
                    <span className="font-medium text-gray-800">March 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Entrance Assessment</span>
                    <span className="font-medium text-gray-800">April 10-15, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interview</span>
                    <span className="font-medium text-gray-800">April 20-25, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Results Declaration</span>
                    <span className="font-medium text-gray-800">May 5, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Admission Confirmation</span>
                    <span className="font-medium text-gray-800">May 15, 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-4">Age Eligibility Criteria</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class I</span>
                    <span className="font-medium text-gray-800">5+ years as of March 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class II</span>
                    <span className="font-medium text-gray-800">6+ years as of March 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Class III</span>
                    <span className="font-medium text-gray-800">7+ years as of March 31, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">For other classes</span>
                    <span className="font-medium text-gray-800">Age appropriate to the class</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Contact for Admissions</h4>
                <p className="text-gray-600 mb-1">
                  For any queries regarding admissions, please contact:
                </p>
                <div className="text-primary-600">
                  <p>admissions@hmpsazamgarh.org</p>
                  <p>+91 9876543210</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Calendar */}
      <section id="calendar" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Academic Calendar 2025-26</h2>
          
          <div className="bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Important Dates</h3>
              <Button as="a" href="#" variant="outline" className="flex items-center">
                <Calendar size={16} className="mr-2" />
                Download Full Calendar
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Term 1 */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Term 1 (April - September)</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">APR</span>
                      <span className="block text-lg font-bold">01</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">School Reopens for Academic Year 2025-26</h5>
                      <p className="text-gray-600 text-sm">First day of classes for all grades</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">APR</span>
                      <span className="block text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Annual Cultural Festival "Tarang 2025"</h5>
                      <p className="text-gray-600 text-sm">Three-day cultural event (April 15-17)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">JUN</span>
                      <span className="block text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">First Term Assessments Begin</h5>
                      <p className="text-gray-600 text-sm">Assessment period (June 15-25)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">SEP</span>
                      <span className="block text-lg font-bold">20</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Half-Yearly Examinations</h5>
                      <p className="text-gray-600 text-sm">Examination period (September 20-30)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Term 2 */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-3 pb-2 border-b">Term 2 (October - March)</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">OCT</span>
                      <span className="block text-lg font-bold">10</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">School Reopens After Autumn Break</h5>
                      <p className="text-gray-600 text-sm">Classes resume for second term</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">DEC</span>
                      <span className="block text-lg font-bold">05</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Annual Sports Day</h5>
                      <p className="text-gray-600 text-sm">Full day sports event for all classes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">JAN</span>
                      <span className="block text-lg font-bold">15</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Second Term Assessments</h5>
                      <p className="text-gray-600 text-sm">Assessment period (January 15-25)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">MAR</span>
                      <span className="block text-lg font-bold">10</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Final Examinations</h5>
                      <p className="text-gray-600 text-sm">Examination period (March 10-25)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 text-primary-800 p-2 rounded text-center min-w-[60px] mr-4">
                      <span className="block text-sm">MAR</span>
                      <span className="block text-lg font-bold">31</span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-800">Annual Day & Closing Ceremony</h5>
                      <p className="text-gray-600 text-sm">Last day of academic year 2025-26</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <Clock size={18} className="mr-2 text-primary-600" />
                School Timings
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Primary Section (Classes I-V)</h5>
                  <p className="text-gray-600">Monday to Friday: 8:30 AM - 2:00 PM</p>
                  <p className="text-gray-600">Saturday: 8:30 AM - 12:00 PM</p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">Secondary & Higher Secondary (Classes VI-XII)</h5>
                  <p className="text-gray-600">Monday to Friday: 8:00 AM - 2:30 PM</p>
                  <p className="text-gray-600">Saturday: 8:00 AM - 12:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join HMPS Azamgarh?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Take the first step towards a quality education for your child. Apply for admission now or 
            schedule a visit to our campus to learn more about our academic programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button as="a" href="#admissions" variant="light">
              Apply for Admission
            </Button>
            <Button as="a" href="/contact" variant="outline-light">
              Schedule a Visit
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;