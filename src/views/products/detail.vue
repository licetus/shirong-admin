<template>
	<section>
		<Row>
			<Col :span="16">
				<Card>
					<Spin v-if="product.profile.isLoading" size="large" fix></Spin>
					<p slot="title">
						基本信息
					</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!product.profile.isEditable">
							<Button type="text" @click="onClickEditProfile">解锁</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelProfile">取消</Button>
							<Button type="text" @click="onClickSubmitProfile" :loading="product.profile.isSubmitting" :disabled="product.finance.isSubmitting">提交</Button>
						</div>
					</div>
					<Form ref="profileForm" :model="product.profile.form" :rules="product.profile.rules" label-position="left" :label-width="product.profile.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目状态">
								<p>{{util.getProductStatus(this, product.data.status)}}</p>
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目类型">
								<p>{{util.getLoanType(this, loan.data.main.type)}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目名称">
								<p v-if="!product.profile.isEditable">{{product.profile.form.name}}</p>
								<Input v-else v-model="product.profile.form.name" />
							</FormItem></Col>
							<Col :span="8"><FormItem label="项目标签">
								<div v-if="!product.profile.isEditable">
									<p v-if="!product.data.tagId">暂无标签</p>
									<SimpleTag v-else :color="product.data.tagColor" :text="product.data.tag"></SimpleTag>
								</div>
								<div v-else>
									<Dropdown class="tags-dropdown" trigger="custom" :visible="product.profile.tags.isDropdownVisible" @on-click="onClickTag">
										<Button type="text" size="small" @click="onClickSwitchDropdown">
											<span v-if="!product.profile.form.tagId">无标签</span>
											<SimpleTag v-else :color="product.profile.form.tagColor" :text="product.profile.form.tag" clickable></SimpleTag>
											<Icon type="arrow-down-b"></Icon>
										</Button>
										<DropdownMenu slot="list">
											<Spin v-if="product.profile.tags.list.isLoading" fix></Spin>
											<template v-for="(item, index) of product.profile.tags.data">
												<DropdownItem :name="index">
													<Row type="flex" justify="center"><SimpleTag :color="item.color" :text="item.content"></SimpleTag></Row>
												</DropdownItem>
											</template>
											<DropdownItem name="null">
												<Row type="flex" justify="center"><p>无标签</p></Row>
											</DropdownItem>
										</DropdownMenu>
									</Dropdown>
									<Button v-if="product.profile.isEditable" type="text" @click="onClickNewTag"><Icon type="plus-round"></Icon></Button>
								</div>
							</FormItem></Col>
							<Col :span="8"><FormItem label="排名参数">
								<p v-if="!product.profile.isEditable">{{product.profile.form.rankingScore}}</p>
								<InputNumber v-else v-model="product.profile.form.rankingScore" :min="0" :max="9.99" :step="0.1"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="项目备注">
								<p>{{product.profile.form.remark}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="创建时间">{{util.formatTime(this, product.data.createTime) || '-'}}</FormItem></Col>
							<Col :span="8"><FormItem label="修改时间">{{util.formatTime(this, product.data.lastUpdateTime) || '-'}}</FormItem></Col>
						</Row>
						<Row>
							<Col :span="24"><FormItem label="项目描述">
								<ProductDescription
									:type="loan.data.main.type"
									:debtorName="loan.data.debtor.profile.realName"
									:object="loan.data.main.object"
									:location="loan.data.debtor.identify.location"
								></ProductDescription>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="product.finance.isLoading" size="large" fix></Spin>
					<p slot="title">
						详细信息
					</p>
					<div v-if="isEditVisible" slot="extra">
						<div v-if="!product.finance.isEditable">
							<Button type="text" @click="onClickEditFinance">解锁</Button>
						</div>
						<div v-else>
							<Button type="text" @click="onClickCancelFinance">取消</Button>
							<Button type="text" @click="onClickSaveFinance" :loading="product.finance.isSubmitting" :disabled="product.profile.isSubmitting">提交</Button>
						</div>
					</div>
					<Form :model="product.finance.form" :rules="product.finance.rules" label-position="left" :label-width="product.finance.labelWidth" inline>
						<Row>
							<Col :span="8"><FormItem label="项目总额"><p>{{product.data.amount}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目周期"><p>{{util.getProductTermType(this, product.data.termType)}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="项目进度"><p>{{product.data.currentInvestment}}</p></FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="基础利率">
								<p v-if="!product.finance.isEditable">{{product.finance.form.interestRateBase}}</p>
								<InputNumber v-else v-model="product.finance.form.interestRateBase" :min="0" :max="0.99" :step="0.01"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="附加利率">
								<p v-if="!product.finance.isEditable">{{product.finance.form.interestRateDelta}}</p>
								<InputNumber v-else v-model="product.finance.form.interestRateDelta" :min="0" :max="0.99" :step="0.01"></InputNumber>
							</FormItem></Col>
							<Col :span="8"><FormItem label="最小投资">
								<p v-if="!product.finance.isEditable">{{product.finance.form.minInvestment}}</p>
								<InputNumber v-else v-model="product.finance.form.minInvestment" :min="0" :max="10000" :step="100"></InputNumber>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="8"><FormItem label="还款方式"><p>{{util.getLoanRepaymentWay(this, loan.data.main.repaymentWay)}}</p></FormItem></Col>
							<Col :span="8"><FormItem label="计息方式"><p>{{util.getProductInterestWay(this, product.data.interestWay)}}</p></FormItem></Col>
						</Row>
					</Form>
				</Card>
				<Card class="margin-top-10">
					<Spin v-if="loan.isLoading" size="large" fix></Spin>
					<p slot="title">
						贷款信息
					</p>
					<div slot="extra">
						<Button type="text" @click="onClickLoanDetail">详情</Button>
					</div>
					<Form :model="loan" label-position="left" :label-width="loan.labelWidth" inline>
						<Row>
							<Col :span="12"><FormItem label="借款人姓名">
								<p>{{loan.data.debtor.profile.realName}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证号码">
								<p>{{loan.data.debtor.identify.idNumber}}</p>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证住址">
								<p>{{loan.data.debtor.identify.location}}</p>
							</FormItem></Col>
						</Row>
						<Row>
							<Col :span="12"><FormItem label="身份证正面">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.debtor.identify.frontImageUrl)" type="certificate-md" viewable></SafeImg></Col></Row>
							</FormItem></Col>
							<Col :span="12"><FormItem label="身份证背面">
								<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.debtor.identify.backImageUrl)" type="certificate-md" viewable></SafeImg></Col></Row>
							</FormItem></Col>
						</Row>
						<div v-if="loan.data.main.type === Enum.Loan.Type.Car">
							<Row>
								<Col :span="12"><FormItem label="车辆型号">
									<p>{{loan.data.sub.car.carBrand}}</p>
								</FormItem></Col>
								<Col :span="12"><FormItem label="购买价格">
									<p>{{loan.data.sub.car.purchasePrice}}</p>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="行驶里程">
									<p>{{loan.data.sub.car.milage}}</p>
								</FormItem></Col>
								<Col :span="12"><FormItem label="评估价格">
									<p>{{loan.data.sub.car.evaluatePrice}}</p>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="车辆行驶证">
									<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.vehicleLicenseImageUrl)" type="certificate-md" viewable></SafeImg></Col></Row>
								</FormItem></Col>
								<Col :span="12"><FormItem label="车辆检验证">
									<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.inspectionLicenseImageUrl)" type="certificate-md" viewable></SafeImg></Col></Row>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="车辆正面照">
									<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carFrontImageUrl)" type="photo-md" viewable></SafeImg></Col></Row>
								</FormItem></Col>
								<Col :span="12"><FormItem label="车辆背面照">
									<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carBackImageUrl)" type="photo-md" viewable></SafeImg></Col></Row>
								</FormItem></Col>
							</Row>
							<Row>
								<Col :span="12"><FormItem label="车辆里程照">
									<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carMilageImageUrl)" type="photo-md" viewable></SafeImg></Col></Row>
								</FormItem></Col>
								<Col :span="12"><FormItem label="车辆内饰照">
									<Row><Col :span="18"><SafeImg :src="util.generateImageUrl(loan.data.sub.car.carInsideImageUrl)" type="photo-md" viewable></SafeImg></Col></Row>
								</FormItem></Col>
							</Row>
						</div>
					</Form>
				</Card>
			</Col>
			<Col :span="8" class="padding-left-10">
				<!-- TODO need add auth check -->
				<Card class="margin-bottom-10">
					<p slot="title">
						控制台
					</p>
					<Row type="flex" justify="space-between">
						<Col>
							<Row v-if="!product.isLoading" type="flex" justify="end">
								<Button v-if="isCancelable" class="margin-right-10" type="error" @click="onClickCancelProduct" :loading="product.isCanceling">取消</Button>
								<Button v-if="isPublishable" class="margin-right-10" type="primary" @click="onClickPublishProduct" :loading="product.isPublishing">发布</Button>
								<Button v-if="isPauseable" class="margin-right-10" type="warning" @click="onClickPauseProduct" :loading="product.isPausing">暂停</Button>
								<Button v-if="isResumeable" class="margin-right-10" type="success" @click="onClickResumeProduct" :loading="product.isResuming">恢复</Button>
							</Row>
						</Col>
						<Col>
							<Button @click="onClickRefreshProduct" :loading="product.isLoading">刷新</Button>
						</Col>
					</Row>
				</Card>
				<Card>
					<p slot="title">
						上架状态
					</p>
					<Row type="flex" justify="space-between">
						<Col>
							<Form label-position="left" :label-width="sale.labelWidth">
								<FormItem label="上架状态">{{util.getProductSaleStatus(this, product.data.isOnSale)}}</FormItem>
								<FormItem label="上架时间">{{util.formatTime(this, product.data.publishTime)}}</FormItem>
							</Form>
						</Col>
						<Col>
							<Row v-if="!product.isLoading" type="flex" justify="end">
								<Button v-if="!product.data.isOnSale" type="success" @click="onClickSwitchSaleStatus" :loading="product.isSaleStatusSwitching">上架</Button>
								<Button v-else type="warning" @click="onClickSwitchSaleStatus" :loading="product.isSaleStatusSwitching">下架</Button>
							</Row>
						</Col>
					</Row>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						投资记录
					</p>
					<Table :data="investments.data" :columns="investments.columns" :loading="investments.list.isLoading"></Table>
				</Card>
				<Card class="margin-top-10">
					<p slot="title">
						审核信息
					</p>
					<p v-if="approval.data.length < 1">无</p>
					<Form label-position="left" :label-width="approval.labelWidth" inline>
						<Row class="border-bottom" v-for="(item, index) of approval.data" :key="index">
							<Col :span="24"><FormItem label="审核意见">
								<p>{{item.content}}</p>
							</FormItem></Col>
							<Col :span="24"><FormItem label="审核时间">
								<p>{{util.formatTime(this, item.createTime) || '-'}}</p>
							</FormItem></Col>
						</Row>
					</Form>
				</Card>
			</Col>
		</Row>
	</section>
