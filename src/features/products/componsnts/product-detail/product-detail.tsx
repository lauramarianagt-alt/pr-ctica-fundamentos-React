import type { Product } from '@features/products/entities/products';
import { useNavigate } from 'react-router';
import { useDetails } from './use-details';
import { Card } from '@core/components/card/card';
import './product-detail.css';

type Props = {
    id: Product['id'];
};

export const ProductDetail: React.FC<Props> = ({ id }) => {
    const { product } = useDetails(id);
    const navigate = useNavigate();

    const handleGoBack = (): void => {
        navigate('/products');
    };

    return (
        <Card title={product?.name}>
            {product ? (
                <article className="product-card">
                    <dl>
                        <dt>ID:</dt>
                        <dd>{product.id}</dd>
                        <dt>Nombre:</dt>
                        <dd>{product.name}</dd>
                        <dt>Precio:</dt>
                        <dd>{product.price ?? 'Sin precio'} €</dd>
                        <dt>Tags:</dt>
                        <dd>{product.tags?.join(', ') || 'Sin tags'}</dd>
                        <dt>Oferta:</dt>
                        <dd>{product.isOnSale ? 'Sí' : 'No'}</dd>
                        <dt>Descripción:</dt>
                        <dd>{product.description || 'Sin descripción'}</dd>
                    </dl>
                </article>
            ) : (
                <p>Invalid product id [{id}]</p>
            )}
            <button onClick={handleGoBack}>Back to products list</button>
        </Card>
    );
};
