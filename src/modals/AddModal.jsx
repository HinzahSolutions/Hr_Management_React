

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

// export default function AddModal({ onClose, onAddEmployee }) { // Add onAddEmployee here
//   const { theme } = useTheme();
//   const [photo, setPhoto] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     department: '',
//     dob: '',
//     docNum: '',
//     joinDate: '',
//     workType: '',
//     phone: '',
//     designation: '',
//     address: '',
//     emergencyContact: '',
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
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPhoto(reader.result);
//       };
//       reader.readAsDataURL(file);
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

//   // Corrected handleSubmit function - use onAddEmployee prop directly
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Prepare employee data
//     const employeeData = {
//       fullName: formData.fullName,
//       email: formData.email,
//       department: formData.department,
//       dob: formData.dob,
//       docNum: formData.docNum,
//       joinDate: formData.joinDate,
//       workType: formData.workType,
//       phone: formData.phone,
//       designation: formData.designation,
//       address: formData.address,
//       emergencyContact: formData.emergencyContact,
//       photo: photo,
//       documents: documents
//     };
    
//     // Call the onAddEmployee prop if provided
//     if (onAddEmployee) {
//       onAddEmployee(employeeData);
//     } else {
//       // Fallback to console log
//       console.log('Form Data:', employeeData);
//       onClose();
//     }
//   };

//   return (
//     <motion.div
//       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//     >
//       {/* Modal Card – 70% Width */}
//       <motion.div
//         className="relative w-full top-40 max-w-6xl mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden"
//         initial={{ y: 80, scale: 0.9, opacity: 0 }}
//         animate={{ y: 0, scale: 1, opacity: 1 }}
//         exit={{ y: 80, scale: 0.9, opacity: 0 }}
//         transition={{ type: 'spring', stiffness: 320, damping: 30 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header with Theme Color */}
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

//         {/* Form Body – 3 Columns */}
//         <div className="p-8">
//           <form onSubmit={handleSubmit} className="space-y-8">
//             {/* Section 1: Basic Information & Photo */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               {/* Photo Upload Section - Left Column */}
//               <div className="lg:col-span-1 space-y-6">
//                 {/* Photo Upload */}
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
//                     <p className="text-xs text-gray-500">JPEG, PNG up to 5MB</p>
//                   </div>
//                 </div>

//                 {/* Document Upload */}
//                 <div className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-900 flex items-center gap-2">
//                       <FileText className="h-5 w-5" />
//                       Documents
//                     </h3>
//                     <span className="text-sm text-gray-500">{documents.length} files</span>
//                   </div>
                  
//                   <label
//                     htmlFor="document-upload"
//                     className="block p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-white"
//                   >
//                     <div className="text-center">
//                       <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
//                       <p className="text-sm font-medium text-gray-700">Click to upload documents</p>
//                       <p className="text-xs text-gray-500 mt-1">PDF, DOC, JPEG up to 10MB each</p>
//                     </div>
//                     <input
//                       id="document-upload"
//                       type="file"
//                       multiple
//                       onChange={handleDocumentUpload}
//                       className="hidden"
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
//                           <div className="flex items-center gap-1">
//                             <button
//                               type="button"
//                               className="p-1.5 hover:bg-gray-200 rounded"
//                               title="View"
//                             >
//                               <Eye className="h-3.5 w-3.5 text-gray-600" />
//                             </button>
//                             <button
//                               type="button"
//                               className="p-1.5 hover:bg-gray-200 rounded"
//                               title="Download"
//                             >
//                               <Download className="h-3.5 w-3.5 text-gray-600" />
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => removeDocument(doc.id)}
//                               className="p-1.5 hover:bg-red-50 rounded"
//                               title="Remove"
//                             >
//                               <Trash2 className="h-3.5 w-3.5 text-red-500" />
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Basic Information - Right 2/3 Columns */}
//               <div className="lg:col-span-2 space-y-6">
//                 <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Personal Information</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {/* Full Name */}
//                   <div>
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <motion.input
//                       id="fullName"
//                       type="text"
//                       required
//                       value={formData.fullName}
//                       onChange={handleInputChange}
//                       placeholder="John Doe"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                                  transition-shadow"
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
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Date of Birth */}
//                   <div>
//                     <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">
//                       Date of Birth *
//                     </label>
//                     <motion.input
//                       id="dob"
//                       type="date"
//                       required
//                       value={formData.dob}
//                       onChange={handleInputChange}
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>

//                   {/* Address */}
//                   <div className="md:col-span-2">
//                     <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
//                       Address
//                     </label>
//                     <motion.textarea
//                       id="address"
//                       value={formData.address}
//                       onChange={handleInputChange}
//                       placeholder="123 Main St, City, State, ZIP Code"
//                       rows="3"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
//                                  resize-none"
//                     />
//                   </div>

