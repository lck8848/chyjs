<template>
	<view class="container">
		<!-- 搜索框 -->
		<view class="search-container" @click="Tosearch">
			<search  ref="search"></search>
		</view>
		<!-- 搜索框 -->
		
		<!-- 轮播图 -->
		<view class="swiper-container">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="5000" :duration="500"
			 indicator-active-color="#FF4444" :circular="true">
				<swiper-item>
					<view class="swiper-item">
						<image src="@/static/image/swiper/swiper1.webp" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="@/static/image/swiper/swiper2.webp" mode=""></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="@/static/image/swiper/swiper3.webp" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 轮播图 -->
		
		
	</view>
</template>

<script>
	import search from "../../components/search/search"
	export default {
		components:{
			search
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			Tosearch(){
				this.$refs.search.search()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		
		.swiper-container{
			width: 100%;
			height: 370rpx;
			.swiper{
				width: 100%;
				height: 100%;
				.swiper-item{
					width: 100%;
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
			
		}
	}
</style>
