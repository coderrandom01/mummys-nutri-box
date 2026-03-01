import { create } from 'zustand';

export interface Product {
    id: string;
    name: string;
    price: number;
    weight: string;
    images: string[];
    shortBenefit: string;
    includedItems: string[];
    healthBenefits: string[];
    isScalable?: boolean;
    baseCostPer100g?: number;
}

export interface CartItem {
    id: string; // Format: productId or productId-weight
    product: Product;
    quantity: number;
    selectedWeight?: number; // Weight in grams
    calculatedPrice?: number; // Final calculated price for this specific cart item unit
}

interface CartStore {
    items: CartItem[];
    addToCart: (product: Product, selectedWeight?: number, calculatedPrice?: number) => void;
    removeFromCart: (cartItemId: string) => void;
    updateQuantity: (cartItemId: string, quantity: number) => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addToCart: (product, selectedWeight, calculatedPrice) => set((state) => {
        const cartItemId = product.isScalable && selectedWeight
            ? `${product.id}-${selectedWeight}g`
            : product.id;

        const existingItem = state.items.find(item => item.id === cartItemId);
        if (existingItem) {
            return {
                items: state.items.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        return {
            items: [...state.items, {
                id: cartItemId,
                product,
                quantity: 1,
                selectedWeight,
                calculatedPrice: calculatedPrice ?? product.price
            }]
        };
    }),

    removeFromCart: (cartItemId) => set((state) => ({
        items: state.items.filter(item => item.id !== cartItemId)
    })),

    updateQuantity: (cartItemId, quantity) => set((state) => {
        if (quantity <= 0) {
            return {
                items: state.items.filter(item => item.id !== cartItemId)
            };
        }
        return {
            items: state.items.map(item =>
                item.id === cartItemId
                    ? { ...item, quantity }
                    : item
            )
        };
    }),

    getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + ((item.calculatedPrice ?? item.product.price) * item.quantity), 0);
    },

    getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
    }
}));
