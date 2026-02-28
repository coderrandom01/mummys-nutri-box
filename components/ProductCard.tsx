"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight, ShieldCheck, Leaf } from "lucide-react";
import { Product } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    return (
        <div className="group flex flex-col bg-white dark:bg-brand-green-dark/40 rounded-2xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 hover-lift shadow-sm dark:shadow-none">

            {/* Image Area */}
            <div className="relative aspect-square w-full bg-brand-green/2 dark:bg-brand-green-dark p-6 overflow-hidden flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        unoptimized
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-xl z-20"
                    />
                ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-gold/20 to-brand-green/20 flex items-center justify-center shadow-inner relative z-10 group-hover:scale-110 transition-transform duration-500">
                        <Leaf className="w-12 h-12 text-brand-green dark:text-brand-gold opacity-50" />
                    </div>
                )}

                {/* Decorative background element */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-colors duration-500" />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-5">

                {/* Badges/Tags */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-brand-green/10 text-brand-green dark:bg-brand-gold/10 dark:text-brand-gold">
                        <ShieldCheck className="w-3 h-3" />
                        Premium
                    </span>
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-full">
                        {product.weight}
                    </span>
                </div>

                {/* Title & Price */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1 group-hover:text-brand-green-light dark:group-hover:text-brand-gold transition-colors">
                    {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10 line-clamp-2">
                    {product.shortBenefit}
                </p>

                {/* Spacer to push pricing to bottom */}
                <div className="mt-auto"></div>

                <div className="flex items-end justify-between mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                    <div>
                        <span className="text-xs text-brand-green dark:text-gray-400 font-medium tracking-wide pb-1 block">Price</span>
                        <span className="text-2xl font-black text-brand-green dark:text-brand-gold">₹{product.price}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => addToCart(product)}
                        className="flex-1 bg-brand-green hover:bg-brand-green-light dark:bg-brand-gold dark:hover:bg-brand-gold-light text-white dark:text-brand-green-dark py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-brand-green/20 dark:shadow-brand-gold/10"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add
                    </button>

                    <Link
                        href={`/product/${product.id}`}
                        className="flex-1 bg-brand-green/5 hover:bg-brand-green/10 dark:bg-white/5 dark:hover:bg-white/10 text-brand-green dark:text-white py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                        Details
                        <ArrowRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
                    </Link>
                </div>

            </div>
        </div>
    );
}
