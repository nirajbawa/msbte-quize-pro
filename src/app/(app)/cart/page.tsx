"use client";
import CartSectionCard from "@/components/CartSectionCard";
import ClientOnly from "@/components/ClientOnly";
import useCartStore from "@/store/useCartStore";
import React, { useEffect } from "react";

function Cart() {
  const cartState = useCartStore((state: any) => state.cart);
  const loadCartItems = useCartStore((state: any) => state.loadCartItems);

  useEffect(() => {
    loadCartItems();
  }, []);

  return (
    <ClientOnly>
      <main className="w-full min-h-screen homeLayout pt-28  gap-12 text-gray-800 flex justify-between flex-col md:flex-wrap md:flex-row">
        <div className="blurCss w-full min-h-screen rounded-xl flex flex-col">
          <h1 className="rowdies text-center md:text-left py-6 px-10 border-gray-100 border-b-2 font-bold text-2xl">
            Shopping Cart
          </h1>
          <main className="p-10 flex justify-center gap-10 flex-wrap">
            {cartState.map((item: any, index: number) => (
              <CartSectionCard
                key={index}
                title={item.title}
                price={item.price}
                btnUrl={`/cart/checkout?id=${item._id}`}
                img={item.banner}
                id={item._id}
                date={item.updatedAt}
              />
            ))}
          </main>
        </div>
      </main>
    </ClientOnly>
  );
}

export default Cart;
