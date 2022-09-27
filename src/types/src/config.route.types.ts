export type POST = {
  userId: number
  configType: string
  configName: string
  configDetail: string
}

export type GET = {
  userId: string
}

export type PATCH = {
  id: string
  configName: string
  configDetail: string
}

export type DELETE = {
  userId: string
  id: string
  configName: string
}
