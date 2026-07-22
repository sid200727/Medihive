import { createContext, useContext, useState } from 'react';
import { demoUsers } from '../utils/mockData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('medihive_user');
    return stored ? JSON.parse(stored) : null;
  });

  // Demo login against mock users. Swap for authService.login() once
  // the Django backend is running — see services/api.js.
  const login = (username, password) => {
    const match = Object.values(demoUsers).find(
      (u) => u.username === username && u.password === password
    );
    if (!match) {
      return { success: false, error: 'Invalid username or password' };
    }
    localStorage.setItem('medihive_access_token', 'demo-token');
    localStorage.setItem('medihive_user', JSON.stringify(match));
    setUser(match);
    return { success: true, user: match };
  };

  const logout = () => {
    localStorage.removeItem('medihive_access_token');
    localStorage.removeItem('medihive_refresh_token');
    localStorage.removeItem('medihive_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
