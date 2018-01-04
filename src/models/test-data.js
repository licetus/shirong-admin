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
	// car
	this.carBrand = '布加迪威龙'
	this.purchasePrice = 5000000
	this.milage = 1000
	this.evaluatePrice = 3500000
	this.carPictureFront = ''
	this.carPictureBack = ''
	this.carPictureMilage = ''
	this.carPictureInside = ''
	this.carPictureVehicleLicense = ''
	this.carPictureInspectionLicense = ''
}

export function Debtor() {
	// profile
	this.id = 1000000000
	this.realName = '司马懿'
	this.gender = 1
	this.primaryNumber = '18888888888'
	this.alternativeNumber = '-'
	this.isCarOwner = true
	// id card
	this.idCardNumber = '310000000000000000'
	this.idCardPictureFront = ''
	this.idCardPictureFrontBlur = ''
	this.idCardPictureBack = ''
	this.idCardPictureBackBlur = ''
	this.idCardResidence = '魏国洛阳'
	// credit info
	this.workPlace = '曹氏魏国'
	this.address = '洛阳'
	this.education = '少熟经史'
	this.yearlyStableIncome = 1000000
	this.monthlyStableIncome = 100000
	this.hasHouse = true
}
