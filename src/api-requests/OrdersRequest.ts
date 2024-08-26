import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const getOrders = async (page: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/admin/orders?page=${page}&limit=10`
  );
  return response.data;
};
