# serverless-boilerplate

Starter kit for generating a Node.js/es6 Serverless service on AWS with TDD,
secrets, env vars management and more!

## Environment Setup

This example is written in Node.js, specifically using ES6 syntax. It is
recommended you have
[NVM](https://github.com/creationix/nvm/blob/master/README.md) installed on your
development machine to allow for usage of the proper version of Node. As of this
writing, the recommended Node version for use with this codebase is the latest
stable `v6.10`.

To get started, first install all configured Node dependencies.

`$ npm install`

### Code Formatting and Linting

#### ESLint

[ESLint](https://eslint.org/) is a pluggable linting utility for JavaScript. It
is used in this codebase specifically to enforce JavaScript formatting rules,
which are defined in the `.eslintrc` file.

#### Prettier

[Prettier](https://github.com/prettier/prettier) is an "opinionated code
formatter" that enforces consistent style and can be used in conjunction with ES
Lint rules.

There is a useful module called prettier-eslint for enforcing ES Lint formatting
rules via Prettier. This module is included in the devDependencies section of
package.json, so assuming you have run `npm install` you can make use of this
handy tool.

If you use Visual Studio Code, you can configure it to format the code using
Prettier on each file save. To set this up, open your VS Code Workspace Settings
(`CMD + ,` on Mac) and configure the following settings:

```
// Format a file on save. A formatter must be available, the file must not be auto-saved, and editor must not be shutting down.
"editor.formatOnSave": true,
// Enable/disable default JavaScript formatter (For Prettier)
"javascript.format.enable": false,
// Use 'prettier-eslint' instead of 'prettier'. Other settings will only be fallbacks in case they could not be inferred from eslint rules.
"prettier.eslintIntegration": true
```

### Environment Variables

### Tests

[Jest](https://facebook.github.io/jest/) is the JavaScript testing framework
used by this codebase. There are many nice features of Jest, but one that is
highlighted here is that there are mininimal-to-no configuration requirements to
get started writing and running tests. Jest uses a file extension naming
convention to identify which files contain tests to run - specifically in this
case `*.test.js`.

To run all tests in the codebase: `$ npm test`

To run tests continuously on file save: `$ npm run test:watch`

#### Code Coverage

Another benefit of Jest is how easy it is to capture and view code coverage
stats. All that is required is to pass a `--coverage` flag to the Jest command
and by default it will create a "coverage" folder with XML and HTML results that
can be viewed in a browser.

To run tests with coverage reports: `$ npm run test:coverage`

## AWS Setup
