import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Layout from '@/views/Layout'
import Login from '@/views/Login'

import { userInfo } from '@/store/actions'

class Router extends React.Component {
	render() {
		const { token, role, userInfo } = this.props
		return (
			<HashRouter>
				<Switch>
					<Route exact path='/login' component={Login} />
					<Route
						path='/'
						render={() => {
							if (!token) {
								return <Redirect to='/login' />
							} else {
								if (role) {
									return <Layout />
								} else {
									userInfo(token).then(() => <Layout />)
								}
							}
						}}
					/>
				</Switch>
			</HashRouter>
		)
	}
}

export default connect(state => state.user, { userInfo })(Router)
