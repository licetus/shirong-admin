import SafeImg from './image-controler'
import InputPassword from './input-password'
import SimpleTag from './simple-tag'

const Public = {
	install(Vue) {
		Vue.component('SafeImg', SafeImg)
		Vue.component('InputPassword', InputPassword)
		Vue.component('SimpleTag', SimpleTag)
	},
}

export default Public
