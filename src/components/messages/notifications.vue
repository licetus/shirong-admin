<template>
	<section id="notification">
		<Spin v-show="isNotificationListLoading" size="large" fix></Spin>
		<Card class="content-body" v-show="!isNotificationListLoading" :padding="30" :bordered="false" dis-hover>
			<NotificationCard
				:title="$t('messages.Messages.Notifications')"
				:messages="notifications"
				:count="notifications.length"
				@on-over="onOverMessage"
				notification
				list>
			</NotificationCard>
			<Button type="text" @click="onClickLoadMore" :loading="isLoadMoreLoading" :disabled="isLoadMoreDisabled">
				{{$t('messages.Messages.Button.LoadMore')}}
			</Button>
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
			notifications: [],
			total: 0,
			pagesize: 10,
			next: null,
			isNotificationListLoading: false,
			isLoadMoreDisabled: false,
			isLoadMoreLoading: false,
		}
	},
	mounted() {
		this.initPage()
	},
	methods: {
		onOverMessage(index) {
			if (this.notifications[index].isUnread === true) this.readNotification(index)
		},
		onClickLoadMore() {
			this.fetchNotificationList()
		},

		async fetchNotificationList() {
			try {
				this.generateBreadcrumb()
				if (this.notifications.length === 0) this.isNotificationListLoading = true
				else this.isLoadMoreLoading = true
				const res = await Api.fetchNotificationList(this.pagesize, this.next)
				if (res && res.length > 0) {
					this.next = res[res.length - 1].id
					this.notifications = this.notifications.concat(res)
				} else if (this.notifications.length > 0) {
					this.isLoadMoreDisabled = true
					this.$Message.info(this.$t('messages.Messages.Message.NoData'))
				}
				this.isNotificationListLoading = false
				this.isLoadMoreLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.isNotificationListLoading = false
				this.isLoadMoreLoading = false
			}
		},
		async readNotification(index) {
			try {
				const id = this.notifications[index].id
				await Api.readNotification(id)
				this.notifications[index].isUnread = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
			}
		},
		generateBreadcrumb() {
			this.breadcrumbs = [
				{ name: this.$t('messages.Messages.Breadcrumb.Notifications'), path: '/notifications' },
			]
			Bus.$emit('updateBreadcrumbs', this.breadcrumbs)
		},
		initPage() {
			this.next = null
			this.fetchNotificationList()
		},
	},
}
</script>

<style lang="scss">
#notification {
	height: 100%;
	$content-header-height: 50px;
	.content-body{
		$margin-bottom: 20px;
		margin-bottom: $margin-bottom;
		min-height: calc(100% - #{$content-header-height} - #{$margin-bottom});
		.ivu-btn-text {
			font-size: 17px;
			color: #0380dd;
		}
	}
}
</style>
