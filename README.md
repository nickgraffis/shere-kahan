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
import fauna, { query as q } from 'faunadb'

const client = new faunadb.Client({ secret: "KEY" })

client.query(
  q.Call(
    "GetDocument",
    documentId
  )
)
```

A good pattern here may be to use the following two helper functions however, to help catch errors, create readable code, and keep within consistent styles.

```js
import { query as q } from 'faunadb'
import { faunaClient } from '@root/utils/fauna'
import { safeAwait } from '@root/utils/safeAwait'

const [tokenError, client] = await safeAwait(faunaClient("KEY"))
if (tokenError) throw Error(tokenError)

const [queryError, res] = await safeAwait(
  client.query(
    q.Call(
      "GetDocument",
      documentId
    )
  )
)
if (queryError) throw Error(queryError)
```

Within the app you will most likely be reacting with data through hooks powered by Vue-Query. In vite you can import any of these hooks easily through the path alias `@hooks`.

Here are the hooks that we are using and have avaliable:

### useAccount
The `useAccount` hook is designed to help provide _reactive_ data reguarding the currently logged in account.

`useAccount`: Provides the currently logged in account and meta data regarding the token in use.

```js
import { useAccount } from '@hooks/useAccount'

const { isLoading, isError, error: accountError, data: account } = useAccount()
```

`useUpdateAccount`: Provides a mutation function to update the keys passed into the mutation

```js
import { useUpdateAccount } from '@hooks/useAccount'

const updateAccount = useUpdateAccount()

updateAccount.mutate({
  name: 'New Name'
})
```

### useDocuments
The `useDocuments` hooks are obviously extremly valuable. There are several hooks to help when working with documents.

`useCurrentDocument`: This is a custom hook that returns the id of the current document and a function to change this reactive variable.

```js
import { useCurrentDocument } from '@hooks/useDocuments'

const { currentDocument, setCurrentDocument } = useCurrentDocument()
```

`useDocument`: Get a document

`useCreteDocument`: Create a new document

`useUpdateDocument`: Update a new document

`useExpandDocument`: Expand a documents children in the file system component, means we are just flipping a flag called `expanded` on a document. 
