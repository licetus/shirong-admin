import axios from 'axios'
import jsmd5 from 'js-md5'
import Cookies from 'js-cookie'
import moment from 'moment'
// import env from '../../build/env'
import packjson from '../../package.json'
import config from '../../build/config'
import Enum from '../models/enum'
import api from './api'

/* eslint-disable */
import semver from 'semver'

let util = {

}

util.title = function (title) {
	title = title || 'iView admin'
	window.document.title = title
}

// const ajaxUrl = env === 'development'
// 	? 'http://127.0.0.1:8888'
// 	: env === 'production'
// 		? 'https://www.url.com'
// 		: 'https://debug.url.com'
//
// util.ajax = axios.create({
// 	baseURL: ajaxUrl,
// 	timeout: 30000
// })

util.inOf = function (arr, targetArr) {
	let res = true
	arr.forEach(item => {
		if (targetArr.indexOf(item) < 0) {
			res = false
		}
	})
	return res
}

util.oneOf = function (ele, targetArr) {
	if (targetArr.indexOf(ele) >= 0) {
		return true
	} else {
		return false
	}
}

util.showThisRoute = function (itAccess, currentAccess) {
	if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
		return util.oneOf(currentAccess, itAccess)
	} else {
		return itAccess === currentAccess
	}
}

util.getRouterObjByName = function (routers, name) {
	if (!name || !routers || !routers.length) {
		return null
	}
	// debugger
	let routerObj = null
	for (let item of routers) {
		if (item.name === name) {
			return item
		}
		routerObj = util.getRouterObjByName(item.children, name)
		if (routerObj) {
			return routerObj
		}
	}
	return null
}

util.handleTitle = function (vm, item) {
	if (typeof item.title === 'object') {
		return vm.$t(item.title.i18n)
	} else {
		return item.title
	}
}

util.setCurrentPath = function (vm, name) {
	let title = ''
	let isOtherRouter = false
	vm.$store.state.app.routers.forEach(item => {
		if (item.children.length === 1) {
			if (item.children[0].name === name) {
				title = util.handleTitle(vm, item)
				if (item.name === 'otherRouter') {
					isOtherRouter = true
				}
			}
		} else {
			item.children.forEach(child => {
				if (child.name === name) {
					title = util.handleTitle(vm, child)
					if (item.name === 'otherRouter') {
						isOtherRouter = true
					}
				}
			})
		}
	})
	let currentPathArr = []
	if (name === 'home_index') {
		currentPathArr = [
			{
				title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
				path: '',
				name: 'home_index'
			}
		]
	} else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
		currentPathArr = [
			{
				title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
				path: '/home',
				name: 'home_index'
			},
			{
				title: title,
				path: '',
				name: name
			}
		]
	} else {
		let currentPathObj = vm.$store.state.app.routers.filter(item => {
			if (item.children.length <= 1) {
				return item.children[0].name === name
			} else {
				let i = 0
				let childArr = item.children
				let len = childArr.length
				while (i < len) {
					if (childArr[i].name === name) {
						return true
					}
					i++
				}
				return false
			}
		})[0]
		if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
			currentPathArr = [
				{
					title: '首页',
					path: '',
					name: 'home_index'
				}
			]
		} else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
			currentPathArr = [
				{
					title: '首页',
					path: '/home',
					name: 'home_index'
				},
				{
					title: currentPathObj.title,
					path: '',
					name: name
				}
			]
		} else {
			let childObj = currentPathObj.children.filter((child) => {
				return child.name === name
			})[0]
			currentPathArr = [
				{
					title: '首页',
					path: '/home',
					name: 'home_index'
				},
				{
					title: currentPathObj.title,
					path: '',
					name: currentPathObj.name
				},
				{
					title: childObj.title,
					path: currentPathObj.path + '/' + childObj.path,
					name: name
				}
			]
		}
	}
	vm.$store.commit('setCurrentPath', currentPathArr)

	return currentPathArr
}

