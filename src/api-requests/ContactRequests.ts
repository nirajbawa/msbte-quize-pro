import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const sendContactMessage = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(`/api/contact-us`, data);
  return response.data;
};
