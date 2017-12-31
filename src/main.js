import Vue from 'vue'
import iView from 'iview'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import zhLocale from 'iview/dist/locale/zh-CN'
import enLocale from 'iview/dist/locale/en-US'
import twLocale from 'iview/dist/locale/zh-TW'

import 'iview/dist/styles/iview.css'
import './styles/index.less'
// import 'element-ui/lib/theme-default/index.css'

import Routers from './router'
// import Util from './libs/util'
import App from './app.vue'
import Public from './components/public'

// import { checkUser } from './utils'
import { formatTitle } from './utils'
import { EN } from './assets/localization/en-us'
import { CN } from './assets/localization/zh-cn'
import { TW } from './assets/localization/zh-tw'


Vue.use(VueRouter)
Vue.use(Vuex)

Vue.use(iView)
// Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(Public)

// i18n配置 i18n5.0
Vue.config.lang = 'en-US' // i18n 5.0
// Vue.config.lang = localStorage.lang || 'en-US' // i18n 5.0
enLocale.messages = EN
zhLocale.messages = CN
twLocale.messages = TW

const locales = {
	'en-US': enLocale,
	'zh-CN': zhLocale,
	'zh-TW': twLocale,
}

Object.keys(locales).forEach((lang) => {
	Vue.locale(lang, locales[lang])
})

// i18n配置 i18n6.0
// const i18n = new VueI18n({
// 	locale: localStorage.lang || 'en-US',   // 语言标识	i18n 6.0
// 	messages: {
// 		'en-US': require('./assets/localization/en-us.json'),   // 英文语言包
// 		'zh-CN': require('./assets/localization/zh-cn.json'),   // 中文简体语言包
// 		'zh-TW': require('./assets/localization/zh-tw.json'),   // 中文繁体语言包
// 	},
// })

// 路由配置
const RouterConfig = {
	mode: 'history',
	// base: '/admin/',
	routes: Routers,
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }
	},
}
const router = new VueRouter(RouterConfig)

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start()
	const token = sessionStorage.getItem('token')
	if (!token && to.path !== '/login') {
		next({ path: '/login' })
	} else {
		formatTitle(to.name)
		next()
	}
})

router.afterEach(() => {
	iView.LoadingBar.finish()
	// window.scrollTo(0, 0)
})


const store = new Vuex.Store({
	state: {},
	getters: {},
	mutations: {},
	actions: {},
})
/* eslint-disable */
new Vue({
	el: '#app',
	// i18n,//i18n 6.0
	router,
	store,
	components: {
		App,
	},
	render: h => h(App),
})
/* eslint-enable */
