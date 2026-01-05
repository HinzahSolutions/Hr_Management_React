// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';

// // All 14 Themes (10 Gradient + 4 Classic)
// // src/context/THEMES.js
// export const THEMES = {
//   // ==================== GRADIENT THEMES ====================
//   red: {
//     id: 'red',
//     name: 'Red Rose',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-red-700 to-red-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-red-600/80',
//     sidebarActive: 'bg-red-900/70 backdrop-blur',
//     sidebarBorder: 'border-red-900',
//     button: 'from-red-600 to-rose-600',
//     buttonHover: 'hover:from-red-700 hover:to-rose-700',
//     accent: 'red-600',
//     accentHover: 'red-400',
//     gradient: 'from-red-500 to-rose-600',

//     borderColor: 'border-red-600',
//     borderHover: 'hover:border-red-500',
//     hoverBg: 'hover:bg-red-500/10',
//     buttonActive: 'active:bg-red-700',
//     ringColor: 'ring-red-500',
//     textHover: 'hover:text-red-500',
//     lightBg: 'bg-red-50',
//     darkBg: 'bg-red-900',
//   },

//   orange: {
//     id: 'orange',
//     name: 'Orange Fire',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-orange-600 to-orange-700',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-orange-500/80',
//     sidebarActive: 'bg-orange-800/70 backdrop-blur',
//     sidebarBorder: 'border-orange-800',
//     button: 'from-orange-500 to-yellow-600',
//     buttonHover: 'hover:from-orange-600 hover:to-yellow-700',
//     accent: 'orange-600',
//     accentHover: 'orange-400',
//     gradient: 'from-orange-500 to-yellow-600',

//     borderColor: 'border-orange-600',
//     borderHover: 'hover:border-orange-500',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-700',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-500',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   purple: {
//     id: 'purple',
//     name: 'Purple Pro',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-purple-700 to-purple-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-purple-600/80',
//     sidebarActive: 'bg-purple-900/70 backdrop-blur',
//     sidebarBorder: 'border-purple-900',
//     button: 'from-purple-600 to-pink-600',
//     buttonHover: 'hover:from-purple-700 hover:to-pink-700',
//     accent: 'purple-600',
//     accentHover: 'purple-400',
//     gradient: 'from-purple-600 to-pink-600',

//     borderColor: 'border-purple-600',
//     borderHover: 'hover:border-purple-500',
//     hoverBg: 'hover:bg-purple-500/10',
//     buttonActive: 'active:bg-purple-700',
//     ringColor: 'ring-purple-500',
//     textHover: 'hover:text-purple-500',
//     lightBg: 'bg-purple-50',
//     darkBg: 'bg-purple-900',
//   },

//   blue: {
//     id: 'blue',
//     name: 'Blue Ocean',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-blue-700 to-blue-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-blue-600/80',
//     sidebarActive: 'bg-blue-900/70 backdrop-blur',
//     sidebarBorder: 'border-blue-900',
//     button: 'from-blue-600 to-cyan-600',
//     buttonHover: 'hover:from-blue-700 hover:to-cyan-700',
//     accent: 'blue-600',
//     accentHover: 'blue-400',
//     gradient: 'from-blue-500 to-cyan-600',

//     borderColor: 'border-blue-600',
//     borderHover: 'hover:border-blue-500',
//     hoverBg: 'hover:bg-blue-500/10',
//     buttonActive: 'active:bg-blue-700',
//     ringColor: 'ring-blue-500',
//     textHover: 'hover:text-blue-500',
//     lightBg: 'bg-blue-50',
//     darkBg: 'bg-blue-900',
//   },

//   green: {
//     id: 'green',
//     name: 'Green Forest',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-green-700 to-emerald-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-green-600/80',
//     sidebarActive: 'bg-emerald-900/70 backdrop-blur',
//     sidebarBorder: 'border-emerald-900',
//     button: 'from-green-600 to-emerald-600',
//     buttonHover: 'hover:from-green-700 hover:to-emerald-700',
//     accent: 'green-600',
//     accentHover: 'green-400',
//     gradient: 'from-green-500 to-emerald-600',

//     borderColor: 'border-green-600',
//     borderHover: 'hover:border-green-500',
//     hoverBg: 'hover:bg-green-500/10',
//     buttonActive: 'active:bg-green-700',
//     ringColor: 'ring-green-500',
//     textHover: 'hover:text-green-500',
//     lightBg: 'bg-green-50',
//     darkBg: 'bg-emerald-900',
//   },

//   // ==================== CLASSIC THEMES ====================
//   dark: {
//     id: 'dark',
//     name: 'Dark Gray',
//     type: 'solid',
//     sidebarBg: 'bg-gray-900',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-gray-800',
//     sidebarActive: 'bg-gray-700',
//     sidebarBorder: 'border-gray-800',
//     button: 'from-gray-700 to-gray-800',
//     buttonHover: 'hover:from-gray-800 hover:to-gray-900',
//     accent: 'orange-500',
//     accentHover: 'orange-400',
//     gradient: 'from-gray-700 to-gray-900',

//     borderColor: 'border-orange-500',
//     borderHover: 'hover:border-orange-400',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-600',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-400',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   light: {
//     id: 'light',
//     name: 'Clean White',
//     type: 'solid',
//     sidebarBg: 'bg-white',
//     sidebarText: 'text-gray-800',
//     sidebarHover: 'hover:bg-gray-100',
//     sidebarActive: 'bg-orange-100 text-orange-700',
//     sidebarBorder: 'border-gray-200',
//     button: 'from-orange-500 to-orange-600',
//     buttonHover: 'hover:from-orange-600 hover:to-orange-700',
//     accent: 'orange-600',
//     accentHover: 'orange-700',
//     gradient: 'from-orange-100 to-orange-200',

//     borderColor: 'border-orange-600',
//     borderHover: 'hover:border-orange-500',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-700',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-500',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   orangeClassic: {
//     id: 'orangeClassic',
//     name: 'Orange Energy',
//     type: 'solid',
//     sidebarBg: 'bg-orange-600',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-orange-500',
//     sidebarActive: 'bg-orange-700',
//     sidebarBorder: 'border-orange-700',
//     button: 'from-orange-600 to-orange-700',
//     buttonHover: 'hover:from-orange-700 hover:to-orange-800',
//     accent: 'orange-600',
//     accentHover: 'orange-400',
//     gradient: 'from-orange-500 to-orange-700',

//     borderColor: 'border-orange-600',
//     borderHover: 'hover:border-orange-500',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-700',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-500',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   purpleClassic: {
//     id: 'purpleClassic',
//     name: 'Purple Pro Classic',
//     type: 'solid',
//     sidebarBg: 'bg-purple-700',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-purple-600',
//     sidebarActive: 'bg-purple-800',
//     sidebarBorder: 'border-purple-800',
//     button: 'from-purple-600 to-purple-700',
//     buttonHover: 'hover:from-purple-700 hover:to-purple-800',
//     accent: 'purple-600',
//     accentHover: 'purple-400',
//     gradient: 'from-purple-600 to-purple-800',

//     borderColor: 'border-purple-600',
//     borderHover: 'hover:border-purple-500',
//     hoverBg: 'hover:bg-purple-500/10',
//     buttonActive: 'active:bg-purple-700',
//     ringColor: 'ring-purple-500',
//     textHover: 'hover:text-purple-500',
//     lightBg: 'bg-purple-50',
//     darkBg: 'bg-purple-900',
//   },

