import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Rss subscribor',
  path: '/rss-subscribor',
  description: '',
  keywords: ['rss', 'subscribor'],
  component: () => import('./rss-subscribor.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2023-12-02'),
});