import { createAuthInstance } from './general'
import { generateQueryString } from '../utils'

export const fetchOperatorList = async (pagesize, page, filters, orderBy) => {
	const query = {
		pagesize,
		page,
		filters,
		orderBy,
	}
	const str = generateQueryString(query)
	return createAuthInstance().get(`admin/operator?${str}`).then(res => res.data)
}

export const fetchOperatorDetail = async id =>
	createAuthInstance().get(`admin/operator/${id}`).then(res => res.data)

export const addOperator = async params =>
	createAuthInstance().post('admin/operator', params).then(res => res.data)

export const patchOperator = async (id, params) =>
	createAuthInstance().patch(`admin/operator/${id}`, params).then(res => res.data)
