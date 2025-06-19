'use client';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function ProfilePage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Wait until client loads
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    useEffect(() => {
        handleLogout();
    }, []);

    // Block render until auth is ready
    if ( loading || !isClient || !user || (!user && typeof window !== 'undefined')) {
        return <p className="text-center mt-10">Checking authentication...</p>;
    }

    if (!user) {
      router.replace('/login');
      return null; // ⛔️ prevent flicker or error
    }
}