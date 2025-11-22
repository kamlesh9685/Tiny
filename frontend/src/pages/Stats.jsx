import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function Stats(){
  const { code } = useParams();
  const [link, setLink] = useState(null);

  useEffect(()=>{
    fetch('/api/links/'+code).then(r=>r.json()).then(setLink).catch(()=>setLink(null));
  }, [code]);

  if (!link) return (
    <div className="p-6 max-w-xl mx-auto">Not found</div>
  );

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="w-full max-w-2xl">
        <div className="card">
          <h1 className="text-2xl font-bold mb-2">Stats for {code}</h1>
          <p className="mb-1"><strong>Target:</strong> <a href={link.url} className="text-indigo-600" target="_blank" rel="noreferrer">{link.url}</a></p>
          <p className="mb-1"><strong>Clicks:</strong> {link.clicks}</p>
          <p className="mb-1"><strong>Last clicked:</strong> {link.last_clicked ? new Date(link.last_clicked).toLocaleString() : '-'}</p>
          <p className="mb-1"><strong>Created:</strong> {new Date(link.created_at).toLocaleString()}</p>
          <div className="mt-4"><Link className="text-indigo-600" to="/">⬅ Back</Link></div>
        </div>
      </div>
    </div>
  );
}
