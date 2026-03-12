import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { ProductType } from "../types/ProductType";
import { GetCartItemsContract, AddCartItemContract, RemoveCartItemContract } from "@repo/shared";
import type { GetCartItemsResponse, AddCartItemRequest } from "@repo/shared";

const API_URL = "http://localhost:3001/api";

export function useCart() {
    const [productsInBasket, setProductsInBasket] = useState<ProductType[]>([]);

    useEffect(() => {
        fetch(`${API_URL}${GetCartItemsContract.route}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load cart");
                return res.json();
            })
            .then((data: GetCartItemsResponse) =>
                setProductsInBasket(data.map(item => item.product))
            )
            .catch(() => toast.error("Could not load cart"));
    }, []);

    const addToCart = async (product: ProductType): Promise<void> => {
        try {
            const body: AddCartItemRequest = { productId: product.id };
            const res = await fetch(`${API_URL}${AddCartItemContract.route}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error();
            setProductsInBasket(prev => [...prev, product]);
        } catch {
            toast.error("Failed to add item to cart");
        }
    };

    const removeFromCart = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}${RemoveCartItemContract.route.replace(':id', id)}`, {
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
