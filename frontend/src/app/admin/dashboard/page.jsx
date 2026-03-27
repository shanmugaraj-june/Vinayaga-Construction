'use client';
import Image from "next/image";
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Trash2, Phone, Mail, CheckCircle, Clock, Archive, RefreshCw } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const STATUS_STYLES = {
  new: 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20',
  contacted: 'bg-green-500/10 text-green-400 border-green-500/20',
  closed: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};
const STATUS_ICONS = {
  new: <Clock size={12}/>,
  contacted: <CheckCircle size={12}/>,
  closed: <Archive size={12}/>,
};

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [username, setUsername] = useState('');
  const router = useRouter();

  const getToken = () => typeof window !== 'undefined' ? localStorage.getItem('vc_admin_token') : null;

  const fetchEnquiries = useCallback(async () => {
    const token = getToken();
    if (!token) { router.push('/admin/login'); return; }
    setLoading(true);
    try {
      const url = filter === 'all' ? `${API_URL}/api/enquiry` : `${API_URL}/api/enquiry?status=${filter}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { router.push('/admin/login'); return; }
      const data = await res.json();
      setEnquiries(data.data || []);
    } catch { }
    setLoading(false);
  }, [filter, router]);

  useEffect(() => {
    const token = getToken();
    if (!token) { router.push('/admin/login'); return; }
    setUsername(localStorage.getItem('vc_admin_user') || 'Admin');
    fetchEnquiries();
  }, [fetchEnquiries, router]);

  const updateStatus = async (id, status) => {
    const token = getToken();
    await fetch(`${API_URL}/api/enquiry/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status })
    });
    fetchEnquiries();
  };

  const deleteEnquiry = async (id) => {
    if (!confirm('Delete this enquiry?')) return;
    const token = getToken();
    await fetch(`${API_URL}/api/enquiry/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchEnquiries();
  };

  const logout = () => {
    localStorage.removeItem('vc_admin_token');
    localStorage.removeItem('vc_admin_user');
    router.push('/admin/login');
  };

  const counts = {
    all: enquiries.length,
    new: enquiries.filter(e => e.status === 'new').length,
    contacted: enquiries.filter(e => e.status === 'contacted').length,
    closed: enquiries.filter(e => e.status === 'closed').length,
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8F8F0]">
      {/* Topbar */}
      <div className="bg-[#111111] border-b border-white/5 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-yellow-400 rounded flex items-center justify-center">
           <Image
                               src="/navLogo.png"
                               alt="Logo"
                               width={90}
                               height={50}
                               className="rounded"
                             />
          </div>
          <div>
            <div style={{fontFamily:'Bebas Neue,serif'}} className="text-lg text-yellow-400 tracking-widest leading-none">VINAYAGA</div>
            <div className="text-[9px] text-gray-500 tracking-widest uppercase">Admin Panel</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:block">Welcome, <span className="text-yellow-400">{username}</span></span>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {label:'Total',count:counts.all,color:'text-white'},
            {label:'New',count:counts.new,color:'text-yellow-400'},
            {label:'Contacted',count:counts.contacted,color:'text-green-400'},
            {label:'Closed',count:counts.closed,color:'text-gray-400'},
          ].map((s,i) => (
            <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-5">
              <div style={{fontFamily:'Bebas Neue,serif'}} className={`text-4xl tracking-wider ${s.color}`}>{s.count}</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">{s.label} Enquiries</div>
            </div>
          ))}
        </div>

        {/* Filter + Refresh */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {['all','new','contacted','closed'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-xs font-medium tracking-widest uppercase transition-colors ${filter === f ? 'bg-yellow-400 text-black' : 'bg-[#111111] text-gray-400 hover:text-white border border-white/5'}`}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={fetchEnquiries} className="flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition-colors">
            <RefreshCw size={14}/> Refresh
          </button>
        </div>

        {/* Table */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="text-center py-20 text-gray-500">Loading enquiries...</div>
          ) : enquiries.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No enquiries found</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Name','Contact','Service','Message','Status','Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-4 text-xs text-gray-500 uppercase tracking-widest font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((e, i) => (
                    <tr key={e._id} className={`border-b border-white/5 hover:bg-white/2 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.01]'}`}>
                      <td className="px-5 py-4">
                        <div className="font-medium text-sm text-white">{e.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{new Date(e.createdAt).toLocaleDateString('en-IN')}</div>
                      </td>
                      <td className="px-5 py-4">
                        <a href={`tel:${e.phone}`} className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-yellow-400 transition-colors mb-1">
                          <Phone size={11}/>{e.phone}
                        </a>
                        <a href={`mailto:${e.email}`} className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-yellow-400 transition-colors">
                          <Mail size={11}/>{e.email}
                        </a>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-xs bg-white/5 text-gray-300 px-2 py-1 rounded">{e.serviceType}</span>
                      </td>
                      <td className="px-5 py-4 max-w-xs">
                        <p className="text-xs text-gray-400 truncate">{e.message}</p>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border ${STATUS_STYLES[e.status]}`}>
                          {STATUS_ICONS[e.status]} {e.status}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          {e.status !== 'contacted' && (
                            <button onClick={() => updateStatus(e._id, 'contacted')}
                              className="text-xs text-green-400 hover:text-green-300 border border-green-400/20 px-2 py-1 rounded hover:bg-green-400/5 transition-colors">
                              Mark Contacted
                            </button>
                          )}
                          {e.status !== 'closed' && (
                            <button onClick={() => updateStatus(e._id, 'closed')}
                              className="text-xs text-gray-400 hover:text-gray-300 border border-white/10 px-2 py-1 rounded hover:bg-white/5 transition-colors">
                              Close
                            </button>
                          )}
                          <button onClick={() => deleteEnquiry(e._id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/5 p-1.5 rounded transition-colors">
                            <Trash2 size={14}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
