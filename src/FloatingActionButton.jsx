// src/components/FloatingActionButton.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  UserPlus,
  Calendar,
  Clock,
  DollarSign,
} from 'lucide-react';

// Import your modals
import AddModal from './modals/AddModal';
import LeaveModal from './modals/LeaveModal';

const actions = [
  { Icon: UserPlus, label: 'Add Employee', Modal: AddModal },
  { Icon: Calendar, label: 'Leave Request', Modal: LeaveModal },
  { Icon: Clock, label: 'Attendance Request', Modal: null },
  { Icon: DollarSign, label: 'Overtime Request', Modal: null },
];

const fabVariants = {
  closed: { rotate: 0 },
  open: { rotate: 45 },
};

const menuVariants = {
  closed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const itemVariants = {
  closed: { opacity: 0, y: 20, scale: 0.6 },
  open: { opacity: 1, y: 0, scale: 1 },
};

export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  const [ActiveModal, setActiveModal] = useState(null);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openModal = (ModalComponent) => {
    if (ModalComponent) {
      setActiveModal(() => ModalComponent);
    }
    setOpen(false);
  };

  const closeModal = () => setActiveModal(null);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        layout
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 transition-colors"
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
      >
        <motion.div
          variants={fabVariants}
          animate={open ? 'open' : 'closed'}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <Plus className="h-7 w-7" />
        </motion.div>
      </motion.button>

      {/* Action Menu */}
      <div ref={menuRef} className="fixed bottom-28 right-6 z-40">
        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-3"
            >
              {actions.map((action, i) => (
                <motion.button
                  key={action.label}
                  layout
                  variants={itemVariants}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 28,
                  }}
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all
                    ${action.Modal
                      ? 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                  `}
                  onClick={() => openModal(action.Modal)}
                  title={action.label}
                  disabled={!action.Modal}
                >
                  <action.Icon className="h-6 w-6" />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Render Active Modal */}
      <AnimatePresence>
        {ActiveModal && <ActiveModal onClose={closeModal} />}
      </AnimatePresence>
    </>
  );
}