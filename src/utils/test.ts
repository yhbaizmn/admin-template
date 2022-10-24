interface Data {
  current: number
  size: number
  [p:string]: any
}
export function getList(data: Data) {
  const item = { name: 'yhb', state: '成功', city: '杭州', address: '地址啊 啊啊' }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        data: {
          total: 15,
          records: data.current === 1 ?
            [item, item, item, item, item, item, item, item, item, item] :
            [item, item, item, item, item]
        }
      })
    }, 500)
  })
}
