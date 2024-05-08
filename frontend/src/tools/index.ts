import type {ToolCategory} from './tools.types';

export const toolsByCategory: ToolCategory[] = [];

export const tools = toolsByCategory.flatMap(({components}) => components);
export const toolsWithCategory = toolsByCategory.flatMap(({components, name}) =>
    components.map(tool => ({category: name, ...tool})),
);
