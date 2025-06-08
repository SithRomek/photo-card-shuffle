
import { useState, useEffect } from 'react';

const ADMIN_SESSION_KEY = 'admin_authenticated';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Simple hash function to obfuscate password checking
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
};

// Obfuscated password hash
const ADMIN_HASH = simpleHash('HasloAdmina123456789');

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const sessionData = localStorage.getItem(ADMIN_SESSION_KEY);
      if (sessionData) {
        const { timestamp, hash } = JSON.parse(sessionData);
        const isValid = Date.now() - timestamp < SESSION_DURATION && hash === ADMIN_HASH;
        setIsAuthenticated(isValid);
        
        if (!isValid) {
          localStorage.removeItem(ADMIN_SESSION_KEY);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem(ADMIN_SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = (password: string): boolean => {
    const inputHash = simpleHash(password);
    
    if (inputHash === ADMIN_HASH) {
      const sessionData = {
        timestamp: Date.now(),
        hash: ADMIN_HASH
      };
      localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(sessionData));
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    authenticate,
    logout
  };
};
