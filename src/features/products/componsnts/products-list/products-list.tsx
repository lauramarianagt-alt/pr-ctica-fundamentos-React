import './products-list.css';
import { ProductItem } from '../product-item/product-item';
import { ProductForm } from '../product-form/product-form';
import { useProducts } from './use-products';
import { useState } from 'react';
import type { ProductCreateDTO } from '../../entities/products';

export const ProductsList: React.FC = () => {
    const { products, error, editProduct, addProduct, deleteProduct } =
        useProducts();

        const [isAddOpen, setIsAddOpen] = useState(false);

        const [search, setSearch] = useState('');
        const [onlyOffers, setOnlyOffers] = useState(false);
        
        const filteredProducts = products.filter((product) => {
            const matchesName = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesOffer = !onlyOffers || product.isOnSale;

            return matchesName && matchesOffer;
        });

        const handleAddProduct = async (product: ProductCreateDTO) => {
            await addProduct(product);
            setIsAddOpen(false);
        };

    return (
        <>
            {error && <p className="error">{error}</p>}
            
            <details
                open={isAddOpen}
                onToggle={(event) => setIsAddOpen(event.currentTarget.open)}
            >
                  <summary>Add Product</summary>
                  <ProductForm onAdd={handleAddProduct} />
            </details>
            
            <div className="products-filters">
                    <input
                        type="search"
                        placeholder="Buscar producto..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    
                    <label>
                         <input
                             type="checkbox"
                             checked={onlyOffers}
                             onChange={(event) => setOnlyOffers(event.target.checked)}
                        />
                        Solo ofertas
                     </label>
            </div>

        

            {!error && (
                <section className="products-list">
                    <ul>
                        {filteredProducts.map((product) => (
                            <ProductItem
                                key={product.id}
                                product={product}
                                onDelete={deleteProduct}
                                onEdit={editProduct}
                            />
                        ))}
                    </ul>
                </section>
            )}
        </>
    );
};
