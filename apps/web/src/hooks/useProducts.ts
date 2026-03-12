import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import type { ProductType } from "../types/ProductType";
import { GetAllProductsContract } from "@repo/shared";
import type { GetAllProductsResponse } from "@repo/shared";

const API_URL = "http://localhost:3001/api";

export function useProducts() {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        fetch(`${API_URL}${GetAllProductsContract.route}`)
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch products");
                return res.json();
            })
            .then((data: GetAllProductsResponse) => setProducts(data))
            .catch(() => toast.error("Could not load products"));
    }, []);

    const removeProduct = (id: string) => {
        setProducts(prev => prev.filter(product => product.id !== id));
    };

    return { products, removeProduct };
}
