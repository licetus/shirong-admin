<template>
	<section id="message-detail">
		<Spin v-show="isSpinVisible" size="large" fix></Spin>
		<Card v-show="!isSpinVisible" class="content-body" :padding="30" :bordered="false" dis-hover>
			<Row>
				<Col v-if="type === Enum.MessageType.Order" class="order-info-col" :span="6">
					<p><ImageControl class="order-image" :src="generateImgUrl(pilot.photoUrl, pilotProfilePlaceholder)" :default="pilotProfilePlaceholder"></ImageControl></p>
					<p class="order-name">{{pilot.firstName}} {{pilot.lastName}} </p>
					<p>{{pilot.stuffNumber}}</p>
					<p>
						<Tag v-if="order.status === status.Pending" color="yellow">{{$t('messages.Order.OrderStatus.Pending')}}</Tag>
						<Tag v-else-if="order.status === status.Active" color="green">{{$t('messages.Order.OrderStatus.Active')}}</Tag>
						<Tag v-else-if="order.status === status.Completed" color="blue">{{$t('messages.Order.OrderStatus.Completed')}}</Tag>
						<Tag v-else-if="order.status === status.Canceled">{{$t('messages.Order.OrderStatus.Canceled')}}</Tag>
					</p>
					<div>
						<p class="order-info-title">{{$t('messages.Messages.Detail.StaffNumber')}}</p>
						<p class="order-info-content">{{pilot.staffNumber}}</p>
						<p class="order-info-title">{{$t('messages.Messages.Detail.CurrentLocation')}}</p>
						<p class="order-info-content">{{pilot.location || 'loading...'}}</p>
						<p class="order-info-remark">{{lastLocationTime}}</p>
					</div>
					<div class="order-info-div">
						<p class="order-info-title">{{$t('messages.Messages.Detail.BasicInfo.StartTime')}}</p>
						<p class="order-info-content">{{formatUTCDate(order.startTime)}}</p>
						<p class="order-info-title">{{$t('messages.Messages.Detail.BasicInfo.EndTime')}}</p>
						<p class="order-info-content">{{formatUTCDate(order.endTime, 'end')}}</p>
						<p class="order-info-title">{{$t('messages.Messages.Detail.BasicInfo.StartAirport')}}</p>
						<p class="order-info-content">{{startAirport}}</p>
						<p class="order-info-title">{{$t('messages.Messages.Detail.BasicInfo.EndAirport')}}</p>
						<p class="order-info-content">{{endAirport}}</p>
					</div>
					<div>
						<p class="order-info-title">{{$t('messages.Messages.Detail.BasicInfo.AircraftType')}}</p>
						<p class="order-info-content">{{aircraftType}}</p>
						<p class="order-info-title">{{$t('messages.Messages.Detail.BasicInfo.Arp')}}</p>
						<p class="order-info-content">{{arp}}</p>
						<p class="order-info-link"><a href="javascript:void(0);" @click.prevent="onClickViewOrderDetail">{{$t('messages.Messages.Detail.Button.ViewOrder')}}</a></p>
					</div>
				</Col>
				<Col class="message-col" :span="type === Enum.MessageType.Order ? 18 : 24">
					<Row type="flex" justify="space-between">
						<Col :span="20">
							<Input class="message-input" v-model="editingContent" type="textarea" :rows="4" :placeholder="$t('messages.Messages.Detail.TextBox.Placeholder')"></Input>
							<Row class="message-send-div" type="flex" justify="end">
								<Button type="primary" @click="onClickSend">Send</Button>
							</Row>
						</Col>
						<Col :span="4" class="message-avatar-col">
							<ImageControl class="message-avatar" :src="generateImgUrl(avatarUrl, adminAvatar)" :default="adminAvatar"></ImageControl>
							<!-- <img class="message-avatar" :src="avatarUrl"/> -->
						</Col>
					</Row>
					<Row class="message-item-row" v-for="(item, index) of messages" :key="index">
						<Row v-if="item.sender===messageSender.Admin">
							<Col :span="18" offset="2">
								<div class="message-content-div">
									<p class="message-content">{{formatMessage(item.messageType, item.content)}}</p>
									<p class="message-time">{{formatLocalTime(item.createTime)}}</p>
								</div>
							</Col>
							<Col :span="4" class="message-avatar-col">
								<ImageControl class="message-avatar" :src="generateImgUrl(avatarUrl, adminAvatar)" :default="adminAvatar"></ImageControl>
								<!-- <img class="message-avatar" :src="avatarUrl"/> -->
							</Col>
						</Row>
						<Row v-else-if="item.sender===messageSender.Pilot">
							<Col :span="4" class="message-avatar-col">
								<ImageControl class="message-avatar" :src="generateImgUrl(pilot.photoUrl, pilotAvatarPlaceholder)" :default="pilotAvatarPlaceholder"></ImageControl>
								<!-- <img class="message-avatar" :src="generateImgUrl(pilot.photoUrl)"/> -->
							</Col>
							<Col :span="18">
								<div class="message-content-div">
									<p class="message-content">{{formatMessage(item.messageType, item.content)}}</p>
									<p class="message-time">{{formatLocalTime(item.createTime)}}</p>
								</div>
							</Col>
						</Row>
						<Row v-else-if="item.sender===messageSender.Operator">
							<Col :span="4" class="message-avatar-col">
								<!-- TODO avatarUrl needed -->
								<ImageControl class="message-avatar" :src="generateImgUrl(operator.avatarUrl, operatorAvatarPlaceholder)" :default="operatorAvatarPlaceholder"></ImageControl>
								<!-- <img class="message-avatar" :src="generateImgUrl('files/image-f482a883.png')"/> -->
							</Col>
							<Col :span="18">
								<div class="message-content-div">
									<p class="message-content">{{formatMessage(item.messageType, item.content)}}</p>
									<p class="message-time">{{formatLocalTime(item.createTime)}}</p>
								</div>
							</Col>
						</Row>
						<Row v-else-if="item.sender===messageSender.System">
							<p class="message-system">{{formatLocalTime(item.createTime)}} - {{formatMessage(item.messageType, item.content)}}</p>
						</Row>
					</Row>
					<Row type="flex" justify="center">
						<Button type="text" @click="onClickLoadMore" :loading="isLoadMoreLoading" :disabled="isLoadMoreDisabled">{{$t('messages.Messages.Detail.Button.LoadMore')}}</Button>
					</Row>
				</Col>
			</Row>
		</Card>
	</section>
