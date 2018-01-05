import Main from '../views/Main.vue'

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Login - 登录',
	},
	component: (resolve) => { require(['@/views/login.vue'], resolve) },
}

export const page404 = {
	path: '/*',
	name: 'error-404',
	meta: {
		title: '404-页面不存在',
	},
	component: (resolve) => { require(['@/views/error-page/404.vue'], resolve) },
}

export const page403 = {
	path: '/403',
	meta: {
		title: '403-权限不足',
	},
	name: 'error-403',
	component: (resolve) => { require(['@//views/error-page/403.vue'], resolve) },
}

export const page500 = {
	path: '/500',
	meta: {
		title: '500-服务端错误',
	},
	name: 'error-500',
	component: (resolve) => { require(['@/views/error-page/500.vue'], resolve) },
}

export const preview = {
	path: '/preview',
	name: 'preview',
	component: (resolve) => { require(['@/views/form/article-publish/preview.vue'], resolve) },
}

export const locking = {
	path: '/locking',
	name: 'locking',
	component: (resolve) => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve) },
}

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
	path: '/',
	name: 'otherRouter',
	redirect: '/home',
	component: Main,
	children: [
		{ path: 'home', title: { i18n: 'home' }, name: 'home_index', component: (resolve) => { require(['@/views/home/home.vue'], resolve) } },
		{ path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: (resolve) => { require(['@/views/own-space/own-space.vue'], resolve) } },
		{ path: 'order/:order_id', title: '订单详情', name: 'order-info', component: (resolve) => { require(['@/views/advanced-router/component/order-info.vue'], resolve) } }, // 用于展示动态路由
		{ path: 'shopping', title: '购物详情', name: 'shopping', component: (resolve) => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve) } }, // 用于展示带参路由
		{ path: 'message', title: '消息中心', name: 'message_index', component: (resolve) => { require(['@/views/message/message.vue'], resolve) } },
		{ path: '/customers/:customer_id(\\d+)', title: '客户详情', name: 'customer_detail', component: (resolve) => { require(['@/views/customers/detail.vue'], resolve) } },
		{ path: '/debtors/:debtor_id(\\d+)', title: '借款人详情', name: 'debtor_detail', component: (resolve) => { require(['@/views/debtors/detail.vue'], resolve) } },
		{ path: '/products/:product_id(\\d+)', title: '项目详情', name: 'product_detail', component: (resolve) => { require(['@/views/products/detail.vue'], resolve) } },
		{ path: '/loans/:loan_id(\\d+)', title: '贷款详情', name: 'loan_detail', component: (resolve) => { require(['@/views/loans/detail.vue'], resolve) } },
	],
}

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
	{
		path: '/customers',
		icon: 'ios-person',
		name: 'customers',
		title: '客户管理',
		component: Main,
		children: [
			{ path: 'index', title: '客户列表', name: 'customers_index', icon: '', component: (resolve) => { require(['@/views/customers/index.vue'], resolve) } },
			{ path: 'verification', title: '实名认证', name: 'customers_verification', icon: '', component: (resolve) => { require(['@/views/customers/verification.vue'], resolve) } },
			{ path: 'evaluation', title: '信用评估', name: 'customers_evaluation', icon: '', component: (resolve) => { require(['@/views/customers/evaluation.vue'], resolve) } },
		],
	},
	{
		path: '/debtors',
		icon: 'ios-person',
		name: 'debtors',
		title: '借款人管理',
		component: Main,
		children: [
			{ path: 'index', title: '借款人列表', name: 'debtors_index', icon: '', component: (resolve) => { require(['@/views/debtors/index.vue'], resolve) } },
			{ path: 'new', title: '新借款人', name: 'debtors_new', icon: '', component: (resolve) => { require(['@/views/debtors/detail.vue'], resolve) } },
			{ path: 'verification', title: '实名认证', name: 'debtors_verification', icon: '', component: (resolve) => { require(['@/views/debtors/verification.vue'], resolve) } },
			{ path: 'evaluation', title: '信用评估', name: 'debtors_evaluation', icon: '', component: (resolve) => { require(['@/views/debtors/evaluation.vue'], resolve) } },
		],
	},
	{
		path: '/products',
		icon: 'ios-paper-outline', // TODO: add icon
		name: 'products',
		title: '项目管理',
		component: Main,
		children: [
			{ path: 'index', title: '项目列表', name: 'products_index', icon: '', component: (resolve) => { require(['@/views/products/index.vue'], resolve) } },
		],
	},
	{
		path: '/loans',
		icon: 'card', // TODO: add icon
		name: 'loans',
		title: '贷款管理',
		component: Main,
		children: [
			{ path: 'new', title: '新增贷款', name: 'loans_new', icon: '', component: (resolve) => { require(['@/views/loans/new.vue'], resolve) } },
			{ path: 'verification', title: '贷款审核', name: 'loans_verification', icon: '', component: (resolve) => { require(['@/views/loans/verification.vue'], resolve) } },
			{ path: 'delivery', title: '贷款发放', name: 'loans_delivery', icon: '', component: (resolve) => { require(['@/views/loans/delivery.vue'], resolve) } },
			{ path: 'recycling', title: '贷款回收', name: 'loans_recycling', icon: '', component: (resolve) => { require(['@/views/loans/recycling.vue'], resolve) } },
		],
	},
	{
		path: '/messages',
		icon: 'image', // TODO: add icon
		name: 'messages',
		title: '信息管理',
		component: Main,
		children: [
			{ path: 'notification', title: '公告栏信息', name: 'messages_notification', icon: '', component: (resolve) => { require(['@/views/messages/notification.vue'], resolve) } },
			{ path: 'activity', title: '活动信息', name: 'messages_activity', icon: '', component: (resolve) => { require(['@/views/messages/activity.vue'], resolve) } },
			{ path: 'carousel', title: '轮播图', name: 'messages_carousel', icon: '', component: (resolve) => { require(['@/views/messages/carousel.vue'], resolve) } },
			{ path: 'comments', title: '用户评论', name: 'messages_comments', icon: '', component: (resolve) => { require(['@/views/messages/comments.vue'], resolve) } },
		],
	},
	{
		path: '/data',
		icon: 'stats-bars', // TODO: add icon
		name: 'data',
		title: '数据统计',
		component: Main,
		children: [
			{ path: 'transactions', title: '流水统计', name: 'data_transactions', icon: '', component: (resolve) => { require(['@/views/data/transactions.vue'], resolve) } },
			{ path: 'customers', title: '客户统计', name: 'data_customers', icon: '', component: (resolve) => { require(['@/views/data/customers.vue'], resolve) } },
			{ path: 'transaction', title: '产品统计', name: 'data_products', icon: '', component: (resolve) => { require(['@/views/data/products.vue'], resolve) } },
		],
	},
	{
		path: '/settings',
		icon: 'gear-a',
		name: 'settings',
		title: '设置',
		access: 1,
		component: Main,
		children: [
			{ path: 'index', title: '设置', name: 'settings_index', access: 1, component: (resolve) => { require(['@/views/settings/settings.vue'], resolve) } },
		],
	},
	{
		path: '/access',
		icon: 'key',
		name: 'access',
		title: '权限管理',
		component: Main,
		children: [
			{ path: 'index', title: '权限管理', name: 'access_index', component: (resolve) => { require(['@/views/access/access.vue'], resolve) } },
		],
	},
	{
		path: '/access-test',
		icon: 'lock-combination',
		title: '权限测试页',
		name: 'accesstest',
		access: 1,
		component: Main,
		children: [
			{ path: 'index', title: '权限测试页', name: 'accesstest_index', access: 1, component: (resolve) => { require(['@/views/access/access-test.vue'], resolve) } },
		],
	},
	{
		path: '/international',
		icon: 'earth',
		title: { i18n: 'international' },
		name: 'international',
		component: Main,
		children: [
			{ path: 'index', title: { i18n: 'international' }, name: 'international_index', component: (resolve) => { require(['@/views/international/international.vue'], resolve) } },
		],
	},
	{
		path: '/component',
		icon: 'social-buffer',
		name: 'component',
		title: '组件',
		component: Main,
		children: [
			{
				path: 'text-editor',
				icon: 'compose',
				name: 'text-editor',
				title: '富文本编辑器',
				component: (resolve) => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve) },
			},
			{
				path: 'md-editor',
				icon: 'pound',
				name: 'md-editor',
				title: 'Markdown编辑器',
				component: (resolve) => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve) },
			},
			{
				path: 'image-editor',
				icon: 'crop',
				name: 'image-editor',
				title: '图片预览编辑',
				component: (resolve) => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve) },
			},
			{
				path: 'draggable-list',
				icon: 'arrow-move',
				name: 'draggable-list',
				title: '可拖拽列表',
				component: (resolve) => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve) },
			},
			{
				path: 'area-linkage',
				icon: 'ios-more',
				name: 'area-linkage',
				title: '城市级联',
				component: (resolve) => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve) },
			},
			{
				path: 'file-upload',
				icon: 'android-upload',
				name: 'file-upload',
				title: '文件上传',
				component: (resolve) => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve) },
			},
			{
				path: 'count-to',
				icon: 'arrow-graph-up-right',
				name: 'count-to',
				title: '数字渐变',
				component: (resolve) => { require(['@/views/my-components/count-to/count-to.vue'], resolve) },
			},
			// {
			//	 path: 'clipboard-page',
			//	 icon: 'clipboard',
			//	 name: 'clipboard-page',
			//	 title: '一键复制',
			//	 component: (resolve) => { require(['@/views/my-components/clipboard/clipboard.vue'], resolve) },
			// },
		],
	},
	{
		path: '/form',
		icon: 'android-checkbox',
		name: 'form',
		title: '表单编辑',
		component: Main,
		children: [
			{ path: 'artical-publish', title: '文章发布', name: 'artical-publish', icon: 'compose', component: (resolve) => { require(['@/views/form/article-publish/article-publish.vue'], resolve) } },
			{ path: 'workflow', title: '工作流', name: 'workflow', icon: 'arrow-swap', component: (resolve) => { require(['@/views/form/work-flow/work-flow.vue'], resolve) } },
		],
	},
	// {
	//	 path: '/charts',
	//	 icon: 'ios-analytics',
	//	 name: 'charts',
	//	 title: '图表',
	//	 component: Main,
	//	 children: [
	//		 { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: (resolve) => { require('@/views/access/access.vue') },
	//		 { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: (resolve) => { require('@/views/access/access.vue') },

	//	 ]
	// },
	{
		path: '/tables',
		icon: 'ios-grid-view',
		name: 'tables',
		title: '表格',
		component: Main,
		children: [
			{ path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: (resolve) => { require(['@/views/tables/dragable-table.vue'], resolve) } },
			{ path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: (resolve) => { require(['@/views/tables/editable-table.vue'], resolve) } },
			{ path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: (resolve) => { require(['@/views/tables/searchable-table.vue'], resolve) } },
			{ path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: (resolve) => { require(['@/views/tables/exportable-table.vue'], resolve) } },
			{ path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: (resolve) => { require(['@/views/tables/table-to-image.vue'], resolve) } },
		],
	},
	{
		path: '/advanced-router',
		icon: 'ios-infinite',
		name: 'advanced-router',
		title: '高级路由',
		component: Main,
		children: [
			{ path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: (resolve) => { require(['@/views/advanced-router/mutative-router.vue'], resolve) } },
			{ path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: (resolve) => { require(['@/views/advanced-router/argument-page.vue'], resolve) } },
		],
	},
	{
		path: '/error-page',
		icon: 'android-sad',
		title: '错误页面',
		name: 'errorpage',
		component: Main,
		children: [
			{ path: 'index', title: '错误页面', name: 'errorpage_index', component: (resolve) => { require(['@/views/error-page/error-page.vue'], resolve) } },
		],
	},
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
	loginRouter,
	otherRouter,
	preview,
	locking,
	...appRouter,
	page500,
	page403,
	page404,
]
