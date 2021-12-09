import { Editor } from "@tiptap/vue-3"

export type Workspace = {
  ref: FaunaDBRef<"workspaces">,
  ts: number,
  data: {
    name: string,
    color: string,
    public: boolean,
    content: string,
    accounts: AccountPermissions[],
    children?: ShereDocument[],
    comments?: Comment[],
    lastUpdated: {
      at: string,
      by: {
        name: string,
        id: string
      }
    },
  }
}

export type ShereDocument = {
  ref: FaunaDBRef<"documents">,
  ts: number,
  children?: ShereDocument[],
  expanded?: boolean,
  data: {
    name: string,
    public: boolean,
    content: string,
    parent: FaunaDBRef<"documents" | "workspaces">,
    comments?: Comment[],
    lastUpdated: {
      at: string,
      by: {
        name: string,
        id: string
      }
    },
    accounts?: AccountPermissions[],
  }
}

export type Comment = {
  ref: FaunaDBRef<"comments">,
  ts: number,
  data: {
    content: string,
    reguarding: FaunaDBRef<"documents" | "workspaces" | "comments">,
    cursor?: [string, string],
    comments?: Comment[],
    by: {
      name: string,
      id: string
    },
    at: string
  }
}

export type AccountPermissions = {
  id: string,
  admin: boolean,
  read: boolean,
  update: boolean,
  delete: boolean,
  share: boolean
}

/** AUTHENTICATION TYPES */
export type CurrentUser = {
  name: string,
  id: string,
  color: string
}

export type AccessToken = {
  data: {
    type: "access",
    refresh: NetlifyRef<"tokens">
  },
  instance: NetlifyRef<"accounts">,
  ref: NetlifyRef<"tokens">,
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
  instance: NetlifyRef<"accounts">,
  ref: NetlifyRef<"tokens">,
  secret: string,
  ts: number,
  ttl: {
    "@ts": Date
  }
}

export type UserSettings = {
  tools: ButtonGroup[],
  focusModeDefault: boolean,
  notificationSettings: NotificationSettings
}

export type NotificationSetting = {
  email: boolean,
  app: boolean
}

export type NotificationSettings = {
  newDocument: NotificationSetting,
  newVersion: NotificationSetting,
  newComment: NotificationSetting,
  newReply: NotificationSetting,
  newShare: NotificationSetting
}

export type ButtonGroup = {
  id: string,
  title: string,
  nested: boolean,
  hidden: boolean,
  import: boolean,
  desc: boolean,
  buttons: ToolButton[]
}

export type ToolButton = {
  id: string,
  desc: string,
  hotKey: string,
  icon: string,
  import: boolean,
  hide: boolean,
  nest: boolean,
  bubble: boolean,
}

export type Account = {
  data: {
    email: string,
    name: string,
    settings: any,
  },
  ref: NetlifyRef<"accounts">,
  ts: number,
}

export type AccessInstance = {
  account: Account,
  access: AccessToken,
  refresh: RefreshToken
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
  superscript = "superscript",
  subscript = "subscript",
  alignLeft = "align-left",
  alignCenter = "align-center",
  alignRight = "align-right",
  alignJustify = "align-justify",
  bulletList = "bulletList",
  orderedList = "orderedList",
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

/** API RESPONSE TYPES */
export type NetlifyCollectionRef<CollectionName = string> = {
  "@ref": {
    id: CollectionName,
  }
}

export type CollectionRef<CollectionName = string> = {
  id: CollectionName
}

export type NetlifyRef<CollectionName = string, Id = string> = {
  "@ref": {
    id: Id,
    collection: NetlifyCollectionRef<CollectionName>
  }
}

export type FaunaDBRef<CollectionName = string, Id = string> = {
  id: Id,
  collection: CollectionRef<CollectionName>
}