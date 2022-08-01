# create-extension

CLI that helps you bootstrap a browser extension the same way you would with your modern\* framework.

# Assumptions

- Extension uses [Typescript](https://www.typescriptlang.org/)
- Extension uses [SASS](https://sass-lang.com/) for styling
- Extension uses [Webpack](https://webpack.js.org/) for bundling
- Extension pnpm [pnpm](https://pnpm.io/) as a package manager

# Getting started

To craete your extension, run one of the following:

## npm

```
npx create-extension
```

## yarn

```
yarn create create-extension
```

## pnpm

```
pnpm dlx create-extension
```

# Planed features

- Allow different styling options (Tailwind)
- Allow different package managers (yarn/npm)

# TODO

- [x] Setup package.json
- [x] Setup manifest.json
- [x] Setup depenencies
- [ ] Ask about permissions in wizzard
- [ ] Ask about url matches in wizzard
- [ ] Setup publish process
