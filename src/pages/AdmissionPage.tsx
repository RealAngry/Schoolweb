import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Calendar, AlertCircle, Send } from 'lucide-react';
import toast from 'react-hot-toast';

// Discord webhook utility function
import { sendToDiscord } from '../utils/discord';

// Admission Form Interface
interface AdmissionFormData {
  studentName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  applyingForClass: string;
  stream?: string;
  religion: string;
  category: string;
  bloodGroup?: string;
  aadharNumber?: string;
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  email: string;
  phone: string;
  altPhone?: string;
  address: string;
  previousSchool?: string;
  previousClass?: string;
  previousMarks?: string;
  reasonForLeaving?: string;
  message?: string;
}

const AdmissionPage: React.FC = () => {
  const [formData, setFormData] = useState<AdmissionFormData>({
    studentName: '',
    dob: '',
    gender: 'male',
    applyingForClass: '',
    stream: '',
    religion: '',
    category: '',
    bloodGroup: '',
    aadharNumber: '',
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    email: '',
    phone: '',
    altPhone: '',
    address: '',
    previousSchool: '',
    previousClass: '',
    previousMarks: '',
    reasonForLeaving: '',
    message: '',
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};
    
    if (currentStep === 1) {
      if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.applyingForClass) newErrors.applyingForClass = 'Class is required';
      
      // Validate stream for higher classes
      const classNum = parseInt(formData.applyingForClass.replace(/\D/g, ''));
      if ((classNum === 11 || classNum === 12) && !formData.stream) {
        newErrors.stream = 'Stream is required for Class 11 and 12';
      }
      
      if (!formData.religion.trim()) newErrors.religion = 'Religion is required';
      if (!formData.category.trim()) newErrors.category = 'Category is required';
      
      // Validate Aadhar (if provided)
      if (formData.aadharNumber && !/^\d{12}$/.test(formData.aadharNumber)) {
        newErrors.aadharNumber = 'Aadhar number should be 12 digits';
      }
    } else if (currentStep === 2) {
      if (!formData.fatherName.trim()) newErrors.fatherName = 'Father\'s name is required';
      if (!formData.motherName.trim()) newErrors.motherName = 'Mother\'s name is required';
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number should be 10 digits';
      }
      
      // Validate alternate phone (if provided)
      if (formData.altPhone && !/^\d{10}$/.test(formData.altPhone)) {
        newErrors.altPhone = 'Alternate phone number should be 10 digits';
      }
      
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    setSubmitting(true);
    
    try {
      // Create stream display value if applicable
      const streamDisplay = formData.stream ? 
        (formData.applyingForClass === 'Class 11' || formData.applyingForClass === 'Class 12' ? 
          `${formData.applyingForClass} (${formData.stream})` : formData.applyingForClass) 
        : formData.applyingForClass;
      
      // Send to Discord webhook
      await sendToDiscord({
        content: `@reception New Admission Form Submission!`,
        embeds: [
          {
            title: `Admission Form: ${formData.studentName}`,
            color: 0x4f46e5, // primary-600 color
            fields: [
              // Student Information
              { name: '📚 Student Information', value: '───────────────────', inline: false },
              { name: 'Student Name', value: formData.studentName, inline: true },
              { name: 'Date of Birth', value: formData.dob, inline: true },
              { name: 'Gender', value: formData.gender, inline: true },
              { name: 'Applying for', value: streamDisplay, inline: true },
              { name: 'Religion', value: formData.religion || 'Not specified', inline: true },
              { name: 'Category', value: formData.category || 'Not specified', inline: true },
              { name: 'Blood Group', value: formData.bloodGroup || 'Not specified', inline: true },
              { name: 'Aadhar Number', value: formData.aadharNumber || 'Not provided', inline: true },
              
              // Parent Information
              { name: '👨‍👩‍👧‍👦 Parent Information', value: '───────────────────', inline: false },
              { name: 'Father\'s Name', value: formData.fatherName, inline: true },
              { name: 'Father\'s Occupation', value: formData.fatherOccupation || 'Not specified', inline: true },
              { name: 'Mother\'s Name', value: formData.motherName, inline: true },
              { name: 'Mother\'s Occupation', value: formData.motherOccupation || 'Not specified', inline: true },
              
              // Contact Information
              { name: '📞 Contact Information', value: '───────────────────', inline: false },
              { name: 'Email', value: formData.email, inline: true },
              { name: 'Phone', value: formData.phone, inline: true },
              { name: 'Alt. Phone', value: formData.altPhone || 'Not provided', inline: true },
              { name: 'Address', value: formData.address },
              
              // Previous School Information
              { name: '🏫 Previous School Information', value: '───────────────────', inline: false },
              { name: 'Previous School', value: formData.previousSchool || 'N/A', inline: true },
              { name: 'Previous Class', value: formData.previousClass || 'N/A', inline: true },
              { name: 'Previous Marks/Grade', value: formData.previousMarks || 'N/A', inline: true },
              { name: 'Reason for Leaving', value: formData.reasonForLeaving || 'N/A' },
              
              // Additional Information
              { name: '💬 Additional Information', value: formData.message || 'No additional information provided' },
            ],
            timestamp: new Date().toISOString(),
          }
        ]
      });
      
      // Success!
      toast.success('Admission form submitted successfully! We will contact you soon.');
      setStep(3); // Move to success step
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error submitting your form. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const classes = [
    'Nursery', 'LKG', 'UKG', 'Class 1', 'Class 2', 'Class 3',
    'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 
    'Class 9', 'Class 10', 'Class 11', 'Class 12'
  ];
  
  const streams = [
    'Science (PCM)', 'Science (PCB)', 'Commerce', 'Arts/Humanities'
  ];
  
  const categories = [
    'General', 'OBC', 'SC', 'ST', 'EWS', 'Other'
  ];
  
  const bloodGroups = [
    'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Don\'t Know'
  ];
  
  const showStreamSelection = () => {
    if (!formData.applyingForClass) return false;
    return formData.applyingForClass === 'Class 11' || formData.applyingForClass === 'Class 12';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Admission Process
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              HMPS Azamgarh welcomes your application for the 2025-26 academic session. 
              Fill out the form below to begin your admission process.
            </p>
          </motion.div>

          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    step > i ? 'bg-primary-600 text-white' : 
                    step === i ? 'bg-primary-100 border-2 border-primary-600 text-primary-600' : 
                    'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {step > i ? <Check size={18} /> : i}
                  </div>
                  {i < 3 && (
                    <div className={`w-16 h-1 ${step > i ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <span className="text-gray-600 dark:text-gray-300">
                {step === 1 ? "Student Information" : 
                 step === 2 ? "Parent/Guardian Information" : 
                 "Application Complete"}
              </span>
            </div>
          </div>

          {/* Form Container */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {step < 3 ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                {/* Step 1: Student Information */}
                {step === 1 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                      Student Information
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="studentName"
                          name="studentName"
                          value={formData.studentName}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.studentName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="Enter student's full name"
                        />
                        {errors.studentName && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.studentName}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Date of Birth *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.dob ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          />
                          <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" />
                        </div>
                        {errors.dob && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.dob}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Gender *
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="applyingForClass" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Applying for Class *
                        </label>
                        <select
                          id="applyingForClass"
                          name="applyingForClass"
                          value={formData.applyingForClass}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.applyingForClass ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        >
                          <option value="">Select Class</option>
                          {classes.map(cls => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                        {errors.applyingForClass && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.applyingForClass}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Stream selection for Class 11 and 12 */}
                    {showStreamSelection() && (
                      <div>
                        <label htmlFor="stream" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Stream *
                        </label>
                        <select
                          id="stream"
                          name="stream"
                          value={formData.stream}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.stream ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        >
                          <option value="">Select Stream</option>
                          {streams.map(stream => (
                            <option key={stream} value={stream}>{stream}</option>
                          ))}
                        </select>
                        {errors.stream && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.stream}
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="religion" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Religion *
                        </label>
                        <input
                          type="text"
                          id="religion"
                          name="religion"
                          value={formData.religion}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.religion ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="Enter religion"
                        />
                        {errors.religion && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.religion}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.category ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        >
                          <option value="">Select Category</option>
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                        {errors.category && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.category}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Blood Group
                        </label>
                        <select
                          id="bloodGroup"
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleChange}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map(group => (
                            <option key={group} value={group}>{group}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="aadharNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Aadhar Number
                        </label>
                        <input
                          type="text"
                          id="aadharNumber"
                          name="aadharNumber"
                          value={formData.aadharNumber}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="12-digit Aadhar number"
                          maxLength={12}
                        />
                        {errors.aadharNumber && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.aadharNumber}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-md font-medium text-gray-800 dark:text-white mb-4">Previous School Information (if applicable)</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="previousSchool" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Previous School Name
                          </label>
                          <input
                            type="text"
                            id="previousSchool"
                            name="previousSchool"
                            value={formData.previousSchool}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter previous school name"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="previousClass" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Previous Class
                          </label>
                          <input
                            type="text"
                            id="previousClass"
                            name="previousClass"
                            value={formData.previousClass}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Last class attended"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        <div>
                          <label htmlFor="previousMarks" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Previous Marks/Grade
                          </label>
                          <input
                            type="text"
                            id="previousMarks"
                            name="previousMarks"
                            value={formData.previousMarks}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Marks/Grade obtained"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="reasonForLeaving" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Reason for Leaving
                          </label>
                          <input
                            type="text"
                            id="reasonForLeaving"
                            name="reasonForLeaving"
                            value={formData.reasonForLeaving}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Reason for leaving previous school"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Step 2: Parent/Guardian Information */}
                {step === 2 && (
                  <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                      Parent Information
                    </h2>
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <h3 className="text-md font-medium text-gray-800 dark:text-white mb-4">Father's Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Father's Name *
                          </label>
                          <input
                            type="text"
                            id="fatherName"
                            name="fatherName"
                            value={formData.fatherName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.fatherName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                            placeholder="Enter father's name"
                          />
                          {errors.fatherName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle size={14} className="mr-1" />
                              {errors.fatherName}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="fatherOccupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Father's Occupation
                          </label>
                          <input
                            type="text"
                            id="fatherOccupation"
                            name="fatherOccupation"
                            value={formData.fatherOccupation}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter father's occupation"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                      <h3 className="text-md font-medium text-gray-800 dark:text-white mb-4">Mother's Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="motherName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mother's Name *
                          </label>
                          <input
                            type="text"
                            id="motherName"
                            name="motherName"
                            value={formData.motherName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 rounded-lg border ${errors.motherName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                            placeholder="Enter mother's name"
                          />
                          {errors.motherName && (
                            <p className="mt-1 text-sm text-red-500 flex items-center">
                              <AlertCircle size={14} className="mr-1" />
                              {errors.motherName}
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <label htmlFor="motherOccupation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Mother's Occupation
                          </label>
                          <input
                            type="text"
                            id="motherOccupation"
                            name="motherOccupation"
                            value={formData.motherOccupation}
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="Enter mother's occupation"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-md font-medium text-gray-800 dark:text-white mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="Enter email address"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Primary Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                            bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                          placeholder="Enter 10-digit phone number"
                          maxLength={10}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-500 flex items-center">
                            <AlertCircle size={14} className="mr-1" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="altPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Alternate Phone Number
                      </label>
                      <input
                        type="tel"
                        id="altPhone"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.altPhone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        placeholder="Enter alternate contact number (optional)"
                        maxLength={10}
                      />
                      {errors.altPhone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.altPhone}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Complete Address *
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full px-4 py-2 rounded-lg border ${errors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent`}
                        placeholder="Enter complete address"
                      />
                      {errors.address && (
                        <p className="mt-1 text-sm text-red-500 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {errors.address}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Additional Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                          bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Any additional information or questions?"
                      />
                    </div>
                  </div>
                )}
                
                {/* Navigation buttons */}
                <div className="mt-8 flex justify-between items-center">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300
                        hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  
                  <div className={`${step > 1 ? '' : 'ml-auto'}`}>
                    {step < 2 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md
                          transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      >
                        Continue
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md
                          transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                          flex items-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {submitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                          </>
                        ) : (
                          <>
                            <Send size={18} className="mr-2" />
                            Submit Application
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </form>
            ) : (
              // Success screen
              <div className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-3">
                    <Check size={36} className="text-green-600 dark:text-green-300" />
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Application Submitted Successfully!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
                  Thank you for applying to HMPS Azamgarh. Our admissions team will review your application 
                  and contact you shortly.
                </p>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg max-w-md mx-auto mb-8">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">Next Steps:</h3>
                  <ol className="text-left text-gray-600 dark:text-gray-300 space-y-2 pl-5 list-decimal">
                    <li>You will receive a confirmation email with your application details.</li>
                    <li>Our admissions team will review your application within 5-7 working days.</li>
                    <li>You will be contacted for document verification and an entrance assessment.</li>
                    <li>Final admission will be confirmed after the assessment and interview process.</li>
                  </ol>
                </div>
                
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  For any queries, please contact: <br />
                  <span className="font-medium">hmpsazamgarh@gmail.com</span> or <span className="font-medium">+91 788701 12393</span>
                </p>
              </div>
            )}
          </motion.div>
          
          {/* Admission Process Info */}
          <motion.div 
            className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6 md:p-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                Admission Process at HMPS Azamgarh
              </h2>
              
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Online Application</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Fill out the online admission form with all the required details.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Document Verification</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Submit the required documents for verification at the school office.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Entrance Assessment</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Students seeking admission to Class I and above will need to appear for an entrance assessment.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Interview</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Parents and students will be called for an interview with the Principal.
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                    <span className="text-primary-600 dark:text-primary-300 font-medium">5</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Fee Payment</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Upon selection, complete the admission by paying the required fees.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-200 dark:border-amber-900">
                <h3 className="font-medium text-amber-800 dark:text-amber-300 flex items-center">
                  <AlertCircle size={16} className="mr-2" />
                  Required Documents
                </h3>
                <ul className="mt-2 pl-6 text-sm text-amber-700 dark:text-amber-200 space-y-1 list-disc">
                  <li>Birth Certificate</li>
                  <li>Transfer Certificate from previous school (for Class II onwards)</li>
                  <li>Report Card of previous academic year</li>
                  <li>4 recent passport-sized photographs</li>
                  <li>Address Proof</li>
                  <li>Aadhar Card of the student</li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Information */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-gray-600 dark:text-gray-300">
              For any admission related queries, please contact us at: <br />
              <span className="font-medium text-primary-600 dark:text-primary-400">+91 788701 12393, +91 78870 12394</span> or email us at <span className="font-medium text-primary-600 dark:text-primary-400">hmpsazamgarh@gmail.com</span>
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Kartalpur Bypass (Saraimandraj Azamgarh 276001 (U.P.)
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionPage; 