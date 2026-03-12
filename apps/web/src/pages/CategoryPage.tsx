import Cart from "../components/Cart";
import Wishlist from "../components/Wishlist";
import ProductList from '../components/ProductList';
import Header from "../components/Header";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useProducts } from "../hooks/useProducts";

export default function CategoryPage() {
    const { products, removeProduct } = useProducts();
    const { productsInBasket, addToCart, removeFromCart } = useCart();
    const { productsInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    return (
        <>
            <Header
                cartCount={productsInBasket.length}
                wishlistCount={productsInWishlist.length}
            />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Products Grid - 3 columns on large screens */}
                    <div className="lg:col-span-3">
                        <h2 className="text-2xl font-bold mb-6">Products</h2>
                        <ProductList products={products} addToCart={addToCart} addToWishlist={addToWishlist} removeProduct={removeProduct} productsInWishlist={productsInWishlist}/>
                    </div>

                    {/* Sidebar - Cart and Wishlist */}
                    <div className="lg:col-span-1 space-y-6">
                        <Cart productsInBasket={productsInBasket} removeFromCart={removeFromCart}/>
                        <Wishlist productsInWishlist={productsInWishlist} removeFromWishlist={removeFromWishlist}/>
                    </div>
                </div>
            </main>
        </>
    )
}
