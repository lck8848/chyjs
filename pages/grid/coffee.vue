<template>
	<view class="coffee_container">
		<view class="sendGift">
			<image src="../../static/images/index/coffee.webp" class="img" @click="toClassifyGoods"></image>
			<view class="outside">
				<view class="inside" v-for="item in teaData" :key="item.id">
					<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
					<image :src="item.image_url" class="small_item"></image>
					<text>{{item.title}}</text>
					<view class="money">
						<text>￥{{item.price}}</text>
						<image src="../../static/icon/cart-circle-o.png" class="cart"></image>
					</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getClassifyGoods} from "@/api/index.js"
	export default {
		name: 'coffee',
		data() {
			return {
				teaData:[]
			}
		},
		methods: {
			async getTeaData(){
				var {data} = await getClassifyGoods(1033);
				// 筛选数据
				data = data.slice(0,9);
				this.teaData = data;
			},
			// 点击咖啡茶饮跳转到相应页面
			toClassifyGoods(){
				uni.navigateTo({
					url:"/pages/index/classify?genre=tea"
				})
			}
		},
		created(){
			this.getTeaData();
		}
	}
</script>

<style lang="scss">
	.coffee_container {
		.sendGift {
			margin-top: 280rpx;
			.img {
				width: 100%;
				height: 180rpx;

			}

			width:750rpx;

			// height:1000rpx;
			.outside {
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				height: 800rpx;
				border: 1px solid #F9F9F9;

				.inside {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					width: 30%;
					height: 350rpx;
					margin-bottom: 10rpx;
					background-color: white;

					text {
						// padding:8rpx;
						font-size: 26rpx;
						font-weight: bold;

						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}

					.small_item {
						width: 100%;
						height: 180rpx;
					}

					.money {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 14rpx;
						margin-left: -5rpx;
						font-size: 32rpx;
						color: #FF4444;

						.cart {
							width: 35rpx;
							height: 35rpx;
						}
					}
				}
			}
		}
	}
</style>
