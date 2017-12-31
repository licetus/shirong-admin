import { createAuthInstance } from './general'
import { generateQueryString } from '../utils'

export const fetchRecentMessageList = async (type, id) => {
	const str = generateQueryString({ type, id })
	return createAuthInstance().get(`message/recent?${str}`).then(res => res.data)
}

export const fetchHistoricalMessageList = async (type, id, next, pagesize) => {
	const str = generateQueryString({ type, id, next, pagesize })
	return createAuthInstance().get(`message/historical?${str}`).then(res => res.data)
}

export const fetchNewMessageList = async (type, id, to) => {
	const str = generateQueryString({ type, id, to })
	return createAuthInstance().get(`message/new?${str}`).then(res => res.data)
}

export const fetchMessageList = async () =>
	createAuthInstance().get('message/admin').then(res => res.data)


export const sendMessage = async (type, id, messageType, content) => {
	const str = generateQueryString({ type, id })
	const body = { messageType, content }
	return createAuthInstance().post(`message?${str}`, body).then(res => res.data)
}

export const fetchHasNewNotification = async () =>
	createAuthInstance().get('notification/hasNew').then(res => res.data)

export const fetchNotificationOverview = async () =>
	createAuthInstance().get('notification/overview').then(res => res.data)

export const fetchNotificationList = async (pagesize, next) => {
	const str = generateQueryString({ pagesize, next })
	return createAuthInstance().get(`notification?${str}`).then(res => res.data)
}

export const readNotification = async id =>
	createAuthInstance().put(`/notification/${id}/read`).then(res => res.data)
