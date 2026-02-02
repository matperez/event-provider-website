
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
  relatedId?: string; // Links to Venue.id or Scenario.id
}

export interface User {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}

export interface Booking {
  id: string;
  venueId: string;
  scenarioId: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: 'Pending' | 'Paid' | 'Cancelled';
}
