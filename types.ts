
export interface Venue {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerDay: number;
  imageUrl: string;
  tags: string[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  duration: string;
  pricePerPerson: number;
  imageUrl: string;
  category: 'Corporate' | 'Wedding' | 'Birthday' | 'Social';
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
  relatedId?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  itemId: string; // ID of Venue or Scenario
  itemName: string;
  itemType: 'venue' | 'scenario';
  date: string;
  guests: number;
  totalPrice: number;
  contactName: string;
  phone: string;
  email: string;
  wishes?: string;
  status: 'Pending' | 'Paid' | 'Cancelled';
}
