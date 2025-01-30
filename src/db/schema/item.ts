import {
    pgTable,
    serial,
    varchar,
    boolean,
    numeric,
    integer,
    timestamp,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { category } from './category';
import { subcategory } from './subcategory';

export const item = pgTable('item', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    image: varchar('image', { length: 500 }),
    description: varchar('description', { length: 1000 }),
    taxApplicability: boolean('tax_applicability').default(false),
    tax: numeric('tax', { precision: 10, scale: 2 }),
    baseAmount: numeric('base_amount', { precision: 10, scale: 2 }).notNull(),
    discount: numeric('discount', { precision: 10, scale: 2 }).default('0'),
    totalAmount: numeric('total_amount', { precision: 10, scale: 2 }).notNull(),
    categoryId: integer('category_id').references(() => category.id),
    subcategoryId: integer('subcategory_id').references(() => subcategory.id),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const itemRelations = relations(item, ({ one }) => ({
    category: one(category, {
        fields: [item.categoryId],
        references: [category.id],
    }),
    subcategory: one(subcategory, {
        fields: [item.subcategoryId],
        references: [subcategory.id],
    }),
}));