//   // ==================== LIGHT THEMES ====================
//   lightBlue: { id: 'lightBlue', name: 'Sky Light', type: 'light', sidebarBg: 'bg-blue-50', sidebarText: 'text-blue-900', sidebarHover: 'hover:bg-blue-100', sidebarActive: 'bg-blue-200', sidebarBorder: 'border-blue-200', button: 'from-blue-500 to-blue-600', buttonHover: 'hover:from-blue-600 hover:to-blue-700', accent: 'blue-600', gradient: 'from-blue-100 to-blue-200', borderColor: 'border-blue-600', borderHover: 'hover:border-blue-500', hoverBg: 'hover:bg-blue-500/10', buttonActive: 'active:bg-blue-700', ringColor: 'ring-blue-500', textHover: 'hover:text-blue-500', lightBg: 'bg-blue-50', darkBg: 'bg-blue-900' },
//   lightGreen: { id: 'lightGreen', name: 'Mint Fresh', type: 'light', sidebarBg: 'bg-emerald-50', sidebarText: 'text-emerald-900', sidebarHover: 'hover:bg-emerald-100', sidebarActive: 'bg-emerald-200', sidebarBorder: 'border-emerald-200', button: 'from-emerald-500 to-emerald-600', buttonHover: 'hover:from-emerald-600 hover:to-emerald-700', accent: 'emerald-600', gradient: 'from-emerald-100 to-emerald-200', borderColor: 'border-emerald-600', borderHover: 'hover:border-emerald-500', hoverBg: 'hover:bg-emerald-500/10', buttonActive: 'active:bg-emerald-700', ringColor: 'ring-emerald-500', textHover: 'hover:text-emerald-500', lightBg: 'bg-emerald-50', darkBg: 'bg-emerald-900' },
//   lightPurple: { id: 'lightPurple', name: 'Lavender', type: 'light', sidebarBg: 'bg-purple-50', sidebarText: 'text-purple-900', sidebarHover: 'hover:bg-purple-100', sidebarActive: 'bg-purple-200', sidebarBorder: 'border-purple-200', button: 'from-purple-500 to-purple-600', buttonHover: 'hover:from-purple-600 hover:to-purple-700', accent: 'purple-600', gradient: 'from-purple-100 to-purple-200', borderColor: 'border-purple-600', borderHover: 'hover:border-purple-500', hoverBg: 'hover:bg-purple-500/10', buttonActive: 'active:bg-purple-700', ringColor: 'ring-purple-500', textHover: 'hover:text-purple-500', lightBg: 'bg-purple-50', darkBg: 'bg-purple-900' },
//   lightPink: { id: 'lightPink', name: 'Blush Pink', type: 'light', sidebarBg: 'bg-pink-50', sidebarText: 'text-pink-900', sidebarHover: 'hover:bg-pink-100', sidebarActive: 'bg-pink-200', sidebarBorder: 'border-pink-200', button: 'from-pink-500 to-pink-600', buttonHover: 'hover:from-pink-600 hover:to-pink-700', accent: 'pink-600', gradient: 'from-pink-100 to-pink-200', borderColor: 'border-pink-600', borderHover: 'hover:border-pink-500', hoverBg: 'hover:bg-pink-500/10', buttonActive: 'active:bg-pink-700', ringColor: 'ring-pink-500', textHover: 'hover:text-pink-500', lightBg: 'bg-pink-50', darkBg: 'bg-pink-900' },
//   lightOrange: { id: 'lightOrange', name: 'Peach Cream', type: 'light', sidebarBg: 'bg-orange-50', sidebarText: 'text-orange-900', sidebarHover: 'hover:bg-orange-100', sidebarActive: 'bg-orange-200', sidebarBorder: 'border-orange-200', button: 'from-orange-500 to-orange-600', buttonHover: 'hover:from-orange-600 hover:to-orange-700', accent: 'orange-600', gradient: 'from-orange-100 to-orange-200', borderColor: 'border-orange-600', borderHover: 'hover:border-orange-500', hoverBg: 'hover:bg-orange-500/10', buttonActive: 'active:bg-orange-700', ringColor: 'ring-orange-500', textHover: 'hover:text-orange-500', lightBg: 'bg-orange-50', darkBg: 'bg-orange-900' },
//   lightGray: { id: 'lightGray', name: 'Clean Professional', type: 'light', sidebarBg: 'bg-gray-50', sidebarText: 'text-gray-800', sidebarHover: 'hover:bg-gray-100', sidebarActive: 'bg-gray-200', sidebarBorder: 'border-gray-300', button: 'from-indigo-500 to-indigo-600', buttonHover: 'hover:from-indigo-600 hover:to-indigo-700', accent: 'indigo-600', gradient: 'from-gray-50 to-gray-100', borderColor: 'border-indigo-600', borderHover: 'hover:border-indigo-500', hoverBg: 'hover:bg-indigo-500/10', buttonActive: 'active:bg-indigo-700', ringColor: 'ring-indigo-500', textHover: 'hover:text-indigo-500', lightBg: 'bg-indigo-50', darkBg: 'bg-indigo-900' },
//   lightTeal: { id: 'lightTeal', name: 'Aqua Breeze', type: 'light', sidebarBg: 'bg-teal-50', sidebarText: 'text-teal-900', sidebarHover: 'hover:bg-teal-100', sidebarActive: 'bg-teal-200', sidebarBorder: 'border-teal-200', button: 'from-teal-500 to-teal-600', buttonHover: 'hover:from-teal-600 hover:to-teal-700', accent: 'teal-600', borderColor: 'border-teal-600', borderHover: 'hover:border-teal-500', hoverBg: 'hover:bg-teal-500/10', buttonActive: 'active:bg-teal-700', ringColor: 'ring-teal-500', textHover: 'hover:text-teal-500', lightBg: 'bg-teal-50', darkBg: 'bg-teal-900' },
//   lightAmber: { id: 'lightAmber', name: 'Golden Light', type: 'light', sidebarBg: 'bg-amber-50', sidebarText: 'text-amber-900', sidebarHover: 'hover:bg-amber-100', sidebarActive: 'bg-amber-200', sidebarBorder: 'border-amber-200', button: 'from-amber-500 to-amber-600', buttonHover: 'hover:from-amber-600 hover:to-amber-700', accent: 'amber-600', borderColor: 'border-amber-600', borderHover: 'hover:border-amber-500', hoverBg: 'hover:bg-amber-500/10', buttonActive: 'active:bg-amber-700', ringColor: 'ring-amber-500', textHover: 'hover:text-amber-500', lightBg: 'bg-amber-50', darkBg: 'bg-amber-900' },
//   lightRose: { id: 'lightRose', name: 'Rose Dawn', type: 'light', sidebarBg: 'bg-rose-50', sidebarText: 'text-rose-900', sidebarHover: 'hover:bg-rose-100', sidebarActive: 'bg-rose-200', sidebarBorder: 'border-rose-200', button: 'from-rose-500 to-rose-600', buttonHover: 'hover:from-rose-600 hover:to-rose-700', accent: 'rose-600', borderColor: 'border-rose-600', borderHover: 'hover:border-rose-500', hoverBg: 'hover:bg-rose-500/10', buttonActive: 'active:bg-rose-700', ringColor: 'ring-rose-500', textHover: 'hover:text-rose-500', lightBg: 'bg-rose-50', darkBg: 'bg-rose-900' },
//   lightCyan: { id: 'lightCyan', name: 'Crystal Clear', type: 'light', sidebarBg: 'bg-cyan-50', sidebarText: 'text-cyan-900', sidebarHover: 'hover:bg-cyan-100', sidebarActive: 'bg-cyan-200', sidebarBorder: 'border-cyan-200', button: 'from-cyan-500 to-cyan-600', buttonHover: 'hover:from-cyan-600 hover:to-cyan-700', accent: 'cyan-600', borderColor: 'border-cyan-600', borderHover: 'hover:border-cyan-500', hoverBg: 'hover:bg-cyan-500/10', buttonActive: 'active:bg-cyan-700', ringColor: 'ring-cyan-500', textHover: 'hover:text-cyan-500', lightBg: 'bg-cyan-50', darkBg: 'bg-cyan-900' },

