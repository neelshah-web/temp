import React from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createBooking } from '../services/booking';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  carId: string;
  bookingData: any;
}

export function PaymentModal({ isOpen, onClose, amount, carId, bookingData }: PaymentModalProps) {
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const handleUPIClick = async () => {
    if (!currentUser) {
      toast.error('Please login to continue with the payment');
      return;
    }

    try {
      // Create booking record with payment details
      await createBooking({
        userId: currentUser.uid,
        carId,
        ...bookingData,
        amount,
        status: 'pending',
        paymentMethod: 'UPI'
      });

      // Open UPI payment app with the given UPI ID
      const upiUrl = 'upi://pay?pa=7887809708@okbizaxis&pn=Car+Rental&mc=1234&tid=001&url=https://www.example.com';
      
      // Attempt to redirect to UPI app
      window.location.href = upiUrl;

      toast.success('Payment initiated! Please complete the payment in your UPI app.');
      onClose();
    } catch (error) {
      toast.error('Failed to process payment. Please try again.');
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="mb-4">
          <img
            src="src\components\assests\QR.jpg"
            alt="Payment QR Code"
            className="w-full max-w-xs mx-auto mb-4"
          />
        </div>

        <div className="space-y-4">
          <button
            onClick={handleUPIClick}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Pay with UPI (GPay/PhonePe/Paytm)
          </button>
          
          <button
            onClick={onClose}
            className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
