import express from 'express';
import * as ItemController from '../controllers/itemController';

export const itemRouter = express.Router();

itemRouter.post('/', ItemController.createItem);
itemRouter.get('/search', ItemController.searchItems);
itemRouter.get('/', ItemController.getAllItems);
itemRouter.get('/:id', ItemController.getItemByIdOrName);
itemRouter.put('/:id', ItemController.updateItem);
itemRouter.get('/category/:categoryId', ItemController.getItemsUnderCategory);
itemRouter.get(
    '/subcategory/:subcategoryId',
    ItemController.getItemsUnderSubCategory
);
