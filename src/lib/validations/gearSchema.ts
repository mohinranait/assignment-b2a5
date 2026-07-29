import { z } from "zod";

export const gearFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  brand: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Please select a category"),
  pricePerDay: z.coerce.number().min(1, "Price must be greater than 0"),
  stock: z.coerce.number().min(1, "Stock must be at least 1"),
  status: z.boolean().default(true),
  feature: z.boolean().default(true),
  images: z.array(z.string()).optional().nullable(), 
});

export type TGearFormInput = z.input<typeof gearFormSchema>;
// export type TGearFormOutput = z.output<typeof gearFormSchema>;
