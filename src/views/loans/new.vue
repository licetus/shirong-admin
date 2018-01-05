<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<p slot="title">
						借款人
					</p>
					<Form ref="debtorForm" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>

					</Form>
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
export default {
	data() {
		return {
			debtor: {
				labelWidth: 75,
				form: {},
				rules: {},
			},
		}
	},
	mounted() {
		console.log(this.$route)
	},
	methods: {},
}
</script>

<style lang="less">
</style>
