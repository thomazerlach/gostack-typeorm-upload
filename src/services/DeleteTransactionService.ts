import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import TransactionsRepositories from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionsRepositories = getCustomRepository(
      TransactionsRepositories,
    );

    const transaction = await transactionsRepositories.findOne(id);

    if (!transaction) {
      throw new AppError('Invalid transaction Id');
    }

    await transactionsRepositories.remove(transaction);
  }
}

export default DeleteTransactionService;
