'use client';
import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const services = ['Residential Construction','Commercial Construction','Renovations & Remodeling','Interior Designing','Architectural Planning','Other'];

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', phone:'', email:'', serviceType:'', message:'' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.serviceType) e.serviceType = 'Please select a service';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    try {
      const res = await fetch(`${API_URL}/api/enquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name:'', phone:'', email:'', serviceType:'', message:'' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inp = 'w-full bg-[#111111] border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors placeholder:text-gray-600';

  return (
    <div className="bg-[#0A0A0A] text-[#F8F8F0] pt-20">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent"/>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Get In Touch</p>
          <h1 style={{fontFamily:'Bebas Neue,serif'}} className="text-6xl md:text-8xl tracking-wider text-white mb-6">CONTACT US</h1>
          <div className="w-16 h-1 bg-yellow-400"/>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-3xl text-white tracking-wider mb-6">LET'S BUILD TOGETHER</h2>
              <p className="text-gray-400 text-sm leading-relaxed">Have a project in mind? We would love to hear about it. Fill in the form or reach us directly.</p>
            </div>
            {[
              {icon:<Phone className="w-5 h-5"/>, label:'Phone', val:'+91 9092642503', href:'tel:+919092642503'},
              {icon:<Mail className="w-5 h-5"/>, label:'Email', val:'vinayagaconstruction2024@gmail.com', href:'mailto:vinayagaconstruction2024@gmail.com'},
              {icon:<MapPin className="w-5 h-5"/>, label:'Address', val:'19/13 Karapaga Vinayagar Kovil Street, Ekkattuthangal, Chennai - 600032', href:null},
            ].map((c,i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-yellow-400/10 border border-yellow-400/20 rounded-lg flex items-center justify-center text-yellow-400 shrink-0">{c.icon}</div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-widest mb-0.5">{c.label}</div>
                  {c.href ? (
                    <a href={c.href} className="text-sm text-gray-300 hover:text-yellow-400 transition-colors break-all">{c.val}</a>
                  ) : (
                    <p className="text-sm text-gray-300">{c.val}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div className="rounded-xl overflow-hidden border border-white/10 h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.1736388826063!2d80.19780507454917!3d13.024558387279177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52677b5e3c3e23%3A0x3a8e38e9d34adc!2sEkkattuthangal%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                width="100%" height="100%" style={{border:0}} allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Vinayaga Construction Location"
              />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="bg-[#111111] border border-white/5 rounded-2xl p-8">
              <h3 style={{fontFamily:'Bebas Neue,serif'}} className="text-2xl text-white tracking-wider mb-8">SEND AN ENQUIRY</h3>

              {status === 'success' && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                  <CheckCircle className="text-green-400 w-5 h-5 shrink-0"/>
                  <p className="text-green-400 text-sm">Enquiry submitted! We will contact you within 24 hours.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                  <AlertCircle className="text-red-400 w-5 h-5 shrink-0"/>
                  <p className="text-red-400 text-sm">Something went wrong. Please try again or call us directly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Full Name *</label>
                    <input className={inp} placeholder="Your Name" value={form.name}
                      onChange={e => setForm(p => ({...p,name:e.target.value}))} />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Phone *</label>
                    <input className={inp} placeholder="+91 XXXXX XXXXX" value={form.phone}
                      onChange={e => setForm(p => ({...p,phone:e.target.value}))} />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Email *</label>
                  <input className={inp} placeholder="your@email.com" type="email" value={form.email}
                    onChange={e => setForm(p => ({...p,email:e.target.value}))} />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Service Type *</label>
                  <select className={inp + ' cursor-pointer'} value={form.serviceType}
                    onChange={e => setForm(p => ({...p,serviceType:e.target.value}))}>
                    <option value="">Select a service</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>}
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-widest mb-2 block">Message *</label>
                  <textarea className={inp + ' resize-none'} rows={5} placeholder="Tell us about your project..."
                    value={form.message} onChange={e => setForm(p => ({...p,message:e.target.value}))}/>
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>
                <button type="submit" disabled={status === 'loading'}
                  className="w-full bg-yellow-400 text-black py-4 font-bold text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors disabled:opacity-60">
                  {status === 'loading' ? 'SENDING...' : (<>SEND ENQUIRY <Send size={14}/></>)}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
