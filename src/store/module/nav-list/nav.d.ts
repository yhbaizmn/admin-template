export type Bread = {
  title: string
  index: string
  path: string
}

export interface NavState {
  openIndex: string
  breadList: Bread[]
}
