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
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface CartStore {
    items: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    getCartTotal: () => number;
    getCartItemsCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],

    addToCart: (product) => set((state) => {
        const existingItem = state.items.find(item => item.product.id === product.id);
        if (existingItem) {
            return {
                items: state.items.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            };
        }
        return { items: [...state.items, { product, quantity: 1 }] };
    }),

    removeFromCart: (productId) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
    })),

    updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
            return {
                items: state.items.filter(item => item.product.id !== productId)
            };
        }
        return {
            items: state.items.map(item =>
                item.product.id === productId
                    ? { ...item, quantity }
                    : item
            )
        };
    }),

    getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    },

    getCartItemsCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
    }
}));
