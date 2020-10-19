<template>
	<view class="show-container" :style="'background-image: url('+bg_list[index]+');'">
		<view class="transaction-container">
			<view class="transaction-item">
				<image class="photo" :src="temp[current].img" mode="widthFix"></image>
				<text class="text">{{ temp[current].text }}</text>
			</view>
		</view>
		<view class="list">
			<view class="goods-shell" v-for="(item, g_index) in goodsList" :key="g_index">
				<view class="goods">
					<view class="rank" v-if="index === 0" :style="'top:'+(g_index>2 ?16 :0)+'rpx;background-position: 0 '+(g_index<=2 ?(g_index*-31)-2 :-64-27*(g_index-2))+'px;'"></view>
					<view class="image">
						<view class="img" :style="'background-image: url('+item.image_url+');'"></view>
					</view>
					<view class="content">
						<view class="title">
							{{ item.title }}
						</view>
						<view class="info">
							<view class="price">
								<text class="price-icon">￥</text>
								{{ item.price.toFixed(2) }}
							</view>
							<view class="buy">
								马上抢
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { getHotGoods } from '../../api/index.js';
	export default {
		data() {
			return {
				index: 0,
				current: 0,
				bg_list: ['http://47.106.36.197:7000/source/other/ranking_bg.png',
				'http://47.106.36.197:7000/source/other/recommend_bg.png',
				'http://47.106.36.197:7000/source/other/footmark_bg.png'],
				goodsList: [],
				temp: [
					{img: "https://img.yzcdn.cn/public_files/2019/09/18/95173169f85f61278cbdd75701770be7.png", text: "广东 深圳 年** 刚刚下单啦"},
					{img: "https://img.yzcdn.cn/public_files/2019/09/18/c3998a48d5f8744b744e3e369666e63b.png", text: "江苏 苏州 陈** 刚刚下单啦"},
					{img: "https://img.yzcdn.cn/public_files/2019/09/18/a72ce0a19a7fc19a1921e891f25ee59f.png", text: "北京 北京 S** 刚刚下单啦"},
					{img: "https://img.yzcdn.cn/public_files/2019/09/18/67e895423d5bdb9b59a6964dab8eb135.png", text: '广西 桂林 陆** 刚刚下单啦'},
					{img: "https://img.yzcdn.cn/public_files/2019/09/18/16cdb32d9829b387fe7a7ef0bb73024c.png", text: "上海 上海 黄** 刚刚下单啦"},
					{img: "https://img.yzcdn.cn/public_files/2019/09/18/02c643189e12d4aecb4f2a43d4c7e16e.png", text: "北京 北京 南** 刚刚下单啦"}
				]
			}
		},
		methods: {
			async getGoodsList(){
				let { status, data } = await getHotGoods(20);
				if(!status){
					this.goodsList = data;
				}
			},
			showBuyCase(){
				setInterval(() => {
					if(this.current === this.temp.length-1){
						this.current = 0;
					}else {
						this.current += 1;
					}
					
				}, 2000)
			}
		},
		onLoad: function (option) {
			this.index = option.index;
			this.getGoodsList();
			this.showBuyCase();
		}
	}
</script>

<style lang="scss" scoped>
@keyframes move
{
	from {
		opacity: 0;
		top: 40rpx;
	}
	50% {
		opacity: 1;
		top: 0;
	}
	to {
		opacity: 0;
		top: -40rpx;
	}
}
.show-container {
	background-size: 100% auto;
	background-repeat: no-repeat;
	min-height: 100vh;
	padding-top: 24%;
		
	.transaction-container {
		position: relative;
		left: 204rpx;
		padding-bottom: 40rpx;
		text-align: center;
		.transaction-item {
			position: absolute;
			left: 0;
			top: 40rpx;
			display: inline-block;
			padding: 0 16rpx;
			height: 40rpx;
			line-height: 40rpx;
			color: #fff;
			background-color: hsla(0,0%,100%,.12);
			border-radius: 20rpx;
			animation: move 2s infinite;
			.photo {
				width: 28rpx;
				margin-right: 8rpx;
				border-radius: 50%;
			}
			.text {
				color: #fff;
				font-size: 24rpx;
			}
		}
	}
	.list {
		padding-top: 180rpx;
		padding: 32rpx;
		.goods-shell {
			padding: 12rpx;
			.goods {
				display: flex;
				position: relative;
				border-radius: 8px;
				box-shadow: 0 2px 4px rgba(0,0,0,.06);
				background-color: #fff;
				.rank {
					position: absolute;
					left: 16rpx;
					width: 28px;
					height: 27px;
					line-height: 27px;
					background-image: url(http://47.106.36.197:7000/source/other/rank.png);
					background-size: 27px;
					background-repeat: no-repeat;
				}
				.image {
					padding: 24rpx;
					.img {
						width: 242rpx;
						height: 242rpx;
						background-size: cover;
					}
				}
				.content {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					margin: 24rpx 24rpx 24rpx 0;
					.title {
						color: #323233;
						font-size: 28rpx;
						font-weight: bold;
						
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
					.info {
						display: flex;
						justify-content: space-between;
						.price {
							color: #f44;
							font-size: 36rpx;
							font-weight: bold;
							.price-icon {
								margin-right: 4rpx;
								font-size: 24rpx;
							}
						}
						.buy {
							width: 108rpx;
							height: 48rpx;
							line-height: 48rpx;
							text-align: center;
							border-radius: 999rpx;
							font-size: 24rpx;
							color: #fff;
							background-color: #f44;
						}
					}
				}
			}
			
		}
	}
}
</style>
