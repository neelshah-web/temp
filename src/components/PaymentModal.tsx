import React, { useState, useEffect } from 'react';
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

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  carId,
  bookingData,
}: PaymentModalProps) {
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [showMobileAlert, setShowMobileAlert] = useState(false); // State to show the mobile alert popup

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  if (!isModalOpen) return null;

  const handleUPIClick = async (e: React.MouseEvent) => {
    if (!currentUser) {
      toast.error('Please login to continue with the payment');
      return;
    }

    // Check if the user is on a mobile device
    const isMobileDevice = navigator.userAgent.match(/Mobi/);

    if (isMobileDevice) {
      try {
        // Create booking record with payment details
        await createBooking({
          userId: currentUser.uid,
          carId,
          ...bookingData,
          amount,
          status: 'pending',
          paymentMethod: 'UPI',
        });

        // Open UPI payment app with the given UPI ID
        const upiUrl = 'upi://pay?pa=7887809708@okbizaxis&pn=Manisha+Lomate&tid=TXN12345';

        // Redirect to the UPI payment app on mobile devices
        window.location.href = upiUrl;

        toast.success('Payment initiated! Please complete the payment in your UPI app.');
        onClose();  // Close modal after successful payment initiation
      } catch (error) {
        toast.error('Failed to process payment. Please try again.');
        console.error('Payment error:', error);
      }
    } else {
      // If not a mobile device, show the alert popup
      setShowMobileAlert(true);
      e.preventDefault(); // Prevent redirection on non-mobile devices
    }
  };

  return (
    <>
      {/* Main Modal */}
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-auto">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Payment</h2>
            <button
              onClick={() => {
                setIsModalOpen(false);
                onClose();
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* QR Scanner Image */}
            <img
              src="src\components\assests\QR.jpg"
              alt="QR Scanner"
              className="w-full max-h-96 object-contain rounded-md" // Increased height
            />

            {/* UPI Payment Link */}
            <div className="flex justify-center"> {/* Centering the button */}
              <a
                href="upi://pay?pa=7887809708@okbizaxis&pn=Manisha+Lomate&tid=TXN12345"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={handleUPIClick}
              >
                Pay via UPI (Google Pay/PhonePe/Paytm)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Alert Popup */}
      {showMobileAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 overflow-auto">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Mobile Payment Required</h2>
              <button
                onClick={() => setShowMobileAlert(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="text-lg text-gray-900 dark:text-white mb-4">
              Please open this link on your mobile device to proceed with the UPI payment.
            </p>

            <button
              onClick={() => setShowMobileAlert(false)}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
