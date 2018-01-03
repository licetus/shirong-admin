import Cookies from 'js-cookie'

const user = {
	state: {},
	mutations: {
		/* eslint-disable */
		logout(state, vm) {
			Cookies.remove('username')
			Cookies.remove('password')
			Cookies.remove('access')
			sessionStorage.removeItem('token')
			// 恢复默认样式
			const themeLink = document.querySelector('link[name="theme"]')
			themeLink.setAttribute('href', '')
			// 清空打开的页面等数据，但是保存主题数据
			let theme = ''
			if (localStorage.theme) {
				theme = localStorage.theme
			}
			localStorage.clear()
			if (theme) {
				localStorage.theme = theme
			}
		},
		/* eslint-enable */
	},
}

export default user
