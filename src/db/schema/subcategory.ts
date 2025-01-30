import { relations } from 'drizzle-orm';
import {
    pgTable,
    serial,
    varchar,
    boolean,
    numeric,
    integer,
    timestamp,
} from 'drizzle-orm/pg-core';
import { category } from './category';
import { item } from './item';

export const subcategory = pgTable('subcategory', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    image: varchar('image', { length: 500 }),
    description: varchar('description', { length: 1000 }),
    taxApplicability: boolean('tax_applicability'),
    tax: numeric('tax', { precision: 10, scale: 2 }),
    categoryId: integer('category_id')
        .references(() => category.id)
        .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const subcategoryRelations = relations(subcategory, ({ one, many }) => ({
    category: one(category, {
        fields: [subcategory.categoryId],
        references: [category.id],
    }),
    item: many(item),
}));
