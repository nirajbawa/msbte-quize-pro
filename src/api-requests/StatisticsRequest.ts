"use client";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const getDashboardStatistics = async (): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/api/admin/statistics`);
  return response.data;
};
