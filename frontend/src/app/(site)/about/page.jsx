'use client';
import Image from "next/image";
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Award,  Users, Building2, CheckCircle } from 'lucide-react';

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

export default function AboutPage() {
  const [r1, v1] = useInView();
  const [r2, v2] = useInView();
  return (
    <div className="bg-[#0A0A0A] text-[#F8F8F0] pt-20">
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1400&q=80')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0A0A0A]" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Our Story</p>
          <h1 style={{fontFamily:'Bebas Neue,serif'}} className="text-6xl md:text-8xl tracking-wider text-white mb-6">ABOUT VINAYAGA</h1>
          <div className="w-16 h-1 bg-yellow-400" />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div ref={r1} style={{opacity:v1?1:0,transform:v1?'none':'translateX(-30px)',transition:'all 0.7s ease'}}>
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Who We Are</p>
            <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl md:text-5xl tracking-wider text-white mb-6">BUILDING CHENNAI'S FUTURE</h2>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>Vinayaga Construction was founded with a singular vision: to deliver world-class construction services to Chennai with uncompromising quality, transparency, and engineering excellence.</p>
              <p>Based in Ekkattuthangal, Chennai, we have grown to become a trusted name in residential and commercial construction across the city. Our work spans dream homes, commercial complexes, stunning renovations, and thoughtfully designed interiors.</p>
              <p>Every project we undertake carries the weight of our reputation and our clients trust — and we take both seriously.</p>
            </div>
          </div>
          <div style={{opacity:v1?1:0,transform:v1?'none':'translateX(30px)',transition:'all 0.7s ease 0.2s'}}>
            <div className="grid grid-cols-2 gap-4">
              {[{n:'200+',l:'Projects Completed'},{n:'150+',l:'Happy Clients'},{n:'10+',l:'Years Experience'},{n:'5',l:'Service Categories'}].map((s,i) => (
                <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-6 hover:border-yellow-400/30 transition-colors">
                  <div style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl text-yellow-400 tracking-wider">{s.n}</div>
                  <div className="text-gray-400 text-xs uppercase tracking-widest mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={r2} className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-2" style={{opacity:v2?1:0,transform:v2?'none':'translateY(30px)',transition:'all 0.7s ease'}}>
              <div className="relative">
                <div className="aspect-[3/4] bg-gradient-to-br from-yellow-400/20 to-black rounded-2xl overflow-hidden border border-yellow-400/20 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-yellow-400">
                      <Image
                          src="/navLogo.png"
                          alt="Logo"
                          width={320}
                          height={320}
                          className="rounded-full"
                      />
                    </div>
                    <div style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl text-white tracking-wider">AZHAGAR</div>
                    <div className="text-yellow-400 text-sm mt-2 tracking-widest uppercase">Civil Engineer and Founder</div>
                    <div className="mt-4 space-y-1 text-xs text-gray-400">
                      <div>B.E. Civil Engineering</div>
                      <div>10+ Years Experience</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-black p-4 rounded-xl text-center">
                  <Award className="w-6 h-6 mx-auto"/>
                  <div className="text-xs font-bold mt-1 uppercase">Licensed</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-3" style={{opacity:v2?1:0,transform:v2?'none':'translateY(30px)',transition:'all 0.7s ease 0.2s'}}>
              <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Meet The Founder</p>
              <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl md:text-5xl tracking-wider text-white mb-6">THE MAN BEHIND THE BUILD</h2>
              <div className="space-y-4 text-gray-300 text-sm leading-relaxed mb-8">
                <p>Azhagar is a qualified Civil Engineer with over a decade of hands-on experience in structural design, project management, and construction supervision across Chennai.</p>
                <p>His philosophy: a building must be beautiful, structurally sound, and perfectly functional. This three-pillar approach defines every Vinayaga Construction project.</p>
                <p>From personally reviewing architectural blueprints to being present at critical construction milestones, Azhagar brings an owner's passion and an engineer's precision to every build.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {['Structural Engineering','Project Management','Site Supervision','Quality Control','Cost Estimation','Client Relations'].map((s,i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="text-yellow-400 w-4 h-4 shrink-0"/>{s}
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-3 font-bold text-sm tracking-widest uppercase rounded hover:bg-yellow-300 transition-colors">
                WORK WITH US <ArrowRight size={14}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Our Foundation</p>
            <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-6xl tracking-wider text-white">MISSION AND VALUES</h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"/>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {icon:<Building2 size={28}/>,title:'Our Mission',desc:'To build spaces that improve lives delivering exceptional quality construction that stands as a legacy for generations.'},
              {icon:<Users size={28}/>,title:'Client First',desc:'Every decision is made with our clients best interest in mind. Your vision is our blueprint.'},
              {icon:<Award size={28}/>,title:'Excellence Always',desc:'We never settle for good enough. Every wall, every joint, every finish must meet our uncompromising standards.'},
            ].map((v,i) => (
              <div key={i} className="service-card bg-[#111111] border border-white/5 rounded-xl p-8 hover:border-yellow-400/30 transition-all">
                <div className="text-yellow-400 mb-4">{v.icon}</div>
                <h3 style={{fontFamily:'Bebas Neue,serif'}} className="text-2xl text-white tracking-wider mb-3">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
