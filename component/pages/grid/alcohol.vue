<template>
	<view class="alcohol_container">
		<!-- 分割线 -->
		<view class="divider">
			<van-divider borderColor="#EBEBEB"></van-divider>
		</view>
		<view class="sendGift">
			<image src="@/static/images/index/alcohol.webp" class="img" @click="toClassifyGoods"></image>
			<view class="outside">
				<view class="inside" v-for="item in alcoholData" :key="item.id">
					<!-- navigator为页面跳转，open-type为页面跳转数据 -->
					<!-- 传id跳转到相应商品详情 -->
					<navigator :url="'/packageTother/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
						<image :src="item.image_url" class="small_item"></image>
						<text>{{item.title}}</text>
						<view class="money">
							<view class="all">
								<text class="small">￥</text>
								<text class="big">{{item.price}}</text>
							</view>
							<image src="@/static/icon/cart-circle-o.png" class="cart"></image>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getClassifyGoods
	} from "@/api/index.js"
	export default {
		name: "alcohol",
		data() {
			return {
				alcoholData: {}
			}
		},
		methods: {
			async getalcohol() {
				var {
					data
				} = await getClassifyGoods(1034);
				data = data.slice(0, 9);
				this.alcoholData = data;
			},
			// 点击各种酒水跳转到相应页面
			toClassifyGoods() {
				uni.navigateTo({
					url: "/pages/index/classify?genre=liquor"
				})
			}
		},
		created() {
			this.getalcohol();
		}
	}
</script>

<style lang="scss" scoped>
	.alcohol_container {

		// 分割线
		.divider {
			margin-top: -26rpx;
			margin-bottom: -12rpx;
		}

		.sendGift {
			// margin-top: 280rpx;
			margin-bottom: 500rpx;

			.img {
				width: 100%;
				height: 180rpx;

			}

			width:750rpx;

			// height:1000rpx;
			.outside {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				height: 800rpx;
				border: 1px solid #F9F9F9;

				.inside {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 31%;
					height: 390rpx;
					margin-bottom: 20rpx;
					background-color: white;

					text {
						// padding:8rpx;
						font-size: 26rpx;
						font-weight: bold;

						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.small_item {
						width: 100%;
						height: 220rpx;
					}

					.money {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 14rpx;
						margin-top: 14rpx;
						margin-left: -5rpx;
						font-size: 32rpx;
						color: #FF4444;

						// 价钱
						.all {
							display: flex;
							align-items: center;

							.small {
								font-size: 24rpx;
							}

							.big {
								font-size: 32rpx;
							}
						}

						.cart {
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
		}
	}
</style>