//                   {/* Emergency Contact */}
//                   <div className="md:col-span-2">
//                     <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
//                       Emergency Contact
//                     </label>
//                     <motion.input
//                       id="emergencyContact"
//                       type="text"
//                       value={formData.emergencyContact}
//                       onChange={handleInputChange}
//                       placeholder="Name and phone number"
//                       variants={inputVariants}
//                       whileFocus="focus"
//                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Section 2: Employment Details */}
//             <div className="space-y-6">
//               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Employment Details</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {/* Department */}
//                 <div>
//                   <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
//                     Department *
//                   </label>
//                   <motion.select
//                     id="department"
//                     required
//                     value={formData.department}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Department</option>
//                     <option value="IT">Information Technology</option>
//                     <option value="HR">Human Resources</option>
//                     <option value="Sales">Sales</option>
//                     <option value="Marketing">Marketing</option>
//                     <option value="Finance">Finance</option>
//                     <option value="Operations">Operations</option>
//                     <option value="Engineering">Engineering</option>
//                     <option value="Customer Support">Customer Support</option>
//                   </motion.select>
//                 </div>

//                 {/* Designation */}
//                 <div>
//                   <label htmlFor="designation" className="block text-sm font-medium text-gray-700 mb-2">
//                     Designation *
//                   </label>
//                   <motion.input
//                     id="designation"
//                     type="text"
//                     required
//                     value={formData.designation}
//                     onChange={handleInputChange}
//                     placeholder="Software Engineer"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Join Date */}
//                 <div>
//                   <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-2">
//                     Join Date *
//                   </label>
//                   <motion.input
//                     id="joinDate"
//                     type="date"
//                     required
//                     value={formData.joinDate}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>

//                 {/* Work Type */}
//                 <div>
//                   <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-2">
//                     Work Type *
//                   </label>
//                   <motion.select
//                     id="workType"
//                     required
//                     value={formData.workType}
//                     onChange={handleInputChange}
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="">Select Work Type</option>
//                     <option value="full-time">Full-time</option>
//                     <option value="part-time">Part-time</option>
//                     <option value="contract">Contract</option>
//                     <option value="intern">Intern</option>
//                     <option value="remote">Remote</option>
//                     <option value="hybrid">Hybrid</option>
//                   </motion.select>
//                 </div>

//                 {/* Document Number */}
//                 <div>
//                   <label htmlFor="docNum" className="block text-sm font-medium text-gray-700 mb-2">
//                     Document Number *
//                   </label>
//                   <motion.input
//                     id="docNum"
//                     type="text"
//                     required
//                     value={formData.docNum}
//                     onChange={handleInputChange}
//                     placeholder="Aadhaar / Passport / ID Number"
//                     variants={inputVariants}
//                     whileFocus="focus"
//                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400
//                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className={`px-8 py-3 rounded-lg ${getButtonGradient()} ${getButtonHover()} text-white font-medium shadow-lg hover:shadow-xl transition-all`}
//                 >
//                   <div className="flex items-center justify-center gap-2">
//                     <Plus className="h-5 w-5" />
//                     Add Employee
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

// // 'use client';

// // import React, { useState } from 'react';
// // import { 
// //   X, User, Camera, Upload, FileText, 
// //   Trash2, Eye, Download, Plus 
// // } from 'lucide-react';
// // import { motion } from 'framer-motion';
// // import { useTheme } from '../ThemeContext';

// // const inputVariants = {
// //   focus: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } },
// //   blur: { scale: 1 },
// // };

// // export default function AddModal({ onClose, onAddEmployee }) {
// //   const { theme } = useTheme();
// //   const [photo, setPhoto] = useState(null);
// //   const [documents, setDocuments] = useState([]);
// //   const [isSubmitting, setIsSubmitting] = useState(false);
// //   const [formData, setFormData] = useState({
// //     // Basic Info
// //     name: '',
// //     email: '',
// //     phone: '',
    
// //     // Personal Info
// //     date_of_birth: '',
// //     gender: '',
// //     address: '',
// //     country: '',
// //     state: '',
// //     city: '',
// //     qualification: '',
// //     experience: '',
// //     marital_status: '',
// //     children: '',
    
// //     // Emergency Contact
// //     emergency_contact: '',
// //     emergency_contact_name: '',
// //     emergency_contact_relation: '',
    
// //     // Job Details
// //     department: '',
// //     shift_information: '',
// //     employee_type: '',
// //     reporting_manager: '',
// //     work_location: '',
// //     end_date: '',
// //     work_type: '',
// //     salary: '',
// //     joining_date: '',
// //     tags: '',
    
// //     // Bank Details
// //     bank_name: '',
// //     branch: '',
// //     bank_address: '',
// //     bank_code_2: '',
// //     account_number: '',
// //     bank_code_1: '',
// //     bank_country: '',
    
// //     // Files (to be handled separately)
// //     image: null,
// //     file: null,
// //   });

// //   // Theme helper functions
// //   const getPrimaryColor = () => theme?.accent?.split('-')[0] || 'blue';
// //   const getPrimaryColorClass = () => `text-${getPrimaryColor()}-600`;
// //   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-blue-600 to-cyan-600';
// //   const getButtonHover = () => theme?.buttonHover || 'hover:from-blue-700 hover:to-cyan-700';
// //   const getRingColor = () => theme?.ringColor || 'ring-blue-500';
// //   const getLightBg = () => theme?.lightBg || 'bg-blue-50';

