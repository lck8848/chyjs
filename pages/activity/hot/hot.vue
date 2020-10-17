<template>
	<view class="hot-container">
		<!-- 标题 -->
		<view class="hot">
			<image src="../../static/images/activity/hot.webp" mode=""></image>
		</view>
		<!-- 列表 -->
		<view class="hot-goods">
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upsload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
				<view class="text">
					<view class="title">
						［烤兔］整只手撕 大口吃肉 500g/袋
					</view>
					<view class="vip_price">
						9折会员价：62.91元。
					</view>
					<view class="details">
						<view class="price">
							 ￥69.6
						</view>
						<view class="img">
							<image src="../../static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
				<view class="text">
					<view class="title">
						［烤兔］整只手撕 大口吃肉 500g/袋
					</view>
					<view class="vip_price">
						9折会员价：62.91元。
					</view>
					<view class="details">
						<view class="price">
							 ￥69.6
						</view>
						<view class="img">
							<image src="../../static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
				<view class="text">
					<view class="title">
						［烤兔］整只手撕 大口吃肉 500g/袋
					</view>
					<view class="vip_price">
						9折会员价：62.91元。
					</view>
					<view class="details">
						<view class="price">
							 ￥69.6
						</view>
						<view class="img">
							<image src="../../static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
				<view class="text">
					<view class="title">
						［烤兔］整只手撕 大口吃肉 500g/袋
					</view>
					<view class="vip_price">
						9折会员价：62.91元。
					</view>
					<view class="details">
						<view class="price">
							 ￥69.6
						</view>
						<view class="img">
							<image src="../../static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
		</view>s
		
		
		<view class="ka">
			<image src="../../static/images/activity/ka.webp" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsData:[]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" >
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
