import { createAuthInstance } from './general'


export const fetchAirportList = async () =>
	createAuthInstance().get('statics/airport').then(res => res.data)

export const fetchAircraftTypeList = async () =>
	createAuthInstance().get('statics/aircraftType').then(res => res.data)

export const fetchArpList = async () =>
	createAuthInstance().get('statics/arp').then(res => res.data)

export const fetchCountryList = async () =>
	createAuthInstance().get('statics/country').then(res => res.data)
