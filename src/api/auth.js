// import Models from '../models'
import { createInstance } from './general'


export const login = async (username, password) => {
	const params = { username, password }
	return createInstance().post('auth/admin/login', params).then(res => res.data)
}
// --test
// export const login = async (account, password) => {
// 	const res = {
// 		id: 123456890,
// 		token: `${account}+${password}`,
// 		role: 1,
// 	}
// 	return res
// }
// test--
