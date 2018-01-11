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
			return {
				display: 'inline-block',
				height: '22px',
				'line-height': '22px',
				margin: '2px 4px 2px 0',
				padding: '0 8px',
				border: `1px solid ${this.color}`,
				'border-radius': '3px',
				'font-size': '12px',
				'vertical-align': 'middle',
				opacity: 1,
				overflow: 'hidden',
				cursor: 'pointer',
				color: this.textColor,
				background: this.color,
			}
		},
	},
	methods: {
	},
}
</script>