util.openNewPage = function (vm, name, argu, query) {
	let pageOpenedList = vm.$store.state.app.pageOpenedList
	let openedPageLen = pageOpenedList.length
	let i = 0
	let tagHasOpened = false
	while (i < openedPageLen) {
		if (name === pageOpenedList[i].name) { // 页面已经打开
			vm.$store.commit('pageOpenedList', {
				index: i,
				argu: argu,
				query: query
			})
			tagHasOpened = true
			break
		}
		i++
	}
	if (!tagHasOpened) {
		let tag = vm.$store.state.app.tagsList.filter((item) => {
			if (item.children) {
				return name === item.children[0].name
			} else {
				return name === item.name
			}
		})
		tag = tag[0]
		if (tag) {
			tag = tag.children ? tag.children[0] : tag
			if (argu) {
				tag.argu = argu
			}
			if (query) {
				tag.query = query
			}
			vm.$store.commit('increateTag', tag)
		}
	}
	vm.$store.commit('setCurrentPageName', name)
}

util.toDefaultPage = function (routers, name, route, next) {
	let len = routers.length
	let i = 0
	let notHandle = true
	while (i < len) {
		if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
			route.replace({
				name: routers[i].children[0].name
			})
			notHandle = false
			next()
			break
		}
		i++
	}
	if (notHandle) {
		next()
	}
}

util.fullscreenEvent = function (vm) {
	vm.$store.commit('initCachepage')
	// 权限菜单过滤相关
	vm.$store.commit('updateMenulist')
	// 全屏相关
}

util.checkUpdate = function (vm) {
	axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
		let version = res.data.tag_name
		vm.$Notice.config({
			duration: 0
		})
		if (semver.lt(packjson.version, version)) {
			Cookies.set('admin-version', version, {
				expires: 1,
			})
			if (!Cookies.get('admin-version')) {
				vm.$Notice.info({
					title: 'iview-admin更新啦',
					desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
				})
			}
		}
	})
}
/* eslint-enable */

util.md5 = (string) => {
	if (!string) return ''
	return jsmd5(string).toUpperCase()
}

util.passwordCheck = (vm, callback) => {
	let password = ''
	let isLoading = false
	const validate = async () => {
		if (!isLoading) {
			try {
				isLoading = true
				await api.login(Cookies.get('username'), util.md5(password))
				callback()
			} catch (e) {
				vm.$Message.error('密码错误')
			} finally {
				isLoading = false
			}
		}
	}
	vm.$Modal.confirm({
		title: '身份验证',
		render: h => h('InputPassword', {
			style: {
				'margin-top': '30px',
			},
			props: {
				value: password,
				autofocus: true,
			},
			on: {
				input: (val) => {
					password = val
				},
				'on-enter': () => {
					validate()
					vm.$Modal.remove()
				},
			},
		}),
		cancelText: '取消',
		okText: '确认',
		onOk: () => validate(),
	})
}

util.closeCurrentPage = (store, pageName, callback) => {
	store.commit('removeTag', pageName)
	store.commit('closePage', pageName)
	localStorage.pageOpenedList = JSON.stringify(store.state.app.pageOpenedList)
	callback()
}

util.setPageCache = (pageName, key, val) => {
	const data = util.getPageCache(pageName)
	data[key] = val
	Cookies.set(`${pageName}_cache`, JSON.stringify(data))
}

util.getPageCache = (pageName) => {
	const dataStr = Cookies.get(`${pageName}_cache`)
	if (dataStr) return JSON.parse(dataStr)
	return {}
}

util.removePageCache = (pageName) => {
	Cookies.remove(`${pageName}_cache`)
}

util.inputLengthCheck = (string, length, vm) => {
	if (string.length <= length) return true
	vm.$Message.error(`输入长度请勿超过 ${length} 个字符`)
	return false
}

util.generateImageUrl = (url) => {
	if (url) return `${config.host}${url}`
	return ''
}

util.formatPercent = percent =>
	`${Math.round(percent * 100)}%`

util.getTimestamp = (vm, date) => {
	if (!date) {
		// vm.$Message.error('错误: Date缺失')
		return null
	}
	return moment(date).valueOf()
}
util.timestampToDate = (vm, timestamp) => {
	if (!timestamp && timestamp !== 0) {
		// vm.$Message.error('错误: timestamp缺失')
		return null
	}
	return moment(timestamp).toDate()
}
util.formatTime = (vm, timestamp) => {
	if (!timestamp) {
		// vm.$Message.error('错误: Date缺失')
		return null
	}
	return moment(timestamp).format('YYYY-MM-DD HH:mm:ss')
}
util.formatBirthday = (vm, date) => {
	if (!date) {
		// vm.$Message.error('错误: Date缺失')
		return null
	}
	return moment(date).format('YYYY-MM-DD')
}
util.getAge = (vm, timestamp) => {
	if (!timestamp) {
		// vm.$Message.error('错误: timestamp')
		return null
	}
	return moment().diff(moment(timestamp), 'years')
}

