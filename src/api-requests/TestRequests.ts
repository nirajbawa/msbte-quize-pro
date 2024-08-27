"use client";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

export const uploadImage = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>(
    "/api/admin/uploads/image",
    data
  );
  return response.data;
};

export const createNewTest = async (data: any): Promise<ApiResponse> => {
  const response = await axios.post<ApiResponse>("/api/admin/test", data);
  return response.data;
};

export const getTests = async ({ pageParam }: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/admin/test?page=${pageParam}&limit=3`
  );
  return response.data;
};

export const getTest = async (id: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/api/admin/test/${id}`);
  return response.data;
};

export const updateTest = async (id: any, data: any): Promise<ApiResponse> => {
  const response = await axios.put<ApiResponse>(`/api/admin/test/${id}`, data);
  return response.data;
};

export const getUserTests = async ({
  pageParam,
}: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(
    `/api/test?page=${pageParam}&limit=3`
  );
  return response.data;
};

export const getUserTest = async (id: any): Promise<ApiResponse> => {
  const response = await axios.get<ApiResponse>(`/api/test/${id}`);
  return response.data;
};
