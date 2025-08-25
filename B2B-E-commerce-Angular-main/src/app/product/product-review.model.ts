export interface ProductReview {
  id?: number;
  rating: number;
  comment: string;
  createdBy?: any; // user object returned by backend
  createdAt?: Date;
}
