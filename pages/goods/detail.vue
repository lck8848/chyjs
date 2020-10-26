<template>
	<view class="detail-container">
		
		<!-- 头部 -->
		<view class="head">
			<view class="title" @click="toindex">
				<view class="logo">
					<image src="@/static/images/goods/detail/logo.webp" mode=""></image>
				</view>
				<view class="text">吃货研究所店铺</view>
			</view>
			<view class="tail">
				<navigator url="/pages/search/search">
					<view class="search">
						<icon type="search" :size='13' color='#333'></icon>
					</view>
				</navigator>
				
				<view class="text" @click="touser">
					我的记录
				</view>
			</view>
		</view>
		<!-- 头部 -->
		
		<!-- 轮播图 -->
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<block v-for="(item,index) in swiperdata":key="item">
					<swiper-item :data-index="index"  @tap.stop="previewImage"  >
						<view class="swiper-item"><image :src="item" mode=""></image></view>
					</swiper-item>
				</block>
			</swiper>
		</view>
		<!-- 轮播图 -->
		
		<!-- 价格标题 -->
		<view class="info">
			<view class="disprice">
				￥<text>{{goodDetailData.price}}</text>
			</view>
			<view class="price">
				价格<text>￥{{goodDetailData.original}}</text>
			</view>
			<view class="title">
				<view class="name">
					{{goodDetailData.title}}
				</view>



				<view class="share" @tap="share">
					

					<image src="@/static/images/goods/detail/share.png" mode=""></image>
					<text>分享</text>
				</view>
			</view>
			<view class="sell_point">
				{{goodDetailData.sell_point}}
			</view>
		</view>
		
		<!-- 价格标题 -->
		
		<!-- 运费 服务 选择 -->
		<view class="tranprice">
			<view class="title">
				<text class="first">运费</text>
				<text class="second">￥0.00-30.00</text>
			</view>
			<view class="residue">
				剩余{{ goodDetailData.stock_num}}
			</view>
		</view>
		
		<view class="service">
			<view class="title">
				<text class="first">服务</text>
				<text class="second">收货后结算,快递发货</text>
			</view>
			<view class="img">
				<image src="@/static/images/cart/right.png" mode=""></image>
			</view>
		</view>
		
		<view class="select">
			<view class="title">
				<text class="first">选择</text>
				<text class="second">规格</text>
			</view>
			<view class="img">
				<image src="@/static/images/cart/right.png" mode=""></image>
			</view>
		</view>
		<!-- 运费 服务 选择 -->

		
		<!-- 吃货研究所店铺 -->
		<view class="shop-container">
			<view class="img">
				<image src="@/static/images/goods/detail/logo.webp" mode=""></image>
			</view>
			<view class="middle">
				<view class="title">
					吃货研究所店铺
				</view>
				<view class="image">
					<image src="@/static/images/goods/detail/laodian.png" mode=""></image>
				</view>
			</view>
			<view class="tail">
				<navigator url="/pages/index/index">
				<view class="buttons">
					进店逛逛
				</view>
				</navigator>
			</view>
		</view>
		
		<!-- 吃货研究所店铺 -->
		
		<!-- 细节 -->
		<view  v-html="goodDetailData.details">
			
		</view>
		<!-- 细节 -->

		<!-- 底部栏 -->
		<view class="bottom">
			<view class="tui-operation">
				<view class="tui-operation-left tui-col-5">
					<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150">
						<tui-icon name="kefu" :size="22" color="#333"></tui-icon>
						<view class="tui-operation-text tui-scale-small">客服</view>
					</view>
					<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150">
						<tui-icon name="shop" :size="22" color="#333"></tui-icon>
						<view class="tui-operation-text tui-scale-small">店铺</view>
					</view>
					<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150">
						<tui-icon name="cart" :size="22" color="#333"></tui-icon>
						<view class="tui-operation-text tui-scale-small">购物车</view>
						<tui-badge type="red" absolute :scaleRatio="0.8" right="10rpx" top="-4rpx">9</tui-badge>
					</view>
				</view>
				
				<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
					<view class="tui-flex-1">
						<tui-button height="68rpx" :size="26" type="danger" shape="circle" @click="showPopup">加入购物车</tui-button>
					</view>
					<view class="tui-flex-1">
						<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="submit">立即购买</tui-button>
					</view>
				</view>
			</view>
			
			
		</view>
		<!-- 底部栏  -->
		
		
	</view>
