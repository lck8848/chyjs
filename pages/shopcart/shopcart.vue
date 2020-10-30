<template>
	<view class="cart-container">
		
		<!-- 购物车为空时 -->
		<view class="empty_cart" v-if="cart.length === 0">
			<view class="empty_img"></view>
			<view class="text">购物车还是空的</view>
			<text class="hurry">赶紧买点宝贝慰劳下自己吧</text>
			<navigator class="go-shop" url="/pages/index/index" open-type="switchTab">去逛逛</navigator>
		</view>
		
		<view class="cart-shell" v-else>
			<view class="navigator">
				<navigator class="info" url="/pages/index/index" open-type="switchTab">
					<image class="img" src="http://47.106.36.197:7000/source/other/shop.svg" mode="widthFix"></image>
					<view class="text">吃货研究所店铺</view>
					<image class="img" src="http://47.106.36.197:7000/source/other/right.svg" mode="widthFix"></image>
				</navigator>
				
				<!-- 编辑购物车 -->
				<view class="edit" @tap="editCart">
					<view class="btn" v-show="!isEdit">编辑</view>
					<view class="btn" v-show="isEdit">完成</view>
				</view>
			</view>
		
			<view class="cart-list">
				<view class="cart" v-for="(item, index) in cart" :key="item.id">
					<view class="check-shell">
						<evan-checkbox class="check" v-model="checkArr[index]" primary-color="red" @change="changeCheck($event, index)" v-if="isEdit"></evan-checkbox>
						<evan-checkbox class="check" v-model="item.checked" primary-color="red" @change="changeCheck($event, index)" v-else></evan-checkbox>
					</view>
					<view class="goods">
						<view class="img-shell">
							<image class="img" :src="item.image_url" mode="widthFix"></image>
						</view>
						<view class="content">
							<view class="title">
								{{ item.title }}
							</view>
							<view class="spec-shell">
								<view class="spec" @tap="chooseSpec(index)">
									<view class="text">
										{{ item.spec_name }}
									</view>
									<image src="http://47.106.36.197:7000/source/other/bottom.svg" class="bottom" mode="widthFix"></image>
								</view>
							</view>
							
							<view class="price-count">
								<view class="price">
									<view class="icon">￥</view>
									{{ item.price }}
								</view>
								<van-stepper v-model="item.count" step="1" @change="changeCount($event, index)" />
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="operate">
				<view class="left">
					<evan-checkbox class="all-check" v-model="allCheck" primary-color="red" @change="allChecked()"></evan-checkbox>
					全选
				</view>
				<view class="buy" v-if="!isEdit">
					<view class="total-price">
						<view class="price">
							<view class="text">合计：</view>
							<view class="number"><text class="icon">￥</text>{{totalPrice}}</view>
						</view>
						<view class="postage">
							不含运费
						</view>
					</view>
					<button :class="['be-btn', totalPrice===0 ?'none-btn' :'']" @tap="addOrder">结算</button>
				</view>
				<view v-else>
					<button :class="['be-btn', isNoneAll ?'none-btn' :'']" @click="deleteCart()">删除</button>
				</view>
			</view>
		</view>
		
		<!-- 弹出层 -->
		<tui-bottom-popup class="goods-info" :show="isShow" @close="isShow=false" :height="height">
			<view class="popup-shell">
				<image src="http://47.106.36.197:7000/source/other/close.svg" class="close" @click="isShow=false"></image>
				<view class="goods">
					<image class="img" :src="cart[current].image_url" mode="widthFix"></image>
					<view class="info">
						<view class="price">
							<text class="icon">￥</text>
							<text class="num">{{specArr[index].price}}</text>
						</view>
						<view class="rest">剩余 {{specArr[index].stock_num}} 件</view>
						<view class="rest">已选 {{specArr[index].spec_name}}</view>
					</view>
				</view>

				<!-- 规格 -->
				<scroll-view scroll-y="true" class="spec" >
					<text class="name">{{cart.spec_title}}</text>
					<view class="all">
						<text v-for="(item, s_index) in specArr" :key="item.id"
						:class="{'item':true,'selected': s_index===index }"
						@tap="index = s_index">
							{{item.spec_name}}
						</text>
					</view>
				</scroll-view>
				
				<view class="btn-shell">
					<button class="confirm-btn" @click="toggleSpec()">确认</button>
				</view>
			</view>
		</tui-bottom-popup>


		<!-- 回到顶部 -->
		<view class="top-button" @click="ToTop" v-if="showtotop" @sroll="scroll">
			<image src="../../static/images/index/icon/top.png" class="topimg"></image>
		</view>
		
		<recommend :scrollTop="scrollTop"></recommend>
	</view>
