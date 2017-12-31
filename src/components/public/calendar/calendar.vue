<template>
	<Card class="calendar" :padding="10" :bordered="false" dis-hover>
		<Row class-name="calendar-header" slot="title" type="flex" justify="space-between" align="middle">
			<Col :span="6">
				<Row class-name="calender-header-left" type="flex" justify="start" align="middle">
					<Button type="text" @click="onClickPrevMonth">{{leftArrow}}</Button>
				</Row>
			</Col>
			<Col :span="12">
				<Row class-name="calender-header-title" type="flex" justify="center" align="middle">
					<DatePicker
					:open="isDatePickerOn"
					:value="currentMonth.toDate()"
					type="month"
					placement="bottom"
					@on-change="onChangeCurrentMonth"
					><Button type="text" @click="onClickMonthTitle">{{title}}</Button></DatePicker>
				</Row>
			</Col>
			<Col :span="6">
				<Row class-name="calender-header-right" type="flex" justify="end" align="middle">
					<Button type="text" @click="onClickNextMonth">{{rightArrow}}</Button>
				</Row>
			</Col>
		</Row>
		<div class="calendar-body">
			<Row class-name="weeks" type="flex" justify="space-between" align="middle">
				<Col :span="3" v-for="(dayIndex, index) in 7" :key="index">
					<Row type="flex" justify="center">
						<strong class="week">{{(dayIndex - 1) | localeWeekDay(firstDay, locale)}}</strong>
					</Row>
				</Col>
			</Row>
			<div class="days" ref="dates">
				<div class='dates-bg'>
					<Row class-name="week-row" type="flex" justify="space-between" v-for="(week, index) in currentDates" :key="index">
						<Col :span="3" v-for="(day, index) in week" :key="index">
							<div class="day-cell" :class="{'occupied': !day.isAvailiable, 'today': day.isToday, 'occupied-today': !day.isAvailiable && day.isToday, 'not-cur-month': !day.isCurMonth, 'occupied-not-cur-month': !day.isAvailiable && !day.isCurMonth}">
									<Row type="flex" justify="center" align="middle">
										<Row v-if="day.isToday" class-name="today-circle" type="flex" justify="center" align="middle">
											<strong class="day-number">{{day.monthDay}}</strong>
										</Row>
										<strong v-else class="day-number">{{day.monthDay}}</strong>
									</Row>
							</div>
						</Col>
					</Row>
				</div>
			</div>
			<div class="dates-events">
				<div class="events-week" v-for="week in currentDates">

				</div>
			</div>
		</div>
	</Card>
</template>

<script>
import moment from 'moment'
import { Enum } from '../../../models'

