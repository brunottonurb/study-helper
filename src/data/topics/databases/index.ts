import { Topic } from '@/types';

import { relationalModel } from './relational-model';
import { sqlFundamentals } from './sql-fundamentals';
import { normalization } from './normalization';
import { transactions } from './transactions';

export const databasesTopics: Topic[] = [
  relationalModel,
  sqlFundamentals,
  normalization,
  transactions,
];

export { relationalModel, sqlFundamentals, normalization, transactions };
