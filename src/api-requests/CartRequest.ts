"use client";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const getCartItems = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/api/dashboard/cart`);
  return response.data;
};

export const addNewItemToCart = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(`/api/dashboard/cart`, data);
  return response.data;
};

export const removeItemFromCart = async (data: any): Promise<ApiResponse> => {
  const response = await axios.put<ApiResponse>(`/api/dashboard/cart`, data);
  return response.data;
};
