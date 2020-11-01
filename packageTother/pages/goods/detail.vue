<template>
	<view class="detail-container">
		
		<!-- 头部 -->
		<view class="head">
			<view class="title" @click="toindex">
				<view class="logo">
					<image src="http://47.106.36.197:7000/source/home/logo.webp" mode=""></image>
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
					<button class="button" data-name="shareBtn" open-type="share">
						<image src="http://47.106.36.197:7000/source/home/share.png" mode=""></image>
						<text>分享</text>
					</button>
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
				<image src="http://47.106.36.197:7000/source/other/right.png" mode=""></image>
			</view>
		</view>
		
		<view class="select" @tap.stop="showPopup">
			<view class="title">
				<text class="first">选择</text>
				<text class="second">已选择&ensp;{{goodDetailData.speclist[activeindex].spec_name }}</text>

			</view>
			<view class="img">
				<image src="http://47.106.36.197:7000/source/other/right.png" mode=""></image>
			</view>
		</view>
		<!-- 运费 服务 选择 -->

		
		<!-- 吃货研究所店铺 -->
		<view class="shop-container">
			<view class="img">
				<image src="http://47.106.36.197:7000/source/home/logo.webp" mode=""></image>
			</view>
			<view class="middle">
				<view class="title">
					吃货研究所店铺
				</view>
				<view class="image">
					<image src="http://47.106.36.197:7000/source/home/laodian.png" mode=""></image>
				</view>
			</view>
			<view class="tail">
				<navigator url="/pages/index/index">
						<view class="buttons" @tap="toindex">
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
					<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" >
						<tui-icon name="kefu" :size="22" color="#333"></tui-icon>
						<view class="tui-operation-text tui-scale-small">客服</view>
					</view>
					<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="toindex">
						<tui-icon name="shop" :size="22" color="#333"></tui-icon>
						<view class="tui-operation-text tui-scale-small">店铺</view>
					</view>
					<view class="tui-operation-item" hover-class="tui-opcity" :hover-stay-time="150" @tap="topcarshop">
						<tui-icon name="cart" :size="22" color="#333"></tui-icon>
						<view class="tui-operation-text tui-scale-small">购物车</view>
						<tui-badge type="red" absolute :scaleRatio="0.8" right="10rpx" top="-4rpx" v-if="carnumshow">{{carnum}}</tui-badge>
					</view>
				</view>
				
				<view class="tui-operation-right tui-right-flex tui-col-7 tui-btnbox-4">
					<view class="tui-flex-1">
						<tui-button height="68rpx" :size="26" type="danger" shape="circle" @click.stop="showPopup">加入购物车</tui-button>
					</view>
					<!-- <view class="tui-flex-1">
						<tui-button height="68rpx" :size="26" type="warning" shape="circle" @click="showPopup1">立即购买</tui-button>
					</view> -->
				</view>
			</view>
			
			
		</view>
		<!-- 底部栏  -->
		
		<!-- 底部弹窗(加入购物车) -->
		<tui-bottom-popup :show="popupShow" @close.stop="closePopup">
			<view class="tui-popup-box">
				<view class="tui-product-box tui-padding">
					<image :src="goodDetailData.image_url" class="tui-popup-img"></image>
					<view class="tui-popup-price">
						<view class="tui-amount tui-bold">￥{{goodDetailData.speclist[activeindex].price }}</view>
						<view class="tui-number">原价&ensp;{{goodDetailData.speclist[activeindex].original}}</view>
						<view class="tui-number">剩余&ensp;{{goodDetailData.speclist[activeindex].stock_num}}件</view>
						<view class="tui-number">已选择&ensp;{{goodDetailData.speclist[activeindex].spec_name}}</view>
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<view class="tui-scrollview-box">
						<view class="tui-bold tui-attr-title">规格</view>
						<view class="tui-attr-box">
							<view class="tui-attr-item" v-for="(item,index) in goodDetailData.speclist" :key="index" 
							@click="changeindex(index)" :class="index===activeindex ? 'tui-attr-active' : ''">
								{{item.spec_name}}
							</view>
						</view>
		
						<view class="tui-number-box tui-bold tui-attr-title">
							<view class="tui-attr-title">数量</view>
							<tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox>
						</view>
						
					</view>
				</scroll-view>
				<view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
					<view class="tui-flex-1">
						<tui-button height="72rpx" :size="28" type="danger" shape="circle" @click.stop="hidePopup">加入购物车</tui-button>
					</view>
				</view>
				<view class="tui-right">
					<tui-icon name="close-fill" color="#999" :size="20" @click.stop="closePopup"></tui-icon>
				</view>
			</view>
		</tui-bottom-popup>
		<!-- 底部弹窗(加入购物车) -->
		
		
		
		
	</view>
