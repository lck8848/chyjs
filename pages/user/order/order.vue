<template>
	<view class="order-container">
		<view class="head-fixed">
			<view class="search-container">
				<view class="search-shell">
					<view class="search" v-if="isShow">
						<uni-icons class="search-icon" color="#999999" size="14" type="search" />
						<input class="search-input" type="text" v-model="value" :placeholder="placeholder"
						auto-focus @blur="show" @confirm="search()" />
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
					{{ item.title }}
				</view>
				<view class="tab-line" :style="'transform: translateX('+current*150+'rpx) translateX(-50%);'"></view>
			</view>
		</view>
		
		<view class="order-list">
			<view class="order" v-for="item in orderList" :key="item.id">
				<view class="head">
					<view class="left">
						{{ item.shop_name }}
						<view class="right-icon"></view>
					</view>
					<view class="right">等待买家付款</view>
				</view>
				<view class="goods">
					<view class="img-shell">
						<image class="img" :src="item.image_url" mode="widthFix"></image>
					</view>
					<view class="info">
						<view class="info-top">
							<view class="info-left">
								{{ item.title }}
							</view>
							<view class="info-right">
								<view class="price">￥{{ item.price.toFixed(2) }}</view>
								<view class="count">x{{ item.total_num }}</view>
							</view>
						</view>
						<view class="info-bottom">{{ item.spec_name }}</view>
					</view>
				</view>
				
				<view class="shell">
					<view class="total-price">
						需付款
						<view class="mini">￥</view>
						<view class="big">{{ (item.total_price.toFixed(2).toString()).split('.')[0] }}</view>
						<view class="mini">.{{ (item.total_price.toFixed(2).toString()).split('.')[1] }}</view>
					</view>
				</view>
				<view class="shell">
					<view class="button">
						<view class="btn cancel" @tap="cancel()">取消订单</view>
						<view class="btn pay"  @tap="atOnce()">立即付款</view>
					</view>
				</view>
			</view>
		</view>
		
		<view :class="['empty', current === 0?'empty-list':'']" v-if="orderList.length === 0">
			<view class="shell-img">
				<image class="img" src="http://47.106.36.197:7000/source/other/empty_order.png" mode="widthFix"></image>
			</view>
			<view class="text">
				暂无订单
			</view>
		</view>
		
		<recommend></recommend>
	</view>
</template>

<script>
	import { getOrderByUserId } from '@/api/index.js';
	import recommend from '../../../component/recommend/recommend.vue';
	export default {
		data() {
			return {
				userId: 1,
				current: 0,
				value: "",
				placeholder:"搜索订单",
				isShow: false,
				tabList: [{title:"全部", status: 0}, {title:"待付款", status: 1},
					{title:"待发货", status: 3}, {title:"待收货", status:2}, {title:"退款/售后", status:4}],
				orderList: []
			};
		},
		methods: {
			async search(){
				let { status, data } = await getOrderByUserId(this.userId, this.tabList[this.current].status,this.value);
				if(!status){
					this.orderList = data;
				}
			},
			show(msg){
				if(msg === 'cancel'){
					this.isShow = false;
					this.value = "";
				}else {
					this.isShow = this.value.trim() ?this.isShow = true :!this.isShow;
				}
			},
			async checked(index){
				this.current = index;
				let { status, data } = await getOrderByUserId(this.userId, this.tabList[index].status, this.value);
				if(!status){
					this.orderList = data;
				}
			},
			cancel(){
				console.log("取消订单");
			},
			atOnce(){
				console.log("立即付款");
			}
		},
		onLoad({index}){
			if(index){
				this.checked(Number(index)+1);
			}
		},
		created() {
			if(!this.current){
				this.checked(0);
			}
		},
		components: {
			recommend
		}
	}
</script>

<style lang="scss">
.order-container {
	padding-top: 180rpx;
	.empty {
		padding: 64rpx 0;
		text-align: center;
		background-color: #fff;
		.shell-img {
			margin-bottom: 32rpx;
			.img {
				width: 320rpx;
			}
		}
		.text {
			color: #969799;
			font-size: 28rpx;
		}
	}
	.empty-list {
		padding-top: 240rpx;
		height: 90vh;
	}
	
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
			margin-top: 20rpx;
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
							
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							overflow: hidden;
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
				padding-top: 32rpx;
			}
			.total-price {
				display: flex;
				font-size: 28rpx;
				
				display:flex;
				align-items:flex-end;
				.mini {
					padding-top: 8rpx;
					font-size: 24rpx;
				}
				.big {
					font-size: 32rpx;
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
