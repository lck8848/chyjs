<template>
	<view class="new-container">
		<view class="head">
			<view class="title">
				新品
			</view>
			<view class="more" @click="tonew()">
				更多
				<image class="icon" src="http://47.106.36.197:7000/source/other/right2.png" mode="widthFix"></image>
			</view>
		</view>
		<scroll-view class="scroll" scroll-x="true">
			<view class="item" v-for="item in newgoods" :key="item.id" @click="todetail(item.id)">
				<view class="goods">
					<view class="img-shell">
						<image lazy-load="true" :src="item.image_url" mode="widthFix" class="img"></image>
						<view class="label">
							新品
						</view>
					</view>
		
					<view class="text">
						<view class="title">
							{{item.title}}
						</view>
						<view class="bottom">
							<view class="left">
								<text class="price-icon">￥</text>
								{{item.price}}
							</view>
							<view class="right">
								<image class="right-icon" src="http://47.106.36.197:7000/source/other/cart-circle-o.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
	
	
			<view class="to-more" @click="tonew()">
				<view class="info">
					查看更多
					<image class="right" src="http://47.106.36.197:7000/source/home/right_point.png" mode="widthFix"></image>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import { getGoodsByStatus } from "@/api/index.js";
	export default {
		data() {
			return {
				newgoods: []
			};
		},
		methods: {
			async init() {
				var { data } = await getGoodsByStatus(3, 1, 6);
				this.newgoods = data;
			},
			tonew() {
				uni.navigateTo({
					url: "/packageTother/pages/new/new"
				})
			},
			todetail(id) {
				uni.navigateTo({
					url: "/packageTother/pages/goods/detail?id=" + id
				})
			},
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
.new-container {
	padding: 0 20rpx;
	
	.head {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 30rpx;
	
		.title {
			background-color: rgb(217, 129, 84);
			font-size: 28rpx;
			color: #FFFFFF;
			padding: 4rpx 18rpx;
			border-radius: 6rpx;
		}
	
		.more {
			font-size: 24rpx;
			color: #969799;
			.icon {
				vertical-align: text-top;
				width: 24rpx;
				height: auto;
			}
		}
	}
	.scroll {
		white-space: nowrap;

		.to-more {
			display: inline-block;
			vertical-align: super;
			width: 200rpx;
			margin: 0 20rpx 0 10rpx;
			.info {
				color: #969799;
				font-size: 24rpx;
				text-align: center;
				line-height: 370rpx;
				box-shadow: 0 2px 4px rgba(0,0,0,0.1);
				background-color: #efefef;
				.right {
					width: 24rpx;
					height: auto;
					margin-left: 4rpx;
				}
			}
		}

		.item {
			display: inline-block;
			width: 220rpx;
			.goods{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				margin: 10rpx;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0,0,0,0.1);
				.img-shell {
					position: relative;
					width: 100%;
					height: 200rpx;
	
					.label {
						position: absolute;
						left: 0;
						top: 14rpx;
						font-size: 24rpx;
						color: white;
						background-color: rgb(255, 68, 68);
						padding: 0 10rpx;
						border-radius: 0 20rpx 20rpx 0;
					}
					.img {
						width: 100%;
						height: auto;
					}
				}
	
				.text {
					padding: 16rpx 16rpx 4rpx 16rpx;
					.title {
						color: #323233;
						font-size: 26rpx;
						font-weight: bold;
						white-space: pre-wrap;
						
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
	
					.bottom {
						display: flex;
						justify-content: space-between;
						padding-top: 25rpx;
	
						.left {
							font-size: 30rpx;
							color: #ff4444;
							font-weight: bold;
	
							.price-icon {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
	
						.right {
							width: 40rpx;
	
							.right-icon {
								width: 100%;
								height: auto;
							}
						}
					}
				}
			}
		}
	}
}
</style>