// //   const handlePhotoUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // For preview
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setPhoto(reader.result);
// //       };
// //       reader.readAsDataURL(file);
      
// //       // Store file for submission
// //       setFormData(prev => ({ ...prev, image: file }));
// //     }
// //   };

// //   const handleDocumentUpload = (e) => {
// //     const files = Array.from(e.target.files);
// //     const newDocuments = files.map(file => ({
// //       id: Date.now() + Math.random(),
// //       name: file.name,
// //       size: (file.size / 1024).toFixed(1) + ' KB',
// //       type: file.type,
// //       file,
// //     }));
// //     setDocuments([...documents, ...newDocuments]);
    
// //     // Store the first document as 'file' for API (adjust based on your needs)
// //     if (files[0]) {
// //       setFormData(prev => ({ ...prev, file: files[0] }));
// //     }
// //   };

// //   const removeDocument = (id) => {
// //     setDocuments(documents.filter(doc => doc.id !== id));
// //   };

// //   const handleInputChange = (e) => {
// //     const { id, value } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [id]: value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);
    
// //     try {
// //       // Prepare FormData for file upload
// //       const formDataToSend = new FormData();
      
// //       // Append all form fields
// //       Object.keys(formData).forEach(key => {
// //         if (formData[key] !== null && formData[key] !== '') {
// //           formDataToSend.append(key, formData[key]);
// //         }
// //       });
      
// //       // Add document if exists
// //       if (documents.length > 0) {
// //         documents.forEach((doc, index) => {
// //           formDataToSend.append(`documents[${index}]`, doc.file);
// //         });
// //       }
      
// //       // API call
// //       const response = await fetch('http://192.168.0.3:8000/api/employees', {
// //         method: 'POST',
// //         body: formDataToSend,
// //         headers: {
// //           'Accept': 'application/json',
// //         },
// //       });
      
// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }
      
// //       const result = await response.json();
      
// //       // Call the callback if provided
// //       if (onAddEmployee) {
// //         onAddEmployee(result.data || result);
// //       }
      
// //       onClose();
      
// //     } catch (error) {
// //       console.error('Error adding employee:', error);
// //       alert('Failed to add employee. Please try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   // Gender options
// //   const genderOptions = [
// //     { value: '', label: 'Select Gender' },
// //     { value: 'male', label: 'Male' },
// //     { value: 'female', label: 'Female' },
// //     { value: 'other', label: 'Other' },
// //   ];

// //   // Marital status options
// //   const maritalStatusOptions = [
// //     { value: '', label: 'Select Marital Status' },
// //     { value: 'single', label: 'Single' },
// //     { value: 'married', label: 'Married' },
// //     { value: 'divorced', label: 'Divorced' },
// //     { value: 'widowed', label: 'Widowed' },
// //   ];

// //   // Employee type options
// //   const employeeTypeOptions = [
// //     { value: '', label: 'Select Employee Type' },
// //     { value: 'full_time', label: 'Full Time' },
// //     { value: 'part_time', label: 'Part Time' },
// //     { value: 'contract', label: 'Contract' },
// //     { value: 'intern', label: 'Intern' },
// //     { value: 'temporary', label: 'Temporary' },
// //   ];

// //   // Work type options
// //   const workTypeOptions = [
// //     { value: '', label: 'Select Work Type' },
// //     { value: 'onsite', label: 'Onsite' },
// //     { value: 'remote', label: 'Remote' },
// //     { value: 'hybrid', label: 'Hybrid' },
// //   ];

// //   return (
// //     <motion.div
// //       className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md overflow-y-auto"
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       exit={{ opacity: 0 }}
// //       onClick={onClose}
// //     >
// //       <motion.div
// //         className="relative w-full top-40 max-w-6xl mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden"
// //         initial={{ y: 80, scale: 0.9, opacity: 0 }}
// //         animate={{ y: 0, scale: 1, opacity: 1 }}
// //         exit={{ y: 80, scale: 0.9, opacity: 0 }}
// //         transition={{ type: 'spring', stiffness: 320, damping: 30 }}
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className={`px-8 py-6 ${getLightBg()} border-b flex items-center justify-between`}>
// //           <div className="flex items-center gap-3">
// //             <div className={`p-2 rounded-lg ${getButtonGradient()}`}>
// //               <User className="h-6 w-6 text-white" />
// //             </div>
// //             <div>
// //               <h2 className="text-2xl font-bold text-gray-900">
// //                 Add New Employee
// //               </h2>
// //               <p className="text-sm text-gray-600 mt-1">Fill in the employee details below</p>
// //             </div>
// //           </div>
// //           <button
// //             onClick={onClose}
// //             className="p-2.5 rounded-full hover:bg-white/50 transition-colors"
// //             aria-label="Close modal"
// //           >
// //             <X className="h-5 w-5 text-gray-600" />
// //           </button>
// //         </div>

