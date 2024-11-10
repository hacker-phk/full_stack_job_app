import React, { useEffect } from 'react';

const Toast = ({ message, type = 'info', onClose }) => {
  // Auto close the toast after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  // Tailwind styling for different toast types
  const typeStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg transition-transform transform ${
        message ? 'translate-x-0' : 'translate-x-full'
      } ${typeStyles[type]}`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white font-bold">
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
