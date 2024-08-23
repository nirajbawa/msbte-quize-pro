import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const getQuestion = async (id: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/dashboard/my-tests/test/questions/${id}`
  );
  return response.data;
};

export const submitQuestions = async (
  id: any,
  data: any
): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(
    `/api/dashboard/my-tests/test/submit/${id}`,
    data
  );
  return response.data;
};