// //         {/* Form Body */}
// //         <div className="p-8 max-h-[80vh] overflow-y-auto">
// //           <form onSubmit={handleSubmit} className="space-y-8">
// //             {/* Section 1: Basic Information & Photo */}
// //             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //               {/* Photo Upload Section */}
// //               <div className="lg:col-span-1 space-y-6">
// //                 <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border-2 border-dashed border-gray-300">
// //                   <div className="text-center">
// //                     <div className="relative inline-block">
// //                       <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100">
// //                         {photo ? (
// //                           <img 
// //                             src={photo} 
// //                             alt="Employee" 
// //                             className="w-full h-full object-cover"
// //                           />
// //                         ) : (
// //                           <div className="w-full h-full flex items-center justify-center">
// //                             <User className="h-16 w-16 text-gray-400" />
// //                           </div>
// //                         )}
// //                       </div>
// //                       <label
// //                         htmlFor="photo-upload"
// //                         className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
// //                       >
// //                         <Camera className="h-5 w-5 text-gray-700" />
// //                         <input
// //                           id="photo-upload"
// //                           type="file"
// //                           accept="image/*"
// //                           onChange={handlePhotoUpload}
// //                           className="hidden"
// //                         />
// //                       </label>
// //                     </div>
// //                     <p className="mt-4 text-sm text-gray-600">Upload employee photo</p>
// //                     <p className="text-xs text-gray-500">JPEG, PNG up to 2MB</p>
// //                   </div>
// //                 </div>

// //                 {/* Document Upload */}
// //                 <div className="space-y-4">
// //                   <div className="flex items-center justify-between">
// //                     <h3 className="font-semibold text-gray-900 flex items-center gap-2">
// //                       <FileText className="h-5 w-5" />
// //                       Documents *
// //                     </h3>
// //                     <span className="text-sm text-gray-500">{documents.length} files</span>
// //                   </div>
                  
// //                   <label
// //                     htmlFor="document-upload"
// //                     className="block p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-white"
// //                   >
// //                     <div className="text-center">
// //                       <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
// //                       <p className="text-sm font-medium text-gray-700">Click to upload documents *</p>
// //                       <p className="text-xs text-gray-500 mt-1">Required: PDF, DOC, JPEG up to 2MB</p>
// //                     </div>
// //                     <input
// //                       id="document-upload"
// //                       type="file"
// //                       multiple
// //                       onChange={handleDocumentUpload}
// //                       className="hidden"
// //                       required
// //                     />
// //                   </label>

// //                   {/* Document List */}
// //                   {documents.length > 0 && (
// //                     <div className="space-y-2 max-h-40 overflow-y-auto">
// //                       {documents.map(doc => (
// //                         <div
// //                           key={doc.id}
// //                           className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
// //                         >
// //                           <div className="flex items-center gap-3 min-w-0">
// //                             <FileText className="h-4 w-4 text-gray-500 flex-shrink-0" />
// //                             <div className="min-w-0">
// //                               <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
// //                               <p className="text-xs text-gray-500">{doc.size}</p>
// //                             </div>
// //                           </div>
// //                           <button
// //                             type="button"
// //                             onClick={() => removeDocument(doc.id)}
// //                             className="p-1.5 hover:bg-red-50 rounded"
// //                             title="Remove"
// //                           >
// //                             <Trash2 className="h-3.5 w-3.5 text-red-500" />
// //                           </button>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Basic Information */}
// //               <div className="lg:col-span-2 space-y-6">
// //                 <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Basic Information</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {/* Full Name */}
// //                   <div>
// //                     <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Full Name *
// //                     </label>
// //                     <motion.input
// //                       id="name"
// //                       type="text"
// //                       required
// //                       value={formData.name}
// //                       onChange={handleInputChange}
// //                       placeholder="John Doe"
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                   </div>

// //                   {/* Email */}
// //                   <div>
// //                     <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Email Address *
// //                     </label>
// //                     <motion.input
// //                       id="email"
// //                       type="email"
// //                       required
// //                       value={formData.email}
// //                       onChange={handleInputChange}
// //                       placeholder="john.doe@company.com"
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                   </div>

// //                   {/* Phone */}
// //                   <div>
// //                     <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Phone Number *
// //                     </label>
// //                     <motion.input
// //                       id="phone"
// //                       type="tel"
// //                       required
// //                       value={formData.phone}
// //                       onChange={handleInputChange}
// //                       placeholder="+1 (555) 123-4567"
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                   </div>

// //                   {/* Gender */}
// //                   <div>
// //                     <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Gender
// //                     </label>
// //                     <motion.select
// //                       id="gender"
// //                       value={formData.gender}
// //                       onChange={handleInputChange}
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     >
// //                       {genderOptions.map(option => (
// //                         <option key={option.value} value={option.value}>{option.label}</option>
// //                       ))}
// //                     </motion.select>
// //                   </div>

// //                   {/* Date of Birth */}
// //                   <div>
// //                     <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Date of Birth
// //                     </label>
// //                     <motion.input
// //                       id="date_of_birth"
// //                       type="date"
// //                       value={formData.date_of_birth}
// //                       onChange={handleInputChange}
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                   </div>

