# Original Source

https://github.com/vasanthk/react-es6-webpack-boilerplate

# Infos: IntelliJ, Webpack etc

#### IntelliJ Settings

Disable "safe write"! When "safe write" is enabled, then webpack hot reloading (watch mode) will NOT work properly on Windows!
* see http://stackoverflow.com/questions/34213253/webpack-watch-not-working-on-webstorm-on-windows

#### Reading

Will Stern
* youtube tutorials -> https://www.youtube.com/watch?v=XVdwq8W2ZsM
* github -> https://github.com/learncodeacademy/react-js-tutorials
* github repositories -> https://github.com/willrstern?tab=repositories

* babel-plugin-react-html-attrs -> https://github.com/insin/babel-plugin-react-html-attrs

* babel-plugin-transform-class-properties -> https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-class-properties

# React ES6 Webpack Boilerplate

Boilerplate for kick starting a project with the following technologies:
* [React](https://github.com/facebook/react)
* [Babel 6](http://babeljs.io)
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Server](http://webpack.github.io/docs/webpack-dev-server.html)
* [React Transform](https://github.com/gaearon/react-transform-hmr) for hot reloading React components in real time.

The various webpack options used have been explained in detailed as comments in the config file. Should help with understanding the nitty-gritty :)


### Usage

```
npm install
npm start
Open http://localhost:5000
```

### Linting

ESLint with React linting options have been enabled.

```
npm run lint
```

