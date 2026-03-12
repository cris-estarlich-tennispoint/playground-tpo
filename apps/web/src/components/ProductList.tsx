import { useEffect, useState } from "react"
import ProductTile from "./Product"
import SortSelector from "./SortSelector"
import type { ProductType } from "../types/ProductType"
import type { SortOption } from "./SortSelector"

interface ProductListProps {
    addToCart: (product: ProductType) => void
    addToWishlist: (product: ProductType) => void
    productsInWishlist: ProductType[]
}

export default function ProductList(props: ProductListProps) {
    const [productsList, setProductList] = useState<ProductType[]>([])
    const [sort, setSort] = useState<SortOption>("default")

    useEffect(() => {
        fetch("http://localhost:3001/api/products")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch")
                return res.json()
            })
            .then(data => setProductList(data))
    }, [])

    const handleRemove = (id: number) => {
        setProductList(productsList.filter(product => product.id !== id))
    }

    const sorted = [...productsList].sort((a, b) => {
        if (sort === "az") return a.name.localeCompare(b.name)
        if (sort === "za") return b.name.localeCompare(a.name)
        if (sort === "price-asc") return a.price - b.price
        if (sort === "price-desc") return b.price - a.price
        return 0
    })

    return (
        <div>
            <div className="flex justify-end mb-4">
                <SortSelector value={sort} onChange={setSort} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((product) => (
                    <ProductTile
                        key={product.id}
                        product={product}
                        onRemove={() => handleRemove(product.id)}
                        addToCart={() => props.addToCart(product)}
                        addToWishlist={() => props.addToWishlist(product)}
                        isInWishlist={props.productsInWishlist.some(prodInWishlist => prodInWishlist.id === product.id)}
                    />
                ))}
            </div>
        </div>
    )
}