</template>

<script>
	import recommend from "@/component/recommend/recommend.vue";
	import { getSpec } from "@/api/index.js";
	import { mapGetters, mapActions, mapMutations } from "vuex";
	export default {
		data() {
			return {
				cart: [],
				isEdit: false,	//判断是否处于编辑
				isShow: false,	//控制弹出层
				scrollTop: 0,
				// 回到顶部初始值
				showtotop:false,
				specArr: [],	//当前商品的规格
				current: 0,		//当前弹出的购物车下标
				index: 0,		//所选择规格的下标
				checkArr: [],
				allCheck: false,//全选
				isAllCheck: false,//判断check是否有改变
				tempCheck: false,//切换编辑后，保留原先的全选
				isNoneAll: false,//进入编辑，判断是否有选择
				totalPrice: 0,	//总金额
				height: 550
			}
		},
		computed: {
			...mapGetters(['getCarts'])
		},
		watch: {
			getCarts(){
				this.cart = this.$store.getters.getCarts;
				this.totalPrice = this.cart.reduce((total, v) => {
					return total + (v.checked ?v.price*v.count :0);
				}, 0);
				this.totalPrice = this.totalPrice.toFixed(2);
				if(this.isAllCheck){
					this.allCheck = true;
					this.cart.map(v => {
						if(!v.checked){
							this.allCheck = false;
						}
					});
					this.tempCheck = this.allCheck;
					this.isAllCheck = false;
				}
			},
			specArr(){
				this.height = this.specArr.length>4 ?750 :550;
			}
		},
		methods: {
			...mapActions(['getCartList', 'updateCart', 'delCart', 'updateAllCart']),
			ToTop() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			async chooseSpec(cIndex) {
				this.current = cIndex;
				let { data } = await getSpec(this.cart[cIndex].goods_id);
				this.specArr = data;
				this.specArr.some((v,index) => {
					if(v.id === this.cart[cIndex].id){
						this.index = index;
						return true;
					}
				})
				this.isShow = true;
			},
			toggleSpec(){
				this.updateCart({
					id: this.cart[this.current].id,
					spec_id: this.specArr[this.index].id
				});
				this.isShow = false;
			},
			changeCount(e, index){
				this.updateCart({
					id: this.cart[index].id,
					count: e.detail
				});
			},
			changeCheck(value, index){
				if(this.isEdit){
					this.allCheck = this.checkArr.every(v => v===true);
					this.isNoneAll = this.checkArr.every(v => v===false);
					return;
				}
				this.updateCart({
					id: this.cart[index].id,
					checked: value ?1 :0
				});
				this.isAllCheck = true;
			},
			editCart(){
				this.isEdit = !this.isEdit;
				if(this.isEdit){
					this.checkArr = Array(this.cart.length).fill(false);
					this.allCheck = false;
					this.isNoneAll = true;
				}else {
					this.allCheck = this.tempCheck;
				}
			},
			allChecked(){
				if(this.isEdit){
					this.isNoneAll = !this.allCheck;
					this.checkArr = Array(this.cart.length).fill(this.allCheck);
				}else {
					this.updateAllCart(this.allCheck ?1 :0);
					this.tempCheck = this.allCheck;
				}
			},
			deleteCart(){
				if(this.isNoneAll)return;
				let arr = [];
				this.checkArr.map((v, index) => {
					if(v){
						arr.push(this.cart[index].id);
					}
				});
				uni.showModal({
					content: `确定删除所选店铺的${arr.length}个商品`,
					confirmText: '确认',
					confirmColor: '#ff4444',
					success: ({confirm}) => {
						if(confirm){
							this.delCart(arr.join(','));
							this.checkArr = Array(this.cart.length).fill(false);
							this.isNoneAll = true;
						}
					}
				});
			},
			addOrder(){
				if(this.totalPrice === 0){
					uni.showToast({
						title: "请选择商品",
						icon: "none"
					});
					return;
				}
				uni.navigateTo({
					url: "../user/order/addOrder/addOrder"
				})
			}
		},
		onShow() {
			this.getCartList();
			this.isAllCheck = true;
		},
		onPageScroll({scrollTop}){
			this.scrollTop = scrollTop;
			if(scrollTop >= 1000){
				this.showtotop = true;
			}else{
				this.showtotop = false;
			}
		},
		components: {
			recommend
		}
	}