// //                   {/* Marital Status */}
// //                   <div>
// //                     <label htmlFor="marital_status" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Marital Status
// //                     </label>
// //                     <motion.select
// //                       id="marital_status"
// //                       value={formData.marital_status}
// //                       onChange={handleInputChange}
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     >
// //                       {maritalStatusOptions.map(option => (
// //                         <option key={option.value} value={option.value}>{option.label}</option>
// //                       ))}
// //                     </motion.select>
// //                   </div>

// //                   {/* Children */}
// //                   <div>
// //                     <label htmlFor="children" className="block text-sm font-medium text-gray-700 mb-2">
// //                       Children
// //                     </label>
// //                     <motion.input
// //                       id="children"
// //                       type="text"
// //                       value={formData.children}
// //                       onChange={handleInputChange}
// //                       placeholder="e.g., 2"
// //                       variants={inputVariants}
// //                       whileFocus="focus"
// //                       className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Section 2: Address Information */}
// //             <div className="space-y-6">
// //               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Address Information</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {/* Address */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Address
// //                   </label>
// //                   <motion.input
// //                     id="address"
// //                     type="text"
// //                     value={formData.address}
// //                     onChange={handleInputChange}
// //                     placeholder="Street Address"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* City */}
// //                 <div>
// //                   <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
// //                     City
// //                   </label>
// //                   <motion.input
// //                     id="city"
// //                     type="text"
// //                     value={formData.city}
// //                     onChange={handleInputChange}
// //                     placeholder="City"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* State */}
// //                 <div>
// //                   <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
// //                     State
// //                   </label>
// //                   <motion.input
// //                     id="state"
// //                     type="text"
// //                     value={formData.state}
// //                     onChange={handleInputChange}
// //                     placeholder="State"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Country */}
// //                 <div>
// //                   <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Country
// //                   </label>
// //                   <motion.input
// //                     id="country"
// //                     type="text"
// //                     value={formData.country}
// //                     onChange={handleInputChange}
// //                     placeholder="Country"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Section 3: Professional Details */}
// //             <div className="space-y-6">
// //               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Professional Details</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {/* Qualification */}
// //                 <div>
// //                   <label htmlFor="qualification" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Qualification
// //                   </label>
// //                   <motion.input
// //                     id="qualification"
// //                     type="text"
// //                     value={formData.qualification}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., B.Tech, MBA"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Experience */}
// //                 <div>
// //                   <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Experience
// //                   </label>
// //                   <motion.input
// //                     id="experience"
// //                     type="text"
// //                     value={formData.experience}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., 5 years"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Department */}
// //                 <div>
// //                   <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Department
// //                   </label>
// //                   <motion.input
// //                     id="department"
// //                     type="text"
// //                     value={formData.department}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., IT, HR, Sales"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Employee Type */}
// //                 <div>
// //                   <label htmlFor="employee_type" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Employee Type
// //                   </label>
// //                   <motion.select
// //                     id="employee_type"
// //                     value={formData.employee_type}
// //                     onChange={handleInputChange}
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   >
// //                     {employeeTypeOptions.map(option => (
// //                       <option key={option.value} value={option.value}>{option.label}</option>
// //                     ))}
// //                   </motion.select>
// //                 </div>

// //                 {/* Work Type */}
// //                 <div>
// //                   <label htmlFor="work_type" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Work Type
// //                   </label>
// //                   <motion.select
// //                     id="work_type"
// //                     value={formData.work_type}
// //                     onChange={handleInputChange}
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   >
// //                     {workTypeOptions.map(option => (
// //                       <option key={option.value} value={option.value}>{option.label}</option>
// //                     ))}
// //                   </motion.select>
// //                 </div>

