import SafeImg from './image-controler'
import InputPassword from './input-password'
import SimpleTag from './simple-tag'
import ImageUploader from './image-uploader'
import ProductDescription from './product-description'

const Public = {
	install(Vue) {
		Vue.component('SafeImg', SafeImg)
		Vue.component('InputPassword', InputPassword)
		Vue.component('SimpleTag', SimpleTag)
		Vue.component('ImageUploader', ImageUploader)
		Vue.component('ProductDescription', ProductDescription)
	},
}

export default Public
