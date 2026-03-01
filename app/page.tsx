"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BannerCarousel from "@/components/BannerCarousel";

const BEST_SELLERS_IDS = ['classic-nut-box', 'premium-energy-box', 'grand-7-item-box-100g'];

function HomeContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/search');
    }
  };

  const displayedProducts = productsData.filter(p => BEST_SELLERS_IDS.includes(p.id));

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
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto lg:mx-0 drop-shadow-md leading-relaxed">
              Discover our carefully curated combinations of premium nuts, dates, and seeds for your family's daily wellness.
            </p>

            <form onSubmit={handleSearch} className="mb-8 relative max-w-lg mx-auto lg:mx-0">
              <input
                type="text"
                placeholder="Search for nuts, seeds, combos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-5 pr-14 py-4 rounded-xl border-none font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-brand-gold/50 shadow-lg"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-green flex items-center justify-center rounded-lg text-brand-gold hover:bg-brand-green-light transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={() => router.push('/search')}
                className="inline-flex items-center justify-center px-8 py-4 text-brand-green-dark bg-brand-gold hover:bg-brand-gold-light rounded-xl font-bold transition-transform duration-300 hover:-translate-y-1 shadow-xl shadow-brand-gold/20"
              >
                Explore All Items
              </button>
              <button
                onClick={() => {
                  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-white border border-white/20 hover:bg-white/10 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl backdrop-blur-sm"
              >
                View Best Sellers
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow bg-white dark:bg-black py-16 scroll-mt-20" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Our Best Sellers
              </h2>
              <p className="text-gray-500 dark:text-gray-400">Handpicked premium selections for your health needs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => router.push('/search')}
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-brand-green dark:border-brand-gold text-brand-green dark:text-brand-gold hover:bg-brand-green hover:text-white dark:hover:bg-brand-gold dark:hover:text-brand-green-dark rounded-xl font-bold transition-all duration-300"
            >
              Search All Products
            </button>
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
