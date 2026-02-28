import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Phone, MessageCircleQuestion, Send } from "lucide-react";

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-black">
            <Header />

            <main className="flex-grow py-16 md:py-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
                            Contact <span className="text-brand-gold">Us</span>
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            We're here to help! Reach out for wholesale inquiries or retail orders.
                        </p>
                    </div>

                    <div className="bg-white dark:bg-brand-green-dark/30 rounded-3xl p-8 md:p-12 shadow-xl border border-brand-gold/10 text-center">

                        <div className="mx-auto w-16 h-16 bg-brand-green/10 dark:bg-brand-gold/20 rounded-full flex items-center justify-center mb-6">
                            <MessageCircleQuestion className="w-8 h-8 text-brand-green dark:text-brand-gold" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Have any queries?
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            Whether you have a question about our combos, need a custom wholesale order, or need help with a purchase, we are just a message or call away.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="tel:8883670422"
                                className="flex items-center gap-2 px-6 py-4 bg-brand-green dark:bg-white text-white dark:text-brand-green font-bold rounded-xl hover:bg-brand-green-light dark:hover:bg-gray-200 transition-all shadow-lg hover:-translate-y-1 w-full sm:w-auto justify-center"
                            >
                                <Phone className="w-5 h-5" />
                                Call: 8883670422
                            </a>

                            <a
                                href="https://wa.me/918883670422?text=Hello!%20I%20have%20a%20query%20about%20Mummy's%20Nutri%20Basket."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-6 py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#128C7E] transition-all shadow-lg hover:-translate-y-1 w-full sm:w-auto justify-center relative overflow-hidden"
                            >
                                <Send className="w-5 h-5" />
                                WhatsApp Us
                            </a>
                        </div>

                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
