/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */

import { IError } from '@/models/error';
import { Notifications } from '@/models/noti';
import {
  CheckCircleOutlined,
  CloseOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';
import { AxiosError } from 'axios';
import { t } from 'i18next';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { mapErrorToMessage, mapErrorToDescrition } from './error';
import {
  translateErrorMessage,
  translateErrorDescription,
} from './useTranslateError';

// Context initialization
const NotificationContext = createContext<{
  addNoti: (notification: Notifications) => void;
  shownErrors: Set<string>; // Expose shownErrors in context
  setShownErrors: React.Dispatch<React.SetStateAction<Set<string>>>; // Expose the setter
}>({
  addNoti: () => {}, // default function, which will be overridden
  shownErrors: new Set(),
  setShownErrors: () => {}, // default setter function
});

// Helper function to get icons based on alert type
export const getAntdIconForType = (type: Notifications['type']) => {
  switch (type) {
    case 'success':
      return <CheckCircleOutlined style={{ color: 'green' }} />;
    case 'error':
      return <CloseOutlined style={{ color: 'red' }} />;
    case 'warning':
      return <WarningOutlined style={{ color: 'orange' }} />;
    default:
      return null; // Info notifications don't need a specific icon
  }
};

const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [noti, setNoti] = useState<Notifications[]>([]); // Manage alert queue
  const [api, contextHolder] = notification.useNotification(); // Ant Design's notification hook
  const [shownErrors, setShownErrors] = useState<Set<string>>(new Set()); // Set to track shown errors

  // Trigger notification whenever a new alert enters the queue
  useEffect(() => {
    const alert = noti[0];

    if (alert) {
      // Check if the error message has been shown before
      if (!shownErrors.has(alert.message)) {
        api.open({
          message: alert.message,
          description: alert.description,
          icon: getAntdIconForType(alert.type),
          type: alert.type,
          duration: 4, // Auto-hide after 4 seconds
          closeIcon: <CloseOutlined onClick={() => handleNotiRemoval()} />, // Handle manual close
        });

        // Add the error message to the shown set to prevent showing it again
        if (alert.type === 'error') {
          setShownErrors((prevErrors) => {
            const newErrors = new Set(prevErrors);
            newErrors.add(alert.message); // Add only if not already shown
            return newErrors;
          });
        }
      }
    }
  }, [noti, api, shownErrors]);

  // Notification context function to add alert
  const addNoti = (notification: Notifications) => {
    setNoti((prevNoti) => {
      return [...prevNoti, notification];
    });
  };

  // Function to remove the alert that's currently displayed
  const handleNotiRemoval = () => {
    setNoti((prevNoti) => prevNoti.slice(1)); // Remove the first alert
  };

  const value = useMemo(
    () => ({ addNoti, shownErrors, setShownErrors }),
    [shownErrors],
  ); // Memoize value to avoid re-renders

  return (
    <NotificationContext.Provider value={value}>
      {contextHolder} {/* Notification context rendering */}
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use the alert context
export const useNotificationStore = () => {
  return useContext(NotificationContext);
};

export default NotificationProvider;

export const globalErrorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<IError>;

  const message = translateErrorMessage(mapErrorToMessage(axiosError) || '');
  const description = translateErrorDescription(
    mapErrorToDescrition(axiosError) || '',
  );

  // Access the shownErrors from the context
  const { shownErrors, setShownErrors } = useNotificationStore();

  // Only show error notification if it has not been shown before
  if (!shownErrors.has(message)) {
    notification.open({
      message: message,
      description: description,
      icon: getAntdIconForType('error'),
      type: 'error',
      duration: 4,
    });

    // Add to shown errors to prevent future duplicates
    setShownErrors((prevErrors) => new Set(prevErrors).add(message));
  }
};

// Function to handle success notifications based on mutation key
export const globalSuccessHandler = () => {
  notification.open({
    message: t('successfully'),
    icon: getAntdIconForType('success'),
    type: 'success',
    duration: 4,
  });
};
