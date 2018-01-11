export function Loan() {
	this.id = null
	this.status = null
	this.type = null
	this.debtorId = null
	this.agentId = null
	this.amount = 0
	this.interestRate = 0
	this.termType = null
	this.repaymentWay = null
	this.remark = ''
	this.approvalStatus = null
	this.createTime = null
	this.lastUpdateTime = null
}

export function Car() {
	this.id = null
	this.carBrand = ''
	this.purchasePrice = 0
	this.milage = 0
	this.evaluatePrice = 0
	this.carFrontImageUrl = ''
	this.carBackImageUrl = ''
	this.carMilageImageUrl = ''
	this.carInsideImageUrl = ''
	this.vehicleLicenseImageUrl = ''
	this.inspectionLicenseImageUrl = ''
}

export function LoanComment() {
	this.id = null
	this.loanId = null
	this.adminId = null
	this.content = ''
	this.createTime = null
	this.lastUpdateTime = null
}

export function Product() {
	this.id = null
	this.loanId = null
	this.status = null
	// business
	this.isOnSale = null
	this.startInterestTime = null
	this.publishTime = null
	// profile
	this.name = ''
	this.remark = ''
	this.rankingScore = 0
	this.tagId = null
	this.tag = ''
	this.tagColor = ''
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
	this.profile = {
		id: null,
		realName: '',
		gender: null,
		birthday: null,
		creatorId: null,
		primaryNumber: '',
		alternativeNumber: '',
		remark: '',
	}
	this.identify = {
		idNumber: '',
		frontImageUrl: '',
		frontBlurImageUrl: '',
		backImageUrl: '',
		backBlurImaegUrl: '',
		location: '',
	}
	this.credit = {
		workPlace: '',
		address: '',
		education: '',
		yearlyStableIncome: '',
		monthlyStableIncome: '',
		hasCar: null,
		hasHouse: null,
	}
}

export function Customer() {
	this.id = null
	this.accountType = null
	this.account = ''
	this.avatarUrl = ''
	this.isIdVerified = null
	this.realName = ''
	this.idCardNumber = ''
	this.vipLevel = null
	this.remark = ''
}
