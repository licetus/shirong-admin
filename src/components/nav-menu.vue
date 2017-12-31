<template>
	<section id="container">
		<!-- topbar -->
		<div class="top-bar">
			<Menu class="navigation" mode="horizontal" theme="dark" :active-name="activeName" @on-select="onRouter">
				<Row type="flex" justify="space-between">
					<!-- main menu -->
					<Col :span="14">
						<Row type="flex" justify="space-between" align="middle">
							<Col :xs="0" :sm="0" :md="6" :lg="8">
								<Menu-item name="">
									<Row type="flex" align="middle">
										<ImageControl class="nav-logo" :src="navLogo" :default="navLogo"></ImageControl>
									</Row>
								</Menu-item>
							</Col>
							<!-- menu -->
							<Col :xs="24" :sm="24" :md="18" :lg="16">
								<template v-for="(item, index) in $router.options.routes[2].children" v-if="item.main">
									<Submenu :name="item.path" v-if="!item.leaf && (!item.auth || (item.auth && role === Enum.RoleType.Superadmin))">
										<template slot="title">
											{{ $t(`messages.NavMenu.${item.name}`) }}
										</template>
										<Menu-item v-for="child in item.children" :key="item.id" :name="child.path">
											{{$t(`messages.NavMenu.${child.name}`)}}
										</Menu-item>
									</Submenu>
									<Menu-item v-if="item.leaf && (!item.auth || (item.auth && role === Enum.RoleType.Superadmin))" :name="item.path">
										{{$t(`messages.NavMenu.${item.name}`)}}
									</Menu-item>
								</template>
							</Col>
						</Row>
					</Col>
					<!-- sub menu -->
					<Col :span="10">
						<Row type="flex" justify="end" align="middle">
							<Poptip v-model="notification.isPopVisible" placement="bottom" width="360" :transfer="true">
								<Button class="nav-button" type="text" @click="onClickNotification" :disabled="notification.isLoading || notification.isPopVisible">
									<Badge :dot="notification.hasNew">
										<Icon class="notification-icon" type="ios-bell-outline" size="24"></Icon>
									</Badge>
									<span class="notification-text">
										{{$t('messages.NavMenu.Notifications')}}
									</span>
								</Button>
								<div slot="content">
									<NotificationCard
										title="Messages"
										:messages="notification.messages"
										:count="notification.messageCount"
										@on-view="onClickViewMessages"
										@on-message="hideNotificationPop()"
										message>
									</NotificationCard>
									<NotificationCard
										title="Notifications"
										:messages="notification.notifications"
										:count="notification.notificationCount"
										@on-view="onClickViewNotifications"
										@on-message="hideNotificationPop()"
										notification>
									</NotificationCard>
								</div>
							</Poptip>
							<template v-for="(item, index) in $router.options.routes[2].children" v-if="item.sub">
								<Submenu :name="item.path" v-if="!item.leaf && (!item.auth || (item.auth && role === Enum.RoleType.Superadmin))">
									<template slot="title">
										{{ $t(`messages.NavMenu.${item.name}`) }}
									</template>
									<Menu-item v-for="child in item.children" :key="item.id" :name="child.path">
										{{ $t(`messages.NavMenu.${child.name}`) }}
									</Menu-item>
								</Submenu>
								<Menu-item v-if="item.leaf && (!item.auth || (item.auth && role === Enum.RoleType.Superadmin))" :name="item.path">
									{{ $t(`messages.NavMenu.${item.name}`) }}
								</Menu-item>
							</template>
							<Menu-item name="logout">
								<span class="navigation-item">
									{{$t('messages.Public.Button.Logout')}}
								</span>
							</Menu-item>
							<Menu-item name="/profile">
								<Row type="flex" align="middle">
									<Avatar class="nav-avatar" :src="avatarUrl"></Avatar>
								</Row>
							</Menu-item>
						</Row>
					</Col>
				</Row>
			</Menu>
		</div>

		<!-- <div class="sub-bar-background"></div> -->

		<div class="content">
			<div class="content-inner">
				<div class="content-header">
					<Breadcrumb>
						<BreadcrumbItem v-if="breadcrumbs.length > 0" v-for="(item, index) of breadcrumbs" :href="item.path" :key="index">{{item.name}}</BreadcrumbItem>
					</Breadcrumb>
				</div>
				<div class="content-body">
					<router-view></router-view>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import navLogo from '../../src/assets/imgs/nav-logo.png'
import avatarPlaceholder from '..//assets/imgs/aerolink-avatar.png'
import * as Api from '../api'
import Bus from '../bus'
import { errorHandler, generateImgUrl, toUpperCaseInitial, timeout } from '../utils'
import config from '../config/config'
import { Enum } from '../models'


