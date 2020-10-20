<template>
	<view class="order-container">
		<view class="head-fixed">
			<view class="search-container">
				<view class="search-shell">
					<view class="search" v-if="isShow">
						<uni-icons class="search-icon" color="#999999" size="14" type="search" />
						<input class="search-input" type="text" v-model="value" :placeholder="placeholder"
						auto-focus @blur="show" />
					</view>
					<view class="setout" @tap="show" v-else>
						<uni-icons color="#c8c9cc" size="14" type="search" />
						<text class="search-placeholder" >{{ placeholder }}</text>
					</view>
				</view>
				<view class="cancel" @tap="show('cancel')" v-show="isShow">取消</view>
			</view>
			<view class="tab">
				<view class="tab-check" v-for="(item, index) in tabList" :key="index" @tap="checked(index)"
				:class="current === index ?'checked':''">
					{{ item }}
				</view>
				<view class="tab-line" :style="'transform: translateX('+current*150+'rpx) translateX(-50%);'"></view>
			</view>
		</view>
		
		<view class="order-list">
			<view class="order">
				<view class="head">
					<view class="left">
						吃货研究所店铺
						<view class="right-icon"></view>
					</view>
					<view class="right">等待买家付款</view>
				</view>
				<view class="goods">
					<view class="img-shell">
						<image class="img" src="../../../static/images/allGoods/haoyou.webp" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="info-top">
							<view class="info-left">
								[濑祭]23二割分山田锦纯米大吟酿清酒720ml
							</view>
							<view class="info-right">
								<view class="price">￥899.00</view>
								<view class="count">x1</view>
							</view>
						</view>
						<view class="info-bottom">720mL装</view>
					</view>
				</view>
				
				<view class="shell">
					<view class="total-price">
						需付款
						<view class="mini">￥</view>
						<view class="big">899</view>
						<view class="mini">.00</view>
					</view>
				</view>
				<view class="shell">
					<view class="button">
						<view class="btn cancel">取消订单</view>
						<view class="btn pay">立即付款</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				value: "",
				placeholder:"搜索订单",
				isShow: false,
				tabList: ["全部", "待付款", "待发货", "待收货", "退款/售后"]
			};
		},
		methods: {
			search({ value }){
				console.log(value);
			},
			inputText({ value }){
				console.log(value);
			},
			show(msg){
				if(msg === 'cancel'){
					this.isShow = false;
					this.value = "";
				}else {
					this.isShow = this.value.trim() ?this.isShow = true :!this.isShow;
				}
			},
			checked(index){
				this.current = index;
				console.log(index);
			}
		},
		onLoad(option){
			this.current = option.index;
		}
	}
</script>

<style lang="scss">
.order-container {
	padding-top: 200rpx;
	.head-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		.search-container {
			display: flex;
			padding: 16rpx 32rpx;
			background-color: #fff;
			align-items: center;
			.search-shell {
				flex: 1;
				display: flex;
				box-sizing: border-box;
				padding: 10rpx 16rpx 10rpx 24rpx;
				height: 68rpx;
				align-items: center;
				border-radius: 999rpx;
				background-color: #f7f8fa;
				.search {
					flex: 1;
					display: flex;
					.search-icon {
						margin-right: 8rpx;
					}
					.search-input {
						flex: 1;
						height: 48rpx;
						font-size: 28rpx;
					}
				}
				.setout {
					width: 100%;
					height: 56rpx;
					line-height: 56rpx;
					text-align: center;
					.search-placeholder {
						vertical-align: text-top;
						font-size: 28rpx;
						color: #c8c9cc;
						margin-left: 10rpx;
					}
				}
			}
			.cancel {
				padding-left: 20rpx;
				font-size: 28rpx;
			}
		}

		.tab {
			display: flex;
			position: relative;
			height: 88rpx;
			line-height: 88rpx;
			background-color: #fff;
			box-shadow: 0 2px 12px 0 rgba(100,101,102,.12);
			.tab-check {
				flex: 1;
				color: #646566;
				font-size: 28rpx;
				text-align: center;
			}
			.checked {
				color: #f44;
			}
			.tab-line {
				position: absolute;
				bottom: 0;
				left: 74rpx;
				width: 80rpx;
				height: 6rpx;
				border-radius: 6rpx;
				z-index: 1;
				background-color: #f44;
				transition-duration: 0.3s;
			}
		}
	}

	.order-list {
		padding: 0 20rpx 0;
		.order {
			padding: 0rpx 20rpx 36rpx 20rpx;
			border-radius: 16rpx;
			background-color: #fff;
			.head {
				display: flex;
				justify-content: space-between;
				height: 80rpx;
				align-items: center;
				.left {
					display: flex;
					font-size: 28rpx;
					align-items: center;
					.right-icon {
						width: 20rpx;
						height: 24rpx;
						margin-left: 8rpx;
						background-image: url(/static/images/showcase/right.png);
						background-size: cover;
					}
				}
				.right {
					color: #F01D35;
					font-size: 28rpx;
				}
			}
			.goods {
				display: flex;
				.img-shell {
					margin-right: 20rpx;
					.img {
						width: 140rpx;
						border-radius: 16rpx;
					}
				}
				.info {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.info-top {
						display: flex;
						justify-content: space-between;
						line-height: 46rpx;
						font-size: 28rpx;
						.info-left {
							margin-right: 40rpx;
						}
						.info-right {
							text-align: right;
							.count {
								color: #C8C9CC;
								font-size: 24rpx;
							}
						}
					}
					.info-bottom {
						color: #C8C9CC;
						font-size: 24rpx;
					}
				}
			}
			.shell {
				display: flex;
				flex-direction: row-reverse;
				padding-top: 20rpx;
			}
			.total-price {
				display: flex;
				font-size: 28rpx;
				.mini {
					padding-top: 8rpx;
					font-size: 24rpx;
				}
				.big {
					font-size: 36rpx;
				}
			}
						
			.button {
				display: flex;
				font-size: 28rpx;
				.btn {
					width: 140rpx;
					height: 54rpx;
					line-height: 60rpx;
					text-align: center;
					border-radius: 999rpx;
				}
				.cancel {
					border: 2rpx solid #C8C9CC;
				}
				.pay {
					border: 2rpx solid #F01D35;
					margin-left: 28rpx;
					color: #F01D35;
				}
			}
		}
	}
}
</style>
