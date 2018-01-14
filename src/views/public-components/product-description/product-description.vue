<template>
	<p v-if="!type || !debtorName || !object || !location">资料待补充...</p>
	<p v-else>
		<span>{{`该项目为${typeMapping[type]}，借款人`}}</span>
		<span style="color:red">{{debtorName[0]}}</span>
		<span v-for="item of (debtorName.length -1)">*</span>
		<span>{{`信用良好，还款正常。还款来源为其个人收入，借款目的为个人资金周转，借款人以名下${assetTypeMapping[type]}（`}}</span>
		<span style="color:red">{{object}}</span>
		<span>）为抵押物，资金有保障。借款人户籍所在地位于</span>
		<span style="color:red">{{location}}。</span>
	</p>
</template>

<script>
export default {
	name: 'simple-tag',
	props: {
		type: Number,
		debtorName: String,
		object: String,
		location: String,
	},
	data() {
		return {
			typeMapping: ['', '其他抵押项目', '车辆抵押续标'],
			assetTypeMapping: ['', '其他', '车辆'],
		}
	},
	watch: {
	},
	computed: {
	},
	methods: {
	},
}
</script>

<style lang="less">
</style>
