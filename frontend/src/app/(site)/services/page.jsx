'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Phone } from 'lucide-react';

const services = [
  {
    icon: '🏠',
    title: 'Residential Construction',
    tagline: 'Your Dream Home, Precisely Built',
    desc: 'From compact apartments to sprawling villas, we build residential spaces that blend structural integrity with aesthetic beauty. Our end-to-end approach covers planning, permits, construction, and finishing.',
    features: ['Custom floor plan design', 'Custom elevation design','Premium material selection','Vastu-compliant layouts','Earthquake-resistant structures','Modern electrical and plumbing','Post-construction warranty'],
    duration: '6-18 months',
    projects: '100+'
  },
  {
    icon: '🏢',
    title: 'Commercial Construction',
    tagline: 'Spaces That Mean Business',
    desc: 'We design and build commercial spaces that project professionalism and drive productivity. From office complexes to retail showrooms, our commercial builds are made to impress and endure.',
    features: ['Corporate office buildings','Retail and showroom spaces','Warehouse and industrial units','MEP system integration','Fire safety compliance','CCTV and access control ready'],
    duration: '8-24 months',
    projects: '50+'
  },
  {
    icon: '🔨',
    title: 'Renovations and Remodeling',
    tagline: 'Transform What You Have',
    desc: 'Breathe new life into existing spaces with our expert renovation services. Whether its a single room refresh or a complete structural overhaul, we deliver transformations that add real value.',
    features: ['Full or partial renovation','Kitchen and bathroom remodels','Structural modifications','Facade and exterior upgrades','Old wiring and plumbing replacement','Waterproofing and damp-proofing'],
    duration: '1-6 months',
    projects: '80+'
  },
  {
    icon: '🎨',
    title: 'Interior Designing',
    tagline: 'Spaces That Tell Your Story',
    desc: 'Our interior design team creates living and working environments that are as functional as they are beautiful. We work with your lifestyle, preferences, and budget to craft interiors that reflect who you are.',
    features: ['3D design visualization','Custom furniture design','False ceiling and lighting','Modular kitchen solutions','Wardrobe and storage design','Material and color consultation'],
    duration: '1-4 months',
    projects: '60+'
  },
  {
    icon: '📐',
    title: 'Architectural Planning',
    tagline: 'Where Vision Meets Precision',
    desc: 'Sound architecture is the foundation of every great structure. Our architectural planning service delivers comprehensive drawings, structural calculations, and approvals that set your project up for success.',
    features: ['Concept and schematic design','Structural drawings and BOQ','CMDA and DTCP approval drawings','3D elevation rendering','Site analysis and feasibility','Green building consultation'],
    duration: '2-8 weeks',
    projects: '150+'
  },
];

function useInView() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, v];
}

export default function ServicesPage() {
  const [hr, hv] = useInView();
  return (
    <div className="bg-[#0A0A0A] text-[#F8F8F0] pt-20">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1400&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0A0A0A]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">What We Offer</p>
          <h1 style={{fontFamily:'Bebas Neue,serif'}} className="text-6xl md:text-8xl tracking-wider text-white mb-6">OUR SERVICES</h1>
          <div className="w-16 h-1 bg-yellow-400 mb-6"/>
          <p className="text-gray-300 max-w-xl">Comprehensive construction solutions delivered with engineering precision and creative excellence.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {services.map((s, i) => (
            <div key={i} className={`grid md:grid-cols-5 gap-0 rounded-2xl overflow-hidden border border-white/5 hover:border-yellow-400/20 transition-all service-card ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              <div className="md:col-span-2 bg-[#111111] p-10 flex flex-col justify-center">
                <div className="text-5xl mb-4">{s.icon}</div>
                <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-3xl md:text-4xl text-white tracking-wider mb-2">{s.title}</h2>
                <p className="text-yellow-400 text-sm mb-6 italic">{s.tagline}</p>
                <div className="flex gap-6 text-center">
                  <div>
                    <div style={{fontFamily:'Bebas Neue,serif'}} className="text-2xl text-yellow-400 tracking-wider">{s.projects}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Projects</div>
                  </div>
                  <div className="w-px bg-white/10"/>
                  <div>
                    <div style={{fontFamily:'Bebas Neue,serif'}} className="text-2xl text-yellow-400 tracking-wider">{s.duration}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Timeline</div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 bg-[#0D0D0D] p-10">
                <p className="text-gray-300 text-sm leading-relaxed mb-8">{s.desc}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {s.features.map((f,j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle className="text-yellow-400 w-4 h-4 shrink-0"/>{f}
                    </div>
                  ))}
                </div>
                <Link href="/contact" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-2.5 font-bold text-xs tracking-widest uppercase rounded hover:bg-yellow-300 transition-colors">
                  GET QUOTE <ArrowRight size={12}/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={hr} className="py-20 bg-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4"
          style={{opacity:hv?1:0,transform:hv?'none':'translateY(20px)',transition:'all 0.7s ease'}}>
          <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-7xl text-black tracking-wider mb-6">NOT SURE WHERE TO START?</h2>
          <p className="text-black/70 text-lg mb-10">Talk to our expert team. We will assess your needs and recommend the perfect solution.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-black text-yellow-400 px-10 py-4 font-bold tracking-widest uppercase rounded hover:bg-black/80 transition-colors inline-flex items-center justify-center gap-2">
              FREE CONSULTATION <ArrowRight size={16}/>
            </Link>
            <a href="tel:+919092642503" className="border-2 border-black text-black px-10 py-4 font-bold tracking-widest uppercase rounded hover:bg-black hover:text-yellow-400 transition-colors inline-flex items-center justify-center gap-2">
              <Phone size={16}/> CALL: +91 90926 42503
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
