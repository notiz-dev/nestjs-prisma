import { DatasourceProvider } from './../nestjs-prisma/schema';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { exec } from 'child_process';
import { Observable } from 'rxjs';

interface InitOptions {
  datasource: DatasourceProvider;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function prismaInit(_options: InitOptions) {
  return (host: Tree, _context: SchematicContext) => {
    _context.logger.info(
      `✅️ Initialized Prisma - Datasource ${_options.datasource}`,
    );
    return new Observable<Tree>((subscriber) => {
      const child = exec(
        `npx prisma init --datasource-provider ${_options.datasource}`,
      );
      child.on('error', (error) => {
        subscriber.error(error);
      });
      child.on('close', () => {
        subscriber.next(host);
        subscriber.complete();
      });
      return () => {
        child.kill();
        return host;
      };
    });
  };
}
