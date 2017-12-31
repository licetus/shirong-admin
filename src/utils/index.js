import moment from 'moment'
import jsmd5 from 'js-md5'

import * as airportList from '../assets/static/airport.JSON'
import * as aircraftTypeList from '../assets/static/aircraftType.JSON'
import * as arpList from '../assets/static/arp.JSON'
import * as countryList from '../assets/static/country.JSON'
import * as countryCodeList from '../assets/static/countryCode.JSON'

import * as Api from '../api'
import config from '../config/config'
import { Enum } from '../models'


export const md5 = (string) => {
	if (!string) return ''
	return jsmd5(string).toUpperCase()
}

export const errorHandler = (code, message, context) => {
	switch (code) {
	case 'NOT_AUTHORIZE_ERROR':
		context.$Message.error(message)
		window.sessionStorage.removeItem('token')// remove token to re-login
		break
	case 'NOT_AUTHENTICATE_ERROR':
		context.$Message.error(message)
		window.sessionStorage.removeItem('token')// remove token to re-login
		break
	case 'INVALID_AUTH_KEY_ERROR':
		context.$Message.error(message)
		window.sessionStorage.removeItem('token')// remove token to re-login
		break
	case 'GET_ORDER_FAILED_ERROR':
		context.$Message.error(message)
		context.$router.go(-1)
		// context.$router.replace('/orders')
		break
	case 'GET_PILOT_PROFILE_FAILED_ERROR':
		context.$Message.error(message)
		context.$router.go(-1)
		// context.$router.replace('/pilots')
		break
	case 'EMPTY_PILOT_PROFILE_ERROR':
		context.$Message.info({
			content: 'Uncompeleted New Pilot, Now Continue Finishing Adding.',
			duration: 10,
			closable: true,
		})
		break
	case 'GET_OPERATOR_PROFILE_FAILED_ERROR':
		context.$Message.error(message)
		context.$router.go(-1)
		// context.$router.replace('/operators')
		break
	case 'EMPTY_OPERATOR_PROFILE_ERROR':
		context.$Message.info(
			{
				content: 'Uncompeleted New Operator, Now Continue Finishing Adding.',
				duration: 10,
				closable: true,
			})
		break
	default:
		context.$Message.error(message)
	}
}

export const checkUser = user =>
(user && user.token && user.id && user.role)

export const formatGender = (gender) => {
	switch (gender) {
	case Enum.Gender.Male:
		return 'Male'
	case Enum.Gender.Female:
		return 'Female'
	case Enum.Gender.Unknown:
		return 'Unknown'
	default:
		return 'Unknown'
	}
}

export const getOrderStatusTag = (status) => {
	switch (status) {
	case Enum.OrderStatus.Pending:
		return {
			color: 'yellow',
			text: 'Pending',
		}
	case Enum.OrderStatus.Active:
		return {
			color: 'green',
			text: 'Active',
		}
	case Enum.OrderStatus.Completed:
		return {
			color: 'blue',
			text: 'Completed',
		}
	case Enum.OrderStatus.Canceled:
		return {
			color: null,
			text: 'Canceled',
		}
	default:
		return {
			color: null,
			text: 'Unknown',
		}
	}
}
export const getPaymentStatus = (status) => {
	switch (status) {
	case Enum.PaymentStatus.Unpaid:
		return 'Unpaid'
	case Enum.PaymentStatus.Paid:
		return 'Paid'
	case Enum.PaymentStatus.MonthlyPaid:
		return 'MonthlyPaid'
	default:
		return 'Unknown'
	}
}

export const getDocumentType = (type) => {
	switch (type) {
	case Enum.DocumentType.License:
		return 'License'
	case Enum.DocumentType.MedicalCertificate:
		return 'MedicalCertificate'
	case Enum.DocumentType.Passport:
		return 'Passport'
	case Enum.DocumentType.Visa:
		return 'Visa'
	case Enum.DocumentType.CV:
		return 'CV'
	case Enum.DocumentType.RadiotelephonyLicense:
		return 'RadiotelephonyLicense'
	case Enum.DocumentType.EnglishProficiencyCertificate:
		return 'EnglishProficiencyCertificate'
	case Enum.DocumentType.LastRecurrentTraining:
		return 'LastRecurrentTraining'
	case Enum.DocumentType.InternationalProcedureTraining:
		return 'InternationalProcedureTraining'
	case Enum.DocumentType.AdsbTrainingRecord:
		return 'AdsbTrainingRecord'
	case Enum.DocumentType.CpdlcTrainingRecord:
		return 'CpdlcTrainingRecord'
	case Enum.DocumentType.CrewIdCopy:
		return 'CrewIdCopy'
	case Enum.DocumentType.Other:
		return 'Other'
	default:
	}
	return 'Unknown'
}

