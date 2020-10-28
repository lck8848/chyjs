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
				<view class="edit" @tap="isEdit=!isEdit">
					<view class="btn" v-show="isEdit">编辑</view>
					<view class="btn" v-show="!isEdit">完成</view>
				</view>
			</view>
		
			<view class="cart-list">
				<view class="cart" v-for="(item, index) in cart" :key="item.id">
					<view class="check-shell">
						<evan-checkbox class="check" v-model="item.checked" primary-color="red"></evan-checkbox>
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
										{{ item.spec.spec_name }}
									</view>
									<image src="http://47.106.36.197:7000/source/other/bottom.svg" class="bottom" mode="widthFix"></image>
								</view>
							</view>
							
							<view class="price-count">
								<view class="price">
									<view class="icon">￥</view>
									{{ item.spec.price }}
								</view>
								<van-stepper :value="item.count" step="1" @change="changeCount(index)" />
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 弹出层 -->
		<tui-bottom-popup class="goods-info" :show="isShow" @close="isShow=false" height="750">
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
		<view class="top-button" @click="ToTop" v-if="showtotop">
			<image src="../../static/images/index/icon/top.png" class="topimg"></image>
		</view>
		
		<recommend :scrollTop="scrollTop"></recommend>
	</view>
</template>

<script>
	import recommend from "../../component/recommend/recommend.vue";
	import { getSpec } from "../../api/index.js";
	export default {
		data() {
			return {
				selected: false,
				cart: [],
				isEdit: true,
				isShow: false,
				scrollTop: 0,
				specArr: [],
				current: 0,
				index: 0,
				showtotop:false
			}
		},
		methods: {
			// 回到顶部
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
					if(v.id === this.cart[cIndex].spec.id){
						this.index = index;
						return true;
					}
				})
				this.isShow = true;
			},
			toggleSpec(){
				this.$store.dispatch('updateCart', {
					id: this.cart[this.current].id,
					spec_id: this.specArr[this.index].id
				});
				this.cart = this.$store.getters.getCarts;
				this.isShow = false;
			},
			changeCount({detail}, index){
				console.log(detail, index);
				this.$store.dispatch('updateCart', {
					id: this.cart[index].id,
					count: this.cart[index].count
				});
			}
		},
		onShow() {
			this.cart = this.$store.getters.getCarts;
		},
		onPageScroll({scrollTop}){
			this.scrollTop = scrollTop;
			if(scrollTop >= 300){
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
					padding: 24rpx 32rpx 0;
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
					padding: 16rpx 32rpx;
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
			bottom: 150rpx;
			z-index: 900;

			.topimg {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}
</style>
