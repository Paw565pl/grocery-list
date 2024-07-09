import Product from "@/entities/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { actions } from "@/store/productsListSlice";
import { Button } from "@/components/ui/button";

interface QuantitySelectorProps {
  product: Product;
}

const QuantitySelector = ({ product }: QuantitySelectorProps) => {
  const productsList = useAppSelector((s) => s.productsList);
  const dispatch = useAppDispatch();
  const { addItem, removeItem } = actions;

  const productsListItem = productsList.find(
    (item) => item.product.id === product.id,
  );

  if (!productsListItem) {
    return (
      <Button size="sm" onClick={() => dispatch(addItem(product))}>
        Add to list
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        onClick={() => dispatch(removeItem(product.id))}
        className="text-lg"
      >
        -
      </Button>
      <span>{productsListItem.quantity}</span>
      <Button
        size="sm"
        onClick={() => dispatch(addItem(product))}
        className="text-lg"
      >
        +
      </Button>
    </div>
  );
};

export default QuantitySelector;
