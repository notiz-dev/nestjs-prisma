import { npmScripts } from './npm-scripts';
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
  NodeDependency,
} from '@schematics/angular/utility/dependencies';
import { strings } from '@angular-devkit/core';
import { getLatestDependencyVersion } from './utils/get-latest-dependency-version';
import { dependencies, Dependency } from './dependencies';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function nestjsPrismaAdd(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    if (!_options.skipInstall) {
      _context.addTask(new NodePackageInstallTask());
    }

    return chain([
      addDependencies(dependencies),
      addNpmScripts(),
      addSeedScript(),
      addPrismaService(_options),
      addDockerFile(_options),
      addDockerCompose(_options),
      excludePrismaFromBuild(),
      prismaInit(_options),
    ]);
  };
}

function addDependencies(dependencies: Dependency[]): Rule {
  return (tree, context) => {
    return Promise.all(
      dependencies.map((dependency) =>
        getLatestDependencyVersion(dependency.name).then(
          ({ name, version }) => {
            context.logger.info(`✅️ Added ${name}@${version}`);
            const nodeDependency: NodeDependency = {
              name,
              version,
              type: dependency.type,
            };
            addPackageJsonDependency(tree, nodeDependency);
          },
        ),
      ),
    ).then(() => tree) as ReturnType<Rule>;
  };
}

function addNpmScripts(): Rule {
  return (tree: Tree, context) => {
    const pkgPath = 'package.json';
    const buffer = tree.read(pkgPath);

    if (buffer === null) {
      throw new SchematicsException(`Could not find ${pkgPath}.`);
    }

    const pkg = JSON.parse(buffer.toString());

    context.logger.info(`✅️ Added Prisma scripts [${npmScripts.length}]`);

    npmScripts.map(
      (npmScript) => (pkg.scripts[npmScript.name] = npmScript.command),
    );

    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    return tree;
  };
}

function addSeedScript(): Rule {
  return (tree: Tree, context) => {
    const pkgPath = 'package.json';
    const buffer = tree.read(pkgPath);

    if (buffer === null) {
      throw new SchematicsException(`Could not find ${pkgPath}.`);
    }

    const pkg = JSON.parse(buffer.toString());

    context.logger.info(`✅️ Added Prisma Seed script`);

    pkg['prisma'] = { seed: 'ts-node prisma/seed.ts' };

    tree.overwrite(pkgPath, JSON.stringify(pkg, null, 2));
    return tree;
  };
}

function addPrismaService(_options: Schema): Rule {
  return (_tree: Tree, context) => {
    if (_options.addPrismaService) {
      context.logger.info(`✅️ Added custom PrismaModule and PrismaService`);

      const sourceTemplates = url('./templates/services');

      const sourceParametrizedTemplates = apply(sourceTemplates, [
        template({ ..._options, ...strings }),
      ]);
      return mergeWith(sourceParametrizedTemplates);
    }
    return _tree;
  };
}

function addDockerFile(_options: Schema): Rule {
  return (_tree: Tree, context) => {
    if (_options.addDocker) {
      context.logger.info(`✅️ Added Docker file`);

      const sourceTemplates = url('./templates/docker/common');

      const sourceParametrizedTemplates = apply(sourceTemplates, [
        template({ ..._options, ...strings }),
      ]);
      return mergeWith(sourceParametrizedTemplates);
    }

    return _tree;
  };
}

function addDockerCompose(_options: Schema): Rule {
  return (_tree: Tree, context) => {
    if (_options.addDocker) {
      context.logger.info(`✅️ Added Docker Compose and .env`);

      if (
        _options.datasourceProvider === 'mysql' ||
        _options.datasourceProvider === 'postgresql'
      ) {
        _options.datasourceProvider;

        const sourceTemplates = url(
          `./templates/docker/${_options.datasourceProvider}`,
        );

        const sourceParametrizedTemplates = apply(sourceTemplates, [
          template({ ..._options, ...strings }),
        ]);
        return mergeWith(sourceParametrizedTemplates);
      }
    }

    return _tree;
  };
}

function excludePrismaFromBuild(): Rule {
  return (tree: Tree, context) => {
    const tsconfigBuildPath = 'tsconfig.build.json';

    const buffer = tree.read(tsconfigBuildPath);

    if (buffer !== null) {
      context.logger.info(
        `✅️ Add "prisma" directory to "excludes" in ${tsconfigBuildPath}`,
      );

      const tsconfig = JSON.parse(buffer.toString());

      tsconfig.exclude = [...tsconfig.exclude, 'prisma'];
      tree.overwrite(tsconfigBuildPath, JSON.stringify(tsconfig, null, 2));
    }
    return tree;
  };
}

function prismaInit(_options: Schema): Rule {
  return (_tree: Tree, context: SchematicContext) => {
    if (!_options.skipPrismaInit) {
      const packageInstall = context.addTask(new NodePackageInstallTask());
      context.addTask(
        new RunSchematicTask('prisma-init', {
          datasource: _options.datasourceProvider,
        }),
        [packageInstall],
      );
    }
    return _tree;
  };
}
