import Mock from 'mockjs'
let List = []
const count = 100

for (let i = 1; i <= count; i++) {
    List.push(
        Mock.mock({
            id: i,
            title: '@ctitle(5, 10)',
            author: '@cname',
            readings: '@integer(300, 5000)',
            'star|1-3': '★',
            'status|1': ['published', 'draft'],
            date: '@datetime',
        })
    )
}
const tableMock = {
    pageInfo: config => {
        const { pageNum, pageSize } = JSON.parse(config.body)
        let start = (pageNum - 1) * pageSize
        let end = pageNum * pageSize
        let pageList = List.slice(start, end)
        return {
            state: '0000',
            data: {
                total: List.length,
                items: pageList,
            }
        }
    },
    delete: config => {
        const { id } = JSON.parse(config.body)
        const item = List.filter((item) => item.id === id)
        const index = List.indexOf(item[0])
        List.splice(index, 1)
        return {
            state: '0000'
        }
    }
}

export default tableMock