util.getRole = (vm, role) => {
	if (!role) {
		// vm.$Message.error('错误: 性别数据缺失')
		return null
	}
	switch (role) {
		case Enum.Role.SuperAdmin:
			return '超级管理员'
		case Enum.Role.Admin:
			return '管理员'
		case Enum.Role.Operator:
			return '操作员'
		case Enum.Role.Agent:
			return '业务员'
		default: {
			vm.$Message.error('错误: 未知的权限')
			return null
		}
	}
}

util.getGender = (vm, gender) => {
	if (!gender) {
		// vm.$Message.error('错误: 性别数据缺失')
		return null
	}
	switch (gender) {
		case Enum.Gender.Male:
			return '男'
		case Enum.Gender.Female:
			return '女'
		default: {
			vm.$Message.error('错误: 未知的性别数据')
			return null
		}
	}
}

util.getLoanStatus = (vm, status) => {
	if (!status) {
		// vm.$Message.error('错误: 贷款状态缺失')
		return null
	}
	switch (status) {
		case Enum.Loan.Status.Prepared:
			return '已签约'
		case Enum.Loan.Status.Canceled:
			return '已取消'
		case Enum.Loan.Status.Running:
			return '计息中'
		case Enum.Loan.Status.Completed:
			return '已完成'
		default: {
			vm.$Message.error('错误: 未知的贷款状态')
			return null
		}
	}
}
util.getLoanStatusTag = (vm, status) => {
	if (!status) {
		// vm.$Message.error('错误: 贷款状态缺失')
		return null
	}
	switch (status) {
		case Enum.Loan.Status.Prepared:
			return {
				text: '已签约',
				color: 'yellow',
			}
		case Enum.Loan.Status.Canceled:
			return {
				text: '已取消',
				color: 'default',
			}
		case Enum.Loan.Status.Running:
			return {
				text: '计息中',
				color: 'green',
			}
		case Enum.Loan.Status.Completed:
			return {
				text: '已完成',
				color: 'blue',
			}
		default: {
			vm.$Message.error('错误: 未知的贷款状态')
			return null
		}
	}
}

util.getLoanApprovalStatus = (vm, status) => {
	if (!status) {
		// vm.$Message.error('错误: 审核状态缺失')
		return null
	}
	switch (status) {
		case Enum.Loan.ApprovalStatus.Submitted:
			return '待审核'
		case Enum.Loan.ApprovalStatus.Disapproved:
			return '未通过'
		case Enum.Loan.ApprovalStatus.Approved:
			return '已通过'
		default: {
			vm.$Message.error('错误: 未知的审核状态')
			return null
		}
	}
}
util.getLoanApprovalStatusTag = (vm, status) => {
	if (!status) {
		// vm.$Message.error('错误: 审核状态缺失')
		return null
	}
	switch (status) {
		case Enum.Loan.ApprovalStatus.Submitted:
			return {
				text: '待审核',
				color: 'yellow',
			}
		case Enum.Loan.ApprovalStatus.Disapproved:
			return {
				text: '未通过',
				color: 'red',
			}
		case Enum.Loan.ApprovalStatus.Approved:
			return {
				text: '已通过',
				color: 'green',
			}
		default: {
			vm.$Message.error('错误: 未知的审核状态')
			return {}
		}
	}
}

util.getLoanType = (vm, type) => {
	if (!type) {
		// vm.$Message.error('错误: 贷款类型缺失')
		return null
	}
	switch (type) {
		case Enum.Loan.Type.Other:
			return '其他'
		case Enum.Loan.Type.Car:
			return '车辆抵押'
		default: {
			vm.$Message.error('错误: 未知的贷款类型')
			return null
		}
	}
}

util.getLoanTermType = (vm, type) => {
	if (!type) {
		// vm.$Message.error('错误: 周期类型缺失')
		return null
	}
	switch (type) {
		case Enum.Loan.TermType.SevenDays:
			return '7天'
		case Enum.Loan.TermType.OneMonth:
			return '1个月'
		case Enum.Loan.TermType.ThreeMonths:
			return '3个月'
		case Enum.Loan.TermType.SixMonths:
			return '6个月'
		default: {
			vm.$Message.error('错误: 未知的周期类型')
			return null
		}
	}
}

