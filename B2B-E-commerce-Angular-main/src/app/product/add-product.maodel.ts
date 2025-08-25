export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
  minOrderQuantity: number;
  stockQuantity: number;
  weight: number;
  packageSize: {
    length: number;
    width: number;
    height: number;
  };
  shippingFrom: string;
  specifications: Specification[];
  images?: File[];
  status?: 'draft' | 'published';
}

export interface Specification {
  name: string;
  value: string;
}

export interface Category {
  id: string;
  name: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
}