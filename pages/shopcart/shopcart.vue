<template>
	<view class="container">
		<view class="navigator">
			<view class="info">
				<image class="img" src="http://47.106.36.197:7000/source/other/shop.svg" mode="widthFix"></image>
				<view class="text">吃货研究所店铺</view>
				<image class="img" src="http://47.106.36.197:7000/source/other/right.svg" mode="widthFix"></image>
			</view>
			<!-- 编辑购物车 -->
			<view class="edit" @tap="isEdit=!isEdit">
				<view class="btn" v-show="isEdit">编辑</view>
				<view class="btn" v-show="!isEdit">完成</view>
			</view>
		</view>

		<!-- 购物车为空时 -->
		<view class="empty_cart" v-if="isShow">
			<!-- <i class="iconfont">&#xe621;</i> -->
			<image src="http://47.106.36.197:7000/source/goodsCover/Fogky6TVqL1JpAp04JMY-5bvoEVl.png" mode=""></image>
			<view class="empty_info">
				<text>购物车还是空的</text>
				<text class="hurry">赶紧买点宝贝慰劳下自己吧</text>
				<uni-tag text="去逛逛" type="error" :circle="true" :inverted="true"></uni-tag>
			</view>
		</view>

		<!-- 购物车不为空有商品时 -->
		<view class="cart-list">
			<view class="cart" v-if="!isShow">
				<view class="check-shell">
					<evan-checkbox class="check" v-model="selected" primary-color="red"></evan-checkbox>
				</view>
				<view class="goods">
					<view class="img-shell">
						<image class="img" src="http://47.106.36.197:7000/source/goodsCover/Fogky6TVqL1JpAp04JMY-5bvoEVl.png" mode="widthFix"></image>
					</view>
					<view class="content">
						<view class="title">
							［琯溪蜜柚礼盒装］柔嫩饱满 果香四溢 三种蜜柚 2粒/4粒可选
						</view>
						<view class="spec" @click="typeShow=true;">
							<view class="text">
								琯溪白柚，2粒装（4.5-5斤）
							</view>
							<image src="http://47.106.36.197:7000/source/other/bottom.svg" class="bottom" mode="widthFix"></image>
						</view>
						<view class="price-count">
							<view class="price">
								<view class="icon">￥</view>88
							</view>
							<van-stepper value="1" step="1" />
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 弹出层 -->
		<tui-bottom-popup class="goods-info" :show="typeShow" @close="hidePopup" height="750">
			<view class="goods">
				<image class="img" src="http://47.106.36.197:7000/source/goodsCover/Fogky6TVqL1JpAp04JMY-5bvoEVl.png" mode="widthFix"></image>
				<view class="info">
					<view class="price">
						<text class="icon">￥</text>
						<text class="num">26.00</text>
					</view>
					<view class="rest">剩余 1255 件</view>
					<view class="rest">已选 琯溪白柚2粒装（4.5-5斤）</view>
				</view>
			</view>
			<!-- 关闭x -->
			<!-- 给图标加点击事件，点击后隐藏弹出层 -->
			<image src="../../static/images/cart/error.png" class="close" @click="typeShow=false"></image>

			<!-- 分割线 -->
			<view class="divider">
				<van-divider></van-divider>
			</view>


			<!-- 规格 -->
			<view class="specification">
				<text class="name">规格</text>
				<view class="all">
					<view class="first">
						2粒装（4-5-6斤）
					</view>
					<view class="second">
						2粒装（4-5-6斤）
					</view>
				</view>

			</view>
			<!-- 按钮 -->
			<button type="danger">确认</button>
		</tui-bottom-popup>


		<!-- 回到顶部 -->
		<view class="top-button" @click="ToTop" v-if="showtopup">
			<image src="../../static/images/index/icon/top.png" class="topimg"></image>
		</view>
		
		<recommend :scrollTop="scrollTop"></recommend>
	</view>
</template>

