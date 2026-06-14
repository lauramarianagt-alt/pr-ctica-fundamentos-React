import './products-list.css';
import { ProductItem } from '../product-item/product-item';
import { useProducts } from './use-products';
import { Link } from 'react-router';
import { useState } from 'react';

export const ProductsList: React.FC = () => {
    const { products, error, editProduct,deleteProduct } =
        useProducts();


        const [search, setSearch] = useState('');
        const [onlyOffers, setOnlyOffers] = useState(false);
        
        const filteredProducts = products.filter((product) => {
            const matchesName = product.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesOffer = !onlyOffers || product.isOnSale;

            return matchesName && matchesOffer;
        });

       
    return (
        <>
            {error && <p className="error">{error}</p>}
            
            
                <div className="add-product">
                    <Link to="/products/new">
                        <button>Agregar producto</button>
                    </Link>
                </div>
            
            
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
