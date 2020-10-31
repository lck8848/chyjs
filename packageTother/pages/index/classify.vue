<template>
	<view class="classify-container">
		<!-- 顶部图片 -->
		<view class="head-img">
			<view class="item" v-if="head_img == 'gift' ? true : false">
				<image class="image" src="@/static/images/index/classify/gift.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'fruits' ? true : false">
				<image class="image" src="@/static/images/index/classify/fruits.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'snacks' ? true : false">
				<image class="image" src="@/static/images/index/classify/snacks.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'tea' ? true : false">
				<image class="image" src="@/static/images/index/classify/tea.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'liquor' ? true : false">
				<image class="image" src="@/static/images/index/classify/liquor.webp" mode=""></image>
			</view>
		</view>
		<!-- 顶部图片 -->
		
		<!-- 选项卡 -->
		<tui-sticky :scrollTop="scrollTop" stickyHeight="80rpx">
			<template v-slot:header>
				<scroll-view id="tab-bar" scroll-with-animation class="tui-scroll-h" :scroll-x="true" :show-scrollbar="false" :scroll-into-view="scrollInto" v-if="head_img == 'gift' ? false : true">
					<view v-for="(tab, index) in tabBars" :key="tab.id" class="tui-tab-item" :id="tab.id" :data-current="index" :data-code="tab.alias_code" @click="tabClick">
						
						<text class="tui-tab-item-title" :class="{ 'tui-tab-item-title-active': tabIndex == index }">{{ tab.name }}</text>
				
				
					</view>
				</scroll-view>
			</template>
		</tui-sticky>
		
		<!-- 选项卡 -->
		
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="item" v-for="item in goods" :key="item.id" @click="todetail(item.id)">
				<view class="img">
					<image :src="item.image_url" mode=""></image>
				</view>
				<view class="text">
					<view class="content">
						{{item.title}}
					</view>
					<view class="vip-price">
						{{item.sell_point}}
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
	import {getClassify,getClassifyGoods,getGift} from "@/api/index.js"
	export default {
		data(){
			return {
				head_img:"",
				currentTab: 0,
				tabBars: [],
				scrollInto: '',
				tabIndex:0,
				cacheTab: [],
				newsList: [],
				goods:[],
				scrollTop:0
				
			}
		},
		methods:{
			change(e) {
				this.currentTab = e.index
			},
			async init(genre){
				if(genre == "gift"){
					var {data} = await getGift();
					this.goods = data
					return;
				}
				var {data} = await getClassify(genre)
				
				data.map(v=>{
					v.name = v.alias_name
					v.id = 'a'+v.id
					delete v.alias_name
					return v.name,v.id
				})
				
				
				
				var code = data[0].alias_code
				
				this.tabBars=data
				
				this.goodlist(code)
			},
			tabClick(e) {
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				let code = e.target.dataset.code || e.currentTarget.dataset.code;
				this.switchTab(index);
				this.goodlist(code)
			},
			async goodlist(code){
				var {data} = await getClassifyGoods(code)
				
				this.goods = data
				
			},
			switchTab(index) {
				if (this.tabIndex === index) return;

				this.tabIndex = index;
				let scrollIndex = index - 1 < 0 ? 0 : index - 1;
				this.scrollInto = this.tabBars[scrollIndex].id;
			
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop
			},
			todetail(id){
				uni.navigateTo({
					url:"/packageTother/pages/goods/detail?id=" + id
				})
			}
		},
		 onLoad(options) {
			 // #ifdef H5
			 this.stickyTop += 44;
			 // #endif
			this.head_img = options.genre 
			
			this.init(options.genre)
		}
	}
	
</script>

<style lang="scss" scoped>
	.classify-container{
		background-color: #f8f8f8;
		.tui-scroll-h {
			width: 750rpx;
			height: 80rpx;
			background-color: #ffffff;
			flex-direction: row;
			white-space: nowrap;
			// padding: 30rpx;
			.tui-tab-item {
				display: inline-block;
				flex-wrap: nowrap;
				padding-left: 34rpx;
				padding-right: 34rpx;
				.tui-tab-item-title {
					color: #646566;
					font-size: 28rpx;
					height: 80rpx;
					line-height: 80rpx;
					flex-wrap: nowrap;
					white-space: nowrap;
				}
				.tui-tab-item-title-active {
					color: #FF4444;
					font-size: 30rpx;
					font-weight: bold;
					border-bottom: 3px solid #FF4444;
					text-align: center;
				}
			}
			
		}
		.head-img{
			width: 750rpx;
			height: 180rpx;
			.item{
				width: 100%;
				height: 100%;
				.image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.goods-list{
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 0 10rpx;
			width: 750rpx;
			box-sizing: border-box;
			
			.item{
				width: 345rpx;
				padding: 10rpx;
				.img{
					width: 345rpx;
					height: 345rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.text{
					width: 100%;
					padding: 0 24rpx 8rpx;
					box-sizing: border-box;
					background-color: #FFFFFF;
					.content{
						font-size: 26rpx;
						color: #323233;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.vip-price{
						font-size: 24rpx;
						color: #969799;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
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
	}
</style>
