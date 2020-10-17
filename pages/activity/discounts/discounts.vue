<template>
	<view class="discounts-container">
		<view class="discounts">
			<image src="../../../static/image/activity/discounts.webp" mode=""></image>
		</view>
		<view class="ka">
			<image src="../../../static/image/activity/ka.webp" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.discounts-container {
		.discounts{
			width: 100%;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ka{
			width: 100%;
			height: 400rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
