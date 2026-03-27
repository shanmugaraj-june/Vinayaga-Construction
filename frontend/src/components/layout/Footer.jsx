import Link from 'next/link';
import Image from "next/image";
import { Phone, Mail, MapPin} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-400/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded">
                    <Image
                       src="/navLogo.png"
                       alt="Logo"
                       width={40}
                       height={40} 
                       className="rounded"
                     />
              </div>
              <div>
                <div style={{fontFamily:'Bebas Neue,serif'}} className="text-xl text-yellow-400 tracking-widest">VINAYAGA</div>
                <div className="text-[9px] text-gray-500 tracking-[0.3em] uppercase">Construction</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Building excellence across Chennai. Led by Civil Engineer Azhagar with uncompromising quality.
            </p>
          </div>
          <div>
            <h4 style={{fontFamily:'Bebas Neue,serif'}} className="text-lg text-yellow-400 tracking-widest mb-4">SERVICES</h4>
            <ul className="space-y-2">
              {['Residential Construction','Commercial Construction','Renovations and Remodeling','Interior Designing','Architectural Planning'].map(s => (
                <li key={s}><Link href="/services" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{fontFamily:'Bebas Neue,serif'}} className="text-lg text-yellow-400 tracking-widest mb-4">COMPANY</h4>
            <ul className="space-y-2">
              {[['/', 'Home'],['/about','About Us'],['/services','Services'],['/contact','Contact'],['/admin/login','Admin']].map(([href, label]) => (
                <li key={href}><Link href={href} className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{fontFamily:'Bebas Neue,serif'}} className="text-lg text-yellow-400 tracking-widest mb-4">CONTACT</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <a href="tel:+919092642503" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">+91 9092642503</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                <a href="mailto:vinayagaconstruction2024@gmail.com" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors break-all">vinayagaconstruction2024@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-yellow-400 mt-1 shrink-0" />
                <span className="text-sm text-gray-400">19/13 Karapaga Vinayagar Kovil Street, Ekkattuthangal, Chennai - 600032</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">2024 Vinayaga Construction. All rights reserved.</p>
          <p className="text-xs text-gray-600">Built with precision for excellence in construction</p>
        </div>
      </div>
    </footer>
  );
}
