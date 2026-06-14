import { Navigate, Route, Routes } from 'react-router';
import { ProductsPage } from '@features/products/products-page';
import { Login } from '@features/users/components/login/login';
import { PrivateRoute } from './private-route';
import { ProductNewPage } from '@features/products/componsnts/new-product/new-product';

export const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
            <Route path="/products/new" element={<PrivateRoute><ProductNewPage /></PrivateRoute>} />
            <Route path="/products/:id" element={<PrivateRoute><ProductsPage /></PrivateRoute>} />
            <Route path="*" element={<p>404 Not Found</p>} />
        </Routes>
  );
};