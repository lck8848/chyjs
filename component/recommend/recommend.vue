<template>
	<view class="reommend_container">
		<view class="outside">
			<view class="inside" v-for="item in recommendData" :key="item.id">
				<!-- 根据商品id跳转到不同商品详情页面 -->
				<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate" hover-class="none">
				<image :src="item.image_url" class="small_item" ></image>
				<text class="title">{{item.title}}</text>
				<view class="money">
					<view class="rmb">
						<text class="small">￥</text>
						<text class="need">{{item.price}}</text>
					</view>
					<text class="hot">大家都在买</text>
				</view>
				</navigator>
			</view>
			
			
		</view>

	</view>
</template>

<script>
	import {getRecommend} from"../../api/index.js";
	export default{
		data(){
			return{
				recommendData:[]
			}
		},
		methods:{
			async getRecommendData(){
				// 解构赋值拿到数据
				var {data} = await getRecommend();
				// 把数据传给数组，进行渲染
				this.recommendData = data;
			}
		},
		created(){
			this.getRecommendData();
		}
	}
</script>

<style lang="scss">
	.reommend_container {
		// 给顶部点空间，不会被tabbar遮到
		margin-bottom:200rpx;
		// width:750rpx;
		.outside {
			display: flex;
			flex-wrap:wrap;
			justify-content: space-around;
			align-items: center;
			width: 745rpx;

			.inside {
				display: flex;
				flex-direction: column;
				
				justify-content: space-around;
				width: 48%;
				height: 550rpx;
				background-color: white;
				border-radius: 10rpx;

				.small_item {
					width: 100%;
					height: 350rpx;
					border-radius: 10rpx;
				}

				.title {
					padding: 5rpx;
					margin-top: -14rpx;
					font-size: 29rpx;
					// 两行以后使用省略号
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.money {
					display: flex;
					justify-content: space-around;

					// 人民币
					.rmb {
						display: flex;
						align-items: center;

						.small {
							color: red;
							font-size: 24rpx;
						}

						.need {
							color: red;
							font-size: 36rpx;
						}
					}

					.hot {
						margin-bottom: 6rpx;
						color: red;
						font-size: 24rpx;
					}
				}
			}
		}

	}
</style>
