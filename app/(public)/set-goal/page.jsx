import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// dynamic import the client component to avoid hydration warnings (optional)
const SetGoalClient = dynamic(() => import('./SetGoalClient'), { ssr: false });

export default function SetGoalPage() {
  return (
    <main>
      <h1 className="sr-only">Set Goal</h1>
      <Suspense fallback={<div>Loading goal UI…</div>}>
        <SetGoalClient />
      </Suspense>
    </main>
  );
}
