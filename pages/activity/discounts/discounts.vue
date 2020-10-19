<template>
	<view class="discounts-container">
		<view class="discounts">
			<image src="@/static/images/activity/discounts.webp" mode=""></image>
		</view>
		
		
		<view class="discounts_goods">
			<view class="item">
				<view class="img" >
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
					<view class="tui-countdown">
						<view class="tui-countdown-text">距结束</view>
						<tui-countdown :time="timeList[0]" :scale="true" :isColon="true" color="#e41f19" borderColor="#e41f19" colonColor="#e41f19" :days="true"></tui-countdown>
					</view>
				</view>
				
				<view class="text">
					<view class="info">
						<view class="title">
							<view class="biaoti">
								<view class="zheko">
										9折起
								</view>
								［6英寸千层蛋糕］果肉多多 榴莲/芒果口味 2-3人食
							</view>
							<view class="vip">
								9折会员价：88.2-97.2元。
							</view>
						</view>
						
						<view class="price">
							<view class="container">
								<view class="vip_price">
									¥88
								</view>
								<view class="sell_price">
									¥110.10
								</view>
							</view>
						
							<view class="promptly">
								立即抢购
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
			
				<view class="text">
					<view class="info">
						<view class="title">
							<view class="biaoti">
								<view class="zheko">
										9折起
								</view>
								［6英寸千层蛋糕］果肉多多 榴莲/芒果口味 2-3人食
							</view>
							<view class="vip">
								9折会员价：88.2-97.2元。
							</view>
						</view>
						
						<view class="price">
							<view class="container">
								<view class="vip_price">
									¥88
								</view>
								<view class="sell_price">
									¥110.10
								</view>
							</view>
						
							<view class="promptly">
								立即抢购
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
			
				<view class="text">
					<view class="info">
						<view class="title">
							<view class="biaoti">
								<view class="zheko">
										9折起
								</view>
								［6英寸千层蛋糕］果肉多多 榴莲/芒果口味 2-3人食
							</view>
							<view class="vip">
								9折会员价：88.2-97.2元。
							</view>
						</view>
						
						<view class="price">
							<view class="container">
								<view class="vip_price">
									¥88
								</view>
								<view class="sell_price">
									¥110.10
								</view>
							</view>
						
							<view class="promptly">
								立即抢购
							</view>
						</view>
						
					</view>
				</view>
			</view>
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
			
				<view class="text">
					<view class="info">
						<view class="title">
							<view class="biaoti">
								<view class="zheko">
										9折起
								</view>
								［6英寸千层蛋糕］果肉多多 榴莲/芒果口味 2-3人食
							</view>
							<view class="vip">
								9折会员价：88.2-97.2元。
							</view>
						</view>
						
						<view class="price">
							<view class="container">
								<view class="vip_price">
									¥88
								</view>
								<view class="sell_price">
									¥110.10
								</view>
							</view>
						
							<view class="promptly">
								立即抢购
							</view>
						</view>
						
					</view>
				</view>
			</view>
		</view>
		
		
		
		<view class="ka">
			<image src="@/static/images/activity/ka.webp" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timeList: [240000]
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.discounts-container {
		background-color: #f9f9f9;
		.discounts{
			width: 100%;
			height: 200rpx;
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
		.discounts_goods{
			.item{
				display: flex;
				background-color: #FFF;
				height: 145px;
				margin-top: 20rpx;
				.img{
					position: relative;
					width: 145px;
					height: 145px;
					image{
						width: 145px;
						height: 100%;
					}
				}
				.text{
					.info{
						height: 240rpx;
						padding: 20rpx;
						display: flex;
						flex-direction: column;
						
						justify-content: space-between;
						overflow: hidden;
						.title{
							
							.biaoti{
								font-size: 26rpx;
								margin-bottom: 10rpx;
								overflow : hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
								.zheko{
									display: inline-block;
									background-color: #ffecec;
									border-radius: 20rpx;
									font-size: 24rpx;
									color: #FF4444;
								}
							}
							.vip{
								font-size: 24rpx;
								color: #969799;
							}
							
						}
						
						.price{
							display: flex;
							justify-content: space-between;
							.container{
								display: flex;
								justify-content: space-between;
								.vip_price{
									margin-right: 10rpx;
									font-size: 36rpx;
									color: #FF0000;
								}
								.sell_price{
									margin-top: 15rpx;
									font-size: 21rpx;
									text-decoration: line-through;
									color: #969799;
								}
							}
							
								
							.promptly{
								width: 144rpx;
								height: 48rpx;
								line-height: 48rpx;
								text-align: center;
								border: 1px solid #FF0000;
								border-radius: 40rpx;
								color: #f00000;
							}
						}
						
					}
				}
			
			}
		}
		.tui-countdown {
				position: absolute;
				width: 145px;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #FF0000;
				bottom:0px;
				
				
		}
		.tui-countdown-text {
			font-size: 30rpx;
			line-height: 30rpx;
			color: #fff;
		}
	}
</style>
