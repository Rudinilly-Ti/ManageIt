import {
  Repository, getRepository, DeleteResult, MoreThanOrEqual, LessThanOrEqual,
} from 'typeorm';
import IExpenseDTO from '../../../dtos/IExpenseDTO';
import IExpenseRepository from '../../../repositories/IExpenseRepository';
import Expense from '../entities/Expense';

export default class ExpenseRepository implements IExpenseRepository {
  private ormRepository: Repository<Expense>

  constructor() {
    this.ormRepository = getRepository(Expense);
  }

  public async create(data: IExpenseDTO): Promise<Expense> {
    const expense = this.ormRepository.create(data);

    await this.ormRepository.save(expense);

    return expense;
  }

  public async findById(id: string): Promise<Expense | null> {
    const expense = await this.ormRepository.findOne({ id });

    return expense;
  }

  public async findByUserId(user_id: string): Promise<Expense[] | null> {
    const expenses = await this.ormRepository.find({ user_id });

    return expenses;
  }

  public async findByName(user_id: string, name: string): Promise<Expense[] | null> {
    const expenses = await this.ormRepository.find({ user_id, name });

    return expenses;
  }

  public async findByMinValue(user_id: string, value: number): Promise<Expense[] | null> {
    const expenses = await this.ormRepository.find({ user_id, value: MoreThanOrEqual(value) });

    return expenses;
  }

  public async findByMaxValue(user_id: string, value: number): Promise<Expense[] | null> {
    const expenses = await this.ormRepository.find({ user_id, value: LessThanOrEqual(value) });

    return expenses;
  }

  public async findByLimit(user_id: string, min: number, max: number): Promise<Expense[] | null> {
    const expenses = await this.ormRepository.find({
      user_id,
      value: MoreThanOrEqual(min) && LessThanOrEqual(max),
    });

    return expenses;
  }

  public async update(data: Expense): Promise<Expense> {
    return this.ormRepository.save(data)
  }

  public async delete(id: string): Promise<DeleteResult> {
    return this.ormRepository.delete({ id })
  }
}
