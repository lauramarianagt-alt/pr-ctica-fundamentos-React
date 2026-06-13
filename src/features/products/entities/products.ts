export type Product = {
  id: string;
  name: string;
  price: number;
  tags?: string[];
  image?: string;
  isOnSale?: boolean;
  description?: string;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ProductCreateDTO = Omit<Product, 'id' | 'userId' | 'createdAt' | 'updatedAt'>;

export type ProductUpdateDTO = Partial<ProductCreateDTO>;