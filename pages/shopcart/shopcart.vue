<template>
	<view class="container">
		<!-- 自定义头部导航 -->
		<view class="navigator" v-if="isShow">
			<view class="info" @click="toIndex">
				<!-- 点击logo跳转回首页 -->
				<view class="left"><image src="../../static/images/cart/shop.png"></image></view>
				<view class="title">
					<text>吃货研究所店铺</text>
					<image src="../../static/images/cart/right.png" class="img"></image>
				</view>
			</view>
			<!-- 编辑购物车 -->
			<view class="right" @click="show" v-if="edit">编辑</view>
			<!-- 点击编辑之后，变成完成 -->
			<view class="right" @click="show" v-if="!edit">完成</view>
		</view>

		<!-- 购物车为空时 -->
		<view class="empty_cart" v-if="!isShow">
			<!-- <i class="iconfont">&#xe621;</i> -->
			<image src="../../static/images/cart/shopping-cart-full.png" mode=""></image>
			<view class="empty_info">
				<text>购物车还是空的</text>
				<text class="hurry">赶紧买点宝贝慰劳下自己吧</text>
				<uni-tag @click="toIndex" text="去逛逛" type="error" :circle="true" :inverted="true" style="margin-top: 32rpx;"></uni-tag>
			</view>
		</view>
		<!-- 购物车不为空有商品时 -->
		<view class="order_card" v-if="isShow">
			<!-- 复选框，primary-color设置主题色 -->
			<van-checkbox-group :value="selectResult" @change="onChangeCheckbox">
				<!-- 右划删除 -->
				<u-swipe-action  btn-width="120" >
					<evan-checkbox v-model="selected" primary-color="red"></evan-checkbox>
					<image src="/static/images/index/crab_files/FtOI1ORGSNs0QYKWARyzMIbZAtOw.jpg!large.webp" class="goods_img"></image>
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
				</u-swipe-action>
			</van-checkbox-group>
		</view>

		<!-- 底部提交订单 -->
		<van-submit-bar :price="3050" button-text="提交订单" @submit="onClickButton" :tip="true" v-if="isShow">
			<van-checkbox :value="allSelect" @change="changeAllSelect" checked-color="#ff347d">全选</van-checkbox>
		</van-submit-bar>

		<!-- 弹出层 -->
		<tui-bottom-popup :show="typeShow" @close="hidePopup" height="650">
			<!-- 图片详情页 -->
			<view class="details">
				<!-- <image src="../../static/images/note/dongzao.jpg" class="img"></image> -->
				<image src="/static/images/index/crab_files/Fl4_CKR-_DWuSvSzGi-9B3VJeE4P.jpg!large.webp" class="img"></image>
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
			<view class="divider"><van-divider></van-divider></view>

			<!-- 规格 -->
			<view class="specification">
				<text class="name">规格</text>
				<view class="all">
					<view class="first">2粒装（4-5-6斤）</view>
					<view class="second">2粒装（4-5-6斤）</view>
				</view>
			</view>
			<!-- 按钮 -->
			<button type="danger" @click="updSpec">确认</button>
		</tui-bottom-popup>

		<!-- 更多精选商品 -->
		<!-- 分割线 -->
		<van-divider content-position="center" textColor="#333333">更多精选商品</van-divider>
		<recommend></recommend>

		<!-- 回到顶部 -->
		<view class="top-button" @click="ToTop"><image src="../../static/images/index/icon/top.png" class="topimg"></image></view>
	</view>
</template>

