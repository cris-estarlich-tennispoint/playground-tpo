import { useState } from "react";
import type { ProductType } from "../types/ProductType"
import HeartIcon from "./icons/HeartIcon"
import ShoppingCartIcon from "./icons/ShoppingCartIcon"
import TrashIcon from "./icons/TrashIcon"
import toast from 'react-hot-toast';

interface ProductTileProps {
    product: ProductType
    onRemove?: () => void
    addToCart?: () => void
    addToWishlist?: (product: ProductType) => void
    compact?: boolean
    isInWishlist?: boolean
}

export default function ProductTile(props: ProductTileProps) {
    const onAddToWishlist = () => {
        if (props.addToWishlist) {
            props.addToWishlist(props.product)
            toast.success('Producto: ' + props.product.name + ' added to wishlist!')
        }
    }

    if (props.compact) {
        return (
            <div className="flex items-center gap-3 p-3 bg-shop-card rounded-lg border border-shop-border">
                <img
                    className="w-12 h-12 object-cover rounded-md"
                    src={props.product.image}
                    alt={props.product.name}
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-shop-text truncate">
                        {props.product.name}
                    </p>
                    <p className="text-sm text-shop-accent font-semibold">
                        ${props.product.price}
                    </p>
                </div>
                {props.onRemove && (
                    <button
                        onClick={props.onRemove}
                        className="p-2 text-shop-danger hover:bg-shop-danger/10 rounded-lg transition-colors"
                    >
                        <TrashIcon width={16} height={16} />
                    </button>
                )}
            </div>
        )
    }

    return (
        <div className="group relative bg-shop-card rounded-xl border border-shop-border overflow-hidden hover:border-shop-accent/50 transition-all duration-300 hover:shadow-lg hover:shadow-shop-accent/10">
            {/* Wishlist Button */}
            {props.addToWishlist && !props.isInWishlist && (
                <button
                    onClick={onAddToWishlist}
                    className="absolute top-3 right-3 z-10 p-2 bg-shop-bg/80 backdrop-blur-sm rounded-full text-shop-text-muted hover:text-shop-warning hover:bg-shop-bg transition-colors"
                >
                    <HeartIcon width={18} height={18} />
                </button>
            )}
            {props.isInWishlist && (
                <div className="absolute top-3 right-3 z-10 p-2 bg-shop-bg/80 backdrop-blur-sm rounded-full">
                    <HeartIcon width={18} height={18} fill="#f59e0b" stroke="#f59e0b" />
                </div>
            )}

            {/* Product Image */}
            <div className="aspect-square overflow-hidden bg-shop-border">
                <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={props.product.image}
                    alt={props.product.name}
                />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                <div>
                    <h3 className="font-semibold text-shop-text truncate">
                        {props.product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold text-shop-accent">
                            ${props.product.price}
                        </span>
                        {props.product.discount && (
                            <span className="px-2 py-0.5 text-xs font-semibold bg-shop-success/20 text-shop-success rounded-full">
                                {props.product.discount}% OFF
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    {props.addToCart && (
                        <button
                            onClick={props.addToCart}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-shop-accent hover:bg-shop-accent-hover text-white font-medium rounded-lg transition-colors"
                        >
                            <ShoppingCartIcon width={16} height={16} />
                            Add to cart
                        </button>
                    )}
                    {props.onRemove && !props.addToCart && (
                        <button
                            onClick={props.onRemove}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-shop-danger/10 hover:bg-shop-danger/20 text-shop-danger font-medium rounded-lg transition-colors"
                        >
                            <TrashIcon width={16} height={16} />
                            Remove
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
