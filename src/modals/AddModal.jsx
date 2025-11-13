'use client';

import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const inputVariants = {
  focus: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } },
  blur: { scale: 1 },
};

export default function AddModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Modal Card – 70% Width */}
      <motion.div
        className="relative w-full max-w-5xl mx-auto rounded-xl bg-white shadow-2xl overflow-hidden"
        initial={{ y: 80, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 80, scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Clean Header – No Cut Border */}
        <div className="bg-gray-50 px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wider">
            Add New Employee
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form Body – 2 Columns */}
        <div className="p-6 sm:p-8">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1.5">
                Full Name
              </label>
              <motion.input
                id="fullName"
                type="text"
                placeholder="Enter full name"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                           transition-shadow"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <motion.input
                id="email"
                type="email"
                placeholder="employee@company.com"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Department */}
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1.5">
                Department
              </label>
              <motion.select
                id="department"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </motion.select>
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1.5">
                Date of Birth
              </label>
              <motion.input
                id="dob"
                type="date"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Document Number */}
            <div>
              <label htmlFor="docNum" className="block text-sm font-medium text-gray-700 mb-1.5">
                Document Number (Aadhaar / Passport)
              </label>
              <motion.input
                id="docNum"
                type="text"
                placeholder="e.g., 1234-5678-9012"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Join Date */}
            <div>
              <label htmlFor="joinDate" className="block text-sm font-medium text-gray-700 mb-1.5">
                Join Date
              </label>
              <motion.input
                id="joinDate"
                type="date"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Work Type */}
            <div>
              <label htmlFor="workType" className="block text-sm font-medium text-gray-700 mb-1.5">
                Work Type
              </label>
              <motion.select
                id="workType"
                variants={inputVariants}
                whileFocus="focus"
                className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-gray-900
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Work Type</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="intern">Intern</option>
              </motion.select>
            </div>

            {/* Balance Grid (optional) */}
            <div className="hidden md:block" />
          </form>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="order-2 sm:order-1 w-full sm:w-auto px-5 py-2.5 text-gray-600 font-medium hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="order-1 sm:order-2 w-full sm:w-auto rounded-md bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              Save Employee
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}