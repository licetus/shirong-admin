<template>
	<section>
		<Row>
			<Col :span="16" class="padding-right-5">
				<Card>
					<p slot="title">借款人信息</p>
					<Form ref="profileForm" :model="debtor.profile.form" :rules="debtor.profile.rules" label-position="left" :label-width="debtor.profile.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="姓名"></FormItem></Col>
							<Col :span="8"><FormItem label="性别"></FormItem></Col>
							<Col :span="8"><FormItem label="出生日期"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="是否有车"></FormItem></Col>
							<Col :span="8"><FormItem label="联系方式"></FormItem></Col>
							<Col :span="8"><FormItem label="联系方式II"></FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">实名信息</p>
					<Form ref="identifyForm" :model="debtor.identify.form" :rules="debtor.identify.rules" label-position="left" :label-width="debtor.identify.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="身份证号码"></FormItem></Col>
							<Col :span="12"><FormItem label="户籍所在地"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证正面">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="正面模糊">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证背面">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="背面模糊">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">信用信息</p>
					<Form ref="creditForm" :model="debtor.credit.form" :rules="debtor.credit.rules" label-position="left" :label-width="debtor.credit.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="工作地点"></FormItem></Col>
							<Col :span="8"><FormItem label="常住地址"></FormItem></Col>
							<Col :span="8"><FormItem label="学历状况"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="月稳定收入"></FormItem></Col>
							<Col :span="8"><FormItem label="年稳定收入"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="车产认证"></FormItem></Col>
							<Col :span="8"><FormItem label="房产认证"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="申请次数"></FormItem></Col>
							<Col :span="8"><FormItem label="成功次数"></FormItem></Col>
							<Col :span="8"><FormItem label="还清次数"></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="逾期次数"></FormItem></Col>
							<Col :span="8"><FormItem label="严重逾期次数"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-5">
				<Card>
					<p slot="title">控制台</p>
					<Row>
						<Col :span="4">
							<Button long>取消</Button>
						</Col>
						<Col :span="4" :offset="1">
							<Button type="primary" long>提交</Button>
						</Col>
					</Row>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">贷款查看</p>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">账户管理</p>
					<!-- <Table :data="investmentRecord.data" :columns="investmentRecord.columns"></Table> -->
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import { Debtor } from '../../models/data'

export default {
	name: 'debtors_new',
	data() {
		const blank = {
			debtor: new Debtor(),
		}
		return {
			debtor: {
				profile: {
					labelWidth: 75,
					form: {
						realName: blank.debtor.realName,
						gender: blank.debtor.gender,
						birthday: blank.debtor.birthday,
						isCarOwner: blank.debtor.isCarOwner,
						primaryNumber: blank.debtor.primaryNumber,
						alternativeNumber: blank.debtor.alternativeNumber,
					},
					rules: {},
				},
				identify: {
					labelWidth: 75,
					form: {
						idNumber: blank.debtor.idNumber,
						location: blank.debtor.location,
						frontImageUrl: blank.debtor.frontImageUrl,
						frontBlurImageUrl: blank.debtor.frontBlurImageUrl,
						backImageUrl: blank.debtor.backImageUrl,
						backBlurImageUrl: blank.debtor.backBlurImaegUrl,
					},
				},
				credit: {
					labelWidth: 100,
					form: {
						workPlace: blank.debtor.workPlace,
						address: blank.debtor.address,
						education: blank.debtor.education,
						monthlyStableIncome: blank.debtor.monthlyStableIncome,
						yearlyStableIncome: blank.debtor.yearlyStableIncome,
						hasCar: blank.debtor.hasCar,
						hasHouse: blank.debtor.hasHouse,
					},
				},
			},
		}
	},
	mounted() {
	},
	methods: {
		onClickImage() {
			console.log('upload img')
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
</style>
