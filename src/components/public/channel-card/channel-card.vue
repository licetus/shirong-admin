<template>
		<Row class="channel-item" type="flex" align="middle">
			<Col :span="1">
				<Row type="flex" justify="start">
					<div class="channel-badge" v-show="channel.hasUnreadMessage"></div>
				</Row>
			</Col>
			<Col :span="3" class="message-avatar-col">
					<ImageControl class="channel-avatar" :src="photoUrl" :default="avatarPlaceholder"/>
			</Col>
			<Col :span="8">
				<p>{{displayName}}</p>
				<p>{{formatLocalTime(channel.recentMessage.createTime)}} </p>
			</Col>
			<Col :span="12">
				<p class="message-content"><a href="javascript:void(0);" @click.prevent="onClickChannel">{{channel.recentMessage.content}}</a></p>
			</Col>
		</Row>
</template>

<script>
import avatarPlaceholder from '../../../assets/imgs/avatar-placeholder.png'
import pilotAvatarPlaceholder from '../../../assets/imgs/pilot-message-placeholder.png'
import operatorAvatarPlaceholder from '../../../assets/imgs/operator-avatar-placeholder.png'
import orderIcon from '../../../../src/assets/imgs/order-icon.png'
import config from '../../../config/config'
import { formatLocalTime, generateImgUrl } from '../../../utils'
import { Enum } from '../../../models'

export default {
	name: 'channel-card',
	props: {
		channel: {
			referenceId: Number,
			hasUnreadMessage: Boolean,
			pilot: {
				firstName: String,
				lastName: String,
				photoUrl: String,
			},
			recentMessage: {
				id: Number,
				sender: Number,
				messageType: Number,
				content: String,
			},
		},
	},
	data() {
		return {
			config,
			avatarPlaceholder,
			pilotAvatarPlaceholder,
			operatorAvatarPlaceholder,
			imgStyle: '',
			radius: 15,
			brightness: 0.7,
			isButtonShown: false,
		}
	},
	methods: {
		onClickChannel() {
			const path = `/messages/${this.channel.type}/${this.channel.referenceId}`
			this.$router.push(path)
		},
		formatLocalTime(date) {
			return formatLocalTime(date)
		},
	},
	computed: {
		photoUrl() {
			switch (this.channel.type) {
			case Enum.MessageType.Order:
				return orderIcon
			case Enum.MessageType.PilotAdmin:
				return generateImgUrl(this.channel.pilot.photoUrl, pilotAvatarPlaceholder)
			case Enum.MessageType.OperatorAdmin:
				return generateImgUrl(this.channel.operator.avatarUrl, operatorAvatarPlaceholder)
			default:
			}
			return avatarPlaceholder
		},
		displayName() {
			switch (this.channel.type) {
			case Enum.MessageType.Order:
				return `Order: ${this.channel.referenceId}`
			case Enum.MessageType.PilotAdmin:
				return `${this.channel.pilot.firstName} ${this.channel.pilot.lastName}`
			case Enum.MessageType.OperatorAdmin:
				return `${this.channel.operator.nickname}`
			default:
			}
			return '-'
		},
	},
	created() {},
	mounted() {},
}
</script>

<style lang="scss">
.channel-item {
	border-top: 1px #ccc solid;
	padding: 20px;
	.channel-avatar {
		display: block;
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}
	.channel-unread-message {
		width: 6px;
		height: 6px;
		display: block;
	}
	.channel-badge {
		background-color: #0457A2;
		width: 6px;
		height: 6px;
		border-radius: 3px;
	}
	.message-content{
		margin: 10px 0;
		a {
			color: black;
		}
	}
}
</style>
