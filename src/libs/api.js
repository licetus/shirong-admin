import axios from 'axios'
import config from '../../build/config'
import util from '../libs/util'

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

// auth
api.login = async (account, password) => {
	const params = { account, password }
	return createInstance().post('auth/admin/login', params).then(res => res.data)
}

// debtor
api.debtor = {
	fetchList: async (pagesize, page, filters, orderBy) => {
		const query = {
			pagesize,
			page,
			filters,
			orderBy,
		}
		const str = util.generateQueryString(query)
		return createAuthInstance().get(`debtor/?${str}`).then(res => res.data)
	},
	profile: {
		add: async params =>
			createAuthInstance().post('debtor', params).then(res => res.data),
		delete: async id =>
			createAuthInstance().delete(`debtor/${id}`).then(res => res.data),
		update: async (params, id) =>
			createAuthInstance().patch(`debtor/${id}`, params).then(res => res.data),
		fetch: async id =>
			createAuthInstance().get(`debtor/${id}`).then(res => res.data),
	},
	identify: {
		delete: async id =>
			createAuthInstance().delete(`debtor/${id}/idCard`).then(res => res.data),
		update: async (params, id) =>
			createAuthInstance().post(`debtor/${id}/idCard`, params).then(res => res.data),
		fetch: async id =>
			createAuthInstance().get(`debtor/${id}/idCard`).then(res => res.data),
	},
	credit: {
		delete: async id =>
			createAuthInstance().delete(`debtor/${id}/creditInfo`).then(res => res.data),
		update: async (params, id) =>
			createAuthInstance().post(`debtor/${id}/creditInfo`, params).then(res => res.data),
		fetch: async id =>
			createAuthInstance().get(`debtor/${id}/creditInfo`).then(res => res.data),
	},
}

export default api