// //                 {/* Joining Date */}
// //                 <div>
// //                   <label htmlFor="joining_date" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Joining Date
// //                   </label>
// //                   <motion.input
// //                     id="joining_date"
// //                     type="date"
// //                     value={formData.joining_date}
// //                     onChange={handleInputChange}
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* End Date */}
// //                 <div>
// //                   <label htmlFor="end_date" className="block text-sm font-medium text-gray-700 mb-2">
// //                     End Date
// //                   </label>
// //                   <motion.input
// //                     id="end_date"
// //                     type="date"
// //                     value={formData.end_date}
// //                     onChange={handleInputChange}
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Salary */}
// //                 <div>
// //                   <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Salary
// //                   </label>
// //                   <motion.input
// //                     id="salary"
// //                     type="text"
// //                     value={formData.salary}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., $50,000"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Reporting Manager */}
// //                 <div>
// //                   <label htmlFor="reporting_manager" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Reporting Manager
// //                   </label>
// //                   <motion.input
// //                     id="reporting_manager"
// //                     type="text"
// //                     value={formData.reporting_manager}
// //                     onChange={handleInputChange}
// //                     placeholder="Manager's Name"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Work Location */}
// //                 <div>
// //                   <label htmlFor="work_location" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Work Location
// //                   </label>
// //                   <motion.input
// //                     id="work_location"
// //                     type="text"
// //                     value={formData.work_location}
// //                     onChange={handleInputChange}
// //                     placeholder="Office Location"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Shift Information */}
// //                 <div>
// //                   <label htmlFor="shift_information" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Shift Information
// //                   </label>
// //                   <motion.input
// //                     id="shift_information"
// //                     type="text"
// //                     value={formData.shift_information}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., 9 AM - 6 PM"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Tags */}
// //                 <div>
// //                   <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Tags
// //                   </label>
// //                   <motion.input
// //                     id="tags"
// //                     type="text"
// //                     value={formData.tags}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., developer, senior"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Section 4: Emergency Contact */}
// //             <div className="space-y-6">
// //               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Emergency Contact</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {/* Emergency Contact Name */}
// //                 <div>
// //                   <label htmlFor="emergency_contact_name" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Contact Name
// //                   </label>
// //                   <motion.input
// //                     id="emergency_contact_name"
// //                     type="text"
// //                     value={formData.emergency_contact_name}
// //                     onChange={handleInputChange}
// //                     placeholder="Emergency Contact Name"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Emergency Contact Phone */}
// //                 <div>
// //                   <label htmlFor="emergency_contact" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Contact Phone
// //                   </label>
// //                   <motion.input
// //                     id="emergency_contact"
// //                     type="tel"
// //                     value={formData.emergency_contact}
// //                     onChange={handleInputChange}
// //                     placeholder="Emergency Phone Number"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Emergency Contact Relation */}
// //                 <div>
// //                   <label htmlFor="emergency_contact_relation" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Relationship
// //                   </label>
// //                   <motion.input
// //                     id="emergency_contact_relation"
// //                     type="text"
// //                     value={formData.emergency_contact_relation}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., Spouse, Parent"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Section 5: Bank Details */}
// //             <div className="space-y-6">
// //               <h3 className="text-lg font-semibold text-gray-900 pb-2 border-b">Bank Details</h3>
// //               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //                 {/* Bank Name */}
// //                 <div>
// //                   <label htmlFor="bank_name" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bank Name
// //                   </label>
// //                   <motion.input
// //                     id="bank_name"
// //                     type="text"
// //                     value={formData.bank_name}
// //                     onChange={handleInputChange}
// //                     placeholder="Bank Name"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Account Number */}
// //                 <div>
// //                   <label htmlFor="account_number" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Account Number
// //                   </label>
// //                   <motion.input
// //                     id="account_number"
// //                     type="text"
// //                     value={formData.account_number}
// //                     onChange={handleInputChange}
// //                     placeholder="Account Number"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Branch */}
// //                 <div>
// //                   <label htmlFor="branch" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Branch
// //                   </label>
// //                   <motion.input
// //                     id="branch"
// //                     type="text"
// //                     value={formData.branch}
// //                     onChange={handleInputChange}
// //                     placeholder="Branch Name"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Bank Address */}
// //                 <div className="md:col-span-2">
// //                   <label htmlFor="bank_address" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bank Address
// //                   </label>
// //                   <motion.input
// //                     id="bank_address"
// //                     type="text"
// //                     value={formData.bank_address}
// //                     onChange={handleInputChange}
// //                     placeholder="Bank Address"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Bank Country */}
// //                 <div>
// //                   <label htmlFor="bank_country" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bank Country
// //                   </label>
// //                   <motion.input
// //                     id="bank_country"
// //                     type="text"
// //                     value={formData.bank_country}
// //                     onChange={handleInputChange}
// //                     placeholder="Country"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Bank Code 1 */}
// //                 <div>
// //                   <label htmlFor="bank_code_1" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bank Code 1
// //                   </label>
// //                   <motion.input
// //                     id="bank_code_1"
// //                     type="text"
// //                     value={formData.bank_code_1}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., SWIFT Code"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Bank Code 2 */}
// //                 <div>
// //                   <label htmlFor="bank_code_2" className="block text-sm font-medium text-gray-700 mb-2">
// //                     Bank Code 2
// //                   </label>
// //                   <motion.input
// //                     id="bank_code_2"
// //                     type="text"
// //                     value={formData.bank_code_2}
// //                     onChange={handleInputChange}
// //                     placeholder="e.g., Routing Number"
// //                     variants={inputVariants}
// //                     whileFocus="focus"
// //                     className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Action Buttons */}
// //             <div className="pt-6 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
// //               <div className="text-sm text-gray-500">
// //                 <span className="font-medium">{documents.length}</span> documents attached
// //                 {photo && <span>, 1 photo uploaded</span>}
// //               </div>
// //               <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
// //                 <button
// //                   type="button"
// //                   onClick={onClose}
// //                   className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
// //                   disabled={isSubmitting}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   disabled={isSubmitting}
// //                   className={`px-8 py-3 rounded-lg ${getButtonGradient()} ${getButtonHover()} text-white font-medium shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
// //                 >
// //                   <div className="flex items-center justify-center gap-2">
// //                     {isSubmitting ? (
// //                       <>
// //                         <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
// //                         Adding...
// //                       </>
// //                     ) : (
// //                       <>
// //                         <Plus className="h-5 w-5" />
// //                         Add Employee
// //                       </>
// //                     )}
// //                   </div>
// //                 </button>
// //               </div>
// //             </div>
// //           </form>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }


