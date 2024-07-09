"use client";

import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";

const ProductsCountBadge = () => {
  const products = useAppSelector((s) => s.productsList.products);

  return <Badge>{products.length}</Badge>;
};

export default ProductsCountBadge;