</template>

<script>
	import { getGoodsDetail,addCart,getCartList, updateUser , updateCart ,delCart} from "@/api/index.js"
	export default{
		data(){
			return{
				swiperdata:[],
				goodDetailData:{},
				id:0,
				popupShow: false,
				value:1,
				activeindex:0,
				carnum:0,
				carnumshow:true
			}
		},
		methods:{
			
			toindex(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			topcarshop(){
				uni.switchTab({
					url:"/pages/shopcart/shopcart"
				})
			},
			changeindex(index){
				this.activeindex = index
			},
			showPopup: function() {
				this.popupShow = true;
				
			},
			closePopup(){
				this.popupShow = false
			},
			 hidePopup:async function() {
				this.popupShow = false
				var user = this.$store.state.user
				if(!user){
					uni.switchTab({
						url:"/pages/user/user"
					})
					uni.showToast({
						title:"亲，请先登录",
						icon:"none",
						duration:2000
					})
					return
				}
				var user_id = this.$store.state.user.id
				var goods_id = this.goodDetailData.id
				var seller_id = this.goodDetailData.seller_id
				var spec_id = this.goodDetailData.speclist[this.activeindex].id
				var obj = {
					userId:user_id,
					goodsId:goods_id, 
					sellerId: seller_id,
					count:this.value, 
					specId:spec_id,
				}
				
				var res = await addCart(obj)
				if(res.status != 0){
					uni.showToast({
						title:"添加购物车失败",
						icon:"none"
					})
					return
				}
				var res = await getCartList(user_id)
				var goodscount = res.data
				var updobj = {}

				var result = goodscount.filter(function (item) {
				    return (item.goods_id== obj.goodsId) && (item.spec_id == obj.specId);
				});
				
				if(result.length>0){
					for(var i = 0; i < result.length;i++){
					        for(var j = result.length-1;j>i;j--){
					                result[i].count += result[j].count  
					            }
					      }
						  
					var ids = result.filter(function (item) {
				    return item.id;
				});
					 ids.splice(0,1)
					 result.splice(1,result.length-1)
					var obj1 = {
						id:result[0].id,
						count:result[0].count
					}
					
					
					var arr2=[]
					for(var k=0;k<ids.length;k++){
						arr2.push(ids[k].id)
					}
					var obj2 = arr2.join(",")
					await updateCart(obj1)
					if(ids.length>0){
						await delCart(obj2)
					}
					
				}
				var res1 = await getCartList(user_id)
				this.carnum = res1.data.length
				if(this.carnumshow>0){
					this.carnumshow = true
				}else{
					this.carnumshow = false
				}
				uni.showToast({
					title:"添加购物车成功",
					duration:1000
				})
				
			},
			change: function(e) {
				this.value = e.value;
			},
			change1: function(e) {
				this.value1 = e.value;
			},
			touser(){
				uni.switchTab({
					url:"/pages/user/user"
				})
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				
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
				
				//将商品id记录到用户里
				let ids = this.$store.getters.getUser.goods_ids;
				if(!ids){
					return;
				}
				let goodsIds = ids.split(',');
				let gid = this.goodDetailData.id;
				
				let index = goodsIds.indexOf(gid.toString() || gid);
				if(index === -1){
					if(goodsIds.length >= 20){
						goodsIds.length = 19;
					}
				}else {
					goodsIds.splice(index, 1);
				}
				goodsIds.unshift(gid);
				this.$store.commit("updateGoodsIds", goodsIds.join(','));
				updateUser({id:this.$store.getters.getUser.id, goods_ids: goodsIds.join(',')});
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
				// uni.showModal({
				// 	content:"请点击右上角三个点进行分享",
				// 	showCancel:false
				// })
				// uni.share({
				//     provider: "weixin",
				//     scene: "WXSenceTimeline",
				//     type: 0,
				//     href: "http://uniapp.dcloud.io/",
				//     title: "uni-app分享",
				//     summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				//     imageUrl: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
				//     success: function (res) {
				//         console.log("success:" + JSON.stringify(res));
				//     },
				//     fail: function (err) {
				//         console.log("fail:" + JSON.stringify(err));
				//     }
				// });
			},

		},
		onLoad(option) {
			this.getGoodsDetailData(option.id);
		},
		async onShow() {
			
			
			var userid = this.$store.state.user.id
			if(!userid){
				this.carnumshow = false
				return
			}
			var {data} = await getCartList(userid);
			this.carnum = data.length;
			if(this.carnumshow>0){
				this.carnumshow = true
			}else{
				this.carnumshow = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-container{
		padding-bottom: 100rpx;
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
			padding: 16rpx 34rpx 16rpx;
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
				padding-right: 10rpx;
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
					.button{
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						border:none;
						outline: 0 none;
						margin: 0;
						padding: 0;
						width: 80rpx;
						background-color: #FFFFFF;
						// margin-right: 20rpx;
						text{
							padding: 0;
						}
						// height: rpx;
						// display: inline-block;
						
					}
					button{
						&::after{ 
							border: none;
							margin-right: 20rpx;
						}
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
			
		// 底部弹窗
		.tui-popup-box {
			position: relative;
			padding: 30rpx 0 100rpx 0;
			
			.tui-product-box {
				display: flex;
				align-items: flex-end;
				font-size: 24rpx;
				padding-bottom: 30rpx;
				
				.tui-popup-img {
					height: 200rpx;
					width: 200rpx;
					border-radius: 24rpx;
					display: block;
				}
				
				.tui-popup-price {
					padding-left: 20rpx;
					padding-bottom: 8rpx;
					
					.tui-amount {
						color: #ff201f;
						font-size: 36rpx;
					}
					.tui-bold {
						font-weight: bold;
					}
					
					.tui-number {
						font-size: 24rpx;
						line-height: 24rpx;
						padding-top: 12rpx;
						color: #999;
					}
				}
			
			}	
			
			.tui-padding {
				padding: 0 30rpx;
				box-sizing: border-box;
			}
			
			.tui-popup-scroll {
					height: 600rpx;
					font-size: 26rpx;
					
					.tui-scrollview-box {
						padding: 0 30rpx 60rpx 30rpx;
						box-sizing: border-box;
						
						.tui-bold {
							font-weight: bold;
						}
						
						
						.tui-attr-title {
							padding: 10rpx 0;
							color: #333;
							
							
							.tui-attr-title {
								padding: 10rpx 0;
								color: #333;
							}
							
							.tui-bold {
								font-weight: bold;
							}
							
							
							
						}
					
						
						.tui-attr-box {
							font-size: 0;
							padding: 20rpx 0;
							
							.tui-attr-item {
								max-width: 100%;
								min-width: 200rpx;
								height: 64rpx;
								display: -webkit-inline-flex;
								display: inline-flex;
								align-items: center;
								justify-content: center;
								background: #f7f7f7;
								padding: 0 26rpx;
								box-sizing: border-box;
								border-radius: 32rpx;
								margin-right: 20rpx;
								margin-bottom: 20rpx;
								font-size: 26rpx;
							}
							
							
							.tui-attr-active {
								background: #fcedea !important;
								color: #e41f19;
								font-weight: bold;
								position: relative;
								
								&::after {
									content: '';
									position: absolute;
									border: 1rpx solid #e41f19;
									width: 100%;
									height: 100%;
									border-radius: 40rpx;
									left: 0;
									top: 0;
								}
							}
						}
					
						.tui-number-box {
							display: flex;
							align-items: center;
							justify-content: space-between;
							padding: 20rpx 0 30rpx 0;
							box-sizing: border-box;
							
							.tui-attr-title {
								padding: 10rpx 0;
								color: #333;
							}
							
						}
					}
			
			}
			
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
					
					
					.tui-flex-1 {
						flex: 1;
						padding: 16rpx;
					}
					
					
					
					.tui-padding {
						padding: 0 30rpx;
						box-sizing: border-box;
					}
					
			}
			
			.tui-operation-right {
				height: 100rpx;
				padding-top: 0;
			}
			
			.tui-right-flex {
				display: flex;
				align-items: center;
				justify-content: center;
			}
			
			.tui-popup-btn {
				width: 100%;
				position: absolute;
				left: 0;
				bottom: 0;
			}
			
			.tui-right {
				position: absolute;
				right: 30rpx;
				top: 30rpx;
			}
			
		}
		// 底部弹窗
	}
	

</style>
