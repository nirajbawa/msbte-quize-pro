import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const getQuestion = async (id: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/admin/test/questions/${id}`
  );
  return response.data;
};

export const saveQuestions = async (
  id: any,
  data: any
): Promise<ApiResponse> => {
  const response = await axios.patch<ApiResponse>(
    `/api/admin/test/questions/${id}`,
    data
  );
  return response.data;
};

export const submitQuestions = async (
  id: any,
  data: any
): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(
    `/api/admin/test/questions/${id}`,
    data
  );
  return response.data;
};
