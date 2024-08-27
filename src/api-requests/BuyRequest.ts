"use client";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const createOrder = async (id: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/dashboard/cart/checkout/${id}`
  );
  return response.data;
};

export const verifyOrder = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(
    `/api/dashboard/cart/checkout`,
    data
  );
  return response.data;
};

export const freeTest = async (id: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/dashboard/cart/checkout/free/${id}`
  );
  return response.data;
};
