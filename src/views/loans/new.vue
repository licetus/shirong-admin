<template>
	<section>
		<Row>
			<Col :span="8" class="padding-right-5">
				<Card>
					<p slot="title">借款人</p>
						<Form ref="debtorForm" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="借款人姓名"></FormItem></Col>
							<Col :span="24"><FormItem label="借款人手机"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="16" class="padding-left-5">
				<Card>
					<p slot="title">借款人信息</p>
					<Form ref="debtorForm" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="姓名"></FormItem></Col>
							<Col :span="8"><FormItem label="性别"></FormItem></Col>
							<Col :span="8"><FormItem label="年龄"></FormItem></Col>
							<Col :span="8"><FormItem label="是否有车"></FormItem></Col>
							<Col :span="8"><FormItem label="身份认证"></FormItem></Col>
							<Col :span="8"><FormItem label="信用等级"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :span="16" class="padding-right-5">
				<Card>
					<p slot="title">贷款信息</p>
					<Form ref="loanForm" :model="loan.form" :rules="loan.rules" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="贷款类型"></FormItem></Col>
							<Col :span="8"><FormItem label="贷款金额"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="贷款期限"></FormItem></Col>
							<Col :span="8"><FormItem label="贷款利率"></FormItem></Col>
							<Col :span="8"><FormItem label="还款方式"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="备注信息"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-5">
				<Card>
					<p slot="title">放款账户</p>
						<Form ref="debtorForm" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="开户人姓名"></FormItem></Col>
							<Col :span="24"><FormItem label="开户行名称"></FormItem></Col>
							<Col :span="24"><FormItem label="银行卡号"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :span="24">
				<Card>
					<p slot="title">车辆详情</p>
					<Form ref="carForm" :model="loan.sub.car.form" :rules="loan.sub.car.rules" label-position="left" :label-width="loan.sub.car.labelWidth" inline>
						<Row>
							<Col :span="6"><FormItem label="品牌型号"></FormItem></Col>
							<Col :span="6"><FormItem label="购买价格"></FormItem></Col>
							<Col :span="6"><FormItem label="行驶里程"></FormItem></Col>
							<Col :span="6"><FormItem label="评估价格"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="车辆行驶证"></FormItem></Col>
							<Col :span="12"><FormItem label="车辆检验证"></FormItem></Col>
							<Col :span="12"><FormItem label="正面照片"></FormItem></Col>
							<Col :span="12"><FormItem label="背面照片"></FormItem></Col>
							<Col :span="12"><FormItem label="里程照片"></FormItem></Col>
							<Col :span="12"><FormItem label="内饰照片"></FormItem></Col>
						</Row>
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
			loan: {
				labelWidth: 75,
				form: {},
				rules: {},
				sub: {
					car: {
						labelWidth: 75,
						form: {},
						rules: {},
					},
				},
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
