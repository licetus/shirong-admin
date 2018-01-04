export function Loan() {
	this.id = null
	this.status = null
	this.type = null
	this.debtorId = null
	this.agentId = null
	this.amount = 0
	this.interest = 0
	this.termType = null
	this.repaymentWay = null
	this.remark = '-'
	this.approvalStatus = null
	this.createTime = null
	this.lastUpdateTime = null
	// car
	this.sub = {
		id: null,
		carBrand: '-',
		purchasePrice: 0,
		milage: 0,
		evaluatePrice: 0,
		carFrontImageUrl: '',
		carBackImageUrl: '',
		carMilageImageUrl: '',
		carInsideImageUrl: '',
		vehicleLicenseImageUrl: '',
		inspectionLicenseImageUrl: '',
	}
}

export function LoanComment() {
	this.id = null
	this.loanId = null
	this.adminId = null
	this.content = '-'
	this.createTime = null
	this.lastUpdateTime = null
}

export function Product() {
	this.id = null
	this.loanId = null
	this.status = null
	// business
	this.isOnSale = false
	this.startInterestTime = null
	this.publishTime = null
	// profile
	this.name = '-'
	this.remark = '-'
	this.rankingScore = 0
	this.tagId = null
	this.createTime = null
	this.lastUpdateTime = null
	// finance
	this.amount = 0
	this.interestRateBase = 0
	this.interestRateDelta = 0
	this.minInvestment = 0
	this.currentInvestment = 0
	this.termType = null
	this.interestWay = null
}

export function Debtor() {
	// profile
	this.id = null
	this.realName = '-'
	this.gender = null
	this.primaryNumber = '-'
	this.alternativeNumber = '-'
	this.isCarOwner = false
	// id card
	this.idNumber = '-'
	this.frontImageUrl = ''
	this.frontBlurImageUrl = ''
	this.backImageUrl = ''
	this.backBlurImaegUrl = ''
	this.location = '-'
	// credit info
	this.workPlace = '-'
	this.address = '-'
	this.education = '-'
	this.yearlyStableIncome = 0
	this.monthlyStableIncome = 0
	this.hasHouse = false
}