//   // ==================== PREMIUM DARK THEMES ====================
//   darkNavy: { id: 'darkNavy', name: 'Midnight Navy', type: 'dark', sidebarBg: 'bg-slate-900', sidebarText: 'text-cyan-300', sidebarHover: 'hover:bg-slate-800', sidebarActive: 'bg-cyan-900/50', sidebarBorder: 'border-cyan-800', button: 'from-cyan-600 to-cyan-500', buttonHover: 'hover:from-cyan-700 hover:to-cyan-600', accent: 'cyan-400', borderColor: 'border-cyan-500', borderHover: 'hover:border-cyan-400', hoverBg: 'hover:bg-cyan-500/20', buttonActive: 'active:bg-cyan-600', ringColor: 'ring-cyan-500', textHover: 'hover:text-cyan-300', lightBg: 'bg-cyan-900/20', darkBg: 'bg-cyan-950' },
//   darkEmerald: { id: 'darkEmerald', name: 'Emerald Void', type: 'dark', sidebarBg: 'bg-emerald-950', sidebarText: 'text-emerald-300', sidebarHover: 'hover:bg-emerald-900', sidebarActive: 'bg-emerald-800', sidebarBorder: 'border-emerald-800', button: 'from-emerald-600 to-emerald-500', buttonHover: 'hover:from-emerald-700 hover:to-emerald-600', accent: 'emerald-400', borderColor: 'border-emerald-500', borderHover: 'hover:border-emerald-400', hoverBg: 'hover:bg-emerald-500/20', buttonActive: 'active:bg-emerald-600', ringColor: 'ring-emerald-500', textHover: 'hover:text-emerald-300', lightBg: 'bg-emerald-900/20', darkBg: 'bg-emerald-950' },
//   darkPurple: { id: 'darkPurple', name: 'Amethyst Night', type: 'dark', sidebarBg: 'bg-purple-950', sidebarText: 'text-purple-300', sidebarHover: 'hover:bg-purple-900', sidebarActive: 'bg-purple-800', sidebarBorder: 'border-purple-800', button: 'from-purple-600 to-purple-500', buttonHover: 'hover:from-purple-700 hover:to-purple-600', accent: 'purple-400', borderColor: 'border-purple-500', borderHover: 'hover:border-purple-400', hoverBg: 'hover:bg-purple-500/20', buttonActive: 'active:bg-purple-600', ringColor: 'ring-purple-500', textHover: 'hover:text-purple-300', lightBg: 'bg-purple-900/20', darkBg: 'bg-purple-950' },
//   darkRed: { id: 'darkRed', name: 'Crimson Dark', type: 'dark', sidebarBg: 'bg-red-950', sidebarText: 'text-red-300', sidebarHover: 'hover:bg-red-900', sidebarActive: 'bg-red-800', sidebarBorder: 'border-red-800', button: 'from-red-600 to-red-500', buttonHover: 'hover:from-red-700 hover:to-red-600', accent: 'red-400', borderColor: 'border-red-500', borderHover: 'hover:border-red-400', hoverBg: 'hover:bg-red-500/20', buttonActive: 'active:bg-red-600', ringColor: 'ring-red-500', textHover: 'hover:text-red-300', lightBg: 'bg-red-900/20', darkBg: 'bg-red-950' },
//   darkObsidian: { id: 'darkObsidian', name: 'Pure Obsidian', type: 'dark', sidebarBg: 'bg-neutral-950', sidebarText: 'text-gray-200', sidebarHover: 'hover:bg-neutral-900', sidebarActive: 'bg-neutral-800', sidebarBorder: 'border-neutral-800', button: 'from-violet-600 to-purple-600', buttonHover: 'hover:from-violet-700 hover:to-purple-700', accent: 'violet-400', borderColor: 'border-violet-500', borderHover: 'hover:border-violet-400', hoverBg: 'hover:bg-violet-500/20', buttonActive: 'active:bg-violet-600', ringColor: 'ring-violet-500', textHover: 'hover:text-violet-300', lightBg: 'bg-violet-900/20', darkBg: 'bg-violet-950' },
//   darkGold: { id: 'darkGold', name: 'Luxury Gold', type: 'dark', sidebarBg: 'bg-amber-950', sidebarText: 'text-amber-200', sidebarHover: 'hover:bg-amber-900', sidebarActive: 'bg-amber-800', sidebarBorder: 'border-amber-800', button: 'from-amber-600 to-yellow-500', buttonHover: 'hover:from-amber-700 hover:to-yellow-600', accent: 'amber-400', borderColor: 'border-amber-500', borderHover: 'hover:border-amber-400', hoverBg: 'hover:bg-amber-500/20', buttonActive: 'active:bg-amber-600', ringColor: 'ring-amber-500', textHover: 'hover:text-amber-300', lightBg: 'bg-amber-900/20', darkBg: 'bg-amber-950' },
//   darkTeal: { id: 'darkTeal', name: 'Deep Ocean', type: 'dark', sidebarBg: 'bg-teal-950', sidebarText: 'text-teal-300', sidebarHover: 'hover:bg-teal-900', sidebarActive: 'bg-teal-800', sidebarBorder: 'border-teal-800', button: 'from-teal-600 to-cyan-500', buttonHover: 'hover:from-teal-700 hover:to-cyan-600', accent: 'cyan-400', borderColor: 'border-teal-500', borderHover: 'hover:border-teal-400', hoverBg: 'hover:bg-teal-500/20', buttonActive: 'active:bg-teal-600', ringColor: 'ring-teal-500', textHover: 'hover:text-teal-300', lightBg: 'bg-teal-900/20', darkBg: 'bg-teal-950' },
// };

// export const DEFAULT_THEME = THEMES.orange;// or THEMES.dark

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

//   // Load theme from logged-in company
// useEffect(() => {
//   const user = localStorage.getItem('currentUser');
//   if (user) {
//     try {
//       const parsed = JSON.parse(user);

//       // FIX: Now supports both old (with .id) and new (with .name) format
//       if (parsed.theme) {
//         let matchedTheme;

//         // Case 1: Theme saved with .id (new format)
//         if (parsed.theme.id && THEMES[parsed.theme.id]) {
//           matchedTheme = THEMES[parsed.theme.id];
//         }
//         // Case 2: Theme saved with .name only (your current format)
//         else if (parsed.theme.name) {
//           matchedTheme = Object.values(THEMES).find(t => t.name === parsed.theme.name);
//         }

//         if (matchedTheme) {
//           setCurrentTheme(matchedTheme);
//         }
//       }
//     } catch (e) {
//       console.error('Theme load error:', e);
//     }
//   }
// }, []);

//   const changeTheme = (themeId) => {
//     if (THEMES[themeId]) {
//       setCurrentTheme(THEMES[themeId]);

//       // Save to current user
//       const user = localStorage.getItem('currentUser');
//       if (user) {
//         try {
//           const parsed = JSON.parse(user);
//           parsed.theme = THEMES[themeId];
//           localStorage.setItem('currentUser', JSON.stringify(parsed));
//         } catch (e) {
//           console.error('Theme save error:', e);
//         }
//       }
//     }
//   };

//   const themeList = Object.values(THEMES);

//   return (
//     <ThemeContext.Provider value={{ theme: currentTheme, changeTheme, themes: themeList }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeContext);


// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';

// // All 14 Themes (10 Gradient + 4 Classic)
// export const THEMES = {
//   // ==================== GRADIENT THEMES ====================
//   red: {
//     id: 'red',
//     name: 'Red Rose',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-red-700 to-red-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-red-600/80',
//     sidebarActive: 'bg-red-900/70 backdrop-blur',
//     sidebarBorder: 'border-red-900',
//     button: 'from-red-600 to-rose-600',
//     buttonHover: 'hover:from-red-700 hover:to-rose-700',
//     accent: 'red-600',
//     accentHover: 'red-400',
//     gradient: 'from-red-500 to-rose-600',

//     borderColor: 'border-red-600',
//     borderHover: 'hover:border-red-500',
//     hoverBg: 'hover:bg-red-500/10',
//     buttonActive: 'active:bg-red-700',
//     ringColor: 'ring-red-500',
//     textHover: 'hover:text-red-500',
//     lightBg: 'bg-red-50',
//     darkBg: 'bg-red-900',
//   },

//   orange: {
//     id: 'orange',
//     name: 'Orange Fire',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-orange-600 to-orange-700',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-orange-500/80',
//     sidebarActive: 'bg-orange-800/70 backdrop-blur',
//     sidebarBorder: 'border-orange-800',
//     button: 'from-orange-500 to-yellow-600',
//     buttonHover: 'hover:from-orange-600 hover:to-yellow-700',
//     accent: 'orange-600',
//     accentHover: 'orange-400',
//     gradient: 'from-orange-500 to-yellow-600',

//     borderColor: 'border-orange-600',
//     borderHover: 'hover:border-orange-500',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-700',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-500',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   purple: {
//     id: 'purple',
//     name: 'Purple Pro',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-purple-700 to-purple-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-purple-600/80',
//     sidebarActive: 'bg-purple-900/70 backdrop-blur',
//     sidebarBorder: 'border-purple-900',
//     button: 'from-purple-600 to-pink-600',
//     buttonHover: 'hover:from-purple-700 hover:to-pink-700',
//     accent: 'purple-600',
//     accentHover: 'purple-400',
//     gradient: 'from-purple-600 to-pink-600',

//     borderColor: 'border-purple-600',
//     borderHover: 'hover:border-purple-500',
//     hoverBg: 'hover:bg-purple-500/10',
//     buttonActive: 'active:bg-purple-700',
//     ringColor: 'ring-purple-500',
//     textHover: 'hover:text-purple-500',
//     lightBg: 'bg-purple-50',
//     darkBg: 'bg-purple-900',
//   },

