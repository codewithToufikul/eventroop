import React, { createContext, useState, useContext, useCallback } from 'react';

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
    onConfirm: null,
    onCancel: null,
  });

  const showAlert = useCallback(({ message, onConfirm, onCancel }) => {
    setAlert({
      isOpen: true,
      message,
      onConfirm,
      onCancel,
    });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  }, []);

  const handleConfirm = () => {
    if (alert.onConfirm) alert.onConfirm();
    hideAlert();
  };

  const handleCancel = () => {
    if (alert.onCancel) alert.onCancel();
    hideAlert();
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert, handleConfirm, handleCancel }}>
      {children}
      {alert.isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center z-50 animate-fadeIn"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(8px)'
          }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slideUp">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-800 text-lg font-medium mb-8 leading-relaxed">{alert.message}</p>
            </div>
            <div className="flex justify-center space-x-4">
              {alert.onCancel && (
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium transition-all duration-200 hover:bg-gray-200 hover:shadow-md active:scale-95 focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Cancel
                </button>
              )}
              <button
                onClick={handleConfirm}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:shadow-teal-500/30 active:scale-95 focus:outline-none focus:ring-4 focus:ring-teal-500 focus:ring-opacity-50"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}