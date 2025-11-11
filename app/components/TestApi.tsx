'use client';

import { useState } from 'react';
import { getApiUrl } from '../lib/api';

export default function TestApi() {
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testBackend = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${getApiUrl()}/test`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setResponse(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">API Test</h2>
      <p className="mb-2">Backend URL: {getApiUrl()}</p>
      <button 
        onClick={testBackend}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Backend'}
      </button>
      {response && (
        <pre className="mt-4 p-2 bg-white border border-gray-300 rounded-md text-gray-800 rounded text-sm overflow-auto">
          {response}
        </pre>
      )}
    </div>
  );
}