"use client";
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';

const CartPage = () => {
    const { cart } = useCart();
    const SHIPPING_FEE = 300; // Your static delivery price

    if (!cart) return <div className="text-center py-20">Loading your treasures...</div>;

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-32 text-center font-['Inter']">
                <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
                <Link href="/store" className="bg-lilshop-warm text-lilshop-charcoal px-8 py-3 rounded-lg font-bold hover:bg-lilshop-tan">
                    Start Shopping
                </Link>
            </div>
        );
    }

    // Logic: subtotal from Medusa + your static 300 PKR
    const subtotal = cart.subtotal || 0;
    const finalTotal = subtotal + SHIPPING_FEE;

    return (
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 bg-white font-['Inter']">
            <h1 className="text-4xl md:text-5xl font-['Poppins'] font-bold text-lilshop-charcoal mb-12 text-center">
                Your Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    <div className="border-t border-gray-100">
                        {cart.items.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                    <Link href="/store" className="inline-block mt-8 text-lilshop-darkbrown font-semibold hover:underline">
                        ← Continue Shopping
                    </Link>
                </div>

                <div className="lg:col-span-1">
                    <div className="p-8 border border-gray-100 rounded-2xl bg-gray-50 sticky top-24 shadow-sm">
                        <h2 className="text-2xl font-['Poppins'] font-bold text-lilshop-darkbrown mb-6 border-b pb-4">
                            Order Summary
                        </h2>
                        
                        <div className="space-y-4 text-gray-700">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="font-semibold">PKR {subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery Fee</span>
                                <span className="font-semibold">PKR {SHIPPING_FEE}</span>
                            </div>
                            <div className="flex justify-between font-bold border-t border-gray-200 pt-5 text-2xl text-lilshop-charcoal">
                                <span>Total</span>
                                <span>PKR {finalTotal}</span>
                            </div>
                        </div>

                        <Link href="/checkout">
                            <button className="w-full mt-8 py-4 text-lg font-bold rounded-xl shadow-lg bg-lilshop-warm text-lilshop-charcoal hover:bg-lilshop-tan transform hover:-translate-y-1 transition-all">
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;