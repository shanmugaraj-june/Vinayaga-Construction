'use client';
import Image from "next/image";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  Eye, EyeOff, Lock } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('vc_admin_token', data.token);
        localStorage.setItem('vc_admin_user', data.username);
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Image
                    src="/navLogo.png"
                    alt="Logo"
                    width={160}
                    height={160}
                    className="rounded"
                  />
          </div>
          <h1 style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl text-white tracking-wider">ADMIN LOGIN</h1>
          <p className="text-gray-500 text-sm mt-2">Vinayaga Construction Dashboard</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Username</label>
              <input className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                value={form.username} onChange={e => setForm(p => ({...p,username:e.target.value}))} placeholder="admin" />
            </div>
            <div>
              <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Password</label>
              <div className="relative">
                <input className="w-full bg-[#0D0D0D] border border-white/10 rounded-lg px-4 py-3 pr-12 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  type={show ? 'text' : 'password'} value={form.password}
                  onChange={e => setForm(p => ({...p,password:e.target.value}))} placeholder="••••••••" />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {show ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-yellow-400 text-black py-3 font-bold text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors disabled:opacity-60 mt-6">
              <Lock size={14}/> {loading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
