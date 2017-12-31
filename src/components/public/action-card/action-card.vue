<template>
		<div class="action-card">
			<h2 class="action-card-header" v-if="!modify">{{$t('messages.Public.ActionCard.Title')}}</h2>
			<div class="action-card-body" v-if="!modify"><slot name="body"></slot></div>
			<div class="action-card-footer"><slot name="footer"></slot></div>
		</div>
</template>

<script>
export default {
	name: 'action-card',
	props: {
		modify: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
		}
	},
}
</script>

<style>
.action-card-body {
	font-size: 16px;
	padding-bottom: 10px;
	border-bottom-width: 3px;
	border-bottom-style: dashed;
	border-bottom-color: #bbb;
	margin-bottom: 15px;
}
.action-card-body .ivu-btn {
	font-size: 16px;
	padding: 0;
	color: #2e8cf0;
}
.action-card-footer .ivu-btn {
	margin-bottom: 10px;
	min-width: 50%;
}
.action-card-footer p{
	font-size: 16px;
}
</style>
