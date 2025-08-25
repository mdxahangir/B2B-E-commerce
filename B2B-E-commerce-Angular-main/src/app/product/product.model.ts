export interface ProductCategory {
categoryName: any;
  id?: number;
  name?: string;
}

export interface ProductSubCategory {
  id?: number;
  name?: string;
}

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  quantity: number;
  createdByCode?: string;
  createdByName?: string;
  updateAt?: Date;
  productCategory?: ProductCategory;
  productSubCategory?: ProductSubCategory;
}