export const getPilotScheduleType = (type) => {
	switch (type) {
	case Enum.PilotScheduleType.Order:
		return 'Order'
	case Enum.PilotScheduleType.MedicalCondition:
		return 'MedicalCondition'
	case Enum.PilotScheduleType.Recurrency:
		return 'Recurrency'
	case Enum.PilotScheduleType.Other:
		return 'Other'
	default:
		return 'Unknown'
	}
}

export const getPilotScheduleStatus = (status) => {
	switch (status) {
	case Enum.PilotScheduleStatus.Free:
		return 'Free'
	case Enum.PilotScheduleStatus.Occupied:
		return 'Occupied'
	case Enum.PilotScheduleStatus.Tentative:
		return 'Tentative'
	default:
		return 'Unknown'
	}
}


export const getLicenseType = (type) => {
	if (!type) return 'NoData'
	switch (type) {
	case Enum.LicenseType.FAA:
		return 'FAA'
	case Enum.LicenseType.EASA:
		return 'EASA'
	case Enum.LicenseType.CAAC:
		return 'CAAC'
	case Enum.LicenseType.HKCAD:
		return 'HKCAD'
	case Enum.LicenseType.CAACI:
		return 'CAACI'
	case Enum.LicenseType.BCAA:
		return 'BCAA'
	case Enum.LicenseType.DCA:
		return 'DCA'
	case Enum.LicenseType.CAA:
		return 'CAA'
	default:
		return 'Unknown'
	}
}

export const getRoleType = (type) => {
	if (!type) return null
	switch (type) {
	case Enum.RoleType.Superadmin:
		return 'Superadmin'
	case Enum.RoleType.Admin:
		return 'Admin'
	default:
	}
	return 'invalid type'
}

export const getOperatorType = (type) => {
	if (!type) return null
	switch (type) {
	case Enum.OperatorType.Smb:
		return 'Smb'
	case Enum.OperatorType.Premium:
		return 'Premium'
	default:
	}
	return 'invalid type'
}

export const getVisaType = (type) => {
	switch (type) {
	case Enum.VisaType.Business:
		return 'Business'
	case Enum.VisaType.Ohter:
		return 'Other'
	default:
		return 'Unknown'
	}
}

export const getAirport = (id, length) => {
	if (!id) return null
	for (const item of airportList) {
		if (item.id === id) {
			if (length === 'max') return `${item.location} - ${item.airport} ( ${item.iata} / ${item.icao} ) ${item.country}`
			else if (length === 'middle') return `${item.location}, (${item.iata})`
			else if (length === 'min') return `${item.iata}`
			return '-'
		}
	}
	return 'error: no match result'
}
export const getAirportList = () => {
	const list = []
	airportList.forEach((item, index) => {
		list[index] = {
			id: item.id,
			label: getAirport(item.id, 'middle'),
			slot: getAirport(item.id, 'max'),
		}
	})
	return list
}

export const getAircraftType = (id, length) => {
	if (!id) return null
	for (const item of aircraftTypeList) {
		if (item.id === id) {
			if (length === 'max') return `${item.designation} - ${item.manufacturer} (${item.model})`
			else if (length === 'middle') return `${item.manufacturer} ${item.model}`
			else if (length === 'min') return `${item.model}`
			return '-'
		}
	}
	return 'error: no match result'
}
export const getAircraftTypeList = () => {
	const list = []
	aircraftTypeList.forEach((item, index) => {
		list[index] = {
			id: item.id,
			label: getAircraftType(item.id, 'min'),
			slot: getAircraftType(item.id, 'max'),
		}
	})
	return list
}

export const getArp = (id, length) => {
	if (!id) return null
	for (const item of arpList) {
		if (item.id === id) {
			if (length === 'max') return `${item.prefix} - ${item.country}`
			else if (length === 'min') return `${item.prefix}`
			return '-'
		}
	}
	return 'error: no match result'
}
export const getArpList = () => {
	const list = []
	arpList.forEach((item, index) => {
		list[index] = {
			id: item.id,
			label: getArp(item.id, 'min'),
			slot: getArp(item.id, 'max'),
		}
	})
	return list
}

export const getCountry = (id) => {
	if (!id) return null
	for (const item of countryList) {
		if (item.id === id) return item.name
	}
	return 'error: no match result'
}

