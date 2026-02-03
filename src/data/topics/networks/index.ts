import { Topic } from '@/types';

import { osiModel } from './osi-model';
import { tcpIp } from './tcp-ip';
import { dns } from './dns';
import { http } from './http';

export const networksTopics: Topic[] = [
  osiModel,
  tcpIp,
  dns,
  http,
];

export { osiModel, tcpIp, dns, http };
