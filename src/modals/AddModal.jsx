'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Phone, Briefcase, Calendar, 
  MapPin, Landmark, Hash, Globe, 
  DollarSign, Lock, AlertCircle, Eye, EyeOff,
  Upload, FileText, Image as ImageIcon, Trash2, Eye as ViewIcon,
  Download, Camera, Check, Plus, XCircle
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import toast from 'react-hot-toast';

const AddModal = ({ onClose, onAddEmployee }) => {
  const { getThemeClasses } = useTheme();
  
  const themeClasses = React.useMemo(() => {
    try {
      const classes = getThemeClasses();
      return {
        ...classes,
        accent: classes.accent || 'green-600',
        textColor: classes.textColor || 'text-green-600',
      buttonBg: classes. buttonActive || 'bg-green-600',
        buttonHover: classes.buttonHover || 'hover:bg-green-700',
        borderColor: classes.borderColor || 'border-green-600',
        focusRing: classes.focusRing || 'focus:ring-green-500/50',
        ringColor: classes.ringColor || 'ring-green-500',
      };
    } catch (error) {
      console.error('Error getting theme classes:', error);
      return {
        accent: 'green-600',
        textColor: 'text-green-600',
        buttonBg: 'bg-green-600',
        buttonHover: 'hover:bg-green-700',
        borderColor: 'border-green-600',
        focusRing: 'focus:ring-green-500/50',
        ringColor: 'ring-green-500',
      };
    }
  }, [getThemeClasses]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    salary: '',
    joinDate: new Date().toISOString().split('T')[0],
    address: '',
    country: 'India',
    state: '',
    city: '',
    workType: 'Permanent',
    workLocation: 'Office',
    bankName: 'HDFC',
    accountNumber: '',
    password: 'employee@123',
    gender: 'Male'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState('');
  const [documents, setDocuments] = useState([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingDocs, setUploadingDocs] = useState(false);

  const fileInputRef = useRef(null);
  const docsInputRef = useRef(null);

  const departments = [
    { value: 'IT', label: 'Information Technology' },
    { value: 'HR', label: 'Human Resources' },
    { value: 'Sales', label: 'Sales' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Design', label: 'Design' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Support', label: 'Customer Support' },
    { value: 'Engineering', label: 'Engineering' },
    { value: 'Product', label: 'Product Management' }
  ];

  const workTypes = [
    { value: 'Permanent', label: 'Permanent' },
    { value: 'Contract', label: 'Contract' },
    { value: 'Intern', label: 'Intern' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Freelance', label: 'Freelance' }
  ];

  const workLocations = [
    { value: 'Office', label: 'Office' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Hybrid', label: 'Hybrid' }
  ];

  const countries = [
    { value: 'India', label: 'India' },
    { value: 'USA', label: 'United States' },
    { value: 'UK', label: 'United Kingdom' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Japan', label: 'Japan' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);
    
    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImagePreview(reader.result);
        setProfileImage(file);
        toast.success('Profile image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Image upload error:', error);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleDocumentUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate files
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'text/plain'
    ];

    const invalidFiles = files.filter(file => !validTypes.includes(file.type));
    if (invalidFiles.length > 0) {
      toast.error('Invalid file type. Please upload PDF, DOC, DOCX, JPG, PNG, or TXT files');
      return;
    }

    // Check size (max 10MB each)
    const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('File size should be less than 10MB');
      return;
    }

    setUploadingDocs(true);

    try {
      const newDocuments = await Promise.all(
        files.map(async (file) => {
          // Create document object
          const document = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: file.type,
            size: file.size,
            uploadDate: new Date().toISOString(),
            file: file
          };

          // Create preview for images
          if (file.type.startsWith('image/')) {
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  ...document,
                  preview: reader.result
                });
              };
              reader.readAsDataURL(file);
            });
          }

          return document;
        })
      );

      setDocuments(prev => [...prev, ...newDocuments]);
      toast.success(`${files.length} document(s) uploaded successfully!`);
    } catch (error) {
      toast.error('Failed to upload documents');
      console.error('Document upload error:', error);
    } finally {
      setUploadingDocs(false);
    }
  };

  const removeDocument = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast.success('Document removed');
  };

  const viewDocument = (document) => {
    if (document.preview) {
      // Open image in new tab
      window.open(document.preview, '_blank');
    } else if (document.file) {
      // Create object URL for non-image files
      const url = URL.createObjectURL(document.file);
      window.open(url, '_blank');
    }
  };

  const downloadDocument = (document) => {
    const url = document.preview || URL.createObjectURL(document.file);
    const link = document.createElement('a');
    link.href = url;
    link.download = document.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast.success('Profile image removed');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.salary || parseFloat(formData.salary) <= 0) newErrors.salary = 'Valid salary is required';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Prepare form data for API
      const employeeData = {
        ...formData,
        profileImage: profileImagePreview || null,
        documents: documents
      };

      await onAddEmployee(employeeData);
      toast.success('Employee added successfully!');
      onClose();
    } catch (error) {
      toast.error(`Error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white w-full max-w-5xl max-h-screen sm:max-h-[95vh] sm:rounded-2xl shadow-2xl sm:border sm:border-gray-200 flex flex-col h-screen sm:h-auto"
        >
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`p-1.5 sm:p-2 rounded-lg bg-green-100 ${themeClasses.textColor}`}>
                  <User className="h-4 w-4 sm:h-5 sm:w-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Add New Employee</h2>
                  <p className="text-gray-600 text-xs sm:text-sm mt-0.5">Fill employee details and upload documents</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition ${themeClasses.ringColor} focus:outline-none focus:ring-2`}
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Profile Image Section */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
                  Profile Image (Optional)
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  {/* Image Preview */}
                  <div className="relative">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                      {profileImagePreview ? (
                        <img 
                          src={profileImagePreview} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <User className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">No image</p>
                        </div>
                      )}
                    </div>
                    
                    {/* Remove Image Button */}
                    {profileImagePreview && (
                      <button
                        type="button"
                        onClick={removeProfileImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition shadow-lg"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </div>

                  {/* Upload Controls */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        Upload a clear photo of the employee. Recommended: Square image, max 5MB.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleProfileImageUpload}
                          accept="image/*"
                          className="hidden"
                          id="profile-image-upload"
                        />
                        <label
                          htmlFor="profile-image-upload"
                          className={`flex-1 ${themeClasses.buttonBg} ${themeClasses.buttonHover} text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer transition hover:scale-[1.02] active:scale-95`}
                        >
                          {uploadingImage ? (
                            <>
                              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="h-4 w-4" />
                              Upload Image
                            </>
                          )}
                        </label>
                        
                        {!profileImagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              // Generate avatar from name
                              const initials = formData.name 
                                ? formData.name.split(' ').map(n => n[0]).join('').toUpperCase()
                                : 'EMP';
                              setProfileImagePreview(`https://ui-avatars.com/api/?name=${initials}&background=10b981&color=fff&size=256`);
                              toast.success('Avatar generated from name');
                            }}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-200 transition"
                            disabled={!formData.name}
                          >
                            <User className="h-4 w-4" />
                            Generate Avatar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <User className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {/* Name */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="Enter full name"
                      />
                    </div>
                    {errors.name && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="employee@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-sm sm:text-base"
                        placeholder="Default password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Employee will be asked to change this password on first login
                    </p>
                  </div>
                </div>
              </div>

              {/* Job Information Section */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Briefcase className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
                  Job Details
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Position */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Position *
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="e.g., UX Developer"
                      />
                    </div>
                    {errors.position && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.position}
                      </p>
                    )}
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                    {errors.department && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.department}
                      </p>
                    )}
                  </div>

                  {/* Salary */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Salary (Monthly) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="e.g., 45699"
                        min="0"
                        step="100"
                      />
                    </div>
                    {errors.salary && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.salary}
                      </p>
                    )}
                  </div>

                  {/* Join Date */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Join Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="date"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.joinDate ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                      />
                    </div>
                    {errors.joinDate && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.joinDate}
                      </p>
                    )}
                  </div>

                  {/* Work Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Type
                    </label>
                    <select
                      name="workType"
                      value={formData.workType}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                    >
                      {workTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Work Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Work Location
                    </label>
                    <select
                      name="workLocation"
                      value={formData.workLocation}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                    >
                      {workLocations.map(loc => (
                        <option key={loc.value} value={loc.value}>{loc.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Documents Section (Optional) */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
                    Documents (Optional)
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="file"
                      ref={docsInputRef}
                      onChange={handleDocumentUpload}
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                      className="hidden"
                      id="document-upload"
                    />
                    <label
                      htmlFor="document-upload"
                      className={`${themeClasses.buttonBg} ${themeClasses.buttonHover} text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 cursor-pointer transition hover:scale-[1.02] active:scale-95 text-sm`}
                    >
                      {uploadingDocs ? (
                        <>
                          <div className="h-3 w-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          Add Documents
                        </>
                      )}
                    </label>
                    
                    <div className="text-xs text-gray-500">
                      Max 10MB per file. Supported: PDF, DOC, DOCX, JPG, PNG, TXT
                    </div>
                  </div>
                </div>

                {/* Documents List */}
                <div className="space-y-3">
                  {documents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {documents.map((doc) => (
                        <div 
                          key={doc.id} 
                          className="bg-gray-50 border border-gray-200 rounded-lg p-3 hover:bg-gray-100 transition group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <FileText className="h-4 w-4 text-green-500 flex-shrink-0" />
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {doc.name}
                                </p>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span>{doc.type.split('/')[1].toUpperCase()}</span>
                                <span>•</span>
                                <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span>•</span>
                                <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 ml-2">
                              <button
                                type="button"
                                onClick={() => viewDocument(doc)}
                                className="p-1 text-gray-500 hover:text-green-600 transition"
                                title="View"
                              >
                                <ViewIcon className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => downloadDocument(doc)}
                                className="p-1 text-gray-500 hover:text-green-600 transition"
                                title="Download"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => removeDocument(doc.id)}
                                className="p-1 text-gray-500 hover:text-red-600 transition"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Image Preview */}
                          {doc.preview && (
                            <div className="mt-2 border border-gray-200 rounded overflow-hidden">
                              <img 
                                src={doc.preview} 
                                alt={doc.name}
                                className="w-full h-24 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                      <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No documents uploaded yet</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Upload documents like resume, ID proof, certificates, etc.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address & Bank Information */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
                  Address & Bank Information
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition resize-none text-sm sm:text-base`}
                      placeholder="Enter full address (Street, Area, Landmark)"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                      placeholder="City"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                      placeholder="State"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                      >
                        {countries.map(country => (
                          <option key={country.value} value={country.value}>{country.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Name
                    </label>
                    <div className="relative">
                      <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="text"
                        name="bankName"
                        value={formData.bankName}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="e.g., HDFC Bank"
                      />
                    </div>
                  </div>

                  {/* Account Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Number
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                      <input
                        type="text"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-green-500 transition text-sm sm:text-base`}
                        placeholder="Account number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Summary</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Name</p>
                    <p className="font-medium truncate">{formData.name || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Position</p>
                    <p className="font-medium truncate">{formData.position || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Department</p>
                    <p className="font-medium truncate">{formData.department || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Salary</p>
                    <p className="font-medium">{formData.salary ? `₹${formData.salary}` : 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium truncate">{formData.email || 'Not provided'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
              <div className="flex items-center gap-2 text-sm text-gray-600 order-2 sm:order-1">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Fields marked with * are required</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto order-1 sm:order-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition active:scale-95"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 ${themeClasses.buttonBg} ${themeClasses.buttonHover} active:scale-95 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Creating Employee...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>Create Employee</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddModal;

// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   X, User, Mail, Phone, Briefcase, Calendar, 
//   MapPin, Landmark, Hash, Globe, 
//   DollarSign, Lock, AlertCircle, Eye, EyeOff
// } from 'lucide-react';
// import { useTheme } from '../ThemeContext';

// const AddModal = ({ onClose, onAddEmployee }) => {
//   const { getThemeClasses } = useTheme();
  
//   const themeClasses = React.useMemo(() => {
//     try {
//       const classes = getThemeClasses();
//       return {
//         ...classes,
//         accent: classes.accent || 'orange-600',
//         textColor: classes.textColor || 'text-orange-600',
//         buttonBg: classes.buttonBg || 'bg-orange-600',
//         buttonHover: classes.buttonHover || 'hover:bg-orange-700',
//         borderColor: classes.borderColor || 'border-orange-600',
//         focusRing: classes.focusRing || 'focus:ring-orange-500/50',
//         ringColor: classes.ringColor || 'ring-orange-500',
//       };
//     } catch (error) {
//       console.error('Error getting theme classes:', error);
//       return {
//         accent: 'orange-600',
//         textColor: 'text-orange-600',
//         buttonBg: 'bg-orange-600',
//         buttonHover: 'hover:bg-orange-700',
//         borderColor: 'border-orange-600',
//         focusRing: 'focus:ring-orange-500/50',
//         ringColor: 'ring-orange-500',
//       };
//     }
//   }, [getThemeClasses]);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     position: '',
//     department: '',
//     salary: '',
//     joinDate: new Date().toISOString().split('T')[0],
//     address: '',
//     country: 'India',
//     state: '',
//     city: '',
//     workType: 'Permanent',
//     workLocation: 'Office',
//     bankName: 'HDFC',
//     accountNumber: '',
//     password: 'employee@123',
//     gender: 'Male'
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const departments = [
//     { value: 'IT', label: 'Information Technology' },
//     { value: 'HR', label: 'Human Resources' },
//     { value: 'Sales', label: 'Sales' },
//     { value: 'Marketing', label: 'Marketing' },
//     { value: 'Finance', label: 'Finance' },
//     { value: 'Design', label: 'Design' },
//     { value: 'Operations', label: 'Operations' },
//     { value: 'Support', label: 'Customer Support' },
//     { value: 'Engineering', label: 'Engineering' },
//     { value: 'Product', label: 'Product Management' }
//   ];

//   const workTypes = [
//     { value: 'Permanent', label: 'Permanent' },
//     { value: 'Contract', label: 'Contract' },
//     { value: 'Intern', label: 'Intern' },
//     { value: 'Remote', label: 'Remote' },
//     { value: 'Freelance', label: 'Freelance' }
//   ];

//   const workLocations = [
//     { value: 'Office', label: 'Office' },
//     { value: 'Remote', label: 'Remote' },
//     { value: 'Hybrid', label: 'Hybrid' }
//   ];

//   const countries = [
//     { value: 'India', label: 'India' },
//     { value: 'USA', label: 'United States' },
//     { value: 'UK', label: 'United Kingdom' },
//     { value: 'Canada', label: 'Canada' },
//     { value: 'Australia', label: 'Australia' },
//     { value: 'Germany', label: 'Germany' },
//     { value: 'France', label: 'France' },
//     { value: 'Japan', label: 'Japan' }
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Invalid email format';
//     }
    
    
//     if (!formData.position.trim()) newErrors.position = 'Position is required';
//     if (!formData.department) newErrors.department = 'Department is required';
//     if (!formData.salary || parseFloat(formData.salary) <= 0) newErrors.salary = 'Valid salary is required';
//     if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       await onAddEmployee(formData);
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 sm:p-4 overflow-y-auto">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.95, y: 20 }}
//           transition={{ type: "spring", damping: 25, stiffness: 300 }}
//           className="bg-white w-full max-w-4xl max-h-screen sm:max-h-[90vh] sm:rounded-2xl shadow-2xl sm:border sm:border-gray-200 flex flex-col h-screen sm:h-auto"
//         >
//           {/* Header - Not fixed, scrolls with content */}
//           <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2 sm:gap-3">
//                 <div className={`p-1.5 sm:p-2 rounded-lg bg-orange-100 ${themeClasses.textColor}`}>
//                   <User className="h-4 w-4 sm:h-5 sm:w-5" />
//                 </div>
//                 <div>
//                   <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Add New Employee</h2>
//                   <p className="text-gray-600 text-xs sm:text-sm mt-0.5">Fill in the employee details below</p>
//                 </div>
//               </div>
//               <button
//                 onClick={onClose}
//                 className={`p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition ${themeClasses.ringColor} focus:outline-none focus:ring-2`}
//               >
//                 <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Form Content - Scrollable */}
//           <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
//             <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
//               {/* Personal Information Section */}
//               <div className="space-y-4">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <User className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
//                   Personal Information
//                 </h3>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   {/* Name */}
//                   <div className="sm:col-span-2 lg:col-span-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <div className="relative">
//                       <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="Enter full name"
//                       />
//                     </div>
//                     {errors.name && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.name}
//                       </p>
//                     )}
//                   </div>

//                   {/* Email */}
//                   <div className="sm:col-span-2 lg:col-span-1">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="employee@example.com"
//                       />
//                     </div>
//                     {errors.email && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.email}
//                       </p>
//                     )}
//                   </div>

//                   {/* Phone */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="+91 9876543210"
//                       />
//                     </div>
//                     {errors.phone && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.phone}
//                       </p>
//                     )}
//                   </div>

//                   {/* Gender */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                       <option value="Prefer not to say">Prefer not to say</option>
//                     </select>
//                   </div>

//                   {/* Password */}
//                   <div className="sm:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Default Password
//                     </label>
//                     <div className="relative">
//                       <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type={showPassword ? "text" : "password"}
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                         className="w-full pl-9 sm:pl-10 pr-10 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition text-sm sm:text-base"
//                         placeholder="Default password"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => setShowPassword(!showPassword)}
//                         className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//                       >
//                         {showPassword ? (
//                           <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
//                         ) : (
//                           <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
//                         )}
//                       </button>
//                     </div>
//                     <p className="mt-1 text-xs text-gray-500">
//                       Employee will be asked to change this password on first login
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Job Information Section */}
//               <div className="space-y-4 pt-4 border-t border-gray-200">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <Briefcase className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
//                   Job Details
//                 </h3>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//                   {/* Position */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Position *
//                     </label>
//                     <div className="relative">
//                       <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type="text"
//                         name="position"
//                         value={formData.position}
//                         onChange={handleChange}
//                         className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="e.g., UX Developer"
//                       />
//                     </div>
//                     {errors.position && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.position}
//                       </p>
//                     )}
//                   </div>

//                   {/* Department */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Department *
//                     </label>
//                     <select
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                     >
//                       <option value="">Select Department</option>
//                       {departments.map(dept => (
//                         <option key={dept.value} value={dept.value}>{dept.label}</option>
//                       ))}
//                     </select>
//                     {errors.department && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.department}
//                       </p>
//                     )}
//                   </div>

//                   {/* Salary */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Salary (Monthly) *
//                     </label>
//                     <div className="relative">
//                       <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type="number"
//                         name="salary"
//                         value={formData.salary}
//                         onChange={handleChange}
//                         className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="e.g., 45699"
//                         min="0"
//                         step="100"
//                       />
//                     </div>
//                     {errors.salary && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.salary}
//                       </p>
//                     )}
//                   </div>

//                   {/* Join Date */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Join Date *
//                     </label>
//                     <div className="relative">
//                       <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                       <input
//                         type="date"
//                         name="joinDate"
//                         value={formData.joinDate}
//                         onChange={handleChange}
//                         className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border ${errors.joinDate ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                       />
//                     </div>
//                     {errors.joinDate && (
//                       <p className="mt-1 text-xs sm:text-sm text-red-500 flex items-center gap-1">
//                         <AlertCircle className="h-3 w-3" />
//                         {errors.joinDate}
//                       </p>
//                     )}
//                   </div>

//                   {/* Work Type */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Work Type
//                     </label>
//                     <select
//                       name="workType"
//                       value={formData.workType}
//                       onChange={handleChange}
//                       className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                     >
//                       {workTypes.map(type => (
//                         <option key={type.value} value={type.value}>{type.label}</option>
//                       ))}
//                     </select>
//                   </div>

//                   {/* Work Location */}
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Work Location
//                     </label>
//                     <select
//                       name="workLocation"
//                       value={formData.workLocation}
//                       onChange={handleChange}
//                       className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                     >
//                       {workLocations.map(loc => (
//                         <option key={loc.value} value={loc.value}>{loc.label}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Address & Bank Information Section */}
//               <div className="space-y-4 pt-4 border-t border-gray-200">
//                 <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
//                   <MapPin className={`h-4 w-4 sm:h-5 sm:w-5 ${themeClasses.textColor}`} />
//                   Address & Bank Information
//                 </h3>
                
//                 {/* Address Information */}
//                 <div className="space-y-4">
//                   <h4 className="font-medium text-gray-700 text-sm sm:text-base">Address Information</h4>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Address
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="3"
//                       className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition resize-none text-sm sm:text-base`}
//                       placeholder="Enter full address (Street, Area, Landmark)"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Country
//                       </label>
//                       <div className="relative">
//                         <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                         <select
//                           name="country"
//                           value={formData.country}
//                           onChange={handleChange}
//                           className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         >
//                           {countries.map(country => (
//                             <option key={country.value} value={country.value}>{country.label}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         State
//                       </label>
//                       <input
//                         type="text"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="State"
//                       />
//                     </div>

//                     <div className="sm:col-span-2 lg:col-span-1">
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                         placeholder="City"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bank Information */}
//                 <div className="space-y-4 pt-4">
//                   <h4 className="font-medium text-gray-700 text-sm sm:text-base">Bank Information</h4>
                  
//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Name
//                       </label>
//                       <div className="relative">
//                         <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="bankName"
//                           value={formData.bankName}
//                           onChange={handleChange}
//                           className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                           placeholder="e.g., HDFC Bank"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Account Number
//                       </label>
//                       <div className="relative">
//                         <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="accountNumber"
//                           value={formData.accountNumber}
//                           onChange={handleChange}
//                           className={`w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition text-sm sm:text-base`}
//                           placeholder="Account number"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Summary Section */}
//               <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 <h4 className="font-medium text-gray-900 mb-3 text-sm sm:text-base">Summary</h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
//                   <div className="space-y-1">
//                     <p className="text-gray-500">Name</p>
//                     <p className="font-medium truncate">{formData.name || 'Not provided'}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-gray-500">Position</p>
//                     <p className="font-medium truncate">{formData.position || 'Not provided'}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-gray-500">Department</p>
//                     <p className="font-medium truncate">{formData.department || 'Not provided'}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-gray-500">Salary</p>
//                     <p className="font-medium">{formData.salary ? `₹${formData.salary}` : 'Not provided'}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-gray-500">Email</p>
//                     <p className="font-medium truncate">{formData.email || 'Not provided'}</p>
//                   </div>
//                   <div className="space-y-1">
//                     <p className="text-gray-500">Phone</p>
//                     <p className="font-medium">{formData.phone || 'Not provided'}</p>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>

//           {/* Footer - Not fixed, part of scrollable content */}
//           <div className="bg-white border-t border-gray-200 px-4 sm:px-6 py-4 mt-auto">
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="w-full sm:w-auto px-4 sm:px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition active:scale-95 text-sm sm:text-base order-2 sm:order-1"
//               >
//                 Cancel
//               </button>
              
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className={`w-full sm:w-auto px-4 sm:px-6 py-2.5 ${themeClasses.buttonBg} ${themeClasses.buttonHover} active:scale-95 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base order-1 sm:order-2`}
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     <span>Creating Employee...</span>
//                   </>
//                 ) : (
//                   <>
//                     <User className="h-4 w-4" />
//                     <span>Create Employee</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default AddModal;