<template>
	<view class="new-container">
		<!-- 搜索框 -->
		<view class="search">
			<view class="tui-searchbox">
				<view class="tui-search-input">
					<icon type="search" :size='13' color='#333'></icon>
					<input confirm-type="search" placeholder="大家都在搜：螺蛳粉" :focus="true" auto-focus placeholder-class="tui-input-plholder"
					 class="tui-input" v-model.trim="key"  />
					<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
				</view>
			</view>
			
			<view class="button">
				<button size="mini" type="warn" @click="search(key)">搜索</button>
			</view>
		</view>
		
		
		
		
		<!-- 搜索框 -->
		
		<!-- 头部 -->
		<view class="tui-header">
			
			<view class="tui-header-top">
				<view :data-selected="1" class="tui-top-item" :class="selected == 1 ? 'active' : '' " @click="screen">综合</view>
				
				<view class="tui-top-item" :class="selected == 2 || selected == 3 ? 'active' : '' " >
					<view >价格</view>
					<view class="tui-price-arrow" >
						<view :data-selected="2" class="tui-icon-box tui-arrow-up"   @click="up">
							<tui-icon name="turningup" :size="16" :color="selected == 2 ? '#ff4444' : '' "></tui-icon>
						</view>
						<view :data-selected="3" class="tui-icon-box tui-arrow-down"  @click="down">
							<tui-icon name="turningdown" :size="16" :color="selected == 3 ? '#ff4444' : '' " ></tui-icon>
						</view>
							
					</view>
				</view>
				
				<view :data-selected="4" class="tui-top-item" @tap="newgood" :class="selected == 4 ? 'active' : '' ">上新</view>
				
			</view>
		</view>
		
		<!-- 头部 -->
		
		
		<tui-loadmore :index="2" v-if="showload"></tui-loadmore>
		
		<!-- 商品列表 -->
		
		<view class="goods-list" v-else>
			
			<view class="item" v-for="item in goods" :key="item.id">
				<view class="img">
					<image :src="item.image_url" mode=""></image>
				</view>
				<view class="text">
					<view class="content">
						{{item.title}}
					</view>
					<view class="bottom">
						<view class="price">￥<text class="num">{{item.price}}</text></view>
						<view class="cart">
							<image src="@/static/images/index/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 商品列表 -->
	</view>
</template>

<script>
	import {getSearchResult} from "@/api/index.js"
	export default {
		data() {
			return {
				selected:1,
				goods:[],
				yuangoods:[],
				showload:false,
				keyword :"",
				key: "",
				history: JSON.parse(localStorage.getItem('history')) == null ? [] : JSON.parse(localStorage.getItem('history')) ,
			};
		},
		methods:{
			 screen(e){
				this.selected = 1
				this.showload = true
				setTimeout(()=>{
					this.goods = this.yuangoods
					this.showload = false
				},1000)
				
				

			},
			up(e){
				
				this.selected = 2
				this.showload = true
				let updata = this.goods.slice(0)
				// console.log(updata)
				updata.sort(function(a,b){
					return a.price - b.price
				})
				setTimeout(()=>{
					this.goods=updata
					this.showload = false
				},1000)
				
			},
			down(e){
				this.selected = 3
				this.showload = true
				let downdata = this.goods.slice(0)
				// console.log(updata)
				downdata.sort(function(a,b){
					return b.price - a.price
				})
				setTimeout(()=>{
					this.goods=downdata
					this.showload = false
				},1000)
				
			},
			newgood(e){
				this.selected = 4
				this.showload = true
				setTimeout(()=>{
					this.goods = this.yuangoods
					this.showload = false
				},1000)
				
			},
			async search(val){
				var res = await getSearchResult(val)
				this.goods = res.data
				this.yuangoods = res.data
				var data = this.key
				this.history.push_unique(data)
				localStorage.setItem('history',JSON.stringify(this.history))
				
			},
			async init(){
				var {data} = await getSearchResult(this.keyword)
				this.goods = data
				this.yuangoods = data
				
			}
		},
		onLoad(options){
			console.log(options.keyword)
			Array.prototype.push_unique = function () {
				for (var i = 0; i < arguments.length; i++) {
					var ele = arguments[i];
					if (this.indexOf(ele) == -1) {
						this.push(ele);
					}
				}
			};
			this.keyword = options.keyword
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.new-container{
		// 搜索框
		.search{
			display: flex;
			justify-content: center;
			align-items: center;
			.tui-searchbox {
				padding: 10rpx 10rpx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				flex: 1;
				// background-color: #FFFFFF;
				
				.tui-search-input {
					width: 100%;
					height: 66rpx;
					/* border-radius: 35rpx; */
					padding: 0 30rpx;
					box-sizing: border-box;
					background: #FFFFFF;
					display: flex;
					align-items: center;
					flex-wrap: nowrap;
					
					.tui-input {
						// flex: 1;
						color: #333;
						padding: 0 16rpx;
						font-size: 28rpx;
					}
					
				}
				.button{
					font-size: 28rpx;
					width: 80rpx;
					height: 66rpx;
				}
				
			}
			
		}
		// 搜索框
		
		// 头部
		.tui-header {
			width: 100%;
			padding: 30rpx;
			/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
			box-sizing: border-box;
			background-color: #fff;
			// position: fixed;
			// z-index: 1000;
			.tui-header-top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #333;
				.tui-top-item {
					height: 28rpx;
					line-height: 28rpx;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.active {
					color:#FF4444 ;
					font-weight: bold;
				}
				
				.tui-topitem-active::after {
					content: '';
					position: absolute;
					width: 44rpx;
					height: 6rpx;
					background: #5677fc;
					border-radius: 6rpx;
					bottom: -10rpx;
					left: 50%;
					-webkit-transform: translateX(-50%);
					transform: translateX(-50%);
				}
				
				.tui-price-arrow {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 30rpx;
					.tui-icon-box {
						line-height: 16px !important;
						padding: 0 !important;
						display: block !important;
						position: relative;
					}
					
					.tui-arrow-up {
						top: 5px;
					}
					
					.tui-arrow-down {
						top: -3px;
					}
					
				}
			}
			
		}
		//头部
		
		
		// 商品列表
		.goods-list{
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			padding: 0 10rpx;
			width: 750rpx;
			box-sizing: border-box;
			
			.item{
				width: 690rpx;
				padding: 10rpx;
				display: flex;
				.img{
					width: 310rpx;
					height: 310rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					width: 100%;
					// padding: 0 24rpx 8rpx;
					flex: 1;
					padding: 20rpx;
					box-sizing: border-box;
					background-color: #FFFFFF;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.content{
						font-size: 26rpx;
						color: #323233;
						overflow: hidden;
						padding-top: 10rpx;
						margin-bottom: 20rpx;
						box-sizing: border-box;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.bottom{
						display: flex;
						justify-content: space-between;
						.price{
							font-size: 24rpx;
							color: #FF4444;
							.num{
								font-size: 36rpx;
							}
						}
						.cart{
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
		
		// 商品列表
	}
</style>
