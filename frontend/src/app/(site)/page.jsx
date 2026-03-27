'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Phone, ChevronDown } from 'lucide-react';

const services = [
  { icon: '🏠', title: 'Residential Construction', desc: 'Dream homes built with precision. From foundation to finish, we craft spaces that reflect your vision and lifestyle.' },
  { icon: '🏢', title: 'Commercial Construction', desc: 'Modern commercial spaces designed for productivity and lasting impressions. Built to the highest engineering standards.' },
  { icon: '🔨', title: 'Renovations and Remodeling', desc: 'Breathe new life into existing spaces. Expert renovations that transform and add significant value to your property.' },
  { icon: '🎨', title: 'Interior Designing', desc: 'Stunning interiors that balance aesthetics with function. Curated designs tailored for every lifestyle and budget.' },
  { icon: '📐', title: 'Architectural Planning', desc: 'Comprehensive blueprints and structural planning. Where creativity meets engineering excellence.' },
];

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Home Owner', text: 'Vinayaga Construction built our 3BHK dream home in just 8 months. Azhagar sirs attention to detail is exceptional. Best decision we ever made!', rating: 5 },
  { name: 'Priya Sundaram', role: 'Business Owner', text: 'They renovated our entire office space beautifully. Professional team, on-time delivery, and stunning results. Highly recommended!', rating: 5 },
  { name: 'Murugan Pillai', role: 'Villa Owner', text: 'Outstanding work on our villas interior design. The team understood our vision perfectly and delivered beyond expectations.', rating: 5 },
];

