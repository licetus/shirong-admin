<template>
	<section>
		<Row>
			<Col :span="12" class="padding-right-5">
				<Card>
					<Spin v-if="customer.isLoading" size="large" fix></Spin>
					<p slot="title">用户信息</p>
					<Form label-position="left" :label-width="customer.labelWidth" inline>
						<Row>
							<Col :span="12">
								<Row>
									<Col :span="24"><FormItem label="用户账号">
										<p>{{customer.data.account}}</p>
									</FormItem></Col>
									<Col :span="24"><FormItem label="Vip等级">
										<p>{{customer.data.vipLevel}}</p>
									</FormItem></Col>
								</Row>
								<Row>
									<Col :span="24"><FormItem label="用户姓名">
										<p>{{customer.data.realName}}</p>
									</FormItem></Col>
									<Col :span="24"><FormItem label="身份号码">
										<p>{{customer.data.idCardNumber}}</p>
									</FormItem></Col>
								</Row>
							</Col>
							<Col :span="12">
								<Row>
									<Col :span="16"><FormItem label="用户头像">
										<SafeImg :src="customer.data.avatarUrl" type="avatarMd"></SafeImg>
									</FormItem></Col>
								</Row>
							</Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="备注">
								<p>{{customer.data.remark}}</p>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">资产状况</p>
				</Card>
			</Col>
			<Col :span="12" class="padding-left-5">
				<Card>
					<p slot="title">投资记录</p>
					<Table :data="investments.data" :columns="investments.columns" :loading="investments.list.isLoading"></Table>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">账户管理</p>
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import { Customer } from '../../models/data'
import util from '../../libs/util'
import api from '../../libs/api'

export default {
	name: 'debtor_detail',
	data() {
		const blank = {
			customer: new Customer(),
		}
		return {
			customer: {
				isLoading: false,
				labelWidth: 75,
				data: blank.customer,
			},
			investments: {
				list: {
					isLoading: false,
					pagesize: 10,
					page: 0,
					filters: '',
					orderBy: '',
				},
				data: [],
				columns: [
					{
						name: 'productName',
						title: '项目名称',
						key: 'productName', // TODO should be productName
					},
					{
						name: 'amount',
						title: '金额',
						key: 'amount',
						align: 'center',
					},
					{
						name: 'productStatus',
						title: '当前状态',
						key: 'productStatus',
						align: 'center',
						render: (h, params) => h('p', `${util.getProductStatus(this, params.row.productStatus) || '-'}`),
					},
					{
						name: 'createTime',
						title: '投资时间',
						key: 'createTime',
						align: 'center',
						render: (h, params) => h('p', {
							style: 'word-break:keep-all',
						}, `${util.formatTime(this, params.row.createTime) || '-'}`),
					},
				],
			},
		}
	},
	mounted() {
		util.setPageCache(this.$route.name, 'path', this.$route.fullPath)
		this.initPage()
	},
	activated() {
		const { path } = util.getPageCache(this.$route.name)
		if (!path || this.$route.fullPath !== path) {
			this.initPage()
		}
	},
	computed: {
	},
	methods: {
		// main
		initPage() {
			this.loadCustomer()
			this.loadInvestments()
		},

		// customer
		customerLoading() {
			this.customer.isLoading = true
		},
		customerUnloading() {
			this.customer.isLoading = false
		},
		loadCustomer() {
			this.customerLoading()
			this.fetchCustomer()
		},
		async fetchCustomer() {
			try {
				const res = await api.customer.fetch(this.$route.params.customer_id)
				this.customer.data = res
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.customerUnloading()
			}
		},

		// investment
		investmentsLoading() {
			this.investments.list.isLoading = true
		},
		investmentsUnloading() {
			this.investments.list.isLoading = false
		},
		loadInvestments() {
			this.investmentsLoading()
			this.fetchInvestmentList()
		},
		async fetchInvestmentList() {
			try {
				const filters = `${this.investments.list.filters ? `${this.investment.list.filters},userId=${this.$route.params.customer_id}` : `userId=${this.$route.params.customer_id}`}`
				const res = await api.investment.fetchList(
					this.investments.list.pagesize,
					this.investments.list.page,
					filters,
					this.investments.list.orderBy,
				)
				this.investments.data = res
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.investmentsUnloading()
			}
		},

	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
