<template>
	<section>
		<Select
			v-if="mode === 'airport'"
			ref="input"
			:value="id"
			@input="$emit('input', arguments[0])"
			:label="label"
			filterable
			label-in-value
			remote
			:remote-method="selectAirport"
			:loading="searchLoading"
			clearable
			placeholder="input here">
			<Option v-for="(item, index) of airportOptions" :value="item.id" :label="item.label" :key="index" :disabled="item.id === -1">{{item.slot}}</Option>
		</Select>
		<Select
			v-if="mode === 'aircraft'"
			ref="input"
			:value="id"
			@input="$emit('input', arguments[0])"
			:label="label"
			filterable
			label-in-value
			remote
			:remote-method="selectAircraftType"
			:loading="searchLoading"
			clearable
			placeholder="input here">
			<Option v-for="(item, index) of aircraftTypeOptions" :value="item.id" :label="item.label" :key="index" :disabled="item.id === -1">{{item.slot}}</Option>
		</Select>
		<Select
			v-if="mode === 'arp'"
			ref="input"
			:value="id"
			@input="$emit('input', arguments[0])"
			:label="label"
			filterable
			label-in-value
			remote
			:remote-method="selectArp"
			:loading="searchLoading"
			clearable
			placeholder="input here">
			<Option v-for="(item, index) of arpOptions" :value="item.id" :label="item.label" :key="index" :disabled="item.id === -1">{{item.slot}}</Option>
		</Select>
		<Select
			v-if="mode === 'country'"
			ref="input"
			:value="id"
			@input="$emit('input', arguments[0])"
			:label="label"
			filterable
			label-in-value
			remote
			:remote-method="selectCountry"
			:loading="searchLoading"
			clearable
			placeholder="input here">
			<Option v-for="(item, index) of countryOptions" :value="item.id" :label="item.label" :key="index" :disabled="item.id === -1">{{item.slot}}</Option>
		</Select>
		<Select
			v-if="mode === 'countryCode'"
			ref="input"
			:value="id"
			@input="$emit('input', arguments[0])"
			:label="label"
			filterable
			label-in-value
			remote
			:remote-method="selectCountryCode"
			:loading="searchLoading"
			clearable
			placeholder="input here">
			<Option v-for="(item, index) of countryCodeOptions" :value="item.id" :label="item.label" :key="index" :disabled="item.id === -1">{{item.slot}}</Option>
		</Select>
	</section>
</template>

<script>
import { getAirportList, getAircraftTypeList, getArpList, getCountryList, getCountryCodeList } from '../../../utils'

export default {
	name: 'basic-selector',
	props: {
		mode: String,
		label: String,
		value: {
			validator(value) {
				if (typeof value === 'number' || value === '') return true
				return false
			},
		},
	},
	data() {
		return {
			// auto complete list
			searchLoading: false,
			maxCount: 20,
			initOptions: [{ id: -1, slot: 'please input to search' }],
			airportOptions: [{ id: -1, slot: 'please input to search' }],
			aircraftTypeOptions: [{ id: -1, slot: 'please input to search' }],
			arpOptions: [{ id: -1, slot: 'please input to search' }],
			countryOptions: [{ id: -1, slot: 'please input to search' }],
			countryCodeOptions: [{ id: -1, slot: 'please input to search' }],
		}
	},
	computed: {
		id() {
			if (this.value === '' || this.value === null || !this.value) return null
			return this.value
		},
	},
	methods: {
		selectAirport(query) {
			if (query && query !== '') {
				this.searchLoading = true
				const list = getAirportList()
				this.airportOptions = this.generateOptions(list, query)
			} else this.airportOptions = this.initOptions
		},
		selectAircraftType(query) {
			if (query && query !== '') {
				this.searchLoading = true
				const list = getAircraftTypeList()
				this.aircraftTypeOptions = this.generateOptions(list, query)
			} else this.aircraftTypeOptions = this.initOptions
		},
		selectArp(query) {
			if (query && query !== '') {
				this.searchLoading = true
				const list = getArpList()
				this.arpOptions = this.generateOptions(list, query)
			} else this.arpOptions = this.initOptions
		},
		selectCountry(query) {
			if (query && query !== '') {
				this.searchLoading = true
				const list = getCountryList()
				this.countryOptions = this.generateOptions(list, query)
			} else this.countryOptions = this.initOptions
		},
		selectCountryCode(query) {
			if (query && query !== '') {
				this.searchLoading = true
				const list = getCountryCodeList()
				this.countryCodeOptions = this.generateOptions(list, query)
			} else this.countryCodeOptions = this.initOptions
		},

		generateOptions(list, query) {
			const options = []
			for (const item of list) {
				if (item.slot.toLowerCase().indexOf(query.toLowerCase()) > -1) {
					if (options.push(item) >= this.maxCount) break
				}
			}
			this.searchLoading = false
			return options
		},
	},
}
</script>

<style>
</style>
