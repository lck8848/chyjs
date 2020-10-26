<template>
	<view class="reommend_container">
		<view class="outside">
			<view class="inside" v-for="item in recommendData" :key="item.id">
				<navigator :url="'/pages/goods/detail?id='+item.id" open-type="navigate">
					<lazy-img :img-url="item.image_url" class="small_item" :scrollTop="scrollTop"></lazy-img>
					<view class="info">
						<text class="title">{{item.title}}</text>
						<view class="money">
							<text class="small">￥</text>
							<text class="need">{{item.price.toFixed(2)}}</text>
						</view>
					</view>
					
				</navigator>
			</view>
			
			
		</view>

	</view>
</template>

<script>
	import lazyImg from '../lazy-img/lazy-img.vue';
	import {getRecommend} from"../../api/index.js";
	export default{
		data(){
			return{
				recommendData:[],
				scrollTop: 0
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
		onPageScroll({scrollTop}) {
			this.scrollTop = scrollTop;
		},
		created(){
			this.getRecommendData();
		},
		components: {
			lazyImg
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
			flex-wrap: wrap;
			justify-content: space-between;
			padding: 0 32rpx;

			.inside {
				overflow: hidden;
				width: 47%;
				margin: 8rpx;
				background-color: #fff;
				border-radius: 16rpx;

				.small_item {
					width: 100%;
					height: auto;
					border-radius: 10rpx;
				}
				.info {
					padding: 0 24rpx 8rpx;
					.title {
						font-size: 26rpx;
						color: #323233;
						
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
					}
					
					.money {
						display: flex;
						height: 88rpx;
						line-height: 88rpx;
						color: #f44;
						.small {
							position: relative;
							top: 6rpx;
							margin-right: 4rpx;
							font-size: 24rpx;
						}
						.need {
							font-size: 36rpx;
						}
					}
				}
				
			}
		}

	}
</style>
