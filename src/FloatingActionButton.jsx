// // // src/components/FloatingActionButton.jsx
// // import React, { useState, useEffect, useRef } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   Plus,
// //   UserPlus,
// //   Calendar,
// //   Clock,
// //   DollarSign,
// // } from 'lucide-react';

// // // Import your modals
// // import AddModal from './modals/AddModal';
// // import LeaveModal from './modals/LeaveModal';

// // const actions = [
// //   { Icon: UserPlus, label: 'Add Employee', Modal: AddModal },
// //   { Icon: Calendar, label: 'Leave Request', Modal: LeaveModal },
// //   { Icon: Clock, label: 'Attendance Request', Modal: null },
// //   { Icon: DollarSign, label: 'Overtime Request', Modal: null },
// // ];

// // const fabVariants = {
// //   closed: { rotate: 0 },
// //   open: { rotate: 45 },
// // };

// // const menuVariants = {
// //   closed: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
// //   open: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
// // };

// // const itemVariants = {
// //   closed: { opacity: 0, y: 20, scale: 0.6 },
// //   open: { opacity: 1, y: 0, scale: 1 },
// // };

// // export default function FloatingActionButton() {
// //   const [open, setOpen] = useState(false);
// //   const [ActiveModal, setActiveModal] = useState(null);
// //   const menuRef = useRef(null);

// //   // Close menu when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (menuRef.current && !menuRef.current.contains(e.target)) {
// //         setOpen(false);
// //       }
// //     };
// //     document.addEventListener('mousedown', handleClickOutside);
// //     return () => document.removeEventListener('mousedown', handleClickOutside);
// //   }, []);

// //   const openModal = (ModalComponent) => {
// //     if (ModalComponent) {
// //       setActiveModal(() => ModalComponent);
// //     }
// //     setOpen(false);
// //   };

// //   const closeModal = () => setActiveModal(null);

// //   return (
// //     <>
// //       {/* Floating Action Button */}
// //       <motion.button
// //         layout
// //         className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-xl hover:bg-red-700 transition-colors"
// //         whileHover={{ scale: 1.12 }}
// //         whileTap={{ scale: 0.94 }}
// //         onClick={() => setOpen(!open)}
// //       >
// //         <motion.div
// //           variants={fabVariants}
// //           animate={open ? 'open' : 'closed'}
// //           transition={{ type: 'spring', stiffness: 500, damping: 30 }}
// //         >
// //           <Plus className="h-7 w-7" />
// //         </motion.div>
// //       </motion.button>

// //       {/* Action Menu */}
// //       <div ref={menuRef} className="fixed bottom-28 right-6 z-40">
// //         <AnimatePresence>
// //           {open && (
// //             <motion.div
// //               variants={menuVariants}
// //               initial="closed"
// //               animate="open"
// //               exit="closed"
// //               className="flex flex-col items-center gap-3"
// //             >
// //               {actions.map((action, i) => (
// //                 <motion.button
// //                   key={action.label}
// //                   layout
// //                   variants={itemVariants}
// //                   transition={{
// //                     type: 'spring',
// //                     stiffness: 420,
// //                     damping: 28,
// //                   }}
// //                   className={`
// //                     flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all
// //                     ${action.Modal
// //                       ? 'bg-white text-gray-800 hover:bg-gray-50 hover:shadow-xl'
// //                       : 'bg-gray-300 text-gray-500 cursor-not-allowed'
// //                     }
// //                   `}
// //                   onClick={() => openModal(action.Modal)}
// //                   title={action.label}
// //                   disabled={!action.Modal}
// //                 >
// //                   <action.Icon className="h-6 w-6" />
// //                 </motion.button>
// //               ))}
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>

// //       {/* Render Active Modal */}
// //       <AnimatePresence>
// //         {ActiveModal && <ActiveModal onClose={closeModal} />}
// //       </AnimatePresence>
// //     </>
// //   );
// // }





