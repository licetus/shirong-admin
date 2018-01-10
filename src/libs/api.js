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

// account
api.admin = {
	account: {
		fetchList: async (pagesize, page, filters, orderBy) => {
			const query = {
				pagesize,
				page,
				filters,
				orderBy,
			}
			const str = `?${util.generateQueryString(query)}`
			return createAuthInstance().get(`auth/admin${str}`).then(res => res.data)
		},
		add: async params =>
			createAuthInstance().post('auth/admin', params).then(res => res.data),
		delete: async id =>
			createAuthInstance().delete(`auth/admin/${id}`).then(res => res.data),
		update: async (params, id) =>
			createAuthInstance().patch(`auth/admin/${id}`, params).then(res => res.data),
		updateSelf: async params =>
			createAuthInstance().patch('auth/admin', params).then(res => res.data),
	},
	profile: {
		updateSelf: async params =>
			createAuthInstance().patch('admin/profile', params).then(res => res.data),
		fetchSelf: async params =>
			createAuthInstance().patch('admin/profile', params).then(res => res.data),
	},
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
		const str = `?${util.generateQueryString(query)}`
		return createAuthInstance().get(`debtor/${str}`).then(res => res.data)
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
// loan
api.loan = {
	fetchList: async (pagesize, page, filters, orderBy) => {
		const query = {
			pagesize,
			page,
			filters,
			orderBy,
		}
		const str = `?${util.generateQueryString(query)}`
		return createAuthInstance().get(`loan/${str}`).then(res => res.data)
	},
	fetchAvailableList: async (pagesize, page, filters, orderBy) => {
		const query = {
			pagesize,
			page,
			filters,
			orderBy,
		}
		const str = `?${util.generateQueryString(query)}&productable=true`
		return createAuthInstance().get(`loan/${str}`).then(res => res.data)
	},
	add: async params =>
		createAuthInstance().post('loan', params).then(res => res.data),
	delete: async id =>
		createAuthInstance().delete(`loan/${id}`).then(res => res.data),
	update: async (params, id) =>
		createAuthInstance().patch(`loan/${id}`, params).then(res => res.data),
	fetch: async id =>
		createAuthInstance().get(`loan/${id}`).then(res => res.data),
	approve: async id =>
		createAuthInstance().put(`loan/${id}/approve`).then(res => res.data),
	disapprove: async id =>
		createAuthInstance().put(`loan/${id}/disapprove`).then(res => res.data),
	start: async id =>
		createAuthInstance().put(`loan/${id}/start`).then(res => res.data),
	complete: async id =>
		createAuthInstance().put(`loan/${id}/complete`).then(res => res.data),
	comment: {
		fetchList: async (pagesize, page, filters, orderBy, id) => {
			const query = {
				pagesize,
				page,
				filters,
				orderBy,
			}
			const str = `?${util.generateQueryString(query)}`
			return createAuthInstance().get(`loan/${id}/comment${str}`).then(res => res.data)
		},
		add: async (params, id) =>
			createAuthInstance().post(`loan/${id}/comment`, params).then(res => res.data),
	},
}
// product
api.product = {
	fetchList: async (pagesize, page, filters, orderBy) => {
		const query = {
			pagesize,
			page,
			filters,
			orderBy,
		}
		const str = `?${util.generateQueryString(query)}`
		return createAuthInstance().get(`product/${str}`).then(res => res.data)
	},
	tag: {
		fetchList: async (pagesize, page, filters, orderBy) => {
			const query = {
				pagesize,
				page,
				filters,
				orderBy,
			}
			const str = `?${util.generateQueryString(query)}`
			return createAuthInstance().get(`product/tag${str}`).then(res => res.data)
		},
		add: async params =>
			createAuthInstance().post('product/tag', params).then(res => res.data),
		delete: async id =>
			createAuthInstance().delete(`product/tag/${id}`).then(res => res.data),
		update: async (params, id) =>
			createAuthInstance().patch(`product/tag/${id}`, params).then(res => res.data),
		fetch: async id =>
			createAuthInstance().get(`product/tag/${id}`).then(res => res.data),
	},
	add: async (params, id) =>
		createAuthInstance().post(`product/${id}`, params).then(res => res.data),
	delete: async id =>
		createAuthInstance().delete(`product/${id}`).then(res => res.data),
	update: async (params, id) =>
		createAuthInstance().patch(`product/${id}`, params).then(res => res.data),
	fetch: async id =>
		createAuthInstance().get(`product/${id}`).then(res => res.data),
	publish: async id =>
		createAuthInstance().put(`product/${id}/publish`).then(res => res.data),
	pause: async id =>
		createAuthInstance().put(`product/${id}/pause`).then(res => res.data),
	resume: async id =>
		createAuthInstance().put(`product/${id}/resume`).then(res => res.data),
	cancel: async id =>
		createAuthInstance().put(`product/${id}/cancel`).then(res => res.data),
	switchSaleStatus: async (status, id) =>
		createAuthInstance().put(`product/${id}/changeOnSale?isOnSale=${status}`).then(res => res.data),
}

export default api
