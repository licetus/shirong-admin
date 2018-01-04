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
	// car
	this.carBrand = '-'
	this.purchasePrice = 0
	this.milage = 0
	this.evaluatePrice = 0
	this.carPictureFront = ''
	this.carPictureBack = ''
	this.carPictureMilage = ''
	this.carPictureInside = ''
	this.carPictureVehicleLicense = ''
	this.carPictureInspectionLicense = ''
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
	this.idCardNumber = '-'
	this.idCardPictureFront = ''
	this.idCardPictureFrontBlur = ''
	this.idCardPictureBack = ''
	this.idCardPictureBackBlur = ''
	this.idCardResidence = '-'
	// credit info
	this.workPlace = '-'
	this.address = '-'
	this.education = '-'
	this.yearlyStableIncome = 0
	this.monthlyStableIncome = 0
	this.hasHouse = false
}
