import React from 'react';

const LoadSpinner = ({ 
  size = 'medium', 
  color = 'blue', 
  text = 'Loading...',
  showText = true,
  className = '' 
}) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    green: 'border-green-600',
    red: 'border-red-600',
    purple: 'border-purple-600',
    gray: 'border-gray-600'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color]}
          border-4 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
      />
      {showText && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );
};

const Spinner = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="p-6 border rounded-lg">
        <h3 className="font-semibold mb-4">Custom Text</h3>
        <LoadSpinner 
          size="medium" 
          color="red" 
          text="Please wait..." 
        />
      </div>
      
      
      </div>
  );
};

export default Spinner;