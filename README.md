
## Table of Contents
1. [Requirements](#requirements)
2. [Installation](#getting-started)
3. [Running the Project](#running-the-project)
4. [Live Development](#local-development)
    * [Hot Reloading](#hot-reloading)
    * [Redux DevTools](#redux-devtools)
5. [Routing](#routing)

## Requirements
* node `^16.19`
* npm `^5.6` 

## Installation

After confirming that your environment meets the above [requirements](#requirements), you can start the project by doing the following:

The project has the following things incorporated

1. es-lint configured with specific rules
2. babel-node setup to write full ES^ code in node
3. pre-commit hook setup to run custom script before any git commit
____


## Running the Project

After completing the [installation](#installation) step, you're ready to start the project!

+ **`yarn install`** to install the dependencies in the local node_modules folder.

update npmrc for removing jFrog token

+ **`yarn start`** to run the server in development mode through webpack middleware.

  To access the server, navigate to `http://localhost:3000`

+ **`yarn build`** create a development build in `build` folder
`cd` to `build/` and the run command `node server` to run server in development mode

+ `precommmit` is configured to run `eslint` before any commits
  Make sure you fix all lint errors before commiting your code


### Hot Reloading

Hot reloading is enabled by default when the application is running in development mode (`yarn start`). This feature is implemented with webpack's [Hot Module Replacement](https://webpack.github.io/docs/hot-module-replacement.html) capabilities, where code updates can be injected to the application while it's running, no full reload required. Here's how it works:

* For **JavaScript** modules, a code change will trigger the application to re-render from the top of the tree. **Global state is preserved (i.e. redux), but any local component state is reset**. This differs from React Hot Loader, but we've found that performing a full re-render helps avoid subtle bugs caused by RHL patching.

* For **Sass**, any change will update the styles in real-time, no additional configuration or reload needed.

### Redux DevTools

**We recommend using the [Redux DevTools Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).**
Using the chrome extension allows your monitors to run on a separate thread and affords better performance and functionality. It comes with several of the most popular monitors, is easy to configure, filters actions, and doesn't require installing any packages in your project.

## Routing
We have used `react-router-dom` to define units of logic within our application. See the [project structure](#project-structure) section for more information.
