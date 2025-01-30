import { Request, Response } from 'express';
import * as itemService from '../services/itemService';

/**
 * Creates a new menu item in either category or subcategory
 * POST /items
 */
export async function createItem(req: Request, res: Response) {
    try {
        // Note: Consider adding Zod validation similar to categories
        const item = await itemService.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        // Consistent error response format
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}

/**
 * Retrieves all items in the system
 * GET /items
 */
export async function getAllItems(req: Request, res: Response) {
    try {
        const items = await itemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve items' });
    }
}

/**
 * Gets items belonging to a specific category
 * GET /categories/:categoryId/items
 */
export async function getItemsUnderCategory(req: Request, res: Response) {
    try {
        // Numeric ID validation
        const categoryId = Number(req.params.categoryId);
        if (isNaN(categoryId)) throw new Error('Invalid category ID');

        const items = await itemService.getItemsUnderCategory(categoryId);
        res.status(200).json(items);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}

/**
 * Gets items belonging to a specific subcategory
 * GET /subcategories/:subcategoryId/items
 */
export async function getItemsUnderSubCategory(req: Request, res: Response) {
    try {
        const subcategoryId = Number(req.params.subcategoryId);
        if (isNaN(subcategoryId)) throw new Error('Invalid subcategory ID');

        const items = await itemService.getItemsUnderSubCategory(subcategoryId);
        res.status(200).json(items);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}

/**
 * Gets an item by either numeric ID or name
 * GET /items/:id
 */
export async function getItemByIdOrName(req: Request, res: Response) {
    try {
        // Flexible identifier handling
        let identifier: string | number = parseInt(req.params.id);
        if (isNaN(identifier)) {
            identifier = req.params.id;
        }

        const item = await itemService.getItemByIdOrName(identifier);
        item ? res.json(item) : res.status(404).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
}

/**
 * Updates existing item details
 * PUT /items/:id
 */
export async function updateItem(req: Request, res: Response) {
    try {
        const itemId = parseInt(req.params.id);
        if (isNaN(itemId)) throw new Error('Invalid item ID');

        const updatedItem = await itemService.updateItem(itemId, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : 'Unknown error';
        res.status(400).json({ error: message });
    }
}

/**
 * Searches items by name using partial matching
 * GET /items/search?query=:query
 */
export async function searchItems(req: Request, res: Response) {
    try {
        // Validate search query exists
        const query = req.query.query as string;
        if (!query?.trim()) {
            res.status(400).json({ error: 'Search query required' });
        }

        // Case-insensitive search implementation
        const items = await itemService.searchItems(query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: 'Search operation failed' });
    }
}
