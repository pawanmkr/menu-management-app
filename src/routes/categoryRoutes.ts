import express from 'express';
import * as categoryController from '../controllers/categoryController';

export const categoryRouter = express.Router();

categoryRouter.post('/', categoryController.createCategory);
categoryRouter.get('/', categoryController.getAllCategories);
categoryRouter.get('/:id', categoryController.getCategoryByIdOrName);
categoryRouter.put('/:id', categoryController.updateCategory);
