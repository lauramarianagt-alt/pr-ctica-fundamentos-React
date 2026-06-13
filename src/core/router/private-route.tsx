import type { ReactNode } from 'react';
import { Navigate } from 'react-router';

type Props = {
    readonly children: ReactNode;
};

export const PrivateRoute: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return children;
};