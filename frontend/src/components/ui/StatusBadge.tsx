import React from 'react';
import { clsx } from 'clsx';

export interface StatusBadgeProps {
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true
}) => {
  const statusConfig = {
    PENDING: {
      label: 'Pending',
      icon: '⏳',
      classes: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    },
    APPROVED: {
      label: 'Approved', 
      icon: '✅',
      classes: 'bg-green-100 text-green-800 border-green-200'
    },
    REJECTED: {
      label: 'Rejected',
      icon: '❌',
      classes: 'bg-red-100 text-red-800 border-red-200'
    },
    EXPIRED: {
      label: 'Expired',
      icon: '⏰',
      classes: 'bg-gray-100 text-gray-800 border-gray-200'
    }
  };

  const config = statusConfig[status];
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center font-medium rounded-full border',
        config.classes,
        sizeClasses[size]
      )}
    >
      {showIcon && <span className="mr-1.5">{config.icon}</span>}
      {config.label}
    </span>
  );
};

export default StatusBadge;