util.getLoanRepaymentWay = (vm, type) => {
	if (!type) {
		// vm.$Message.error('错误: 还款方式缺失')
		return null
	}
	switch (type) {
		case Enum.Loan.RepaymentWay.LumpSum:
			return '一次性还款'
		case Enum.Loan.RepaymentWay.InterestFirst:
			return '先息后本'
		default: {
			vm.$Message.error('错误: 未知的还款方式')
			return null
		}
	}
}

util.getProductStatus = (vm, status) => {
	if (!status) {
		// vm.$Message.error('错误: 项目状态缺失')
		return null
	}
	switch (status) {
		case Enum.Product.Status.Prepared:
			return '已审核'
		case Enum.Product.Status.Selling:
			return '销售中'
		case Enum.Product.Status.SoldOut:
			return '已售罄'
		case Enum.Product.Status.Running:
			return '运行中'
		case Enum.Product.Status.SellingPaused:
			return '暂停销售'
		case Enum.Product.Status.RunningPaused:
			return '暂停计息'
		case Enum.Product.Status.Canceled:
			return '已取消'
		case Enum.Product.Status.Completed:
			return '已完成'
		default: {
			vm.$Message.error('错误: 未知的项目状态')
			return null
		}
	}
}
util.getProductStatusTag = (vm, status) => {
	if (!status) {
		// vm.$Message.error('错误: 项目状态缺失')
		return null
	}
	switch (status) {
		case Enum.Product.Status.Prepared:
			return {
				text: '已审核',
				color: 'yellow',
			}
		case Enum.Product.Status.Selling:
			return {
				text: '销售中',
				color: 'blue',
			}
		case Enum.Product.Status.SoldOut:
			return {
				text: '已售罄',
				color: 'green',
			}
		case Enum.Product.Status.Running:
			return {
				text: '运行中',
				color: 'green',
			}
		case Enum.Product.Status.SellingPaused:
			return {
				text: '暂停销售',
				color: 'red',
			}
		case Enum.Product.Status.RunningPaused:
			return {
				text: '暂停计息',
				color: 'red',
			}
		case Enum.Product.Status.Canceled:
			return {
				text: '已取消',
				color: 'default',
			}
		case Enum.Product.Status.Completed:
			return {
				text: '已完成',
				color: 'default',
			}
		default: {
			vm.$Message.error('错误: 未知的项目状态')
			return null
		}
	}
}

util.getProductSaleStatus = (vm, status) => {
	if (status) return '已上架'
	return '已下架'
}

util.getProductTermType = (vm, type) => {
	if (!type) {
		// vm.$Message.error('错误: 周期类型缺失')
		return null
	}
	switch (type) {
		case Enum.Product.TermType.SevenDays:
			return '7天'
		case Enum.Product.TermType.OneMonth:
			return '1个月'
		case Enum.Product.TermType.ThreeMonths:
			return '3个月'
		case Enum.Product.TermType.SixMonths:
			return '6个月'
		default: {
			vm.$Message.error('错误: 未知的周期类型')
			return null
		}
	}
}

util.getProductInterestWay = (vm, type) => {
	if (!type) {
		// vm.$Message.error('错误: 计息方式缺失')
		return null
	}
	switch (type) {
		case Enum.Product.InterestWay.ObjectCompleted:
			return '满标计息'
		default: {
			vm.$Message.error('错误: 未知的计息方式')
			return null
		}
	}
}

util.generateQueryString = (params) => {
	const urlEncode = (param, key, encode) => {
		if (!param) return ''
		let paramStr = ''
		const t = typeof (param)
		if (t === 'string' || t === 'number' || t === 'boolean') {
			paramStr += `&${key}=${((encode == null || encode) ? encodeURIComponent(param) : param)}`
		} else {
			Object.keys(param).forEach((i) => {
				const k = key == null ? i : key + (param instanceof Array ? `[${i}]` : `.${i}`)
				paramStr += urlEncode(param[i], k, encode)
			})
		}
		return paramStr
	}
	return urlEncode(params).slice(1)
}

export default util
