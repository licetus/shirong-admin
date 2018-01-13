<template>
	<Card>
		<Row>
			<Col :span="8">
				<SafeImg :src="src" type=""></SafeImg>
				<img :src="src" />
				<p>{{src}}</p>
				<RadioGroup v-model="src">
					<Radio label="http://localhost:8080/admin/loans/files/car1.png">fake</Radio>
					<Radio label="//192.168.31.240/files/image-af5330e7.png">server</Radio>
				</RadioGroup>
			</Col>
		</Row>
	</Card>
</template>

<script>
import a from '../../images/logo.png'
import b from '../../images/logo-min.png'
import c from '../../images/test-avatar.png'
import d from '../../images/cropper-test.png'

export default {
	data() {
		return {
			a,
			b,
			c,
			d,
			src: a,
		}
	},
}
</script>

<style lang="less">
</style>
