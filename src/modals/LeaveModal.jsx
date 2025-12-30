// src/components/modals/LeaveModal.jsx
import React from 'react';
import { X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LeaveModal({ onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Leave Request</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-4">
          <select className="w-full rounded border p-2">
            <option>Casual Leave</option>
            <option>Sick Leave</option>
            <option>Annual Leave</option>
          </select>
          <div className="grid grid-cols-2 gap-2">
            <input type="date" className="rounded border p-2" />
            <input type="date" className="rounded border p-2" />
          </div>
          <textarea
            placeholder="Reason"
            rows="3"
            className="w-full rounded border p-2"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
            <button className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}