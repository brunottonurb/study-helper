import { Topic } from '@/types';

import { electron } from './electron';
import { electronCrossPlatform } from './electron-cross-platform';

export const desktopTopics: Topic[] = [
  electron,
  electronCrossPlatform,
];

export { electron, electronCrossPlatform };
