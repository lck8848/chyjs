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
				<view class="share" @click="onshare">
					
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
	
		<view class="g-detail" v-html="goodDetailData.details">
		</view>
		
	
	</view>
</template>

<script>
	import { getGoodsDetail } from "@/api/index.js"
	export default{
		data(){
			return{
				swiperdata:[],
				goodDetailData:{},
				
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
			
			},
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
		
			
		/deep/ .g-detail{
			
			img {
				width: 100%;
			}
		}
			
		
	}
	

</style>
