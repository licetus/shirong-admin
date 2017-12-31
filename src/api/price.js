import { createAuthInstance } from './general'

export const fetchPriceList = async () =>
	createAuthInstance().get('admin/price').then(res => res.data)

export const updatePrice = async params =>
	createAuthInstance().post('admin/price', params).then(res => res.data)
