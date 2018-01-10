<template>
	<div>
		<Input
			ref="input"
			:autofocus="autofocus"
			v-show="!isVisible"
			type="password"
			:value="val1"
			@input="input1(arguments[0])"
			placeholder="请输入密码"
			icon="eye"
			@on-click="switchVisible"/>
		<Input
			v-show="isVisible"
			type="text"
			:value="val2"
			@input="input2(arguments[0])"
			placeholder="请输入密码"
			icon="eye-disabled"
			@on-click="switchVisible"/>
	</div>
</template>

<script>

export default {
	name: 'input-password',
	props: {
		value: {
			type: String,
		},
		autofocus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			isVisible: false,
			val1: this.value,
			val2: this.value,
		}
	},
	methods: {
		focus() {
			this.$refs.input.focus()
		},
		switchVisible() {
			this.isVisible = !this.isVisible
		},
		input1(val1) {
			this.val2 = val1
			this.$emit('input', val1)
		},
		input2(val2) {
			this.val1 = val2
			this.$emit('input', val2)
		},
	},
	computed: {
	},
}
</script>
