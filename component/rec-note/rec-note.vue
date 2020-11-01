<template>
	<view class="rec-note-container">
		<view class="top">
			<view class="note">种草笔记</view>
			<view class="more" @click="toMore">
				查看更多
				<image class="icon" src="http://47.106.36.197:7000/source/other/right2.png" mode="widthFix"></image>
			</view>
		</view>
		<view class="scroll-container">
			<scroll-view class="scroll-view" :scroll-x="true" :show-scrollbar="true">
				<!-- 根据id显示不同的商品笔记 -->
				<view id="demo1" class="item" v-for="item in notelist" :key="item.id" @click="toNOteDetail(item.id)">
					<view class="note_img">
						<image lazy-load="true" :src="item.img_url" class="img"></image>
					</view>
					<view class="desc">
						<text class="title">
							{{item.title}}
						</text>
					</view>
				</view>
		
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import { getHomeNoteList } from "@/api/index.js";
	export default {
		data() {
			return {
				notelist: []
			};
		},
		methods: {
			toMore() {
				uni.navigateTo({
					url: "/packageTother/pages/note/note",
					fail(err) {
						console.log(err);
					}
				})
			},
			toNOteDetail(id) {
				uni.navigateTo({
					url: `/packageTother/pages/note/noteDetail?n_id=${id}`
				})
			},
			async getnote() {
				var { data } = await getHomeNoteList()
				this.notelist = data;
			}
		},
		created() {
			this.getnote();
		}
	}
</script>

<style lang="scss">
.rec-note-container {
	.top {
		display: flex;
		justify-content: space-between;
		padding: 0 30rpx;
		.note {
			font-size: 32rpx;
			color: #323233;
		}
		.more {
			font-size: 24rpx;
			color: #969799;
			.icon {
				vertical-align: text-top;
				width: 24rpx;
				height: auto;
			}
		}
	}
	
	.scroll-container {
		.scroll-view {
			white-space: nowrap;
			padding: 30rpx 30rpx 0 0;
	
			.item {
				display: inline-block;
				background-color: white;
				width: 300rpx;
				margin-right: 20rpx;
				background-color: white;
				box-shadow: 0 6rpx 10rpx rgba(0, 0, 0, 0.1);
	
				.note_img {
					width: 100%;
					.img {
						width: 100%;
						height: 300rpx;
					}
				}
	
				.desc {
					padding: 20rpx;
					
					.title {
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						
						font-size: 32rpx;
						font-weight: bold;
						color: #333;
						white-space: normal;
					}
				}
				&:first-child {
					margin-left: 30rpx;
				}
				&:last-child {
					margin-right: 30rpx;
				}
			}
		}
	}
}
</style>