export const getCountryList = () => {
	const list = []
	countryList.forEach((item, index) => {
		list[index] = {
			id: item.id,
			label: getCountry(item.id),
			slot: getCountry(item.id),
		}
	})
	return list
}

export const getCountryCode = (id, length) => {
	if (!id) return null
	for (const item of countryCodeList) {
		if (item.id === id) {
			if (length === 'max') return `(+${item.code}) - ${item.country}`
			else if (length === 'min') return `+${item.code}`
		}
	}
	return 'error: no match result'
}

export const getCountryCodeList = () => {
	const list = []
	countryCodeList.forEach((item, index) => {
		list[index] = {
			id: item.id,
			label: getCountryCode(item.id, 'max'),
			slot: getCountryCode(item.id, 'max'),
		}
	})
	return list
}

export const getGeoLocation = async (lat, lng) => {
	if (!lat || !lng) return 'No Data'
	const key = `${lat}, ${lng}`
	let location = localStorage.getItem(key)
	if (!location || location === undefined || location === null) {
		try {
			const res = await Api.getLocation(lat, lng)
			if (res.status === 'OK') {
				for (const item of res.results) {
					if (item.types[0] === 'administrative_area_level_1') {
						location = item.formatted_address
						localStorage.setItem(key, location)
						break
					}
				}
			} else location = 'Unknown Location'
		} catch (error) {
			location = 'Unknown Location'
		}
	}
	return location
}

export const getTime = () => {
	const time = new Date()
	return time.getTime()
}

export const getUTCTime = (localDate) => {
	let date
	if (!localDate) date = new Date()
	else if (typeof localDate === 'number' || !localDate) date = new Date(localDate)
	else date = localDate
	const time = {
		y: date.getFullYear(),
		m: date.getMonth(),
		d: date.getDate(),
		hh: date.getHours(),
		mm: date.getMinutes(),
		ss: date.getSeconds(),
	}
	return time
}

export const getTimestamp = (date) => {
	if (!date) return null
	return moment(date).valueOf()
}

export const getDate = (timestamp) => {
	if (!timestamp && timestamp !== 0) return null
	return moment(timestamp).toDate()
}

export const getUTCTimestamp = (localDate, type) => {
	// const time = getUTCTime(localDate)
	// return Date.UTC(time.y, time.m, time.d)
	if (!localDate) return null
	const date = type === 'end' ? moment(localDate).add(1, 'days') : moment(localDate)
	const y = date.year()
	const m = date.month()
	const d = date.date()
	const utcTimestamp = moment().utc().set({ year: y, month: m, date: d, hour: 0, minute: 0, second: 0, millisecond: 0 })
	return utcTimestamp.valueOf()
}

export const getLocalDate = (utcTimestamp, type) => {
	// const time = getUTCTime(utcTimestamp)
	// const date = new Date()
	// date.setFullYear(time.y, time.m, time.d)
	// return date
	if (!utcTimestamp && utcTimestamp !== 0) return null
	const utc = type === 'end' ? moment.utc(utcTimestamp).subtract(1, 'days') : moment.utc(utcTimestamp)
	const y = utc.year()
	const m = utc.month()
	const d = utc.date()
	const localDate = moment().local().set({ year: y, month: m, date: d, hour: 0, minute: 0, second: 0, millisecond: 0 })
	return localDate.toDate()
}

export const formatUTCTime = (timestamp, type) => {
	if (!timestamp && timestamp !== 0) return ''
	const date = type === 'end' ? moment.utc(timestamp).subtract(1, 'days') : moment.utc(timestamp)
	return date.format('D MMM YYYY HH:mm:ss')
}

export const formatLocalTime = (timestamp) => {
	if (!timestamp && timestamp !== 0) return ''
	return moment(timestamp).format('D MMM YYYY HH:mm:ss')
}

export const formatUTCDate = (timestamp, type) => {
	if (!timestamp && timestamp !== 0) return ''
	const date = type === 'end' ? moment.utc(timestamp).subtract(1, 'days') : moment.utc(timestamp)
	return date.format('D MMM YYYY')
}

export const formatDigitalDate = (timestamp) => {
	if (!timestamp && timestamp !== 0) return 'No Data'
	return moment(timestamp).format('D/MM/YYYY')
}

export const formatUTCDigitalDate = (timestamp, type) => {
	if (!timestamp && timestamp !== 0) return ''
	const date = type === 'end' ? moment.utc(timestamp).subtract(1, 'days') : moment.utc(timestamp)
	return date.format('D/MM/YYYY')
}

