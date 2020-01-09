#!/usr/bin/env node

import path from 'path';
import shell from 'shelljs';
import yargs from 'yargs';
import colors from 'colors';

function packageJsonLocations(dirname: string): string[] {
  return shell
    .find(dirname)
    .filter(
      fname =>
        !(fname.indexOf('node_modules') > -1 || fname[0] === '.') &&
        path.basename(fname) === 'package.json',
    )
    .map(fname => path.dirname(fname));
}

function npm(directoryName: string): { directoryName: string; exitCode: number } {
  let command = 'npm';

  if (yargs.argv.cmd) command += ' ' + yargs.argv.cmd;
  if (yargs.argv.opt) command += ' ' + yargs.argv.opt;

  console.log(
    colors.blue.bold(
      `Current npm path: ${directoryName}/package.json`,
    ),
  );
  shell.cd(directoryName);
  const result = shell.exec(command);

  return {
    directoryName: directoryName,
    exitCode: result.code,
  };
}

function filterRoot(directoryName: string): boolean {
  console.log('Root filtering');

  return path.normalize(directoryName) === path.normalize(process.cwd());
}

(function(): void {
  const exitCode = packageJsonLocations(process.cwd())
    .filter(val => (yargs.argv.skipRoot ? filterRoot : val))
    .map(npm)
    .reduce(
      (code, result) => (result.exitCode > code ? result.exitCode : code),
      0,
    );

  console.log(colors.green.bold('End of execution'));
  process.exit(exitCode);
})();