</template>

<script>
import Cookies from 'js-cookie'
import { Loan, Car, LoanComment, Product, Debtor } from '../../models/data'
import util from '../../libs/util'
import api from '../../libs/api'
import Enum from '../../models/enum'

export default {
	name: 'product_detail',
	data() {
		const blank = {
			product: new Product(),
			debtor: new Debtor(),
			loan: new Loan(),
			car: new Car(),
			loanComment: new LoanComment(),
		}
		return {
			Enum,
			util,
			access: parseInt(Cookies.get('access'), 10),
			loanComment: blank.loanComment,
			product: {
				isLoading: false,
				isPublishing: false,
				isPausing: false,
				isResuming: false,
				isCanceling: false,
				isSaleStatusSwitching: false,
				data: blank.product,
				profile: {
					labelWidth: 75,
					isLoading: false,
					isEditable: false,
					isSubmitting: false,
					form: {
						name: blank.product.name,
						tagId: blank.product.tagId,
						tag: blank.product.tag,
						tagColor: blank.product.tagColor,
						rankingScore: blank.product.rankingScore,
						remark: blank.product.remark,
					},
					rules: {},
					tags: {
						isDropdownVisible: false,
						data: [],
						list: {
							isLoading: false,
							pagesize: 10,
							page: 0,
							filters: '',
							orderBy: '',
						},
					},
				},
				finance: {
					labelWidth: 75,
					isLoading: false,
					isEditable: false,
					isSubmitting: false,
					form: {
						amount: blank.product.amount,
						interestRateBase: blank.product.interestRateBase,
						interestRateDelta: blank.product.interestRateDelta,
						minInvestment: blank.product.minInvestment,
						currentInvestment: blank.product.currentInvestment,
						repaymentWay: blank.loan.repaymentWay,
						termType: blank.product.termType,
						interestWay: blank.product.interestWay,
					},
					rules: {},
				},
			},
			loan: {
				labelWidth: 75,
				isLoading: false,
				data: {
					debtor: blank.debtor,
					main: blank.loan,
					sub: {
						car: blank.car,
					},
				},
			},
			sale: {
				labelWidth: 75,
				isOnSale: blank.product.isOnSale,
				publishTime: blank.product.publishTime,
			},
			approval: {
				labelWidth: 75,
				isModalVisible: false,
				isDisapproving: false,
				isApproving: false,
				list: {
					isLoading: false,
					pagesize: 10,
					page: 0,
					filters: '',
					orderBy: 'create_time desc',
				},
				data: [
					blank.loanComment,
				],
				form: {
					content: '',
				},
				rules: {},
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
						name: 'userAccount',
						title: '投资人',
						key: 'userAccount',
						aligin: 'center',
					},
					{
						name: 'amount',
						title: '金额',
						key: 'amount',
						align: 'center',
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
		isControlable() {
			return this.access <= Enum.Role.Admin
		},
		isPublishable() {
			return (this.access <= Enum.Role.Admin) && (this.product.data.status === Enum.Product.Status.Prepared)
		},
		isPauseable() {
			return (this.access <= Enum.Role.Admin) && ((this.product.data.status === Enum.Product.Status.Selling) || (this.product.data.status === Enum.Product.Status.Running))
		},
		isResumeable() {
			return (this.access <= Enum.Role.Admin) && ((this.product.data.status === Enum.Product.Status.SellingPaused) || (this.product.data.status === Enum.Product.Status.RunningPaused))
		},
		isCancelable() {
			return (this.access <= Enum.Role.Admin) && (
				(this.product.data.status === Enum.Product.Status.Selling) ||
				(this.product.data.status === Enum.Product.Status.SoldOut) ||
				(this.product.data.status === Enum.Product.Status.Running) ||
				(this.product.data.status === Enum.Product.Status.SellingPaused) ||
				(this.product.data.status === Enum.Product.Status.RunningPaused)
			)
		},
		isEditVisible() {
			return this.access <= Enum.Role.Operator
		},
		isOnSale() {
			return this.product.data.isOnSale ? '已上架' : '未上架'
		},
	},
	methods: {
		// main
		initPage() {
			util.setPageCache(this.$route.name, 'path', this.$route.fullPath)
			this.uneditProfile()
			this.uneditFinance()
			this.loadProduct()
			this.loadInvestments()
			this.loadApprovalComments()
		},
		productLoading() {
			this.product.isLoading = true
		},
		productUnloading() {
			this.product.isLoading = false
		},
		loadProduct() {
			this.productLoading()
			this.profileLoading()
			this.financeLoading()
			this.loanLoading()
			this.fetchProduct()
		},
		onClickRefreshProduct() {
			this.loadProduct()
		},
		async fetchProduct() {
			try {
				const product = await api.product.fetch(this.$route.params.product_id)
				this.product.data = {
					id: product.id,
					amount: product.amount,
					status: product.status,
					isOnSale: product.isOnSale,
					startInterestTime: product.startInterestTime,
					publishTime: product.publishTime,
					termType: product.termType,
					name: product.name,
					remark: product.remark,
					rankingScore: product.rankingScore,
					tagId: product.tagId,
					tag: product.tag,
					tagColor: product.tagColor,
					interestRateBase: product.interestRateBase,
					interestRateDelta: product.interestRateDelta,
					minInvestment: product.minInvestment,
					interestWay: product.interestWay,
					currentInvestment: product.currentInvestment,
					createTime: product.createTime,
					lastUpdateTime: product.lastUpdateTime,
				}
				this.loadLoan()
				this.initProfileForm()
				this.initFinanceForm()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.profileUnloading()
				this.financeUnloading()
				this.productUnloading()
			}
		},
		// update
		async updateProduct(product) {
			try {
				await api.product.update(product, this.$route.params.product_id)
				this.$Notice.success({
					title: '更新成功, 正在刷新...',
					duration: 3,
				})
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.profileUnsubmitting()
				this.financeUnsubmittng()
			}
		},
		// publish
		productPublishing() {
			this.product.isPublishing = true
		},
		productUnpublishing() {
			this.product.isPublishing = false
		},
		onClickPublishProduct() {
			util.passwordCheck(this, () => {
				this.productPublishing()
				this.publishProduct()
			})
		},
		async publishProduct() {
			try {
				await api.product.publish(this.$route.params.product_id)
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.productUnpublishing()
			}
		},
		// pause
		productPausing() {
			this.product.isPausing = true
		},
		productUnpausing() {
			this.product.isPausing = false
		},
		onClickPauseProduct() {
			util.passwordCheck(this, () => {
				this.productPausing()
				this.pauseProduct()
			})
		},
		async pauseProduct() {
			try {
				await api.product.pause(this.$route.params.product_id)
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.productUnpausing()
			}
		},
		// resume
		productResuming() {
			this.product.isResuming = true
		},
		productUnresuming() {
			this.product.isResuming = false
		},
		onClickResumeProduct() {
			util.passwordCheck(this, () => {
				this.productResuming()
				this.resumeProduct()
			})
		},
		async resumeProduct() {
			try {
				await api.product.resume(this.$route.params.product_id)
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.productUnresuming()
			}
		},
		// cancel
		productCanceling() {
			this.product.isCanceling = true
		},
		productUncanceling() {
			this.product.isCanceling = false
		},
		onClickCancelProduct() {
			util.passwordCheck(this, () => {
				this.productCanceling()
				this.cancelProduct()
			})
		},
		async cancelProduct() {
			try {
				await api.product.cancel(this.$route.params.product_id)
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.productUncanceling()
			}
		},
		// switch sale
		saleStatusSwitching() {
			this.product.isSaleStatusSwitching = true
		},
		saleStatusUnswitching() {
			this.product.isSaleStatusSwitching = false
		},
		onClickSwitchSaleStatus() {
			util.passwordCheck(this, () => {
				this.saleStatusSwitching()
				this.switchSaleStatus()
			})
		},
		async switchSaleStatus() {
			try {
				const status = this.product.data.isOnSale === true
				await api.product.switchSaleStatus(!status, this.$route.params.product_id)
				this.loadProduct()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.saleStatusUnswitching()
			}
		},
		// profile
		editProfile() {
			this.product.profile.isEditable = true
		},
		uneditProfile() {
			this.product.profile.isEditable = false
		},
		profileLoading() {
			this.product.profile.isLoading = true
		},
		profileUnloading() {
			this.product.profile.isLoading = false
		},
		profileSubmitting() {
			this.product.profile.isSubmitting = true
		},
		profileUnsubmitting() {
			this.product.profile.isSubmitting = false
		},
		initProfileForm() {
			this.product.profile.form = {
				name: this.product.data.name,
				tagId: this.product.data.tagId,
				tag: this.product.data.tag,
				tagColor: this.product.data.tagColor,
				rankingScore: this.product.data.rankingScore,
				remark: this.product.data.remark,
			}
		},
		onClickEditProfile() {
			this.editProfile()
		},
		onClickCancelProfile() {
			this.initProfileForm()
			this.hideDropdown()
			this.uneditProfile()
		},
		onClickSubmitProfile() { // BUG validator doesnt work
			// this.$refs.profileForm.validate((valid) => {
			// 	if (valid) {
			// 	}
			// })
			util.passwordCheck(this, () => {
				const product = {
					name: this.product.profile.form.name,
					tagId: this.product.profile.form.tagId,
					rankingScore: this.product.profile.form.rankingScore,
					remark: this.product.profile.form.remark,
				}
				this.profileSubmitting()
				this.updateProduct(product)
			})
		},
		// tag
		tagsLoading() {
			this.product.profile.tags.list.isLoading = true
		},
		tagsUnloading() {
			this.product.profile.tags.list.isLoading = false
		},
		showDropdown() {
			this.product.profile.tags.isDropdownVisible = true
		},
		hideDropdown() {
			this.product.profile.tags.isDropdownVisible = false
		},
		onClickSwitchDropdown() {
			if (this.product.profile.tags.isDropdownVisible === false) {
				this.tagsLoading()
				this.showDropdown()
				this.fetchTagList()
			} else {
				this.hideDropdown()
			}
		},
		onClickTag(index) {
			if (index === 'null') this.product.profile.form.tagId = null
			else {
				const tag = this.product.profile.tags.data[index]
				this.product.profile.form.tagId = tag.id
				this.product.profile.form.tag = tag.content
				this.product.profile.form.tagColor = tag.color
			}
			this.hideDropdown()
		},
		onClickNewTag() {
			this.$router.push({
				name: 'tags_index',
				query: {
					action: 'add',
				},
			})
		},
		async fetchTagList() {
			try {
				const tags = await api.product.tag.fetchList(
					this.product.profile.tags.list.pagesize,
					this.product.profile.tags.list.page,
					this.product.profile.tags.list.filters,
					this.product.profile.tags.list.orderBy,
				)
				this.product.profile.tags.data = tags
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.tagsUnloading()
			}
		},
		async fetchTag() {
			try {
				const tag = api.product.tag.fetch(this.product.data.tagId)
				this.product.data.tag = tag.content
				this.product.data.tagColor = tag.color
			} catch (e) {
				this.$Message.error(e.message)
			}
		},
		// finance
		editFinance() {
			this.product.finance.isEditable = true
		},
		uneditFinance() {
			this.product.finance.isEditable = false
		},
		financeLoading() {
			this.product.finance.isLoading = true
		},
		financeUnloading() {
			this.product.finance.isLoading = false
		},
		financeSubmitting() {
			this.product.finance.isSubmitting = true
		},
		financeUnsubmittng() {
			this.product.finance.isSubmitting = false
		},
		initFinanceForm() {
			this.product.finance.form = {
				interestRateBase: this.product.data.interestRateBase,
				interestRateDelta: this.product.data.interestRateDelta,
				minInvestment: this.product.data.minInvestment,
			}
		},
		onClickEditFinance() {
			this.editFinance()
		},
		onClickCancelFinance() {
			this.initFinanceForm()
			this.uneditFinance()
		},
		onClickSaveFinance() {
			// this.$refs.financeForm.validate((valid) => {
			// 	if (valid) {
			// 	}
			// })
			util.passwordCheck(this, () => {
				const product = {
					interestRateBase: this.product.finance.form.interestRateBase,
					interestRateDelta: this.product.finance.form.interestRateDelta,
					minInvestment: this.product.finance.form.minInvestment,
				}
				this.financeSubmitting()
				this.updateProduct(product)
			})
		},
		// loan
		loanLoading() {
			this.loan.isLoading = true
		},
		loanUnloading() {
			this.loan.isLoading = false
		},
		loadLoan() {
			this.loanLoading()
			this.fetchLoan()
		},
		onClickLoanDetail() {
			this.$router.push({
				name: 'loan_detail',
				params: {
					loan_id: this.loan.data.main.id,
				},
			})
		},
		async fetchLoan() {
			try {
				const loan = await api.loan.fetch(this.product.data.id)
				this.loan.data.main = {
					id: loan.id,
					debtorId: loan.debtorId,
					agentId: loan.agentId,
					object: loan.object,
					amount: loan.amount,
					interest: loan.interest,
					approvalStatus: loan.approvalStatus,
					repaymentWay: loan.repaymentWay,
					type: loan.type,
					remark: loan.remark,
					termType: loan.termType,
					status: loan.status,
				}
				switch (loan.type) {
					case Enum.Loan.Type.Car:
						this.loan.data.sub.car = {
							id: loan.sub.id,
							carBrand: loan.sub.carBrand,
							purchasePrice: loan.sub.purchasePrice,
							milage: loan.sub.milage,
							evaluatePrice: loan.sub.evaluatePrice,
							carFrontImageUrl: loan.sub.carFrontImageUrl,
							carBackImageUrl: loan.sub.carBackImageUrl,
							carMilageImageUrl: loan.sub.carMilageImageUrl,
							carInsideImageUrl: loan.sub.carInsideImageUrl,
							vehicleLicenseImageUrl: loan.sub.vehicleLicenseImageUrl,
							inspectionLicenseImageUrl: loan.sub.inspectionLicenseImageUrl,
						}
						break
					default:
				}
				try {
					const debtorProfile = await api.debtor.profile.fetch(loan.debtorId)
					this.loan.data.debtor.profile = {
						id: debtorProfile.id,
						birthday: debtorProfile.birthday,
						creatorId: debtorProfile.creatorId,
						realName: debtorProfile.realName,
						gender: debtorProfile.gender,
						primaryNumber: debtorProfile.primaryNumber,
						alternativeNumber: debtorProfile.alternativeNumber,
						remark: debtorProfile.remark,
					}
					const debtorIdentify = await api.debtor.identify.fetch(loan.debtorId)
					this.loan.data.debtor.identify = {
						id: debtorIdentify.id,
						idNumber: debtorIdentify.idNumber,
						frontImageUrl: debtorIdentify.frontImageUrl,
						frontBlurImageUrl: debtorIdentify.frontBlurImageUrl,
						backImageUrl: debtorIdentify.backImageUrl,
						backBlurImageUrl: debtorIdentify.backBlurImageUrl,
						location: debtorIdentify.location,
					}
				} catch (e) {
					this.$Message.error(e.message)
				}
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.loanUnloading()
			}
		},
		// async updateProfile() {
		// },
		// async fetchProfile() {
		// },

		// investments
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
				const filters = `${this.investments.list.filters ? `${this.investment.list.filters},productId=${this.$route.params.product_id}` : `userId=${this.$route.params.product_id}`}`
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
		// approval
		approvalLoading() {
			this.approval.list.isLoading = true
		},
		approvalUnloading() {
			this.approval.list.isLoading = false
		},
		loadApprovalComments() {
			this.approvalLoading()
			this.fetchApprovalComments()
		},
		async fetchApprovalComments() {
			try {
				this.approval.data = await api.loan.comment.fetchList(
					this.approval.list.pagesize,
					this.approval.list.page,
					this.approval.list.filters,
					this.approval.list.orderBy,
					this.$route.params.product_id,
				)
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.approvalUnloading()
			}
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
.tags-dropdown{
	.ivu-dropdown-item {
		padding: 3px 0;
	}
}
</style>
