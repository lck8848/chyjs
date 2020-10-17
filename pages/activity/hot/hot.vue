<template>
	<view class="hot-container">
		<!-- 标题 -->
		<view class="hot">
			<image src="@/static/image/activity/hot.webp" mode=""></image>
		</view>
		<!-- 列表 -->
		<view class="hot-goods">
			<view class="item">
				<view class="img">
					<image src="https://img.yzcdn.cn/upload_files/2020/02/19/FttG9zmgRhlYVCujwsQJsOXZpn4p.jpg!middle.webp" mode=""></image>
				</view>
				<view class="text">
					<view class="title">
						［烤兔］整只手撕 大口吃肉 500g/袋
					</view>
					<view class="vip">
						9折会员价：62.91元。
					</view>
					<view class="">
						<view class="price">
							 ￥69.6
						</view>
						<view class="img">
							<image src="@/static/icon/cart-circle-o.png" mode=""></image>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
		<view class="ka">
			<image src="@/static/image/activity/ka.webp" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.hot-container {
		.hot{
			width: 100%;
			height: 200rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ka{
			width: 100%;
			height: 400rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	
		.hot-goods{
			.item{
				width: 47%;
				height: 600rpx;
			}
		}	
	}
</style>
