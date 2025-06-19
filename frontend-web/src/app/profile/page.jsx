'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// import { Dialog } from '@headlessui/react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [isClient, setIsClient] = useState(false);
  const [hasRedirected, setHasRedirected] = useState(false); // Prevents infinite or premature redirects

  const [name, setName] = useState('');
  const [nationality, setNationality] = useState('');
  const [experience, setExperience] = useState('');
  const [passportFile, setPassportFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [certName, setCertName] = useState('');
  const [documents, setDocuments] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  
  const handleDelete = async (type) => {
    if (!confirm(`Are you sure you want to delete your ${type}?`)) return;

    await fetch(`http://localhost:5000/api/upload/document/${user.uid}/${type}`, {
      method: 'DELETE',
    });

    // Refresh document list
    const res = await fetch(`http://localhost:5000/api/upload/${user.uid}`);
    const docs = await res.json();
    setDocuments(docs);
  };
    
    
  const shouldReplace = async (type, file) => {
    const existing = documents.find(doc => doc.type === type);
    if (!existing) return true;
    return confirm(`You already uploaded a ${type}. Replace?\nOld: ${existing.file_path.split('/').pop()}\nNew: ${file.name}`);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const profileData = {
      firebase_uid: user.uid,
      email: user.email,
      full_name: name,
      nationality,
      experience
    };
    
    // Save profile
    await fetch('http://localhost:5000/api/profile/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });

    // Upload passport
    if (passportFile && await shouldReplace('passport')) {
      const formData = new FormData();
      formData.append('file', passportFile);
      formData.append('type', 'passport');
      formData.append('firebase_uid', user.uid);
      await fetch('http://localhost:5000/api/upload/document', {
        method: 'POST',
        body: formData,
      });
    }

    // Upload certificate
    if (certFile && await shouldReplace('certificate')) {
      const formData = new FormData();
      formData.append('file', certFile);
      formData.append('type', 'certificate');
      formData.append('firebase_uid', user.uid);
      await fetch('http://localhost:5000/api/upload/document', {
        method: 'POST',
        body: formData,
      });
    }

    alert('Profile & documents saved!');
    
    const res = await fetch(`http://localhost:5000/api/upload/${user.uid}`);
    const docs = await res.json();
    setDocuments(docs);
  };

  useEffect(() => setIsClient(true), []);
  
  useEffect(() => {
    if (isClient && !loading && !user && !hasRedirected) {
      router.replace('/login');
      setHasRedirected(true);
    }
  }, [isClient, loading, user, router, hasRedirected]);
  
  
  useEffect(() => {
        if (user) {
          fetch(`http://localhost:5000/api/profile/${user.uid}`)
            .then(res => res.ok ? res.json() : null)
            .then(data => {
              if (data) {
                setName(data.full_name || '');
                setNationality(data.nationality || '');
                setExperience(data.experience || '');
              }
            });

          fetch(`http://localhost:5000/api/upload/${user.uid}`)
            .then(res => res.ok ? res.json() : [])
            .then(docs => setDocuments(docs));
        }
      }, [user]);

    // Block render until auth is ready
    // Prevents error from SSR or hydration mismatch
    if (!isClient || loading || !user || (!user && typeof window !== 'undefined')) {
      return <p className="text-center mt-10">Checking authentication...</p>;
    }

    if (!user) {
      router.replace('/login');
      return null; // ⛔️ prevent flicker or error
    }
    

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p className="text-sm mb-6 text-gray-600">
        Logged in as: <strong>{user.email}</strong>
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nationality</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Experience</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Upload Passport</label>
            <input type="file" onChange={(e) => setPassportFile(e.target.files[0])} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Certificate Name</label>
            <input type="text" value={certName} onChange={(e) => setCertName(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>
        <div>
            <label className="block text-sm font-medium mb-1">Upload Certificate</label>
            <input type="file" onChange={(e) => setCertFile(e.target.files[0])} />
        </div>
        <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Save Profile
        </button>
      </form>
      
      {documents.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Uploaded Documents</h2>
            <ul className="space-y-3">
              {documents.map((doc, index) => {
                const fileName = doc.file_path.split('/').pop();
                const icon = doc.type === 'passport' ? '🛂' : '📄';

                return (
                  <li key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded border">
                    <div>
                      <span className="mr-2">{icon}</span>
                      <a
                        href={`http://localhost:5000/${doc.file_path}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline"
                      >
                        {fileName}
                      </a>
                    </div>
                    <button
                      onClick={() => handleDelete(doc.type)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        
        {previewUrl && (
        <Dialog open={true} onClose={() => setPreviewUrl(null)} className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded w-[80%] max-h-[80%] overflow-auto">
            <button onClick={() => setPreviewUrl(null)} className="float-right text-red-600">Close</button>
            {previewUrl.endsWith('.pdf') ? (
              <iframe src={previewUrl} width="100%" height="500px" />
            ) : (
              <img src={previewUrl} className="max-w-full max-h-[500px]" />
            )}
          </div>
        </Dialog>
      )}
        
    </div>
  );
}
