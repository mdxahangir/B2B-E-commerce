export interface Buyer {
    id?: number;
    country: string;
    role: 'buyer' | 'seller' | 'both';
    email: string;
    password: string;
    confirmPassword: string;
    companyName: string;
    firstName: string;
    lastName: string;
    tel: {
      code: string;
      area: string;
      number: string;
    };
    agreement: boolean;
  }
  