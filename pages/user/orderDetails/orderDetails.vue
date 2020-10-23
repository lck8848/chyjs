<template>
	<view class="order-details-container" v-if="isShow">
		<view class="head">
			<view class="status">
				<view class="status-icon">
					<image class="img" :src="statusList[reStatus[data.status]].img_url" mode="widthFix"></image>
				</view>
				<view class="status-info">
					<view class="title">{{statusList[reStatus[data.status]].title}}</view>
					<view class="text">{{statusList[reStatus[data.status]].text}}</view>
				</view>
			</view>
			
			<view class="steps">
				<order-steps :options="['买家付款', '商家发货', '交易完成']" :active="reStatus[data.status]"></order-steps>
			</view>
			
			<view class="addr">
				<view class="addr-icon">
					<image class="icon" src="http://47.106.36.197:7000/source/other/addr-icon.svg" mode="widthFix"></image>
				</view>
				<view class="info">
					<view class="top">
						<view>收货人：{{data.addr.nickname}}</view>
						<view>{{data.addr.phone}}</view>
					</view>
					<view class="bottom">
						收货地址：{{data.addr.addr_area+data.addr.addr_detail+data.addr.addr_house}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="shop">
				<view class="shop-icon">
					<image class="icon" src="http://47.106.36.197:7000/source/other/shop.svg" mode="widthFix"></image>
				</view>
				<view class="shop-name">
					{{ data.goods.shop_name }}
				</view>
			</view>
			<view class="goods">
				<view class="goods-img">
					<image class="img" :src="data.goods.image_url" mode="widthFix"></image>
				</view>
				<view class="goods-info">
					<view class="top">
						<view class="goods-title">
							{{data.goods.title}}
						</view>
						<view class="goods-spec">
							{{data.goods.spec_name}}
						</view>
					</view>
					<view class="bottom">
						<view class="price">
							<text class="price-tiny">￥</text>
							<text class="price-big">{{ price.split('.')[0] }}</text>
							<text class="price-tiny">.{{ price.split('.')[1] }}</text>
						</view>
						<view class="count">x {{data.total_num}}</view>
					</view>
				</view>
			</view>
			<view class="postage">
				<view class="top">
					<view class="title">配送方式</view>
					<view>
						{{data.goods.postage === 0 ?'免运费' :'￥'+data.goods.postage}}
					</view>
				</view>
				<view class="bottom">快递发货</view>
			</view>
			<view class="message">
				<view class="title">买家留言</view>
				<view class="msg">
					{{ data.message ?data.message :'无' }}
				</view>
			</view>
		</view>
		
		<view class="o-price">
			<view class="item">
				<view class="title">商品金额</view>
				<view class="price">
					￥{{ data.total_price.toFixed(2) }}
				</view>
			</view>
			<view class="item p-item">
				<view class="title">运费</view>
				<view class="price">
					+ ￥{{ data.goods.postage === 0 ?'0.00' :data.goods.postage }}
				</view>
			</view>
			<view class="total">
				<view class="shell">
					合计：
					<view class="number">
						{{(data.total_price+data.goods.postage).toFixed(2)}}
					</view>
				</view>
			</view>
		</view>
		<view class="pay-shell">
			<view class="pay">
				<view class="shell">
					合计：
					<view class="number">
						￥{{(data.total_price+data.goods.postage).toFixed(2)}}
					</view>
				</view>
				<view class="pay-btn">
					去支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getOrderDetails } from '@/api/index.js';
	import orderSteps from '@/component/order-steps/order-steps.vue';
	export default {
		data() {
			return {
				oid: 5,
				price: '',
				isShow: false,
				data: {},
				statusList: [
					{img_url:'http://47.106.36.197:7000/source/other/await_pay.svg', title: '等待买家付款', text:"早付款早发货"},
					{img_url:'http://47.106.36.197:7000/source/other/await_pay.svg', title: '等待买家付款', text:"早付款早发货"}
				],
				reStatus: {1: 0, 2: 2, 3: 1, 4: 3}
			};
		},
		methods: {
			async getOrderDetails(oid){
				let { status, data } = await getOrderDetails(oid);
				if(!status){
					this.data = data;
					this.price = this.data.goods.price.toFixed(2).toString();
					this.isShow = true;
					console.log(this.data);
				}
			}
		},
		onLoad(option){
			if(option.oid){
				this.oid = option.oid;
			}
			this.getOrderDetails(this.oid);
		},
		onShow(){
			if(!this.data){
				this.getOrderDetails(this.oid);
			}
		},
		components: {
			orderSteps
		}
	}
