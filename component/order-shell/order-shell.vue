<template>
	<view class="order-shell-container">
		<view class="title">
			<view class="left">我的订单</view>
			<navigator url="/pages/user/order/order">
				<view class="right">
					<view class="more">
						查看全部订单
					</view>
					<view class="right-icon"></view>
				</view>
			</navigator>
		</view>
		<view class="container">
			<view class="order-case" v-for="(item, index) in list" :key="index">
				<navigator :url="'/pages/user/order/order?index='+index">
					<view class="img-shell">
						<image class="img" :src="item.url" mode="widthFix"></image>
					</view>
					<view class="text">
						{{ item.text }}
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "order-shell",
		data(){
			return {
				list: [
					{ url: "http://47.106.36.197:7000/source/other/obligation.svg", text: "待付款"},
					{ url: "http://47.106.36.197:7000/source/other/send_out.svg", text: "待发货"},
					{ url: "http://47.106.36.197:7000/source/other/receive_goods.svg", text: "待收货"},
					{ url: "http://47.106.36.197:7000/source/other/finish.svg", text: "退款/售后"}
				],
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-shell-container {
		margin: 0 22rpx 20rpx;
		border-radius: 8px;
		background-color: #fff;
		
		.title {
			display: flex;
			justify-content: space-between;
			padding: 20rpx;
			.left {
				color: #111;
				font: inherit;
				font-size: 32rpx;
				vertical-align: initial;
				font-weight: 700;
			}
			.right {
				display: flex;
				align-items: center;
				.more {
					color: #969799;
					font-size: 24rpx;
				}
				.right-icon {
					width: 20rpx;
					height: 24rpx;
					background-image: url(/static/images/showcase/right.png);
					background-size: cover;
				}
			}
		}
		
		.container {
			display: flex;
			padding: 40rpx 0 40rpx;
			.order-case {
				flex: 1;
				text-align: center;
				.img-shell {
					.img {
						width: 60rpx;
					}
				}
				.text {
					color: #111;
					font-size: 24rpx;
				}
			}
		}
		
	}
</style>
