export type POST = {
  userId: string
  type: string
  configName: string
  value: string
}

export type GET = {
  userId: string
}

export type PATCH = {
  userId: string
  configName: string
  value: string
}

export type DELETE = {
  userId: string
  id: string
  configName: string
}
