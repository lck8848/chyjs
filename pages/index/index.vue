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
				<swiper-item v-for="item in carousellist.items" :key="item.id" v-if="item.is_show == 1 ? true:false">
					<view class="swiper-item" @click="tourl(item.url)">
						<image :src="item.image_url" mode="" lazy-load="true"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图 -->

		<!-- 六宫格 -->

		<view class="grid-container">
			<view class="grid">
				<view class="item" @click="Tosend">
					<image src="http://47.106.36.197:7000/source/home/grid1.jpg" mode=""></image>
				</view>
				<view class="item" @click="Tofruit">
					<image src="http://47.106.36.197:7000/source/home/grid2.jpg" mode=""></image>
				</view>
				<view class="item" @click="Tosnack">
					<image src="http://47.106.36.197:7000/source/home/grid3.jpg" mode=""></image>
				</view>
				<view class="item" @click="Totea">
					<image src="http://47.106.36.197:7000/source/home/grid4.jpg" mode=""></image>
				</view>
				<view class="item" @click="Towine">
					<image src="http://47.106.36.197:7000/source/home/grid5.jpg" mode=""></image>
				</view>
				<view class="item" @click="Toall">
					<image src="http://47.106.36.197:7000/source/home/grid6.jpg" mode=""></image>
				</view>
			</view>
		</view>

		<!-- 六宫格  -->

		<!--开始 活动  -->
		<view class="activity">
			<view class="item" v-for="item in activityData" :key="item.name">
				<navigator :url="'/packageTother/pages/activity/'+item.name+'/'+item.name" open-type="navigate">
					<view class="img">
						<image lazy-load="true" :src="item.img_url" mode=""></image>
					</view>
				</navigator>
			</view>
		</view>
		<!--结束 活动  -->


		<!-- 新品滑动 -->
		<view class="new-container">
			<view class="head">
				<view class="title">
					新品
				</view>
				<view class="more" @click="tonew()">
					更多
				</view>
			</view>
			<view class="newscroll-container">

				<scroll-view class="scroll" scroll-x="true">
					<view class="item" v-for="item in newgoods" :key="item.id" @click="Todetail(item.id)">

						<view class="img">
							<image lazy-load="true" :src="item.image_url" mode=""></image>
							<view class="label">
								新品
							</view>
						</view>

						<view class="text">
							<view class="title">
								{{item.title}}
							</view>
							<view class="bottom">
								<view class="left">
									￥<text class="price">{{item.price}}</text>
								</view>
								<view class="right">
									<image src="http://47.106.36.197:7000/source/other/cart-circle-o.png" mode=""></image>
								</view>
							</view>
						</view>
					</view>


					<view class="item more" @click="tonew()">


						<view class="text-more">
							<view class="info">
								<view class="title">
									查看更多
								</view>

								<view class="right">
									<image src="http://47.106.36.197:7000/source/home/right_point.png" mode=""></image>
								</view>
							</view>
						</view>


					</view>

				</scroll-view>
			</view>

		</view>

		<!-- 新品滑动 -->

		<!-- 种草笔记 -->
		<rec-note></rec-note>

		<!-- 分类宫格 -->
		<view class="classify-shell" v-for="item in classify" :key="item.genre">
			<classify-goods :imgUrl="item.imgUrl" :genre="item.genre"></classify-goods>
		</view>

		<!-- 弹出橱窗 -->
		<show-case :goodsIds="goodsIds"></show-case>
		
		<!-- 回到顶部 -->
		<back-top :scrollTop="scrollTop"></back-top>
	</view>
</template>

