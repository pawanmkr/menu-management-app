import { z } from 'zod';

export const itemCreateSchema = z.object({
    name: z.string().min(3),
    image: z.string().url(),
    description: z.string().optional(),
    price: z.number().positive(),
    category: z.string(),
    taxApplicability: z.boolean().default(false),
    tax: z.number().optional(),
    taxType: z.string().optional(),
});

export const itemUpdateSchema = itemCreateSchema.partial();
