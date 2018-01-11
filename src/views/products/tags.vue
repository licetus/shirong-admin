<template>
	<section>
		<Card class="table-card">
			<Row class="margin-bottom-20" type="flex" justify="space-between">
				<Col>
					<Button type="primary" @click="onClickNewTag">新增标签</Button>
				</Col>
				<Col>
					<Row type="flex">
						<Col>
							<Input v-model="search.val" placeholder="请输入搜索内容..." @on-enter="onClickSearch">
								<Select v-model="search.key" slot="prepend" style="width: 75px">
									<template v-for="(item, index) of searchOptions">
										<Option :value="item.key" :label="item.title"></Option>
									</template>
								</Select>
								<Button slot="append" icon="ios-search" @click="onClickSearch" :loading="list.isLoading"></Button>
							</Input>
						</Col>
						<Col>
							<Button type="text" @click="onClickResetPage" :loading="list.isLoading">重置</Button>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row type="flex" justify="end">
						<Button type="text" @click="onClickRefresh" :disabled="list.isLoading"><Icon class="margin-right-10" type="refresh"></Icon>刷新</Button>
					</Row>
				</Col>
			</Row>
			<Table
				:loading="list.isLoading"
				:data="tags"
				:columns="tagColumns"
				@on-sort-change="onClickSort"
				stripe
				border>
			</Table>
		</Card>
		<Modal v-model="tag.isModalVisible" width="400">
			<p slot="header">{{modalTitle}}</p>
			<Form ref="tagForm" :model="tag.form" :rules="tag.rules" label-position="left" :label-width="tag.labelWidth" inline>
				<Row type="flex" justify="center">
					<Col>
						<Row>
							<Col><FormItem label="内容">
								<Input v-model="tag.form.content"/>
							</FormItem></Col>
							<Col><FormItem label="色彩">
								 <ColorPicker v-model="tag.form.color" recommend/>
							</FormItem></Col>
							<Col><FormItem label="描述">
								<Input v-model="tag.form.description"/>
							</FormItem></Col>
						</Row>
					</Col>
				</Row>
			</Form>
			<div slot="footer">
				<Button @click="onClickCancel">取消</Button>
				<Button type="primary" @click="onClickSubmit" :loading="tag.isSubmitting">提交</Button>
			</div>
		</Modal>
	</section>
</template>

<script>
import api from '../../libs/api'
import util from '../../libs/util'

