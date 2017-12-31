<template>
	<section id="operator-detail">
		<Row class-name="pane">
			<Spin v-if="isLoading" size="large" fix></Spin>
			<Col class-name="pane-main" :span="18">
				<OperatorPane :operator="operator"></OperatorPane>
			</Col>
			<Col class-name="pane-sub" :span="6">
				<ActionCard>
					<div slot="body">
						<div><Button type="text" @click="onClickModifyOperator">{{$t('messages.Operator.Button.Modify')}}</Button></div>
					</div>
					<div slot="footer">
						<Button type="error" @click="onClickDeleteOperator">{{$t('messages.Operator.Button.Delete')}}</Button>
					</div>
				</ActionCard>
			</Col>
		</Row>

	</section>
</template>

<script>
import Bus from '../../bus'
import * as Api from '../../api'
import { errorHandler } from '../../utils'

export default {
	data() {
		return {
			isLoading: false,
			buttonLoading: false,
			operator: {
				general: {
					id: null,
					avatarUrl: '',
					company: '',
					nickname: '',
					contactPerson: '',
					contactEmail: '',
					contactNumber: '',
					businessAddress: '',
				},
				discount: {
					operatorDiscount: 0,
				},
				operatorType: {
					operatorType: 1,
					// operatorType: 1,
				},
				remark: {
					remark: '',
				},
			},
		}
	},
	mounted() {
		this.initPage()
	},
	methods: {
		onClickModifyOperator() {
			this.buttonLoading = true
			this.modifyOperator()
			this.buttonLoading = false
		},
		onClickDeleteOperator() {
		},

		modifyOperator() {
			const id = this.$route.params.operatorId
			const path = `/operators/${id}/modify`
			this.$router.push(path)
		},

		async fetchOperatorDetail(operatorId) {
			try {
				this.isLoading = true
				const operatorRes = await Api.fetchOperatorDetail(operatorId)
				const operator = {
					general: {
						id: operatorRes.id || null,
						avatarUrl: operatorRes.avatarUrl || '',
						company: operatorRes.company || '-',
						nickname: operatorRes.nickname || '-',
						contactPerson: operatorRes.contactPerson || '-',
						contactEmail: operatorRes.contactEmail || '-',
						contactNumber: operatorRes.contactNumber || '-',
						businessAddress: operatorRes.businessAddress || '-',
					},
					discount: {
						operatorDiscount: operatorRes.discountRate || 1,
					},
					operatorType: {
						operatorType: operatorRes.type || 1,
					},
					remark: {
						remark: operatorRes.remark || '',
					},
				}
				this.operator = operator
				this.generateBreadcrumb()
				this.isLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isLoading = false
			}
		},
		generateBreadcrumb() {
			const operatorId = this.$route.params.operatorId
			this.breadcrumbs = [
				{ name: this.$t('messages.Operator.Breadcrumb'), path: '/operators' },
				{ name: `${this.operator.general.nickname}`, path: `/operators/${operatorId}` },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchOperatorDetail(this.$route.params.operatorId)
		},
	},
}
</script>

<style>
#operator-detail {
	height: 100%;
}
#operator-detail .pane {
	height: 100%;
	min-height: 100%;
	margin-bottom: 20px;
}
#operator-detail .pane-main {
	min-height: 100%;
}
#operator-detail .pane-sub {
	padding: 0 50px;
}

</style>
