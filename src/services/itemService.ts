import { db } from '../db/drizzle';
import { item } from '../db/schema/item';
import { eq, or, ilike } from 'drizzle-orm';

export const createItem = async (data: typeof item.$inferInsert) => {
    return await db.insert(item).values(data).returning();
};

export const getAllItems = async () => {
    return await db.select().from(item);
};

export const getItemsUnderCategory = async (categoryId: number) => {
    return await db.select().from(item).where(eq(item.categoryId, categoryId));
};

export const getItemsUnderSubCategory = async (subCategoryId: number) => {
    return await db
        .select()
        .from(item)
        .where(eq(item.subcategoryId, subCategoryId));
};

export const getItemByIdOrName = async (identifier: string | number) => {
    return await db
        .select()
        .from(item)
        .where(
            or(
                // Try numeric ID first (if it's a number) or fallback to string name
                typeof identifier === 'number'
                    ? eq(item.id, identifier)
                    : eq(item.name, identifier)
            )
        );
};

export const updateItem = async (id: number, data: Partial<typeof item>) => {
    return await db.update(item).set(data).where(eq(item.id, id)).returning();
};

// Search for items with names that contain the query
export const searchItems = async (query: string) => {
    return await db
        .select()
        .from(item)
        .where(ilike(item.name, `%${query}%`));
};
