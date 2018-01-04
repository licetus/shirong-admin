export function Product() {
	this.id = null
	this.status = null
	// business
	this.isOnSale = false
	this.publishTime = null
	// profile
	this.type = null
	this.name = '-'
	this.description = '-'
	this.rank = 0
	this.debtorId = null
	this.tagId = null
	this.createTime = null
	this.lastUpdateTime = null
	// finance
	this.loanAmount = 0
	this.termType = null
	this.interestRateBase = 0
	this.interestRateDelta = 0
	this.minInvestment = 0
	this.currentInvestment = 0
	this.interestWay = null
	this.repayType = null
	// approval
	this.approval = [
		{
			id: null,
			approverId: null,
			content: '-',
			comment: '-',
			createTime: null,
			lastUpdateTime: null,
		},
	]
}
