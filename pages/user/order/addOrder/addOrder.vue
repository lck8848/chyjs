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
			<view class="total">
				<text class="count">共{{ goodsList.length }}件</text>
				商品小计：
				<text class="price">
					￥
					<text class="num">{{ strPrice.split('.')[0] }}</text>
					.{{ strPrice.split('.')[1]}}
				</text>
			</view>
		</view>
		
		<view class="message">
			<view class="title">
				买家留言
			</view>
			<textarea class="msg" :auto-height="true" @input="inputMsg" placeholder="留言建议提前协商 (250字以内)" :maxlength="250"/>
		</view>
		
		<view class="add-order" v-if="!isShow">
			<view class="price-shell">
				应付：
				<text class="price">
					￥
					<text class="num">{{ strPrice.split('.')[0] }}</text>
					.{{ strPrice.split('.')[1]}}
				</text>
			</view>
			<view class="btn-shell">
				<button class="submit" @click="addOrder()">提交订单</button>
			</view>
		</view>
		
		<!-- 弹出地址列表 -->
		<tui-bottom-popup class="addr-list-shell" :show="isShow" @close="isShow=false" backgroundColor="#f8f8f8" height="850">
			<view class="addr-list">
				<view class="show-title">
					选择收货地址
					<view class="cancel" @tap="isShow=false"></view>
				</view>
				<scroll-view scroll-y="true" class="addr-content" >
					<view class="addr" v-for="(item, index) in addrList" :key="item.id">
						<view class="shell">
							<evan-checkbox class="check" v-model="addr.id === item.id" primary-color="red" @change="changeCheck(index)"></evan-checkbox>
							<view class="info">
								<view class="user">
									{{item.nickname}} {{item.phone}}
								</view>
								<view class="area">
									{{item.addr_area+item.addr_detail+item.addr_house}}
								</view>
							</view>
						</view>
						<view class="edit-shell" @tap="editAddr(item.id)">
							<image class="edit-img" src="@/static/images/user/icon_addr_edit.png" mode="widthFix" />
						</view>
					</view>
				</scroll-view>
				<view class="btn-shell">
					<button class="add-btn" @click="editAddr()">新增地址</button>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import listCell from '../../../../components/thorui/tui-list-cell/tui-list-cell.vue';
	import { getOneAddr, getAddr, addOrder } from '../../../../api/index.js';
	import { mapGetters } from 'vuex';
	export default {
		data() {
			return {
				isNoAddr: false,
				goodsList: [],
				addrList: [],
				addr: "",
				totalPrice: 0,
				strPrice: "",
				msg: "",
				isShow: false
			};
		},
		computed: {
			...mapGetters(['getUser'])
		},
		methods: {
			async getAddr(){
				this.isNoAddr = false;
				let arr = [getAddr(this.getUser.id), this.$store.dispatch('getCheckGoods')];
				let data = await Promise.all(arr);
				this.addrList = data[0];
				this.goodsList = data[1];
				if(this.getUser.addr_id){
					this.addr = await getOneAddr(this.getUser.addr_id);
				}else {
					if(this.addrList.length !== 0){
						this.addr = this.addrList[this.addrList.length-1];
					}else {
						this.isNoAddr = true;
					}
				}
				this.totalPrice = this.goodsList.reduce((total, v) => {
					return total + v.price*v.count;
				}, 0);
				this.strPrice = this.totalPrice.toFixed(2).toString();
			},
			updateAddr(){
				if(this.isNoAddr){
					uni.navigateTo({
						url:'/pages/user/address/editAddress'
					})
				}else {
					this.isShow = true;
				}
				
			},
			inputMsg(e){
				this.msg = e.detail.value;
			},
			async addOrder(){
				if(!this.addr){
					uni.showToast({
						title: '未选择地址',
						icon: 'none'
					});
					return;
				}
				let arr = [];
				let ids = this.goodsList.map(v => {
					let order = {
						seller_id: v.seller_id,
						user_id: this.getUser.id,
						goods_id: v.goods_id,
						addr_id: this.addr.id,
						spec_id: v.spec_id,
						message: this.msg,
						total_num: v.count,
						total_price: this.totalPrice,
						orderNo: this.createOrderNo()
					}
					arr.push(addOrder(order));
					return v.id;
				});
				let data = await Promise.all(arr);
				let isSuccess = true;
				data.map(v => {
					if(v.status){
						isSuccess = false;
					}
				})
				let _this = this;
				if(isSuccess){
					_this.$store.dispatch('delCart', ids);
					uni.navigateBack({
						success(){
							uni.showToast({
								title: "提交订单成功",
								icon: "none"
							});
						}
					});
				}
			},
			createOrderNo(){
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth()+1;
				let day = date.getDay();
				let hours = date.getHours();
				let minute = date.getMinutes();
				let seconds = date.getSeconds();
				let random = Math.random().toString().split('.');
				return "E"+year+month+day+hours+minute+seconds+random[1].substring(0, 10);
			},
			changeCheck(index){
				this.addr = this.addrList[index];
			},
			editAddr(id){
				uni.navigateTo({
					url: `/pages/user/address/editAddress?${id ?'id='+id :''}`
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
		.total {
			padding-right: 24rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: right;
			color: #323233;
			font-size: 28rpx;
			.count {
				padding-right: 16rpx;
			}
			.price {
				color: #f44;
				.num {
					font-size: 32rpx;
				}
			}
		}
	}
	.message {
		display: flex;
		justify-content: space-between;
		padding: 24rpx 30rpx;
		margin: 24rpx 0 100rpx 0;
		border-radius: 16rpx;
		background-color: #fff;
		.title {
			height: 48rpx;
			line-height: 48rpx;
			margin-right: 30rpx;
			color: #646566;
			font-size: 28rpx;
		}
		.msg {
			flex: 1;
			height: 48rpx;
			line-height: 48rpx;
			text-align: right;
			color: #323233;
			font-size: 24rpx;
		}
	}
	.add-order {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: space-between;
		padding: 0 32rpx;
		height: 100rpx;
		z-index: 999;
		align-items: center;
		background-color: #fff;
		.price-shell {
			color: #323233;
			font-size: 28rpx;
			.price {
				font-size: 24rpx;
				color: #f44;
				.num {
					font-size: 40rpx;
				}
			}
		}
		.btn-shell {
			flex: 1;
			display: flex;
			flex-direction: row-reverse;
			.submit {
				width: 220rpx;
				height: 80rpx;
				margin: 0;
				line-height: 80rpx;
				text-align: center;
				color: #fff;
				font-size: 28rpx;
				font-weight: 500;
				border-radius: 999rpx;
				background-color: #f44;
			}
		}
	}
	.addr-list-shell {
		.addr-list {
			.show-title {
				position: relative;
				
				padding: 24rpx;
				text-align: center;
				color: #333;
				font-size: 32rpx;
				background-color: #fff;
				
				.cancel {
					position: absolute;
					top: 24rpx;
					right: 24rpx;
					width: 44rpx;
					height: 44rpx;
					background-image: url(/static/images/showcase/cancel.png);
					background-size: cover;
				}
			}
			.addr-content {
				height: 640rpx;
				padding-top: 24rpx;
				.addr {
					display: flex;
					justify-content: space-between;
					padding: 24rpx;
					margin: 0 24rpx 24rpx 24rpx;
					align-items: center;
					border-radius: 16rpx;
					background-color: #fff;
					.shell {
						display: flex;
						.check {
							margin: auto;
						}
						.info {
							margin-left: 24rpx;
							color: #323233;
							.user {
								font-size: 32rpx;
								margin-bottom: 16rpx;
							}
							.area {
								font-size: 26rpx;
							}
						}
					}
					.edit-shell {
						width: 40rpx;
						height: 40rpx;
						margin-right: 30rpx;
						.edit-img {
							width: 100%;
							height: auto;
						}
					}
				}
			}
			.btn-shell {
				position: fixed;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 10rpx 32rpx;
				align-items: center;
				.add-btn {
					height: 80rpx;
					line-height: 80rpx;
					color: #fff;
					font-size: 28rpx;
					border-radius: 999rpx;
					background-color: #f44;
				}
			}
		}
	}
}
</style>