</script>

<style lang="scss" scoped>
	.cart-container {

		// 购物车为空时
		.empty_cart {
			padding: 64rpx 0;
			font-size: 28rpx;
			text-align: center;
			.empty_img {
				width: 300rpx;
				height: 300rpx;
				margin: auto;
				background-image: url(http://47.106.36.197:7000/source/other/empty_cart.png);
				background-size: cover;
			}
			.text {
				margin: 48rpx 0 16rpx;
				color: #323233;
			}
			.hurry {
				color: #969799;
			}
			.go-shop {
				width: 144rpx;
				height: 60rpx;
				border: 2rpx solid #f44;
				margin: 32rpx auto 0;
				line-height: 60rpx;
				border-radius: 999rpx;
				color: #f44;
				text-align: center;
			}
		}
		
		.cart-shell {
			.navigator {
				display: flex;
				justify-content: space-between;
				background-color: #fff;
			
				.info {
					display: flex;
					padding-left: 24rpx;
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
							.spec-shell {
								display: flex;
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
							}
							
							.price-count {
								display: flex;
								justify-content: space-between;
								width: 100%;
								align-items: center;
								.price {
									display: flex;
									color: #f44;
									font-weight: bold;
									font-size: 32rpx;
									.icon {
										margin: 8rpx 4rpx 0 0;
										font-size: 24rpx;
									}
								}
							}
						}
					}
				}
			}
			
			.operate {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				display: flex;
				justify-content: space-between;
				padding: 14rpx 24rpx;
				height: 72rpx;
				align-items: center;
				background-color: #fff;
				z-index: 99;
				.left {
					display: flex;
					color: #333333;
					align-items: center;
					font-size: 28rpx;
					.all-check {
						margin-right: 10rpx;
					}
				}
				.buy {
					display: flex;
					.total-price {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						.price {
							display: flex;
							.text {
								color: #323233;
								font-size: 28rpx;
							}
							.number {
								color: #f44;
								font-size: 32rpx;
								font-weight: 600;
								.icon {
									margin-right: 4rpx;
									font-size: 24rpx;
									font-weight: 400;
								}
							}
						}
						.postage {
							text-align: right;
							color: #969799;
							font-size: 24rpx;
						}
					}
				}
				.be-btn {
					width: 192rpx;
					height: 72rpx;
					margin-left: 24rpx;
					line-height: 72rpx;
					border-radius: 999rpx;
					color: #fff;
					font-size: 28rpx;
					background-color: #F44;
				}
				.none-btn {
					background-color: #c8c9cc;
				}
			}
		}
		
		// 弹出层
		.goods-info {
			.popup-shell {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				height: 750rpx;
				.close {
					position: absolute;
					top: 30rpx;
					right: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}
				.goods {
					display: flex;
					border-bottom: 1rpx solid #f8f8f8;
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

				// 规格
				.spec {
					flex: 1;
					padding: 24rpx 32rpx 132rpx;
					.name {
						padding-bottom: 24rpx;
						color: #323233;
						font-size: 28rpx;
					}

					.all {
						display: flex;
						flex-wrap: wrap;
						align-items: center;
						margin-top: 20rpx;

						.item {
							padding: 16rpx;
							margin: 0 24rpx 24rpx 0;
							border-radius: 8rpx;
							color: #323233;
							font-size: 26rpx;
							background-color: #f7f8fa;
						}
						.selected {
							color: #f44;
							background-color: #FFEDED;
						}
					}
				}
				.btn-shell {
					position: fixed;
					left: 0;
					right: 0;
					bottom: 0;
					padding: 16rpx 32rpx;
					background-color: #fff;
					.confirm-btn {
						height: 80rpx;
						line-height: 80rpx;
						border-radius: 999rpx;
						color: #fff;
						font-size: 28rpx;
						background-color: #F44;
					}
				}
			}
		}

		// 回到顶部
		.top-button {
			width: 70upx;
			height: 70upx;
			// 固定定位
			position: fixed;
			right: 50rpx;
			bottom: 60rpx;
			z-index: 900;

			.topimg {
				width: 100rpx;
				height: 100rpx;
			}
		}
		
	}
</style>
