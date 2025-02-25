import Category from "@/entities/category";
import apiService from "@/services/apiService";
import { QueryClient, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { cache } from "react";

const fetchCategories = cache(async () => {
  const { data } = await apiService.get<Category[]>("/categories");
  return data;
});

const queryKey = ["categories"];

export const prefetchCategories = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({ queryKey, queryFn: fetchCategories });

const useCategories = () =>
  useQuery({ queryKey, queryFn: fetchCategories, staleTime: ms("1h") });

export default useCategories;