<script>
	import search from "@/component/search/search";
	import recNote from "@/component/rec-note/rec-note.vue";
	import showCase from "@/component/show-case/show-case.vue";
	import backTop from "@/component/back-top/back-top.vue";
	import classifyGoods from "@/component/classify-goods/classify-goods.vue";
	import { getGoodsByStatus, getCarouselListByStatus } from "@/api/index.js"
	export default {
		components: {
			search,
			recNote,
			showCase,
			backTop,
			classifyGoods
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				goodsIds: "45,44,46,23,45,21,75,35,74,27,3,38,67,76,1,40,85,101,99,94",
				activityData: [
					{name: "monnew", img_url: "http://47.106.36.197:7000/source/home/monnew_index.webp"},
					{name: "discounts", img_url: "http://47.106.36.197:7000/source/home/discounts_index.webp"},
					{name: "hot", img_url: "http://47.106.36.197:7000/source/home/hot_index.webp"},
					{name: "vip", img_url: "http://47.106.36.197:7000/source/home/vip_index.webp"},
				],
				classify: [
					{imgUrl:"http://47.106.36.197:7000/source/home/sendgift.webp", genre: "gift"},
					{imgUrl:"http://47.106.36.197:7000/source/home/snack.webp", genre: "snacks"},
					{imgUrl:"http://47.106.36.197:7000/source/home/vegetable.webp", genre: "fruits"},
					{imgUrl:"http://47.106.36.197:7000/source/home/coffee.webp", genre: "tea"},
					{imgUrl:"http://47.106.36.197:7000/source/home/coffee.webp", genre: "liquor"}
				],
				newgoods: [],
				showtotop: false,
				carousellist: [],
				scrollTop: 0
			}
		},
		methods: {
			Tosearch() {
				this.$refs.search.search()
			},
			Todetail(id) {
				uni.navigateTo({
					url: "/packageTother/pages/goods/detail?id=" + id
				})
			},

			Tosend() {
				uni.navigateTo({
					url: "/packageTother/pages/index/classify?genre=gift"
				})
			},
			Tofruit() {
				uni.navigateTo({
					url: "/packageTother/pages/index/classify?genre=fruits"
				})
			},
			Tosnack() {
				uni.navigateTo({
					url: "/packageTother/pages/index/classify?genre=snacks"
				})
			},
			Totea() {
				uni.navigateTo({
					url: "/packageTother/pages/index/classify?genre=tea"
				})
			},
			Towine() {
				uni.navigateTo({
					url: "/packageTother/pages/index/classify?genre=liquor"
				})
			},
			Toall() {
				uni.switchTab({
					url: "/pages/allGoods/allGoods"
				})
			},
			tonew() {
				uni.navigateTo({
					url: "/packageTother/pages/new/new"
				})
			},
			tourl(url) {

			},
			async init() {
				var {
					data
				} = await getGoodsByStatus(3)
				this.newgoods = data.splice(0, 6)


			},
			//轮播图
			async lunbo(){
				var {data}  = await getCarouselListByStatus(1)
				this.carousellist = data
			}
		},
		onPageScroll({scrollTop}) {
			this.scrollTop = scrollTop;
		},
		onShow(){
			let ids = this.$store.getters.getUser.goods_ids;
			this.goodsIds = ids ?ids :"45,44,46,23,45,21,75,35,74,27,3,38,67,76,1,40,85,101,99,94";
		},
		created() {
			this.init()
			this.lunbo()
		}

	}
</script>

<style lang="scss" scoped>
	.container {

		background-color: #F9F9F9;
		height: 3000rpx;



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
		.activity {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.item {
				width: 48%;

				.img {
					width: 370rpx;
					height: 200rpx;

					// padding-right: 10rpx;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}



		//新品
		.new-container {
			// overflow: hidden;
			padding: 0 20rpx;

			.head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 20rpx 0;

				.title {
					background-color: rgb(217, 129, 84);
					font-size: 28rpx;
					color: #FFFFFF;
					padding: 4rpx 18rpx;
					border-radius: 6rpx;
				}

				.more {
					font-size: 24rpx;
					color: #C7C7D1;
				}
			}

			.newscroll-container {
				height: 410rpx;

				.scroll {
					white-space: nowrap;

					.more {
						// margin-bottom: 198rpx;
						// overflow: hidden;
						text-align: center;
						line-height: 390rpx;
						position: relative;
						background-color: rgba(50, 50, 51, .05);
						color: #969799;
					}

					.item {
						display: inline-block;
						// display: flex;

						height: 390rpx;
						width: 198rpx;
						margin: 10rpx;

						vertical-align: middle;
						box-sizing: border-box;

						.img {
							position: relative;
							height: 198rpx;
							width: 198rpx;

							.label {
								position: absolute;
								left: 0;
								top: 14rpx;
								font-size: 24rpx;
								color: white;
								background-color: rgb(255, 68, 68);
								padding: 0 10rpx;
								border-radius: 0 20rpx 20rpx 0;
							}

							image {
								width: 100%;
								height: 100%;
							}


						}

						.text {
							display: flex;
							justify-content: space-between;
							flex-direction: column;
							box-sizing: border-box;
							padding: 0 16rpx 4rpx;
							background-color: #FFFFFF;

							&-more {
								text-align: center;
								background-color: rgba(50, 50, 51, .00);
								justify-content: center;
								flex-direction: row;

								.info {
									display: flex;
									// align-items: center;
									justify-content: center;

									.right {
										width: 32rpx;
										height: 32rpx;

										image {
											width: 100%;
											height: 100%;
										}

									}
								}

							}

							.title {
								font-size: 26rpx;
								font-weight: bold;
								margin: 10rpx 0;
								white-space: pre-wrap;
								text-overflow: -o-ellipsis-lastline;
								overflow: hidden;
								text-overflow: ellipsis;
								display: -webkit-box;
								-webkit-line-clamp: 2;
								-webkit-box-orient: vertical;
							}

							.bottom {
								display: flex;
								justify-content: space-between;
								padding: 25rpx 0;

								.left {
									font-size: 24rpx;
									color: #ff4444;

									.price {
										font-size: 32rpx;
										font-weight: bold;

									}
								}

								.right {
									height: 40rpx;
									width: 40rpx;

									image {
										width: 100%;
										height: 100%;
									}
								}
							}
						}
					}
				}

			}

		}

		//新品
		
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
