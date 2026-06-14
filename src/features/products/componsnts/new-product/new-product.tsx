import { useNavigate } from 'react-router';
import { ProductForm } from '../product-form/product-form';
import { productsRepo } from '@features/products/services/products-repo';
import type { ProductCreateDTO } from '@features/products/entities/products';

export const ProductNewPage: React.FC = () => {
  const navigate = useNavigate();

  const handleAddProduct = async (data: ProductCreateDTO) => {
    await productsRepo.createProduct(data);
    navigate('/products');
  };

  return <ProductForm onAdd={handleAddProduct} />;
};