export default {
	data() {
		return {
			Enum,
			navLogo,
			activeName: '',
			breadcrumbs: [],

			user: {
				nickname: '',
				avatarUrl: '',
			},

			role: Enum.RoleType.Admin,

			notification: {
				interval: config.fetchMessageInterval,
				hasNew: false,
				isPopVisible: false,
				isLoading: false,
				messageCount: 0,
				messages: [],
				notificationCount: 0,
				notifications: [],
			},
		}
	},
	watch: {
	},
	computed: {
		avatarUrl() {
			const imgUrl = this.user.avatarUrl
			return generateImgUrl(imgUrl, avatarPlaceholder)
		},
	},
	methods: {
		onSelectLang(name) {
			localStorage.lang = name
			location.reload()
		},

		onRouter(name) {
			if (name[0] === '/') {
				this.$router.push(name)
			} else {
				switch (name) {
				case 'notification':
					break
				case 'logout':
					this.onClickLogout()
					break
				default:
				}
			}
		},

		onClickLogout() {
			this.$Modal.confirm({
				title: this.$t('messages.NavMenu.Modal.Logout.Title'),
				content: this.$t('messages.NavMenu.Modal.Logout.Content'),
				onOk: () => this.logout(),
			})
		},

		onClickAvatar() {
			this.viewProfile()
		},

		generateBreadcrumb(fullPath) {
			const pathArray = fullPath.split('/').slice(1).map((item) => {
				const i = item.indexOf('?')
				if (i === -1) return item
				return item.slice(0, i)
			})
			const tempArray = pathArray.concat()
			const names = pathArray.concat().map(toUpperCaseInitial)
			let paths = []
			pathArray.forEach(() => {
				paths.push(tempArray.concat())
				tempArray.pop()
			})
			paths = paths.reverse().map((arr) => {
				const path = arr.reduce((parent, child) => {
					if (pathArray.length > 1) return `${parent}/${child}`
					return `/${parent}`
				})
				return `/${path}`
			})
			const breadcrumbs = []
			pathArray.forEach(() => {
				const breadcrumb = {
					name: names.shift(),
					path: paths.shift(),
				}
				breadcrumbs.push(breadcrumb)
			})
			this.breadcrumbs = breadcrumbs
		},
		viewProfile() {
			this.$router.push('/profile')
		},
		logout() {
			sessionStorage.removeItem('userProfile')
			sessionStorage.removeItem('role')
			sessionStorage.removeItem('token')
			this.$router.push('/login')
		},

		getUser() {
			const user = JSON.parse(sessionStorage.getItem('userProfile'))
			this.user = user
		},
		getRole() {
			const role = parseInt(sessionStorage.getItem('role'), 10)
			this.role = role
		},

		onClickNotification() {
			this.fetchNotificationList()
			this.showNotificationPop()
		},
		showNotificationPop() {
			this.notification.isPopVisible = true
		},
		hideNotificationPop() {
			this.notification.isPopVisible = false
		},
		onClickViewMessages() {
			this.$router.push('/messages')
			this.hideNotificationPop()
		},
		onClickViewNotifications() {
			this.$router.push('/notifications')
			this.hideNotificationPop()
		},
		async fetchHasNewNotification() {
			try {
				if (this.$route.fullPath !== '/login') {
					const res = await Api.fetchHasNewNotification()
					this.notification.hasNew = res
					await timeout(this.notification.interval)
					this.fetchHasNewNotification()
				}
			} catch (error) {
				errorHandler(error.code, error.message, this)
				if (this.$route.fullPath !== '/login') {
					await timeout(this.notification.interval)
					this.fetchHasNewNotification()
				}
			}
		},
		async fetchNotificationList() {
			try {
				this.notification.isLoading = true
				const res = await Api.fetchNotificationOverview()
				this.notification.messageCount = res.unreadMessagesCount ? res.unreadMessagesCount : 0
				this.notification.messages = res.unreadMessages ? res.unreadMessages : []
				this.notification.notificationCount = res.unreadNotificationsCount ? res.unreadNotificationsCount : 0
				this.notification.notifications = res.unreadNotifications ? res.unreadNotifications : []
				this.notification.isLoading = false
			} catch (error) {
				errorHandler(error.code, error.message, this)
				this.notification.isLoading = false
			}
		},

		initPage() {
			this.getUser()
			this.getRole()
			// this.generateBreadcrumb(this.$route.fullPath)
			this.fetchHasNewNotification()
		},
	},
	created() {
		Bus.$on('updateBreadcrumbs', (breadcrumbs) => {
			this.breadcrumbs = breadcrumbs
		})
	},
	mounted() {
		this.initPage()
		console.log(this.$router)
	},
}
</script>

<style lang="scss">
@import '../styles/theme.scss';
::-webkit-scrollbar
{
	display: none;
}
.ivu-select-item {
	white-space: normal;
}
.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-horizontal .ivu-menu-submenu {
	padding: $sub-menu-padding;
}
.ivu-menu-horizontal {
		height: $menu-height;
		line-height: $menu-height;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu {
	font-size: $menu-font-size;
	font-weight: $menu-font-weight;
}
.ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-item:hover, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu-active, .ivu-menu-dark.ivu-menu-horizontal .ivu-menu-submenu:hover, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-item, .ivu-menu-primary.ivu-menu-horizontal .ivu-menu-submenu {
	color: $menu-item-active-color;
}
#container {
	.top-bar {
		position: fixed;
		top: 0px;
		right: 0px;
		left: 0px;
		height: $menu-height;
		min-width: $min-width;
		.navigation {
			padding: $menu-padding;
			min-width: $min-width;
			.nav-logo {
				height: $menu-height;
				width: auto;
			}
			.nav-button {
				color: $menu-item-color;
				font-size: $menu-font-size;
				font-weight: $menu-font-weight;
				.notification-text {
					margin-left: 10px;
				}
				.notification-text:hover {
					color: $menu-item-active-color;
				}
			}
		}
	}
	.content {
		position: absolute;
		top: $menu-height;
		left: 0px;
		right: 0px;
		bottom: 0px;
		padding: $content-padding;
		overflow: auto;
		background-color: $background-color;
		.content-inner {
			margin: 0 auto;
			min-width: $min-width;
			max-width: $max-width;
			width: 100%;
			height: 100%;
			.content-header {
				height: $content-header-height;
				.ivu-breadcrumb {
					padding-top: 10px;
					height: $breadcrumb-height;
					line-height: $breadcrumb-height;
					font-size: $breadcrumb-font-size;
					span:last-child {
						color: $primary-text-color;
					}
				}
			}
		}
		.content-body {
			width: 100%;
			min-height: calc(100% - #{$content-header-height});
		}
	}
}
.ivu-poptip-body{
	padding: 0;
}

</style>
