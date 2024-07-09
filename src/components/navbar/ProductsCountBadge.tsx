"use client";

import { Badge } from "@/components/ui/badge";
import { useAppSelector } from "@/store/hooks";

const ProductsCountBadge = () => {
  const productsList = useAppSelector((s) => s.productsList);
  const totalItemsCount = productsList.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return <Badge>{totalItemsCount}</Badge>;
};

export default ProductsCountBadge;
