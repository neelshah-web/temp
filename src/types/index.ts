export interface Car {
  id: string;
  name: string;
  model: string;
  year: number;
  price: number;
  image: string;
  category: string;
  seats: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric';
  available: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}