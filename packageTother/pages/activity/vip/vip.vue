<template>
	<view class="vip-container">
		<view class="vip">

			<image src="@/packageTother/static/images/activity/vip.webp" mode=""></image>
		</view>

		<view class="monnew-goods">
			<view class="item" v-for="item in goodsData" :key="item.id">
				<navigator :url="'packageTother/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
				<view class="img">
					<image :src="item.image_url" mode=""></image>
				</view>
				<view class="text">
					<view class="title">
						{{item.title}}
					</view>
					<view class="details">
						<view class="price">
							¥{{item.price}}
						</view>
						<view class="img">
							<image src="@/packageTother/static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
				</view>
				</navigator>
			</view>
		</view>

		<view class="vip">
			<image src="@/packageTother/static/images/activity/ka.webp" mode=""></image>
		</view>
	</view>
</template>

<script>
	import {
		getGoodsByStatus
	} from "@/api/index.js"

	export default {
		data() {
			return {
				goodsData: []
			}
		},
		methods: {
			async getGoodsData() {
				var {
					data
				} = await getGoodsByStatus(1);


				this.goodsData = data


			}
		},
		onLoad() {
			this.getGoodsData()
		}
	}
</script>

<style lang="scss" scoped>
	.vip-container {
		.vip {
			width: 100%;
			height: 400rpx;
			margin-bottom: 10rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.monnew-goods {

			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-left: 10px;
			margin-right: 10px;
			.item {
				width: 47%;
				height: 540rpx;
				background-color: #fff;
				overflow: hidden;
				margin-bottom: 20rpx;

				.img {
					width: 360rpx;
					height: 360rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.text {
					padding: 20rpx;

					.title {
						font-size: 26rpx;
						font-weight: normal;
						margin-bottom: 10rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;


					}

				}

				.details {
					display: flex;
					align-items: center;

					justify-content: space-between;

					.price {
						font-size: 18px;
						color: #FF0000;

					}

					.img {
						width: 48rpx;
						height: 48rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}

	}
</style>
