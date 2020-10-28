<template>
	<view class="problem-container">
		<van-cell title='1、获取手机验证码提示`短信发送频繁`，该怎么办' is-link />
		<van-cell title="2、如何更换已绑定的手机号？" is-link />
		<van-cell title="3、没有“收不到验证码”的点击选项怎么办?" is-link />
		<van-cell title="4、如何删除个人信息或订单信息？" is-link />
		<van-cell title="5、如何删除你在某个店铺的手机号？" is-link />
	</view> 
</template>

<script>
import { updateUser } from '@/api/index.js';
export default {
	data() {
		return {};
	},
	methods: {},
	onShow() {}
};
</script>

<style lang="scss" scoped>
.problem-container {
	
}
</style>
