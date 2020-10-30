<template>
	<view class="centre-container">
		<view class="banner">
			<image src="/static/images/user/banner.png" class="banner_img"></image>
			<image src="/static/images/user/logo.png" class="logo"></image>
			<h2 class="title">有赞安全中心智能守护你的帐号安全</h2>
		</view>
		<view class="content">
			<view class="item">
				<van-cell title="注销账号" label="提交申请,删除所有数据,注销账号" link-type="navigateTo" url="/packageTother/pages/user/safety/centre/cancel/cancel" is-link />
			</view>
			<view class="item"><van-cell title="常见问题" label="点击可查看相关安全问题" link-type="navigateTo" url="/packageTother/pages/user/safety/centre/problem/problem" is-link /></view>
		</view>
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
.centre-container {
	.banner {
		position: relative;
		width: 100vw;
		height: 280rpx;
		text-align: center;
		.banner_img {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 280rpx;
			z-index: 1;
			overflow: hidden;
		}
		.logo {
			position: absolute;
			top: 56rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 108rpx;
			height: 108rpx;
			z-index: 2;
			overflow: hidden;
		}
		.title {
			position: absolute;
			width: 100vw;
			top: 178rpx;
			text-align: center;
			font-size: 14px;
			font-weight: 800;
			color: #fff;
			z-index: 3;
			overflow: hidden;
		}
	}
	.content{
		.item{
			margin-top: 20rpx;
		}
	}
}
</style>
