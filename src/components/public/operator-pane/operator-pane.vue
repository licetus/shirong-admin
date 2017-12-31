<template>
	<section id="operator-pane">
		<div class='operator-pane-title' v-if="title">
			<h2>{{title}}</h2>
		</div>
		<Card class="operator-pane-body" :padding="30" :bordered="false" dis-hover>
			<Row type="flex" justify="space-between">
				<Col :span="11">
					<InfoCard :title="$t('messages.Operator.Pane.General.Title')">
						<Form :model="operator.general" label-position="left" :label-width="labelWidth.left">
							<FormItem :label="$t('messages.Operator.Pane.General.Avatar')" prop="avatarUrl">
								<p><ImageControl :src="generateImgUrl(operator.general.avatarUrl)" :default="avatarPlaceholder"></ImageControl></p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.Company')" prop="company">
								<p>{{operator.general.company}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.Nickname')" prop="nickname">
								<p>{{operator.general.nickname}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.OperatorId')" prop="id">
								<p>{{operator.general.id}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.ContactPerson')" prop="contactPerson">
								<p>{{operator.general.contactPerson}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.ContactEmail')" prop="contactEmail">
								<p>{{operator.general.contactEmail}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.ContactNumber')" prop="contactNumber">
								<p>{{operator.general.contactNumber}}</p>
							</FormItem>
							<FormItem :label="$t('messages.Operator.Pane.General.BusinessAddress')" prop="businessAddress">
								<p>{{operator.general.businessAddress}}</p>
							</FormItem>
						</Form>
					</InfoCard>
				</Col>
				<Col :span="11">
					<InfoCard :title="$t('messages.Operator.Pane.Discount.Title')">
						<Form :model="operator.discount" label-position="left" :label-width="labelWidth.right">
							<FormItem :label="$t('messages.Operator.Pane.Discount.Discount')" prop="operatorDiscount">
								<p>{{discountRate}}</p>
							</FormItem>
						</Form>
					</InfoCard>
					<InfoCard :title="$t('messages.Operator.Pane.Type.Title')">
						<Form :model="operator.operatorType" label-position="left" :label-width="labelWidth.right">
							<FormItem :label="$t('messages.Operator.Pane.Type.Type')" prop="operatorType">
								<p>{{$t(`messages.Operator.OperatorType.${getOperatorType(operator.operatorType.operatorType)}`)}}</p>
							</FormItem>
						</Form>
					</InfoCard>
					<InfoCard :title="$t('messages.Operator.Pane.Remark.Title')">
						<Form :model="operator.remark" label-position="left" :label-width="labelWidth.right">
							<FormItem :label="$t('messages.Operator.Pane.Remark.Remark')" prop="remark">
								<p>{{operator.remark.remark}}</p>
							</FormItem>
						</Form>
					</InfoCard>
				</Col>
			</Row>
		</Card>
	</section>
</template>

<script>
import avatarPlaceholder from '../../../assets/imgs/operator-profile-placeholder.png'
import { generateImgUrl, getOperatorType, formatRate } from '../../../utils'

export default {
	name: 'operator-pane',
	props: {
		title: String,
		operator: {
			general: {
				id: Number,
				avatarUrl: String,
				company: String,
				nickname: String,
				contactPerson: String,
				contactEmail: String,
				contactNumber: String,
				businessAddress: String,
			},
			discount: {
				operatorDiscount: Number,
			},
			operatorType: {
				operatorType: Number,
				// operatorType: Number,
			},
			remark: {
				remark: String,
			},
		},
	},
	data() {
		return {
			labelWidth: {
				left: 150,
				right: 150,
			},
			avatarPlaceholder,
		}
	},
	computed: {
		discountRate() {
			if (this.operator.discount.operatorDiscount === 1) return '-'
			return `- ${formatRate(1 - this.operator.discount.operatorDiscount)}`
		},
	},
	methods: {
		generateImgUrl(url) {
			return generateImgUrl(url)
		},
		getOperatorType(type) {
			return getOperatorType(type)
		},
	},
}
</script>

<style>
#operator-pane {
	margin-bottom: 30px;
}
</style>
