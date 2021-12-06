# 🐯 Shere
A flexible tool for getting _**shit**_ done. The king of sharing and creating documents, tables, todo lists, documentation, forms, polls, blogs, and more.
# Client: Vue 3 + Typescript + Vite
The client is written in Vue 3, with Typescript and Vite.

The app uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Vite helps to resolve a few things for us including several shorthand paths:
```js
"@/*": ["src/*"],
"@hooks/*": ["src/hooks/*"],
"@pages/*": ["src/pages/*"],
"@app/*": ["src/pages/app/*"],
"@shared/*": ["src/shared/*"],
"@root/*": ["./*"]
```

Vite is also resolving JSX, so we can use it to write our components. Learn more about JSX [here](https://v3.vuejs.org/guide/jsx.html).

Lastly, vite is resolving some icons for us using iconify. 
```html
<ri:bold />
```
This will result in a bold remix icon.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Backend FaunaDB
The backend uses [FaunaDB](https://www.fauna.com/fauna/db) for storing data. It is a NoSQL database that is optimized for speed and scalability. We call backend functions directly from UDFs on the frontend.

```js
import fauna{ query } from 'faunadb'

```
