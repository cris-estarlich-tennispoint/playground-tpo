import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { ProductType } from "../types/ProductType";
import { GetWishlistItemsContract, AddWishlistItemContract, RemoveWishlistItemContract } from "@repo/shared";
import type { GetWishlistItemsResponse, AddWishlistItemRequest } from "@repo/shared";

const API_URL = "http://localhost:3001/api";

export function useWishlist() {
    const [productsInWishlist, setProductsInWishlist] = useState<ProductType[]>([]);

    useEffect(() => {
        fetch(`${API_URL}${GetWishlistItemsContract.route}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to load wishlist");
                return res.json();
            })
            .then((data: GetWishlistItemsResponse) =>
                setProductsInWishlist(data.map(item => item.product))
            )
            .catch(() => toast.error("Could not load wishlist"));
    }, []);

    const addToWishlist = async (product: ProductType): Promise<void> => {
        try {
            const body: AddWishlistItemRequest = { productId: product.id };
            const res = await fetch(`${API_URL}${AddWishlistItemContract.route}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!res.ok) throw new Error();
            setProductsInWishlist(prev => [...prev, product]);
        } catch {
            toast.error("Failed to add item to wishlist");
        }
    };

    const removeFromWishlist = async (id: string): Promise<void> => {
        try {
            const res = await fetch(`${API_URL}${RemoveWishlistItemContract.route.replace(':id', id)}`, {
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