// // src/components/FloatingActionButton.jsx
// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   Plus,
//   UserPlus,
//   Calendar,
//   Clock,
//   DollarSign,
//   FileText,
//   MessageSquare,
//   Settings,
//   Users,
//   Briefcase,
//   Award,
//   Target,
//   Bell,
//   CheckCircle,
//   X,
//   CalendarDays,
//   UserCheck,
//   Banknote,
//   Star,
//   Shield,
//   CreditCard,
//   BarChart,
//   PieChart,
//   LineChart,
//   Activity,
//   TrendingUp,
//   Zap,
//   Rocket,
//   Crown,
//   Sparkles,
//   ChevronLeft,
//   ChevronRight,
//   Eye,
//   EyeOff,
//   Music,
//   Volume2,
//   CloudRain,
//   Sun,
//   Moon,
//   Wind,
//   Thermometer,
//   Droplets,
//   Cloud,
//   CloudSun,
//   CloudLightning,
//   CloudSnow
// } from 'lucide-react';
// import { useTheme } from './ThemeContext';

// import AddModal from './modals/AddModal';
// import LeaveModal from './modals/LeaveModal';

// import { label } from 'framer-motion/client';

// // Weather data
// const weatherData = {
//   condition: 'Rain coming',
//   temperature: '24°C',
//   humidity: '78%',
//   time: '04-12-2025',
//   icon: CloudRain,
//   audioDuration: '0:00'
// };




// const actions = [
//   { 
//     Icon: UserPlus, 
//     label: 'Add Employee', 
//     Modal:AddModal,
//     color: 'from-blue-500 to-cyan-500',
//     bgColor: 'bg-blue-500',
//     description: 'Add new team member',
//     badge: 'Add',
    
//   },
//   { 
//     Icon: Calendar, 
//     label: 'Leave Request', 
//     Modal: LeaveModal,
//     color: 'from-green-500 to-emerald-500',
//     bgColor: 'bg-green-500',
//     description: 'Submit leave application',
//     badge: 'Add'
//   },
//   { 
//     Icon: Clock, 
//     label: 'Attendance', 
//     Modal: null,
//     color: 'from-purple-500 to-pink-500',
//     bgColor: 'bg-purple-500',
//     description: 'Mark attendance',
//     badge: 'Add'
//   },
//   { 
//     Icon: DollarSign, 
//     label: 'Overtime', 
//     Modal: null,
//     color: 'from-amber-500 to-orange-500',
//     bgColor: 'bg-amber-500',
//     description: 'Request overtime',
//     badge: 'Add'
//   },
// ];


//    const showmodel =(label) =>{
//       if(label === 'Add Employee') {
//         <AddModal />
//       }
//    }

// const fabVariants = {
//   closed: { 
//     rotate: 0,
//     scale: 1
//   },
//   open: { 
//     rotate: 135,
//     scale: 1.1
//   },
// };

// const leftPanelVariants = {
//   closed: {
//     x: -300,
//     opacity: 0,
//     transition: {
//       type: 'spring',
//       stiffness: 300,
//       damping: 30
//     }
//   },
//   open: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: 'spring',
//       stiffness: 300,
//       damping: 30
//     }
//   }
// };

// const rightPanelVariants = {
//   closed: {
//     x: 300,
//     opacity: 0,
//     transition: {
//       type: 'spring',
//       stiffness: 300,
//       damping: 30
//     }
//   },
//   open: {
//     x: 0,
//     opacity: 1,
//     transition: {
//       type: 'spring',
//       stiffness: 300,
//       damping: 30,
//       delay: 0.1
//     }
//   }
// };

// const backdropVariants = {
//   closed: {
//     opacity: 0,
//     backdropFilter: 'blur(0px)',
//     pointerEvents: 'none',
//   },
//   open: {
//     opacity: 1,
//     backdropFilter: 'blur(4px)',
//     pointerEvents: 'all',
//   },
// };

// const menuVariants = {
//   closed: { 
//     opacity: 0,
//     scale: 0.8,
//     transition: {
//       duration: 0.2,
//       staggerChildren: 0.05,
//       staggerDirection: -1,
//     }
//   },
//   open: { 
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.3,
//       staggerChildren: 0.07,
//       delayChildren: 0.05,
//     }
//   },
// };

// const itemVariants = {
//   closed: { 
//     opacity: 0, 
//     y: 20, 
//     scale: 0.6,
//     rotate: -10 
//   },
//   open: { 
//     opacity: 1, 
//     y: 0, 
//     scale: 1,
//     rotate: 0 
//   },
// };

