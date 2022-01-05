const tokens = {
    admin: 'admin-token',
    guest: 'guest-token',
    editor: 'editor-token'
}

const users = {
    'admin-token': {
        id: 'admin',
        role: 'admin',
        name: '系统管理员',
        avatar: 'https://avatars.githubusercontent.com/u/18611579?s=400&u=fd9b232b9f1c2cbb71e421e1dff1912f3bd41091&v=4',
        description: '拥有系统内所有菜单和路由权限'
    },
    'editor-token': {
        id: 'editor',
        role: 'editor',
        name: '编辑员',
        avatar: 'https://avatars.githubusercontent.com/u/18611579?s=400&u=fd9b232b9f1c2cbb71e421e1dff1912f3bd41091&v=4',
        description:'可以看到除户管理页面之外的所有页面'
    },
    'guest-token': {
        id: 'guest',
        role: 'guest',
        name: '游客',
        avatar: 'https://avatars.githubusercontent.com/u/18611579?s=400&u=fd9b232b9f1c2cbb71e421e1dff1912f3bd41091&v=4',
        description:'仅能看到Dashboard、开发文档、权限测试和关于作者四个页面'
    }
}

const userMock = {
    getList: () => {
        return {
            state: '0000',
            data: Object.values(users)
        }
    },
    delete: config => {
        const { id } = JSON.parse(config.body)
        const token = tokens[id]
        if (token) {
            delete tokens[id]
            delete users[token]
        }
        return {
            state: '0000'
        }
    },
    info: config => {
        const {token} = JSON.parse(config.body)
        const userInfo = users[token]
        if (!userInfo) {
            return {
                state: '9001',
                message: "获取用户信息失败"
            }
        }
        return {
            state: '0000',
            data: {
                user: userInfo
            }
        }
    }
}

export default userMock