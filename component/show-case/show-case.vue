<template>
	<view class="showcase-container">
		<view class="showcase" @click="show()"></view>
		
		<tui-bottom-popup :show="isShow" :radius="true" backgroundColor="#F7F8FA" @close="show()">
			<view class="show-title">
				商品橱窗
				<view class="cancel" @click="show()"></view>
			</view>
			
			<view v-for="(item, index) in list" :key="index" :class="['case',item.mark]">
				<view class="head">
					<view class="left">
						<view class="icon" :style="'background-image: url('+item.icon+');background-size: cover'"></view>
						<view class="title">{{ item.title }}</view>
					</view>
					<view class="right">
						<view class="more">查看更多</view>
						<view class="right-icon"></view>
					</view>
				</view>
				
				<scroll-view scroll-x="true" class="new">
					<view class="item" v-for="item in newGoods" :key="item.id" @click="goGoodsDetails(item.id)">
						<image src="../../static/icon/New-Tag 2.png" mode="widthFix" class="new-tag"></image>
						<view class="goods">
							<lazyload :img-url="item.image_url" :scroll-top="scrollTop" class="img"></lazyload>
							<view class="text">
								<view class="title">
									{{ item.title }}
								</view>
								<view class="buy">
									<view class="price">
										<text class="tag">&yen;</text>
										{{ item.activity_price }}
									</view>
									<image class="icon" src="../../static/icon/cart-circle-o.png" mode="widthFix"></image>
								</view>
							</view>
						</view>
					</view>
					<view class="all-shell">
						<view class="all">
							查看全部
							<image src="../../static/icon/right.png" mode="widthFix" class="right"></image>
						</view>
					</view>
				</scroll-view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import tuiBottomPopup from '../../components/thorui/tui-bottom-popup/tui-bottom-popup.vue'; 
	import { getHotGoods } from '../../api/index.js';
	export default {
		name: "show-case",
		data(){
			return {
				isShow: false,
				list: [
					{title: "店铺热榜", icon: "/static/images/showcase/hot.png", mark: "hot"},
					{title: "为你推荐", icon: "/static/images/showcase/recommend.png", mark: "recommend"},
					{title: "历史足迹", icon: "/static/images/showcase/record.png", mark: "record"}
				],
				goodsList: []
			}
		},
		methods: {
			show(){
				this.isShow = !this.isShow;
			},
			async getGoodsList(){
				// let hotList
			}
		},
		components: {
			tuiBottomPopup
		}
	}
</script>

<style lang="scss" scoped>
	.showcase-container {
		
		.showcase {
			position: fixed;
			right: 20rpx;
			bottom: 160rpx;
			width: 96rpx;
			height: 96rpx;
			background-image: url(/static/images/showcase/showcase.webp);
			background-size: cover;
		}
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
		.case {
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
			
		}
	}
</style>
