import { type ReactNode } from 'react';

interface AdminGateProps {
  children: ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  // No authentication required - admin is open
  return (
    <div>
      <div className="bg-[#FF9900] text-black px-4 py-2 flex justify-between items-center border-b-2 border-black">
        <span className="font-bold">Admin Mode Active</span>
        <a
          href="/"
          className="px-4 py-2 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
        >
          ← Back to Homepage
        </a>
      </div>
      {children}
    </div>
  );
}