export const formatBirthday = (timestamp) => {
	if (!timestamp && timestamp !== 0) return ''
	return moment(timestamp).format('Do MMMM YYYY')
}

export const formatLocalDate = (timestamp) => {
	if (!timestamp && timestamp !== 0) return ''
	return moment(timestamp).format('D MMM YYYY')
}

export const formatUTCWeekDate = (timestamp) => {
	if (!timestamp && timestamp !== 0) return ''
	return moment.utc(timestamp).format('ddd D MMM YYYY')
}

export const formatLocalWeekDate = (timestamp) => {
	if (!timestamp && timestamp !== 0) return ''
	return moment(timestamp).format('ddd D MMM YYYY')
}

export const formatMonth = (timestamp) => {
	if (!timestamp && timestamp !== 0) return 'No Data'
	return moment(timestamp).format('MMM YYYY')
}

export const formatUTCMonth = (timestamp) => {
	if (!timestamp && timestamp !== 0) return 'No Data'
	return moment.utc(timestamp).format('MMM YYYY')
}

export const formatLocalMonth = (timestamp) => {
	if (!timestamp && timestamp !== 0) return ''
	return moment(timestamp).format('MMM YYYY')
}

export const getDuration = (startTime, endTime) =>
	Math.ceil((endTime - startTime) / (24 * 60 * 60 * 1000))

export const getDurationString = (startTime, endTime) => {
	const times = endTime - startTime
	const days = Math.floor(times / (24 * 60 * 60 * 1000))
	// const years = Math.floor(days / 365)
	// const months = Math.floor(days / 30)
	const hoursLeave = times % (24 * 60 * 60 * 1000)
	const hours = Math.floor(hoursLeave / (60 * 60 * 1000))
	const minutesLeave = hoursLeave % (60 * 60 * 1000)
	const minutes = Math.floor(minutesLeave / (60 * 1000))
	const secondsLeave = minutesLeave % (60 * 1000)
	const seconds = Math.floor(secondsLeave / 1000)
	// if (years >= 1) return `${years} yr${years > 1 ? 's' : ''}`
	// else if (months >= 1) return `${months} month${months > 1 ? 's' : ''}`
	if (days > 7) return moment(startTime).format('MM/D/YYYY')
	else if (days >= 1) return `${days} day${days > 1 ? 's' : ''} ago`
	else if (hours >= 1) return `${hours} hr${hours > 1 ? 's' : ''} ago`
	else if (minutes >= 1) return `${minutes} min${minutes > 1 ? 's' : ''} ago`
	else if (seconds >= 1) return `${seconds} sec${seconds > 1 ? 's' : ''} ago`
	return '-'
}

export const getAge = (timestamp) => {
	if (!timestamp && timestamp !== 0) return null
	if (timestamp || timestamp === 0) {
		const d = new Date()
		const now = d.getFullYear()
		d.setTime(timestamp)
		const birthyear = d.getFullYear()
		const age = now - birthyear
		return age
	}
	return '-'
}

export const formatDurationFromNow = (timestamp) => {
	if (timestamp || timestamp === 0) {
		const startTime = timestamp
		const endTime = moment().valueOf()
		const duration = getDurationString(startTime, endTime)
		return duration
	}
	return '-'
}

const sortEvents = (events) => {
	if (events.length < 2) return events
	return events.sort((a, b) => (a.start - b.start) > 0)
}
export const getEvents = (date, fullEvents) => {
	const events = []
	fullEvents.forEach((item) => {
		if (item.startTime && item.endTime) {
			const currentDate = date.startOf('month')
			const start = moment.utc(item.startTime)
			const end = moment.utc(item.endTime).subtract(1, 'days')
			for (let i = 1; i <= date.daysInMonth(); i += 1) {
				if (currentDate.isBetween(start, end, null, '[]')) {
					const event = {
						start: item.startTime,
						end: end.valueOf(),
						title: item.title,
						content: item.content,
						status: item.status,
						type: item.type,
					}
					events.push(event)
					break
				}
				if (i < date.daysInMonth()) currentDate.add(1, 'days')
			}
		}
	})
	return sortEvents(events)
}


export const generateImgUrl = (imgUrl, placeholder) => {
	const ph = placeholder || ''
	return imgUrl ? `${config.host}${imgUrl}` : ph
}

export const timeout = delay =>
	new Promise(resolve => setTimeout(resolve, delay))