//   blue: {
//     id: 'blue',
//     name: 'Blue Ocean',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-blue-700 to-blue-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-blue-600/80',
//     sidebarActive: 'bg-blue-900/70 backdrop-blur',
//     sidebarBorder: 'border-blue-900',
//     button: 'from-blue-600 to-cyan-600',
//     buttonHover: 'hover:from-blue-700 hover:to-cyan-700',
//     accent: 'blue-600',
//     accentHover: 'blue-400',
//     gradient: 'from-blue-500 to-cyan-600',

//     borderColor: 'border-blue-600',
//     borderHover: 'hover:border-blue-500',
//     hoverBg: 'hover:bg-blue-500/10',
//     buttonActive: 'active:bg-blue-700',
//     ringColor: 'ring-blue-500',
//     textHover: 'hover:text-blue-500',
//     lightBg: 'bg-blue-50',
//     darkBg: 'bg-blue-900',
//   },

//   green: {
//     id: 'green',
//     name: 'Green Forest',
//     type: 'gradient',
//     sidebarBg: 'bg-gradient-to-b from-green-700 to-emerald-800',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-green-600/80',
//     sidebarActive: 'bg-emerald-900/70 backdrop-blur',
//     sidebarBorder: 'border-emerald-900',
//     button: 'from-green-600 to-emerald-600',
//     buttonHover: 'hover:from-green-700 hover:to-emerald-700',
//     accent: 'green-600',
//     accentHover: 'green-400',
//     gradient: 'from-green-500 to-emerald-600',

//     borderColor: 'border-green-600',
//     borderHover: 'hover:border-green-500',
//     hoverBg: 'hover:bg-green-500/10',
//     buttonActive: 'active:bg-green-700',
//     ringColor: 'ring-green-500',
//     textHover: 'hover:text-green-500',
//     lightBg: 'bg-green-50',
//     darkBg: 'bg-emerald-900',
//   },

//   // ==================== CLASSIC THEMES ====================
//   dark: {
//     id: 'dark',
//     name: 'Dark Gray',
//     type: 'solid',
//     sidebarBg: 'bg-gray-900',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-gray-800',
//     sidebarActive: 'bg-gray-700',
//     sidebarBorder: 'border-gray-800',
//     button: 'from-gray-700 to-gray-800',
//     buttonHover: 'hover:from-gray-800 hover:to-gray-900',
//     accent: 'orange-500',
//     accentHover: 'orange-400',
//     gradient: 'from-gray-700 to-gray-900',

//     borderColor: 'border-orange-500',
//     borderHover: 'hover:border-orange-400',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-600',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-400',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   light: {
//     id: 'light',
//     name: 'Clean White',
//     type: 'solid',
//     sidebarBg: 'bg-white',
//     sidebarText: 'text-gray-800',
//     sidebarHover: 'hover:bg-gray-100',
//     sidebarActive: 'bg-orange-100 text-orange-700',
//     sidebarBorder: 'border-gray-200',
//     button: 'from-orange-500 to-orange-600',
//     buttonHover: 'hover:from-orange-600 hover:to-orange-700',
//     accent: 'orange-600',
//     accentHover: 'orange-700',
//     gradient: 'from-orange-100 to-orange-200',

//     borderColor: 'border-orange-600',
//     borderHover: 'hover:border-orange-500',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-700',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-500',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   orangeClassic: {
//     id: 'orangeClassic',
//     name: 'Orange Energy',
//     type: 'solid',
//     sidebarBg: 'bg-orange-600',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-orange-500',
//     sidebarActive: 'bg-orange-700',
//     sidebarBorder: 'border-orange-700',
//     button: 'from-orange-600 to-orange-700',
//     buttonHover: 'hover:from-orange-700 hover:to-orange-800',
//     accent: 'orange-600',
//     accentHover: 'orange-400',
//     gradient: 'from-orange-500 to-orange-700',

//     borderColor: 'border-orange-600',
//     borderHover: 'hover:border-orange-500',
//     hoverBg: 'hover:bg-orange-500/10',
//     buttonActive: 'active:bg-orange-700',
//     ringColor: 'ring-orange-500',
//     textHover: 'hover:text-orange-500',
//     lightBg: 'bg-orange-50',
//     darkBg: 'bg-orange-900',
//   },

//   purpleClassic: {
//     id: 'purpleClassic',
//     name: 'Purple Pro Classic',
//     type: 'solid',
//     sidebarBg: 'bg-purple-700',
//     sidebarText: 'text-white',
//     sidebarHover: 'hover:bg-purple-600',
//     sidebarActive: 'bg-purple-800',
//     sidebarBorder: 'border-purple-800',
//     button: 'from-purple-600 to-purple-700',
//     buttonHover: 'hover:from-purple-700 hover:to-purple-800',
//     accent: 'purple-600',
//     accentHover: 'purple-400',
//     gradient: 'from-purple-600 to-purple-800',

//     borderColor: 'border-purple-600',
//     borderHover: 'hover:border-purple-500',
//     hoverBg: 'hover:bg-purple-500/10',
//     buttonActive: 'active:bg-purple-700',
//     ringColor: 'ring-purple-500',
//     textHover: 'hover:text-purple-500',
//     lightBg: 'bg-purple-50',
//     darkBg: 'bg-purple-900',
//   },

