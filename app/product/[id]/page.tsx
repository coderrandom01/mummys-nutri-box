"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import productsData from "@/data/products.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product, useCartStore } from "@/store/cartStore";
import { ShoppingCart, Send, HeartPulse, Sparkles, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);

    const [product, setProduct] = useState<Product | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    // Custom Arrow Components for Slick on PDP
    const CustomPrevArrow = (props: any) => {
        const { style, onClick } = props;
        return (
            <button
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/80 hover:bg-brand-gold text-brand-green hover:text-white rounded-full p-2 z-40 transition-all shadow-md active:scale-95 flex items-center justify-center opacity-0 group-hover/pdp:opacity-100 md:opacity-100"
                style={{ ...style }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
        );
    };

    const CustomNextArrow = (props: any) => {
        const { style, onClick } = props;
        return (
            <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/80 hover:bg-brand-gold text-brand-green hover:text-white rounded-full p-2 z-40 transition-all shadow-md active:scale-95 flex items-center justify-center opacity-0 group-hover/pdp:opacity-100 md:opacity-100"
                style={{ ...style }}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(); }}
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        );
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        swipeToSlide: true,
        appendDots: (dots: any) => (
            <div style={{ bottom: "10px" }}>
                <ul className="m-0 p-0 flex justify-center gap-2">{dots}</ul>
            </div>
        ),
        customPaging: (i: number) => (
            <div className="w-2 h-2 rounded-full bg-brand-green/30 dark:bg-white/30 transition-all duration-300 .slick-active:w-4 .slick-active:bg-brand-gold hover:bg-brand-gold" />
        )
    };

    useEffect(() => {
        const foundProduct = productsData.find(p => p.id === resolvedParams.id);
        if (!foundProduct) {
            notFound();
        } else {
            setProduct(foundProduct);
        }
    }, [resolvedParams.id]);

    if (!product) return null;

    const handleBuyNow = () => {
        const phoneNumber = "918883670422"; // User provided WhatsApp number
        const message = `Hello! I would like to buy *${product.name}* (${product.weight}) for ₹${product.price}.%0A%0APlease let me know how to proceed.`;
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />

            <main className="flex-grow py-8 md:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    <Link href="/" className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-gold dark:text-gray-400 dark:hover:text-white transition-colors mb-8">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Back to Combos
                    </Link>

                    <div className="bg-white dark:bg-brand-green-dark border border-brand-gold/10 rounded-3xl shadow-xl shadow-brand-green/5 overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

                            {/* Image Section */}
                            <div className="relative aspect-square lg:aspect-auto lg:h-full bg-brand-green/5 dark:bg-black/20 p-8 md:p-16 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-brand-gold/10 overflow-hidden">
                                {product.images && product.images.length > 0 ? (
                                    <>
                                        <div className="relative w-full max-w-xl aspect-[4/3] lg:aspect-square z-20 drop-shadow-2xl group/pdp">
                                            {product.images.length > 1 ? (
                                                <Slider {...sliderSettings} className="w-full h-full [&_.slick-track]:flex [&_.slick-track]:items-center [&_.slick-slide]:h-full [&_.slick-list]:h-full rounded-2xl overflow-hidden">
                                                    {product.images.map((img, idx) => (
                                                        <div key={idx} className="relative w-full aspect-square outline-none">
                                                            <div className="relative w-full h-full">
                                                                <Image
                                                                    src={img}
                                                                    alt={`${product.name} - view ${idx + 1}`}
                                                                    fill
                                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                                    className="object-contain p-4 group-hover/pdp:scale-105 transition-transform duration-500 will-change-transform"
                                                                    priority={idx === 0}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </Slider>
                                            ) : (
                                                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        className="object-contain p-4 group-hover/pdp:scale-105 transition-transform duration-500 will-change-transform"
                                                        priority
                                                    />
                                                </div>
                                            )}
                                        </div>


                                    </>
                                ) : (
                                    <div className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-brand-gold/20 to-brand-green/20 flex items-center justify-center shadow-inner relative z-10 transform hover:scale-105 transition-transform duration-700">
                                        <Sparkles className="w-24 h-24 text-brand-green dark:text-brand-gold opacity-50" />
                                    </div>
                                )}

                                {/* Decorative background element */}
                                <div className="absolute top-1/4 -right-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
                                <div className="absolute bottom-1/4 -left-12 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl pointer-events-none" />
                            </div>

                            {/* Content Section */}
                            <div className="p-8 md:p-12 flex flex-col justify-center">

                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-brand-gold/20 text-brand-gold border border-brand-gold/30">
                                        Premium Quality
                                    </span>
                                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 px-3 py-1 rounded-full">
                                        {product.weight}
                                    </span>
                                </div>

                                <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2 leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-brand-green-light dark:text-gray-400 mb-8 font-medium">
                                    {product.shortBenefit}
                                </p>

                                <div className="mb-10">
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider block mb-1">Price</span>
                                    <span className="text-5xl font-black text-brand-green dark:text-brand-gold">₹{product.price}</span>
                                </div>

                                {/* Features Grid */}
                                <div className="grid md:grid-cols-2 gap-8 mb-10">

                                    {/* Included Items */}
                                    <div className="bg-brand-green/5 dark:bg-white/5 p-6 rounded-2xl border border-brand-green/10 dark:border-white/10">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Sparkles className="w-5 h-5 text-brand-gold" />
                                            What's Inside
                                        </h3>
                                        <ul className="space-y-3">
                                            {product.includedItems.map((item, index) => (
                                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                                    <CheckCircle2 className="w-4 h-4 text-brand-green mt-0.5 mr-2 flex-shrink-0" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Health Benefits */}
                                    <div className="bg-brand-green/5 dark:bg-white/5 p-6 rounded-2xl border border-brand-green/10 dark:border-white/10">
                                        <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <HeartPulse className="w-5 h-5 text-red-400" />
                                            Health Benefits
                                        </h3>
                                        <ul className="space-y-3">
                                            {product.healthBenefits.map((benefit, index) => (
                                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 mr-3 flex-shrink-0" />
                                                    <span>{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <button
                                        onClick={() => addToCart(product)}
                                        className="flex-1 py-4 px-6 bg-brand-green hover:bg-brand-green-light dark:bg-white dark:hover:bg-gray-200 text-white dark:text-brand-green-dark rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-xl shadow-brand-green/20 dark:shadow-white/10 hover:-translate-y-1"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </button>

                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-1 py-4 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 text-lg shadow-xl shadow-[#25D366]/20 hover:-translate-y-1"
                                    >
                                        <Send className="w-5 h-5" />
                                        Buy via WhatsApp
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
