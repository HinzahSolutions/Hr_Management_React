

'use client';

import React, { useState } from 'react';
import { 
  X, User, Camera, Upload, FileText, 
  Trash2, Eye, Download, Plus 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const inputVariants = {
  focus: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } },
  blur: { scale: 1 },
};

export default function AddModal({ onClose, onAddEmployee }) { // Add onAddEmployee here
  const { theme } = useTheme();
  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    department: '',
    dob: '',
    docNum: '',
    joinDate: '',
    workType: '',
    phone: '',
    designation: '',
    address: '',
    emergencyContact: '',
  });

  // Theme helper functions
  const getPrimaryColor = () => theme?.accent?.split('-')[0] || 'blue';
  const getPrimaryColorClass = () => `text-${getPrimaryColor()}-600`;
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-blue-600 to-cyan-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-blue-700 hover:to-cyan-700';
  const getRingColor = () => theme?.ringColor || 'ring-blue-500';
  const getLightBg = () => theme?.lightBg || 'bg-blue-50';

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    const newDocuments = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type,
      file,
    }));
    setDocuments([...documents, ...newDocuments]);
  };

  const removeDocument = (id) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Corrected handleSubmit function - use onAddEmployee prop directly
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare employee data
    const employeeData = {
      fullName: formData.fullName,
      email: formData.email,
      department: formData.department,
      dob: formData.dob,
      docNum: formData.docNum,
      joinDate: formData.joinDate,
      workType: formData.workType,
      phone: formData.phone,
      designation: formData.designation,
      address: formData.address,
      emergencyContact: formData.emergencyContact,
      photo: photo,
      documents: documents
    };
    
    // Call the onAddEmployee prop if provided
    if (onAddEmployee) {
      onAddEmployee(employeeData);
    } else {
      // Fallback to console log
      console.log('Form Data:', employeeData);
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Modal Card – 70% Width */}
      <motion.div
        className="relative w-full top-40 max-w-6xl mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden"
        initial={{ y: 80, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 80, scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Theme Color */}
        <div className={`px-8 py-6 ${getLightBg()} border-b flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${getButtonGradient()}`}>
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Employee
              </h2>
              <p className="text-sm text-gray-600 mt-1">Fill in the employee details below</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-white/50 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Form Body – 3 Columns */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 1: Basic Information & Photo */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Photo Upload Section - Left Column */}
              <div className="lg:col-span-1 space-y-6">
                {/* Photo Upload */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-dashed border-gray-300">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
                        {photo ? (
                          <img 
                            src={photo} 
                            alt="Employee" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <label
                        htmlFor="photo-upload"
                        className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      >
                        <Camera className="h-5 w-5 text-gray-700" />
                        <input
                          id="photo-upload"
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="mt-4 text-sm text-gray-600">Upload employee photo</p>
                    <p className="text-xs text-gray-500">JPEG, PNG up to 5MB</p>
                  </div>
                </div>

                {/* Document Upload */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Documents
                    </h3>
                    <span className="text-sm text-gray-500">{documents.length} files</span>
                  </div>
                  
                  <label
                    htmlFor="document-upload"
                    className="block p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-white"
                  >
                    <div className="text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-medium text-gray-700">Click to upload documents</p>
                      <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPEG up to 10MB each</p>
                    </div>
                    <input
                      id="document-upload"
                      type="file"
                      multiple
                      onChange={handleDocumentUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Document List */}
                  {documents.length > 0 && (
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {documents.map(doc => (
                        <div
                          key={doc.id}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                              <p className="text-xs text-gray-500">{doc.size}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              className="p-1.5 hover:bg-gray-200 rounded"
                              title="View"
                            >
                              <Eye className="h-3.5 w-3.5 text-gray-600" />
                            </button>
                            <button
                              type="button"
                              className="p-1.5 hover:bg-gray-200 rounded"
                              title="Download"
                            >
                              <Download className="h-3.5 w-3.5 text-gray-600" />
                            </button>
                            <button
                              type="button"
                              onClick={() => removeDocument(doc.id)}
                              className="p-1.5 hover:bg-red-50 rounded"
                              title="Remove"
                            >
                              <Trash2 className="h-3.5 w-3.5 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information - Right 2/3 Columns */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <motion.input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      variants={inputVariants}
                      whileFocus="focus"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition-shadow"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <motion.input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.doe@company.com"
                      variants={inputVariants}
                      whileFocus="focus"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <motion.input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 123-4567"
                      variants={inputVariants}
                      whileFocus="focus"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <motion.input
                      id="dob"
                      type="date"
                      required
                      value={formData.dob}
                      onChange={handleInputChange}
                      variants={inputVariants}
                      whileFocus="focus"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <motion.textarea
                      id="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main St, City, State, ZIP Code"
                      rows="3"
                      variants={inputVariants}
                      whileFocus="focus"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 resize-none"
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="md:col-span-2">
                    <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <motion.input
                      id="emergencyContact"
                      type="text"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      placeholder="Name and phone number"
                      variants={inputVariants}
                      whileFocus="focus"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Employment Details */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Employment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Department */}
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                    Department *
                  </label>
                  <motion.select
                    id="department"
                    required
                    value={formData.department}
                    onChange={handleInputChange}
                    variants={inputVariants}
                    whileFocus="focus"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Department</option>
                    <option value="IT">Information Technology</option>
                    <option value="HR">Human Resources</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Customer Support">Customer Support</option>
                  </motion.select>
                </div>

                {/* Designation */}
                <div>
                  <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
                    Designation *
                  </label>
                  <motion.input
                    id="designation"
                    type="text"
                    required
                    value={formData.designation}
                    onChange={handleInputChange}
                    placeholder="Software Engineer"
                    variants={inputVariants}
                    whileFocus="focus"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Join Date */}
                <div>
                  <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Join Date *
                  </label>
                  <motion.input
                    id="joinDate"
                    type="date"
                    required
                    value={formData.joinDate}
                    onChange={handleInputChange}
                    variants={inputVariants}
                    whileFocus="focus"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Work Type */}
                <div>
                  <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-2">
                    Work Type *
                  </label>
                  <motion.select
                    id="workType"
                    required
                    value={formData.workType}
                    onChange={handleInputChange}
                    variants={inputVariants}
                    whileFocus="focus"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Work Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="intern">Intern</option>
                    <option value="remote">Remote</option>
                    <option value="hybrid">Hybrid</option>
                  </motion.select>
                </div>

                {/* Document Number */}
                <div>
                  <label htmlFor="docNum" className="block text-sm font-medium text-gray-700 mb-2">
                    Document Number *
                  </label>
                  <motion.input
                    id="docNum"
                    type="text"
                    required
                    value={formData.docNum}
                    onChange={handleInputChange}
                    placeholder="Aadhaar / Passport / ID Number"
                    variants={inputVariants}
                    whileFocus="focus"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">{documents.length}</span> documents attached
                {photo && <span>, 1 photo uploaded</span>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-8 py-3 rounded-lg ${getButtonGradient()} ${getButtonHover()} text-white font-medium shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add Employee
                  </div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}

// 'use client';

// import React, { useState } from 'react';
// import { 
//   X, User, Camera, Upload, FileText, 
//   Trash2, Eye, Download, Plus 
// } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { useTheme } from '../ThemeContext';

// const inputVariants = {
//   focus: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } },
//   blur: { scale: 1 },
// };

// export default function AddModal({ onClose, onAddEmployee }) {
//   const { theme } = useTheme();
//   const [photo, setPhoto] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     // Basic Info
//     name: '',
//     email: '',
//     phone: '',
    
//     // Personal Info
//     date_of_birth: '',
//     gender: '',
//     address: '',
//     country: '',
//     state: '',
//     city: '',
//     qualification: '',
//     experience: '',
//     marital_status: '',
//     children: '',
    
//     // Emergency Contact
//     emergency_contact: '',
//     emergency_contact_name: '',
//     emergency_contact_relation: '',
    
//     // Job Details
//     department: '',
//     shift_information: '',
//     employee_type: '',
//     reporting_manager: '',
//     work_location: '',
//     end_date: '',
//     work_type: '',
//     salary: '',
//     joining_date: '',
//     tags: '',
    
//     // Bank Details
//     bank_name: '',
//     branch: '',
//     bank_address: '',
//     bank_code_2: '',
//     account_number: '',
//     bank_code_1: '',
//     bank_country: '',
    
//     // Files (to be handled separately)
//     image: null,
//     file: null,
//   });

//   // Theme helper functions
//   const getPrimaryColor = () => theme?.accent?.split('-')[0] || 'blue';
//   const getPrimaryColorClass = () => `text-${getPrimaryColor()}-600`;
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-blue-600 to-cyan-600';
//   const getButtonHover = () => theme?.buttonHover || 'hover:from-blue-700 hover:to-cyan-700';
//   const getRingColor = () => theme?.ringColor || 'ring-blue-500';
//   const getLightBg = () => theme?.lightBg || 'bg-blue-50';

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // For preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
      
//       // Store file for submission
//       setFormData(prev => ({ ...prev, image: file }));
//     }
//   };

//   const handleDocumentUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newDocuments = files.map(file => ({
//       id: Date.now() + Math.random(),
//       name: file.name,
//       size: (file.size / 1024).toFixed(1) + ' KB',
//       type: file.type,
//       file,
//     }));
//     setDocuments([...documents, ...newDocuments]);
    
//     // Store the first document as 'file' for API (adjust based on your needs)
//     if (files[0]) {
//       setFormData(prev => ({ ...prev, file: files[0] }));
//     }
//   };

//   const removeDocument = (id) => {
//     setDocuments(documents.filter(doc => doc.id !== id));
//   };

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     try {
//       // Prepare FormData for file upload
//       const formDataToSend = new FormData();
      
//       // Append all form fields
//       Object.keys(formData).forEach(key => {
//         if (formData[key] !== null && formData[key] !== '') {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
      
//       // Add document if exists
//       if (documents.length > 0) {
//         documents.forEach((doc, index) => {
//           formDataToSend.append(`documents[${index}]`, doc.file);
//         });
//       }
      
//       // API call
//       const response = await fetch('http://192.168.0.3:8000/api/employees', {
//         method: 'POST',
//         body: formDataToSend,
//         headers: {
//           'Accept': 'application/json',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const result = await response.json();
      
//       // Call the callback if provided
//       if (onAddEmployee) {
//         onAddEmployee(result.data || result);
//       }
      
//       onClose();
      
//     } catch (error) {
//       console.error('Error adding employee:', error);
//       alert('Failed to add employee. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Gender options
//   const genderOptions = [
//     { value: '', label: 'Select Gender' },
//     { value: 'male', label: 'Male' },
//     { value: 'female', label: 'Female' },
//     { value: 'other', label: 'Other' },
//   ];

//   // Marital status options
//   const maritalStatusOptions = [
//     { value: '', label: 'Select Marital Status' },
//     { value: 'single', label: 'Single' },
//     { value: 'married', label: 'Married' },
//     { value: 'divorced', label: 'Divorced' },
//     { value: 'widowed', label: 'Widowed' },
//   ];

//   // Employee type options
//   const employeeTypeOptions = [
//     { value: '', label: 'Select Employee Type' },
//     { value: 'full_time', label: 'Full Time' },
//     { value: 'part_time', label: 'Part Time' },
//     { value: 'contract', label: 'Contract' },
//     { value: 'intern', label: 'Intern' },
//     { value: 'temporary', label: 'Temporary' },
//   ];

//   // Work type options
//   const workTypeOptions = [
//     { value: '', label: 'Select Work Type' },
//     { value: 'onsite', label: 'Onsite' },
//     { value: 'remote', label: 'Remote' },
//     { value: 'hybrid', label: 'Hybrid' },
//   ];

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//     >
//       <motion.div
//         className="relative w-full top-40 max-w-6xl mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden"
//         initial={{ y: 80, scale: 0.9, opacity: 0 }}
//         animate={{ y: 0, scale: 1, opacity: 1 }}
//         exit={{ y: 80, scale: 0.9, opacity: 0 }}
//         transition={{ type: 'spring', stiffness: 320, damping: 30 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className={`px-8 py-6 ${getLightBg()} border-b flex items-center justify-between`}>
//           <div className="flex items-center gap-3">
//             <div className={`p-2 rounded-lg ${getButtonGradient()}`}>
//               <User className="h-6 w-6 text-white" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">
//                 Add New Employee
//               </h2>
//               <p className="text-sm text-gray-600 mt-1">Fill in the employee details below</p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2.5 rounded-full hover:bg-white/50 transition-colors"
//             aria-label="Close modal"
//           >
//             <X className="h-5 w-5 text-gray-600" />
//           </button>
//         </div>

//         {/* Form Body */}
//         <div className="p-8 max-h-[80vh] overflow-y-auto">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Section 1: Basic Information & Photo */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Photo Upload Section */}
//               <div className="lg:col-span-1 space-y-6">
//                 <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-dashed border-gray-300">
//                   <div className="text-center">
//                     <div className="relative inline-block">
//                       <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
//                         {photo ? (
//                           <img 
//                             src={photo} 
//                             alt="Employee" 
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <User className="h-16 w-16 text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                       <label
//                         htmlFor="photo-upload"
//                         className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
//                       >
//                         <Camera className="h-5 w-5 text-gray-700" />
//                         <input
//                           id="photo-upload"
//                           type="file"
//                           accept="image/*"
//                           onChange={handlePhotoUpload}
//                           className="hidden"
//                         />
//                       </label>
//                     </div>
//                     <p className="mt-4 text-sm text-gray-600">Upload employee photo</p>
//                     <p className="text-xs text-gray-500">JPEG, PNG up to 2MB</p>
//                   </div>
//                 </div>

//                 {/* Document Upload */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                       <FileText className="h-5 w-5" />
//                       Documents *
//                     </h3>
//                     <span className="text-sm text-gray-500">{documents.length} files</span>
//                   </div>
                  
//                   <label
//                     htmlFor="document-upload"
//                     className="block p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-white"
//                   >
//                     <div className="text-center">
//                       <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm font-medium text-gray-700">Click to upload documents *</p>
//                       <p className="text-xs text-gray-500 mt-1">Required: PDF, DOC, JPEG up to 2MB</p>
//                     </div>
//                     <input
//                       id="document-upload"
//                       type="file"
//                       multiple
//                       onChange={handleDocumentUpload}
//                       className="hidden"
//                       required
//                     />
//                   </label>

//                   {/* Document List */}
//                   {documents.length > 0 && (
//                     <div className="space-y-2 max-h-40 overflow-y-auto">
//                       {documents.map(doc => (
//                         <div
//                           key={doc.id}
//                           className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//                         >
//                           <div className="flex items-center gap-3 min-w-0">
//                             <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
//                             <div className="min-w-0">
//                               <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
//                               <p className="text-xs text-gray-500">{doc.size}</p>
//                             </div>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeDocument(doc.id)}
//                             className="p-1.5 hover:bg-red-50 rounded"
//                             title="Remove"
//                           >
//                             <Trash2 className="h-3.5 w-3.5 text-red-500" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Basic Information */}
//               <div className="lg:col-span-2 space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Basic Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Full Name */}
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <motion.input
//                       id="name"
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={handleInputChange}
//                       placeholder="John Doe"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <motion.input
//                       id="email"
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={handleInputChange}
//                       placeholder="john.doe@company.com"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <motion.input
//                       id="phone"
//                       type="tel"
//                       required
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       placeholder="+1 (555) 123-4567"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Gender */}
//                   <div>
//                     <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <motion.select
//                       id="gender"
//                       value={formData.gender}
//                       onChange={handleInputChange}
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       {genderOptions.map(option => (
//                         <option key={option.value} value={option.value}>{option.label}</option>
//                       ))}
//                     </motion.select>
//                   </div>

//                   {/* Date of Birth */}
//                   <div>
//                     <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
//                       Date of Birth
//                     </label>
//                     <motion.input
//                       id="date_of_birth"
//                       type="date"
//                       value={formData.date_of_birth}
//                       onChange={handleInputChange}
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Marital Status */}
//                   <div>
//                     <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700 mb-2">
//                       Marital Status
//                     </label>
//                     <motion.select
//                       id="marital_status"
//                       value={formData.marital_status}
//                       onChange={handleInputChange}
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     >
//                       {maritalStatusOptions.map(option => (
//                         <option key={option.value} value={option.value}>{option.label}</option>
//                       ))}
//                     </motion.select>
//                   </div>

//                   {/* Children */}
//                   <div>
//                     <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
//                       Children
//                     </label>
//                     <motion.input
//                       id="children"
//                       type="text"
//                       value={formData.children}
//                       onChange={handleInputChange}
//                       placeholder="e.g., 2"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Section 2: Address Information */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Address Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Address */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                     Address
//                   </label>
//                   <motion.input
//                     id="address"
//                     type="text"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     placeholder="Street Address"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* City */}
//                 <div>
//                   <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
//                     City
//                   </label>
//                   <motion.input
//                     id="city"
//                     type="text"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                     placeholder="City"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* State */}
//                 <div>
//                   <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
//                     State
//                   </label>
//                   <motion.input
//                     id="state"
//                     type="text"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                     placeholder="State"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Country */}
//                 <div>
//                   <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
//                     Country
//                   </label>
//                   <motion.input
//                     id="country"
//                     type="text"
//                     value={formData.country}
//                     onChange={handleInputChange}
//                     placeholder="Country"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Section 3: Professional Details */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Professional Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Qualification */}
//                 <div>
//                   <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
//                     Qualification
//                   </label>
//                   <motion.input
//                     id="qualification"
//                     type="text"
//                     value={formData.qualification}
//                     onChange={handleInputChange}
//                     placeholder="e.g., B.Tech, MBA"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Experience */}
//                 <div>
//                   <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
//                     Experience
//                   </label>
//                   <motion.input
//                     id="experience"
//                     type="text"
//                     value={formData.experience}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 5 years"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Department */}
//                 <div>
//                   <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
//                     Department
//                   </label>
//                   <motion.input
//                     id="department"
//                     type="text"
//                     value={formData.department}
//                     onChange={handleInputChange}
//                     placeholder="e.g., IT, HR, Sales"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Employee Type */}
//                 <div>
//                   <label htmlFor="employee_type" className="block text-sm font-medium text-gray-700 mb-2">
//                     Employee Type
//                   </label>
//                   <motion.select
//                     id="employee_type"
//                     value={formData.employee_type}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {employeeTypeOptions.map(option => (
//                       <option key={option.value} value={option.value}>{option.label}</option>
//                     ))}
//                   </motion.select>
//                 </div>

//                 {/* Work Type */}
//                 <div>
//                   <label htmlFor="work_type" className="block text-sm font-medium text-gray-700 mb-2">
//                     Work Type
//                   </label>
//                   <motion.select
//                     id="work_type"
//                     value={formData.work_type}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     {workTypeOptions.map(option => (
//                       <option key={option.value} value={option.value}>{option.label}</option>
//                     ))}
//                   </motion.select>
//                 </div>

//                 {/* Joining Date */}
//                 <div>
//                   <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-2">
//                     Joining Date
//                   </label>
//                   <motion.input
//                     id="joining_date"
//                     type="date"
//                     value={formData.joining_date}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* End Date */}
//                 <div>
//                   <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
//                     End Date
//                   </label>
//                   <motion.input
//                     id="end_date"
//                     type="date"
//                     value={formData.end_date}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Salary */}
//                 <div>
//                   <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
//                     Salary
//                   </label>
//                   <motion.input
//                     id="salary"
//                     type="text"
//                     value={formData.salary}
//                     onChange={handleInputChange}
//                     placeholder="e.g., $50,000"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Reporting Manager */}
//                 <div>
//                   <label htmlFor="reporting_manager" className="block text-sm font-medium text-gray-700 mb-2">
//                     Reporting Manager
//                   </label>
//                   <motion.input
//                     id="reporting_manager"
//                     type="text"
//                     value={formData.reporting_manager}
//                     onChange={handleInputChange}
//                     placeholder="Manager's Name"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Work Location */}
//                 <div>
//                   <label htmlFor="work_location" className="block text-sm font-medium text-gray-700 mb-2">
//                     Work Location
//                   </label>
//                   <motion.input
//                     id="work_location"
//                     type="text"
//                     value={formData.work_location}
//                     onChange={handleInputChange}
//                     placeholder="Office Location"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Shift Information */}
//                 <div>
//                   <label htmlFor="shift_information" className="block text-sm font-medium text-gray-700 mb-2">
//                     Shift Information
//                   </label>
//                   <motion.input
//                     id="shift_information"
//                     type="text"
//                     value={formData.shift_information}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 9 AM - 6 PM"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Tags */}
//                 <div>
//                   <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
//                     Tags
//                   </label>
//                   <motion.input
//                     id="tags"
//                     type="text"
//                     value={formData.tags}
//                     onChange={handleInputChange}
//                     placeholder="e.g., developer, senior"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Section 4: Emergency Contact */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Emergency Contact</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Emergency Contact Name */}
//                 <div>
//                   <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Name
//                   </label>
//                   <motion.input
//                     id="emergency_contact_name"
//                     type="text"
//                     value={formData.emergency_contact_name}
//                     onChange={handleInputChange}
//                     placeholder="Emergency Contact Name"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Emergency Contact Phone */}
//                 <div>
//                   <label htmlFor="emergency_contact" className="block text-sm font-medium text-gray-700 mb-2">
//                     Contact Phone
//                   </label>
//                   <motion.input
//                     id="emergency_contact"
//                     type="tel"
//                     value={formData.emergency_contact}
//                     onChange={handleInputChange}
//                     placeholder="Emergency Phone Number"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Emergency Contact Relation */}
//                 <div>
//                   <label htmlFor="emergency_contact_relation" className="block text-sm font-medium text-gray-700 mb-2">
//                     Relationship
//                   </label>
//                   <motion.input
//                     id="emergency_contact_relation"
//                     type="text"
//                     value={formData.emergency_contact_relation}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Spouse, Parent"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Section 5: Bank Details */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Bank Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Bank Name */}
//                 <div>
//                   <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Name
//                   </label>
//                   <motion.input
//                     id="bank_name"
//                     type="text"
//                     value={formData.bank_name}
//                     onChange={handleInputChange}
//                     placeholder="Bank Name"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Account Number */}
//                 <div>
//                   <label htmlFor="account_number" className="block text-sm font-medium text-gray-700 mb-2">
//                     Account Number
//                   </label>
//                   <motion.input
//                     id="account_number"
//                     type="text"
//                     value={formData.account_number}
//                     onChange={handleInputChange}
//                     placeholder="Account Number"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Branch */}
//                 <div>
//                   <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
//                     Branch
//                   </label>
//                   <motion.input
//                     id="branch"
//                     type="text"
//                     value={formData.branch}
//                     onChange={handleInputChange}
//                     placeholder="Branch Name"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Bank Address */}
//                 <div className="md:col-span-2">
//                   <label htmlFor="bank_address" className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Address
//                   </label>
//                   <motion.input
//                     id="bank_address"
//                     type="text"
//                     value={formData.bank_address}
//                     onChange={handleInputChange}
//                     placeholder="Bank Address"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Bank Country */}
//                 <div>
//                   <label htmlFor="bank_country" className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Country
//                   </label>
//                   <motion.input
//                     id="bank_country"
//                     type="text"
//                     value={formData.bank_country}
//                     onChange={handleInputChange}
//                     placeholder="Country"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Bank Code 1 */}
//                 <div>
//                   <label htmlFor="bank_code_1" className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Code 1
//                   </label>
//                   <motion.input
//                     id="bank_code_1"
//                     type="text"
//                     value={formData.bank_code_1}
//                     onChange={handleInputChange}
//                     placeholder="e.g., SWIFT Code"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Bank Code 2 */}
//                 <div>
//                   <label htmlFor="bank_code_2" className="block text-sm font-medium text-gray-700 mb-2">
//                     Bank Code 2
//                   </label>
//                   <motion.input
//                     id="bank_code_2"
//                     type="text"
//                     value={formData.bank_code_2}
//                     onChange={handleInputChange}
//                     placeholder="e.g., Routing Number"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
//               <div className="text-sm text-gray-500">
//                 <span className="font-medium">{documents.length}</span> documents attached
//                 {photo && <span>, 1 photo uploaded</span>}
//               </div>
//               <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
//                   disabled={isSubmitting}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className={`px-8 py-3 rounded-lg ${getButtonGradient()} ${getButtonHover()} text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
//                 >
//                   <div className="flex items-center justify-center gap-2">
//                     {isSubmitting ? (
//                       <>
//                         <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                         Adding...
//                       </>
//                     ) : (
//                       <>
//                         <Plus className="h-5 w-5" />
//                         Add Employee
//                       </>
//                     )}
//                   </div>
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }