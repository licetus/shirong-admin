<template>
	<Card class='info-card' :padding="10" :bordered="false" dis-hover>
		<div class="info-card-title" slot="title">
			<p>{{title}}</p>
		</div>
		<div v-if="editable" class="info-card-title-extra" slot="extra">
			<a href="javascript:void(0);" slot="extra" @click.prevent="edit">
				<Icon type="edit" size="18"></Icon>
			</a>
		</div>
		<div class="info-card-body">
			<slot></slot>
			<div class="info-card-remark">
				<slot name="remark"></slot>
			</div>
		</div>
	</Card>
</template>

<script>
export default {
	name: 'info-card',
	props: {
		index: Number,
		title: String,
		editable: {
			type: Boolean,
			default: false,
		},
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
.info-card {
	margin-bottom: 20px;
}
.info-card .ivu-card-head {
	/*height: 20px;*/
	padding: 5px 10px;
	line-height: 0;
	background-color: #eee;
}
.info-card .ivu-card-head p {
	font-size: 18px;
	font-weight: 400;
}
.info-card .ivu-card-extra {
	position: absolute;
	right: -32px;
	top: 0px;
	width: 32px;
	height: 32px;
	padding: 5px 10px;
}
.info-card .info-card-body {
	padding-right: 40px;
}

.info-card .ivu-card-body .dynamic-form-wrap {
	margin-top: -11px;
}
.info-card .ivu-card-body .dynamic-form {
	padding-top: 10px;
	border-top-style: solid;
	border-top-width: 1px;
	border-top-color: #eee;
}
.info-card .ivu-form p {
	padding: 0 7px;
}
.info-card .ivu-form-item-label {
	font-size: 14px;
	color: #9b9b9b;
}
.info-card .ivu-form-item {
	margin-bottom: 16px;
}
.info-card .ivu-form-item-content,.ivu-input, textarea.ivu-input,.ivu-input-number,.ivu-checkbox-wrapper,.ivu-select-single .ivu-select-selection .ivu-select-placeholder,.ivu-select-single .ivu-select-selection .ivu-select-selected-value,.ivu-select-single .ivu-select-input {
	font-size: 16px;
}
.info-card .ivu-form-item-content>.ivu-input-number {
	width: 100%;
}
.info-card .ivu-form-item-content .ivu-slider-input>.ivu-slider-wrap {
	margin-right: 75px;
}
.info-card .ivu-form-item-content .ivu-slider-input>.ivu-input-number {
	width: 60px;
}
.info-card .ivu-form-item-content .ivu-tag {
	height: 24px;
	line-height: 22px;
	padding: 0 7px;
	font-size: 16px;
}
.info-card .ivu-form-item-content .ivu-form-item-error-tip {
		padding-top: 2px;
		font-size: 12px;
	}
.info-card .info-card-remark p{
	font-size: 14px;
	color: #9b9b9b;
}
.info-card .ivu-form-item-content img {
	width: 200px;
	height: auto;
	margin-top: 10px;
}
.info-card .ivu-slider-button-wrap {
	top: -7px;
}

</style>
