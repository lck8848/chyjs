<template>
	<view class="discounts-container">
		<view class="discounts">
			<image src="@/static/images/activity/discounts.webp" mode=""></image>
		</view>


		<view class="discounts_goods">
			<view class="item" v-for="(item,index) in goodsData" :key="item.id">
				<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
					<view class="img">
						<image :src="item.image_url" mode=""></image>
						<view class="tui-countdown">
							<block v-if="flashow[index]">
								<view class="tui-countdown-text">距结束</view>
								<tui-countdown :time="timeList[0]" :scale="true" :isColon="true" color="#e41f19" borderColor="#e41f19" colonColor="#e41f19"
								:days="true"></tui-countdown>
							 </block>
							
						</view>
						<block v-if="!flashow[index]">
							<view class="jiesu_img">
								<image src="../../../static/images/user/已结束.png" mode=""></image>
							</view>
						</block>
					</view>
					
				</navigator>
				<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
				<view class="text">
					<view class="info">
						<view class="title">
							<view class="biaoti">
								<view class="zheko">
									{{(item.discount*10).toFixed(1)}}折起
								</view>
								{{item.title}}
							</view>
							<view class="vip">
								{{item.sell_point}}
							</view>
						</view>

						<view class="price">
							<view class="container">
								<view class="vip_price">
									¥{{item.price}}
								</view>
								<view class="sell_price">
									¥{{item.original}}
								</view>
							</view>

							<view class="promptly">
								立即抢购
							</view>
						</view>

					</view>
				</view>
				</navigator>
			</view>
		</view>



		<view class="ka">
			<image src="@/static/images/activity/ka.webp" mode=""></image>
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
				timeList: [],
				goodsData: [],
				flashow:[],
				
			}
		},
		methods: {
			async getGoodsData() {
				var {
					data
				} = await getGoodsByStatus(2);
				
				
				this.goodsData = data
				var timestamp = new Date().getTime();
				console.log(timestamp)
				this.goodsData.map(v=>{
					this.timeList.push((timestamp - v.create_time)/1000);
				})
				this.timeList.map(v=>{
						
					if(v == 0 || v>0){
						this.flashow.push("false")
					}
				})
				console.log(this.goodsData)
				console.log(this.timeList);
				console.log(this.flashow)
			}
		},
		onLoad() {
			this.getGoodsData()
		}
	}
</script>

<style lang="scss" scoped>
	.discounts-container {
		background-color: #f9f9f9;

		.discounts {
			width: 100%;
			height: 200rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.ka {
			width: 100%;
			height: 400rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.discounts_goods {
			.item {
				display: flex;
				background-color: #FFF;
				height: 145px;
				margin-top: 20rpx;

				.img {
					position: relative;
					width: 145px;
					height: 145px;

					image {
						width: 145px;
						height: 100%;
					}
					
				}
					
				
				.text {
					.info {
						height: 300rpx;
						padding: 20rpx;
						display: flex;
						flex-direction: column;

						justify-content: space-between;
						overflow: hidden;

						.title {
							height: 150rpx;
							.biaoti {
								font-size: 26rpx;
								margin-bottom: 10rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;

								.zheko {
									display: inline-block;
									background-color: #ffecec;
									border-radius: 20rpx;
									font-size: 24rpx;
									color: #FF4444;
								}
							}

							.vip {
								font-size: 24rpx;
								color: #969799;
							}

						}

						.price {
							display: flex;
							justify-content: space-between;

							.container {
								display: flex;
								justify-content: space-between;

								.vip_price {
									margin-right: 10rpx;
									font-size: 36rpx;
									color: #FF0000;
								}

								.sell_price {
									margin-top: 15rpx;
									font-size: 21rpx;
									text-decoration: line-through;
									color: #969799;
								}
							}


							.promptly {
								width: 144rpx;
								height: 48rpx;
								line-height: 48rpx;
								text-align: center;
								border: 1px solid #FF0000;
								border-radius: 40rpx;
								color: #f00000;
								font-size: 32rpx;
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
			bottom: 0px;


		}

		.tui-countdown-text {
			font-size: 30rpx;
			line-height: 30rpx;
			color: #fff;
		}
		.jiesu_img{
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 9999;
			background-color: #ccc;
			opacity: 0.5;
		}
	}
</style>
