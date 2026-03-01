"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product } from "@/store/cartStore";

function SearchContent() {
    const searchParams = useSearchParams();
    const queryParam = searchParams.get("q") || "";

    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [category, setCategory] = useState<"all" | "combos" | "singles">("all");

    // Initialize search query from URL when first loaded
    useEffect(() => {
        if (queryParam) {
            setSearchQuery(queryParam);
        }
    }, [queryParam]);

    // Filter logic
    const filteredProducts = productsData.filter((product) => {
        const matchesQuery =
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.shortBenefit.toLowerCase().includes(searchQuery.toLowerCase());

        let matchesCategory = true;
        if (category === "combos") {
            matchesCategory = !product.isScalable;
        } else if (category === "singles") {
            matchesCategory = !!product.isScalable;
        }

        return matchesQuery && matchesCategory;
    });

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />

            <main className="flex-grow pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Page Title */}
                    <div className="mb-8 md:mb-12">
                        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Find Your Favorites
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                            Search our premium selection of nuts, seeds, and healthy combos.
                        </p>
                    </div>

                    {/* Search and Filters Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-10 bg-white dark:bg-brand-green-dark p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by name or benefit..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="block w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-colors"
                            />
                        </div>

                        <div className="flex bg-gray-100 dark:bg-black p-1 rounded-xl shrink-0 overflow-x-auto">
                            <button
                                onClick={() => setCategory("all")}
                                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${category === "all" ? "bg-white dark:bg-brand-gold text-brand-green shadow-sm" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                            >
                                All Items
                            </button>
                            <button
                                onClick={() => setCategory("combos")}
                                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${category === "combos" ? "bg-white dark:bg-brand-gold text-brand-green shadow-sm" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                            >
                                Combos
                            </button>
                            <button
                                onClick={() => setCategory("singles")}
                                className={`px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${category === "singles" ? "bg-white dark:bg-brand-gold text-brand-green shadow-sm" : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"}`}
                            >
                                Single Items
                            </button>
                        </div>
                    </div>

                    {/* Results Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product as Product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white dark:bg-brand-green-dark/30 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                            <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-black rounded-full flex items-center justify-center mb-4">
                                <Search className="w-10 h-10 text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                                We couldn't find anything matching "{searchQuery}" in {category === 'all' ? 'any category' : category}.
                            </p>
                            <button
                                onClick={() => { setSearchQuery(""); setCategory("all"); }}
                                className="mt-6 text-brand-gold font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>}>
            <SearchContent />
        </Suspense>
    );
}
