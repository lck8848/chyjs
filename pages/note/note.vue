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
			<view class="top">
				<text class="date">9月14日</text>
				<text class="title">试吃了一个月，差点被开除，终于找到了内心满分的螺蛳粉！</text>
				<text class="host">#掌柜说#</text>
			</view>
			<view class="img_grid">
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
			</view>
			<view class="goods_details">
				<image src="../../static/images/note/luosifen-.jpg" mode=""></image>
				<view class="info">
					<view class="title">
						<text class="title_space"></text>
						[嘻螺会麻辣味袋装螺蛳粉]麻辣鲜香Q弹爽滑 300g/袋
					</view>
					<view class="info_price">￥56.80</view>
				</view>
				<i class="iconfont">&#xe634;</i>
			</view>
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
		// 头部导航
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
				// 名字
				.title {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					margin-left:20rpx;
					// 3年有赞
					.img {
						width: 120rpx;
						height: 30rpx;
					}
					text{
						color:#4E4E4E;
						font-weight: bold;
					}
				}
				// 吃货研究所logo
				.left {
					image {
						width:100rpx;
						height: 100rpx;
					}
				}
			}
			// 逛一逛标签
			.uni-tag{
				width:80rpx;
				height:50rpx;
				line-height: 50rpx;
				margin-right:40rpx;
			}
		}
		// 头部导航到这
		
		// 笔记宫格
		.note_grid{
			// width:710rpx;
			// height:1000rpx;。
			background-color: white;
			padding-bottom: 10rpx;
			.top{
				display: flex;
				flex-direction: column;
				// 上右下左
				padding: 0rpx 40rpx;
				padding-top:20rpx;
				// padding: 0 40rpx 0 40rpx;
				// padding-left: 40rpx;
				// padding-right: 40rpx;
				.date{
					font-size:24rpx;
					color: #929799;
					padding-bottom: 20rpx;
				}
				.title{
					font-size:32rpx;
					font-weight: bold;
					color:#363636;
				}
				.host{
					padding-top: 20rpx;
					font-size:30rpx;
					color:red;
				}
			}
			.img_grid{
				display: flex;
				flex-wrap: wrap;
				// margin: 10rpx 20rpx 10rpx 20rpx;
				margin-left: 40rpx;
				image{
					width:200rpx;
					height:200rpx;
					// 上 右 下 左
					margin: 10rpx 10rpx 10rpx 10rpx;
				}
				
			}
			.goods_details{
				display: flex;
				margin: 30rpx 45rpx 30rpx 30rpx;
				align-items: center;
				width:650rpx;
				height:150rpx;
				background-color: #F9F9F9;
				padding:0px 20rpx 0px 20rpx;
				image{
					margin-left: 10rpx;
					width:110rpx;
					height:110rpx;
				}
					.info{
						
						display: flex;
						flex-direction: column;
						flex-wrap: wrap;
						justify-content: space-between;
						
						.title{
							margin-left: 20rpx;
							font-size:24rpx;
							color:#323232;
							.title_space{
								padding-left: 14rpx;
							}
						}
						.info_price{
							margin-left: 20rpx;
							margin-top: 20rpx;
							font-size:24rpx;
						}
					}
				
			}
			
		}
		// 笔记宫格到这
	}
</style>
