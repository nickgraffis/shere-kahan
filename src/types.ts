import { Editor } from "@tiptap/vue-3"

export type ShereDocument = {
  ref: FaunaDBRef<"documents">,
  ts: number,
  data: {
    name: string,
    public: boolean,
    content: string,
    accounts: [],
    parent: FaunaDBRef<"documents" | "workspaces">,
    lastUpdated: {
      at: string,
      by: {
        name: string,
        id: string
      }
    }
  }
}

export type CurrentUser = {
  name: string,
  id: string,
  color: string
}

export type AccessToken = {
  data: {
    type: "access",
    refresh: FaunaDBRef<"tokens">
  },
  instance: FaunaDBRef<"accounts">,
  ref: FaunaDBRef<"tokens">,
  secret: string,
  ts: number,
  ttl: {
    "@ts": Date
  }
}

export type RefreshToken = {
  data: {
    type: "refresh",
    used: boolean,
    sessionId: string,
    validUntils: {
      "@ts": Date
    },
    loggedOut: boolean
  },
  instance: FaunaDBRef<"accounts">,
  ref: FaunaDBRef<"tokens">,
  secret: string,
  ts: number,
  ttl: {
    "@ts": Date
  }
}

export type Account = {
  data: {
    email: string,
    name: string,
  },
  ref: FaunaDBRef<"accounts">,
  ts: number,
}

export type AccessInstance = {
  account: Account,
  access: AccessToken,
  refresh: RefreshToken
}

export type CollectionRef<CollectionName = string> = {
  "@ref": {
    id: CollectionName,
  }
}

export type FaunaDBRef<CollectionName = string, Id = string> = {
  "@ref": {
    id: Id,
    collection: CollectionRef<CollectionName>
  }
}

export type Toolbar = {
  id: string,
  icon: string,
  desc: string,
  expanded?: boolean,
  buttons: Button[]
}

export type Button = {
  id: Buttons,
  icon: string,
  desc: string,
  hotKey: string,
  expanded?: boolean,
}

export enum Buttons {
  undo = "undo",
  redo ="redo",
  bold = "bold",
  italic = "italic",
  underline = "underline",
  strikethrough = "strikethrough",
  code = "code",
  alignLeft = "align-left",
  alignCenter = "align-center",
  alignRight = "align-right",
  alignJustify = "align-justify",
  bulletList = "bullet-list",
  orderedList = "ordered-list",
  task = "task",
  sink = "sink",
  lift = "lift",
  json = "json",
  pdf = "pdf",
  word = "word",
  markdown = "markdown",
  publish = "publish",
  html = "html",
  lock = "lock",
  save = "save",
  share = "share",
}

export type ButtonToAction = {
  [key in Buttons]: {
    action: (editor: Editor) => void,
    isActive?: (editor: Editor) => boolean,
  }
}