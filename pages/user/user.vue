<template>
	<view class="container">
		<!-- 回到顶部 -->
		<view class="top-button" @click="ToTop">
			<image src="../../static/images/index/icon/top.png" class="topimg"></image>
		</view>
		
		<!-- 更多精选商品 -->
		<van-divider content-position="center"  textColor="#333333">更多精选商品</van-divider>
		<recommend></recommend>
	</view>
</template>

<script>
	import recommend from "../../component/recommend/recommend.vue";
	export default {
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			// 回到顶部
			ToTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
		},components:{
			recommend
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #F9F9F9;
		height:3000rpx;
		// 回到顶部
				.top-button {
					width: 70upx;
					height: 70upx;
					// 固定定位
					position: fixed;
					right: 40rpx;
					bottom: 200upx;
					z-index: 9999;
					.topimg{
						width:100rpx;
						height:100rpx;
					}
				}
				
				
	}
</style>
