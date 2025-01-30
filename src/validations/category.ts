import { z } from 'zod';

export const categoryCreateSchema = z.object({
    name: z.string().min(3),
    image: z.string().url(),
    description: z.string().optional(),
    taxApplicability: z.boolean().default(false),
    tax: z.number().optional(),
    taxType: z.string().optional(),
});
