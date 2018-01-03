const Enum = {
	Role: {
		SuperAdmin: 1,
		Admin: 2,
		Approver: 3,
		Agent: 4,
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
	},
}

export default Enum
