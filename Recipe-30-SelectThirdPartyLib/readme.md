# Recipe 30: Vetted Third-Party Library Selection
## Create a new project
Create a new directory for your project and navigate to it in the terminal.
```
mkdir my-webpage
cd my-webpage
```

## Initialize a new Node.js project
Run the following command to initialize a new Node.js project and create a package.json file.

```
npm init -y
```

## Install snyk
Install the [snyk](https://www.npmjs.com/package/snyk) command-line tool globally.

```
npm install -g snyk
```

## Authenticate snyk
Authenticate snyk using the following command. This is required to access the vulnerability database.

```
snyk auth
```

## Scan for vulnerabilities
Run the following command to scan your project for vulnerabilities. This will analyze your dependencies and provide information about their security status.
```
snyk test
```

After running this command, snyk will provide a summary of any vulnerabilities found in your project.