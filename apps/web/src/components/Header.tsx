import ShoppingCartIcon from "./icons/ShoppingCartIcon"
import HeartIcon from "./icons/HeartIcon"

interface HeaderProps {
    cartCount: number
    wishlistCount: number
}

export default function Header({ cartCount, wishlistCount }: HeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-shop-card/95 backdrop-blur-sm border-b border-shop-border">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-shop-accent rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">S</span>
                    </div>
                    <h1 className="text-xl font-bold text-shop-text">ShopReact</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-shop-text-muted">
                        <HeartIcon width={20} height={20} stroke="currentColor" />
                        <span className="text-sm">{wishlistCount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-shop-text-muted">
                        <ShoppingCartIcon width={20} height={20} />
                        <span className="text-sm">{cartCount}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
