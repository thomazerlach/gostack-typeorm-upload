/* eslint-disable no-param-reassign */
import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    return transactions.reduce(
      (balance: Balance, transaction: Transaction) => {
        if (transaction.type === 'income') {
          balance.income += Number(transaction.value);
          balance.total += Number(transaction.value);
        } else if (transaction.type === 'outcome') {
          balance.outcome += Number(transaction.value);
          balance.total -= Number(transaction.value);
        }
        return balance;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }
}

export default TransactionsRepository;
