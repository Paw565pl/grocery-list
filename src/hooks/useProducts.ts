import Product from "@/entities/product";
import apiService from "@/services/apiService";
import { QueryClient, useQuery } from "@tanstack/react-query";
import ms from "ms";
import { cache } from "react";

const fetchProducts = cache(async () => {
  const { data } = await apiService.get<Product[]>("/products");
  return data;
});

const queryKey = ["products"];

export const prefetchProducts = (queryClient: QueryClient) =>
  queryClient.prefetchQuery({ queryKey, queryFn: fetchProducts });

const useProducts = () =>
  useQuery({ queryKey, queryFn: fetchProducts, staleTime: ms("10m") });

export default useProducts;
