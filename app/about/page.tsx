import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Store, CalendarHeart, MapPin, HandHeart } from "lucide-react";

export default function About() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />

            <main className="flex-grow py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            About <span className="text-brand-gold">Us</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Bringing wholesale quality directly to your home.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brand-green-dark/30 rounded-3xl p-8 md:p-12 shadow-xl border border-brand-gold/10">

                        <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
                            <p className="lead text-xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                                We are a startup that originated from a successful wholesale background. Since 2026, we have expanded our reach to provide premium quality dry fruits at retail directly from our home to yours.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 mb-16">

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-green/10 dark:bg-white/10 rounded-xl">
                                    <Store className="w-6 h-6 text-brand-green dark:text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Wholesale Roots</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Our deep connections in the wholesale market mean you get the best quality nuts and dry fruits at competitive prices.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-green/10 dark:bg-white/10 rounded-xl">
                                    <CalendarHeart className="w-6 h-6 text-brand-green dark:text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Since 2026</h3>
                                    <p className="text-gray-600 dark:text-gray-400">We transitioned to direct retail to ensure every family has access to healthy, premium nutrition without the middleman markups.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-green/10 dark:bg-white/10 rounded-xl">
                                    <HandHeart className="w-6 h-6 text-brand-green dark:text-brand-gold" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">Mummy's Care</h3>
                                    <p className="text-gray-600 dark:text-gray-400">Every combo box is curated with the exact love and nutritional care a mother provides for her family.</p>
                                </div>
                            </div>

                        </div>

                        <div className="bg-brand-green/5 dark:bg-black/20 rounded-2xl p-8 border border-brand-green/10 text-center">
                            <MapPin className="w-8 h-8 text-brand-gold mx-auto mb-4" />
                            <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2">Visit Us</h3>
                            <address className="text-gray-600 dark:text-gray-400 not-italic">
                                Iravathanallur,<br />
                                Madurai - 625009
                            </address>
                        </div>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
