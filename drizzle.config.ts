import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    out: './migrations',
    schema: [
        './src/db/schema/category.ts',
        './src/db/schema/item.ts',
        './src/db/schema/subcategory.ts',
    ],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
});
