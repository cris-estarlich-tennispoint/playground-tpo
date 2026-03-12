import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { ProductType } from "../types/ProductType";

const API_URL = "http://localhost:3001";

export function useCart() {
    const [productsInBasket, setProductsInBasket] = useState<ProductType[]>([]);

    useEffect(() => {
        fetch(`${API_URL}/api/basket/products`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load cart");
                return res.json();
            })
            .then((data: Array<{ product: ProductType }>) =>
                setProductsInBasket(data.map(item => item.product))
            )
            .catch(() => toast.error("Could not load cart"));
    }, []);

    const addToCart = async (product: ProductType): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}/api/basket/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId: product.id }),
            });
            if (!res.ok) throw new Error();
            setProductsInBasket(prev => [...prev, product]);
        } catch {
            toast.error("Failed to add item to cart");
        }
    };

    const removeFromCart = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}/api/basket/product/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error();
            setProductsInBasket(prev => prev.filter(product => product.id !== id));
        } catch {
            toast.error("Failed to remove item from cart");
        }
    };

    return { productsInBasket, addToCart, removeFromCart };
}
