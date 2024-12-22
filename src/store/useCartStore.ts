"use client";
import {
  addNewItemToCart,
  getCartItems,
  removeItemFromCart,
} from "@/api-requests/CartRequest";
import { create } from 'zustand';
import { persist } from "zustand/middleware";

interface cart {
  _id: string;
  title: string;
  price: string;
  banner: string;
  updatedAt: string;
}

function difference(setA: any, setB: any) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

const useCartStore = create(
  persist(
    (set: any, get: any) => ({
      cart: [],
      addNewToCartItem: async (data: cart) => {
        let flag = true;
        get().cart.forEach((item: any) => {
          if (item._id === data._id) {
            flag = false;
          }
        });
        if (flag) {
          set((state: any) => ({
            cart: [...state.cart, data],
          }));
          try {
            await addNewItemToCart({ testId: data._id });
          } catch {}
        }
      },
      removeItemFromCart: async (id: string) => {
        const filteredData = get().cart.filter((item: any) => item._id !== id);
        set({ cart: filteredData });
        try {
          await removeItemFromCart({ testId: id });
        } catch {}
      },
      loadCartItems: async () => {
        try {
          const localData = get().cart;
          const serverData = (await getCartItems()).data;

          const setLocalData = new Set(localData.map((item: any) => item._id));
          const setServerData = new Set(
            serverData.map((item: any) => item.testId._id)
          );

          let dataNotAvailableOnServer = difference(
            setLocalData,
            setServerData
          );

          if (dataNotAvailableOnServer.size > 0) {
            let requests: Promise<any>[] = [];
            dataNotAvailableOnServer.forEach((item) => {
              requests.push(addNewItemToCart({ testId: item }));
            });

            Promise.all(requests)
              .then(async (data) => {
                const newServerData = (await getCartItems()).data;
                const filteredData: cart[] = newServerData.map((item: any) => ({
                  _id: item.testId._id,
                  title: item.testId.title,
                  price: item.testId.price,
                  banner: item.testId.banner,
                  updatedAt: item.testId.updatedAt,
                }));
                set({ cart: filteredData });
              })
              .catch((error) => {
              });
          } else {
            const data: cart[] = serverData.map((item: any) => ({
              _id: item.testId._id,
              title: item.testId.title,
              price: item.testId.price,
              banner: item.testId.banner,
              updatedAt: item.testId.updatedAt,
            }));
            set({ cart: data });
          }
        } catch (error) {
          
        }
      },
    }),
    {
      name: "cart",
      getStorage: () => localStorage,
    }
  )
);

export default useCartStore;
