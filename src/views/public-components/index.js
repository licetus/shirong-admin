import SafeImg from './image-controler'

const Public = {
	install(Vue) {
		Vue.component('SafeImg', SafeImg)
	},
}

export default Public
