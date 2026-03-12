import type { ProductType } from "../types/ProductType"
import ProductTile from "./Product"
import HeartIcon from "./icons/HeartIcon"

interface WishlistProps {
    productsInWishlist: ProductType[]
    removeFromWishlist: (id: number) => void
}

export default function Wishlist(props: WishlistProps) {
    return (
        <div className="bg-shop-card rounded-xl border border-shop-border overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-shop-border flex items-center gap-2">
                <HeartIcon width={18} height={18} fill="#f59e0b" stroke="#f59e0b" />
                <h3 className="font-semibold text-shop-text">
                    Wishlist ({props.productsInWishlist.length})
                </h3>
            </div>

            {/* Items */}
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {props.productsInWishlist.length === 0 ? (
                    <div className="text-center py-6">
                        <HeartIcon
                            width={32}
                            height={32}
                            className="mx-auto mb-2 text-shop-text-muted"
                        />
                        <p className="text-shop-text-muted">
                            Your wishlist is empty
                        </p>
                        <p className="text-xs text-shop-text-muted mt-1">
                            Click the heart on products to save them
                        </p>
                    </div>
                ) : (
                    props.productsInWishlist.map((product) => (
                        <ProductTile
                            key={product.id}
                            product={product}
                            onRemove={() => props.removeFromWishlist(product.id)}
                            compact
                        />
                    ))
                )}
            </div>
        </div>
    )
}
