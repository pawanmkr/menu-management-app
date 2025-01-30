import { relations } from 'drizzle-orm';
import {
    pgTable,
    serial,
    varchar,
    boolean,
    numeric,
    timestamp,
} from 'drizzle-orm/pg-core';
import { subcategory } from './subcategory';
import { item } from './item';

export const category = pgTable('category', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    image: varchar('image', { length: 500 }),
    description: varchar('description', { length: 1000 }),
    taxApplicability: boolean('tax_applicability').default(false),
    tax: numeric('tax', { precision: 10, scale: 2 }),
    taxType: varchar('tax_type', { length: 50 }),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const categoryRelations = relations(category, ({ many }) => ({
    subcategory: many(subcategory),
    item: many(item),
}));
