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
      </div>
      {children}
    </div>
  );
}

