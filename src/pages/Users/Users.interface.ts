export interface AddressInterface {
  city: string;
  state: string;
  postalCode: number;
  country: string;
}

export interface UserInterface {
  _id: string;
  role: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  address: AddressInterface;
}
