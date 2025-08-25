// models/user.model.ts
export interface Users {
    id?: number;
    country: string;
    role: 'buyer' | 'seller' | 'both';
    email: string;
    password: string;
    companyName: string;
    firstName: string;
    lastName: string;
    phoneCode: string;
    phoneArea: string;
    phoneNumber: string;
    agreedToTerms: boolean;
    createdAt?: string;
  }
 