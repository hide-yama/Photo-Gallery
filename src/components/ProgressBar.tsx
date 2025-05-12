import React, { useEffect, useState } from 'react';

const ProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollTop = document.documentElement.scrollTop;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className="fixed right-0 top-0 w-[2px] h-full bg-gray-100">
      <div 
        className="bg-gray-400 w-full transition-transform duration-100 ease-out"
        style={{ 
          height: `${scrollProgress}%`,
          transform: `scaleY(${scrollProgress > 0 ? 1 : 0})`,
          transformOrigin: 'top'
        }}
      />
    </div>
  );
};

export default ProgressBar;