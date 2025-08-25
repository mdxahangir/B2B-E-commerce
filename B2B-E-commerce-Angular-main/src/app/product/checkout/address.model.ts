export interface Address {
  id?: number; // optional for new addresses before being saved
  fullName: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
  defaultShipping?: boolean; // optional with default false

  createdByCode?: string;
  createdByName?: string;
  createdAt?: Date;

  updatedByCode?: string;
  updatedByName?: string;
  updatedAt?: Date;
}
