import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Notification = ({ notification }) => {
  if (!notification.show) return null;

  return (
    <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideIn ${
      notification.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`}>
      {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <span className="font-medium text-sm max-w-xs">{notification.message}</span>
    </div>
  );
};

export default Notification;
