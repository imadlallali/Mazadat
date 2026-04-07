import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requiredRole, blockedRole, redirectTo }) {
    try {
        const stored = localStorage.getItem('user');
        const user = stored ? JSON.parse(stored) : null;

        if (!user || !user.token) {
            return <Navigate to="/auth" replace />;
        }

        if (requiredRole && user.role !== requiredRole) {
            return <Navigate to={redirectTo || '/'} replace />;
        }

        if (blockedRole && user.role === blockedRole) {
            return <Navigate to={redirectTo || '/'} replace />;
        }

        // If children is a function, call it with the current user
        if (typeof children === 'function') {
            return children(user);
        }

        return children;
    } catch {
        return <Navigate to="/auth" replace />;
    }
}