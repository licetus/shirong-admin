import SafeImg from './image-controler'
import InputPassword from './input-password'

const Public = {
	install(Vue) {
		Vue.component('SafeImg', SafeImg)
		Vue.component('InputPassword', InputPassword)
	},
}

export default Public
