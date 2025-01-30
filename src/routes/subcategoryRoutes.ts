import express from 'express';
import * as subcategoryController from '../controllers/subcategoryController';

export const subcategoryRouter = express.Router();

subcategoryRouter.post('/', subcategoryController.createSubcategory);
subcategoryRouter.get('/', subcategoryController.getAllSubcategories);
subcategoryRouter.get('/:id', subcategoryController.getSubcategoryByIdOrName);
subcategoryRouter.get(
    '/category/:id',
    subcategoryController.getAllSubcategoriesUnderCategory
);
subcategoryRouter.put('/:id', subcategoryController.updateSubcategory);
