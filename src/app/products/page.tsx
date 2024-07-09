import ProductsTable from "@/components/productsTable";
import { prefetchProducts } from "@/hooks/useProducts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export const revalidate = 600; // 10 minutes

const ProductsPage = async () => {
  const queryClient = new QueryClient();
  await prefetchProducts(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <h1 className="text-5xl font-bold">Products</h1>
      <ProductsTable />
    </HydrationBoundary>
  );
};

export default ProductsPage;
