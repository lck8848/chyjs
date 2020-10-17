<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-container" @click="Tosearch">
			<search ref="search"></search>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500"
			 indicator-active-color="#FF4444" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="@/static/image/swiper/swiper1.webp" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="@/static/image/swiper/swiper2.webp" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="@/static/image/swiper/swiper3.webp" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>



		<!-- 轮播图 -->

		<!-- 六宫格 -->

		<view class="grid-container">
			<view class="grid">
				<view class="item" @click="Tosend">
					<image src="@/static/images/index/grid1.jpg" mode=""></image>
				</view>
				<view class="item" @click="Tofruit">
					<image src="@/static/images/index/grid2.jpg" mode=""></image>
				</view>
				<view class="item" @click="Tosnack">
					<image src="@/static/images/index/grid3.jpg" mode=""></image>
				</view>
				<view class="item" @click="Totea">
					<image src="@/static/images/index/grid4.jpg" mode=""></image>
				</view>
				<view class="item" @click="Towine">
					<image src="@/static/images/index/grid5.jpg" mode=""></image>
				</view>
				<view class="item" @click="Toall">
					<image src="@/static/images/index/grid6.jpg" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 六宫格  -->
		<!--开始 活动  -->
		<view class="activity">
			<view class="item" v-for="item in activityData" :key="item.name">
				<navigator :url="'/pages/activity/'+item.name+'/'+item.name" open-type="navigate">
					<view class="img">
						<image :src="item.img_url" mode=""></image>
					</view>
				</navigator>
			</view>
		</view>
		<!--结束 活动  -->
		
		<!-- 种草笔记 -->
		<view class="note_container">
			<view class="top">
				<text class="note">种草笔记</text>
				<text class="more" @click="toMore">查看更多></text>
			</view>
			<view class="scroll-container">
				<scroll-view class="scroll-view" :scroll-x="true" @scroll="scroll" :show-scrollbar="true">
					<view id="demo1" class="item">
						<view class="note_img">
							<image src="../../static/image/note/luosifen-.jpg" class="luosifen"></image>
						</view>
						<view class="desc">
							<text>
								试吃了1个月、差点被开除，终于找到了内心满分的螺蛳粉！
							</text>

						</view>
					</view>
					<view id="demo1" class="item">
						<view class="note_img">
							<image src="../../static/image/note/luosifen-.jpg" class="luosifen"></image>
						</view>
						<view class="desc">
							<text>
								试吃了1个月、差点被开除，终于找到了内心满分的螺蛳粉！
							</text>

						</view>
					</view>
					<view id="demo1" class="item">
						<view class="note_img">
							<image src="../../static/image/note/luosifen-.jpg" class="luosifen"></image>
						</view>
						<view class="desc">
							<text>
								试吃了1个月、差点被开除，终于找到了内心满分的螺蛳粉！
							</text>

						</view>
					</view>

					<!-- 				<view id="demo1" class="item">
								<image src="../../static/image/note/dongzao.jpg" class="dongzao"></image>
								<view class="desc">
								
									新疆，还有什么水果是你不行的？连枣都能甜哭我！
								
								</view>
							</view>
							<view id="demo1" class="item">
								<image src="../../static/image/note/niurougan.jpg" class="niurougan"></image>
								<view class="desc">
								
									什么样的牛肉干好吃？内蒙古的朋友有话说
								
								</view>
							</view>
							<view id="demo1" class="item">
								<image src="../../static/image/note/jianguo.jpg" class="milk"></image>
								<view class="desc">
								
									我找到了植物奶咖啡的平替（不是）
								
								</view>
							</view>
							<view id="demo1" class="item">
								<image src="../../static/image/note/banfen.jpg" class="banfen"></image>
								<view class="desc">
								
									吹爆南昌拌粉！一周有5天都想嗦它嗦它嗦它
								
								</view>
							</view>
							<view id="demo1" class="item">
								<image src="../../static/image/note/guoba.jpg" class="guoba"></image>
								<view class="desc">
								
									好吃的锅巴，会发出海鲜味的咔嚓咔嚓声
								
								</view>
							</view>
							<view id="demo1" class="item">
								<image src="../../static/image/note/fengzhua.jpg" class="jizhua"></image>
								<view class="desc">
								
									请把柠檬和鸡爪这对cp给我锁死死！
								
								</view>
							</view>
							<view id="demo1" class="item">
								<image src="../../static/image/note/mifen.jpeg" class="mifen"></image>
								<view class="desc">
								
									湖南人的乡愁，从一碗常德米粉开始
								
								</view>
							</view> -->
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
	import search from "../../component/search/search";

	export default {
		components: {
			search,
			// 活动
			
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				activityData:[
					{
						name:"monnew",
						img_url:"../../static/images/index/monnew.webp"
					},
					{
						name:"discounts",
						img_url:"../../static/images/index/discounts.webp"
					},
					{
						name:"hot",
						img_url:"../../static/images/index/hot.webp"
					},
					{
						name:"vip",
						img_url:"../../static/images/index/vip.webp"
					},
					
				]
			}
		},
		methods: {
			Tosearch() {
				this.$refs.search.search()
			},

			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			toMore() {
				uni.navigateTo({
					url: "/pages/note/note"
				})
			},

			Tosend() {
				console.log("send")
			},
			Tofruit() {
				console.log("fruit")
			},
			Tosnack() {
				console.log("snack")
			},
			Totea() {
				console.log("tea")
			},
			Towine() {
				console.log("wine")
			},
			Toall() {
				console.log("all")
			}


		}
	}
</script>

<style lang="scss" scoped>
	.container {

		.swiper-container {
			width: 100%;
			height: 370rpx;

			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					width: 100%;
					height: 100%;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

		}
		// 活动
		.activity{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			
			.item{
				width: 48%;
				.img{
					width: 370rpx;
					height: 200rpx;
					// padding-right: 10rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
		
		
		// 种草笔记
		.note_container {

			// background-color: #F9F9F9;
			.top {
				display: flex;
				justify-content: space-between;

				.note {
					font-size: 28rpx;
					color: #323233;
				}

				.more {
					font-size: 24rpx;
					color: #c7c7d1;
				}
			}

			.scroll-container {
				.scroll-view {
					white-space: nowrap;
					height: 450rpx;
					width: 100%;
					border: 1px solid #E5E5E5;
					overflow: hidden;

					.item {
						// 这个属性可以使图片跟文字盒子上下排行
						display: inline-block;
						margin: 20rpx;
						background-color: white;
						border: 1px solid #E5E5E5;

						.note_img {
							width: 300rpx;

							image {
								width: 100%;
								height: 300rpx;
							}
						}

						.desc {
							width: 300rpx;
							height: 109rpx;
							white-space: pre-wrap;


							text {
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-box-orient: vertical;
								-webkit-line-clamp: 2;
							}
						}

					}
				}
			}

		}

		// 种草笔记到这

		.grid-container {
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgb(247, 246, 244);
			padding: 10rpx;

			.grid {
				width: 700rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.item {
					width: 200rpx;
					height: 200rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

	}
</style>
