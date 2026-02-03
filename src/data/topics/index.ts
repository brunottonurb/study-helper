import { Topic } from '@/types';

import { theoreticalCsTopics } from './theoretical-cs';
import { technicalCsTopics } from './technical-cs';
import { databasesTopics } from './databases';
import { networksTopics } from './networks';
import { languagesTopics } from './languages';
import { frontendTopics } from './frontend';
import { backendTopics } from './backend';
import { desktopTopics } from './desktop';

export const topics: Topic[] = [
  ...theoreticalCsTopics,
  ...technicalCsTopics,
  ...databasesTopics,
  ...networksTopics,
  ...languagesTopics,
  ...frontendTopics,
  ...backendTopics,
  ...desktopTopics,
];

// Re-export all topics
export * from './theoretical-cs';
export * from './technical-cs';
export * from './databases';
export * from './networks';
export * from './languages';
export * from './frontend';
export * from './backend';
export * from './desktop';
