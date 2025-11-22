import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {

  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-switch API URL (local or production)
  const API = import.meta.env.VITE_API_BASE;

  const load = () =>
    fetch(`${API}/links`)
      .then(r => r.json())
      .then(setLinks)
      .catch(() => setLinks([]));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, code })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');

      setUrl('');
      setCode('');
      load();

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  const remove = async (c) => {
    if (!confirm('Delete ' + c + '?')) return;
    await fetch(`${API}/links/${c}`, { method: 'DELETE' });
    load();
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-6 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="w-full max-w-4xl">

        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600">✨ TinyLink</h1>
          <div className="text-sm text-gray-600">Express + MongoDB + Vite</div>
        </header>

        <div className="card">
          <form className="flex gap-3 mb-4" onSubmit={submit}>
            <input
              className="border p-2 flex-1 rounded"
              placeholder="https://example.com/..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />

            <input
              className="border p-2 w-40 rounded"
              placeholder="custom code (3-15)"
              value={code}
              onChange={e => setCode(e.target.value)}
            />

            <button className="btn" disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </button>
          </form>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500">
                <th className="pb-2">Code</th>
                <th className="pb-2">URL</th>
                <th className="pb-2">Clicks</th>
                <th className="pb-2">Last Clicked</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {links.length === 0 && (
                <tr><td colSpan="5" className="text-gray-500 p-4">No links yet</td></tr>
              )}

              {links.map(l => (
                <tr key={l.code} className="border-t">
                  <td className="py-2 text-indigo-600">
                    <a href={'/' + l.code} target="_blank" rel="noreferrer">{l.code}</a>
                  </td>

                  <td className="py-2 truncate max-w-md">{l.url}</td>

                  <td className="py-2">{l.clicks}</td>

                  <td className="py-2 text-sm text-gray-500">
                    {l.last_clicked ? new Date(l.last_clicked).toLocaleString() : '-'}
                  </td>

                  <td className="py-2">
                    <button
                      className="mr-2"
                      onClick={() => navigator.clipboard.writeText(window.location.origin + '/' + l.code)}
                    >
                      Copy
                    </button>

                    <Link className="text-indigo-600 mr-2" to={'/code/' + l.code}>
                      Stats
                    </Link>

                    <button className="text-red-600" onClick={() => remove(l.code)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}
