<template>
	<section class="notification-card">
		<Card :padding="0" :bordered="false" dis-hover>
			<template v-if="!list">
				<p class="notification-head" slot="title">{{`${$t(`messages.Messages.${title}`)} (${count})`}}</p>
				<a href="javascript:void(0);" @click.prevent="onClickViewAll" slot="extra">{{$t('messages.Messages.ViewAll')}}</a>
			</template>
			<div class="notifications">
				<div v-if="count === 0" class="notification-message">
					<p class="notification-placeholder">{{`${list ? $t('messages.Messages.Placeholder.NoData') : $t('messages.Messages.Placeholder.NoMoreData')}`}}</p>
				</div>
				<div v-else-if="count > 0" class="notification-message" v-for="(item, index) of messages" :key="index">
					<Row type="flex" justify="start" align="middle">
						<div class="notification-badge" v-show="list && item.isUnread"></div>
						<p :class="`notification-content${list ? '-list' : ''}${(list && !item.isUnread) ? '-read' : ''}`">
							<a href="javascript:void(0);" @click.prevent="onClickMessage(index)" @mouseover="onOverMessage(index)">
								<a class="order-id" herf="javascript:void(0);" @click.stop="onClickOrder(item.orderId, index)">{{`${item.orderId ? `${$t('messages.Public.NotificationCard.Order')} ${item.orderId}` : ''}`}}</a> {{item.content}}
							</a>
						</p>
					</Row>
					<p class="notification-remark">{{formatDurationFromNow(item.createTime)}}</p>
				</div>
			</div>
		</Card>
	</section>
</template>

<script>
import { Enum } from '../../../models'
import { formatDurationFromNow } from '../../../utils'

export default {
	name: 'notification-card',
	props: {
		title: String,
		count: {
			type: Number,
			default: 0,
		},
		messages: {
			type: Array,
		},
		message: {
			type: Boolean,
			default: false,
		},
		notification:
		{
			type: Boolean,
			default: false,
		},
		list: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
		}
	},
	methods: {
		onClickViewAll() {
			this.$emit('on-view')
		},
		onClickMessage(index) {
			if (this.message && !this.messages[index].placeholder) {
				console.log('@message')
				const messageType = this.messages[index].type
				const referenceId = this.messages[index].referenceId
				switch (messageType) {
				case Enum.MessageType.Order:
					this.$router.push(`/messages/1/${referenceId}`)
					break
				case Enum.MessageType.PilotAdmin:
					this.$router.push(`/messages/2/${referenceId}`)
					break
				case Enum.MessageType.OperatorAdmin:
					this.$router.push(`/messages/3/${referenceId}`)
					break
				default:
				}
				this.$emit('on-message')
			}	else if (this.notification && !this.messages[index].placeholder) {
				this.$router.push('/notifications')
				this.$emit('on-message', index)
			}
		},
		onOverMessage(index) {
			if (this.list) this.$emit('on-over', index)
		},
		onClickOrder(id, index) {
			console.log('order: ', id)
			if (this.list) this.$router.push(`/orders/${id}`)
			else this.onClickMessage(index)
		},
		formatDurationFromNow(timestamp) {
			return formatDurationFromNow(timestamp)
		},
	},
	computed: {
	},
	filter: {
	},
	created() {},
	mounted() {
		console.log(this.count, this.messages)
	},
}
</script>

<style lang="scss">
.notification-card {
	.ivu-card-head {
		background-color: #f8f8f8;
	}
	.notifications {
		$border-style: 1px solid #ededed;
		padding: 0px 16px;
		margin-top: -1px;
		border: $border-style {
			left: 0px;
			right: 0px;
		}
		.notification-message {
			padding: 8px 0px;
			margin-top: -1px;
			border-top: $border-style;
			.notification-placeholder {
				font-size: 15px;
				color: #9d9d9d;
			}
			.notification-badge {
				margin-right: 10px;
				background-color: red;
				width: 6px;
				height: 6px;
				border-radius: 3px;
			}
			.notification-content {
				font-size: 17px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				a {
					color: #3d3d3d;
				}
			}
			.notification-content-list {
				font-size: 17px;
				word-break: normal;
				a {
					color: #3d3d3d;
					a {
						color: #2e8cf0;
					}
				}
			}
			.notification-content-list-read {
				font-size: 17px;
				word-break: normal;
				a {
					color: #9d9d9d;
					a {
						color: #3d3d3d;
					}
				}
			}
			.notification-remark {
				font-size: 15px;
				color: #9d9d9d;
			}
		}
	}
}
</style>
