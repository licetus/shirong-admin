const Enum = {
	Role: {
		SuperAdmin: 1,
		Admin: 2,
		Operator: 3,
		Agent: 4,
	},
	Gender: {
		Male: 1,
		Female: 2,
	},
	ImageType: {
		Other: 1,
		IdCard: 2,
		Avatar: 3,
	},

	Loan: {
		Status: {
			Prepared: 1,
			Canceled: 2,
			Running: 3,
			Completed: 4,
		},
		ApprovalStatus: {
			Submitted: 1,
			Disapproved: 2,
			Approved: 3,
		},
		Type: {
			Other: 1,
			Car: 2,
		},
		TermType: {
			SevenDays: 1,
			OneMonth: 2,
			ThreeMonths: 3,
			SixMonths: 4,
		},
		RepaymentWay: {
			LumpSum: 1,
			InterestFirst: 2,
		},
	},
	Product: {
		Status: {
			Prepared: 1,
			Selling: 2,
			SoldOut: 3,
			Running: 4,
			SellingPaused: 5,
			RunningPaused: 6,
			Canceled: 7,
			Completed: 8,
		},
		TermType: {
			SevenDays: 1,
			OneMonth: 2,
			ThreeMonths: 3,
			SixMonths: 4,
		},
		InterestWay: {
			ObjectCompleted: 1,
		},
	},
}

export default Enum
