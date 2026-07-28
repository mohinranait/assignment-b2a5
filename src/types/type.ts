export type Role = 'Customer' | 'Provider' | 'Admin';

export type UserStatus = 'suspend' | 'activate';

export type RentalStatus = 
  | 'PLACED' 
  | 'CONFIRMED' 
  | 'PAID' 
  | 'PICKED_UP' 
  | 'RETURNED' 
  | 'CANCELLED';

export type PaymentProvider = 'SSLCOMMERZ' | 'STRIPE';

export type PaymentStatus = 
  | 'PENDING' 
  | 'PAID' 
  | 'FAILED' 
  | 'CANCELLED' 
  | 'REFUNDED';
