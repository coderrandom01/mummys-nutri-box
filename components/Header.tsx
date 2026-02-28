"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import Cart from "./Cart";

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const cartItemsCount = useCartStore((state) => state.getCartItemsCount());

    return (
        <>
            <header className="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-brand-gold/10 bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-brand-green-dark/95">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex items-center justify-between py-4 md:py-6">

                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Link href="/" className="group flex items-center space-x-3">
                                <div className="w-14 h-14 md:w-20 md:h-20 overflow-hidden rounded-full flex items-center justify-center shadow-lg border border-brand-gold/20 bg-white group-hover:border-brand-gold transition-colors duration-300 flex-shrink-0">
                                    <Image src="https://4ne9fphotqlkpkiu.public.blob.vercel-storage.com/mummys-nutri-box-logo.webp" alt="Mummy's Nutri Basket Logo" width={80} height={80} unoptimized className="object-cover w-full h-full" />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-xl md:text-2xl font-black leading-none tracking-tight text-brand-green dark:text-brand-gold">Mummy's Nutri Basket</span>
                                    <span className="text-xs md:text-sm text-brand-green-light dark:text-gray-300 mt-1.5 font-bold italic">Healthy Choices, Mummy's Care</span>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold leading-6 text-brand-green dark:text-gray-300">
                            <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
                            <Link href="/?filter=best-sellers" className="hover:text-brand-gold transition-colors">Best Sellers</Link>
                            <Link href="/?filter=all" className="hover:text-brand-gold transition-colors">All Combos</Link>
                            <Link href="/about" className="hover:text-brand-gold transition-colors">About Us</Link>
                            <Link href="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
                        </nav>

                        {/* Actions */}
                        <div className="flex items-center gap-4">

                            <button
                                className="relative p-2 text-brand-green hover:text-brand-gold dark:text-gray-300 transition-colors"
                                onClick={() => setIsCartOpen(true)}
                            >
                                <ShoppingBag className="w-6 h-6" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-gold rounded-full border-2 border-white dark:border-brand-green-dark">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile menu button */}
                            <button
                                className="md:hidden p-2 text-brand-green dark:text-gray-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-brand-gold/10 bg-white dark:bg-brand-green-dark px-4 pt-2 pb-4 space-y-1 shadow-xl">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-brand-green dark:text-gray-300 hover:bg-brand-green/5 dark:hover:bg-brand-gold/10 hover:text-brand-gold">Home</Link>
                        <Link href="/?filter=best-sellers" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-brand-green dark:text-gray-300 hover:bg-brand-green/5 dark:hover:bg-brand-gold/10 hover:text-brand-gold">Best Sellers</Link>
                        <Link href="/?filter=all" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-brand-green dark:text-gray-300 hover:bg-brand-green/5 dark:hover:bg-brand-gold/10 hover:text-brand-gold">All Combos</Link>
                        <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-brand-green dark:text-gray-300 hover:bg-brand-green/5 dark:hover:bg-brand-gold/10 hover:text-brand-gold">About Us</Link>
                        <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 rounded-md font-medium text-brand-green dark:text-gray-300 hover:bg-brand-green/5 dark:hover:bg-brand-gold/10 hover:text-brand-gold">Contact</Link>
                    </div>
                )}
            </header>

            {/* Cart Drawer */}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
}
