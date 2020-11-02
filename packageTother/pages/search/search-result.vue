<template>
	<view class="new-container">
		<!-- 搜索框 -->
		<view class="search">
			<view class="tui-searchbox">
				<view class="tui-search-input">
					<icon type="search" :size='13' color='#333'></icon>
					<input confirm-type="search" placeholder="大家都在搜：螺蛳粉" :focus="true" auto-focus placeholder-class="tui-input-plholder"
					 class="tui-input" v-model="keyword" @confirm="search()"  />
					<icon type="clear" :size='13' color='#bcbcbc' @tap="keyword=''" v-show="keyword"></icon>
				</view>
			</view>
			
			<!-- <view class="button">
				<button size="mini" type="warn" @click="search(key)">搜索</button>
			</view> -->
		</view>
		<!-- 搜索框 -->
		
		<!-- 头部 -->
		<view class="tab">
			<view :class="['option', action==index?'action':'']"
			v-for="(item, index) in tab" :key="index"
			@click="selected(index)">
				{{ item }}
				<view class="filter" v-if="index == 1">
					<view :class="['rank', 'ascend', sel=='desc' ?'sel':'']"></view>
					<view :class="['rank', 'descend', sel=='asc' ?'sel':'']"></view>
				</view>
			</view>
		</view>
		
		<!-- 头部 -->
		
		
		<tui-loadmore :index="2" v-if="showload"></tui-loadmore>
		
		<!-- 暂无数据 -->
		<view class="none-container" v-if="shownone">
			<view class="img">
				<image src="http://47.106.36.197:7000/source/home/nodata.png" mode=""></image>
			</view>
			<view class="text">
				<text>没有找到你想要的商品</text>
				<text>换个搜索词试试</text>
			</view>
		</view>
		
		<!-- 暂无数据 -->
		
		
		<!-- 商品列表 -->
		
		<view class="goods-list" v-if="!shownone">
			
			<view class="item" v-for="item in goods" :key="item.id" @click="todetail(item.id)">
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
							<image src="http://47.106.36.197:7000/source/other/cart-circle-o.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 推荐商品 -->
		<view class="recommend" id="rec">
			<recommend :scrollTop="scrollTop"></recommend>
		</view>
		
	</view>
</template>

<script>
	import {getSearchResult} from "@/api/index.js"
	import recommend from '@/component/recommend/recommend.vue';
	export default {
		data() {
			return {
				action:0,
				goods:[],
				keyword :"",
				history:JSON.parse(uni.getStorageSync("history")),
				scrollTop: 0,
				tab:["综合", "价格", "上新"],
				sel: '',
				shownone: false,
				rectop: 0,		//推荐商品模块到顶部的距离
				page: 1,
				pageSize: 10,
				isData: true	//判断是否还有更多数据
			};
		},
		watch: {
			goods(val){
				this.shownone = val.length === 0;
				this.$nextTick(function(){
					this.getRecTop();
					this.isData = val.length/this.page === this.pageSize;
				})
			}
		},
		methods:{
			selected(index, isAnew){
				this.action = index;
				if(!isAnew){
					this.page = 1;
					this.goods = [];
				}
				
				switch (index){
					case 0:
						this.sel = "";
						this.getGoodsList({keyword:this.keyword, page:this.page, pageSize:this.pageSize});
						break;
					case 1:
						if(!this.sel){
							this.sel = "asc";
						}
						this.getGoodsList({keyword:this.keyword, page:this.page, pageSize:this.pageSize, order:this.sel});
						this.sel = this.sel==="asc" ?"desc" :"asc";
						break;
					case 2:
						this.sel = "";
						this.getGoodsList({keyword:this.keyword, page:this.page, pageSize:this.pageSize, order:"new"});
						break;
				}
			},
			async search(){
				this.isData = true;
				this.selected(this.action);
				this.history.push_unique(this.keyword);
				
				for(var i = 0;i<this.history.length;i++){
				    if(!this.history[i]){
				        this.history.splice(i,1);
				        i=i-1;
				    }
				}
				uni.setStorageSync('history',JSON.stringify(this.history))
				
			},
			getRecTop(){
				//获取推荐商品距离顶部的信息，以此判断是否加载更多数据
				const query = uni.createSelectorQuery().in(this);
				query.select('#rec').boundingClientRect(data => {
					if(!data.top) return;
					this.rectop = this.scrollTop + data.top;
				}).exec();
			},
			async getGoodsList(obj){
				var {data} = await getSearchResult(obj);
				this.goods = this.goods.concat(data);
			},
			todetail(id){
				uni.navigateTo({
					url:"/packageTother/pages/goods/detail?id=" + id
				})
			}
		},
		onPageScroll({scrollTop}){
			this.scrollTop = scrollTop;
			if(scrollTop > this.rectop-500 && this.isData){
				this.page ++;
				this.isData = false;
				this.selected(this.action, true);
			}
		},
		onLoad(options){
			Array.prototype.push_unique = function () {
				for (var i = 0; i < arguments.length; i++) {
					var ele = arguments[i];
					if (this.indexOf(ele) == -1) {
						this.push(ele);
					}
				}
			};
			this.keyword = options.keyword
			this.selected(this.action);
		},
		components: {
			recommend
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
						flex: 1;
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
		.tab {
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			.option {
				flex: 1;
				height: 80rpx;
				line-height: 80rpx;
				color: #717171;
				text-align: center;
				font-size: 28rpx;
				.filter {
					position: relative;
					display: inline-block;
					.rank {
						position: absolute;
						left: 10rpx;
						width: 8rpx;
						height: 8rpx;
						transform: rotate(45deg);
					}
					.ascend {
						top: -18rpx;
						border-left: 2rpx solid #bbb;
						border-top: 2rpx solid #bbb;
					}
					.descend {
						bottom: 0rpx;
						border-right: 2rpx solid #bbb;
						border-bottom: 2rpx solid #bbb;
					}
					.sel {
						border-color: #f44;
					}
				}
			}
			.action {
				color: #f44;
			}
		}
		//头部
		
		// 暂无数据
		.none-container{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			width: 750rpx;
			// margin: 0 auto;
			.img{
				width: 320rpx;
				height: 320rpx;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				color: #969799;
			}
		}
		// 暂无数据
		
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
		
		.recommend {
			margin-top: 30rpx;
		}
	}
</style>
