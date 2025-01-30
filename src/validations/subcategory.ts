import { z } from 'zod';

export const subcategoryCreateSchema = z.object({
    name: z.string().min(3),
    image: z.string().url(),
    description: z.string().optional(),
    taxApplicability: z.boolean().optional(),
    tax: z.number().optional(),
    categoryId: z.number(),
});
