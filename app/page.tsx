"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerCarousel from "@/components/BannerCarousel";

const BEST_SELLERS_IDS = ['classic-nut-box', 'premium-energy-box', 'grand-7-item-box-100g'];

function HomeContent() {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get('filter');

  const [filter, setFilter] = useState<'all' | 'best-sellers'>('all');

  useEffect(() => {
    if (filterParam === 'best-sellers') {
      setFilter('best-sellers');
      // Smooth scroll to products section
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    } else if (filterParam === 'all') {
      setFilter('all');
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [filterParam]);

  const displayedProducts = filter === 'best-sellers'
    ? productsData.filter(p => BEST_SELLERS_IDS.includes(p.id))
    : productsData;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-green-dark border-b border-brand-gold/10">
        <BannerCarousel />

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark/90 via-transparent to-black/30 opacity-80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-40 flex justify-center lg:justify-start text-center lg:text-left mt-20 lg:mt-32">
          <div className="max-w-xl bg-black/40 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            <span className="text-brand-gold font-bold tracking-wider text-sm uppercase mb-4 block drop-shadow-md">Premium Quality Dry Fruits</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight drop-shadow-xl flex flex-col gap-2">
              <span>Healthy Choices,</span>
              <span className="text-brand-gold">Mummy's Care.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto lg:mx-0 drop-shadow-md leading-relaxed">
              Discover our carefully curated combinations of premium nuts, dates, and seeds for your family's daily wellness.
            </p>
            <button
              onClick={() => setFilter('all')}
              className="inline-flex items-center justify-center px-8 py-4 text-brand-green-dark bg-brand-gold hover:bg-brand-gold-light rounded-xl font-bold transition-transform duration-300 hover:-translate-y-1 shadow-xl shadow-brand-gold/20 mr-4"
            >
              Explore Our Combos
            </button>
            <button
              onClick={() => {
                setFilter('best-sellers');
                document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex mt-4 sm:mt-0 items-center justify-center px-8 py-4 text-white border border-white/20 hover:bg-white/10 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl backdrop-blur-sm"
            >
              View Best Sellers
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-white dark:bg-black py-16 scroll-mt-20" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {filter === 'best-sellers' ? 'Our Best Sellers' : 'Our Signature Combos'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400">Handpicked premium selections for your health needs</p>
            </div>

            {/* Filter Toggle */}
            <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${filter === 'all' ? 'bg-white dark:bg-brand-gold text-brand-green shadow-md dark:shadow-brand-gold/20' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                All Combos
              </button>
              <button
                onClick={() => setFilter('best-sellers')}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${filter === 'best-sellers' ? 'bg-white dark:bg-brand-gold text-brand-green shadow-md dark:shadow-brand-gold/20' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                Best Sellers
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-green-dark"></div>}>
      <HomeContent />
    </Suspense>
  );
}
