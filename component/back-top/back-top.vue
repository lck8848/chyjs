<template>
	<view class="back-top-container">
		<view class="top-button" @click="backTop" @scroll="scroll" v-show="isShow">
			<image src="/static/images/index/icon/top.png" class="topimg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['scrollTop'],
		data() {
			return {
				isShow: false
			};
		},
		watch: {
			scrollTop(val){
				this.showBackTop(val);
			}
		},
		methods: {
			showBackTop(scrollTop){
				if (scrollTop >= 300) {
					this.isShow = true
				} else {
					this.isShow = false
				}
			},
			backTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.back-top-container {
		.top-button {
			position: fixed;
			width: 70rpx;
			height: 70rpx;
			right: 49rpx;
			bottom: 160rpx;
			z-index: 5;

			.topimg {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>
