import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const signUpRequest = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>("/api/auth/sign-up", data);
  return response.data;
};

export const verifyUser = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>("/api/auth/verify", data);
  return response.data;
};
