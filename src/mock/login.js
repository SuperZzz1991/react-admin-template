const tokens = {
    admin: 'admin-token',
    guest: 'guest-token',
    editor: 'editor-token'
}

const loginMock = {
    login: config => {
        const { username } = JSON.parse(config.body)
        const token = tokens[username]
        if (!token) {
            return {
                state: '9001',
                message: '用户名或密码错误'
            }
        }
        return {
            state: '0000',
            data: token
        }
    },
    logout: () => {
        return {
            state: '0000'
        }
    }
}

export default loginMock