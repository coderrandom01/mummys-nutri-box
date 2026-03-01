import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-brand-green-dark pt-16 pb-8 border-t border-brand-gold/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 overflow-hidden rounded-full flex items-center justify-center shadow-lg border border-brand-gold/20 bg-white">
                                <Image src="https://4ne9fphotqlkpkiu.public.blob.vercel-storage.com/mummys-nutri-box-logo.webp" alt="Mummy's Nutri Basket Logo" width={40} height={40} className="object-cover w-full h-full" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-bold leading-none tracking-tight text-brand-gold">Mummy's Nutri Basket</span>
                                <span className="text-xs text-gray-400 mt-1 italic">Healthy Choices, Mummy's Care</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-sm mb-6 leading-relaxed">
                            Premium quality dry fruits, nuts, and healthy combinations carefully curated for you and your family's health and wellness.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/mummysnutribasket?igsh=OGhoZXU3eDcxMG1k&utm_source=qr" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 rounded-full hover:bg-brand-gold/20 hover:text-brand-gold text-gray-400 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-gold/20 hover:text-brand-gold text-gray-400 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-brand-gold/20 hover:text-brand-gold text-gray-400 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link href="/" className="text-gray-400 hover:text-brand-gold text-sm transition-colors">Home</Link></li>
                            <li><Link href="/?filter=all" className="text-gray-400 hover:text-brand-gold text-sm transition-colors">All Combos</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-brand-gold text-sm transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-brand-gold text-sm transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-bold mb-4">Get in Touch</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>Email: support@mummysnutri.com</li>
                            <li>Phone: +91 88836 70422</li>
                            <li>Business Hours: <br />Mon - Sat: 9:00 AM - 7:00 PM</li>
                        </ul>
                    </div>

                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Mummy's Nutri Basket. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-brand-gold transition-colors">Refund Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