//   // ==================== LIGHT THEMES ====================
//   lightBlue: { id: 'lightBlue', name: 'Sky Light', type: 'light', sidebarBg: 'bg-blue-50', sidebarText: 'text-blue-900', sidebarHover: 'hover:bg-blue-100', sidebarActive: 'bg-blue-200', sidebarBorder: 'border-blue-200', button: 'from-blue-500 to-blue-600', buttonHover: 'hover:from-blue-600 hover:to-blue-700', accent: 'blue-600', gradient: 'from-blue-100 to-blue-200', borderColor: 'border-blue-600', borderHover: 'hover:border-blue-500', hoverBg: 'hover:bg-blue-500/10', buttonActive: 'active:bg-blue-700', ringColor: 'ring-blue-500', textHover: 'hover:text-blue-500', lightBg: 'bg-blue-50', darkBg: 'bg-blue-900' },
//   lightGreen: { id: 'lightGreen', name: 'Mint Fresh', type: 'light', sidebarBg: 'bg-emerald-50', sidebarText: 'text-emerald-900', sidebarHover: 'hover:bg-emerald-100', sidebarActive: 'bg-emerald-200', sidebarBorder: 'border-emerald-200', button: 'from-emerald-500 to-emerald-600', buttonHover: 'hover:from-emerald-600 hover:to-emerald-700', accent: 'emerald-600', gradient: 'from-emerald-100 to-emerald-200', borderColor: 'border-emerald-600', borderHover: 'hover:border-emerald-500', hoverBg: 'hover:bg-emerald-500/10', buttonActive: 'active:bg-emerald-700', ringColor: 'ring-emerald-500', textHover: 'hover:text-emerald-500', lightBg: 'bg-emerald-50', darkBg: 'bg-emerald-900' },
//   lightPurple: { id: 'lightPurple', name: 'Lavender', type: 'light', sidebarBg: 'bg-purple-50', sidebarText: 'text-purple-900', sidebarHover: 'hover:bg-purple-100', sidebarActive: 'bg-purple-200', sidebarBorder: 'border-purple-200', button: 'from-purple-500 to-purple-600', buttonHover: 'hover:from-purple-600 hover:to-purple-700', accent: 'purple-600', gradient: 'from-purple-100 to-purple-200', borderColor: 'border-purple-600', borderHover: 'hover:border-purple-500', hoverBg: 'hover:bg-purple-500/10', buttonActive: 'active:bg-purple-700', ringColor: 'ring-purple-500', textHover: 'hover:text-purple-500', lightBg: 'bg-purple-50', darkBg: 'bg-purple-900' },
//   lightPink: { id: 'lightPink', name: 'Blush Pink', type: 'light', sidebarBg: 'bg-pink-50', sidebarText: 'text-pink-900', sidebarHover: 'hover:bg-pink-100', sidebarActive: 'bg-pink-200', sidebarBorder: 'border-pink-200', button: 'from-pink-500 to-pink-600', buttonHover: 'hover:from-pink-600 hover:to-pink-700', accent: 'pink-600', gradient: 'from-pink-100 to-pink-200', borderColor: 'border-pink-600', borderHover: 'hover:border-pink-500', hoverBg: 'hover:bg-pink-500/10', buttonActive: 'active:bg-pink-700', ringColor: 'ring-pink-500', textHover: 'hover:text-pink-500', lightBg: 'bg-pink-50', darkBg: 'bg-pink-900' },
//   lightOrange: { id: 'lightOrange', name: 'Peach Cream', type: 'light', sidebarBg: 'bg-orange-50', sidebarText: 'text-orange-900', sidebarHover: 'hover:bg-orange-100', sidebarActive: 'bg-orange-200', sidebarBorder: 'border-orange-200', button: 'from-orange-500 to-orange-600', buttonHover: 'hover:from-orange-600 hover:to-orange-700', accent: 'orange-600', gradient: 'from-orange-100 to-orange-200', borderColor: 'border-orange-600', borderHover: 'hover:border-orange-500', hoverBg: 'hover:bg-orange-500/10', buttonActive: 'active:bg-orange-700', ringColor: 'ring-orange-500', textHover: 'hover:text-orange-500', lightBg: 'bg-orange-50', darkBg: 'bg-orange-900' },
//   lightGray: { id: 'lightGray', name: 'Clean Professional', type: 'light', sidebarBg: 'bg-gray-50', sidebarText: 'text-gray-800', sidebarHover: 'hover:bg-gray-100', sidebarActive: 'bg-gray-200', sidebarBorder: 'border-gray-300', button: 'from-indigo-500 to-indigo-600', buttonHover: 'hover:from-indigo-600 hover:to-indigo-700', accent: 'indigo-600', gradient: 'from-gray-50 to-gray-100', borderColor: 'border-indigo-600', borderHover: 'hover:border-indigo-500', hoverBg: 'hover:bg-indigo-500/10', buttonActive: 'active:bg-indigo-700', ringColor: 'ring-indigo-500', textHover: 'hover:text-indigo-500', lightBg: 'bg-indigo-50', darkBg: 'bg-indigo-900' },
//   lightTeal: { id: 'lightTeal', name: 'Aqua Breeze', type: 'light', sidebarBg: 'bg-teal-50', sidebarText: 'text-teal-900', sidebarHover: 'hover:bg-teal-100', sidebarActive: 'bg-teal-200', sidebarBorder: 'border-teal-200', button: 'from-teal-500 to-teal-600', buttonHover: 'hover:from-teal-600 hover:to-teal-700', accent: 'teal-600', borderColor: 'border-teal-600', borderHover: 'hover:border-teal-500', hoverBg: 'hover:bg-teal-500/10', buttonActive: 'active:bg-teal-700', ringColor: 'ring-teal-500', textHover: 'hover:text-teal-500', lightBg: 'bg-teal-50', darkBg: 'bg-teal-900' },
//   lightAmber: { id: 'lightAmber', name: 'Golden Light', type: 'light', sidebarBg: 'bg-amber-50', sidebarText: 'text-amber-900', sidebarHover: 'hover:bg-amber-100', sidebarActive: 'bg-amber-200', sidebarBorder: 'border-amber-200', button: 'from-amber-500 to-amber-600', buttonHover: 'hover:from-amber-600 hover:to-amber-700', accent: 'amber-600', borderColor: 'border-amber-600', borderHover: 'hover:border-amber-500', hoverBg: 'hover:bg-amber-500/10', buttonActive: 'active:bg-amber-700', ringColor: 'ring-amber-500', textHover: 'hover:text-amber-500', lightBg: 'bg-amber-50', darkBg: 'bg-amber-900' },
//   lightRose: { id: 'lightRose', name: 'Rose Dawn', type: 'light', sidebarBg: 'bg-rose-50', sidebarText: 'text-rose-900', sidebarHover: 'hover:bg-rose-100', sidebarActive: 'bg-rose-200', sidebarBorder: 'border-rose-200', button: 'from-rose-500 to-rose-600', buttonHover: 'hover:from-rose-600 hover:to-rose-700', accent: 'rose-600', borderColor: 'border-rose-600', borderHover: 'hover:border-rose-500', hoverBg: 'hover:bg-rose-500/10', buttonActive: 'active:bg-rose-700', ringColor: 'ring-rose-500', textHover: 'hover:text-rose-500', lightBg: 'bg-rose-50', darkBg: 'bg-rose-900' },
//   lightCyan: { id: 'lightCyan', name: 'Crystal Clear', type: 'light', sidebarBg: 'bg-cyan-50', sidebarText: 'text-cyan-900', sidebarHover: 'hover:bg-cyan-100', sidebarActive: 'bg-cyan-200', sidebarBorder: 'border-cyan-200', button: 'from-cyan-500 to-cyan-600', buttonHover: 'hover:from-cyan-600 hover:to-cyan-700', accent: 'cyan-600', borderColor: 'border-cyan-600', borderHover: 'hover:border-cyan-500', hoverBg: 'hover:bg-cyan-500/10', buttonActive: 'active:bg-cyan-700', ringColor: 'ring-cyan-500', textHover: 'hover:text-cyan-500', lightBg: 'bg-cyan-50', darkBg: 'bg-cyan-900' },

//   // ==================== PREMIUM DARK THEMES ====================
//   darkNavy: { id: 'darkNavy', name: 'Midnight Navy', type: 'dark', sidebarBg: 'bg-slate-900', sidebarText: 'text-cyan-300', sidebarHover: 'hover:bg-slate-800', sidebarActive: 'bg-cyan-900/50', sidebarBorder: 'border-cyan-800', button: 'from-cyan-600 to-cyan-500', buttonHover: 'hover:from-cyan-700 hover:to-cyan-600', accent: 'cyan-400', borderColor: 'border-cyan-500', borderHover: 'hover:border-cyan-400', hoverBg: 'hover:bg-cyan-500/20', buttonActive: 'active:bg-cyan-600', ringColor: 'ring-cyan-500', textHover: 'hover:text-cyan-300', lightBg: 'bg-cyan-900/20', darkBg: 'bg-cyan-950' },
//   darkEmerald: { id: 'darkEmerald', name: 'Emerald Void', type: 'dark', sidebarBg: 'bg-emerald-950', sidebarText: 'text-emerald-300', sidebarHover: 'hover:bg-emerald-900', sidebarActive: 'bg-emerald-800', sidebarBorder: 'border-emerald-800', button: 'from-emerald-600 to-emerald-500', buttonHover: 'hover:from-emerald-700 hover:to-emerald-600', accent: 'emerald-400', borderColor: 'border-emerald-500', borderHover: 'hover:border-emerald-400', hoverBg: 'hover:bg-emerald-500/20', buttonActive: 'active:bg-emerald-600', ringColor: 'ring-emerald-500', textHover: 'hover:text-emerald-300', lightBg: 'bg-emerald-900/20', darkBg: 'bg-emerald-950' },
//   darkPurple: { id: 'darkPurple', name: 'Amethyst Night', type: 'dark', sidebarBg: 'bg-purple-950', sidebarText: 'text-purple-300', sidebarHover: 'hover:bg-purple-900', sidebarActive: 'bg-purple-800', sidebarBorder: 'border-purple-800', button: 'from-purple-600 to-purple-500', buttonHover: 'hover:from-purple-700 hover:to-purple-600', accent: 'purple-400', borderColor: 'border-purple-500', borderHover: 'hover:border-purple-400', hoverBg: 'hover:bg-purple-500/20', buttonActive: 'active:bg-purple-600', ringColor: 'ring-purple-500', textHover: 'hover:text-purple-300', lightBg: 'bg-purple-900/20', darkBg: 'bg-purple-950' },
//   darkRed: { id: 'darkRed', name: 'Crimson Dark', type: 'dark', sidebarBg: 'bg-red-950', sidebarText: 'text-red-300', sidebarHover: 'hover:bg-red-900', sidebarActive: 'bg-red-800', sidebarBorder: 'border-red-800', button: 'from-red-600 to-red-500', buttonHover: 'hover:from-red-700 hover:to-red-600', accent: 'red-400', borderColor: 'border-red-500', borderHover: 'hover:border-red-400', hoverBg: 'hover:bg-red-500/20', buttonActive: 'active:bg-red-600', ringColor: 'ring-red-500', textHover: 'hover:text-red-300', lightBg: 'bg-red-900/20', darkBg: 'bg-red-950' },
//   darkObsidian: { id: 'darkObsidian', name: 'Pure Obsidian', type: 'dark', sidebarBg: 'bg-neutral-950', sidebarText: 'text-gray-200', sidebarHover: 'hover:bg-neutral-900', sidebarActive: 'bg-neutral-800', sidebarBorder: 'border-neutral-800', button: 'from-violet-600 to-purple-600', buttonHover: 'hover:from-violet-700 hover:to-purple-700', accent: 'violet-400', borderColor: 'border-violet-500', borderHover: 'hover:border-violet-400', hoverBg: 'hover:bg-violet-500/20', buttonActive: 'active:bg-violet-600', ringColor: 'ring-violet-500', textHover: 'hover:text-violet-300', lightBg: 'bg-violet-900/20', darkBg: 'bg-violet-950' },
//   darkGold: { id: 'darkGold', name: 'Luxury Gold', type: 'dark', sidebarBg: 'bg-amber-950', sidebarText: 'text-amber-200', sidebarHover: 'hover:bg-amber-900', sidebarActive: 'bg-amber-800', sidebarBorder: 'border-amber-800', button: 'from-amber-600 to-yellow-500', buttonHover: 'hover:from-amber-700 hover:to-yellow-600', accent: 'amber-400', borderColor: 'border-amber-500', borderHover: 'hover:border-amber-400', hoverBg: 'hover:bg-amber-500/20', buttonActive: 'active:bg-amber-600', ringColor: 'ring-amber-500', textHover: 'hover:text-amber-300', lightBg: 'bg-amber-900/20', darkBg: 'bg-amber-950' },
//   darkTeal: { id: 'darkTeal', name: 'Deep Ocean', type: 'dark', sidebarBg: 'bg-teal-950', sidebarText: 'text-teal-300', sidebarHover: 'hover:bg-teal-900', sidebarActive: 'bg-teal-800', sidebarBorder: 'border-teal-800', button: 'from-teal-600 to-cyan-500', buttonHover: 'hover:from-teal-700 hover:to-cyan-600', accent: 'cyan-400', borderColor: 'border-teal-500', borderHover: 'hover:border-teal-400', hoverBg: 'hover:bg-teal-500/20', buttonActive: 'active:bg-teal-600', ringColor: 'ring-teal-500', textHover: 'hover:text-teal-300', lightBg: 'bg-teal-900/20', darkBg: 'bg-teal-950' },
// };

