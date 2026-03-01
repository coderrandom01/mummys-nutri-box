"use client";

import { X, Plus, Minus, Send } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
    const { items, removeFromCart, updateQuantity, getCartTotal } = useCartStore();

    const handleCheckout = () => {
        if (items.length === 0) return;

        const expectsDelivery = items.some(item => item.product.isScalable);
        const deliveryFee = expectsDelivery ? 50 : 0;
        const subtotal = getCartTotal();

        // Discount Logic
        let discount = 0;
        if (subtotal >= 2000) discount = 100;
        else if (subtotal >= 1000) discount = 50;

        // Free Item Logic
        const hasFreeChiaSeeds = items.some(item => item.product.id === "grand-7-item-box-100g");

        const grandTotal = subtotal + deliveryFee - discount;

        const phoneNumber = "918883670422"; // User provided WhatsApp number
        const intro = "Hello! I would like to place an order from Mummy's Nutri Basket:%0A%0A";

        const orderDetails = items.map(item =>
            `*${item.product.name}* (${item.selectedWeight ? `${item.selectedWeight}g` : item.product.weight})%0AQuantity: ${item.quantity}%0APrice: ₹${(item.calculatedPrice ?? item.product.price) * item.quantity}`
        ).join("%0A%0A");

        let addons = "";
        if (hasFreeChiaSeeds) {
            addons += "%0A%0A🎁 *Free Item:* Chia Seeds (50g)";
        }

        const discountLine = discount > 0 ? `%0A- Discount: ₹${discount}` : "";
        const deliveryLine = expectsDelivery ? `%0A%0A+ Delivery Fee: ₹50` : "";
        const total = `%0A%0A*Grand Total: ₹${grandTotal}*`;

        const message = `${intro}${orderDetails}${addons}${deliveryLine}${discountLine}${total}`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

        window.open(whatsappUrl, "_blank");
    };

    if (!isOpen) return null;

    const expectsDelivery = items.some(item => item.product.isScalable);
    const deliveryFee = expectsDelivery ? 50 : 0;
    const subtotal = getCartTotal();

    // Discount Logic
    let discount = 0;
    if (subtotal >= 2000) discount = 100;
    else if (subtotal >= 1000) discount = 50;

    // Free Item Logic
    const hasFreeChiaSeeds = items.some(item => item.product.id === "grand-7-item-box-100g");

    const grandTotal = subtotal + deliveryFee - discount;

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white dark:bg-brand-green-dark shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-brand-gold/20 flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-brand-gold/10">
                    <h2 className="text-xl font-bold text-brand-green dark:text-brand-gold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-500 hover:text-brand-green dark:text-gray-400 dark:hover:text-brand-gold transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                            <ShoppingBag className="w-16 h-16 mb-4 opacity-50 text-brand-green" />
                            <p>Your cart is empty</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.product.id} className="flex gap-4 p-3 bg-brand-green/5 dark:bg-white/5 rounded-xl border border-brand-green/10 dark:border-white/10">

                                {/* Image Placeholder */}
                                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-white p-1">
                                    {item.product.images && item.product.images.length > 0 ? (
                                        <Image
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            fill
                                            sizes="80px"
                                            className="object-contain"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-brand-green/10 flex items-center justify-center">
                                            <span className="text-brand-green font-bold text-xs">{item.product.weight}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-semibold text-brand-green dark:text-brand-gold text-sm">{item.product.name}</h3>
                                        <p className="text-brand-green-light dark:text-gray-400 text-xs">
                                            {item.selectedWeight ? `${item.selectedWeight}g` : item.product.weight}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between mt-2">
                                        <p className="font-bold text-brand-green dark:text-white">₹{item.calculatedPrice ?? item.product.price}</p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 bg-white dark:bg-brand-green-dark rounded-lg border border-brand-gold/20 p-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="p-1 hover:text-brand-gold transition-colors text-brand-green dark:text-gray-300"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-semibold w-4 text-center text-brand-green dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="p-1 hover:text-brand-gold transition-colors text-brand-green dark:text-gray-300"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-brand-gold/10 p-4 bg-gray-50 dark:bg-black/20">
                        <div className="flex flex-col gap-1 mb-4">
                            {hasFreeChiaSeeds && (
                                <div className="flex items-center justify-between text-sm py-1">
                                    <span className="text-brand-gold font-bold flex items-center gap-1">🎁 Free Item</span>
                                    <span className="font-medium text-brand-green dark:text-gray-300 text-right">Chia Seeds (50g)</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-medium text-brand-green dark:text-gray-300">₹{subtotal}</span>
                            </div>
                            {expectsDelivery && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Single Item Delivery</span>
                                    <span className="font-medium text-brand-green dark:text-gray-300">₹{deliveryFee}</span>
                                </div>
                            )}
                            {discount > 0 && (
                                <div className="flex items-center justify-between text-sm text-green-600 dark:text-green-400 font-medium">
                                    <span>Discount Applied</span>
                                    <span>- ₹{discount}</span>
                                </div>
                            )}
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-gold/10">
                                <span className="text-gray-800 dark:text-gray-200 font-bold">Grand Total</span>
                                <span className="text-xl font-black text-brand-green dark:text-brand-gold">₹{grandTotal}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#128C7E] flex items-center justify-center gap-2 text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#25D366]/20"
                        >
                            <Send className="w-5 h-5" />
                            Proceed to WhatsApp
                        </button>
                        <p className="text-xs text-center mt-3 text-gray-500 dark:text-gray-400">
                            *You will be redirected to WhatsApp to complete your order.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

// Temporary inline import for the empty state icon
import { ShoppingBag } from "lucide-react";
