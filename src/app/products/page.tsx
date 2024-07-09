import ProductsTable from "@/components/productsTable";

export const revalidate = 600; // 10 minutes

const ProductsPage = () => {
  return (
    <>
      <h1 className="text-5xl font-bold">Products</h1>
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
