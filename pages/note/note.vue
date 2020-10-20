<template>
	<view class="note_container">
		<!-- 自定义头部导航 -->
		<view class="navigator">
			<view class="info">
				<!-- 点击logo跳转回首页 -->
				<view class="left" @click="toIndex">
					<image src="https://img.yzcdn.cn/upload_files/2018/08/22/Floa9HOof0MNNlCCx250fte7YEd7.png!small.webp"></image>
				</view>
				<view class="title">
					<text>吃货研究所店铺</text>
					<image src="../../static/images/note/tomore/3years.png" class="img"></image>
				</view>
			</view>
			<!-- 点击进店标签，进入首页 -->
				<uni-tag text="进店" @click="toIndex" type="error" :inverted="true" circle="true" ></uni-tag>
		</view>
		
		<!-- 笔记宫格 -->
		<view class="note_grid">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods:{
			// 跳转到首页
			toIndex(){
				uni.switchTab({
					url:"/pages/index/index",
					fail(err){
						console.log(err);
					}
				})
			}
		},
		components: {

		},
	}
</script>

<style lang="scss">
	.note_container {
		background-color: #e5e5e5;
		height:3000rpx;
		width: 750rpx;

		.navigator {
			display: flex;
			// flex-direction: column;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 120rpx;
			// padding:10rpx;
			padding-left:20rpx;
			background-color: white;
			.info{
				display: flex;
				
				.title {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left:20rpx;
					.img {
						width: 120rpx;
						height: 30rpx;
					}
					text{
						color:#4E4E4E;
						font-weight: bold;
					}
				}

				.left {
					image {
						width:100rpx;
						height: 100rpx;
					}
				}
			}
			.uni-tag{
				width:80rpx;
				height:50rpx;
				line-height: 50rpx;
				margin-right:40rpx;
			}
		}
	}
</style>