</script>

<style lang="scss">
.order-details-container {
	.head {
		margin-bottom: 24rpx;
		background-color: #fff;
		.status {
			display: flex;
			padding: 20rpx;
			.status-icon {
				width: 74rpx;
				height: 74rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 8rpx;
				background-color: #b1b1b1;
				.img {
					vertical-align: middle;
					width: 72%;
				}
			}
			.status-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				padding-left: 20rpx;
				.title {
					font-size: 28rpx;
				}
				.text {
					font-size: 24rpx;
					color: #b1b1b1;
				}
			}
		}
		.steps {
			padding: 20rpx 12rpx;
			border-bottom: 0.5rpx solid #f8f8f8;
		}
		.addr {
			display: flex;
			padding: 20rpx 16rpx;
			.addr-icon {
				width: 26rpx;
				margin: 6rpx 16rpx;
				.icon {
					vertical-align: text-top;
					width: 100%;
				}
			}
			.info {
				.top {
					display: flex;
					justify-content: space-between;
					font-size: 28rpx;
					font-weight: 700;
				}
				.bottom {
					padding: 16rpx 0;
					font-size: 24rpx;
					color: #696969;
				}
			}
		}
	}

	.content {
		background-color: #fff;
		.shop {
			display: flex;
			height: 74rpx;
			border-bottom: 0.5rpx solid #f8f8f8;
			align-items: center;
			.shop-icon {
				width: 32rpx;
				margin: 0 16rpx;
				.icon {
					width: 100%;
				}
			}
			.shop-name {
				font-size: 28rpx;
			}
		}
		.goods {
			display: flex;
			padding: 16rpx;
			background-color: #f8f8f8;
			.goods-img {
				width: 188rpx;
				margin-right: 20rpx;
				.img {
					width: 100%;
					border-radius: 16rpx;
				}
			}
			.goods-info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					line-height: 38rpx;
					.goods-title {
						font-size: 28rpx;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.goods-spec {
						color: #696969;
						font-size: 24rpx;
					}
				}
				.bottom {
					display: flex;
					justify-content: space-between;
					align-items: center;
					.price {
						color: #f44;
						.price-tiny {
							font-size: 24rpx;
						}
						.price-big {
							font-size: 32rpx;
						}
					}
					.count {
						color: #696969;
						font-size: 24rpx;
					}
				}
			}
		}
	
		.postage {
			display: flex;
			flex-direction: column;
			padding: 16rpx;
			border-bottom: 0.5rpx solid #f8f8f8;
			line-height: 40rpx;
			font-size: 28rpx;
			.top {
				display: flex;
				justify-content: space-between;
				.title {
					color: #696969;
				}
			}
			.bottom {
				text-align: right;
			}
		}
		.message {
			display: flex;
			justify-content: space-between;
			padding: 16rpx;
			font-size: 28rpx;
			.msg {
				color: #696969;
			}
		}
	}
	.o-price {
		padding: 16rpx;
		margin-top: 20rpx;
		font-size: 24rpx;
		background-color: #fff;
		.item {
			display: flex;
			justify-content: space-between;
			padding: 8rpx 0;
		}
		.p-item {
			border-bottom: 0.5rpx solid #f8f8f8;
		}
		.total {
			display: flex;
			flex-direction: row-reverse;
		}
	}
	.shell {
		display: flex;
		text-align: right;
		color: #696969;
		font-size: 28rpx;
		.number {
			color: #f44;
		}
	}
	.pay-shell {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80rpx;
		display: flex;
		flex-direction: row-reverse;
		background-color: #fff;
		.pay {
			display: flex;
			.shell {
				padding: 20rpx;
				color: #000;
				align-items: center;
				font-weight: 600;
				font-size: 28rpx;
			}
			.pay-btn {
				width: 208rpx;
				height: 100%;
				line-height: 80rpx;
				color: #fff;
				text-align: center;
				font-size: 32rpx;
				background-color: #f44;
			}
		}
	}
}
</style>
