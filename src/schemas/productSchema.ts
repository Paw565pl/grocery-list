import { z } from "zod";

const productSchema = z.object({
  id: z.number().optional(),
  name: z
    .string({ required_error: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters long.")
    .max(255, "Name must be less than 255 characters long."),
  price: z.coerce
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price is required.",
    })
    .min(1)
    .max(1000),
  categoryId: z.number({
    required_error: "Category is required.",
  }),
});

export type ProductData = z.infer<typeof productSchema>;

export default productSchema;
