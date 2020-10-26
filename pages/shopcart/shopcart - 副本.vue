<template>
	<view class="container">

		<!-- 购物车为空 -->
		<view class="empty" v-if="isEmpty">
			<view class="imgContainer">
				<image src="/static/images/icon/cart-empty.png" mode=""></image>
			</view>
			<view class="desc">购物车里什么都没有,快去首页逛逛吧</view>
			<button class="btn" @click="onIndex">去逛逛</button>
		</view>

		<!-- 购物车有数据 -->
		<view class="mycart" v-else>
			<van-checkbox-group :value="selectResult" @change="onChangeCheckbox">

				<u-swipe-action :show="item.show" btn-width="120" :index="index" v-for="(item, index) in list" :key="index" @click="clickDele"
				 @open="open" :options="options">
					<view class="goods">
						<view class="checkbox">
							<van-checkbox :name="item.id" :value="goodsSelect" checked-color="#ff347d"></van-checkbox>
						</view>
						<view class="main" @click="onGoods(item.goodsId)">
							<view class="imgContainer">
								<image :src="item.imgUrl"></image>
							</view>
							<view class="info">
								<view class="title">
									{{item.title}}
								</view>
								<view class="specification">
									{{item.guigeValue}}
								</view>
								<view class="price">
									{{item.price}}
								</view>
							</view>
						</view>
						<view class="stepper">
							<!-- integer 限制输入整数 -->
							<van-stepper integer :value="item.num" button-size="50rpx" @change="onChangeStepper(); getChangeIndex(index); changeGoodsNum()" />
						</view>
					</view>
				</u-swipe-action>

			</van-checkbox-group>
		</view>

		<van-submit-bar class="submitBar" v-if="!isEmpty" :price="totalPrice" button-text="去结算" @submit="onClickSubmit"
		 safe-area-inset-bottom="true">
			<van-checkbox :value="allSelect" @change="changeAllSelect" checked-color="#ff347d">全选</van-checkbox>
		</van-submit-bar>

	</view>
</template>

