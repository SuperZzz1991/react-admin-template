import Mock from 'mockjs'
const list = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    title: '@ctitle(5, 10)',
    author: '@cname',
    readings: '@integer(300, 5000)',
    date: '@datetime'
  }))
}
const excelMock = {
  getList: () => {
    return {
      state: '0000',
      data: list
    }
  }
}

export default excelMock