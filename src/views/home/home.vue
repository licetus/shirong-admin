<template>
	<div class="home-main">
		<Row :gutter="10">
			<Col :md="24" :lg="8">
				<Row class-name="home-page-row1" :gutter="10">
					<Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
						<Card>
							<Row type="flex" class="user-infor">
								<Col span="8">
									<Row class-name="made-child-con-middle" type="flex" align="middle">
										<SafeImg class="avatar-img" :src="avatarPath" type="avatar-md"></SafeImg>
									</Row>
								</Col>
								<Col span="16" style="padding-left:6px">
									<Row class-name="made-child-con-middle" type="flex" align="middle">
										<div>
											<b class="card-user-infor-name">{{username}}</b>
											<p>{{util.getRole(this, access)}}</p>
										</div>
									</Row>
								</Col>
							</Row>
							<div class="line-gray"></div>
							<Row class="margin-top-8">
								<Col span="8"><p class="notwrap">上次登录时间:</p></Col>
								<Col span="16" class="padding-left-8">2018.01.15-15:32:20</Col>
							</Row>
							<Row class="margin-top-8">
								<Col span="8"><p class="notwrap">上次登录地点:</p></Col>
								<Col span="16" class="padding-left-8">上海</Col>
							</Row>
						</Card>
					</Col>
					<Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
						<Card>
							<p slot="title" class="card-title">
								<Icon type="android-checkbox-outline"></Icon>
								待办事项
							</p>
							<a type="text" slot="extra" @click.prevent="addNewToDoItem">
								<Icon type="plus-round"></Icon>
							</a>
							<Modal
							v-model="showAddNewTodo"
							title="添加新的待办事项"
							@on-ok="addNew"
							@on-cancel="cancelAdd">
							<Row type="flex" justify="center">
								<Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
							</Row>
							<Row slot="footer">
								<Button type="text" @click="cancelAdd">取消</Button>
								<Button type="primary" @click="addNew">确定</Button>
							</Row>
						</Modal>
						<div class="to-do-list-con">
							<div v-for="(item, index) in toDoList" :key="index" class="to-do-item">
								<to-do-list-item :content="item.title"></to-do-list-item>
							</div>
						</div>
					</Card>
				</Col>
			</Row>
		</Col>
		<Col :md="24" :lg="16">
			<Row :gutter="5">
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
					<infor-card
					id-name="user_created_count"
					:end-val="count.createUser"
					iconType="android-person-add"
					color="#2d8cf0"
					intro-text="*今日新增用户"
					></infor-card>
				</Col>
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
					<infor-card
					id-name="visit_count"
					:end-val="count.visit"
					iconType="ios-eye"
					color="#64d572"
					:iconSize="50"
					intro-text="*今日浏览总数"
					></infor-card>
				</Col>
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
					<infor-card
					id-name="collection_count"
					:end-val="count.collection"
					iconType="cube"
					color="#ffd572"
					intro-text="*今日新增项目"
					></infor-card>
				</Col>
				<Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
					<infor-card
					id-name="transfer_count"
					:end-val="count.transfer"
					iconType="calculator"
					color="#f25e43"
					intro-text="*今日收入总额"
					></infor-card>
				</Col>
			</Row>
			<Row>
				<Card :padding="0">
					<p slot="title" class="card-title">
						<Icon type="map"></Icon>
						*今日投资地理分布
					</p>
					<div class="map-con">
						<Col span="10">
							<map-data-table :cityData="cityData" height="281" :style-obj="{margin: '12px 0 0 11px'}"></map-data-table>
						</Col>
						<Col span="14" class="map-incon">
							<Row type="flex" justify="center" align="middle">
								<home-map :city-data="cityData"></home-map>
							</Row>
						</Col>
					</div>
				</Card>
			</Row>
		</Col>
	</Row>
	<Row :gutter="10" class="margin-top-10">
		<Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="android-map"></Icon>
					*上周每日访问量统计
				</p>
				<div class="data-source-row">
					<visite-volume></visite-volume>
				</div>
			</Card>
		</Col>
		<Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="ios-pulse-strong"></Icon>
					*交易来源统计
				</p>
				<div class="data-source-row">
					<data-source-pie></data-source-pie>
				</div>
			</Card>
		</Col>
		<Col :md="24" :lg="8">
			<Card>
				<p slot="title" class="card-title">
					<Icon type="android-wifi"></Icon>
					*今日项目销售情况
				</p>
				<div class="data-source-row">
					<user-flow></user-flow>
				</div>
			</Card>
		</Col>
	</Row>
	<Row class="margin-top-10">
		<Card>
			<p slot="title" class="card-title">
				<Icon type="ios-shuffle-strong"></Icon>
				*上周每日销售总额(/笔)
			</p>
			<div class="line-chart-con">
				<service-requests></service-requests>
			</div>
		</Card>
	</Row>
</div>
</template>

<script>
	import Cookies from 'js-cookie'
	import cityData from './map-data/get-city-value'
	import homeMap from './components/map.vue'
	import dataSourcePie from './components/dataSourcePie.vue'
	import visiteVolume from './components/visiteVolume.vue'
	import serviceRequests from './components/serviceRequests.vue'
	import userFlow from './components/userFlow.vue'
	import countUp from './components/countUp.vue'
	import inforCard from './components/inforCard.vue'
	import mapDataTable from './components/mapDataTable.vue'
	import toDoListItem from './components/toDoListItem.vue'
	import Enum from '../../models/enum'
	import util from '../../libs/util'

	export default {
		name: 'home',
		components: {
			homeMap,
			dataSourcePie,
			visiteVolume,
			serviceRequests,
			userFlow,
			countUp,
			inforCard,
			mapDataTable,
			toDoListItem,
		},
		data() {
			return {
				Enum,
				util,
				access: parseInt(Cookies.get('access'), 10),
				toDoList: [
					{
						title: '第三次全方位测试',
					},
					{
						title: '调整服务器设置',
					},
					{
						title: '拟定demo方案',
					},
					{
						title: '第四次流程测试',
					},
					{
						title: '准备demo展示',
					},
				],
				count: {
					createUser: 316,
					visit: 32645,
					collection: 27,
					transfer: 395034,
				},
				cityData,
				showAddNewTodo: false,
				newToDoItemValue: '',
			}
		},
		computed: {
			username() {
				return Cookies.get('username')
			},
			avatarPath() {
				return localStorage.avatarImgPath
			},
		},
		methods: {
			addNewToDoItem() {
				this.showAddNewTodo = true
			},
			addNew() {
				if (this.newToDoItemValue.length !== 0) {
					this.toDoList.unshift({
						title: this.newToDoItemValue,
					})
					setTimeout(() => {
						this.newToDoItemValue = ''
					}, 200)
					this.showAddNewTodo = false
				} else {
					this.$Message.error('请输入待办事项内容')
				}
			},
			cancelAdd() {
				this.showAddNewTodo = false
				this.newToDoItemValue = ''
			},
		},
	}
</script>

<style lang="less">
	@import "./home.less";
	@import "../../styles/common.less";
</style>
