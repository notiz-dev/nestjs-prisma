import { Schema } from './schema';
import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  SchematicsException,
  url,
  apply,
  template,
  mergeWith,
} from '@angular-devkit/schematics';
import {
  NodePackageInstallTask,
  RunSchematicTask,
} from '@angular-devkit/schematics/tasks';
import {
  addPackageJsonDependency,
  NodeDependencyType,
} from '@schematics/angular/utility/dependencies';
import { strings } from '@angular-devkit/core';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function nestjsPrismaAdd(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (!_options.skipInstall) {
      _context.addTask(new NodePackageInstallTask());
    }

    return chain([
      addDependencies(_options),
      addNpmScripts(_options),
      addPrismaService(_options),
      addDocker(_options),
      prismaInit(_options),
    ]);
  };
}

function addDependencies(_options: Schema): Rule {
  return (tree: Tree) => {
    addPackageJsonDependency(tree, {
      type: NodeDependencyType.Dev,
      name: 'prisma',
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

function addNpmScripts(_options: Schema): Rule {
  return (tree: Tree) => {
    const pkgPath = 'package.json';
    const buffer = tree.read(pkgPath);

    if (buffer === null) {
      throw new SchematicsException('Could not find package.json');
    }

    const pkg = JSON.parse(buffer.toString());

    pkg.scripts['migrate:dev'] = 'prisma migrate dev --preview-feature';
    pkg.scripts['migrate:dev:create'] =
      'prisma migrate dev --create-only --preview-feature';
    pkg.scripts['migrate:deploy'] =
      'npx prisma migrate deploy --preview-feature';
    pkg.scripts['migrate:reset'] = 'npx prisma migrate reset --preview-feature';
    pkg.scripts['migrate:resolve'] =
      'npx prisma migrate resolve --preview-feature';
    pkg.scripts['prisma:generate'] = 'npx prisma generate';
    pkg.scripts['prisma:generate:watch'] = 'npx prisma generate --watch';
    pkg.scripts['prisma:studio'] = 'npx prisma studio';

    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    return tree;
  };
}

function addPrismaService(_options: Schema): Rule {
  return (_tree: Tree) => {
    if (_options.addPrismaService) {
      const sourceTemplates = url('./templates/services');

      const sourceParametrizedTemplates = apply(sourceTemplates, [
        template({ ..._options, ...strings }),
      ]);
      return mergeWith(sourceParametrizedTemplates);
    }
    return _tree;
  };
}

function addDocker(_options: Schema): Rule {
  return (_tree: Tree) => {
    if (_options.addDocker) {
      const sourceTemplates = url('./templates/docker');

      const sourceParametrizedTemplates = apply(sourceTemplates, [
        template({ ..._options, ...strings }),
      ]);
      return mergeWith(sourceParametrizedTemplates);
    }

    return _tree;
  };
}

function prismaInit(_options: Schema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    if (!_options.skipPrismaInit) {
      const packageInstall = context.addTask(new NodePackageInstallTask());
      context.addTask(new RunSchematicTask('prisma-init', {}), [
        packageInstall,
      ]);
    }
    return _tree;
  };
}
