<template>
	<div class="simple-tag" :style="style">
		<span>{{text}}</span>
	</div>
</template>

<script>
export default {
	name: 'simple-tag',
	props: {
		text: {
			type: String,
			default: '',
		},
		textColor: {
			type: String,
			default: '#FFFFFF',
		},
		color: {
			type: String,
			default: '#FFFFFF',
		},
	},
	data() {
		return {
		}
	},
	watch: {
	},
	computed: {
		style() {
			let backgroundColor = this.color
			let fontColor = this.textColor
			let borderColor = this.color
			switch (this.color) {
				case 'blue':
					backgroundColor = '#2d8cf0'
					break
				case 'yellow':
					backgroundColor = '#f90'
					break
				case 'green':
					backgroundColor = '#19be6b'
					break
				case 'red':
					backgroundColor = '#ed3f14'
					break
				case 'default':
					backgroundColor = '#f7f7f7'
					borderColor = '#e9eaec'
					fontColor = '#495060'
					break
				default:
			}
			return {
				display: 'inline-block',
				height: '22px',
				'line-height': '22px',
				margin: '2px 4px 2px 0',
				padding: '0 8px',
				border: `1px solid ${this.color === 'default' ? borderColor : backgroundColor}`,
				'border-radius': '3px',
				'font-size': '12px',
				'vertical-align': 'middle',
				opacity: 1,
				overflow: 'hidden',
				cursor: 'pointer',
				color: fontColor,
				background: backgroundColor,
			}
		},
	},
	methods: {
	},
}
</script>