export default {
	name: 'tags_index',
	data() {
		return {
			list: {
				isLoading: false,
				total: 0,
				pagesize: 10,
				page: 0,
				filter: '',
				orderBy: '',
			},
			search: {
				key: 'id',
				val: '',
				maxLength: 10,
			},
			tags: [],
			tagColumns: [ // TODO: columns detail needing
				{
					name: 'id',
					title: '编号',
					key: 'id',
					align: 'center',
					searchable: true,
				},
				{
					name: 'tag',
					title: '标签',
					align: 'center',
					render: (h, params) => h('Tag', {
						props: {
							color: params.row.color,
						},
					}, params.row.content),
				},
				{
					name: 'content',
					title: '内容',
					key: 'content',
					align: 'center',
					searchable: true,
				},
				{
					name: 'color',
					title: '色彩',
					key: 'color',
					align: 'center',
				},
				{
					name: 'description',
					title: '描述',
					key: 'description',
					align: 'center',
					searchable: true,
				},
				{
					name: 'createTime',
					title: '创建时间',
					key: 'createTime',
					align: 'center',
					render: (h, params) => h('p', {
						style: 'word-break:keep-all',
					}, `${util.formatTime(this, params.row.createTime) || '-'}`),
				},
				{
					name: 'lastUpdateTime',
					title: '修改时间',
					key: 'lastUpdateTime',
					align: 'center',
					render: (h, params) => h('p', {
						style: 'word-break:keep-all',
					}, `${util.formatTime(this, params.row.lastUpdateTime) || '-'}`),
				},
				{
					title: '操作',
					align: 'center',
					width: 150,
					render: (h, params) => h('div', [
						h('Button', {
							props: { type: 'primary',	size: 'small' },
							style: { marginRight: '10px' },
							on: {	click: () => this.onClickEditTag(params.row) },
						}, '编辑'),
						h('Button', {
							props: { type: 'error',	size: 'small', loading: this.tag[`isTag${params.row.id}Deleting`] || false },
							on: {	click: () => this.onClickDeleteTag(params.row.id) },
						}, '删除'),
					]),
				},
			],

			// modal
			tag: {
				isModalVisible: false,
				isSubmitting: false,
				action: '',
				labelWidth: 75,
				form: {
					content: '',
					color: '',
					description: '',
				},
				rules: {},
			},
		}
	},
	mounted() {
		this.initPage()
	},
	activated() {
		if (this.$route.query.action === 'add') {
			this.showTagModal()
		}
	},
	computed: {
		searchOptions() {
			const list = []
			this.tagColumns.forEach((item) => {
				if (item.searchable) list.push({ key: item.key, title: item.title })
			})
			return list
		},
		modalTitle() {
			switch (this.tag.action) {
				case 'add':
					return '新建'
				case 'edit':
					return '编辑'
				default: return ''
			}
		},
	},
	methods: {
		// main
		initPage() {
			this.listLoading()
			this.fetchTagList()
		},
		onClickRefresh() {
			this.initPage()
		},
		// list
		listLoading() {
			this.list.isLoading = true
		},
		listUnloading() {
			this.list.isLoading = false
		},
		tagDeleting(id) {
			this.$set(this.tag, `isTag${id}Deleting`, true)
		},
		tagUndeleting(id) {
			this.$delete(this.tag, `isTag${id}Deleting`)
		},
		onClickDeleteTag(id) {
			util.passwordCheck(this, () => {
				this.tagDeleting(id)
				this.deleteTag(id)
			})
		},
		async fetchTagList() {
			try {
				const list = await api.product.tag.fetchList(
					this.list.pagesize,
					this.list.page,
					this.list.filters,
					this.list.orderBy,
				)
				this.tags = list
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.listUnloading()
			}
		},
		async deleteTag(id) {
			try {
				await api.product.tag.delete(id)
				this.initPage()
			} catch (e) {
				switch (e.code) {
					case 'ERROR':
						this.$Message.error('删除失败, 该标签正在使用中')
						break
					default: this.$Message.error(e.message)
				}
			} finally {
				this.tagUndeleting(id)
			}
		},
		// search / sort
		generateSearchFilters() {
			this.list.filters = `${this.search.key} LIKE '%${this.search.val}%'`
		},
		onClickSearch() {
			if (util.inputLengthCheck(this.search.val, this.search.maxLength, this)) {
				this.generateSearchFilters()
				this.initPage()
			}
		},
		onClickResetPage() {
			this.list.filters = ''
			this.initPage()
		},
		onClickSort() {
		},
		// tag
		showTagModal() {
			this.tag.isModalVisible = true
		},
		hideTagModal() {
			this.tag.isModalVisible = false
		},
		tagSubmitting() {
			this.tag.isSubmitting = true
		},
		tagUnsubmitting() {
			this.tag.isSubmitting = false
		},
		initTagForm(action, tag) {
			switch (action) {
				case 'add':
					this.tag.action = 'add'
					this.tag.form = {
						content: '',
						color: '',
						description: '',
					}
					break
				case 'edit':
					this.tag.action = 'edit'
					this.tag.form = {
						id: tag.id,
						content: tag.content,
						color: tag.color,
						description: tag.description,
					}
					break
				default:
			}
		},
		onClickNewTag() {
			this.initTagForm('add')
			this.showTagModal()
		},
		onClickEditTag(tag) {
			this.initTagForm('edit', tag)
			this.showTagModal()
		},
		onClickCancel() {
			this.hideTagModal()
		},
		onClickSubmit() { // BUG validator doenst work
			// this.$refs.tagForm.validate((valid) => {
			// 	if (valid) {
			// 	}
			// })
			util.passwordCheck(this, () => {
				switch (this.tag.action) {
					case 'add': {
						const tag = {
							content: this.tag.form.content,
							color: this.tag.form.color,
							description: this.tag.form.description,
						}
						this.tagSubmitting()
						this.addTag(tag)
						break
					}
					case 'edit': {
						const tag = {
							content: this.tag.form.content,
							color: this.tag.form.color,
							description: this.tag.form.description,
						}
						this.tagSubmitting()
						this.updateTag(tag, this.tag.form.id)
						break
					}
					default:
				}
			})
		},
		async addTag(tag) {
			try {
				await api.product.tag.add(tag)
				this.hideTagModal()
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.tagUnsubmitting()
			}
		},
		async updateTag(tag, id) {
			try {
				await api.product.tag.update(tag, id)
				this.hideTagModal()
				this.initPage()
			} catch (e) {
				this.$Message.error(e.message)
			} finally {
				this.tagUnsubmitting()
			}
		},
	},
}
</script>

<style lang="less">
@import '../../styles/common.less';
@import '../../styles/public.less';
</style>
