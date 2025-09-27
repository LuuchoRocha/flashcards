import {FC, useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: FC<ToastProps> = ({message, onClose, duration = 1000}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const entranceTimer = setTimeout(() => setIsVisible(true), 10);

    return () => clearTimeout(entranceTimer);
  }, []);

  useEffect(() => {
    const handleClose = () => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    };

    const closeTimer = setTimeout(handleClose, duration);

    return () => clearTimeout(closeTimer);
  }, [duration, onClose]);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50" role="alert">
      <div
        className={`bg-white p-4 rounded shadow-lg transition-all duration-300 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
        {message}
      </div>
    </div>,
    document.body,
  );
};

export default Toast;
