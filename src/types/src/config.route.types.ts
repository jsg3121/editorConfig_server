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
  userId: string
  configName: string
  configDetail: {
    [key: string]: string | number | boolean
  }
}

export type DELETE = {
  userId: string
  id: string
  configName: string
}