<script>
	import recommend from "../../component/recommend/recommend.vue";
	export default {
		data() {
			return {
				// href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				selected: false,
				cart: [],
				isShow: false,
				isEdit: true,
				typeShow: false,
				scrollTop: 0
			}
		},
		onPageScroll({scrollTop}){
			this.scrollTop = scrollTop;
			if(scrollTop >= 1700){
				this.showtotop = true;
			}else{
				this.showtotop = false;
			}
		},
		methods: {
			onChange(event) {
				console.log(event.detail);
			},
			// 跳转到首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index",
					fail(err) {
						console.log(err);
					}
				})
			},
			// 回到顶部
			ToTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
		},
		computed: {
			// 如果购物车数据大于0则触发v-if，若不是则触发v-else
			// isShow(){
			// 	return this.cart.length>0;
			// }
		},
		components: {
			recommend
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 3000rpx;
		background-color: #F7F8FA;

		.navigator {
			display: flex;
			justify-content: space-between;
			background-color: #fff;

			.info {
				display: flex;
				height: 96rpx;
				line-height: 96rpx;
				align-items: center;
				.img {
					width: 32rpx;
					height: auto;
					margin: 0 16rpx 0 8rpx;
				}
				
				.text {
					font-size: 32rpx;
					color: #333;
				}
			}
			.edit {
				padding-right: 24rpx;
				height: 96rpx;
				line-height: 96rpx;
				color: #323233;
				font-size: 28rpx;
			}
		}

		// 头部导航到这

		// 购物车为空时
		.empty_cart {
			width: 745rpx;
			height: 700rpx;

			// border:1px solid red;
			// 购物车图片
			image {
				// margin:80px 130px;
				width: 220rpx;
				height: 200rpx;
				// 上右下左
				margin: 100rpx 250rpx 20rpx 250rpx;
			}

			//购物车信息
			.empty_info {
				display: flex;
				flex-direction: column;
				align-items: center;

				// 文本
				text {
					margin-top: 15rpx;
				}

				.hurry {
					font-size: 28rpx;
					color: #969799;
				}

				// 逛一逛标签
				.uni-tag {
					margin-top: 20rpx;
				}
			}
		}

		//空的购物车到这

		// 购物车有商品时
		.cart-list {
			padding: 24rpx 24rpx 0;
			.cart {
				display: flex;
				padding: 24rpx;
				align-items: center;
				background-color: #fff;
				
				.check-shell {
					margin-right: 24rpx;
				}
				// 商品图片
				.goods {
					display: flex;
					.img-shell {
						overflow: hidden;
						width: 192rpx;
						height: 192rpx;
						border-radius: 16rpx;
						.img {
							width: 100%;
							height: auto;
						}
					}
					.content {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						margin-left: 16rpx;
						.title {
							margin-bottom: 16rpx;
							font-size: 28rpx;
							color: #323233;
							
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
						}
						.spec {
							display: flex;
							padding: 8rpx 16rpx;
							border-radius: 8rpx;
							background-color: #f7f8fa;
							.text {
								margin-right: 16rpx;
								font-size: 24rpx;
								color: #969799;
							}
							.bottom {
								width: 24rpx;
								height: auto;
							}
						}
						.price-count {
							display: flex;
							justify-content: space-between;
							width: 100%;
							align-items: center;
							.price {
								display: flex;
								color: #f44;
								font-weight: 500;
								font-size: 32rpx;
								.icon {
									margin-right: 4rpx;
									font-size: 24rpx;
								}
							}
						}
					}
				}
			}
		}
		
		// 弹出层
		.goods-info {

			.goods {
				display: flex;
				margin: 0 32rpx;
				align-items: center;

				.img {
					width: 192rpx;
					height: auto;
					margin: 24rpx 24rpx 24rpx;
					border-radius: 8rpx;
				}

				.info {
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					padding: 24rpx 40rpx 0 0;
					line-height: 62rpx;

					.price {
						color: #f44;
						.icon {
							font-size: 32rpx;
						}
						.num {
							font-size: 44rpx;
						}
					}
					.rest {
						font-size: 24rpx;
						color: #969799;
					}
				}
			}

			// 关闭图标
			.close {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				width: 50rpx;
				height: 50rpx;
			}

			// 分割线
			.divider {
				width: 700rpx;
				margin: 25rpx;
			}

			// 规格
			.specification {

				// display: flex;
				// flex-direction: column;
				// justify-content: space-around;
				.name {
					margin: 25rpx;
				}

				.all {
					display: flex;
					justify-content: space-around;
					align-items: center;
					text-align: center;
					margin-top: 20rpx;

					.first {
						width: 250rpx;
						height: 50rpx;
						line-height: 50rpx;
						color: red;
						font-size: 26rpx;
						background-color: #FFEDED;
					}

					.second {
						width: 250rpx;
						height: 50rpx;
						line-height: 50rpx;
						color: red;
						font-size: 26rpx;
						background-color: #FFEDED;
					}
				}
			}

			// 确认按钮
			button {
				width: 700rpx;
				margin-top: 65rpx;
				background-color: #FF4444;
				color: white;
				border-radius: 50rpx;
			}
		}

		// 弹出层到这

		// 回到顶部
		.top-button {
			width: 70upx;
			height: 70upx;
			// 固定定位
			position: fixed;
			right: 50rpx;
			bottom: 150rpx;
			z-index: 900;

			.topimg {
				width: 100rpx;
				height: 100rpx;
			}
		}

		// 回到顶部到这
		
	
	}
</style>
