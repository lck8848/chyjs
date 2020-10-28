<template>
	<view class="add-order-container">
		<view class="addr-shell">
			<list-cell padding="0" :unlined="true" :arrow="true" @click="updateAddr()">
				<view class="addr">
					<view class="row">
						{{isNoAddr ?"暂未获取到收货地址" :addr.addr_area}}
					</view>
					<view class="info">
						{{isNoAddr ?"请新建收货地址" :addr.addr_detail+addr.addr_house}}
					</view>
					<view class="row">
						{{isNoAddr ?"" :addr.nickname+" "+addr.phone}}
					</view>
				</view>
			</list-cell>
			<view class="postage">
				<view class="text">
					配送方式
				</view>
				<view class="text">
					快递
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="shop">
				<view class="shop-icon">
					<image class="icon" src="http://47.106.36.197:7000/source/other/shop.svg" mode="widthFix"></image>
				</view>
				<view class="shop-name">
					吃货研究所
				</view>
			</view>
			<view class="goods" v-for="item in goodsList">
				<view class="goods-img">
					<image class="img" :src="item.image_url" mode="widthFix"></image>
				</view>
				<view class="goods-info">
					<view class="top">
						<view class="goods-title">
							{{item.title}}
						</view>
						<view class="goods-spec">
							{{item.spec_name}}
						</view>
					</view>
					<view class="bottom">
						<view class="price">
							<text class="price-tiny">￥</text>
							<text class="price-big">{{ item.price.toFixed(2).split('.')[0] }}</text>
							<text class="price-tiny">.{{ item.price.toFixed(2).split('.')[1] }}</text>
						</view>
						<view class="count">x {{item.count}}</view>
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import listCell from '../../../../components/thorui/tui-list-cell/tui-list-cell.vue';
	import { getOneAddr, getAddr } from '../../../../api/index.js';
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				isNoAddr: false,
				goodsList: [],
				addr: {}
			};
		},
		computed: {
			...mapGetters(['getUser'])
		},
		methods: {
			async getAddr(){
				if(this.getUser.addr_id){
					this.addr = await getOneAddr(this.getUser.addr_id);
				}else {
					let data = await getAddr(this.getUser.id);
					if(data.length !== 0){
						this.addr = data[data.length-1];
					}else {
						this.isNoAddr = true;
					}
				}
				this.goodsList = await this.$store.dispatch('getCheckGoods');
			},
			updateAddr(){
				uni.navigateTo({
					url:'/pages/user/address/editAddress'
				})
			}
		},
		onShow() {
			this.getAddr();
		},
		components: {
			listCell
		}
	}
</script>

<style lang="scss" scoped>
.add-order-container {
	padding: 30rpx 30rpx;
	.addr-shell {
		overflow: hidden;
		margin-bottom: 24rpx;
		border-radius: 16rpx;
		background-color: #fff;
		.addr {
			padding: 24rpx 80rpx 24rpx 24rpx;
			.row {
				color: #323233;
				font-size: 26rpx;
			}
			.info {
				margin: 16rpx 0;
				color: #323233;
				font-size: 34rpx;
				font-weight: 700;
			}
		}
		.postage {
			display: flex;
			justify-content: space-between;
			padding: 20rpx 24rpx;
			.text {
				color: #323233;
				font-size: 28rpx;
			}
		}
	}
	.content {
		border-radius: 16rpx;
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
					height: auto;
				}
			}
			.shop-name {
				font-size: 28rpx;
			}
		}
		.goods {
			display: flex;
			padding: 24rpx;
			.goods-img {
				width: 188rpx;
				margin-right: 20rpx;
				.img {
					width: 100%;
					height: auto;
					border-radius: 16rpx;
				}
			}
			.goods-info {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.top {
					line-height: 38rpx;
					.goods-title {
						font-size: 28rpx;
						margin-bottom: 12rpx;
						
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
	}
}
</style>