export const formatTitle = (title) => {
	const titleText = title ? `${title} - Manager` : 'Aero Link Admin'
	window.document.title = titleText
}

export const generateSortQuery = (arr, key, order) => {
	const str = `${key} ${order === 'desc' ? order : ''}`
	arr.forEach((item, index) => {
		if (item.indexOf(key) !== -1) arr.splice(index, 1)
	})
	arr.unshift(str)
	return arr.join()
}

export const generateQueryString = (params) => {
	const urlEncode = (param, key, encode) => {
		if (param == null) return ''
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

const iterateKeysObj = (obj, keyFunc) => {
	if (!(obj instanceof Object)) return obj
	if (obj instanceof Array) {
		return obj.reduce((newArray, item) => {
			newArray.push(iterateKeysObj(item, keyFunc))
			return newArray
		}, [])
	}

	return Object.keys(obj).reduce((item, key) => {
		const newKey = keyFunc(key)
		const newObj = item
		newObj[newKey] = iterateKeysObj(obj[key], keyFunc)
		return newObj
	}, {})
}

const iterateKeys = (obj, keyFunc) => {
	if (typeof (obj) === 'string') return keyFunc(obj)
	return iterateKeysObj(obj, keyFunc)
}

export const underlineCase2camelCase = (obj) => {
	iterateKeys(obj, (key) => {
		let newKey = ''
		let toUpperCase = false
		for (let i = 0; i < key.length; i += 1) {
			if (key[i] === '_') {
				toUpperCase = true
			} else {
				newKey += toUpperCase ? key[i].toUpperCase() : key[i]
				toUpperCase = false
			}
		}
		return newKey
	})
}

export const camelCase2underlineCase = (obj) => {
	iterateKeys(obj, (key) => {
		let newKey = ''
		for (let i = 0; i < key.length; i += 1) {
			if (key[i] <= 'Z' && key[i] >= 'A') {
				if (newKey) newKey += '_'
				newKey += `${key[i].toLowerCase()}`
			} else {
				newKey += key[i]
			}
		}
		return newKey
	})
}

export const toUpperCaseInitial = (str) => {
	if (str.length > 0) {
		return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`
	}
	return ''
}
// Extend the default Number object with a formatMoney() method:
// usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
// defaults: (2, "$", ",", ".")
/* eslint-disable */
export const formatMoney = (number, places, symbol, thousand, decimal) => {
	number = number || 0;
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "$";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var negative = number < 0 ? "-" : "",
			i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
			j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
}
/* eslint-enable */

// Math
/* eslint-disable */
export const addNum = (a, b) => {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
Number.prototype.addNum = (arg) =>
	add(arg, this)

export const subNum = (a, b) => {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
Number.prototype.subNum = (arg) =>
	sub(arg, this)

export const mulNum = (a, b) => {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
Number.prototype.mulNum = (arg) =>
	mul(arg, this)

export const divNum = (a, b) => {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}
Number.prototype.divNum = (arg) =>
	div(this, arg)
/* eslint-enable */

export const formatRate = rate =>
	`${Math.round(rate * 100)}%`

export const getBaseDailyPrice = (duration, price) => {
	let baseDailyPrice = price.oneDayPrice
	if (duration >= 30) baseDailyPrice = price.thirtyDaysPrice
	else if (duration >= 14) baseDailyPrice = price.fourteenDaysPrice
	else if (duration >= 7) baseDailyPrice = price.sevenDaysPrice
	return baseDailyPrice
}

export const getOrderCalcPrice = (baseDailyPrice, pilotRate, issueDays, aerolinkRate, operatorDiscount) =>
	baseDailyPrice * pilotRate * issueDays * aerolinkRate * operatorDiscount

export const getPilotPayment = (baseDailyPrice, pilotRate, issueDays) =>
	baseDailyPrice * pilotRate * issueDays

// getStyle
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/

const camelCase = name =>
	name.replace(SPECIAL_CHARS_REGEXP, ((_, separator, letter, offset) =>
		offset ? letter.toUpperCase() : letter
	).replace(MOZ_HACK_REGEXP, 'Moz$1'))

export const getStyle = (element, styleName) => {
	if (!element || !styleName) return null
	styleName = camelCase(styleName)
	if (styleName === 'float') {
		styleName = 'cssFloat'
	}
	try {
		const computed = document.defaultView.getComputedStyle(element, '')
		return element.style[styleName] || computed ? computed[styleName] : null
	} catch (e) {
		return element.style[styleName]
	}
}
