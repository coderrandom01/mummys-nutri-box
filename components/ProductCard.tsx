"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight, ShieldCheck, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from "@/store/cartStore";
import { useCartStore } from "@/store/cartStore";
import { calculateScalablePrice } from "@/lib/pricing";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [selectedWeight, setSelectedWeight] = useState(100);

    const isScalable = product.isScalable;
    const currentPrice = isScalable && product.baseCostPer100g
        ? calculateScalablePrice(product.baseCostPer100g, selectedWeight)
        : product.price;

    const handleIncreaseWeight = () => {
        if (selectedWeight < 2000) setSelectedWeight(prev => prev + 50);
    };

    const handleDecreaseWeight = () => {
        if (selectedWeight > 50) setSelectedWeight(prev => prev - 50);
    };

    // Custom arrow components for Slick
    const CustomPrevArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/80 hover:bg-brand-gold text-brand-green hover:text-white rounded-full p-1 z-40 opacity-100 md:opacity-0 group-hover/carousel:opacity-100 transition-all shadow-md active:scale-95 flex items-center justify-center"
                style={{ ...style }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
            >
                <ChevronLeft className="w-5 h-5 pointer-events-none" />
            </button>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { className, style, onClick } = props;
        return (
            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/80 hover:bg-brand-gold text-brand-green hover:text-white rounded-full p-1 z-40 opacity-100 md:opacity-0 group-hover/carousel:opacity-100 transition-all shadow-md active:scale-95 flex items-center justify-center"
                style={{ ...style }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
            >
                <ChevronRight className="w-5 h-5 pointer-events-none" />
            </button>
        );
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: product.images && product.images.length > 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        swipeToSlide: true,
        appendDots: (dots: any) => (
            <div style={{ bottom: "10px" }}>
                <ul className="m-0 p-0 flex justify-center gap-1.5">{dots}</ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div className="w-1.5 h-1.5 rounded-full bg-brand-green/30 dark:bg-white/30 transition-all duration-300 .slick-active:w-3 .slick-active:bg-brand-gold hover:bg-brand-gold" />
        )
    };

    return (
        <div className="group flex flex-col bg-white dark:bg-brand-green-dark/40 rounded-2xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 hover-lift shadow-sm dark:shadow-none">

            {/* Image Area */}
            <div className="relative aspect-square w-full bg-brand-green/2 dark:bg-brand-green-dark overflow-hidden group/carousel">
                {product.images && product.images.length > 0 ? (
                    <div className="w-full h-full relative z-20">
                        {product.images.length > 1 ? (
                            <Slider {...sliderSettings} className="h-full w-full [&_.slick-track]:flex [&_.slick-track]:items-center [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full [&_.slick-list]:h-full">
                                {product.images.map((img, idx) => (
                                    <div key={idx} className="relative w-full aspect-square flex items-center justify-center outline-none">
                                        <div className="relative w-full h-full p-6">
                                            <Image
                                                src={img}
                                                alt={`${product.name} ${idx + 1}`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-contain p-4 group-hover/carousel:scale-110 transition-transform duration-500 will-change-transform"
                                                priority={idx === 0}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        ) : (
                            <div className="relative w-full aspect-square p-6">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-contain p-4 group-hover/carousel:scale-110 transition-transform duration-500 will-change-transform"
                                />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-full h-full p-6 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-gold/20 to-brand-green/20 flex items-center justify-center shadow-inner relative z-10 group-hover/carousel:scale-110 transition-transform duration-500">
                            <Leaf className="w-12 h-12 text-brand-green dark:text-brand-gold opacity-50" />
                        </div>
                    </div>
                )}

                {/* Decorative background element */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-brand-gold/10 rounded-full blur-2xl group-hover:bg-brand-gold/20 transition-colors duration-500 pointer-events-none" />
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-1 p-5">

                {/* Badges/Tags */}
                <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-brand-green/10 text-brand-green dark:bg-brand-gold/10 dark:text-brand-gold">
                        <ShieldCheck className="w-3 h-3" />
                        Premium
                    </span>
                    {!isScalable ? (
                        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-2.5 py-1 rounded-full">
                            {product.weight}
                        </span>
                    ) : (
                        <div className="flex items-center gap-2 text-xs font-semibold text-brand-green dark:text-brand-gold border border-brand-green/20 dark:border-brand-gold/20 rounded-full px-2 py-0.5 bg-brand-green/5 dark:bg-brand-gold/5">
                            <button
                                onClick={handleDecreaseWeight}
                                disabled={selectedWeight <= 50}
                                className="p-1 hover:bg-brand-green/10 dark:hover:bg-brand-gold/10 rounded-full transition-colors leading-none disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                -
                            </button>
                            <span className="w-9 text-center tabular-nums">{selectedWeight}g</span>
                            <button
                                onClick={handleIncreaseWeight}
                                disabled={selectedWeight >= 2000}
                                className="p-1 hover:bg-brand-green/10 dark:hover:bg-brand-gold/10 rounded-full transition-colors leading-none disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                +
                            </button>
                        </div>
                    )}
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
                        <span className="text-2xl font-black text-brand-green dark:text-brand-gold">₹{currentPrice}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => addToCart(product, isScalable ? selectedWeight : undefined, isScalable ? currentPrice : undefined)}
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