const stats = [
  { value: '200+', label: 'Projects Completed' },
  { value: '150+', label: 'Happy Clients' },
  { value: '10+', label: 'Years Experience' },
  { value: '5 Star', label: 'Average Rating' },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function HomePage() {
  const [statsRef, statsInView] = useInView();
  const [servRef, servInView] = useInView();
  const [testRef, testInView] = useInView();
  const [whyRef, whyInView] = useInView();

  return (
    <div className="bg-[#0A0A0A] text-[#F8F8F0]">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80')] bg-cover bg-center opacity-30" />
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-yellow-400/8 to-transparent" />
        </div>
        <div className="absolute inset-0 z-0 opacity-5" style={{backgroundImage:'linear-gradient(#F5B800 1px,transparent 1px),linear-gradient(90deg,#F5B800 1px,transparent 1px)',backgroundSize:'60px 60px'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span className="text-yellow-400 text-xs font-medium tracking-widest uppercase">Chennai Premier Construction Company</span>
            </div>
            <h1 style={{fontFamily:'Bebas Neue,serif'}} className="text-6xl sm:text-7xl lg:text-9xl text-white leading-none tracking-wider mb-6">
              BUILD YOUR<br/>
              <span className="text-yellow-400">DREAM</span><br/>
              WITH US
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
              Expert construction services across Chennai. From blueprints to breathtaking results — delivered with civil engineering precision by <span className="text-yellow-400 font-semibold">Azhagar</span>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="bg-yellow-400 text-black px-8 py-4 font-bold text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:bg-yellow-300 transition-all hover:shadow-lg hover:shadow-yellow-400/30">
                GET FREE QUOTE <ArrowRight size={16}/>
              </Link>
              <Link href="/services" className="border border-white/20 text-white px-8 py-4 font-medium text-sm tracking-widest uppercase rounded flex items-center justify-center gap-2 hover:border-yellow-400 hover:text-yellow-400 transition-all">
                VIEW SERVICES
              </Link>
            </div>
            <div className="flex items-center gap-4 mt-12">
              <div className="flex -space-x-2">
                {['RK','PS','MP'].map((i,idx) => (
                  <div key={idx} className="w-9 h-9 rounded-full bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-xs font-bold text-yellow-400">{i}</div>
                ))}
              </div>
              <div>
                <div className="flex text-yellow-400 text-sm">{'★★★★★'}</div>
                <p className="text-xs text-gray-400">150+ satisfied clients across Chennai</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          <ChevronDown className="text-yellow-400 animate-bounce" size={20}/>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="bg-yellow-400 py-3 overflow-hidden">
        <div className="marquee-track flex whitespace-nowrap">
          {Array(10).fill(['RESIDENTIAL','COMMERCIAL','RENOVATION','INTERIOR DESIGN','ARCHITECTURAL PLANNING','QUALITY BUILD']).flat().map((t,i) => (
            <span key={i} className="text-black font-bold text-xs tracking-widest mx-6" style={{fontFamily:'Bebas Neue,serif'}}>◆ {t}</span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section ref={statsRef} className="py-20 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s,i) => (
            <div key={i} className="text-center" style={{opacity:statsInView?1:0,transform:statsInView?'none':'translateY(30px)',transition:`all 0.7s ease ${i*100}ms`}}>
              <div style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-6xl text-yellow-400 tracking-wider">{s.value}</div>
              <div className="text-gray-400 text-xs mt-2 tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section ref={servRef} className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" style={{opacity:servInView?1:0,transform:servInView?'none':'translateY(30px)',transition:'all 0.6s ease'}}>
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">What We Do</p>
            <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-7xl tracking-wider text-white">OUR SERVICES</h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"/>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s,i) => (
              <div key={i} className="service-card bg-[#111111] border border-white/5 rounded-xl p-8 hover:border-yellow-400/30 cursor-default"
                style={{opacity:servInView?1:0,transform:servInView?'none':'translateY(40px)',transition:`all 0.6s ease ${i*100}ms`}}>
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 style={{fontFamily:'Bebas Neue,serif'}} className="text-xl text-white tracking-wider mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                <Link href="/services" className="mt-6 flex items-center gap-2 text-yellow-400 text-xs font-medium tracking-widest uppercase hover:gap-3 transition-all">
                  Learn More <ArrowRight size={12}/>
                </Link>
              </div>
            ))}
            <div className="service-card bg-yellow-400 rounded-xl p-8 flex flex-col justify-between">
              <div>
                <div style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl text-black tracking-wider mb-4">START YOUR PROJECT TODAY</div>
                <p className="text-black/70 text-sm">Get a free consultation from our expert team.</p>
              </div>
              <Link href="/contact" className="mt-8 bg-black text-yellow-400 px-6 py-3 font-bold text-sm tracking-widest uppercase rounded inline-flex items-center gap-2 hover:bg-black/80 transition-colors">
                GET QUOTE <ArrowRight size={14}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section ref={whyRef} className="py-24 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div style={{opacity:whyInView?1:0,transform:whyInView?'none':'translateX(-30px)',transition:'all 0.7s ease'}}>
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Why Choose Us</p>
            <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-6xl tracking-wider text-white mb-8">BUILDING TRUST SINCE DAY ONE</h2>
            <div className="space-y-5">
              {[
                ['Licensed Civil Engineer', 'Led by Azhagar — certified engineer with 10+ years of expertise'],
                ['Premium Quality Materials', 'Top-grade materials sourced from trusted suppliers only'],
                ['On-Time Delivery', 'We respect your timeline and deliver projects as promised'],
                ['Transparent Pricing', 'No hidden costs. Complete transparency throughout the project'],
                ['Post-Build Support', 'Dedicated after-service support for all completed projects'],
              ].map(([t,d],i) => (
                <div key={i} className="flex gap-4">
                  <CheckCircle className="text-yellow-400 shrink-0 mt-0.5" size={20}/>
                  <div>
                    <div className="font-semibold text-white text-sm">{t}</div>
                    <div className="text-gray-400 text-sm">{d}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/about" className="mt-10 inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 font-bold text-sm tracking-widest uppercase rounded hover:bg-yellow-300 transition-colors">
              ABOUT US <ArrowRight size={14}/>
            </Link>
          </div>
          <div style={{opacity:whyInView?1:0,transform:whyInView?'none':'translateX(30px)',transition:'all 0.7s ease 0.2s'}} className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80')] bg-cover bg-center" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black p-6 rounded-xl z-20">
              <div style={{fontFamily:'Bebas Neue,serif'}} className="text-4xl tracking-wider">10+</div>
              <div className="text-xs font-bold uppercase tracking-wider mt-1">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section ref={testRef} className="py-24 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-yellow-400 text-xs tracking-[0.4em] uppercase mb-3">Client Stories</p>
            <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-7xl tracking-wider text-white">WHAT THEY SAY</h2>
            <div className="w-16 h-1 bg-yellow-400 mx-auto mt-4"/>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t,i) => (
              <div key={i} className="bg-[#111111] border border-white/5 rounded-xl p-8 hover:border-yellow-400/20 transition-all"
                style={{opacity:testInView?1:0,transform:testInView?'none':'translateY(30px)',transition:`all 0.6s ease ${i*150}ms`}}>
                <div className="flex text-yellow-400 mb-4 text-sm">{'★'.repeat(t.rating)}</div>
                <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-white">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-yellow-400 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)',backgroundSize:'40px 40px'}}/>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h2 style={{fontFamily:'Bebas Neue,serif'}} className="text-5xl md:text-7xl text-black tracking-wider mb-6">READY TO BUILD SOMETHING GREAT?</h2>
          <p className="text-black/70 text-lg mb-10">Get your free consultation today. Our expert team is ready to bring your vision to life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-black text-yellow-400 px-10 py-4 font-bold tracking-widest uppercase rounded hover:bg-black/80 transition-colors inline-flex items-center justify-center gap-2">
              GET FREE QUOTE <ArrowRight size={16}/>
            </Link>
            <a href="tel:+919092642503" className="border-2 border-black text-black px-10 py-4 font-bold tracking-widest uppercase rounded hover:bg-black hover:text-yellow-400 transition-colors inline-flex items-center justify-center gap-2">
              <Phone size={16}/> CALL NOW
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
