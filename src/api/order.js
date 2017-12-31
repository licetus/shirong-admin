import { createAuthInstance } from './general'
import { generateQueryString } from '../utils'

export const fetchOrderList = async (pagesize, page, filters, orderBy) => {
	const query = {
		pagesize,
		page,
		filters,
		orderBy,
	}
	const str = generateQueryString(query)
	return createAuthInstance().get(`admin/order?${str}`).then(res => res.data)
}
export const addOrder = async params =>
	createAuthInstance().post('admin/order', params).then(res => res.data)

export const fetchOrderDetail = async id =>
createAuthInstance().get(`admin/order/${id}`).then(res => res.data)

export const patchOrder = async (id, params) =>
	createAuthInstance().patch(`admin/order/${id}`, params).then(res => res.data)

export const activateOrder = async id =>
	createAuthInstance().put(`admin/order/${id}/activate`).then(res => res.data)

export const cancelOrder = async id =>
	createAuthInstance().put(`admin/order/${id}/cancel`).then(res => res.data)

export const deleteOrder = async id =>
	createAuthInstance().delete(`admin/order/${id}`).then(res => res.data)
