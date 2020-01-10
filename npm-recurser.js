#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const chalk_1 = __importDefault(require("chalk"));
function packageJsonLocations(dirname) {
    return shelljs_1.default
        .find(dirname)
        .filter(fname => !(fname.indexOf('node_modules') > -1 || fname[0] === '.') &&
        path_1.default.basename(fname) === 'package.json')
        .map(fname => path_1.default.dirname(fname));
}
function npm(directoryName, cmd, opt) {
    let command = 'npm' + ' ' + cmd;
    if (opt)
        command += ' ' + opt;
    console.log(chalk_1.default.blue.bold(`Current npm path: ${directoryName}/package.json`));
    shelljs_1.default.cd(directoryName);
    const result = shelljs_1.default.exec(command);
    return {
        directoryName: directoryName,
        exitCode: result.code,
    };
}
function filterRoot(directoryName) {
    console.log('Root filtering');
    return path_1.default.normalize(directoryName) === path_1.default.normalize(process.cwd());
}
(function () {
    var myArgs = process.argv.slice(2);
    if (!myArgs || myArgs.length == 0)
        return;
    const skipRoot = myArgs[0] === '--skipRoot';
    const cmd = skipRoot ? myArgs[1] : myArgs[0];
    if (!cmd)
        return;
    const opt = skipRoot ? myArgs[2] : myArgs[1];
    console.log(chalk_1.default.yellow(`Executing npm command "${cmd} ${(opt ? opt : '')}"`));
    const exitCode = packageJsonLocations(process.cwd())
        .filter(dir => (skipRoot ? filterRoot : dir))
        .map((dir) => npm(dir, cmd, opt))
        .reduce((code, result) => (result.exitCode > code ? result.exitCode : code), 0);
    console.log(chalk_1.default.green.bold('End of execution'));
    process.exit(exitCode);
})();
