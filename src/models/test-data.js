export function Product() {
	this.id = 1000000000
	this.status = 4
	// business
	this.isOnSale = true
	this.publishTime = '2018-1-1'
	// profile
	this.type = 2
	this.name = '布加迪威龙'
	this.description = '82年出厂布加迪威龙'
	this.rank = 1.85
	this.debtorId = 1000000000
	this.tagId = 1
	this.createTime = '2018-1-1'
	this.lastUpdateTime = '2018-1-1'
	// finance
	this.loanAmount = 100000
	this.termType = 1
	this.interestRateBase = 0.12
	this.interestRateDelta = 0.03
	this.minInvestment = 100
	this.currentInvestment = 500000
	this.interestWay = 1
	this.repayType = 1
	// approval
	this.approval = [
		{
			id: 1000000000,
			approverId: 1000000000,
			content: '看过了，是正品，很纯正',
			comment: '开一圈再说',
			createTime: '2018-1-1',
			lastUpdateTime: '2018-1-1',
		},
	]
}
