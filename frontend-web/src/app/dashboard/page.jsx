'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  // State to track if we are on the client side and if we have redirected
  // This prevents flicker by ensuring we only redirect once the client is ready
  // and avoids unnecessary redirects if the user is already logged in.
  const [isClient, setIsClient] = useState(false); // Prevents error from SSR or hydration mismatch
  const [hasRedirected, setHasRedirected] = useState(false); // Uses hasRedirected to prevent infinite or premature redirects

  useEffect(() => {
    setIsClient(true); // Wait until client loads
  }, []);

  // Block render until auth is ready
  if ( loading || !isClient || (!user && !hasRedirected) || (!user && typeof window !== 'undefined')) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }

  // If user is not authenticated, redirect to login
  // Prevents page from rendering anything while auth is still loading or redirecting
  if (!user) {
    router.replace('/login');
    setHasRedirected(true); // Set to true to prevent flicker
    return null; // ⛔️ prevent flicker or error
  }

  useEffect(() => {
    if (isClient && !loading && !user && !hasRedirected) {
      router.replace('/login'); // safer than push to prevent flicker
      setHasRedirected(true);
    }
  }, [isClient, user, loading, router, hasRedirected]);

  
  
  
  
  // const handleLogout = async () => {
  //   await signOut(auth);
  //   router.push('/login');
  // };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button> */}
      </div>
      <p className="text-gray-700">
        You are logged in as: <strong>{user?.email}</strong>
      </p>
    </div>
  );
}
