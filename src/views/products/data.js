export default {
	product: {
		id: null,
		status: null,
		// business
		isOnSale: false,
		publishTime: null,
		// profile
		type: null,
		name: '-',
		description: '-',
		rank: 0,
		debtorId: null,
		tagId: null,
		createTime: null,
		lastUpdateTime: null,
		// finance
		loanAmount: 0,
		termType: null,
		interestRateBase: 0,
		interestRateDelta: 0,
		minInvestment: 0,
		currentInvestment: 0,
		interestWay: null,
		repayType: null,
		// approval
		approval: [
			{
				id: null,
				approverId: null,
				content: '-',
				comment: '-',
				createTime: null,
				lastUpdateTime: null,
			},
		],
	},
	testProduct: {
		id: 1000000000,
		status: 4,
		// business
		isOnSale: true,
		publishTime: '2018-1-1',
		// profile
		type: 2,
		name: '布加迪威龙',
		description: '82年出厂布加迪威龙',
		rank: 1.85,
		debtorId: 1000000000,
		tagId: 1,
		createTime: '2018-1-1',
		lastUpdateTime: '2018-1-1',
		// finance
		loanAmount: 100000,
		termType: 1,
		interestRateBase: 0.12,
		interestRateDelta: 0.03,
		minInvestment: 100,
		currentInvestment: 500000,
		interestWay: 1,
		repayType: 1,
		// approval
		approval: [
			{
				id: 1000000000,
				approverId: 1000000000,
				content: '看过了，是正品，很纯正',
				comment: '开一圈再说',
				createTime: '2018-1-1',
				lastUpdateTime: '2018-1-1',
			},
		],
	},
}
