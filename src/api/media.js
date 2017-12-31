import { createAuthInstance } from './general'

export const uploadImage = async (image) => {
	const data = new window.FormData()
	data.append('image', image)
	return createAuthInstance().post('media/image', data).then(res => res.data)
}
