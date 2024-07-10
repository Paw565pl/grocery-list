import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCategories from "@/hooks/useCategories";

interface CategoryFilterProps {
  onValueChange: (value: string) => void;
}

const CategoryFilter = ({ onValueChange }: CategoryFilterProps) => {
  const { data: categories, isError, isLoading } = useCategories();

  if (isLoading || isError) return null;
  if (categories?.length === 0) return null;

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">All</SelectItem>
          {categories?.map((category) => (
            <SelectItem key={category.id} value={category.id.toString()}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
