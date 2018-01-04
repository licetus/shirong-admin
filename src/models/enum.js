const Enum = {
	Role: {
		SuperAdmin: 1,
		Admin: 2,
		Approver: 3,
		Agent: 4,
	},
	Gender: {
		Male: 1,
		Female: 2,
	},
	Product: {
		Status: {
			Submitted: 1,
			Disapproved: 2,
			Approved: 3,
			Selling: 4,
			Running: 5,
			Paused: 6,
			Canceled: 7,
			Completed: 8,
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
		RepayType: {
			LumpSum: 1,
			InterestFirst: 2,
		},
		InterestWay: {
			ObjectCompleted: 1,
		},
	},
}

export default Enum
