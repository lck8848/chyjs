<template>
	<view class="classify-container">
		<view class="divider">
			<van-divider borderColor="#EBEBEB"></van-divider>
		</view>
		<view class="sendGift">
			<image :src="imgUrl" class="img" @click="toClassifyGoods"></image>
			<view class="outside">
				<view class="goods" v-for="item in goodsList" :key="item.id">
					<!-- navigator为页面跳转，open-type为页面跳转数据 -->
					<!-- 传id跳转到相应商品详情 -->
					<navigator :url="'/packageTother/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
						<image :src="item.image_url" class="img" mode="widthFix"></image>
						<view class="text">
							<view class="title">{{item.title}}</view>
							<view class="money">
								<view class="price">
									<text class="tag">￥</text>
									{{item.price}}
								</view>
								<image src="http://47.106.36.197:7000/source/other/cart-circle-o.png" class="icon" mode="widthFix"></image>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getGift, getClassifyGoods } from "@/api/index.js"
	export default {
		props: ["imgUrl", "genre"],
		data() {
			return {
				goodsList: []
			}
		},
		methods: {
			async getGoodsList() {
				let res;
				switch (this.genre){
					case "gift":
						res = await getGift(1, 9);
						break;
					case "snacks":
						res = await getClassifyGoods(1031, 1, 9);
						break;
					case "fruits":
						res = await getClassifyGoods(1032, 1, 9);
						break;
					case "tea":
						res = await getClassifyGoods(1033, 1, 9);
						break;
					case "liquor":
						res = await getClassifyGoods(1034, 1, 9);
						break;
				}
				this.goodsList = res.data;
			},
			toClassifyGoods() {
				uni.navigateTo({
					url: "/packageTother/pages/index/classify?genre="+this.genre
				})
			}
		},
		created() {
			this.getGoodsList();
		}
	}
</script>

<style lang="scss" scoped>
.classify-container {
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
			flex-wrap: wrap;
			height: 800rpx;
			border: 1px solid #F9F9F9;
	
			.goods {
				width: 30%;
				margin: 12rpx;
				background-color: #fff;
				box-shadow: 0 2px 4px rgba(0,0,0,.06);
				.img {
					width: 100%;
					height: auto;
					// height: 224rpx;
				}
				.text {
					padding: 0 16rpx 4rpx 16rpx;
					.title {
						color: #323233;
						font-size: 24rpx;
						font-weight: 700;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.money {
						display: flex;
						justify-content: space-between;
						height: 80rpx;
						align-items: center;
						.price {
							color: #f44;
							font-size: 30rpx;
							font-weight: 700;
							.tag {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
						.icon {
							width: 40rpx;
							height: auto;
						}
					}
				}
			}
		}
	}
}
</style>