// export default function FloatingActionButton() {
//   const { theme } = useTheme();
//   const [open, setOpen] = useState(false);
//   const [hoveredAction, setHoveredAction] = useState(null);
//   const [showLeftPanel, setShowLeftPanel] = useState(false);
//   const [showRightPanel, setShowRightPanel] = useState(false);
//   const [audioPlaying, setAudioPlaying] = useState(false);
//   const menuRef = useRef(null);

//   // Theme helper functions
//   const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
//   const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';
//   const getRingColor = () => theme?.ringColor || 'ring-orange-500';
//   const getLightBg = () => theme?.lightBg || 'bg-orange-50';
//   const getTextAccent = () => theme?.accent ? `text-${theme.accent}` : 'text-orange-600';

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     document.addEventListener('keydown', (e) => {
//       if (e.key === 'Escape') {
//         setOpen(false);
//       }
//     });
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//       document.removeEventListener('keydown', (e) => {
//         if (e.key === 'Escape') setOpen(false);
//       });
//     };
//   }, []);

//   const openModal = (ModalComponent) => {
//     if (ModalComponent) {
//       // Handle modal opening
//     }
//     setOpen(false);
//   };

//   const toggleAudio = () => {
//     setAudioPlaying(!audioPlaying);
//   };

//   const availableActions = actions.filter(a => a.Modal);
//   const progressPercentage = (availableActions.length / actions.length) * 100;

//   return (
//     <>
//       {/* Backdrop */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             variants={backdropVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed inset-0 z-40 bg-black/30"
//             onClick={() => setOpen(false)}
//           />
//         )}
//       </AnimatePresence>

//       {/* Floating Action Button */}
//       <motion.button
//         layout
//         className={`
//           fixed bottom-8 right-8 z-50 
//           flex h-16 w-16 items-center justify-center 
//           rounded-2xl shadow-2xl 
//           ${getButtonGradient()} ${getButtonHover()}
//           text-white 
//           transition-all duration-300
//           hover:shadow-3xl
//           ring-4 ring-white/20
//         `}
//         whileHover={{ scale: 1.15, rotate: 5 }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => setOpen(!open)}
//         aria-label={open ? "Close menu" : "Open menu"}
//         onMouseEnter={() => {
//           setShowLeftPanel(true);
//           setShowRightPanel(true);
//         }}
//         onMouseLeave={() => {
//           if (!open) {
//             setShowLeftPanel(false);
//             setShowRightPanel(false);
//           }
//         }}
//       >
//         <motion.div
//           variants={fabVariants}
//           animate={open ? 'open' : 'closed'}
//           transition={{ 
//             type: 'spring', 
//             stiffness: 400, 
//             damping: 25,
//             mass: 0.8 
//           }}
//           className="relative"
//         >
//           <Plus className="h-8 w-8" />
//         </motion.div>
        
//         {/* Pulsing effect */}
//         <motion.div
//           className="absolute inset-0 rounded-2xl ring-4 ring-white/10"
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.5, 0.2, 0.5],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//       </motion.button>

//       {/* Left Side Panel - Quick Actions (Hidden by default, shows on hover) */}
//       <AnimatePresence>
//         {(showLeftPanel || open) && (
//           <motion.div
//             variants={leftPanelVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//             className="fixed bottom-24 left-8 z-40 w-80"
//           >
//             <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
//               {/* Audio Section */}
            

//               {/* Quick Actions Section */}
//               <div className="p-5">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="font-bold text-gray-900 flex items-center gap-2">
//                     <Zap className="h-5 w-5 text-amber-500" />
//                     Quick Actions
//                   </h3>
//                   <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
//                     {availableActions.length} actions available
//                   </span>
//                 </div>
//                 <div className="mb-4">
//                   <div className="flex items-center justify-between text-sm mb-1">
//                     <span className="text-gray-600">Progress</span>
//                     <span className="font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
//                   </div>
//                   <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
//                     <motion.div
//                       className={`h-full ${getButtonGradient()}`}
//                       initial={{ width: '0%' }}
//                       animate={{ width: `${progressPercentage}%` }}
//                       transition={{ duration: 1, delay: 0.7 }}
//                     />
//                   </div>
//                 </div>

//                 {/* Action Badges */}
//                 <div className="grid grid-cols-2 gap-3">
//                   {actions.map((action) => (
//                     <div
//                       key={action.label}
//                         onClick={showmodel(action.label)}
//                       className={`p-3 rounded-xl border ${
//                         action.Modal 
//                           ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200' 
//                           : 'bg-gray-50 border-gray-100 opacity-60'
//                       }`}
//                     >
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
//                           <action.Icon className="h-4 w-4 text-white" />
//                         </div>
//                         <span className="text-xs font-medium text-gray-700 truncate">
//                           {action.label.split(' ')[0]}
//                         </span>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <span className="text-xs text-gray-500">{action.badge}</span>
//                         <div className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-gray-700">
//                           {action.Modal ? '✓' : '×'}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Weather Section */}
//               <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-t border-gray-100">
//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-2">
//                     <weatherData.icon className="h-5 w-5 text-blue-600" />
//                     <h3 className="font-bold text-gray-900">{weatherData.condition}</h3>
//                   </div>
//                   <div className="text-xs text-gray-500">{weatherData.time}</div>
//                 </div>
//                 <div className="grid grid-cols-3 gap-3">
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">{weatherData.temperature}</div>
//                     <div className="text-xs text-gray-600">Temp</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">{weatherData.humidity}</div>
//                     <div className="text-xs text-gray-600">Humidity</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-2xl font-bold text-gray-900">{weatherData.audioDuration}</div>
//                     <div className="text-xs text-gray-600">Duration</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Right Side Panel - Action Details (Shows on hover) */}
     
//       {/* Action Menu */}
//       <div ref={menuRef} className="fixed bottom-32 right-8 z-40">
//         <AnimatePresence>
//           {open && (
//             <motion.div
//               variants={menuVariants}
//               initial="closed"
//               animate="open"
//               exit="closed"
//               className="flex flex-col items-center gap-4 p-1"
//             >
//               {actions.map((action, i) => (
//                 <motion.button
//                   key={action.label}
//                   layout
//                   variants={itemVariants}
//                   transition={{
//                     type: 'spring',
//                     stiffness: 380,
//                     damping: 25,
//                     mass: 0.7,
//                   }}
//                   className={`
//                     relative flex h-14 w-14 items-center justify-center 
//                     rounded-2xl shadow-xl transition-all duration-300
//                     ${action.Modal
//                       ? `bg-gradient-to-br ${action.color} text-white hover:scale-110 hover:shadow-2xl active:scale-95`
//                       : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed opacity-60'
//                     }
//                     group
//                   `}
//                   onClick={() => openModal(action.Modal)}
//                   onMouseEnter={() => {
//                     setHoveredAction(action);
//                     setShowRightPanel(true);
//                   }}
//                   onMouseLeave={() => {
//                     if (!open) {
//                       setHoveredAction(null);
//                       setShowRightPanel(false);
//                     }
//                   }}
//                   disabled={!action.Modal}
//                   aria-label={action.label}
//                 >
//                   {/* Glow effect */}
//                   <motion.div
//                     className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
//                     style={{
//                       background: `radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)`,
//                     }}
//                     initial={false}
//                     animate={{ opacity: 0 }}
//                     whileHover={{ opacity: 0.3 }}
//                     transition={{ duration: 0.2 }}
//                   />
                  
//                   <action.Icon className="h-6 w-6" />
                  
//                   {/* Badge */}
//                   <div className="absolute -top-1 -right-1 bg-white border border-gray-200 text-[10px] font-bold px-1 py-0.5 rounded-full shadow-sm">
//                     {action.badge}
//                   </div>
                  
//                   {/* Ripple effect on click */}
//                   <motion.div
//                     className="absolute inset-0 rounded-2xl bg-white/30"
//                     initial={{ scale: 0, opacity: 1 }}
//                     whileTap={{ scale: 2, opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </motion.button>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>

//       {/* Controls Panel */}
//       <motion.div
//         initial={{ opacity: 0, x: -20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: 0.3 }}
//         className="fixed bottom-20 left-35 z-30"
//       >
//         <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-200/50">
//           <button
//             onClick={() => setShowLeftPanel(!showLeftPanel)}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//             title={showLeftPanel ? "Hide left panel" : "Show left panel"}
//           >
//             {showLeftPanel ? <EyeOff className="h-4 w-4 text-gray-600" /> : <Eye className="h-4 w-4 text-gray-600" />}
//           </button>
//           <div className="h-6 w-px bg-gray-300" />
//           <button
//             onClick={() => setShowRightPanel(!showRightPanel)}
//             className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
//             title={showRightPanel ? "Hide right panel" : "Show right panel"}
//           >
//             <ChevronRight className={`h-4 w-4 transition-transform ${showRightPanel ? 'rotate-180' : ''}`} />
//           </button>
//         </div>
//       </motion.div>
//     </>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  UserPlus,
  Calendar,
  Clock,
  DollarSign,
  X,
  Zap,
  CloudRain,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';
import { useTheme } from './ThemeContext';

import AddModal from './modals/AddModal';
import LeaveModal from './modals/LeaveModal';

// Weather data
const weatherData = {
  condition: 'Rain coming',
  temperature: '24°C',
  humidity: '78%',
  time: '04-12-2025',
  icon: CloudRain,
  audioDuration: '0:00'
};

const actions = [
  { 
    Icon: UserPlus, 
    label: 'Add Employee', 
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500',
    description: 'Add new team member',
    badge: 'Add',
    modal: 'addEmployee'
  },
  { 
    Icon: Calendar, 
    label: 'Leave Request', 
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500',
    description: 'Submit leave application',
    badge: 'Add',
    modal: 'leaveRequest'
  },
  { 
    Icon: Clock, 
    label: 'Attendance', 
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500',
    description: 'Mark attendance',
    badge: 'Add',
    modal: null
  },
  { 
    Icon: DollarSign, 
    label: 'Overtime', 
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500',
    description: 'Request overtime',
    badge: 'Add',
    modal: null
  },
];

const fabVariants = {
  closed: { 
    rotate: 0,
    scale: 1
  },
  open: { 
    rotate: 135,
    scale: 1.1
  },
};

const leftPanelVariants = {
  closed: {
    x: -300,
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30
    }
  }
};

