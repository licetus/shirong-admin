<template>
	<div>
		<Input
			v-show="!isVisible"
			ref="input"
			:autofocus="autofocus"
			type="password"
			:value="val1"
			@input="handleInput1"
			placeholder="请输入密码"
			icon="eye"
			@on-click="switchVisible"
			@on-enter="onEnter"/>
		<Input
			v-show="isVisible"
			type="text"
			:value="val2"
			@input="handleInput2"
			placeholder="请输入密码"
			icon="eye-disabled"
			@on-click="switchVisible"
			@on-enter="onEnter"/>
	</div>
</template>

<script>

export default {
	name: 'input-password',
	props: {
		value: {
			type: String,
			default: '',
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isVisible: false,
			val1: this.value || '',
			val2: this.value || '',
		}
	},
	watch: {
		value(val) {
			this.setValue(val)
		},
	},
	methods: {
		focus() {
			console.log('value:', this.value, 'val1:', this.val1, 'val2:', this.val2)
			this.$refs.input.focus()
		},
		switchVisible() {
			this.isVisible = !this.isVisible
		},
		setValue(val) {
			this.val1 = val
			this.val2 = val
		},
		handleInput1(val) {
			this.setValue(val)
			this.$emit('input', val)
		},
		handleInput2(val) {
			this.setValue(val)
			this.$emit('input', val)
		},
		onEnter() {
			this.$emit('on-enter')
		},
	},
	computed: {
	},
}
</script>
