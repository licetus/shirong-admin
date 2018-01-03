import axios from 'axios'
import config from '../../build/config'

class ServerError extends Error {
	constructor(code, message) {
		super(message)
		this.code = code
	}
}

const errorParser = (response) => {
	if (response.status === 200 || response.status === 204) {
		return response
	} else if (response.data && response.data.error) {
		const error = new ServerError(response.data.error.code, response.data.error.message)
		return Promise.reject(error)
	}
	return Promise.reject(new Error('unknown network error'))
}

const createInstance = (authenticated) => {
	const baseURL = `${config.host}api/v0`
	const timeout = config.httpRequestInterval || 30000
	let headers = {}
	if (authenticated) {
		const token = sessionStorage.getItem('token')
		headers = { 'X-Auth-Key': token }
	}
	const instance = axios.create({
		baseURL,
		timeout,
		headers,
		validateStatus: () => true,
	})
	instance.interceptors.response.use(errorParser)
	return instance
}

const createAuthInstance = () => createInstance(true)

const api = {}

api.login = async (username, password) => {
	const params = { username, password }
	return createInstance().post('auth/admin/login', params).then(res => res.data)
}

export default api