<script>
	import {
		getCart,
		deleCart,
		updateCartNum
	} from '../../api/cart.js'
	import { setTabbarBadge } from '../../utils/common.js'
	export default {
		async onShow() {
			
			setTabbarBadge(this);
			// this.allSelect = false;
			// this.goodsSelect = false;
			
			// 每次进入购物车都要请求一次最新数据
			let {
				user_id
			} = JSON.parse(uni.getStorageSync('userInfo'))
			let {
				data
			} = await getCart(user_id)

			if (data.length == 0) {
				this.isEmpty = true;
			} else {
				this.isEmpty = false;
				data.map(v => {
					v.show = false;
				})
				this.list = data;
			}
			
		},
		data() {
			return {
				isEmpty: false,
				selectResult: [],
				show: false,
				currenIndex: "",
				currenNum: "",
				allSelect: false,
				goodsSelect: false,
				totalPrice: 0.00,
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#ff347d'
					}
				}],
				list: [],
			}
		},
		methods: {
			// 购物车无商品，点击跳转到首页
			onIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 点击步进器
			onChangeStepper(event) {
				// console.log("num",event.detail)
				this.currenNum = event.detail;
				// this.num = event.detail;
			},
			// 获取修改数量的下标
			getChangeIndex(index) {
				// console.log("index",index)
				this.currenIndex = index;
			},
			// 修改商品数量
			async changeGoodsNum() {
				
				let cart = this.list[this.currenIndex];
				cart.num = this.currenNum;
				
				// 修改vuex数量
				this.$store.commit('modifyCartNum', {id: cart.id, num: this.currenNum})
				
				// 修改购物车商品数量
				await updateCartNum(cart.id, cart.num);
				setTabbarBadge(this);

				// 若为勾选状态，点击修改数量，则进一步修改价格
				// console.log(this.selectResult)
				if (this.selectResult.length == 0) {
					return;
				} else {
					let totalPrice = 0;
					this.selectResult.forEach(v => {
						this.list.forEach(d => {
							if (v == d.id) {
								totalPrice += (d.num * d.price)
							}
						})
					})

					this.totalPrice = totalPrice * 100;
					console.log(totalPrice)
				}
				

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
				}else {
					this.allSelect = false;
				}

				let selectGoods = [];
				this.selectResult.forEach(v => {
					this.list.forEach(d => {
						if (v == d.id) {
							selectGoods.push(d)
						}
					})
				})

				let totalPrice = 0;
				selectGoods.forEach(v => {
					totalPrice += (v.price * v.num)
				})
				// console.log(totalPrice * 100);
				this.totalPrice = totalPrice * 100;

			},
			// 右滑删除
			async clickDele(index) {

				// 获取当前商品的购物车id
				let cartId = this.list[index].id;
				// 删除数据库数据
				let {
					code
				} = await deleCart(cartId);
				if (code == 200) {
					// 改变vuex的数量
					this.$store.commit('deleCartData', cartId)
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
					this.totalPrice = 0.00;
					this.allSelect = false;

					// 隐藏红点
					uni.removeTabBarBadge({
						index: 2
					})
				}

			},
			// 如果打开一个的时候，不需要关闭其他，则无需实现本方法
			open(index) {
				// 先将正在被操作的swipeAction标记为打开状态，否则由于props的特性限制，
				// 原本为'false'，再次设置为'false'会无效
				// console.log(index)
				this.list[index].show = true;
				this.list.map((val, idx) => {
					if (index != idx) this.list[idx].show = false;
				})
			},
			// 点击全选按钮
			changeAllSelect() {
				this.allSelect = !this.allSelect;
				if (this.allSelect) {
					let totalPrice = 0;
					this.list.forEach(v => {
						this.selectResult.push(v.id.toString())
						totalPrice += (v.price * v.num);
					})
					this.totalPrice = totalPrice * 100;
				} else {
					this.selectResult = [];
					this.totalPrice = 0;
				}
			},
			// 去结算
			onClickSubmit() {
				// 先判断用户是否勾选商品
				if (this.selectResult.length == 0) {
					this.$u.toast(`还没选中商品呢`);
					return;
				}

				// 传递购物车的商品信息与总价
				let orderInfo = {
					cartinfo: [],
					totalPrice: this.totalPrice / 100
				};
				let tempArr = [];
				this.list.forEach(v => {
					this.selectResult.forEach(d => {
						if (v.id == d) {
							tempArr.push(v)
						}
					})
				})
				orderInfo.cartinfo = tempArr;
				let str = JSON.stringify(orderInfo)

				uni.navigateTo({
					url: `/pages/submitOrder/submitOrder?orderInfo=${str}`
				})
			},
			onGoods(id) {
				uni.navigateTo({
					url: `/pages/good-detail/good-detail?goodsId=${id}`
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #FAFAFA;
		min-height: 100vh;

		.empty {
			padding-top: 240rpx;
			text-align: center;

			.imgContainer {
				margin-bottom: 28rpx;

				image {
					width: 160rpx;
					height: 160rpx;
				}

			}

			.desc {
				color: #999;
				font-size: 28rpx;
				margin-bottom: 28rpx;
			}

			.btn {
				color: #fff;
				width: 400rpx;
				height: 120rpx;
				background: linear-gradient(to right, #ff3456, #ff347d);
				border-radius: 10rpx;
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				font-size: 28rpx;
				margin: 0 auto;
			}
		}

		.mycart {

			.goods {
				display: flex;
				padding: 18rpx;

				.checkbox {
					padding: 54rpx 10rpx 0 0;
				}

				.main {
					display: flex;

					.imgContainer {
						text-align: center;
						margin-right: 20rpx;


						image {
							width: 160rpx;
							height: 160rpx;
						}
					}

					.info {
						width: 290rpx;

						.title {
							font-size: 28rpx;
							font-weight: 600;
							color: #333;

							word-break: break-all;
							text-overflow: ellipsis;
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp: 1;
							-webkit-box-orient: vertical;
						}

						.specification {
							font-size: 24rpx;
							color: #ccc;

							word-break: break-all;
							text-overflow: ellipsis;
							overflow: hidden;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}

						.price {
							font-size: 32rpx;
							color: #ff3456;
						}
					}

				}

				.stepper {
					padding-top: 96rpx;
				}
			}


		}

	}
</style>