</template>

<script>
	import { getGoodsDetail } from "@/api/index.js"
	export default{
		data(){
			return{
				swiperdata:[],
				goodDetailData:{},
				id:0
			}
		},
		methods:{
			
			toindex(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			touser(){
				uni.switchTab({
					url:"/pages/user/user"
				})
			},
			previewImage: function(e) {
				console.log(e)
				let index = e.currentTarget.dataset.index;
				console.log(index)
				
				uni.previewImage({
					current: this.swiperdata[index],
					urls: this.swiperdata
				});
			},
			async getGoodsDetailData(id){
				var { data } = await getGoodsDetail(Number(id));
				
				
				data.images.map(v=>{
					this.swiperdata.push(v.img_url)
				});
				this.goodDetailData = data;
				
				this.goodDetailData.details = this.goodDetailData.details.replace(/view/g,'div')
				this.goodDetailData.details = this.goodDetailData.details.replace(/image/g,'img style="width:100%"')

				console.log(data)
				console.log(this.swiperdata)
			},
			onShareAppMessage: function(e) {
				let title = this.goodDetailData.title
				let img = this.goodDetailData.images[0]
				return {
					title: title,
					path: 'pages/goods/detail?g_id=' + this.id,
					img_url: img
					}
			},
			share(){
				uni.showModal({
					content:"请点击右上角三个点进行分享",
					showCancel:false
				})
			},

		},
		onLoad(option) {
			this.getGoodsDetailData(option.id)
			
			 
		},
		onLoad(option) {
			this.getGoodsDetailData(option.id)

		}
	}
</script>

<style lang="scss">
	.detail-container{
		// 头部
		.head{
			width: 750rpx;
			display: flex;
			box-sizing: border-box;
			justify-content: space-between;
			align-items: center;
			padding: 10rpx 20rpx;
			background-color: #FFFFFF;
			.title{
				display: flex;
				align-items: center;
				justify-content: center;
				.logo{
					width: 52rpx;
					height: 52rpx;
					margin-right: 16rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					font-size: 28rpx;
					color: #646566;
				}
			}
			.tail{
				display: flex;
				align-items: center;
				justify-content: center;
				.search{
					padding: 10rpx;
				}
				.text{
					margin-left: 16rpx;
					font-size: 28rpx;
					color: #646566;
				}
			}
		}
		
		// 头部
		
		// 轮播图
		.swiper-container{
			.swiper{
				width: 750rpx;
				height: 672rpx;
				.swiper-item{
					width: 100%;
					height: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			
		}
		
		// 轮播图
		
		// 价格标题 
		.info{
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			width:750rpx;
			padding: 16rpx 24rpx 16rpx;
			box-sizing: border-box;
			.disprice{
				font-size: 32rpx;
				color: #FF4444;
				text{
					font-size: 44rpx;
				}
				margin-bottom: 10rpx;
			}
			.price{
				font-size: 24rpx;
				color: #969799;
				text{
					text-decoration: line-through;
				}
			}
			.title{
				display: flex;
				justify-content: space-between;
				margin-top:16rpx;
				.name{
					width:80%;
					font-size: 30rpx;
				}
				.share{
					width: 10%;
					display: flex;
					flex-direction: column;
					image{
						width: 36rpx;
						height: 36rpx;
					}
					text{
						font-size: 24rpx;
					}
					
				}
				
			}
			.sell_point{
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #969799;
			}
		}
		// 价格标题
		
		// 运费 服务 选择
		.tranprice{
			display: flex;
			justify-content: space-between;
			background-color: #ffffff;
			margin-top: 16rpx;
			padding: 16rpx 32rpx 16rpx;
			.title{
				display: flex;
				align-items: center;
				.first{
					font-size: 28rpx;
					color: #969799;
					margin-right: 10rpx;
				}
				.second{
					font-size: 28rpx;
				}
			}
			.residue{
				font-size: 28rpx;
				color: #969799;
			}
		}
		
		.service{
			display: flex;
			justify-content: space-between;
			background-color: #ffffff;
			margin-top: 16rpx;
			padding: 16rpx 32rpx 16rpx;
			.title{
				display: flex;
				align-items: center;
				.first{
					font-size: 28rpx;
					color: #969799;
					margin-right: 10rpx;
				}
				.second{
					font-size: 28rpx;
				}
			}
			.img{
				width: 32rpx;
				height: 48rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.select{
			display: flex;
			justify-content: space-between;
			background-color: #ffffff;
			padding: 16rpx 32rpx 16rpx;
			.title{
				display: flex;
				align-items: center;
				.first{
					font-size: 28rpx;
					color: #969799;
					margin-right: 10rpx;
				}
				.second{
					font-size: 28rpx;
				}
			}
			.img{
				width: 32rpx;
				height: 48rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		// 运费 服务 选择
		

		// 吃货研究所店铺
		 .shop-container{
			 width: 750rpx;
			 box-sizing: border-box;
			 display: flex;
			 background-color: #FFFFFF;
			 justify-content: space-between;
			 padding: 32rpx;
			 margin: 20rpx 0;
			 .img{
				 width: 96rpx;
				 height: 96rpx;
				 image{
					 width: 100%;
					 height: 100%;
				 }
			 }
			 .middle{
				 display: flex;
				 flex-direction: column;
				 justify-content: space-between;
				 .title{
					 
				 }
				 .image{
					 width: 152rpx;
					 height:32rpx;
					 image{
						 width: 100%;
						 height: 100%;
					 }
				 }
			 }
			 .tail{
				 display: flex;
				justify-content: center;
				align-items: center;
				.buttons{
					height: 132rpx;
					height: 54rpx;
					border: 2rpx solid #FF4444;
					text-align: center;
					line-height: 54rpx;
					border-radius: 1rem;
					box-sizing: border-box;
					color: #FF4444;
					font-size: 24rpx;
					padding: 0 16rpx;
				} 
			 }
		 }
		 
		 // 吃货研究所店铺
		 	
		/deep/ .g-detail{
			
			img {
				width: 100%;

			}
		}
		
		// 底部栏 
		.bottom{
			.tui-operation{
				width: 100%;
				height: 100rpx;
				background: rgba(255, 255, 255, 0.98);
				position: fixed;
				display: flex;
				align-items: center;
				justify-content: space-between;
				z-index: 10;
				bottom: 0;
				left: 0;
				padding-bottom: env(safe-area-inset-bottom);
				
				&::before {
						content: '';
						position: absolute;
						top: 0;
						right: 0;
						left: 0;
						border-top: 1rpx solid #eaeef1;
						-webkit-transform: scaleY(0.5);
						transform: scaleY(0.5);
					}
					
					.tui-col-5 {
						width: 41.66666667%;
					}
					
					
				
					
					.tui-col-7 {
						width: 58.33333333%;
					}
					
					
					
					
					.tui-safearea-bottom {
						width: 100%;
						height: env(safe-area-inset-bottom);
					}
					
					
					.tui-operation-right {
						height: 100rpx;
						padding-top: 0;
						
						.tui-flex-1 {
							flex: 1;
							padding: 16rpx;
						}
					}
					
					.tui-right-flex {
						display: flex;
						align-items: center;
						justify-content: center;
					}
					
					.tui-operation-left {
						display: flex;
						align-items: center;
						
						
						.tui-operation-item {
							flex: 1;
							display: flex;
							align-items: center;
							justify-content: center;
							flex-direction: column;
							position: relative;
							
							.tui-operation-text {
								font-size: 22rpx;
								color: #333;
							}
							
							
							
							.tui-scale-small {
								transform: scale(0.9);
								transform-origin: center center;
							}
							
						}
						
						.tui-opacity {
							opacity: 0.5;
						}
						
						
						
					}
				
				}
				
			
			
			
		}
		// 底部栏
			
		
	}
	

</style>
