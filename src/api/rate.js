import { createAuthInstance } from './general'

export const fetchAerolinkRate = async () =>
	createAuthInstance().get('admin/aerolinkRate').then(res => res.data)

export const updateAerolinkRate = async (rate) => {
	const params = {
		aerolinkRate: rate,
	}
	return createAuthInstance().post('admin/aerolinkRate', params).then(res => res.data)
}
