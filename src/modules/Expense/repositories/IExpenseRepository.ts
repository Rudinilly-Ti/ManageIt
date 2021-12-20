import { DeleteResult } from 'typeorm';
import Expense from '../infra/typeorm/entities/Expense';
import IExpenseDTO from '../dtos/IExpenseDTO';

export default interface IExpenseRepository {
  create(data: IExpenseDTO): Promise<Expense>
  findById(id: string): Promise<Expense | null>
  findByUserId(user_id: string): Promise<Expense[] | null>
  findByName(user_id: string, name: string): Promise<Expense[] | null>
  findByMinValue(user_id: string, value: number): Promise<Expense[] | null>
  findByMaxValue(user_id: string, value: number): Promise<Expense[] | null>
  findByLimit(user_id: string, min: number, max: number): Promise<Expense[] | null>
  update(data: Expense): Promise<Expense>
  delete(id: string): Promise<DeleteResult>
}