// AddModal.jsx


// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { X, User, Mail, Phone, Briefcase, Building, Calendar, MapPin, Landmark, Hash } from 'lucide-react';


// const AddModal = ({ onClose, onAddEmployee }) => {
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
//     bankName: '',
//     accountNumber: '',
//     password: 'employee@123',
//     gender: 'Male'
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const departments = [
//     'IT', 'HR', 'Sales', 'Marketing', 'Finance', 'Design', 'Operations', 'Support'
//   ];

//   const workTypes = ['Permanent', 'Contract', 'Intern', 'Remote'];
//   const workLocations = ['Office', 'Remote', 'Hybrid'];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     // Clear error when user starts typing
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
//       // Modal will be closed by parent component
//     } catch (error) {
//       alert(`Error: ${error.message}`);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
//         >
//           {/* Header */}
//           <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
//                 <p className="text-gray-600 mt-1">Fill in the employee details below</p>
//               </div>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-100 rounded-full transition"
//               >
//                 <X className="h-5 w-5 text-gray-500" />
//               </button>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-120px)]">
//             <div className="p-8">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Personal Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <User className="h-5 w-5" />
//                     Personal Information
//                   </h3>
                  
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Full Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                       placeholder="Enter full name"
//                     />
//                     {errors.name && (
//                       <p className="mt-1 text-sm text-red-500">{errors.name}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <div className="relative">
//                       <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                       <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                         placeholder="employee@example.com"
//                       />
//                     </div>
//                     {errors.email && (
//                       <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <div className="relative">
//                       <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         placeholder="+91 9876543210"
//                       />
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Gender
//                     </label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                     >
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Job Information */}
//                 <div className="space-y-6">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Briefcase className="h-5 w-5" />
//                     Job Information
//                   </h3>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Position *
//                     </label>
//                     <input
//                       type="text"
//                       name="position"
//                       value={formData.position}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                       placeholder="e.g., UX Developer"
//                     />
//                     {errors.position && (
//                       <p className="mt-1 text-sm text-red-500">{errors.position}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Department *
//                     </label>
//                     <select
//                       name="department"
//                       value={formData.department}
//                       onChange={handleChange}
//                       className={`w-full px-4 py-3 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                     >
//                       <option value="">Select Department</option>
//                       {departments.map(dept => (
//                         <option key={dept} value={dept}>{dept}</option>
//                       ))}
//                     </select>
//                     {errors.department && (
//                       <p className="mt-1 text-sm text-red-500">{errors.department}</p>
//                     )}
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Salary *
//                       </label>
//                       <input
//                         type="number"
//                         name="salary"
//                         value={formData.salary}
//                         onChange={handleChange}
//                         className={`w-full px-4 py-3 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                         placeholder="e.g., 45699"
//                       />
//                       {errors.salary && (
//                         <p className="mt-1 text-sm text-red-500">{errors.salary}</p>
//                       )}
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Join Date *
//                       </label>
//                       <div className="relative">
//                         <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                         <input
//                           type="date"
//                           name="joinDate"
//                           value={formData.joinDate}
//                           onChange={handleChange}
//                           className={`w-full pl-10 pr-4 py-3 border ${errors.joinDate ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition`}
//                         />
//                       </div>
//                       {errors.joinDate && (
//                         <p className="mt-1 text-sm text-red-500">{errors.joinDate}</p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Work Type
//                       </label>
//                       <select
//                         name="workType"
//                         value={formData.workType}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       >
//                         {workTypes.map(type => (
//                           <option key={type} value={type}>{type}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Work Location
//                       </label>
//                       <select
//                         name="workLocation"
//                         value={formData.workLocation}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       >
//                         {workLocations.map(loc => (
//                           <option key={loc} value={loc}>{loc}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Address Information */}
//                 <div className="space-y-6 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <MapPin className="h-5 w-5" />
//                     Address Information
//                   </h3>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Address
//                     </label>
//                     <textarea
//                       name="address"
//                       value={formData.address}
//                       onChange={handleChange}
//                       rows="2"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
//                       placeholder="Enter full address"
//                     />
//                   </div>

//                   <div className="grid grid-cols-3 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Country
//                       </label>
//                       <select
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                       >
//                         <option value="India">India</option>
//                         <option value="USA">USA</option>
//                         <option value="UK">UK</option>
//                         <option value="Canada">Canada</option>
//                         <option value="Australia">Australia</option>
//                       </select>
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
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         placeholder="State"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         City
//                       </label>
//                       <input
//                         type="text"
//                         name="city"
//                         value={formData.city}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                         placeholder="City"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Bank Information */}
//                 <div className="space-y-6 md:col-span-2">
//                   <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
//                     <Landmark className="h-5 w-5" />
//                     Bank Information
//                   </h3>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Name
//                       </label>
//                       <div className="relative">
//                         <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="bankName"
//                           value={formData.bankName}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           placeholder="e.g., HDFC Bank"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Account Number
//                       </label>
//                       <div className="relative">
//                         <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                         <input
//                           type="text"
//                           name="accountNumber"
//                           value={formData.accountNumber}
//                           onChange={handleChange}
//                           className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
//                           placeholder="Account number"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer */}
//             <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-6">
//               <div className="flex justify-end gap-3">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       Creating...
//                     </>
//                   ) : (
//                     'Create Employee'
//                   )}
//                 </button>
//               </div>
//             </div>
//           </form>
//         </motion.div>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default AddModal;