// export const DEFAULT_THEME = THEMES.orange;

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);

//   // Load theme from logged-in company
//   useEffect(() => {
//     const user = localStorage.getItem('currentUser');
//     if (user) {
//       try {
//         const parsed = JSON.parse(user);

//         if (parsed.theme) {
//           let matchedTheme;

//           // Case 1: Theme saved with .id (new format)
//           if (parsed.theme.id && THEMES[parsed.theme.id]) {
//             matchedTheme = THEMES[parsed.theme.id];
//           }
//           // Case 2: Theme saved with .name only (your current format)
//           else if (parsed.theme.name) {
//             matchedTheme = Object.values(THEMES).find(t => t.name === parsed.theme.name);
//           }

//           if (matchedTheme) {
//             setCurrentTheme(matchedTheme);
//           }
//         }
//       } catch (e) {
//         console.error('Theme load error:', e);
//       }
//     }
//   }, []);

//   const changeTheme = (themeId) => {
//     if (THEMES[themeId]) {
//       setCurrentTheme(THEMES[themeId]);

//       // Save to current user
//       const user = localStorage.getItem('currentUser');
//       if (user) {
//         try {
//           const parsed = JSON.parse(user);
//           parsed.theme = THEMES[themeId];
//           localStorage.setItem('currentUser', JSON.stringify(parsed));
//         } catch (e) {
//           console.error('Theme save error:', e);
//         }
//       }
//     }
//   };

//   const themeList = Object.values(THEMES);

//   return (
//     <ThemeContext.Provider value={{ 
//       theme: currentTheme, 
//       changeTheme, 
//       themes: themeList,
//       // Helper function to get theme classes
//       getThemeClasses: () => ({
//         accent: currentTheme.accent || 'orange-600',
//         accentHover: currentTheme.accentHover || 'orange-400',
//         textColor: `text-${currentTheme.accent || 'orange-600'}`,
//         buttonBg: `bg-${currentTheme.accent || 'orange-600'}`,
//         buttonHover: `hover:bg-${currentTheme.accentHover || 'orange-700'}`,
//         borderColor: `border-${currentTheme.accent || 'orange-600'}`,
//         focusRing: `focus:ring-${currentTheme.accent?.replace('600', '500') || 'orange-500'}/50`,
//       })
//     }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// // Updated useTheme hook with fallback
// export const useTheme = () => {
//   const context = useContext(ThemeContext);
  
//   if (!context) {
//     console.warn('useTheme must be used within a ThemeProvider. Using default theme.');
    
//     // Return default theme and dummy functions
//     return {
//       theme: DEFAULT_THEME,
//       changeTheme: () => console.warn('ThemeProvider not available'),
//       themes: Object.values(THEMES),
//       getThemeClasses: () => ({
//         accent: DEFAULT_THEME.accent,
//         accentHover: DEFAULT_THEME.accentHover,
//         textColor: `text-${DEFAULT_THEME.accent}`,
//         buttonBg: `bg-${DEFAULT_THEME.accent}`,
//         buttonHover: `hover:bg-${DEFAULT_THEME.accentHover}`,
//         borderColor: `border-${DEFAULT_THEME.accent}`,
//         focusRing: `focus:ring-${DEFAULT_THEME.accent?.replace('600', '500') || 'orange-500'}/50`,
//       })
//     };
//   }
  
//   return context;
// };

// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { THEMES as themeConstants, DEFAULT_THEME } from './colors/theme';

// // Re-export THEMES for backward compatibility
// export { THEMES, DEFAULT_THEME } from './colors/theme';

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const THEMES = themeConstants;
  
//   // Try to get auth user, but handle if AuthContext is not available
//   let authUser = null;
//   try {
//     // Dynamically import useAuth to avoid circular dependency issues
//     const { useAuth } = require('./AuthContext');
//     const { user } = useAuth();
//     authUser = user;
//   } catch (error) {
//     // AuthContext not available yet, use localStorage directly
//     console.debug('AuthContext not available, using localStorage for theme');
//   }
  
//   const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to load theme from user
//   const loadUserTheme = (userData) => {
//     if (!userData) {
//       setCurrentTheme(DEFAULT_THEME);
//       return DEFAULT_THEME;
//     }

//     let matchedTheme = null;

//     // Case 1: Theme saved with .id (new format)
//     if (userData.theme?.id && THEMES[userData.theme.id]) {
//       matchedTheme = THEMES[userData.theme.id];
//     }
//     // Case 2: Theme saved as string (theme name)
//     else if (typeof userData.theme === 'string' && THEMES[userData.theme]) {
//       matchedTheme = THEMES[userData.theme];
//     }
//     // Case 3: Theme saved as object with .name
//     else if (userData.theme?.name) {
//       matchedTheme = Object.values(THEMES).find(t => t.name === userData.theme.name);
//     }
//     // Case 4: Check if user has companyTheme
//     else if (userData.companyTheme) {
//       matchedTheme = THEMES[userData.companyTheme] || DEFAULT_THEME;
//     }
//     // Case 5: Check if theme is directly in user data
//     else if (userData.theme && THEMES[userData.theme]) {
//       matchedTheme = THEMES[userData.theme];
//     }

//     const finalTheme = matchedTheme || DEFAULT_THEME;
//     setCurrentTheme(finalTheme);
//     return finalTheme;
//   };

//   // Initial load
//   useEffect(() => {
//     const loadTheme = () => {
//       if (authUser) {
//         // Load from auth context user
//         loadUserTheme(authUser);
//       } else {
//         // Fallback to localStorage
//         const storedUser = localStorage.getItem('currentUser');
//         if (storedUser) {
//           try {
//             const parsed = JSON.parse(storedUser);
//             loadUserTheme(parsed);
//           } catch (e) {
//             console.error('Theme load error:', e);
//             setCurrentTheme(DEFAULT_THEME);
//           }
//         }
//       }
//     };

//     loadTheme();
//   }, [authUser]);

//   // Refresh theme function - can be called externally
//   const refreshTheme = async () => {
//     setIsLoading(true);
    
//     try {
//       // Get latest user data
//       let userData = authUser;
      
//       if (!userData) {
//         const storedUser = localStorage.getItem('currentUser');
//         if (storedUser) {
//           userData = JSON.parse(storedUser);
//         }
//       }
      
