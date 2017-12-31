const Enum = {
	Gender: {
		Male: 1,
		Female: 2,
		Unknown: 3,
	},

	RoleType: {
		Superadmin: 1,
		Admin: 2,
		Operator: 4,
		Pilot: 8,
	},

	OperatorType: {
		Smb: 1,
		Premium: 2,
	},

	VisaType: {
		Business: 1,
		Other: 2,
	},

	UploadUserAction: {
		CreateUser: 1,
		UpdateUser: 2,
		UpdateCurrentUser: 3,
	},
	LicenseType: {
		FAA: 1,
		EASA: 2,
		CAAC: 3,
		HKCAD: 4,
		CAACI: 5,
		BCAA: 6,
		DCA: 7,
		CAA: 8,
	},

	OrderStatus: {
		Pending: 1,
		Active: 2,
		Completed: 3,
		Canceled: 4,
	},

	PaymentStatus: {
		Unpaid: 1,
		Paid: 2,
		MonthlyPaid: 3,
	},

	DocumentType: {
		License: 1,
		MedicalCertificate: 2,
		Passport: 3,
		Visa: 4,
		CV: 5,
		RadiotelephonyLicense: 6,
		EnglishProficiencyCertificate: 7,
		LastRecurrentTraining: 8,
		InternationalProcedureTraining: 9,
		AdsbTrainingRecord: 10,
		CpdlcTrainingRecord: 11,
		CrewIdCopy: 12,
		Other: 1000,
	},

	PilotScheduleType: {
		Other: 1,
		Recurrency: 2,
		MedicalCondition: 3,
		Order: 4,
	},

	PilotScheduleStatus: {
		Free: 1,
		Occupied: 2,
		Tentative: 3,
	},

	OrderSelectorOptions: {
		OrderId: 1,
		PilotName: 2,
		OperatorNickname: 3,
		StartTime: 4,
		EndTime: 5,
		StartAirport: 6,
		EndAirport: 7,
		AircraftType: 8,
		Arp: 9,
	},

	PilotSelectorOptions: {
		PilotId: 1,
		StaffNumber: 2,
		PilotName: 3,
		Nationality: 4,
		NearestAirport: 5,
		Visa: 6,
		AircraftType: 7,
	},

	OperatorSelectorOptions: {
		OperatorId: 1,
		OperatorNickname: 2,
		Company: 3,
	},

	ErrorType: {},

	MessageSender: {
		System: 1,
		Operator: 2,
		Pilot: 3,
		Admin: 4,
	},
	MessageType: {
		Order: 1,
		PilotAdmin: 2,
		OperatorAdmin: 3,
	},
	MessageContentType: {
		Text: 1,
	},
}

export default Enum
