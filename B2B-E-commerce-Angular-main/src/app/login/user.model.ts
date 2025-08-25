export interface User {
  id?: number;
  email: string;
  password: string;
  country?: string;
  role?: 'buyer' | 'seller' | 'both';
  companyName?: string;
  firstName?: string;
  lastName?: string;
  phoneCode?: string;
  phoneNumber?: string;
  agreedToTerms?: boolean;
  createdAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}