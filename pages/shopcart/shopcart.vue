<template>
	<view class="container">
		<!-- 自定义头部导航 -->
		<view class="navigator">
			<view class="info">
				<!-- 点击logo跳转回首页 -->
				<view class="left" @click="toIndex">
					<image src="../../static/images/cart/shop.png"></image>
				</view>
				<view class="title">
					<text>吃货研究所店铺</text>
					<image src="../../static/images/cart/right.png" class="img"></image>
				</view>
			</view>
			<!-- 编辑购物车 -->
			<view class="right"  @click="show" v-if="edit">
				编辑
			</view>
			<!-- 点击编辑之后，变成完成 -->
			<view class="right" @click="show" v-if="!edit">
				完成
			</view>
		</view>

		<!-- 购物车为空时 -->
		<view class="empty_cart" v-if="isShow">
			<!-- <i class="iconfont">&#xe621;</i> -->
			<image src="../../static/images/cart/shopping-cart-full.png" mode=""></image>
			<view class="empty_info">
				<text>购物车还是空的</text>
				<text class="hurry">赶紧买点宝贝慰劳下自己吧</text>
				<uni-tag text="去逛逛" type="error" :circle="true" :inverted="true"></uni-tag>
			</view>
		</view>

		<!-- 购物车不为空有商品时 -->
		<view class="order_card" v-if="!isShow">
			<!-- 复选框，primary-color设置主题色 -->
			<!-- v-model是双向绑定 -->
			<evan-checkbox v-model="selected" primary-color="red"></evan-checkbox>
			<image src="../../static/images/note/todongzao2.jpg" class="goods_img"></image>
			<view class="right">
				<text class="title">［琯溪蜜柚礼盒装］柔嫩饱满 果香四溢 三种蜜柚 2粒/4粒可选</text>
				<!-- 点击弹出弹出层 -->
				<view class="details" @click="typeClick">
					琯溪白柚，2粒装（4.5-5斤）
					<image src="../../static/images/cart/bottom.png" class="bottom"></image>
				</view>
				<view class="bottom">
					<view class="price">
						<text>￥</text>
						<text class="big">26</text>
					</view>
					<!-- 步进器 -->
					<van-stepper value="1" step="1" />

				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<tui-bottom-popup :show="typeShow" @close="hidePopup" height="750">
			<!-- 图片详情页 -->
			<view class="details">
				<!-- <image src="../../static/images/note/dongzao.jpg" class="img"></image> -->
				<image src="../../static/images/index/crab.webp" class="img"></image>
				<view class="info">
					<view class="price">
						<text>￥</text>
						<text class="big">26.00</text>
					</view>
					<text class="rest">剩余1255件</text>
					<text>已选 琯溪白柚 2粒装（4.5-5斤）</text>
				</view>
			</view>
			<!-- 关闭x -->
			<!-- 给图标加点击事件，点击后隐藏弹出层 -->
			<image src="../../static/images/cart/error.png" class="close" @click="close"></image>

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


		<!-- 更多精选商品 -->
		<!-- 分割线 -->
		<van-divider content-position="center" textColor="#333333">更多精选商品</van-divider>
		<recommend></recommend>

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
				edit: true,
				typeShow: false
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
			show() {
				// console.log("1111")
				this.edit = !this.edit;
			
			},
			typeClick() {
				this.typeShow = true;
			},
			hidePopup() {
				this.typeShow = false;
			}, 
			close() {
				this.hidePopup();
			}
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

		// 自定义头部导航
		.navigator {
			display: flex;
			// flex-direction: column;
			// justify-content: space-between;
			align-items: center;
			width: 740rpx;
			height: 100rpx;
			// padding:10rpx;
			padding-left: 20rpx;
			background-color: white;

			.info {
				display: flex;

				// 名字
				.title {
					display: flex;
					// justify-content: space-around;
					margin-left: 20rpx;
					align-items: center;

					// right
					.img {
						width: 40rpx;
						height: 40rpx;
					}

					text {
						color: #4E4E4E;
					}
				}

				// shopicon
				.left {
					image {
						width: 40rpx;
						height: 40rpx;
					}
				}
			}

			// 编辑
			.right {
				font-size: 28rpx;
				margin-left: 280rpx;
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
		.order_card {
			display: flex;
			align-items: center;
			width: 700rpx;
			height: 250rpx;
			margin-top: 20rpx;
			margin-left: 22rpx;
			border-radius: 10rpx;
			background-color: white;

			// 复选框
			.evan-checkbox {
				margin: 20rpx;
			}

			// 商品图片
			.goods_img {
				width: 50%;
				height: 180rpx;
				border-radius: 10rpx;
			}

			// 商品详情
			.right {
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;

				// justify-content: space-between;
				// align-items: center;
				// 标题
				.title {
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;

					font-size: 28rpx;
					color: #323233;
				}

				// 商品描述（点击可弹出弹出层）
				.details {
					display: flex;
					justify-content: space-around;
					width: 400rpx;
					height: 40rpx;
					margin-top: 10rpx;
					font-size: 24rpx;
					color: #969799;

					// 下拉图片
					.bottom {
						width: 30rpx;
						height: 30rpx;
					}
				}

				// 商品价格和数量
				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 16rpx;

					// 商品价格
					.price {
						text {
							color: red;
						}

						.big {
							font-size: 32rpx;
						}
					}

					// 步进器
					.van-stepper {}
				}
			}
		}

		// 有商品到这

		// 弹出层
		.tui-bottom-popup {

			// 商品详情
			.details {
				display: flex;
				position: relative;
				margin: 20rpx;

				// 商品图片
				.img {
					width: 230rpx;
					height: 220rpx;
					border-radius: 10rpx;
				}

				// 商品信息
				.info {
					display: flex;
					flex-direction: column;
					margin-top: 4rpx;
					margin-left: 20rpx;

					// 价格
					.price {
						text {
							font-size: 32rpx;
							color: red;
						}

						.big {
							font-size: 44rpx;
							color: red;
						}
					}

					// 商品剩余数量和规格
					.rest {
						font-size: 32rpx;
						color: #969799;
						margin-top: 20rpx;
					}

					text {
						font-size: 32rpx;
						color: #969799;
						margin-top: 20rpx;
					}
				}
			}

			// 关闭图标
			.close {
				position: absolute;
				top:30rpx;
				right:30rpx;
				width: 50rpx;
				height: 50rpx;
			}
			
			// 分割线
			.divider{
				width:700rpx;
				margin:25rpx;
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

	}
</style>
