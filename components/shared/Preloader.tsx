
import React from 'react';
import { Briefcase } from 'lucide-react';

const Preloader: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100]">
        <div className="relative flex items-center justify-center">
            <div className="absolute h-24 w-24 bg-primary/20 rounded-full animate-ping"></div>
            <Briefcase className="text-primary h-16 w-16" />
        </div>
        <p className="mt-6 text-xl font-semibold text-gray-700 tracking-widest animate-pulse">MTMKAY</p>
    </div>
  );
};

export default Preloader;
