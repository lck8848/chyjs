<template>
	<view class="note_container">
		<!-- 种草笔记 -->
		<view class="top">
			<text class="note">种草笔记</text>
			<text class="more" @click="toMore">查看更多></text>
		</view>
		<view>
			<scroll-view class="scroll-view" :scroll-x="true" @scroll="scroll"  :show-scrollbar="true" scroll-left="300px">
				<view id="demo1" class="item">
					<image src="../../static/note/luosifen-.jpg" class="luosifen"></image>
					<view class="desc">
						<text>试吃了1个月、差点被开除，终于找到了内心满分的螺蛳粉！</text>
						
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/dongzao.jpg" class="dongzao"></image>
					<view class="desc">
	
						新疆，还有什么水果是你不行的？连枣都能甜哭我！
	
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/niurougan.jpg" class="niurougan"></image>
					<view class="desc">
	
						什么样的牛肉干好吃？内蒙古的朋友有话说
	
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/jianguo.jpg" class="milk"></image>
					<view class="desc">
	
						我找到了植物奶咖啡的平替（不是）
	
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/banfen.jpg" class="banfen"></image>
					<view class="desc">
	
						吹爆南昌拌粉！一周有5天都想嗦它嗦它嗦它
	
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/guoba.jpg" class="guoba"></image>
					<view class="desc">
	
						好吃的锅巴，会发出海鲜味的咔嚓咔嚓声
	
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/fengzhua.jpg" class="jizhua"></image>
					<view class="desc">
	
						请把柠檬和鸡爪这对cp给我锁死死！
	
					</view>
				</view>
				<view id="demo1" class="item">
					<image src="../../static/note/mifen.jpeg" class="mifen"></image>
					<view class="desc">
	
						湖南人的乡愁，从一碗常德米粉开始
	
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				 scrollTop: 0,
				old:{
					scrollTop: 0
				}
				        
			}
		},
		methods: {
				scroll: function(e) {
				            console.log(e)
				            this.old.scrollTop = e.detail.scrollTop
				        },
		}
	}
</script>

<style lang="scss" scoped>
	.note_container{
		background-color: #F9F9F9;
		.top{
			display: flex;
			justify-content: space-between;
			.note{
				font-size: 28rpx;
				color:#323233;
			}
			.more{
				font-size:24rpx;
				color:#c7c7d1;
			}
		}
		.scroll-view{
			white-space:nowrap;
			height: 450rpx;
			width: 3000rpx;
			border:1px solid #E5E5E5;
			// overflow: hidden;
			.item{
				// 这个属性可以使图片跟文字盒子上下排行
				display:inline-block;
				margin-right:20rpx;
				background-color: white;
				border:1px solid #E5E5E5;
				width: 200rpx;
				height: 370rpx;
				image{
					width: 300rpx;
					height: 300rpx;
				}
				.desc{
					width:100%;
					height:109rpx;
					margin-top: 0;
					// overflow: hidden;
					// font-size:32rpx;
					// font-weight: bold;
					// color:#333333;
					// background-color: white;
					// 只显示两行，多余的使用省略号
					white-space: normal;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					
				}
				
			}
		}
	}
</style>
