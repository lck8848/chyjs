<template>
	<view class="classify-container">
		<!-- 顶部图片 -->
		<view class="head-img">
			<view class="item" v-if="head_img == 'gift' ? true : false">
				<image class="image" src="@/static/images/index/classify/gift.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'fruits' ? true : false">
				<image class="image" src="@/static/images/index/classify/fruits.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'snacks' ? true : false">
				<image class="image" src="@/static/images/index/classify/snacks.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'tea' ? true : false">
				<image class="image" src="@/static/images/index/classify/tea.webp" mode=""></image>
			</view>
			<view class="item" v-if="head_img == 'liquor' ? true : false">
				<image class="image" src="@/static/images/index/classify/liquor.webp" mode=""></image>
			</view>
		</view>
		<!-- 顶部图片 -->
	</view>
</template>

<script>
	export default {
		data(){
			return {
				head_img:"",
			}
		},
		onLoad(options) {
			this.head_img = options.genre 
		}
	}
	
</script>

<style lang="scss" scoped>
	.classify-container{
		.head-img{
			width: 750rpx;
			height: 180rpx;
			.item{
				width: 100%;
				height: 100%;
				.image{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