export default {
	name: 'calendar',
	props: {
		events: {
			type: Array,
			default: [],
		},
		locale: {
			type: String,
			default: 'en',
		},
		firstDay: {
			type: Number || String,
			validator(val) {
				if (typeof val === 'string') {
					const res = parseInt(val, 10)
					return res >= 0 && res <= 6
				}
				return val >= 0 && val <= 6
			},
			default: 0,
		},
	},

	data() {
		return {
			leftArrow: '<',
			rightArrow: '>',

			currentMonth: moment.utc().startOf('month'),
			isDatePickerOn: false,
			isLismit: true,
			enentLimit: 3,
			showMore: false,
			morePos: {
				top: 0,
				left: 0,
			},
			selectDay: {},
		}
	},
	computed: {
		title() {
			if (!this.currentMonth) return null
			return this.currentMonth.locale(this.locale).format('MMMM YYYY')
		},
		currentDates() {
			return this.getCalendar()
		},
	},
	methods: {
		onClickPrevMonth() {
			const month = moment(this.currentMonth).subtract(1, 'month').startOf('month')
			this.changeMonth(month)
		},
		onClickNextMonth() {
			const month = moment(this.currentMonth).add(1, 'month').startOf('month')
			this.changeMonth(month)
		},
		onClickMonthTitle() {
			this.isDatePickerOn = !this.isDatePickerOn
		},
		onChangeCurrentMonth(date) {
			this.changeMonth(moment(date).startOf('month'))
			this.isDatePickerOn = false
		},

		changeMonth(firstDayOfMonth) {
			this.currentMonth = firstDayOfMonth
			const start = this.getMonthViewStartDate(firstDayOfMonth, this.firstDay)
			const end = this.getMonthViewEndDate(firstDayOfMonth, this.firstDay)
			this.$emit('on-change-month', start, end, firstDayOfMonth)
		},
		mortTitle(date) {
			if (!date) return ''
			return moment(date).format('ll')
		},
		getCalendar() {
			const monthViewStartDate = this.getMonthViewStartDate(this.currentMonth, this.firstDay)
			const calendar = []
			for (let perWeek = 0; perWeek < 6; perWeek += 1) {
				const week = []
				for (let perDay = 0; perDay < 7; perDay += 1) {
					week.push({
						monthDay: monthViewStartDate.date(),
						isAvailiable: this.isDateAvailiable(monthViewStartDate, this.events),
						isToday: monthViewStartDate.isSame(moment(), 'day'),
						isCurMonth: monthViewStartDate.isSame(this.currentMonth, 'month'),
						weekDay: perDay,
						date: moment(monthViewStartDate),
						events: this.slotEvents(monthViewStartDate),
					})
					monthViewStartDate.add(1, 'day')
				}
				calendar.push(week)
			}
			return calendar
		},
		isDateAvailiable(date, events) {
			for (const event of events) {
				if (date.isBetween(event.start, event.end, null, '[]') && event.status !== Enum.PilotScheduleStatus.Free) return false
			}
			return true
		},
		slotEvents(date) {
			// const cellIndexArr = []
			const thisDayEvents = this.events.filter((day) => {
				const st = moment(day.start)
				const ed = moment(day.end ? day.end : st)
				return date.isBetween(st, ed, null, '[]')
			})
			thisDayEvents.sort((a, b) => {
				if (!a.cellIndex) return 1
				if (!b.cellIndex) return -1
				return a.cellIndex - b.cellIndex
			})
			for (let i = 0; i < thisDayEvents.lenth; i += 1) {
				thisDayEvents[i].cellIndex = thisDayEvents[i].cellIndex || (i + 1)
				thisDayEvents[i].isShow = true
				if (thisDayEvents[i].cellIndex !== i + 1 && i <= 2) {
					thisDayEvents.splice(i, 0, {
						title: 'holder',
						cellIndex: i + 1,
						start: date.format(),
						end: date.format(),
						isShow: false,
					})
				}
			}
			return thisDayEvents
		},
		selectThisDay(day, jsEvent) {
			this.selectDay = day
			this.showMore = true
			this.morePos = this.computePos(event.target)
			this.morPos.top -= 100
			const events = day.events.filter(item => item.isShow === true)
			this.$emit('moreClick', day.date, events, jsEvent)
		},
		computePos(target) {
			const eventRect = target.getBoundingClientRect()
			const pageRect = this.$refs.dates.getBoundingClientRect()
			return {
				left: eventRect.left - pageRect.left,
				top: (eventRect.top + eventRect.height) - pageRect.top,
			}
		},
		dayClick(day, jsEvent) {
			this.$emit('dayClick', day, jsEvent)
		},
		eventClick(event, jsEvent) {
			if (event.isShow) {
				jsEvent.stopPropagation()
				const pos = this.computePos(jsEvent.target)
				this.$emit('eventClick', event, jsEvent, pos)
			}
		},

		getMonthViewStartDate(date, fd) {
			const firstDay = parseInt(fd, 10)
			const start = moment(date)
			const startOfMonth = moment(start.startOf('month'))
			start.subtract(startOfMonth.day(), 'days')
			if (startOfMonth.day() < firstDay) start.subtract(7, 'days')
			start.add(firstDay, 'days')
			return start
		},
		getMonthViewEndDate(date, fd) {
			return this.getMonthViewStartDate(date, fd).add(6, 'weeks')
		},
	},
	filters: {
		localeWeekDay(weekday, firstDay, locale) {
			firstDay = parseInt(firstDay, 10)
			const localMoment = moment().locale(locale)
			return localMoment.localeData().weekdaysShort()[(weekday + firstDay) % 7]
		},
	},
}
</script>

<style lang="scss">
.calendar{
	.ivu-card-head{
		padding: 5px 10px;
		line-height: 0;
		background-color: #eee;
		.ivu-btn{
			line-height: 1;
			font-size: 18px;
			font-weight: 400;
			padding: 0;
			color: #1c2438;
		}
	}
}
.calendar-body{
	.weeks{
		padding: 10px 0;
		.week{
			color: #9b9b9b;
		}
	}
	.week-row{
		padding: 0;
		.day-cell{
			.day-number{
				margin: 12px 0;
			}
			&.occupied{
				.day-number{
					color: #4daed7;
				}
			}
			&.today{
				.today-circle{
					margin: 4px;
					width: 37px;
					height: 37px;
					border-radius: 37px;
					border-style: solid;
					border-width: 1px;
					border-color: #066bb2;
					background-color: #066bb2;
					.day-number{
						color: #fff;
					}
				}
			}
			&.occupied-today{
				.today-circle{
					margin: 4px;
					width: 37px;
					height: 37px;
					border-radius: 37px;
					border-style: solid;
					border-width: 1px;
					border-color: #066bb2;
					background-color: #066bb2;
					.day-number{
						color: #4daed7;
					}
				}
			}
			&.not-cur-month{
				.day-number{
					color: #e1e1e1;
				}
			}
			&.occupied-not-cur-month{
				.day-number{
					color: #4daed7;
				}
			}
		}
	}
}
</style>
