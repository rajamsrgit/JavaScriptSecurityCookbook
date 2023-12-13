# Recipe 31: Regularly Updating Dependencies

## Install npm-check-updates (NCU):
[NCU](https://www.npmjs.com/package/npm-check-updates) is a tool that allows you to easily check for and update your project's dependencies.

``` 
npm install -g npm-check-updates
```

## Update Dependencies Script:
Create a JavaScript file, for example, `updateDependencies.js`, with the following content:

```
const { exec } = require('child_process');

const updateDependencies = () => {
  console.log('Checking for updates...');
  exec('ncu -u && npm install', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    console.log('Updates applied successfully.');
    console.log('stdout:', stdout);
    console.error('stderr:', stderr);
  });
};

updateDependencies();
```

## Set Up a Cron Job (Optional):
If you want to run this script periodically, you can set up a `cron` job. For example, to run the script every day at midnight, you can add the following entry to your crontab:

```
0 0 * * * /path/to/node /path/to/updateDependencies.js
```

Replace `/path/to/node and /path/to/updateDependencies.js` with the actual paths to your `Node.js` executable and the update script.

## Run the Script Manually:
You can also run the script manually whenever you want to check for and apply updates:
```
node updateDependencies.js
```

This script uses npm-check-updates to check for updates and update the `package.json` file. It then runs `npm install` to install the updated dependencies.

## Explanation:
Frequent updates help ensure that your application benefits from security patches and improvements provided by library maintainers.
