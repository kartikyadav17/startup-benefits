'use client';

import { useEffect, useState } from 'react';
import { authAPI } from '@/lib/api';
import { User } from '@/types';
import { isAuthenticated } from '@/lib/auth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getProfile();
        setUser(response.user);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
};
