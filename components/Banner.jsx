'use client'
import React from 'react'
import toast from 'react-hot-toast';

export default function Banner() {
  const [isOpen, setIsOpen] = React.useState(true);

  const handleClaim = () => {
    setIsOpen(false);
    toast.success('Coupon copied to clipboard!');
    navigator.clipboard.writeText('NEW20');
  };

  return isOpen && (
    <div className="relative w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-orange-400 text-white text-center font-medium overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise-texture.png')] opacity-10 pointer-events-none"></div>
      <div className="flex items-center justify-between px-4 sm:px-8 py-2 max-w-7xl mx-auto">
        <p className="text-xs sm:text-sm md:text-base">
          🎉 Get <span className="font-bold">20% OFF</span> on your first order at <span className="underline">DreamSaver</span>!
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClaim}
            className="hidden sm:block font-semibold bg-white text-gray-800 px-6 py-2 rounded-full shadow hover:scale-105 active:scale-95 transition-all"
          >
            Claim Offer
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/20 transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#fff" />
              <rect x="12.533" y="13.915" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.533 13.915)" fill="#fff" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
