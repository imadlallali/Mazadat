import { api } from './apiClient';

export const registerBuyer = (data) => api.post('/buyer/add', data);
export const registerSeller = (data) => api.post('/seller/add', data);

const BASE_URL = 'http://localhost:8080/api/v1';

async function verifyCredentials(token) {
    try {
        const response = await fetch(`${BASE_URL}/auth/ping`, {
            method: 'GET',
            headers: {
                Authorization: `Basic ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log('[Auth] Ping response status:', response.status);

        if (response.status === 401 || response.status === 403) {
            throw new Error('Invalid credentials');
        }

        if (!response.ok) {
            throw new Error(`Authentication failed with status ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('[Auth] Verification error:', error);
        throw error;
    }
}

export const login = async (username, password) => {
    try {
        if (!username || !password) {
            throw new Error('Username and password are required');
        }

        console.log('[Auth] Attempting login for user:', username);

        const token = btoa(`${username}:${password}`);

        const authData = await verifyCredentials(token);

        const user = {
            username,
            role: authData.data?.role || authData.role,
            token,
        };

        localStorage.setItem('user', JSON.stringify(user));
        console.log('[Auth] Login successful for user:', username, 'with role:', user.role);
        return user;
    } catch (error) {
        console.error('[Auth] Login error:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('user');
    console.log('[Auth] User logged out');
};

