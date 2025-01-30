import { Request, Response } from 'express';
import * as subcategoryService from '../services/subcategoryService';
import { subcategoryCreateSchema } from '../validations/subcategory';

/**
 * Creates a new subcategory under a parent category
 * POST /subcategories
 */
export const createSubcategory = async (req: Request, res: Response) => {
    try {
        // Validate request body structure and data types
        const validatedData = subcategoryCreateSchema.parse(req.body);

        // Convert tax to string for precise decimal storage
        const subcategory = await subcategoryService.createSubcategory({
            ...validatedData,
            tax: validatedData.tax?.toString(),
        });

        res.status(201).json(subcategory);
    } catch (error) {
        // Type-safe error handling
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};

/**
 * Retrieves all subcategories across all categories
 * GET /subcategories
 */
export const getAllSubcategories = async (req: Request, res: Response) => {
    try {
        const subcategories = await subcategoryService.getAllSubcategories();
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};

/**
 * Gets all subcategories belonging to a specific parent category
 * GET /categories/:id/subcategories
 */
export const getAllSubcategoriesUnderCategory = async (
    req: Request,
    res: Response
) => {
    try {
        // Convert route parameter to numeric ID
        const categoryId = parseInt(req.params.id);
        if (isNaN(categoryId)) throw new Error('Invalid category ID');

        const subcategories =
            await subcategoryService.getAllSubcategoriesUnderCategory(
                categoryId
            );
        res.json(subcategories);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subcategories' });
    }
};

/**
 * Gets a subcategory by either numeric ID or name string
 * GET /subcategories/:id
 */
export const getSubcategoryByIdOrName = async (req: Request, res: Response) => {
    try {
        // Handle both ID and name lookup from same endpoint
        let identifier: string | number = parseInt(req.params.id);
        if (isNaN(identifier)) {
            identifier = req.params.id;
        }

        const subcategory = await subcategoryService.getSubcategoryByIdOrName(
            identifier
        );
        subcategory ? res.json(subcategory) : res.status(404).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch subcategory' });
    }
};

/**
 * Updates existing subcategory details
 * PUT /subcategories/:id
 */
export const updateSubcategory = async (req: Request, res: Response) => {
    try {
        const subcategoryId = parseInt(req.params.id);
        if (isNaN(subcategoryId)) throw new Error('Invalid subcategory ID');

        // Partial update implementation
        const subcategory = await subcategoryService.updateSubcategory(
            subcategoryId,
            req.body
        );
        res.json(subcategory);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update subcategory' });
    }
};
