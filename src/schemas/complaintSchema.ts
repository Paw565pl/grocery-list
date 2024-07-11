import { z } from "zod";

const complaintSchema = z.object({
  title: z
    .string({ required_error: "Title is required." })
    .trim()
    .min(2, "Title must be at least 2 characters long.")
    .max(255, "Title must be less than 255 characters long."),
  description: z
    .string({ required_error: "Description is required." })
    .trim()
    .min(10, "Description must be at least 10 characters long.")
    .max(1000, "Description must be less than 1000 characters long."),
});

export type ComplaintData = z.infer<typeof complaintSchema>;

export default complaintSchema;
