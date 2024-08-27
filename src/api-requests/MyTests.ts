"use client";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const getMyTests = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/api/dashboard/my-tests`);
  return response.data;
};
