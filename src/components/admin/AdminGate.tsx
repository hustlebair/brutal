import { useState, useEffect, type ReactNode } from 'react';

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();
      
      if (data.authenticated) {
        setIsAdmin(true);
      } else {
        setShowLoginModal(true);
      }
    } catch (error) {
      setShowLoginModal(true);
    } finally {
      setChecking(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAdmin(true);
        setShowLoginModal(false);
        setUsername('');
        setPassword('');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAdmin(false);
      setShowLoginModal(true);
      window.location.href = '/admin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-gray-600">Checking access...</div>
      </div>
    );
  }

  if (showLoginModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 border-2 border-black">
          <h2 className="text-2xl font-bold mb-2">Admin Login</h2>
          <p className="text-gray-600 mb-6">Enter your credentials to access admin tools:</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                placeholder="Enter username"
                autoFocus
                required
                disabled={loading}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#FF9900] focus:outline-none"
                placeholder="Enter password"
                required
                disabled={loading}
              />
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border-2 border-red-400 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#FF9900] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#ff8800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.href = '/';
                }}
                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="bg-[#FF9900] text-black px-4 py-2 flex justify-between items-center border-b-2 border-black">
        <span className="font-bold">Admin Mode Active</span>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-1 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Logout
        </button>
      </div>
      {children}
    </div>
  );
}

