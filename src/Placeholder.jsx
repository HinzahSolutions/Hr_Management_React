'use client';

export default function Placeholder({ title }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-gray-600 mt-2">This page is ready for implementation.</p>
    </div>
  );
}