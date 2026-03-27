'use client';
import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Moon,  } from 'lucide-react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('light', !dark);
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-black/50' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10  bg-yellow-400 flex items-center justify-center rounded">
              <Image
    src="/navLogo.png"
    alt="Logo"
    width={40}
    height={40} 
    className="rounded"
  />
            </div>
            <div>
              <div style={{fontFamily:'Bebas Neue,serif'}} className="text-xl text-yellow-400 tracking-widest leading-none">VINAYAGA</div>
              <div className="text-[9px] text-gray-400 tracking-[0.3em] uppercase">Construction</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-gray-300 hover:text-yellow-400 transition-colors">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="bg-yellow-400 text-black px-5 py-2 text-sm font-bold rounded hover:bg-yellow-300 transition-colors">
              GET QUOTE
            </Link>
            <button onClick={() => setDark(!dark)} className="text-gray-400 hover:text-yellow-400 transition-colors">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setDark(!dark)} className="text-gray-400">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setOpen(!open)} className="text-white">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-black/98 backdrop-blur-md border-t border-yellow-400/20 px-4 py-6 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}
              className="text-gray-200 text-lg font-medium hover:text-yellow-400 transition-colors py-2 border-b border-white/5">
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="bg-yellow-400 text-black text-center py-3 font-bold rounded mt-2">
            GET FREE QUOTE
          </Link>
        </div>
      )}
    </nav>
  );
}
