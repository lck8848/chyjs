<template>
	<view>
		<view class="tui-searchbox">
			<view class="tui-rolling-search">
				<icon type="search" :size='13' color='#999'></icon>
				<swiper vertical autoplay circular interval="8000" class="tui-swiper">
					<swiper-item v-for="(item,index) in hotSearch" :key="index" class="tui-swiper-item" @tap="search">
						<view class="tui-hot-item">大家正在搜：{{item}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hotSearch: [
					"螺蛳粉",
					"榴莲千层",
					"肉松海苔卷"
				],
			};
		},
		methods:{
			search: function() {
				uni.navigateTo({
					url: '/packageTother/pages/search/search' 
				})
			},
		}
	}
</script>

<style lang="scss">
.tui-searchbox {
		padding: 16rpx 20rpx;
		box-sizing: border-box;
		background-color: #F2F2F2;
	}

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		// border-radius: 35rpx;s
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		color: #999;
	}

	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-hot-item {
		line-height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-banner-swiper {
		width: 100%;
		height: 300rpx;
		position: relative;
	}

	.tui-slide-image {
		width: 100%;
		height: 300rpx;
		display: block;
	}
	
	.tui-icon-delete {
		padding: 10rpx;
	}
	

</style>
