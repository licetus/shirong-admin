export function Loan() {
	this.id = 1000000000
	this.status = 1
	this.type = 2
	this.debtorId = 1000000000
	this.agentId = 1000000000
	this.amount = 100000
	this.interest = 0.15
	this.termType = 3
	this.repaymentWay = 2
	this.remark = '借款人收入稳定'
	this.approvalStatus = 1
	this.createTime = '2018-1-1'
	this.lastUpdateTime = '2018-1-1'
	// car
	this.sub = {
		id: 1000000000,
		carBrand: '丰田卡罗拉',
		purchasePrice: 134800,
		milage: 6880,
		evaluatePrice: 90500,
		carFrontImageUrl: '',
		carBackImageUrl: '',
		carMilageImageUrl: '',
		carInsideImageUrl: '',
		vehicleLicenseImageUrl: '',
		inspectionLicenseImageUrl: '',
	}
}

export function LoanComment() {
	this.id = 1000000000
	this.loanId = 1000000000
	this.adminId = 1000000000
	this.content = '借款人是拆迁户，家里十套房收租'
	this.createTime = '2018-1-1'
	this.lastUpdateTime = '2018-1-1'
}

export function Product() {
	this.id = 1000000000
	this.loanId = 1000000000
	this.status = 1
	// business
	this.isOnSale = false
	this.startInterestTime = '2018-1-1'
	this.publishTime = '2018-1-1'
	// profile
	this.name = '丰田卡罗拉'
	this.remark = '丰田卡罗拉，里程6000公里'
	this.rankingScore = 0.59
	this.tagId = 1000000000
	this.createTime = '2018-1-1'
	this.lastUpdateTime = '2018-1-1'
	// finance
	this.amount = 100000
	this.interestRateBase = 0.12
	this.interestRateDelta = 0.06
	this.minInvestment = 100
	this.currentInvestment = 58300
	this.termType = 3
	this.interestWay = 1
}

export function Debtor() {
	// profile
	this.id = 1000000000
	this.realName = '司马懿'
	this.gender = 1
	this.birthday = '1921-7-1'
	this.creatorId = null
	this.primaryNumber = '18519866248'
	this.alternativeNumber = '-'
	this.isCarOwner = true
	// id card
	this.idNumber = '321000017901017318'
	this.frontImageUrl = ''
	this.frontBlurImageUrl = ''
	this.backImageUrl = ''
	this.backBlurImaegUrl = ''
	this.location = '魏国洛阳'
	// credit info
	this.workPlace = '魏国朝廷'
	this.address = '魏国洛阳皇宫'
	this.education = '熟读经史'
	this.yearlyStableIncome = 100000
	this.monthlyStableIncome = 1500000
	this.hasCar = true
	this.hasHouse = true
}
