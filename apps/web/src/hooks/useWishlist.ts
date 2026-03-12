import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { ProductType } from "../types/ProductType";

const API_URL = "http://localhost:3001";

export function useWishlist() {
    const [productsInWishlist, setProductsInWishlist] = useState<ProductType[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/wishlist/products`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load wishlist");
                return res.json();
            })
            .then((data: Array<{ product: ProductType }>) =>
                setProductsInWishlist(data.map(item => item.product))
            )
            .catch(() => toast.error("Could not load wishlist"));
    }, []);

    const addToWishlist = async (product: ProductType): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}/api/wishlist/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id }),
            });
            if (!res.ok) throw new Error();
            setProductsInWishlist(prev => [...prev, product]);
        } catch {
            toast.error("Failed to add item to wishlist");
        }
    };

    const removeFromWishlist = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}/api/wishlist/product/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            setProductsInWishlist(prev => prev.filter(product => product.id !== id));
        } catch {
            toast.error("Failed to remove item from wishlist");
        }
    };

    return { productsInWishlist, addToWishlist, removeFromWishlist };
}
