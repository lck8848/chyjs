<template>
	<view class="hot-container">
		<!-- 标题 -->
		<view class="hot">
			<image src="@/packageTother/static/images/activity/hot.webp" mode=""></image>
		</view>
		<!-- 列表 -->
		<view class="hot-goods">
			<view class="item" v-for="item in hotGoodsData" :key="item.id">
				<navigator :url="'/packageTother/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
					<view class="img">
						<image :src="item.image_url" mode=""></image>
					</view>
					<view class="text">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="vip_price">
							{{item.sell_point}}
						</view>
						<view class="details">
							<view class="price">
								 ￥{{item.price}}
							</view>
							<view class="img">
								<image src="@/packageTother/static/icon/cart-circle-o.png" mode=""></image>
							</view>
						</view>
						
					</view>
				</navigator>
			</view>
		
			
		</view>
		
		
		<view class="ka">
			<image src="@/packageTother/static/images/activity/ka.webp" mode=""></image>
		</view>
	</view> 
</template>

<script>
	import { getHotGoods } from "@/api/index.js"
	
	export default {
		data() {
			return {
				hotGoodsData:[],
				pageSzie:20
			}
		},
		methods: {
			async gethotGoods(){
				var { data } = await getHotGoods(this.pageSzie);
				this.hotGoodsData = data;
			}
		},
		
		created(){
			this.gethotGoods()
		}
	}
</script>

<style lang="scss" scoped>
	.hot-container {
		background-color: #f9f9f9;
		.hot{
			width: 100%;
			height: 200rpx;
			margin-bottom: 10rpx;
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
	
		.hot-goods{
			
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
			.item{
				width: 47%;
				height: 550rpx;
				background-color: #fff;
				overflow: hidden;
				margin-bottom: 20rpx;
				.img{
					width: 360rpx;
					height: 360rpx;
					
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					padding: 20rpx;
					.title{
						font-size: 26rpx;
						font-weight: normal;
						margin-bottom: 10rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						
						
					}
					.vip_price {
						font-size: 20rpx;
						color: #969799;
						margin-bottom: 15rpx;
						overflow : hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
						
					}
				}
				.details{
					display: flex;
					align-items: center;
					
					justify-content: space-between;
					
					.price{
						font-size: 18px;
						color: #FF0000;
						
					}
					.img{
						width: 48rpx;
						height: 48rpx;
						
						image{
							width: 100%;
							height: 100%;
						}
					}
				}
				
				
			}
		}	
	}
</style>
