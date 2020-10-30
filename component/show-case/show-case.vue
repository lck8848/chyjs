<template>
	<view class="showcase-container">
		<view class="walk" @tap="show()"></view>
		
		<tui-bottom-popup class="showcase" :show="isShow" :radius="true" height="968" backgroundColor="#F7F8FA" @close="show()">
			<view class="show-title">
				商品橱窗
				<view class="cancel" @tap="show()"></view>
			</view>
			
			<scroll-view class="content" :scroll-y="true" >
				<view v-for="(item, index) in list" :key="index" class="case">
					<view class="head">
						<view class="left">
							<view class="icon" :style="'background-image: url('+item.icon+');background-size: cover'"></view>
							<view class="title">{{ item.title }}</view>
						</view>
						<navigator class="right" :url="'/pages/showcase/showcase?index='+index">
							<view class="more">查看更多</view>
							<view class="right-icon"></view>
						</navigator>
					</view>
					
					<scroll-view class="list" :scroll-x="true">
						<view class="goods" v-for="(goods, g_index) in goodsList[index]" :key="goods.id" @click="navTo(goods.id)">
							<view class="rank" v-if="item.mark === 'hot'" :style="'background-position: 0 '+(g_index<=2 ?(g_index*-31)-2 :-62-28*(g_index-2))+'px;'"></view>
							<view class="shell">
								<image class="image" :src="goods.image_url" mode="widthFix"></image>
							</view>
							<view class="price">
								<view class="price-icon">￥</view>
								{{ (goods.price).toFixed(2) }}
							</view>
						</view>
					</scroll-view>
				</view>
			</scroll-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import tuiBottomPopup from '../../components/thorui/tui-bottom-popup/tui-bottom-popup.vue'; 
	import { getHotGoods, getRecommend, getGoodsByIds } from '../../api/index.js';
	export default {
		name: "show-case",
		props:['goodsIds'],
		data(){
			return {
				isShow: false,
				gids: "",
				list: [
					{title: "店铺热榜", icon: "/static/images/showcase/hot.png", mark: "hot"},
					{title: "为你推荐", icon: "/static/images/showcase/recommend.png", mark: "recommend"},
					{title: "历史足迹", icon: "/static/images/showcase/record.png", mark: "record"}
				],
				goodsList: []
			}
		},
		computed: {
			getGoodsIds(){
				this.gids = this.goodsIds;
				this.getGoodsList();
			}
		},
		methods: {
			navTo(id){
				uni.navigateTo({
					url:"/pages/goods/detail?id="+id
				})
			},
			show(){
				this.isShow = !this.isShow;
			},
			async getGoodsList(){
				let goodsIds = this.gids.split(',');
				if(goodsIds.length > 10){
					goodsIds.length = 10;
				}
				let arr = [getHotGoods(), getRecommend(10), getGoodsByIds(goodsIds.join(','))];
				let res = await Promise.all(arr);
				res[2].data = res[2].data.sort((v1, v2) => {
					return goodsIds.indexOf(v1.id+"") - goodsIds.indexOf(v2.id+"");
				});
				this.goodsList[0] = res[0].data;
				this.goodsList[1] = res[1].data;
				this.goodsList[2] = res[2].data;
			}
		},
		components: {
			tuiBottomPopup
		}
	}
</script>

<style lang="scss" scoped>
	.showcase-container {
		
		.walk {
			position: fixed;
			right: 20rpx;
			bottom: 140rpx;
			width: 96rpx;
			height: 96rpx;
			background-image: url(/static/images/showcase/showcase.webp);
			background-size: cover;
		}
		
		.showcase {
			z-index: 999;
			.show-title {
				position: relative;
				margin: 24rpx;
				text-align: center;
				color: #333;
				font-size: 32rpx;
				
				.cancel {
					position: absolute;
					top: 0rpx;
					right: 0rpx;
					width: 44rpx;
					height: 44rpx;
					background-image: url(/static/images/showcase/cancel.png);
					background-size: cover;
				}
			}
			.content {
				height: 920rpx;
				
				.case {
					margin: 0 24rpx 24rpx 24rpx;
					border-radius: 16rpx;
					background-color: #fff;
					&:first-child {
						background-image: url(http://47.106.36.197:7000/source/other/background.png);
						background-size: cover;
					}
					.head {
						display: flex;
						justify-content: space-between;
						padding: 24rpx;
						align-items: center;
						.left {
							display: flex;
							.icon {
								width: 36rpx;
								height: 36rpx;
								margin-right: 12rpx;
							}
							.title {
								color: #333;
								font-size: 32rpx;
							}
						}
						.right {
							display: flex;
							.more {
								color: #969799;
								font-size: 24rpx;
							}
							.right-icon {
								width: 32rpx;
								height: 32rpx;
								background-image: url(/static/images/showcase/right.png);
								background-size: cover;
							}
						}
					}
					.list {
						overflow: hidden;
						white-space: nowrap;
						.goods {
							position: relative;
							display: inline-block;
							width: 174rpx;
							margin: 12rpx;
							
							.rank {
								position: absolute;
								left: 4px;
								width: 28px;
								height: 27px;
								line-height: 27px;
								background-image: url(http://47.106.36.197:7000/source/other/rank.png);
								background-size: 27px;
								background-repeat: no-repeat;
							}
							.shell {
								width: 100%;
								height: 174rpx;
								.image {
									width: 100%;
									height: auto;
									border-radius: 16rpx;
								}
							}
							
							.price {
								display: flex;
								height: 84rpx;
								line-height: 84rpx;
								color: #f44;
								font-size: 32rpx;
								font-weight: 700;
								.price-icon {
									margin-right: 4rpx;
									font-size: 24rpx;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
