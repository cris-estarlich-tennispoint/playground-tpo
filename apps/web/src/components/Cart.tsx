import type { ProductType } from "../types/ProductType"
import ProductTile from "./Product"
import ShoppingCartIcon from "./icons/ShoppingCartIcon"

interface CartProps {
    productsInBasket: ProductType[]
    removeFromCart: (id: number) => void
}

export default function Cart(props: CartProps) {
    const totalPrice = props.productsInBasket.reduce(
        (sum, product) => sum + product.price,
        0
    );

    return (
        <div className="bg-shop-card rounded-xl border border-shop-border overflow-hidden">
            {/* Header */}
            <div className="px-4 py-3 border-b border-shop-border flex items-center gap-2">
                <ShoppingCartIcon width={18} height={18} className="text-shop-accent" />
                <h3 className="font-semibold text-shop-text">
                    Cart ({props.productsInBasket.length})
                </h3>
            </div>

            {/* Items */}
            <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
                {props.productsInBasket.length === 0 ? (
                    <p className="text-center text-shop-text-muted py-4">
                        Your cart is empty
                    </p>
                ) : (
                    props.productsInBasket.map((product) => (
                        <ProductTile
                            key={product.id}
                            product={product}
                            onRemove={() => props.removeFromCart(product.id)}
                            compact
                        />
                    ))
                )}
            </div>

            {/* Footer */}
            {props.productsInBasket.length > 0 && (
                <div className="p-4 border-t border-shop-border space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-shop-text-muted">Total:</span>
                        <span className="text-xl font-bold text-shop-text">
                            ${totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <button className="w-full py-3 bg-shop-success hover:bg-shop-success/90 text-white font-semibold rounded-lg transition-colors">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    )
}
