import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';
import { categoryCreateSchema } from '../validations/category';

/**
 * Handles category creation with validation and error handling
 * POST /categories
 */
export const createCategory = async (req: Request, res: Response) => {
    try {
        // Validate request body against Zod schema
        const validatedData = categoryCreateSchema.parse(req.body);

        // Convert tax to string for database precision handling
        const category = await categoryService.createCategory({
            ...validatedData,
            tax: validatedData.tax?.toString(),
        });

        // Return 201 Created with new category data
        res.status(201).json(category);
    } catch (error) {
        // Handle validation errors and service layer errors
        res.status(400).json({ error: (error as any).message });
    }
};

/**
 * Retrieves all categories from the system
 * GET /categories
 */
export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        // Generic error message to avoid exposing internal details
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

/**
 * Gets a single category by either ID (number) or name (string)
 * GET /categories/:id
 */
export const getCategoryByIdOrName = async (req: Request, res: Response) => {
    try {
        // Flexible identifier handling: try numeric ID first
        let identifier: string | number = parseInt(req.params.id);
        if (isNaN(identifier)) {
            // Fallback to string name if ID parsing fails
            identifier = req.params.id;
        }

        const category = await categoryService.getCategoryByIdOrName(
            identifier
        );
        category
            ? res.json(category)
            : res.status(404).json({ error: 'Category not found' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category' });
    }
};

/**
 * Updates existing category details
 * PUT /categories/:id
 */
export const updateCategory = async (req: Request, res: Response) => {
    try {
        // Ensure numeric ID from route parameter
        const categoryId = parseInt(req.params.id);
        if (isNaN(categoryId)) throw new Error('Invalid category ID');

        // Pass update data to service layer
        const category = await categoryService.updateCategory(
            categoryId,
            req.body
        );
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
};
