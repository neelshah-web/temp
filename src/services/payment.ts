import { addDoc, collection } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface PaymentDetails {
  userId: string;
  carId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: Date;
}

export async function createPayment(details: PaymentDetails) {
  try {
    const paymentRef = await addDoc(collection(db, 'payments'), {
      ...details,
      timestamp: new Date()
    });
    return paymentRef.id;
  } catch (error) {
    console.error('Error creating payment:', error);
    throw error;
  }
}