</template>

<script>
import pilotProfilePlaceholder from '../../assets/imgs/pilot-card-placeholder.png'
import adminAvatar from '../../assets/imgs/aerolink-avatar.png'
import operatorAvatarPlaceholder from '../../assets/imgs/operator-avatar-placeholder.png'
import pilotAvatarPlaceholder from '../../assets/imgs/pilot-message-placeholder.png'
import Bus from '../../bus'
import * as Api from '../../api'
import { errorHandler, formatLocalTime, formatUTCDate, formatDurationFromNow, timeout, generateImgUrl, getGeoLocation, getAirport, getAircraftType, getArp } from '../../utils'
import { Enum } from '../../models'
import config from '../../config/config'

export default {
	data() {
		return {
			pilotProfilePlaceholder,
			adminAvatar,
			operatorAvatarPlaceholder,
			pilotAvatarPlaceholder,

			breadcrumb: {
				type: '',
				name: '',
				path: '',
			},
			Enum,
			type: 1,
			referenceId: 0,
			editingContent: '',
			order: {
				status: null,
				startTime: null,
				endTime: null,
				startAirportId: null,
				endAirportId: null,
				aircraftTypeId: null,
				arpId: null,
			},
			pilot: {
				photoUrl: '',
				firstName: '-',
				lastName: '-',
				staffNumber: '-',
				location: '-',
				lastUpdateTime: null,
			},
			operator: {
				avatarUrl: '',
			},
			messages: [],
			to: null,
			next: null,
			pagesize: 10,
			isRecentMessageListLoading: false,
			isOrderDetailLoading: false,
			isOperatorAvatarLoading: false,
			isLoadMoreDisabled: true,
			isLoadMoreLoading: false,
			interval: config.fetchMessageInterval,
			isAlive: true,
			status: Enum.OrderStatus,
			messageSender: Enum.MessageSender,
		}
	},
	mounted() {
		this.initPage()
	},
	beforeDestroy() {
		this.isAlive = false
	},
	methods: {
		onClickLoadMore() {
			this.fetchHistoricalMessageList()
		},
		onClickSend() {
			this.sendMessage()
		},
		onClickViewOrderDetail() {
			if (this.type === Enum.MessageType.Order) {
				const path = `/orders/${this.referenceId}`
				this.$router.push(path)
			}
		},
		generateImgUrl(imgUrl, placeholder) {
			return generateImgUrl(imgUrl, placeholder)
		},
		formatLocalTime(time) {
			if (time) return formatLocalTime(time)
			return ' - '
		},
		formatUTCDate(time, type) {
			if (time) return formatUTCDate(time, type)
			return ' - '
		},
		formatSender(sender) {
			switch (sender) {
			case Enum.MessageSender.System: return 'System'
			case Enum.MessageSender.Operator: return 'Me'
			case Enum.MessageSender.Pilot: return 'Pilot'
			case Enum.MessageSender.Admin: return 'Admin'
			default: return ''
			}
		},
		formatMessage(messageType, content) {
			switch (messageType) {
			case Enum.MessageContentType.Text: return content
			default: return content
			}
		},
		generateBreadcrumb() {
			const breadcrumbs = [
				{ name: this.$t('messages.Messages.Breadcrumb.Messages'), path: '/messages' },
				{ name: this.breadcrumb.type, path: '' },
				{ name: this.breadcrumb.name, path: this.breadcrumb.path },
			]
			Bus.$emit('updateBreadcrumbs', breadcrumbs)
		},
		initPage() {
			this.type = parseInt(this.$route.params.type, 10)
			this.referenceId = parseInt(this.$route.params.referenceId, 10)
			this.fetchRecentMessageList()
			switch (this.type) {
			case Enum.MessageType.Order:
				this.fetchOrderDetail()
				break
			case Enum.MessageType.PilotAdmin:
				this.fetchPilotProfile()
				break
			case Enum.MessageType.OperatorAdmin:
				this.fetchOperatorProfile()
				break
			default:
			}
		},
		async fetchOrderDetail() {
			try {
				this.breadcrumb = {
					type: this.$t('messages.Messages.Detail.Breadcrumb.Order'),
					name: `${this.referenceId}`,
					path: `/messages/${Enum.MessageType.Order}/${this.referenceId}`,
				}
				this.generateBreadcrumb()
				this.isOrderDetailLoading = true
				const orderRes = await Api.fetchOrderDetail(this.referenceId)
				const order = {
					status: orderRes.status || null,
					startTime: orderRes.startTime || null,
					endTime: orderRes.endTime || null,
					startAirportId: orderRes.startAirportId || null,
					endAirportId: orderRes.endAirportId || null,
					aircraftTypeId: orderRes.aircraftTypeId || null,
					arpId: orderRes.arpId || null,
				}
				const pilotRes = await Api.fetchPilotDetail(orderRes.pilotId)
				const pilot = {
					photoUrl: pilotRes.photoUrl || '',
					firstName: pilotRes.firstName || '-',
					lastName: pilotRes.lastName || '-',
					staffNumber: pilotRes.staffNumber || '-',
					lastUpdateTime: pilotRes.lastLocationTime || null,
				}
				const operatorRes = await Api.fetchOperatorDetail(orderRes.operatorId)
				const operator = {
					avatarUrl: operatorRes.avatarUrl || '',
				}
				this.order = order
				this.pilot = pilot
				this.operator = operator
				this.isOrderDetailLoading = false
				this.setPilotLocation()
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isOrderDetailLoading = false
			}
		},
		async setPilotLocation() {
			const location = await getGeoLocation(this.pilot.latitude, this.pilot.longitude)
			this.$set(this.pilot, 'location', location)
		},
		async fetchOperatorProfile() {
			try {
				this.isOperatorAvatarLoading = true
				const operatorRes = await Api.fetchOperatorDetail(this.referenceId)
				const operator = {
					avatarUrl: operatorRes.avatarUrl || '',
					nickname: operatorRes.nickname || '-',
				}
				this.operator = operator
				this.breadcrumb = {
					type: this.$t('messages.Messages.Detail.Breadcrumb.Operator'),
					name: `${this.operator.nickname}`,
					path: `/messages/${Enum.MessageType.OperatorAdmin}/${this.referenceId}`,
				}
				this.generateBreadcrumb()
				this.isOperatorAvatarLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isOperatorAvatarLoading = false
			}
		},
		async fetchPilotProfile() {
			try {
				this.isPilotAvatarLoading = true
				const pilotRes = await Api.fetchPilotDetail(this.referenceId)
				const pilot = {
					photoUrl: pilotRes.photoUrl || '',
					firstName: pilotRes.firstName || '-',
					lastName: pilotRes.lastName || '-',
				}
				this.pilot = pilot
				this.breadcrumb = {
					type: this.$t('messages.Messages.Detail.Breadcrumb.Pilot'),
					name: `${this.pilot.firstName} ${this.pilot.lastName}`,
					path: `/messages/${Enum.MessageType.PilotAdmin}/${this.referenceId}`,
				}
				this.generateBreadcrumb()
				this.isPilotAvatarLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isPilotAvatarLoading = false
			}
		},
		async fetchRecentMessageList() {
			try {
				// BUG: this is just for temp use, use bus to emit messages between page
				this.isRecentMessageListLoading = true
				if (!this.type || !this.referenceId) throw new Error('no type or reference id')
				this.messages = await Api.fetchRecentMessageList(this.type, this.referenceId)
				if (this.messages.length > 0) {
					this.to = this.messages[0].id
					this.next = this.messages[this.messages.length - 1].id
					this.isLoadMoreDisabled = false
				}
				this.fetchNewMessageList()
				this.isRecentMessageListLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isRecentMessageListLoading = false
			}
		},
		async fetchHistoricalMessageList() {
			try {
				this.isLoadMoreLoading = true
				const messages = await Api.fetchHistoricalMessageList(this.type, this.referenceId, this.next, this.pagesize)
				if (this.messages.length > 0) {
					this.messages = this.messages.concat(messages)
					this.next = this.messages[this.messages.length - 1].id
					this.isLoadMoreLoading = false
					if (messages.length < this.pagesize) {
						this.isLoadMoreDisabled = true
					}
				}
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isLoadMoreLoading = false
			}
		},
		async fetchNewMessageList() {
			try {
				const messages = await Api.fetchNewMessageList(this.type, this.referenceId, this.to)
				if (messages.length > 0) {
					console.log(messages)
					const newMessages = messages.filter((message) => {
						const index = this.messages.findIndex(item => message.id === item.id)
						return index === -1
					})
					this.messages = newMessages.concat(this.messages)
					this.to = messages[0].id
				}
				await timeout(this.interval)
				if (this.isAlive === true) {
					this.fetchNewMessageList()
				}
			} catch (error) {
				errorHandler(error.code, error.message, this)
				await timeout(this.interval)
				if (this.isAlive === true) {
					this.fetchNewMessageList()
				}
			}
		},
		async sendMessage() {
			try {
				if (!this.editingContent || !this.editingContent.trim()) {
					// TODO: client error type & localization
					throw new Error('Can not send empty message')
				}
				const content = this.editingContent
				this.editingContent = ''
				const message = await Api.sendMessage(this.type, this.referenceId, Enum.MessageContentType.Text, content)
				console.log(message)
				const msg = this.messages
				msg.unshift(message)
				this.messages = msg
				this.to = message.id
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
	},
	computed: {
		isSpinVisible() {
			if (this.type === Enum.MessageType.Order && (this.isRecentMessageListLoading || this.isOrderDetailLoading)) return true
			else if (this.type === Enum.MessageType.OperatorAdmin && this.isRecentMessageListLoading) return true
			return false
		},
		startAirport() {
			if (this.order.startAirportId) return getAirport(this.order.startAirportId, 'middle')
			return 'not exist'
		},
		endAirport() {
			if (this.order.endAirportId) return getAirport(this.order.endAirportId, 'middle')
			return 'not exist'
		},
		aircraftType() {
			if (this.order.aircraftTypeId) return getAircraftType(this.order.aircraftTypeId, 'middle')
			return 'not exist'
		},
		arp() {
			if (this.order.arpId) return getArp(this.order.arpId, 'max')
			return 'not exist'
		},
		currentLocation() {
			if (this.order.pilot.latitude && this.order.pilot.longitude) return `${this.order.pilot.latitude}, ${this.order.pilot.longitude}`
			return '-'
		},
		lastLocationTime() {
			return formatDurationFromNow(this.pilot.lastUpdateTime)
		},
		avatarUrl() {
			const user = JSON.parse(sessionStorage.getItem('userProfile'))
			return user.avatarUrl
		},
	},
}
</script>

<style lang="scss">
#message-detail {
	height: 100%;
	$content-header-height: 50px;
	.content-body{
		height: auto;
		min-height: 100%;
		$margin-bottom: 20px;
		margin-bottom: $margin-bottom;
		.order-info-col {
			padding: 20px;
			$border-style: 1px solid rgba(204,204,204,0.5);
			border-right: $border-style;
			.order-info-div{
				padding-bottom: 10px;
				margin-top: 10px;
				border: $border-style {
					left: 0;
					right: 0;
				}
			}
		}
		.message-col {
			padding: 20px;
		}
		.order-image {
			width: 100%;
			height: auto;
			max-width: 200px;
		}
		.order-name {
			font-size: 18px;
			font-weight: bold;
		}
		.order-info-title {
			font-size: 13px;
			color: #666;
			padding-top: 10px;
		}
		.order-info-content {
			font-size: 15px;
			color: #444;
		}
		.order-info-remark{
			font-size: 13px;
			color: #666;
		}
		.order-info-link{
			margin-top: 20px;
		}
		.message-avatar-col {
			padding-left: 20px;
		}
		.message-avatar {
			width: 60px;
			height: 60px;
			border-radius: 30px;
		}
		.bread-crumb {
			margin-left: 20px;
		}
		.message-send-div {
			background-color: #ececea;
			padding: 10px;
		}
		.message-content-div {
			padding: 20px;
			border: 1px #eee solid;
		}
		.message-item-row {
			margin-top: 39px;
			margin-bottom: 39px;
		}
		.message-content {
			font-size: 15px;
		}
		.message-content-time {
			color: #dfdfdd;
			font-size: 13px;
		}
		.message-system {
			border-top: 1px #ccc solid;
			color: #3d3d3d;
			padding-top: 5px;
			text-align: center;
		}
	}
}

</style>
