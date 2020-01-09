#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const shelljs_1 = __importDefault(require("shelljs"));
const yargs_1 = __importDefault(require("yargs"));
const colors_1 = __importDefault(require("colors"));
function packageJsonLocations(dirname) {
    return shelljs_1.default
        .find(dirname)
        .filter(fname => !(fname.indexOf('node_modules') > -1 || fname[0] === '.') &&
        path_1.default.basename(fname) === 'package.json')
        .map(fname => path_1.default.dirname(fname));
}
function npm(directoryName) {
    let command = 'npm';
    if (yargs_1.default.argv.cmd)
        command += ' ' + yargs_1.default.argv.cmd;
    if (yargs_1.default.argv.opt)
        command += ' ' + yargs_1.default.argv.opt;
    console.log(colors_1.default.blue.bold(`Current npm path: ${directoryName}/package.json`));
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
    const exitCode = packageJsonLocations(process.cwd())
        .filter(val => (yargs_1.default.argv.skipRoot ? filterRoot : val))
        .map(npm)
        .reduce((code, result) => (result.exitCode > code ? result.exitCode : code), 0);
    console.log(colors_1.default.green.bold('End of execution'));
    process.exit(exitCode);
})();
