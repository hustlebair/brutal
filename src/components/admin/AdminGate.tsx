import { useState, useEffect, type ReactNode } from 'react';

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check URL params
    const params = new URLSearchParams(window.location.search);
    const adminParam = params.get('admin');
    
    if (adminParam === 'on') {
      localStorage.setItem('hl_admin', 'true');
      setIsAdmin(true);
      setChecking(false);
    } else if (adminParam === 'off') {
      localStorage.removeItem('hl_admin');
      setIsAdmin(false);
      setChecking(false);
    } else {
      // Check localStorage
      const stored = localStorage.getItem('hl_admin');
      if (stored === 'true') {
        setIsAdmin(true);
        setChecking(false);
      } else {
        // Check if passcode is required
        const adminPass = import.meta.env.PUBLIC_ADMIN_PASS;
        if (adminPass) {
          setShowPasscodeModal(true);
        }
        setChecking(false);
      }
    }
  }, []);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPass = import.meta.env.PUBLIC_ADMIN_PASS;
    if (passcode === adminPass) {
      localStorage.setItem('hl_admin', 'true');
      setIsAdmin(true);
      setShowPasscodeModal(false);
      setPasscode('');
    } else {
      alert('Incorrect passcode');
      setPasscode('');
    }
  };

  const handleDisableAdmin = () => {
    localStorage.removeItem('hl_admin');
    setIsAdmin(false);
    window.location.href = '/admin?admin=off';
  };

  if (checking) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Checking access...</div>
      </div>
    );
  }

  if (showPasscodeModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold mb-4">Admin Access</h2>
          <p className="text-gray-600 mb-4">Enter passcode to access admin tools:</p>
          <form onSubmit={handlePasscodeSubmit}>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black rounded-lg mb-4"
              placeholder="Enter passcode"
              autoFocus
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-[#FF9900] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#ff8800] transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowPasscodeModal(false);
                  window.location.href = '/';
                }}
                className="flex-1 bg-gray-200 text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-300 transition-colors"
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
      <div className="bg-[#FF9900] text-black px-4 py-2 flex justify-between items-center">
        <span className="font-bold">Admin Mode Active</span>
        <button
          onClick={handleDisableAdmin}
          className="bg-black text-white px-4 py-1 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
        >
          Disable Admin
        </button>
      </div>
      {children}
    </div>
  );
}

