import type { Product, ProductCreateDTO } from '@features/products/entities/products';
import './product-form.css';
import { useState } from 'react';



interface Props {
  editedProduct?: Product;
  onAdd?: (data: ProductCreateDTO) => Promise<void>;
  onEdit?: (data: Product) => void;
}

export const ProductForm: React.FC<Props> = ({ editedProduct, onAdd, onEdit }) => {
  const initialProduct: Product | ProductCreateDTO = editedProduct || {
    name: '',
    price: 0,
    tags: [],
    image: '',
    isOnSale: false,
    description: '',
  };

  const [product, setProduct] = useState(initialProduct);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editedProduct && onEdit && 'id' in product) {
      onEdit(product);
      return;
    }

    if (onAdd) {
      onAdd(product);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setProduct({
      ...product,
      [name]:
        type === 'number'
          ? Number(value)
          : type === 'checkbox'
            ? (e.target as HTMLInputElement).checked
            : value,
    });
  };

  const isValid = product.name.trim() !== '' && Number(product.price) > 0;

  return (
    <section className="product-form">
      <h3>{editedProduct ? 'Editar Producto' : 'Crear Producto'}</h3>

      <form onSubmit={handleSubmit}>
        {'id' in product && (
          <label htmlFor="id" className="control-group">
            ID:
            <input type="text" id="id" value={product.id} readOnly />
          </label>
        )}

        <label htmlFor="name" className="control-group">
          Nombre:
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="price" className="control-group">
          Precio:
          <input
            type="number"
            id="price"
            name="price"
            value={product.price || ''}
            onChange={handleChange}
            required
            min={1}
            step="0.01"
          />
        </label>

        <label htmlFor="description" className="control-group">
          Descripción:
          <textarea
            id="description"
            name="description"
            value={product.description ?? ''}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="image" className="control-group">
          Imagen:
          <input
            type="text"
            id="image"
            name="image"
            value={product.image ?? ''}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="isOnSale" className="control-group">
          <input
            type="checkbox"
            id="isOnSale"
            name="isOnSale"
            checked={product.isOnSale ?? false}
            onChange={handleChange}
          />
          En oferta
        </label>

        <button type="submit" disabled={!isValid}>
          {editedProduct ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
      </form>
    </section>
  );
};
