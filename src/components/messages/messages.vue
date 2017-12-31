<template>
	<section id="message">
		<Spin v-show="isLoading" size="large" fix></Spin>
		<Card class="content-body" v-show="!isLoading" :padding="30" :bordered="false" dis-hover>
			<p class="inbox-title">{{`${$t('messages.Messages.Inbox')} (${unreadCount})`}}</p>
			<div>
				<ChannelCard :channel="item" :key="index" v-for="(item, index) of channels"/>
			</div>
		</Card>
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
			channels: [],
		}
	},
	mounted() {
		this.initPage()
	},
	methods: {
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Messages.Breadcrumb.Messages'), path: '/messages' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.fetchChannels()
		},
		sortChannel() {
			if (this.channels.length > 0) {
				this.channels.sort((a, b) => b.recentMessage.createTime - a.recentMessage.createTime)
			}
		},
		async fetchChannels() {
			try {
				this.generateBreadcrumb()
				this.isLoading = true
				this.channels = await Api.fetchMessageList()
				this.sortChannel()
				this.isLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isLoading = false
			}
		},
	},
	computed: {
		unreadCount() {
			return this.channels.filter(item => item.hasUnreadMessage).length
		},
	},
}
</script>

<style lang="scss">
#message{
	height: 100%;
	.contact-support-div {
		position: absolute;
		right: 0;
		width: 20%;
		top: -50px;
	}
	.content-header {
		height: 50px;
		line-height: 50px;
		font-size: 18px;
		font-weight: bold;
		.contact-support{
			font-size: 16px;
			font-weight: 400;
			line-height: 50px;
		}
		.ivu-icon{
			color: #2d8cf0;
			margin-right: 10px;
		}
	}
	.content-body{
		min-height: 100%;
		margin-bottom: 20px;
		.inbox-title{
			font-size: 18px;
			font-weight: bold;
			color: #3d3d3d;
			margin-bottom: 10px;
		}
	}
}
</style>
