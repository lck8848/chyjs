<template>
	<view class="gift_classify">
		<view class="sendGift">
			<image src="../../static/images/index/sendgift.webp" class="img" @click="toClassifyGoods"></image>
			<view class="outside">
				<view class="inside" v-for="item in giftData" :key="item.id">
					<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
						<image :src="item.image_url" class="small_item"></image>
						<text>{{item.title}}</text>
						<view class="money">
							<text>￥{{item.price}}</text>
							<image src="../../static/icon/cart-circle-o.png" class="cart"></image>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getGift
	} from "@/api/index.js";
	export default {
		name: "gift",
		data() {
			return {
				giftData: []
			}
		},
		methods: {
			async getGiftList() {
				// 解构赋值拿到data
				var {
					data
				} = await getGift();
				this.giftData = data;
				console.log(this.giftData);
			},
			// 点击送他礼物跳转到相应页面
			toClassifyGoods() {
				uni.navigateTo({
					url: "/pages/index/classify?genre=gift"
				})
			}
		},
		created() {
			this.getGiftList();
		}
	}
</script>

<style lang="scss" scoped>
	.gift_classify {
		.sendGift {
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
					width: 30%;
					height: 350rpx;
					margin-bottom: 10rpx;
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
						height: 180rpx;
					}

					.money {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 14rpx;
						margin-left: -5rpx;
						font-size: 32rpx;
						color: #FF4444;

						.cart {
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	}
</style>
