import { createAuthInstance } from './general'

export const fetchUserList = async () =>
	createAuthInstance().get('auth/admin').then(res => res.data)

export const createUser = async user =>
	createAuthInstance().post('auth/admin', user).then(res => res.data)

export const updateUser = async (id, user) =>
	createAuthInstance().patch(`auth/admin/${id}`, user).then(res => res.data)

export const updateCurrentUser = async self =>
	createAuthInstance().patch('auth/admin', self).then(res => res.data)

export const removeUser = async id =>
	createAuthInstance().delete(`auth/admin/${id}`).then(res => res.data)
