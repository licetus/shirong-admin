<template>
	<section id="operator-modify">
		<Row class-name="pane">
			<Spin v-if="isPageLoading" size="large" fix></Spin>
			<Col class-name="pane-main" :span="18">
				<Card class="operator-pane-body" :padding="30" :bordered="false" dis-hover>
					<Row type="flex" justify="space-between">
						<Col :span="11">
							<InfoCard :title="$t('messages.Operator.Pane.General.Title')">
								<Form ref="generalForm" :rules="formRules.general" :model="operator.general" label-position="left" :label-width="labelWidth.left">
									<FormItem :label="$t('messages.Operator.Pane.General.Avatar')" prop="avatarUrl">
										<p><ImageControl :src="generateImgUrl(operator.general.avatarUrl)" :default="avatarPlaceholder"></ImageControl></p>
										<p><ImgUploader :buttonText="$t('messages.Operator.Pane.General.Button.ChangeAvatar')" :imgUrl="operator.general.avatarUrl" :defaultUrl="avatarPlaceholder" @on-upload="onUploadAvatar"></ImgUploader></p>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.Company')" prop="company">
										<Input v-model="operator.general.company" type="textarea" autosize></Input>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.Nickname')" prop="nickname">
										<Input v-model="operator.general.nickname"></Input>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.OperatorId')" prop="id">
										<p>{{operator.general.id}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.ContactPerson')" prop="contactPerson">
										<Input v-model="operator.general.contactPerson"></Input>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.ContactEmail')" prop="contactEmail">
										<Input v-model="operator.general.contactEmail"></Input>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.ContactNumber')" prop="contactNumber">
										<Input v-model="operator.general.contactNumber"></Input>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.General.BusinessAddress')" prop="businessAddress">
										<Input v-model="operator.general.businessAddress" type="textarea" autosize></Input>
									</FormItem>
								</Form>
							</InfoCard>
						</Col>
						<Col :span="11">
							<InfoCard :title="$t('messages.Operator.Pane.Discount.Title')">
								<Form ref="discountRateForm" :rules="formRules.discount" :model="operator.discount" label-position="left" :label-width="labelWidth.right">
									<FormItem :label="$t('messages.Operator.Pane.Discount.Discount')">
										<p>{{discountRate}}</p>
									</FormItem>
									<FormItem :label="$t('messages.Operator.Pane.Discount.Rate')" prop="operatorDiscount">
										<InputNumber v-model="operator.discount.operatorDiscount" :min="discountRateConfig.min" :max="discountRateConfig.max" :step="discountRateConfig.step"></InputNumber>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Operator.Pane.Type.Title')">
								<Form ref="operatorTypeForm" :rules="formRules.type" :model="operator.operatorType" label-position="left" :label-width="labelWidth.right">
									<FormItem :label="$t('messages.Operator.Pane.Type.Type')" prop="operatorType">
										<Select v-model="operator.operatorType.operatorType">
											<Option :value="Enum.OperatorType.Smb" :label="$t(`messages.Operator.OperatorType.${getOperatorType(Enum.OperatorType.Smb)}`)"></Option>
											<Option :value="Enum.OperatorType.Premium" :label="$t(`messages.Operator.OperatorType.${getOperatorType(Enum.OperatorType.Premium)}`)"></Option>
										</Select>
									</FormItem>
								</Form>
							</InfoCard>
							<InfoCard :title="$t('messages.Operator.Pane.Remark.Title')">
								<Form ref="remarkForm" :rules="formRules.remark" :model="operator.remark" label-position="left" :label-width="labelWidth.left">
									<FormItem :label="$t('messages.Operator.Pane.Remark.Remark')" prop="remark">
										<Input v-model="operator.remark.remark" type="textarea" autosize></Input>
									</FormItem>
								</Form>
							</InfoCard>
						</Col>
					</Row>
				</Card>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard modify>
					<div slot="footer">
						<Button type="primary" @click="onClickSave" :loading="isSaveLoading">{{$t('messages.Public.Button.Save')}}</Button>
						<Button @click="onClickCancel">{{$t('messages.Public.Button.Cancel')}}</Button>
					</div>
				</ActionCard>
			</Col>
		</Row>

	</section>
</template>

<script>
import avatarPlaceholder from '../../assets/imgs/operator-profile-placeholder.png'
import Bus from '../../bus'
import * as Api from '../../api'
import { errorHandler, generateImgUrl, getOperatorType, formatRate } from '../../utils'
import { Enum } from '../../models'
import config from '../../config/config'

export default {
	data() {
		return {
			isPageLoading: false,
			isSaveLoading: false,
			labelWidth: {
				left: 150,
				right: 150,
			},
			Enum,
			discountRateConfig: config.rate.operator.discountRate,
			avatarPlaceholder,
			operator: {
				general: {
					id: null,
					avatarUrl: '',
					nickname: '',
					contactPerson: '',
					contactEmail: '',
					contactNumber: '',
					company: '',
					businessAddress: '',
				},
				discount: {
					operatorDiscount: 1,
				},
				operatorType: {
					operatorType: 1,
				},
				remark: {
					remark: '',
				},
			},
			formRules: {
				general: {
					avatarUrl: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.Avatar'), trigger: 'change' }],
					nickname: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.Nickname'), trigger: 'blur' }],
					contactPerson: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.ContactPerson'), trigger: 'blur' }],
					contactEmail: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.ContactEmail'), trigger: 'blur' }],
					contactNumber: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.ContactNumber'), trigger: 'blur' }],
					company: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.Company'), trigger: 'blur' }],
					business: [{ type: 'string', required: false, message: this.$t('messages.Operator.Pane.General.Validator.Requirement.BusinessAddress'), trigger: 'blur' }],
				},
				discount: {
					operatorDiscount: [
						{ type: 'number', required: true, message: this.$t('messages.Operator.Pane.Discount.Validator.Requirement.Rate'), trigger: 'change' },
						{ type: 'number', min: config.rate.operator.discountRate.min, max: config.rate.operator.discountRate.max, message: this.$t('messages.Operator.Pane.Discount.Validator.Rate'), trigger: 'change' },
					],
				},
				type: {
					operatorType: [{ type: 'number', required: false, message: this.$t('messages.Operator.Pane.Type.Validator.Requirement.Type'), trigger: 'change' }],
				},
				remark: {
					remark: [{ type: 'string', required: false, max: config.remarkLength.operator, message: `${this.$t('messages.Operator.Pane.Remark.Validator.Remark.Length')} ${config.remarkLength.operator} ${this.$t('messages.Operator.Pane.Remark.Validator.Remark.Characters')}`, trigger: 'change' }],
				},
			},
		}
	},
	created() {
	},
	mounted() {
		this.initPage()
	},
	computed: {
		discountRate() {
			if (this.operator.discount.operatorDiscount === 1) return '-'
			return `- ${formatRate(1 - this.operator.discount.operatorDiscount)}`
		},
	},
	methods: {
		onClickSave() {
			let general
			let discount
			let type
			let remark
			this.$refs.generalForm.validate((valid) => { general = valid })
			this.$refs.discountRateForm.validate((valid) => { discount = valid })
			this.$refs.operatorTypeForm.validate((valid) => { type = valid })
			this.$refs.remarkForm.validate((valid) => { remark = valid })
			if (general && discount && type && remark) {
				this.patchOperator()
			}
		},
		onClickCancel() {
			this.backToView()
		},
		onUploadAvatar(url) {
			this.operator.general.avatarUrl = url
		},
		generateImgUrl(url) {
			return generateImgUrl(url)
		},
		getOperatorType(type) {
			return getOperatorType(type)
		},
		formatRate(rate) {
			return formatRate(rate)
		},

		async fetchOperatorDetail() {
			try {
				this.isPageLoading = true
				const operatorId = this.$route.params.operatorId
				const operatorRes = await Api.fetchOperatorDetail(operatorId)
				const operator = {
					general: {
						id: operatorRes.id,
						avatarUrl: operatorRes.avatarUrl,
						company: operatorRes.company,
						nickname: operatorRes.nickname,
						contactPerson: operatorRes.contactPerson,
						contactEmail: operatorRes.contactEmail,
						contactNumber: operatorRes.contactNumber,
						businessAddress: operatorRes.businessAddress,
					},
					discount: {
						operatorDiscount: operatorRes.discountRate,
					},
					operatorType: {
						operatorType: operatorRes.type,
					},
					remark: {
						remark: operatorRes.remark,
					},
				}
				this.operator = operator
				this.generateBreadcrumb()
				this.isPageLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPageLoading = false
			}
		},
		async patchOperator() {
			try {
				this.isSaveLoading = true
				const id = this.$route.params.operatorId
				const operator = {
					avatarUrl: this.operator.general.avatarUrl,
					nickname: this.operator.general.nickname,
					company: this.operator.general.company,
					contactPerson: this.operator.general.contactPerson,
					contactEmail: this.operator.general.contactEmail,
					contactNumber: this.operator.general.contactNumber,
					businessAddress: this.operator.general.businessAddress,
					discountRate: this.operator.discount.operatorDiscount,
					type: this.operator.operatorType.operatorType,
					remark: this.operator.remark.remark,
				}
				await Api.patchOperator(id, operator)
				this.isSaveLoading = false
				this.backToView()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isSaveLoading = false
			}
		},
		backToView() {
			this.$router.go(-1)
		},
		generateBreadcrumb() {
			const operatorId = this.$route.params.operatorId
			this.breadcrumbs = [
				{ name: this.$t('messages.Operator.Breadcrumb'), path: '/operators' },
				{ name: `${this.operator.general.nickname}`, path: `/operators/${operatorId}` },
				{ name: this.$t('messages.Operator.Pane.Modify.Breadcrumb'), path: `/operators/${operatorId}/modify` },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchOperatorDetail()
		},
	},
}
</script>

<style>
#operator-modify {
	height: 100%;
}
#operator-modify .pane {
	height: 100%;
	min-height: 100%;
	margin-bottom: 20px;
}
#operator-modify .pane-main {
	min-height: 100%;
}
#operator-modify .pane-sub {
	padding: 0 50px;
}

</style>
