import { Schema } from './schema';
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
} from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function nestjsPrismaAdd(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (!_options.skipInstall) {
      _context.addTask(new NodePackageInstallTask());
    }
    console.log(_options);
    return chain([addDependencies(_options)]);
  };
}

function addDependencies(_options: Schema): Rule {
  return (tree: Tree) => {
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: '@prisma/cli',
      version: _options.prismaVersion,
    });

    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Default,
      name: '@prisma/client',
      version: _options.prismaVersion,
    });
    return tree;
  };
}