//       loadUserTheme(userData);
      
//       // Small delay to ensure smooth transition
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } catch (error) {
//       console.error('Error refreshing theme:', error);
//       setCurrentTheme(DEFAULT_THEME);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const changeTheme = (themeId) => {
//     if (THEMES[themeId]) {
//       const newTheme = THEMES[themeId];
//       setCurrentTheme(newTheme);

//       // Update in localStorage
//       const storedUser = localStorage.getItem('currentUser');
//       if (storedUser) {
//         try {
//           const user = JSON.parse(storedUser);
//           const updatedUser = {
//             ...user,
//             theme: newTheme
//           };
          
//           localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
//           // Dispatch event to notify other components
//           window.dispatchEvent(new CustomEvent('userThemeUpdated', { 
//             detail: { theme: newTheme }
//           }));
//         } catch (e) {
//           console.error('Error saving theme:', e);
//         }
//       }
//     }
//   };

//   // Listen for theme updates from other tabs/windows
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'currentUser' && e.newValue) {
//         try {
//           const updatedUser = JSON.parse(e.newValue);
//           if (updatedUser.theme) {
//             loadUserTheme(updatedUser);
//           }
//         } catch (error) {
//           console.error('Failed to parse updated user theme:', error);
//         }
//       }
//     };

//     const handleCustomEvent = (e) => {
//       if (e.detail?.theme) {
//         setCurrentTheme(e.detail.theme);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userThemeUpdated', handleCustomEvent);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userThemeUpdated', handleCustomEvent);
//     };
//   }, []);

//   const themeList = Object.values(THEMES);

//   return (
//     <ThemeContext.Provider value={{ 
//       theme: currentTheme, 
//       changeTheme, 
//       refreshTheme,
//       isLoading,
//       themes: themeList,
//       getThemeClasses: () => ({
//         accent: currentTheme.accent || 'orange-600',
//         accentHover: currentTheme.accentHover || 'orange-400',
//         textColor: `text-${currentTheme.accent || 'orange-600'}`,
//         buttonBg: `bg-${currentTheme.accent || 'orange-600'}`,
//         buttonHover: `hover:bg-${currentTheme.accentHover || 'orange-700'}`,
//         borderColor: `border-${currentTheme.accent || 'orange-600'}`,
//         focusRing: `focus:ring-${currentTheme.accent?.replace('600', '500') || 'orange-500'}/50`,
//       })
//     }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
  
//   if (!context) {
//     console.warn('useTheme must be used within a ThemeProvider. Using default theme.');
    
//     return {
//       theme: DEFAULT_THEME,
//       changeTheme: () => console.warn('ThemeProvider not available'),
//       refreshTheme: async () => {},
//       isLoading: false,
//       themes: Object.values(THEMES),
//       getThemeClasses: () => ({
//         accent: DEFAULT_THEME.accent,
//         accentHover: DEFAULT_THEME.accentHover,
//         textColor: `text-${DEFAULT_THEME.accent}`,
//         buttonBg: `bg-${DEFAULT_THEME.accent}`,
//         buttonHover: `hover:bg-${DEFAULT_THEME.accentHover}`,
//         borderColor: `border-${DEFAULT_THEME.accent}`,
//         focusRing: `focus:ring-${DEFAULT_THEME.accent?.replace('600', '500') || 'orange-500'}/50`,
//       })
//     };
//   }
  
//   return context;
// };

// 'use client';

// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { THEMES, DEFAULT_THEME } from './colors/theme';

// const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);
//   const [isLoading, setIsLoading] = useState(false);

//   // Function to load theme from user
//   const loadUserTheme = (userData) => {
//     if (!userData) {
//       setCurrentTheme(DEFAULT_THEME);
//       return DEFAULT_THEME;
//     }

//     let matchedTheme = null;

//     // Case 1: Theme saved with .id (new format)
//     if (userData.theme?.id && THEMES[userData.theme.id]) {
//       matchedTheme = THEMES[userData.theme.id];
//     }
//     // Case 2: Theme saved as string (theme name)
//     else if (typeof userData.theme === 'string' && THEMES[userData.theme]) {
//       matchedTheme = THEMES[userData.theme];
//     }
//     // Case 3: Theme saved as object with .name
//     else if (userData.theme?.name) {
//       matchedTheme = Object.values(THEMES).find(t => t.name === userData.theme.name);
//     }
//     // Case 4: Check if user has companyTheme
//     else if (userData.companyTheme) {
//       matchedTheme = THEMES[userData.companyTheme] || DEFAULT_THEME;
//     }
//     // Case 5: Check if theme is directly in user data
//     else if (userData.theme && THEMES[userData.theme]) {
//       matchedTheme = THEMES[userData.theme];
//     }
//     // Case 6: If theme is an object with properties, find matching theme
//     else if (userData.theme && typeof userData.theme === 'object') {
//       // Try to find by name
//       if (userData.theme.name) {
//         matchedTheme = Object.values(THEMES).find(t => t.name === userData.theme.name);
//       }
//     }

//     const finalTheme = matchedTheme || DEFAULT_THEME;
//     setCurrentTheme(finalTheme);
//     return finalTheme;
//   };

//   // Initial load
//   useEffect(() => {
//     const loadTheme = () => {
//       // Try to get auth user from localStorage
//       const storedUser = localStorage.getItem('currentUser');
//       if (storedUser) {
//         try {
//           const parsed = JSON.parse(storedUser);
//           loadUserTheme(parsed);
//         } catch (e) {
//           console.error('Theme load error:', e);
//           setCurrentTheme(DEFAULT_THEME);
//         }
//       } else {
//         setCurrentTheme(DEFAULT_THEME);
//       }
//     };

//     loadTheme();
//   }, []);

//   // Refresh theme function - can be called externally
//   const refreshTheme = async () => {
//     setIsLoading(true);
    
//     try {
//       // Get latest user data from localStorage
//       const storedUser = localStorage.getItem('currentUser');
//       if (storedUser) {
//         const userData = JSON.parse(storedUser);
//         loadUserTheme(userData);
//       } else {
//         setCurrentTheme(DEFAULT_THEME);
//       }
      
//       // Small delay to ensure smooth transition
//       await new Promise(resolve => setTimeout(resolve, 100));
//     } catch (error) {
//       console.error('Error refreshing theme:', error);
//       setCurrentTheme(DEFAULT_THEME);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const changeTheme = (themeId) => {
//     if (THEMES[themeId]) {
//       const newTheme = THEMES[themeId];
//       setCurrentTheme(newTheme);

//       // Update in localStorage
//       const storedUser = localStorage.getItem('currentUser');
//       if (storedUser) {
//         try {
//           const user = JSON.parse(storedUser);
//           const updatedUser = {
//             ...user,
//             theme: newTheme
//           };
          
//           localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
//           // Dispatch event to notify other components
//           window.dispatchEvent(new CustomEvent('userThemeUpdated', { 
//             detail: { theme: newTheme }
//           }));
//         } catch (e) {
//           console.error('Error saving theme:', e);
//         }
//       }
//     }
//   };

//   // Listen for theme updates from other tabs/windows
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'currentUser' && e.newValue) {
//         try {
//           const updatedUser = JSON.parse(e.newValue);
//           if (updatedUser.theme) {
//             loadUserTheme(updatedUser);
//           }
//         } catch (error) {
//           console.error('Failed to parse updated user theme:', error);
//         }
//       }
//     };

//     const handleCustomEvent = (e) => {
//       if (e.detail?.theme) {
//         setCurrentTheme(e.detail.theme);
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     window.addEventListener('userThemeUpdated', handleCustomEvent);

//     return () => {
//       window.removeEventListener('storage', handleStorageChange);
//       window.removeEventListener('userThemeUpdated', handleCustomEvent);
//     };
//   }, []);

//   const themeList = Object.values(THEMES);

//   return (
//     <ThemeContext.Provider value={{ 
//       theme: currentTheme, 
//       changeTheme, 
//       refreshTheme,
//       isLoading,
//       themes: themeList,
//       getThemeClasses: () => ({
//         accent: currentTheme.accent || 'orange-600',
//         accentHover: currentTheme.accentHover || 'orange-400',
//         textColor: `text-${currentTheme.accent || 'orange-600'}`,
//         buttonBg: `bg-${currentTheme.accent || 'orange-600'}`,
//         buttonHover: `hover:bg-${currentTheme.accentHover || 'orange-700'}`,
//         borderColor: `border-${currentTheme.accent || 'orange-600'}`,
//         focusRing: `focus:ring-${currentTheme.accent?.replace('600', '500') || 'orange-500'}/50`,
//       })
//     }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
  
//   if (!context) {
//     console.warn('useTheme must be used within a ThemeProvider. Using default theme.');
    
//     return {
//       theme: DEFAULT_THEME,
//       changeTheme: () => console.warn('ThemeProvider not available'),
//       refreshTheme: async () => {},
//       isLoading: false,
//       themes: Object.values(THEMES),
//       getThemeClasses: () => ({
//         accent: DEFAULT_THEME.accent,
//         accentHover: DEFAULT_THEME.accentHover,
//         textColor: `text-${DEFAULT_THEME.accent}`,
//         buttonBg: `bg-${DEFAULT_THEME.accent}`,
//         buttonHover: `hover:bg-${DEFAULT_THEME.accentHover}`,
//         borderColor: `border-${DEFAULT_THEME.accent}`,
//         focusRing: `focus:ring-${DEFAULT_THEME.accent?.replace('600', '500') || 'orange-500'}/50`,
//       })
//     };
//   }
  
//   return context;
// };

// // Export THEMES and DEFAULT_THEME for direct use if needed
// export { THEMES, DEFAULT_THEME };


'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, DEFAULT_THEME } from './colors/theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(DEFAULT_THEME);
  const [isLoading, setIsLoading] = useState(false);

  // Function to load theme from user
  const loadUserTheme = (userData) => {
    if (!userData) {
      setCurrentTheme(DEFAULT_THEME);
      return DEFAULT_THEME;
    }

    let matchedTheme = null;

    // Case 1: Theme saved with .id (new format)
    if (userData.theme?.id && THEMES[userData.theme.id]) {
      matchedTheme = THEMES[userData.theme.id];
    }
    // Case 2: Theme saved as string (theme name)
    else if (typeof userData.theme === 'string' && THEMES[userData.theme]) {
      matchedTheme = THEMES[userData.theme];
    }
    // Case 3: Theme saved as object with .name
    else if (userData.theme?.name) {
      matchedTheme = Object.values(THEMES).find(t => t.name === userData.theme.name);
    }
    // Case 4: Check if user has companyTheme
    else if (userData.companyTheme) {
      matchedTheme = THEMES[userData.companyTheme] || DEFAULT_THEME;
    }
    // Case 5: Check if theme is directly in user data
    else if (userData.theme && THEMES[userData.theme]) {
      matchedTheme = THEMES[userData.theme];
    }
    // Case 6: If theme is an object with properties, find matching theme
    else if (userData.theme && typeof userData.theme === 'object') {
      // Try to find by name
      if (userData.theme.name) {
        matchedTheme = Object.values(THEMES).find(t => t.name === userData.theme.name);
      }
    }

    const finalTheme = matchedTheme || DEFAULT_THEME;
    setCurrentTheme(finalTheme);
    return finalTheme;
  };

  // Initial load
  useEffect(() => {
    const loadTheme = () => {
      // Try to get auth user from localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          loadUserTheme(parsed);
        } catch (e) {
          console.error('Theme load error:', e);
          setCurrentTheme(DEFAULT_THEME);
        }
      } else {
        setCurrentTheme(DEFAULT_THEME);
      }
    };

    loadTheme();
  }, []);

  // Refresh theme function - can be called externally
  const refreshTheme = async () => {
    setIsLoading(true);
    
    try {
      // Get latest user data from localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        loadUserTheme(userData);
      } else {
        setCurrentTheme(DEFAULT_THEME);
      }
      
      // Small delay to ensure smooth transition
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      console.error('Error refreshing theme:', error);
      setCurrentTheme(DEFAULT_THEME);
    } finally {
      setIsLoading(false);
    }
  };

  const changeTheme = (themeId) => {
    if (THEMES[themeId]) {
      const newTheme = THEMES[themeId];
      setCurrentTheme(newTheme);

      // Update in localStorage
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          const updatedUser = {
            ...user,
            theme: newTheme
          };
          
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          
          // Dispatch event to notify other components
          window.dispatchEvent(new CustomEvent('userThemeUpdated', { 
            detail: { theme: newTheme }
          }));
        } catch (e) {
          console.error('Error saving theme:', e);
        }
      }
    }
  };

  // Listen for theme updates from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'currentUser' && e.newValue) {
        try {
          const updatedUser = JSON.parse(e.newValue);
          if (updatedUser.theme) {
            loadUserTheme(updatedUser);
          }
        } catch (error) {
          console.error('Failed to parse updated user theme:', error);
        }
      }
    };

    const handleCustomEvent = (e) => {
      if (e.detail?.theme) {
        setCurrentTheme(e.detail.theme);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userThemeUpdated', handleCustomEvent);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userThemeUpdated', handleCustomEvent);
    };
  }, []);

  const themeList = Object.values(THEMES);

  // Helper function to extract hover color from gradient or buttonHover
  const getHoverColor = (theme) => {
    if (!theme) return 'orange-700';
    
    // Extract hover color from buttonHover property
    if (theme.buttonHover) {
      // Try to extract color from gradient string like "hover:from-orange-700 hover:to-orange-800"
      const match = theme.buttonHover.match(/from-([a-z]+-\d+)/);
      if (match && match[1]) {
        return match[1];
      }
      
      // Try to extract from simpler string
      const colorMatch = theme.buttonHover.match(/([a-z]+-\d+)/);
      if (colorMatch && colorMatch[1]) {
        return colorMatch[1];
      }
    }
    
    // Default fallback based on accent color
    if (theme.accent) {
      const [color, shade] = theme.accent.split('-');
      const hoverShade = parseInt(shade) + 100;
      return `${color}-${hoverShade}`;
    }
    
    return 'orange-700';
  };

  // Helper function to extract accent color
  const getAccentColor = (theme) => {
    if (!theme) return 'orange-600';
    
    // Some themes might have accent in different format
    if (theme.accent) {
      return theme.accent;
    }
    
    // Fallback to orange-600
    return 'orange-600';
  };

  return (
    <ThemeContext.Provider value={{ 
      theme: currentTheme, 
      changeTheme, 
      refreshTheme,
      isLoading,
      themes: themeList,
      getThemeClasses: () => {
        const accent = getAccentColor(currentTheme);
        const accentHover = getHoverColor(currentTheme);
        const accentBase = accent.split('-')[0]; // Extract color name without shade
        
        return {
          accent: accent,
          accentHover: accentHover,
          accentBase: accentBase, // For use in gradients
          textColor: `text-${accent}`,
          buttonBg: `bg-${accent}`,
          buttonHover: `hover:bg-${accentHover}`,
          borderColor: `border-${accent}`,
          focusRing: `focus:ring-${accentBase}-500/50`,
          gradientFrom: `from-${accent}`,
          gradientTo: `to-${accentHover}`,
          ringColor: `ring-${accentBase}-500`,
          hoverBg: `hover:bg-${accentBase}-500/10`,
          lightBg: `bg-${accentBase}-50`,
          darkBg: `bg-${accentBase}-900`,
        };
      }
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    console.warn('useTheme must be used within a ThemeProvider. Using default theme.');
    
    // Safe default theme classes
    const safeAccent = 'orange-600';
    const safeAccentHover = 'orange-700';
    const safeAccentBase = 'orange';
    
    return {
      theme: DEFAULT_THEME,
      changeTheme: () => console.warn('ThemeProvider not available'),
      refreshTheme: async () => {},
      isLoading: false,
      themes: Object.values(THEMES),
      getThemeClasses: () => ({
        accent: safeAccent,
        accentHover: safeAccentHover,
        accentBase: safeAccentBase,
        textColor: `text-${safeAccent}`,
        buttonBg: `bg-${safeAccent}`,
        buttonHover: `hover:bg-${safeAccentHover}`,
        borderColor: `border-${safeAccent}`,
        focusRing: `focus:ring-${safeAccentBase}-500/50`,
        gradientFrom: `from-${safeAccent}`,
        gradientTo: `to-${safeAccentHover}`,
        ringColor: `ring-${safeAccentBase}-500`,
        hoverBg: `hover:bg-${safeAccentBase}-500/10`,
        lightBg: `bg-${safeAccentBase}-50`,
        darkBg: `bg-${safeAccentBase}-900`,
      })
    };
  }
  
  return context;
};

// Export THEMES and DEFAULT_THEME for direct use if needed
export { THEMES, DEFAULT_THEME };