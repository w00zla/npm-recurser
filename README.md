# npm-recurser

## Recursively run npm in folders

Takes the current working directory and checks for `package.json` recursively in every folder and runs `npm` with a given command for it.

### Usage

Just use the npm command and arguments you wish to execute!

```
npm-recurser <npm-command> <npm-arguments>
```

Examples of common commands:

```
npx npm-recurser install <package-name>
npx npm-recurser audit
npx npm-recurser prune
```

### Additional Arguments

The script supports additional arguments preceding the npm command:

```
npm-recurser <argument> <npm-command> <npm-arguments>
```

#### `--skipRoot`

Use this argument to prevent execution of npm in the root folder.  
_Example:_

```
npm-recurser --skipRoot update
```

## Credits

This is a fixed and updated version of [npm-recursive](https://github.com/nrigaudiere/npm-recursive). Credits go to its original author!
