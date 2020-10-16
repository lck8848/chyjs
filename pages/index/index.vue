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
				</swiper-item>s
			</swiper>
		</view>
		<!-- 轮播图 -->
		
		<!-- 六宫格 -->
		
		<view class="grid-container">
			<view class="grid">
				<view class="item" @click="Tosend">
					<image src="@/static/images/index/grid1.jpg" mode=""></image>
				</view>
				<view class="item" @click="Tofruit">
					<image src="@/static/images/index/grid2.jpg" mode=""></image>
				</view>
				<view class="item" @click="Tosnack">
					<image src="@/static/images/index/grid3.jpg" mode=""></image>
				</view>
				<view class="item" @click="Totea">
					<image src="@/static/images/index/grid4.jpg" mode=""></image>
				</view>
				<view class="item" @click="Towine">
					<image src="@/static/images/index/grid5.jpg" mode=""></image>
				</view>
				<view class="item" @click="Toall">
					<image src="@/static/images/index/grid6.jpg" mode=""></image>
				</view>
			</view>
		</view>
		
		<!-- 六宫格  -->
	</view>
</template>

<script>
	import search from "../../component/search/search"
	export default {
		components:{
			search,
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			Tosearch(){
				this.$refs.search.search()
			},
			Tosend(){
				console.log("send")
			},
			Tofruit(){
				console.log("fruit")
			},
			Tosnack(){
				console.log("snack")
			},
			Totea(){
				console.log("tea")
			},
			Towine(){
				console.log("wine")
			},
			Toall(){
				console.log("all")
			},
			
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
		
		.grid-container{
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: rgb(247, 246, 244);
			padding: 20rpx;
			.grid{
				width: 700rpx;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.item{
					width: 200rpx;
					height: 200rpx;
					image{
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
</style>
