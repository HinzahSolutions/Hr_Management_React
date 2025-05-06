import { toast } from 'react-toastify';

export const toastSuccess = (message) =>
  toast.success(message || 'Success!', {
    className: 'custom-toast success',
  });

export const toastError = (message) =>
  toast.error(message || 'Something went wrong!', {
    className: 'custom-toast error',
  });
