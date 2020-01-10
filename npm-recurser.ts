#!/usr/bin/env node

import path from 'path';
import shell from 'shelljs';
import chalk from 'chalk';

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

function npm(directoryName: string, cmd: string, opt?: string): { directoryName: string; exitCode: number } {
  
  let command = 'npm' + ' ' + cmd;
  if (opt) command += ' ' + opt;

  console.log(
    chalk.blue.bold(
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
  var myArgs = process.argv.slice(2);
  if (!myArgs || myArgs.length == 0) return;

  const skipRoot = myArgs[0] === '--skipRoot';

  const cmd = skipRoot ? myArgs[1] : myArgs[0];
  if (!cmd) return;

  const opt = skipRoot ? myArgs[2] : myArgs[1];

  console.log(chalk.yellow(`Executing npm command "${cmd}${(opt ? ' ' + opt : '')}"...`));

  const exitCode = packageJsonLocations(process.cwd())
    .filter(dir => (skipRoot ? filterRoot : dir))
    .map((dir) => npm(dir, cmd, opt))
    .reduce(
      (code, result) => (result.exitCode > code ? result.exitCode : code),
      0,
    );

  console.log(chalk.green.bold('End of execution'));
  process.exit(exitCode);
})();
