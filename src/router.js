import Login from './components/login.vue'
import NavMenu from './components/nav-menu.vue'
import Dashboard from './components/dashboard.vue'
import Projects from './components/projects/projects.vue'
import ProjectDetail from './components/projects/project-detail.vue'
import Customers from './components/customers/customers.vue'
import CustomerDetail from './components/customers/customer-detail.vue'
import CustomerVerification from './components/customers/verification.vue'
import CustomerEvaluation from './components/customers/evaluation.vue'
import LoanDetail from './components/loan/loan-detail.vue'
import LoanVerification from './components/loan/verification.vue'
import LoanDelivery from './components/loan/delivery.vue'
import LoanRecycling from './components/loan/recycling.vue'
import Notification from './components/messages/notification.vue'
import Activity from './components/messages/activity.vue'
import Carousel from './components/messages/carousel.vue'
import Comments from './components/messages/comments.vue'
import Settings from './components/settings/settings.vue'
import Error403 from './components/error/403.vue'
import Error404 from './components/error/404.vue'
import Error500 from './components/error/500.vue'

const routers = [
	{
		path: '/',
		redirect: '/home',
		component: NavMenu,
		name: '',
		children: [
			{ path: '/home', component: Dashboard, name: 'dashboard' },
			{
				path: '/projects',
				component: Projects,
				name: 'projects',
				leaf: true,
				children: [
					{ path: ':projectId', component: ProjectDetail },
				],
			},
			{
				path: '/customers',
				component: Customers,
				name: 'customers',
				children: [
					{ path: ':customerId', component: CustomerDetail },
					{ path: 'verification', component: CustomerVerification, leaf: true },
					{ path: 'evaluation', component: CustomerEvaluation, leaf: true },
				],
			},
			{
				path: '/loan',
				name: 'loan',
				children: [
					{ path: ':loanId', component: LoanDetail },
					{ path: 'verification', component: LoanVerification, leaf: true },
					{ path: 'delivery', component: LoanDelivery, leaf: true },
					{ path: 'recycling', component: LoanRecycling, leaf: true },
				],
			},
			{
				path: '/messages',
				name: 'messages',
				leaf: true,
				children: [
					{ path: 'notification', component: Notification },
					{ path: 'activity', component: Activity },
					{ path: 'carousel', component: Carousel },
					{ path: 'comments', component: Comments },
				],
			},
			{ path: '/settings', component: Settings, name: 'Settings', leaf: true },
		],
	},
	{
		path: '/login',
		component: Login,
		name: 'Login',
	},
	{
		path: '/*',
		component: Error404,
	},
	{
		path: '/403',
		component: Error403,
	},
	{
		path: '/500',
		component: Error500,
	},

]

export default routers