import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, User, Mail, Phone, Briefcase, Building, Calendar, 
  MapPin, Landmark, Hash, CreditCard, Globe, Home, 
  DollarSign, Lock, CheckCircle, AlertCircle 
} from 'lucide-react';
import { useTheme } from '../ThemeContext';

const AddModal = ({ onClose, onAddEmployee }) => {
  const { getThemeClasses } = useTheme();
  
  // Get theme classes with safety check
  const themeClasses = React.useMemo(() => {
    try {
      const classes = getThemeClasses();
      return {
        ...classes,
        // Ensure we have all required classes
        accent: classes.accent || 'orange-600',
        textColor: classes.textColor || 'text-orange-600',
        buttonBg: classes.buttonBg || 'bg-orange-600',
        buttonHover: classes.buttonHover || 'hover:bg-orange-700',
        borderColor: classes.borderColor || 'border-orange-600',
        focusRing: classes.focusRing || 'focus:ring-orange-500/50',
        ringColor: classes.ringColor || 'ring-orange-500',
      };
    } catch (error) {
      console.error('Error getting theme classes:', error);
      // Default fallback classes
      return {
        accent: 'orange-600',
        textColor: 'text-orange-600',
        buttonBg: 'bg-orange-600',
        buttonHover: 'hover:bg-orange-700',
        borderColor: 'border-orange-600',
        focusRing: 'focus:ring-orange-500/50',
        ringColor: 'ring-orange-500',
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
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Personal info
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[+]?[0-9\s\-()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    // Job info
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
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onAddEmployee(formData);
      // Modal will be closed by parent component
    } catch (error) {
      alert(`Error: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8 border border-gray-200"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-5 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-orange-100 ${themeClasses.textColor}`}>
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
                  <p className="text-gray-600 mt-1">Fill in the employee details below</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className={`p-2 hover:bg-gray-100 rounded-full transition ${themeClasses.ringColor} focus:outline-none focus:ring-2`}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="p-6 mt-200">
              {/* Single Page Form Layout */}
              <div className="space-y-8">
                {/* Personal Information Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <User className={`h-5 w-5 ${themeClasses.textColor}`} />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="Enter full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="employee@example.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
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
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="+91 9876543210"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    {/* Password */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                          placeholder="Default password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? 'Hide' : 'Show'}
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
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <Briefcase className={`h-5 w-5 ${themeClasses.textColor}`} />
                    Job Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Position */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Position *
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.position ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="e.g., UX Developer"
                        />
                      </div>
                      {errors.position && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
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
                        className={`w-full px-4 py-3 border ${errors.department ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept.value} value={dept.value}>{dept.label}</option>
                        ))}
                      </select>
                      {errors.department && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
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
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="number"
                          name="salary"
                          value={formData.salary}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="e.g., 45699"
                          min="0"
                          step="100"
                        />
                      </div>
                      {errors.salary && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
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
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          type="date"
                          name="joinDate"
                          value={formData.joinDate}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.joinDate ? 'border-red-500' : 'border-gray-300'} rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                        />
                      </div>
                      {errors.joinDate && (
                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
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
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
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
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                      >
                        {workLocations.map(loc => (
                          <option key={loc.value} value={loc.value}>{loc.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Address & Bank Information Section */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                    <MapPin className={`h-5 w-5 ${themeClasses.textColor}`} />
                    Address & Bank Information
                  </h3>
                  
                  {/* Address Information */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-700">Address Information</h4>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition resize-none`}
                        placeholder="Enter full address (Street, Area, Landmark)"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Country
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          >
                            {countries.map(country => (
                              <option key={country.value} value={country.value}>{country.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="State"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                          placeholder="City"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Bank Information */}
                  <div className="space-y-4 pt-4">
                    <h4 className="font-medium text-gray-700">Bank Information</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bank Name
                        </label>
                        <div className="relative">
                          <Landmark className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                            placeholder="e.g., HDFC Bank"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number
                        </label>
                        <div className="relative">
                          <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            name="accountNumber"
                            value={formData.accountNumber}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg ${themeClasses.focusRing} focus:ring-2 focus:border-orange-500 transition`}
                            placeholder="Account number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary Section */}
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
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
              </div>
            </div>

            {/* Footer - Fixed to ensure buttons are visible */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition active:scale-95"
                >
                  Cancel
                </button>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2.5 ${themeClasses.buttonBg} ${themeClasses.buttonHover} active:scale-95 text-white rounded-lg font-medium flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                    style={{ backgroundColor: themeClasses.buttonBg.includes('orange') ? '#ea580c' : undefined }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Employee...
                      </>
                    ) : (
                      <>
                        <User className="h-4 w-4" />
                        Create Employee
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddModal;