import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ReviewData {
  userId: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export async function addReview(data: ReviewData) {
  try {
    const reviewRef = await addDoc(collection(db, 'reviews'), {
      ...data,
      timestamp: serverTimestamp()
    });
    return reviewRef.id;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
}