<template>
	<section>
		<Row>
			<Col :span="8" class="padding-right-5">
				<Card>
					<p slot="title">借款人</p>
					<div slot="extra">
						<div v-if="!isPaneVisible">
							<Button type="text" @click="onClickResetDebtor">重置</Button>
							<Button type="text" @click="onClickSubmitDebtor" :loading="debtor.isSubmitting">提交</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickRefreshDebtor" :loading="debtor.isLoading">刷新</Button>
						</div>
					</div>
					<Form ref="debtorForm" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="24"><FormItem label="借款人姓名">
								<p v-if="!debtor.isEditable">{{debtor.data.realName || '-'}}</p>
								<Input v-else v-model="debtor.form.realName"/>
							</FormItem></Col>
							<Col :span="24"><FormItem label="借款人手机">
								<p v-if="!debtor.isEditable">{{debtor.data.primaryNumber || '-'}}</p>
								<Input v-else v-model="debtor.form.primaryNumber"/>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
			<Col :span="16" class="padding-left-5">
				<Card v-if="isPaneVisible">
					<p slot="title">借款人信息</p>
					<Form :model="debtor.data" label-position="left" :label-width="debtor.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="姓名">
								<p>{{debtor.data.realName || '-'}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="性别">
								<p>{{debtorGender}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="年龄">
								<p>{{debtorAge}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="身份认证"></FormItem></Col>
							<Col :span="16"><FormItem label="备注"></FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :span="16" class="padding-right-5">
				<Card v-if="isPaneVisible">
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
				<Card v-if="isPaneVisible">
					<p slot="title">放款账户</p>
						<Form ref="" :model="debtor.form" :rules="debtor.rules" label-position="left" :label-width="debtor.labelWidth" inline>
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
				<Card v-if="isCarPaneVisible">
					<p slot="title">车辆详情</p>
					<Form ref="carForm" :model="loan.sub.car.form" :rules="loan.sub.car.rules" label-position="left" :label-width="loan.sub.car.labelWidth" inline>
						<Row>
							<Col :span="6"><FormItem label="品牌型号"></FormItem></Col>
							<Col :span="6"><FormItem label="购买价格"></FormItem></Col>
							<Col :span="6"><FormItem label="行驶里程"></FormItem></Col>
							<Col :span="6"><FormItem label="评估价格"></FormItem></Col>
						</Row>
						<Row class="margin-top-20">
							<Col :span="12"><FormItem label="车辆行驶证">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="车辆检验证">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="正面照片">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="背面照片">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="里程照片">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="内饰照片">
								<Row type="flex" justify="center"><Col :span="12"><Button type="text" @click="onClickImage"><SafeImg src="" type="upload-img"></SafeImg></Button></Col></Row>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import { Debtor, Loan } from '../../models/data'
import Enum from '../../models/enum'
import api from '../../libs/api'

export default {
	name: 'loans_new',
	data() {
		const blank = {
			debtor: new Debtor(),
			Loan: new Loan(),
		}
		return {
			debtor: {
				data: blank.debtor,
				isEditable: true,
				isSubmitting: false,
				isLoading: false,
				labelWidth: 75,
				form: {
					realName: blank.debtor.realName,
					primaryNumber: blank.debtor.primaryNumber,
				},
				rules: {},
			},
			loan: {
				data: blank.loan,
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
	},
	computed: {
		isPaneVisible() {
			return this.debtor.data.id
		},
		isCarPaneVisible() {
			return (this.debtor.id && this.loan.form.type === Enum.Loan.Type.Car)
		},
		debtorGender() {
			if (this.debtor.data.gender) return util.getGender(this.debtor.data.gender, this)
			return '-'
		},
		debtorAge() {
			if (this.debtor.data.birthday) return util.getAge(this.debtor.data.birthday, this)
			return '-'
		}
	},
	methods: {
		// debtor
		debtorSubmitting() {
			this.debtor.isSubmitting = true
		},
		debtorUnsubmitting() {
			this.debtor.isSubmitting = false
		},
		debtorLoading() {
			this.debtor.isLoading = true
		},
		debtorUnLoading() {
			this.debtor.isLoading = false
		},
		initDebtor() {
			this.debtor.form = {
				realName: blank.debtor.realName,
				primaryNumber: blank.debtor.primaryNumber,
			}
		},
		onClickResetDebtor() {
			this.initDebtor()
		},
		onClickSubmitDebtor() {
			// this.$refs.debtorForm.validate((valid) => {
			// 	console.log('here')
			// 	if (valid) {
			// 	}
			// })
			const debtor = {
				realName: this.debtor.form.realName,
				primaryNumber: this.debtor.form.primaryNumber
			}
			this.debtorSubmitting()
			this.submitDebtor(debtor)
		},
		onClickRefreshDebtor() {
			this.debtorLoading()
			this.fetchDebtor()
		},
		async submitDebtor(debtor) {
			try {
				const res = await api.debtor.profile.add(debtor)
				this.debtor.data.id = res
				this.debtorUnsubmitting()
				this.$Message.success('创建借款人成功, 即将打开详情页，请补全信息')
				this.$router.push({
					name: 'debtor_detail',
					params: {
						debtor_id: res,
					},
				})
			} catch(e) {
				this.debtorUnsubmitting()
				console.log(e)
				if (e.code === 'ACCOUNT_EXIST_ERROR') {
					this.$Message.info('正在搜索借款人信息')
					this.debtorUnsubmitting()
					this.matchDebtor(this.debtor.form.primaryNumber)
				}
				else {
					this.$Message.error(e.message)
				}
			}
		},
		async fetchDebtor() {
			try {
				const id = this.debtor.data.id
				const profileRes = await api.debtor.profile.fetch(id)
				// const identifyRes = await api.debtor.identify.fetch(id)
				const debtor = {
					id,
					realName: profileRes.realName,
					gender: profileRes.gender,
					birthday: profileRes.birthday,
					remark: profileRes.remark,
					// idNumber: identifyRes.idNumber,
					// location: identifyRes.location,
					// frontImageUrl: identifyRes.frontBlurImageUrl,
					// backImageUrl: identifyRes.backBlurImaegUrl,
				}
				this.debtor.data = debtor
				this.debtorUnLoading()
			} catch (e) {
				this.debtorUnLoading()
				this.$Message.error(e.message)
			}
		},
		async matchDebtor(number) { // TODO async function, get debtor list, match primaryNumber
			try {
				const query = {
					pagesize: 1,
					page: 0,
					filters: `primaryNumber='${number}'`,
					orderBy: '',
				}
				const res = await api.debtor.fetchList(
					query.pagesize,
					query.page,
					query.filters,
					query.orderBy,
				)
				if (res.length < 1) this.$Message.info('无匹配结果，请重试')
				else {
					this.debtor.data.id = res[0].id
					this.debtor.form.realName = res[0].realName
					this.debtor.form.primaryNumber = res[0].primaryNumber
					this.$Message.info('匹配成功，正在获取数据')
					this.debtorLoading()
					this.fetchDebtor()
				}
				this.debtorUnsubmitting()
			} catch (e) {
				this.debtorUnsubmitting()
				this.$Message.error(e.meaage)
			}
		},

		onClickImage() {
			console.log('upload img')
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
</style>
