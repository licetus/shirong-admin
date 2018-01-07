<template>
	<h1>loan-verification</h1>
</template>

<script>
import util from '../../libs/util'

export default {
	name: 'loans_verification',
	data() {
		return {

		}
	},
	activated() {
		this.currentRoute = this.$route
		console.log(this.currentRoute.name)
		console.log('befor: ', util.getPageCache(this.$route))
		const a = 123456
		const b = 'abced'
		util.setPageCache(this.$route, 'a', a)
		util.setPageCache(this.$route, 'b', b)
		console.log('after: ', util.getPageCache(this.$route))
	},
	deactivated() {
		util.removePageCache(this.currentRoute)
	},
}
</script>

<style lang="less">
</style>
