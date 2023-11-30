import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Reqrcode parser',
  path: '/reqrcode-parser',
  description: 'parser your qrcode',
  keywords: ['reqrcode', 'parser'],
  component: () => import('./reqrcode-parser.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2023-11-29'),
});
