<template>
	<div class="dynamic-form">
		<Row type="flex" justify="space-between" align="middle">
			<Col :span="23">
				<slot></slot>
			</Col>
			<Col :span="1">
				<a href="javascript:void(0);" @click.prevent="edit">
					<Icon type="edit" size="18"></Icon>
				</a>
			</Col>
		</Row>
	</div>
</template>

<script>
export default {
	name: 'dynamic-form',
	props: {
		index: Number,
	},
	data() {
		return {
		}
	},
	methods: {
		edit() {
			this.$emit('on-edit', this.index)
		},
	},
}
</script>

<style>
.dynamic-form {
	width: calc(100% + 18px);
}
</style>
