import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

export interface Dependency {
  name: string;
  type: NodeDependencyType;
}

export const dependencies: Dependency[] = [
  {
    name: 'prisma',
    type: NodeDependencyType.Dev,
  },
  {
    name: '@prisma/client',
    type: NodeDependencyType.Default,
  },
];
