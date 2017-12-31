export const EN = {

	Public: {
		Gender: {
			Male: 'Male',
			Female: 'Female',
			Unknown: 'Unknown',
		},
		Time: {
			Hrs: 'hrs',
			Day: 'Day',
			Days: 'Days',
		},
		Button: {
			Login: 'Log in',
			Logout: 'Logout',
			Management: 'Management',
			New: 'New',
			AddNew: 'Add New',
			Cancel: 'Cancel',
			Delete: 'Delete',
			Confirm: 'Confirm',
			Next: 'Next',
			Save: 'Save',
			ContactOrderParticipants: 'Contact Order Participants',
		},
		Table: {
			Conversation: 'Conversation',
			Messages: 'Messages',
			NoDataText: 'No Data',
			NoFilteredDataText: 'No Data Matched',
		},
		BasicInfo: {
			Aircraft: 'Aircraft',
		},
		ActionCard: {
			Title: 'Actions',
		},
		ImgUploader: {
			Button: {
				Upload: 'Upload Image',
			},
		},
		NotificationCard: {
			Order: 'Order',
		},
	},

	Login: {
		Login: 'Log in',
		Username: 'USERNAME',
		Password: 'PASSWORD',
		AccountNeeded: 'account is required',
		PasswordNeeded: 'password is required',
		PasswordTooShort: 'password is too short, at least 6 characters',
		InvalidForm: 'Invalid Login Data',
	},

	NavMenu: {
		Dashboard: 'Dashboard',
		Business: 'Business',
		Orders: 'Orders',
		Pilots: 'Pilots',
		Operators: 'Operators',
		Messages: 'Messages',
		Notifications: 'Notifications',
		Settings: 'Settings',
		Logout: 'Logout',
		Profile: 'Profile',
		Modal: {
			Logout: {
				Title: 'Log out',
				Content: 'Are you sure to log out?',
			},
		},
	},

	Business: {
		Breadcrumb: 'Business',
		AerolinkRate: 'Aerolink Rate',
		Modal: {
			AerolinkRateManagement: 'Aerolink Rate Management',
			AircraftPriceManagement: 'Aircraft Price Management',
		},
		Message: {
			UpdateAerolinkRateSuccessfully: 'Update Aerolink Rate Successfully!',
			UpdateAircraftPriceSuccessfully: 'Update Aircraft Price Successfully!',
		},
		Table: {
			AerolinkRate: 'Aerolink Rate',
			AircraftPrice: 'Aircraft Price',
			Aircraft: 'Aircraft',
			OneDayPrice: '1 Day Price',
			SevenDaysPrice: '7 Days Price',
			FourteenDaysPrice: '14 Days Price',
			ThirtyDaysPrice: '30 Days Price',
		},
	},

	Order: {
		Breadcrumb: 'Orders',
		OrderStatus: {
			All: 'All',
			Pending: 'Pending',
			Active: 'Active',
			Completed: 'Completed',
			Canceled: 'Canceled',
			Unknown: 'Unknown',
		},
		PaymentStatus: {
			All: 'All',
			Unpaid: 'Unpaid',
			Paid: 'Paid',
			MonthlyPaid: 'Monthly',
			Unknown: 'Unknown',
		},
		Button: {
			NewOrder: 'New Order',
			Modify: 'Modify Order Profile',
			Activate: 'Activate',
			Cancel: 'Cancel',
			Delete: 'Delete',
		},
		Modal: {
			NewOrder: 'New Order',
			BasicInfo: 'Basic Infomation',
			StartTime: 'Start Date (UTC)',
			EndTime: 'End Date (UTC)',
			StartAirport: 'Check-in Place',
			EndAirport: 'Check-out Place',
			AircraftType: 'Aircraft Type',
			Arp: 'Reg. Country',
			OperatorId: 'Operator ID',
			PilotId: 'Pilot ID',
			OrderPrice: 'Order Price',
			PilotPayment: 'Pilot Payment',
			Remark: 'Remark',
			Validator: {
				NoDate: 'please select date',
				InvalidDateRange: 'please select correct date range',
				Requirement: {
					StartTime: 'start date is required',
					EndTime: 'end date is required',
					StartAirport: 'check-in airport is required',
					EndAirport: 'check-out airport is required',
					AircraftType: 'aircraft type is required',
					Arp: 'register country is required',
					Operator: 'operator ID is required',
					Pilot: 'pilot ID is required',
					OrderPrice: 'order price is required',
					PilotPayment: 'pilot payment is required',
				},
				InvalidPrice: 'invalid price',
				Remark: {
					Length: 'remark should be less than',
					Characters: 'characters',
				},
			},
		},
		Message: {
			AddSuccessfully: 'Add New Order Successfully!',
			ActivateSuccessfully: 'Activate Order Successfully!',
			CancelSuccessfully: 'Cancel Order Successfully!',
			DeleteSuccessfully: 'Delte Order Successfully!',
			Activate: {
				Title: 'Caution!',
				Content: 'Are you sure to ACTIVATE this order? The action is IRREVERSIBLE.',
			},
			Cancel: {
				Title: 'Caution!',
				Content: 'Are you sure to CANCEL this order? The action is IRREVERSIBLE.',
			},
			Delete: {
				Title: 'Warning!',
				Content: 'Are you sure to DELETE this order? The action is IRREVERSIBLE.',
			},
		},
		Table: {
			OrderId: 'Order ID',
			OrderStatus: 'Status',
			PaymentStatus: 'Payment',
			StartTime: 'Start',
			EndTime: 'End',
			StartAirport: 'From',
			EndAirport: 'To',
			AircraftType: 'Aircraft',
			Arp: 'Reg.',
			AssignedPilot: 'Pilot',
			Operator: 'Operator',
			TotalPrice: 'Price',
		},
		Pane: {
			Modify: {
				Breadcrumb: 'Modify',
			},
			Status: {
				Title: 'Status',
				OrderStatus: 'Order Status',
				PaymentStatus: 'Payment Status',
			},
			BasicInfo: {
				Title: 'Basic Infomation',
				StartTime: 'Start Date (UTC)',
				EndTime: 'End Date (UTC)',
				StartAirport: 'Check-in Place',
				EndAirport: 'Check-out Place',
				AircraftType: 'Aircraft Type',
				Arp: 'Reg. Country',
			},
			Remark: {
				Title: 'Remark',
				Remark: 'Remark',
			},
			Price: {
				Title: 'Price',
				OrderPrice: {
					Title: 'Price for Operator',
					Label: 'Order Price',
					AerolinkRate: 'Aerolink Rate',
					OperatorDiscount: 'Operator Discount',
					CalcLogic: 'Base Price × Pilot Rate × Issue Days × Aerolink Rate - Operator Discount',
				},
				PilotPayment: {
					Title: 'Payment to Pilot',
					Label: 'Pilot Payment',
					CalcLogic: 'Base Price × Pilot Rate × Issue Days',
				},
				Total: 'Total',
				BasePrice: 'Base Price',
				PilotRate: 'Pilot Rate',
				IssueDays: 'Issue Days',
				CalcLogic: 'Calculation logic',
			},
		},
	},

	Pilot: {
		Breadcrumb: 'Pilots',
		DocumentType: {
			License: 'Valid license',
			MedicalCertificate: 'Valid class 1 medical certificate',
			Passport: 'Passport copy',
			Visa: 'Visa copy',
			CV: 'CV with all the hours',
			RadiotelephonyLicense: 'Radiotelephony license',
			EnglishProficiencyCertificate: 'English Proficiency certificate',
			LastRecurrentTraining: 'Last Recurrent training done within last 12 months',
			InternationalProcedureTraining: 'International procedure training',
			AdsbTrainingRecord: 'ADSB training record',
			CpdlcTrainingRecord: 'CPDLC training record',
			CrewIdCopy: 'Crew ID copy',
			Other: 'Other',
			NoData: 'No Data',
			Unknown: 'Unknown',
		},
		ScheduleType: {
			Order: 'Order',
			MedicalCondition: 'Medical Condition',
			Recurrency: 'Recurrency',
			Other: 'Other',
			Unknown: 'Unknown',
		},
		ScheduleStatus: {
			Free: 'Free',
			Occupied: 'Occupied',
			Tentative: 'Tentative',
			Unknown: 'Unknown',
		},
		LicenseType: {
			EASA: 'EASA',
			FAA: 'FAA',
			CAAC: 'CAAC',
			HKCAD: 'HKCAD',
			CAACI: 'CAACI',
			BCAA: 'BCAA',
			DCA: 'DCA',
			CAA: 'CAA',
			NoData: 'No Data',
			Unknown: 'Unknown',
		},
		Button: {
			NewPilot: 'New Pilot',
			Modify: 'Modify Pilot Profile',
			Delete: 'Delete This Pilot',
		},
		Modal: {
			NewPilot: 'New Pilot',
			Country: 'Country',
			MobileNumber: 'Mobile Number',
			Account: 'Account',
			Password: 'Password',
			Validator: {
				Requirement: {
					Country: 'country code is required',
					Account: 'account is required',
					Password: 'password is required',
				},
				AccountPattern: 'account should be a mobile phone number',
				PasswordTooShort: 'password is too short, at least 6 characters',
			},
		},
		Verification: {
			Verified: 'Verified',
			Unverified: 'Unverified',
		},
		Message: {
			AddPilotSuccessfully: 'Add New Pilot Successfully!',
			UpdatePilotVerificationSuccessfully: 'Update Pilot Verification Successfully!',
		},
		Table: {
			PilotId: 'Pilot ID',
			StaffNumber: 'Aerolink ID',
			Verification: 'Verification',
			PilotName: 'Name',
			Nationality: 'Nationality',
			NearestAirport: 'Nearest Airport',
			CurrentLocation: 'Current Location',
			PilotRate: 'Rate',
			TotalFlightHours: 'T.F.H',
			Visa: 'Visa',
			License: 'License',
			AircraftType: 'Aircraft',
			AssignedOrders: 'Orders',
		},
		Pane: {
			Modify: {
				Breadcrumb: 'Modify',
			},
			Title: 'Pilot Profile',
			Basic: {
				Title: 'Basic',
				General: {
					Title: 'General',
					ProfilePhoto: 'Profile Photo',
					FirstName: 'First Name',
					LastName: 'Last Name',
					AerolinkId: 'Aerolink ID',
					Birthday: 'D.O.B',
					Age: 'Age',
					Nationality: 'Nationality',
					Language: 'Language',
					NearestAirport: 'Nearest Airport',
					CurrentLocation: 'Current Location',
					LastUpdatedIn: 'Last updated in',
					Health: 'Health',
					Button: {
						ChangePhoto: 'Change Photo',
					},
					Validator: {
						Requirement: {
							PhotoUrl: 'photo is required',
							FirstName: 'pilot\'s first name is required',
							LastName: 'pilot\'s last name is required',
							StaffNumber: 'Aerolink ID is required',
							Birthday: 'birthday is required',
							Nationality: 'nationality is required',
							Language: 'language is required',
							NearestAirport: 'nearest airport is required',
							Health: 'health condition is required',
						},
					},
				},
				Rating: {
					Title: 'Rating',
					PerformanceRate: 'Performance Rate',
					PromotionRate: 'Promotion Rate',
					TopPosition: 'Top Position',
					Featured: 'Featured',
					Validator: {
						Requirement: {
							PerformanceRate: 'performance rate is required',
							PromotionRate: 'performance rate is required',
						},
						PerformanceRate: 'invalid performance rate',
						PromotionRate: 'invalid promotion rate',
					},
				},
				PaymentRate: {
					Title: 'Payment Rate',
					Rate: 'Rate',
					Validator: {
						Requirement: {
							PilotRate: 'pilot payment rate is required',
						},
						PilotRate: 'invalid pilot payment rate',
					},
				},
				EmploymentHistory: {
					Title: 'Employement History',
					Period: 'Period',
					Company: 'Company',
					Description: 'Description',
					Modal: {
						Title: {
							New: 'New Employment History',
							Edit: 'Edit Employment History',
						},
						StartTime: 'Start Date',
						EndTime: 'End Date',
						Company: 'Company',
						Description: 'Description',
					},
					Message: {
						DeleteSuccessfully: 'Delete Pilot Employment History Successfully!',
						AddSuccessfully: 'Add Pilot Employment History Successfully!',
						UpdateSuccessfully: 'Update Pilot Employment History Successfully!',
					},
					Validator: {
						Requirement: {
							StartTime: 'start date is required',
							EndTime: 'end date is required',
							Company: 'company is required',
							Description: 'description is required',
						},
					},
				},
				FlightHours: {
					Title: 'Flight Hours',
					TotalFlightHours: 'Total Flight Hours',
					TotalPicHours: 'Total PIC Hours',
					TotalJetHours: 'Total Jet Hours',
					Validator: {
						Requirement: {
							TotalFlightHours: 'total flight hours is required',
							TotalPicHours: 'total PIC hours is required',
							TotalJetHours: 'total jet hours is required',
						},
					},
				},
				Aircraft: {
					Title: 'Aircraft License',
					Type: 'Type',
					StartTime: 'Start Date',
					EndTime: 'End Date',
					Modal: {
						Title: {
							New: 'New Aircraft License',
							Edit: 'Edit Aircraft License',
						},
						Type: 'Type',
						StartTime: 'Start Date',
						EndTime: 'End Date',
					},
					Message: {
						DeleteSuccessfully: 'Delete Pilot Aircraft License Successfully!',
						AddSuccessfully: 'Add Pilot Aircraft License Successfully!',
						UpdateSuccessfully: 'Update Pilot Aircraft License Successfully!',
					},
					Validator: {
						Requirement: {
							Type: 'aircraft type is required',
							StartTime: 'start date is required',
							EndTime: 'end date is required',
						},
						Duplicate: 'duplicate aircraft',
					},
				},
				License: {
					Title: 'License',
					Type: 'Type',
					Modal: {
						Title: {
							New: 'New License',
							Edit: 'Edit License',
						},
						Type: 'Type',
					},
					Message: {
						DeleteSuccessfully: 'Delete Pilot License Successfully!',
						AddSuccessfully: 'Add Pilot License Successfully!',
						UpdateSuccessfully: 'Update Pilot License Successfully!',
					},
					Validator: {
						Requirement: {
							Type: 'license type is required',
						},
						Duplicate: 'duplicate license',
					},
				},
				Passport: {
					Title: 'Passport',
					PassportNumber: 'Passport Number',
					Gender: 'Gender',
					Nationality: 'Nationality',
					Birthday: 'D.O.B',
					BirthPlace: 'Place of Birth',
					IssueDate: 'Date of Issue',
					ExpirationDate: 'Date of Expiration',
					Remark: 'Remark',
					Modal: {
						Title: {
							New: 'New Passport',
							Edit: 'Edit Passport',
						},
						PassportNumber: 'Passport Number',
						Gender: 'Gender',
						Nationality: 'Nationality',
						Birthday: 'D.O.B',
						BirthPlace: 'Place of Birth',
						IssueDate: 'Date of Issue',
						ExpirationDate: 'Date of Expiration',
						Remark: 'Remark',
					},
					Message: {
						DeleteSuccessfully: 'Delete Pilot Passport Successfully!',
						AddSuccessfully: 'Add Pilot Passport Successfully!',
						UpdateSuccessfully: 'Update Pilot Passport Successfully!',
					},
					Validator: {
						Requirement: {
							PassportNumber: 'passport number is required',
							Gender: 'gender is required',
							Nationality: 'nationality is required',
							Birthday: 'birthday is required',
							BirthPlace: 'birth place is required',
							IssueDate: 'issue date is required',
							ExpirationDate: 'expiration date is required',
							Remark: 'Remark is required',
						},
						Duplicate: 'duplicate passport',
						Remark: {
							Length: 'remark should be less than',
							Characters: 'characters',
						},
					},
				},
				Visa: {
					Title: 'Visa',
					Country: 'Country',
					Type: 'Type',
					IssueDate: 'Date of Issue',
					Duration: 'Duration of Entry',
					Modal: {
						Title: {
							New: 'New Visa',
							Edit: 'Edit Visa',
						},
						Country: 'Country',
						Type: 'Type',
						IssueDate: 'Date of Issue',
						Duration: 'Duration of Entry',
					},
					Message: {
						DeleteSuccessfully: 'Delete Pilot Visa Successfully!',
						AddSuccessfully: 'Add Pilot Visa Successfully!',
						UpdateSuccessfully: 'Update Pilot Visa Successfully!',
					},
					Validator: {
						Requirement: {
							Country: 'country is required',
							Type: 'type is required',
							IssueDate: 'issue date is required',
							Duration: 'duration is required',
						},
						Duplicate: 'duplicate visa',
					},
				},
				Contact: {
					Title: 'Contact',
					Email: 'Email',
					Phone: 'Phone',
					PhonePrimary: 'Primary Number',
					PhoneAlternative: 'Alternative Number',
					Address: 'Address',
					Building: 'Building',
					Road: 'Road',
					City: 'City',
					State: 'State',
					Country: 'Country',
					Validator: {
						Requirement: {
							Email: 'email is required',
							Phone: 'phone is required',
							PhonePrimary: 'primary number is required',
							PhoneAlternative: 'alternative number is required',
							Address: 'address is required',
							Building: 'building is required',
							Road: 'road is required',
							City: 'city is required',
							State: 'state is required',
							Country: 'country is required',
						},
					},
				},
				Payment: {
					Title: 'Payment Details',
					Name: 'Name',
					Addr: 'Home/Work Addr.',
					BankName: 'Bank Name',
					BankAddr: 'Bank Address',
					SWIFT: 'SWIFT Code',
					IBAN: 'IBAN Number',
				},
				Remark: {
					Title: 'Remark',
					Remark: 'Remark',
					Validator: {
						Remark: {
							Length: 'remark should be less than',
							Characters: 'characters',
						},
					},
				},
			},
			FlightExp: {
				Title: 'Flight Experience',
				TotalHours: 'Total Hours',
				PicHours: 'Pic Hours',
				Modal: {
					Title: {
						New: 'New FlightExp',
						Edit: 'Edit FlightExp',
					},
					Type: 'Type',
					TotalHours: 'Total Hours',
					PicHours: 'Pic Hours',
				},
				Message: {
					DeleteSuccessfully: 'Delete Pilot Flight Experience Successfully!',
					AddSuccessfully: 'Add Pilot Flight Experience Successfully!',
					UpdateSuccessfully: 'Update Pilot Flight Experience Successfully!',
				},
				Validator: {
					Requirement: {
						Type: 'aircraft type is required',
						TotalHours: 'total hours is required',
						PicHours: 'pic hours is required',
					},
					Duplicate: 'duplicate aircraft',
				},
			},
			Documents: {
				Title: 'Documents',
				Type: 'Type',
				Description: 'Description',
				ScannedCopy: 'Scanned Copy',
				Button: {
					ViewDetail: 'View Detail',
					MissBlurCopy: 'blur copy missing',
				},
				Modal: {
					Title: {
						New: 'New Document',
						Edit: 'Edit Document',
					},
					TitleLabel: 'Title',
					Type: 'Type',
					Description: 'Description',
					ScannedCopy: 'Scanned Copy',
					BlurCopy: 'Blur Copy',
					Button: {
						Upload: 'Upload a Copy',
					},
				},
				Message: {
					DeleteSuccessfully: 'Delete Pilot Document Successfully!',
					AddSuccessfully: 'Add Pilot Document Successfully!',
					UpdateSuccessfully: 'Update Pilot Document Successfully!',
				},
				Validator: {
					Requirement: {
						Title: 'title is required',
						Type: 'type is required',
						Description: 'description is required',
						ScannedCopy: 'scanned copy is required',
						BlurCopy: 'blur copy is required',
					},
				},
			},
			Availablity: {
				Title: 'Availablity',
				EventOf: 'Events of',
				StartTime: 'Start Time',
				EndTime: 'End Time',
				Duration: 'Duration',
				TitleLabel: 'Title',
				Content: 'Content',
				Status: 'Status',
				Type: 'Type',
			},
		},
	},

	Operator: {
		Breadcrumb: 'Operators',
		OperatorType: {
			Smb: 'SMB',
			Premium: 'Premium',
		},
		Button: {
			NewOperator: 'New Operator',
			Modify: 'Modify Operator Profile',
			Delete: 'Delete This Operator',
		},
		Table: {
			OperatorId: 'Operator ID',
			Nickname: 'Nickname',
			Company: 'Company',
			Type: 'Type',
			OrderAmount: 'Order Amount',
			DiscountRate: 'Discount Rate',
			ContactEmail: 'Contact Email',
		},
		Modal: {
			NewOperator: 'New Operator',
			Account: 'Account',
			Password: 'Password',
		},
		Validator: {
			Requirement: {
				Account: 'account is required',
				Password: 'password is required',
			},
			Account: 'accout must be a email address',
			Password: 'password is too short, at least 6 characters',
		},
		Message: {
			AddSuccessfully: 'Add New Operator Successfully!',
		},
		Pane: {
			Modify: {
				Breadcrumb: 'Modify',
			},
			Title: 'Operator Profile',
			General: {
				Title: 'General',
				Avatar: 'Profile Photo',
				Nickname: 'Nickname',
				OperatorId: 'Operator ID',
				ContactPerson: 'Contact Person',
				ContactEmail: 'Contact Email',
				ContactNumber: 'Contact Number',
				Company: 'Company',
				BusinessAddress: 'Bussiness Address',
				Button: {
					ChangeAvatar: 'Change Avatar',
				},
				Validator: {
					Requirement: {
						Avatar: 'avatar is required',
						Nickname: 'nickname is required',
						ContactPerson: 'contact person is required',
						ContactEmail: 'contact email is required',
						ContactNumber: 'contact number is required',
						Company: 'company is required',
						BusinessAddress: 'bussiness address is required',
					},
				},
			},
			Discount: {
				Title: 'Discount',
				Discount: 'Discount',
				Rate: 'Rate',
				Validator: {
					Requirement: {
						Rate: 'discount rate is required',
					},
					Rate: 'invalid discount rate',
				},
			},
			Type: {
				Title: 'Operator Type',
				Type: 'Type',
				Validator: {
					Requirement: {
						Type: 'operator type is required',
					},
					Type: 'invalid operator type',
				},
			},
			Remark: {
				Title: 'Remark',
				Remark: 'Ramark',
				Validator: {
					Requirement: {
						Remark: 'Remark is required',
					},
					Remark: {
						Length: 'remark should be less than',
						Characters: 'characters',
					},
				},
			},
		},
	},

	Messages: {
		Breadcrumb: {
			Messages: 'Messages',
			Notifications: 'Notifications',
		},
		Messages: 'Messages',
		Notifications: 'Notifications',
		ViewAll: 'View All',
		Inbox: 'Inbox',
		Button: {
			LoadMore: 'load more...',
		},
		Detail: {
			Breadcrumb: {
				Order: 'Order',
				Pilot: 'Pilot',
				Operator: 'Operator',
			},
			StaffNumber: 'Aerolink ID',
			CurrentLocation: 'Current Location',
			BasicInfo: {
				StartTime: 'Start Date(UTC)',
				EndTime: 'End Date(UTC)',
				StartAirport: 'Check-in Place',
				EndAirport: 'Check-out Place',
				AircraftType: 'Aircraft Type',
				Arp: 'Reg. Country',
			},
			Button: {
				ViewOrder: 'View Order Details',
				LoadMore: 'load more...',
			},
			TextBox: {
				Placeholder: 'Type your message here...',
			},
		},
		Message: {
			NoData: 'No more notifications',
		},
		Placeholder: {
			NoData: 'No data',
			NoMoreData: 'No more unread messages',
		},
	},

	Settings: {
		Breadcrumb: 'Settings',
		Button: {
			NewUser: 'New User',
		},
		Message: {
			AddSuccessfully: 'Add New User Successfully!',
			UpdateSuccessfully: 'Update User Profile Successfully!',
			RemoveSuccessfully: 'Remove User Profile Successfully!',
			Remove: {
				Title: 'Warning!',
				Content: 'Are you sure to REMOVE this user?',
			},
			LowAuth: 'Need Higher Authentication.',
		},
		Table: {
			UserId: 'ID',
			Username: 'Username',
			Name: 'Name',
			Remark: 'Remark',
			Role: 'Role',
			Action: 'Action',
			Button: {
				Edit: 'Edit',
				Remove: 'Remove',
			},
		},
		Modal: {
			Title: {
				Add: 'Add User',
				Edit: 'Edit User',
			},
			Username: 'Username',
			Password: 'Password',
			Name: 'Name',
			Remark: 'Remark',
			Button: {
				UploadAvatar: 'Upload Avatar',
				ResetPassword: 'Reset Password',
			},
			Validator: {
				Requirement: {
					AvatarUrl: 'avatar is required',
					Username: 'username is required',
					Password: 'password is required',
					Name: 'name is required',
					Remark: 'remark is required',
				},
				PasswordTooShort: 'password is too short, at least 6 characters',
				Remark: {
					Length: 'remark should be less than',
					Characters: 'characters',
				},
			},
		},
	},

	Profile: {
		Breadcrumb: 'Profile',
		Profile: 'Profile',
		Avatar: 'Avatar',
		ChangeAvatar: 'Change Avatar',
		UploadAvatar: 'UploadAvatar',
		Username: 'Username',
		Password: 'Password',
		ResetPassword: 'Reset Password',
		Name: 'Name',
		Remark: 'Remark',
		Message: {
			Relogin: {
				Title: 'Relogin',
				Content: 'Update Profile Successfully, Please Re-Login to Refresh User Profile.',
			},
		},
	},

}
