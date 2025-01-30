import { db } from '../db/drizzle';
import { eq, or } from 'drizzle-orm';
import { subcategory, category } from '../db/schema';

export const createSubcategory = async (
    data: typeof subcategory.$inferInsert
) => {
    // Check if the category exists before creating the subcategory
    // If it doesn't exist, the query will throw an error
    const existingCategory = (
        await db.select().from(category).where(eq(category.id, data.categoryId))
    )[0];

    // If the category exists, use its taxApplicability and tax values
    const finalData = {
        ...data,
        taxApplicability:
            data.taxApplicability ?? existingCategory?.taxApplicability,
        tax: data.tax ?? existingCategory?.tax,
    };
    return await db.insert(subcategory).values(finalData).returning();
};

export const getAllSubcategories = async () => {
    return await db.select().from(subcategory);
};

export const getAllSubcategoriesUnderCategory = async (categoryId: number) => {
    return await db
        .select()
        .from(subcategory)
        .where(eq(subcategory.categoryId, categoryId));
};

export const getSubcategoryByIdOrName = async (identifier: number | string) => {
    return await db
        .select()
        .from(subcategory)
        .where(
            or(
                // Try numeric ID first (if it's a number) or fallback to string name
                typeof identifier === 'number'
                    ? eq(subcategory.id, identifier)
                    : eq(subcategory.name, identifier)
            )
        );
};

export const updateSubcategory = async (
    identifier: number | string,
    data: Partial<typeof subcategory>
) => {
    return await db
        .update(subcategory)
        .set(data)
        .where(
            // Try numeric ID first (if it's a number) or fallback to string name
            typeof identifier === 'number'
                ? eq(subcategory.id, identifier)
                : eq(subcategory.name, identifier)
        )
        .returning();
};
