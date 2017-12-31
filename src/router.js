import Login from './components/login.vue'
import NavMenu from './components/nav-menu.vue'
import NotFound from './components/not-found.vue'
import Business from './components/business/business.vue'
import BusinessModify from './components/business/business-modify.vue'
import Orders from './components/orders/orders.vue'
import OrderDetail from './components/orders/order-detail.vue'
import OrderModify from './components/orders/order-modify.vue'
import Pilots from './components/pilots/pilots.vue'
import PilotDetail from './components/pilots/pilot-detail.vue'
import PilotModify from './components/pilots/pilot-modify.vue'
import Operators from './components/operators/operators.vue'
import OperatorDetail from './components/operators/operator-detail.vue'
import OperatorModify from './components/operators/operator-modify.vue'
import Messages from './components/messages/messages.vue'
import MessageDetail from './components/messages/message-detail.vue'
import Notifications from './components/messages/notifications.vue'
import Profile from './components/profile/profile.vue'
import Settings from './components/settings/settings.vue'

const routers = [
	{
		path: '*',
		component: NotFound,
		hidden: true,
	},
	{
		path: '/login',
		component: Login,
		name: 'Login',
		hidden: true,
	},
	{
		path: '/',
		redirect: '/orders',
		component: NavMenu,
		name: '',
		children: [
			// { path: '/dashboard', component: Dashboard, name: 'Dashboard', leaf: true },
			{ path: '/business', component: Business, name: 'Business', leaf: true, main: true },
			{ path: '/business/modify', component: BusinessModify, name: 'BusinessModify' },
			{ path: '/orders', component: Orders, name: 'Orders', leaf: true, main: true },
			{ path: '/orders/:orderId', component: OrderDetail, name: 'OrderDetail' },
			{ path: '/orders/:orderId/modify', component: OrderModify, name: 'OrderModify' },
			{ path: '/pilots', component: Pilots, name: 'Pilots', leaf: true, main: true },
			{ path: '/pilots/:pilotId', component: PilotDetail, name: 'PilotDetail' },
			{ path: '/pilots/:pilotId/modify', component: PilotModify, name: 'PilotModify' },
			{ path: '/operators', component: Operators, name: 'Operators', leaf: true, main: true },
			{ path: '/operators/:operatorId', component: OperatorDetail, name: 'OperatorDetail' },
			{ path: '/operators/:operatorId/modify', component: OperatorModify, name: 'OperatorModify' },
			{ path: '/messages', component: Messages, name: 'Messages', leaf: true, main: true },
			{ path: '/messages/:type/:referenceId', component: MessageDetail, name: 'MessageDetail' },
			{ path: '/notifications', component: Notifications, name: 'Notifications' },
			{ path: '/settings', component: Settings, name: 'Settings', leaf: true, sub: true, auth: true },
			{ path: '/profile', component: Profile, name: 'Profile' },
		],
	},

]

export default routers
