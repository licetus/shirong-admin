import { createAuthInstance } from './general'
import { generateQueryString } from '../utils'

export const fetchPilotList = async (pagesize, page, filters, orderBy) => {
	const query = {
		pagesize,
		page,
		filters,
		orderBy,
	}
	const str = generateQueryString(query)
	return createAuthInstance().get(`admin/pilot?${str}`).then(res => res.data)
}

export const addPilot = async params =>
	createAuthInstance().post('admin/pilot', params).then(res => res.data)

export const fetchPilotDetail = async id =>
	createAuthInstance().get(`admin/pilot/${id}`).then(res => res.data)

export const patchPilot = async (id, params) =>
	createAuthInstance().patch(`admin/pilot/${id}`, params).then(res => res.data)

export const putPilotVerification = async (id, isVerified) =>
	createAuthInstance().put(`admin/pilot/${id}/verify?isVerified=${isVerified}`).then(res => res.data)

// employment history
export const fetchEmploymentHistoryList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/employmentHistory`).then(res => res.data)
export const addEmploymentHistory = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/employmentHistory`, params).then(res => res.data)
export const deleteEmploymentHistory = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/employmentHistory/${id}`).then(res => res.data)
export const patchEmploymentHistory = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/employmentHistory/${id}`, params)
export const fetchPilotEmploymentHistory = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/employmentHistory/${id}`).then(res => res.data)

// license
export const fetchLicenseList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/license`).then(res => res.data)
export const addLicense = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/license`, params).then(res => res.data)
export const deleteLicense = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/license/${id}`).then(res => res.data)
export const patchLicense = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/license/${id}`, params)
export const fetchPilotLicense = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/license/${id}`).then(res => res.data)

// aircraft
export const fetchAircraftList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/licenseAircraft`).then(res => res.data)
export const addAircraft = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/licenseAircraft`, params).then(res => res.data)
export const deleteAircraft = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/licenseAircraft/${id}`).then(res => res.data)
export const patchAircraft = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/licenseAircraft/${id}`, params)
export const fetchPilotAircraft = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/licenseAircraft/${id}`).then(res => res.data)

// passport
export const fetchPassportList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/passport`).then(res => res.data)
export const addPassport = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/passport`, params).then(res => res.data)
export const deletePassport = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/passport/${id}`).then(res => res.data)
export const patchPassport = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/passport/${id}`, params)
export const fetchPilotPassport = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/passport/${id}`).then(res => res.data)

// visa
export const fetchVisaList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/visa`).then(res => res.data)
export const addVisa = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/visa`, params).then(res => res.data)
export const deleteVisa = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/visa/${id}`).then(res => res.data)
export const patchVisa = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/visa/${id}`, params)
export const fetchPilotVisa = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/visa/${id}`).then(res => res.data)

// flightExp
export const fetchFlightExpList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/flighthours`).then(res => res.data)
export const addFlightExp = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/flightHours`, params).then(res => res.data)
export const deleteFlightExp = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/flightHours/${id}`).then(res => res.data)
export const patchFlightExp = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/flightHours/${id}`, params)
export const fetchPilotFlightExp = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/flightHours/${id}`).then(res => res.data)

// document
export const fetchDocumentList = async pilotId =>
	createAuthInstance().get(`admin/pilot/${pilotId}/document`).then(res => res.data)
export const addDocument = async (pilotId, params) =>
	createAuthInstance().post(`admin/pilot/${pilotId}/document`, params).then(res => res.data)
export const deleteDocument = async (pilotId, id) =>
	createAuthInstance().delete(`admin/pilot/${pilotId}/document/${id}`).then(res => res.data)
export const patchDocument = async (pilotId, id, params) =>
	createAuthInstance().patch(`admin/pilot/${pilotId}/document/${id}`, params)
export const fetchPilotDocument = async (pilotId, id) =>
	createAuthInstance().get(`admin/pilot/${pilotId}/document/${id}`).then(res => res.data)

// availability
