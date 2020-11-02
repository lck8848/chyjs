<template>
	<view class="monnew-container">
		<view class="monnew">
			<image src="http://47.106.36.197:7000/source/home/monnew.webp" mode=""></image>
		</view>
		
		<view class="monnew-goods">
			<view class="item" v-for="item in goodsData" :key="item.id">
				<navigator :url="'/packageTother/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
					<view class="img-shell">
						<image class="img" :src="item.image_url" mode="widthFix"></image>
					</view>
					<view class="text">
						<view class="title">
							{{item.title}}
						</view>
						<view class="details">
							<view class="price">
								 <view class="icon">
								 	￥
								 </view>
								 {{item.price}}
							</view>
							<view class="cart">
								<image class="cart-icon" src="http://47.106.36.197:7000/source/other/cart-circle-o.png" mode="widthFix"></image>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			</view>
		<view class="monnew">

			<image src="http://47.106.36.197:7000/source/home/ka.webp" mode=""></image>
		</view>
	</view>
</template>

<script>
	import { getGoodsByStatus } from "@/api/index.js"
	export default {
		data() {
			return {
				goodsData:[]
			}
		},
		methods: {
			 async getGoodsData(){
				 var {data} = await getGoodsByStatus(3);
				 this.goodsData = data
			 }
		},
		onLoad() {
			this.getGoodsData()
		}
	}
</script>

<style lang="scss" scoped>
	.monnew-container {
		background-color: #f9f9f9;
		.monnew{
			width: 100%;
			height: 360rpx;
			margin-bottom: 20rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.monnew-goods{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 20rpx;
			.item{
				width: 46%;
				background-color: #fff;
				overflow: hidden;
				border-radius: 16rpx;
				margin: 10rpx;
				.img-shell{
					width: 100%;
					height: auto;
					
					.img{
						width: 100%;
						height: auto;
					}
				}
				.text{
					padding: 12rpx 30rpx;
					.title{
						color: #323233;
						font-size: 26rpx;
						margin-bottom: 10rpx;
						
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.details{
						display: flex;
						align-items: center;
						justify-content: space-between;
						height: 88rpx;
						line-height: 88rpx;
						.price{
							display: flex;
							font-size: 36rpx;
							color: #f44;
							.icon {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
						.cart{
							width: 48rpx;
							height: 48rpx;
							
							.cart-icon {
								vertical-align: top;
								width: 100%;
								height: auto;
							}
						}
					}
				}
			}
		}
	}
</style>
