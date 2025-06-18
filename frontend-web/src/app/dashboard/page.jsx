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
  const [isClient, setIsClient] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false);
  
  useEffect(() => {
    setIsClient(true); // Wait until client loads
  }, []);

  useEffect(() => {
    if (isClient && !loading && !user) {
      router.replace('/login'); // safer than push to prevent flicker
      setHasRedirected(true);
    }
  }, [isClient, user, loading, router]);

  if (!user) {
    // router.replace('/login');
    // setHasRedirected(true); // Set to true to prevent flicker
    return null; // ⛔️ prevent flicker or error
  }
  
  if (!isClient || loading || (!user && !hasRedirected) || (!user && typeof window !== 'undefined')) {
    return <p className="text-center mt-10">Checking authentication...</p>;
  }
  
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
