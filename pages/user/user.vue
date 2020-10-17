<template>
	<view class="container">
		<view class="intro">本项目已包含uni ui组件，无需import和注册，可直接使用。在代码区键入字母u，即可通过代码助手列出所有可用组件。光标置于组件名称处按F1，即可查看组件文档。</view>
		<text class="intro">详见：</text>
		<uni-link :href="href" :text="href"></uni-link>
		
		<!-- 回到顶部 -->
		<view class="top-button" @click="ToTop">
			<image src="../../static/images/index/icon/top.png" class="topimg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding: 20px;
		font-size: 14px;
		line-height: 24px;
		
		// 回到顶部
				.top-button {
					width: 70upx;
					height: 70upx;
					// 固定定位
					position: fixed;
					right: 23upx;
					bottom: 200upx;
					z-index: 9999;
					.topimg{
						width:100rpx;
						height:100rpx;
					}
				}
	}
</style>
