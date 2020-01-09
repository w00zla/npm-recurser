# npm-recurser

## Recursively run npm in a folder

Takes your tree and checks for package.json in every folder and runs `npm` in every folder.

### Arguments

You can add arguments when running the command

```
$ npm-recurser --cmd upgrade
npm upgrade v1.1.0
success All of your dependencies are up to date.
Done in 0.22s.

Current npm path: YOUR_PATH/npm-recurser/package.json...
End of execution

```

```
npm-recurser --cmd upgrade --opt <package-name>
```

## Credits

This is a fixed version of [npm-recursive](https://github.com/nrigaudiere/npm-recursive). All credits go to its original author!
