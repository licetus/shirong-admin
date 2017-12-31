import axios from 'axios'
import config from '../config/config'

export const getLocation = async (lat, lng) =>
	axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.googleMapApiKey}`).then(res => res.data)