const backdropVariants = {
  closed: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    pointerEvents: 'none',
  },
  open: {
    opacity: 1,
    backdropFilter: 'blur(4px)',
    pointerEvents: 'all',
  },
};

const menuVariants = {
  closed: { 
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2,
      staggerChildren: 0.05,
      staggerDirection: -1,
    }
  },
  open: { 
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    }
  },
};

const itemVariants = {
  closed: { 
    opacity: 0, 
    y: 20, 
    scale: 0.6,
    rotate: -10 
  },
  open: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    rotate: 0 
  },
};

export default function FloatingActionButton() {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showLeftPanel, setShowLeftPanel] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const menuRef = useRef(null);

  // Theme helper functions
  const getButtonGradient = () => theme?.button ? `bg-gradient-to-r ${theme.button}` : 'bg-gradient-to-r from-orange-500 to-orange-600';
  const getButtonHover = () => theme?.buttonHover || 'hover:from-orange-600 hover:to-orange-700';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        if (activeModal) {
          setActiveModal(null);
        }
      }
    });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setOpen(false);
          if (activeModal) setActiveModal(null);
        }
      });
    };
  }, [activeModal]);

  const handleActionClick = (action) => {
    if (action.modal) {
      setActiveModal(action.modal);
      setOpen(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const availableActions = actions.filter(a => a.modal);
  const progressPercentage = (availableActions.length / actions.length) * 100;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={backdropVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-black/30"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        layout
        className={`
          fixed bottom-8 right-8 z-50 
          flex h-16 w-16 items-center justify-center 
          rounded-2xl shadow-2xl 
          ${getButtonGradient()} ${getButtonHover()}
          text-white 
          transition-all duration-300
          hover:shadow-3xl
          ring-4 ring-white/20
        `}
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        onMouseEnter={() => {
          setShowLeftPanel(true);
        }}
        onMouseLeave={() => {
          if (!open) {
            setShowLeftPanel(false);
          }
        }}
      >
        <motion.div
          variants={fabVariants}
          animate={open ? 'open' : 'closed'}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 25,
            mass: 0.8 
          }}
          className="relative"
        >
          <Plus className="h-8 w-8" />
        </motion.div>
        
        {/* Pulsing effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl ring-4 ring-white/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>

      {/* Left Side Panel - Quick Actions */}
      <AnimatePresence>
        {(showLeftPanel || open) && (
          <motion.div
            variants={leftPanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed bottom-24 left-8 z-40 w-80"
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
              {/* Quick Actions Section */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Quick Actions
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {availableActions.length} actions available
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium text-gray-900">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${getButtonGradient()}`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 1, delay: 0.7 }}
                    />
                  </div>
                </div>

                {/* Action Badges */}
                {/* <div className="grid grid-cols-2 gap-3">
                  {actions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleActionClick(action)}
                      className={`p-3 rounded-xl border transition-all duration-200 ${
                        action.modal 
                          ? 'bg-gradient-to-br from-white to-gray-50 border-gray-200 hover:shadow-md hover:scale-[1.02] cursor-pointer' 
                          : 'bg-gray-50 border-gray-100 opacity-60 cursor-not-allowed'
                      }`}
                      disabled={!action.modal}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${action.color}`}>
                          <action.Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-xs font-medium text-gray-700 truncate">
                          {action.label.split(' ')[0]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{action.badge}</span>
                        <div className={`text-xs px-1.5 py-0.5 rounded ${
                          action.modal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {action.modal ? '✓' : '×'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div> */}
              </div>

              {/* Weather Section */}
              <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 border-t border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <weatherData.icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-gray-900">{weatherData.condition}</h3>
                  </div>
                  <div className="text-xs text-gray-500">{weatherData.time}</div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{weatherData.temperature}</div>
                    <div className="text-xs text-gray-600">Temp</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{weatherData.humidity}</div>
                    <div className="text-xs text-gray-600">Humidity</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{weatherData.audioDuration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Menu */}
      <div ref={menuRef} className="fixed bottom-32 right-8 z-40">
        <AnimatePresence>
          {open && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="flex flex-col items-center gap-4 p-1"
            >
              {actions.map((action) => (
                <motion.button
                  key={action.label}
                  layout
                  variants={itemVariants}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 25,
                    mass: 0.7,
                  }}
                  className={`
                    relative flex h-14 w-14 items-center justify-center 
                    rounded-2xl shadow-xl transition-all duration-300
                    ${action.modal
                      ? `bg-gradient-to-br ${action.color} text-white hover:scale-110 hover:shadow-2xl active:scale-95 cursor-pointer`
                      : 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed opacity-60'
                    }
                    group
                  `}
                  onClick={() => handleActionClick(action)}
                  onMouseEnter={() => setHoveredAction(action)}
                  onMouseLeave={() => setHoveredAction(null)}
                  disabled={!action.modal}
                  aria-label={action.label}
                >
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%)`,
                    }}
                    initial={false}
                    animate={{ opacity: 0 }}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                  
                  <action.Icon className="h-6 w-6" />
                  
                  {/* Badge */}
                  <div className="absolute -top-1 -right-1 bg-white border border-gray-200 text-[10px] font-bold px-1 py-0.5 rounded-full shadow-sm">
                    {action.badge}
                  </div>
                  
                  {/* Ripple effect on click */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-white/30"
                    initial={{ scale: 0, opacity: 1 }}
                    whileTap={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls Panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-20 left-8 z-30"
      >
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-2 border border-gray-200/50">
          <button
            onClick={() => setShowLeftPanel(!showLeftPanel)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            title={showLeftPanel ? "Hide left panel" : "Show left panel"}
          >
            {showLeftPanel ? <EyeOff className="h-4 w-4 text-gray-600" /> : <Eye className="h-4 w-4 text-gray-600" />}
          </button>
        </div>
      </motion.div>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'addEmployee' && (
          <AddModal onClose={closeModal} />
        )}
        {activeModal === 'leaveRequest' && (
          <LeaveModal onClose={closeModal} />
        )}
      </AnimatePresence>
    </>
  );
}