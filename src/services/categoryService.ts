import { db } from '../db/drizzle';
import { category } from '../db/schema/category';
import { eq, or } from 'drizzle-orm';

export const createCategory = async (data: typeof category.$inferInsert) => {
    return await db.insert(category).values(data).returning();
};

export const getAllCategories = async () => {
    return await db.select().from(category);
};

export const getCategoryByIdOrName = async (identifier: string | number) => {
    return await db
        .select()
        .from(category)
        .where(
            or(
                // Try numeric ID first (if it's a number) or fallback to string name
                typeof identifier === 'string'
                    ? eq(category.name, identifier)
                    : eq(category.id, identifier)
            )
        );
};

export const updateCategory = async (
    identifier: string | number,
    data: Partial<typeof category>
) => {
    return await db
        .update(category)
        .set(data)
        .where(
            // Try numeric ID first (if it's a number) or fallback to string name
            typeof identifier === 'string'
                ? eq(category.name, identifier)
                : eq(category.id, identifier)
        )
        .returning();
};
