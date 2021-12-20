import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ExpenseService from '../../../services/ExpenseService';

export default class ExpenseController {
  public async createExpense(request: Request, response: Response): Promise<Response> {
    const expenseService = container.resolve(ExpenseService);
    const user_id = request.user.id;

    const { name, description, value } = request.body;

    const expense = await expenseService.create({
      user_id, name, description, value,
    });

    return response.json(expense);
  }

  public async listExpenses(request: Request, response: Response): Promise<Response> {
    const expenseService = container.resolve(ExpenseService);
    const user_id = request.user.id;

    const {
      option, name, min, max,
    } = request.body;

    const expenses = await expenseService.listExpenses({
      user_id, option, name, min, max,
    });

    return response.json(expenses);
  }

  public async updateExpense(request: Request, response: Response): Promise<Response> {
    const expenseService = container.resolve(ExpenseService);
    const user_id = request.user.id;

    const {
      id, name, description, value,
    } = request.body;

    const expense = await expenseService.updateExpense({
      id, user_id, name, description, value,
    });

    return response.json(expense);
  }

  public async deleteExpense(request: Request, response: Response): Promise<Response> {
    const expenseService = container.resolve(ExpenseService);
    const user_id = request.user.id;

    const { id } = request.body;

    const expense = await expenseService.deleteExpense(id, user_id);

    return response.json(expense);
  }
}