<script>
import recommend from '../../component/recommend/recommend.vue';
export default {
	data() {
		return {
			// href: 'https://uniapp.dcloud.io/component/README?id=uniui',
			selected: false,
			cart: [],
			edit: true,
			typeShow: false,
			selectResult: []
		};
	},
	methods: {
		// 点击全选按钮
		changeAllSelect() {
			this.allSelect = !this.allSelect;
			if (this.allSelect) {
				let totalPrice = 0;
				this.list.forEach(v => {
					this.selectResult.push(v.id.toString());
					totalPrice += v.price * v.num;
				});
				this.totalPrice = totalPrice * 100;
			} else {
				this.selectResult = [];
				this.totalPrice = 0;
			}
		},
		//点击提交订单按钮
		onClickButton() {
			console.log('提交订单');
		},

		// 复选框
		onChangeCheckbox(event) {
			this.selectResult = event.detail;
			if (this.selectResult.length == 0) {
				this.allSelect = false;
				return;
			}

			if (this.selectResult.length == this.list.length) {
				this.allSelect = true;
			} else {
				this.allSelect = false;
			}

			let selectGoods = [];
			this.selectResult.forEach(v => {
				this.list.forEach(d => {
					if (v == d.id) {
						selectGoods.push(d);
					}
				});
			});

			let totalPrice = 0;
			selectGoods.forEach(v => {
				totalPrice += v.price * v.num;
			});
			// console.log(totalPrice * 100);
			this.totalPrice = totalPrice * 100;
		},
		// 右滑删除
		async clickDele(index) {
			// 获取当前商品的购物车id
			let cartId = this.list[index].id;
			// 删除数据库数据
			let { code } = await deleCart(cartId);
			if (code == 200) {
				// 改变vuex的数量
				this.$store.commit('deleCartData', cartId);
				setTabbarBadge(this);

				// 删除页面数据
				this.list.splice(index, 1);
				this.$u.toast(`删除成功`);
			} else {
				this.$u.toast(`删除失败`);
			}

			// 若购物车删完了，则改变状态，价格，选中状态，vuex购物车数量
			if (this.list.length == 0) {
				this.isEmpty = true;
				this.totalPrice = 0.0;
				this.allSelect = false;

				// 隐藏红点
				uni.removeTabBarBadge({
					index: 2
				});
			}
		},
		onChange(event) {
			console.log(event.detail);
		},
		// 跳转到首页
		toIndex() {
			uni.switchTab({
				url: '/pages/index/index',
				fail(err) {
					console.log(err);
				}
			});
		},
		show() {
			// console.log("1111")
			this.edit = !this.edit;
		},
		// 点击规格，弹出弹出层
		typeClick() {
			this.typeShow = true;
		},
		hidePopup() {
			this.typeShow = false;
		},
		close() {
			this.hidePopup();
		},
		updSpec() {
			this.typeShow = false;
		},
		// 回到顶部
		ToTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		}
	},
	computed: {
		// 如果购物车数据大于0则触发v-if，若不是则触发v-else
		isShow() {
			// console.log(this.cart.length > 0);
			// return this.cart.length > 0;
			return true;
		}
	},
	components: {
		recommend
	},
	onShow() {
		this.cart = this.$store.state.cartData;
		console.log(this.cart);
	}
};
</script>

<style lang="scss" scoped>
.container {
	height: 3000rpx;
	background-color: #f7f8fa;

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
					color: #4e4e4e;
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
		display: flex;
		width: 100vw;
		height: 500rpx;
		flex-wrap: wrap;
		justify-content: center;
		// border:1px solid red;
		// 购物车图片
		image {
			// margin:80px 130px;
			width: 180rpx;
			height: 180rpx;
			// 上右下左
			margin: 100rpx 250rpx 0 200rpx;
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
		height: 100vh;
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
					background-color: #ffeded;
				}

				.second {
					width: 250rpx;
					height: 50rpx;
					line-height: 50rpx;
					color: red;
					font-size: 26rpx;
					background-color: #ffeded;
				}
			}
		}

		// 确认按钮
		button {
			width: 700rpx;
			margin-top: 65rpx;
			background-color: #ff4444;
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
		right: 40rpx;
		bottom: 50rpx;
		z-index: 5;

		.topimg {
			width: 100rpx;
			height: 100rpx;
		}
	}

	// 回到顶部到这
}
</style>
