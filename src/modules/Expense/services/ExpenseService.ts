import { inject, injectable } from 'tsyringe';
import { DeleteResult } from 'typeorm';
import IExpenseRepository from '../repositories/IExpenseRepository';
import IExpenseDTO from '../dtos/IExpenseDTO';
import Expense from '../infra/typeorm/entities/Expense';

interface IRequest {
  id: string
  user_id: string
  name?: string
  description?: string
  value?: number
}

interface IListExpenses {
  user_id: string
  option?: string
  name?: string
  min?: number
  max?: number
}

@injectable()
export default class ExpenseService {
  constructor(
    @inject('ExpenseRepository')
    private expenseRepository: IExpenseRepository,
  ) { }

  public async create({
    user_id, name, description, value,
  }: IExpenseDTO): Promise<Expense> {
    const myExpenses = await this.expenseRepository.findByName(user_id, name);

    myExpenses.forEach((expense) => {
      if (expense.description === description && expense.value === value) {
        throw new Error('Expense already registred.')
      }
    });

    const expense = await this.expenseRepository.create({
      user_id, name, description, value,
    });

    return expense;
  }

  public async listExpenses({
    user_id, option, name, min, max,
  }: IListExpenses): Promise<Expense[]> {
    let expenses: Expense[];

    if (!option) {
      expenses = await this.expenseRepository.findByUserId(user_id);
    }

    if (option === 'name') {
      expenses = await this.expenseRepository.findByName(user_id, name);
    }

    if (option === 'minValue') {
      expenses = await this.expenseRepository.findByMinValue(user_id, min);
    }

    if (option === 'maxValue') {
      expenses = await this.expenseRepository.findByMaxValue(user_id, max);
    }

    if (option === 'limit') {
      expenses = await this.expenseRepository.findByLimit(user_id, min, max);
    }

    if (expenses.length === 0) {
      throw new Error("Can't find any expense.")
    }

    return expenses;
  }

  public async updateExpense({
    id, user_id, name, description, value,
  }: IRequest): Promise<Expense> {
    const myExpenses = await this.expenseRepository.findByName(user_id, name);

    myExpenses.forEach((expense) => {
      if (expense.description === description && expense.value === value) {
        throw new Error('You already have an expense with this informations.')
      }
    });

    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new Error('Expense not found.')
    }

    if (expense.user_id !== user_id) {
      throw new Error('You are not allowed to update.');
    }

    if (name && expense.name !== name) { expense.name = name }
    if (description && expense.description !== description) { expense.description = description }
    if (value && expense.value !== value) { expense.value = value }

    await this.expenseRepository.update(expense);

    return expense;
  }

  public async deleteExpense(id: string, user_id: string): Promise<DeleteResult> {
    const expense = await this.expenseRepository.findById(id);

    if (!expense) {
      throw new Error('Expense not found.')
    }

    if (expense.user_id !== user_id) {
      throw new Error('You are not allowed to update.');
    }

    const res = await this.expenseRepository.delete(id);

    return res;
  }
}
