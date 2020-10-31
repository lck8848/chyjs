<template>
	<view class="snack_classify">
		<!-- 分割线 -->
		<view class="divider">
			<van-divider borderColor="#EBEBEB"></van-divider>
		</view>
		<view class="all_snack">
			<image src="@/static/images/index/snack.webp" class="img" @click="toClassifyGoods"></image>
			<view class="outside">
				<view class="inside" v-for="item in snackData" :key="item.id">
					<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
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
		name: "snack",
		data() {
			return {
				snackData: []
			}
		},
		methods: {
			async getSnackList() {
				// 解构赋值拿到data
				var {
					data
				} = await getClassifyGoods(1031);
				// 用slice方法筛选出九个产品
				data = data.slice(0, 9)
				this.snackData = data;
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: `/pages/?id=${id}`
				})
			},
			// 点击各种零食图片跳转到相应的页面
			toClassifyGoods() {
				uni.navigateTo({
					url: "/pages/index/classify?genre=snacks"
				})
			}
		},
		created() {
			this.getSnackList();
		}
	}
</script>

<style lang="scss" scoped>
	.snack_classify {

		// 分割线
		.divider {
			margin-top: -26rpx;
			margin-bottom: -12rpx;
		}

		.all_snack {
			// margin-top: 280rpx;
			margin-bottom: 480rpx;

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
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	}
</style>
