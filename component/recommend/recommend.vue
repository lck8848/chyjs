<template>
	<view class="reommend_container">
		<view class="outside">
			<view class="inside">
				<image src="../../static/images/note/banfen.jpg" class="small_item"></image>
				<text class="title">【养鸡山野南昌拌粉】丰富配料 爽滑美味 200</text>
				<view class="money">
					<view class="rmb">
						<text class="small">￥</text>
						<text class="need">32.8</text>
					</view>
					<text class="hot">大家都在买</text>
				</view>
			</view>
			<view class="inside">
				<image src="../../static/images/note/banfen.jpg" class="small_item"></image>
				<text class="title">【养鸡山野南昌拌粉】丰富配料 爽滑美味 200</text>
				<view class="money">
					<view class="rmb">
						<text class="small">￥</text>
						<text class="need">32.8</text>
					</view>
					<text class="hot">大家都在买</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {getRecommend} from"../../api/index.js";
</script>

<style lang="scss">
	.reommend_container {

		// width:750rpx;
		.outside {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 745rpx;

			.inside {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				width: 48%;
				height: 550rpx;
				background-color: white;
				border-radius: 10rpx;

				.small_item {
					width: 100%;
					height: 350rpx;
					border-radius: 10rpx;
				}

				.title {
					padding: 5rpx;
					margin-top: -14rpx;
					font-size: 29rpx;
					// 两行以后使用省略号
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.money {
					display: flex;
					justify-content: space-around;

					// 人民币
					.rmb {
						display: flex;
						align-items: center;

						.small {
							color: red;
							font-size: 24rpx;
						}

						.need {
							color: red;
							font-size: 36rpx;
						}
					}

					.hot {
						margin-bottom: 6rpx;
						color: red;
						font-size: 24rpx;
					}
				}
			}
		}

	}
</style>
