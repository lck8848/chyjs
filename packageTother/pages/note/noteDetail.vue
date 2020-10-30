<template>
	<view class="note_container">
		<!-- 笔记内容 -->
		<view class="note_details">
			<view class="title">
				{{NoteDetail.title}}
			</view>
			<view class="date">
				9月14日
			</view>
			<!-- 因为是富文本，需要v-html来解析富文本 -->
			<view class="content" v-html="NoteDetail.content">

			</view>
			<view class="official_Accounts">
				可以关注我们的公众号“吃货研究所（Food_Lab）”，了解更多关于美食的知识和分享噢~
			</view>
			<view class="buttom">
				<image src="../../static/images/note/noteDetail/Fr6XQKSR3YvkrxSDL96nqrig3032.jpg" mode=""></image>
				<text>吃货研究所店铺</text>
				<view class="tags">
					<!-- 点击更多笔记标签，进入查看更多笔记 -->
					<view class="tag_first" @click="toNote">更多笔记</view>
					<!-- 点击进店标签，进入首页 -->
					<view class="tag_second" @click="toIndex">进店</view>
				</view>
			</view>
			<!-- 文中商品按钮 -->
			<!-- <button type="danger" @click="typeClick" class="clickGoods">文中商品(3)</button> -->
		</view>



		<!-- 弹出层 -->
		<tui-bottom-popup :show="typeShow" @close="hidePopup" height="1000">
			<!-- 文中商品 -->
			<view class="top">
				<text>文中商品</text>
				<!-- 关闭x -->
				<!-- 给图标加点击事件，点击后隐藏弹出层 -->
				<image src="../../static/images/cart/error.png" class="close" @click="close"></image>
			</view>
			<!-- 图片详情页 -->
			<view class="details">
				<!-- <image src="../../static/images/note/dongzao.jpg" class="img"></image> -->
				<image src="../../static/images/index/crab.webp" class="img" c></image>
				<view class="info">
					<view class="title">
						[嘻螺会麻辣味袋装螺蛳粉] 麻辣鲜香 Q弹爽滑 300g/袋
					</view>
					<view class="buy">
						<!-- 价格 -->
						<view class="price">
							<text>￥</text>
							<text class="big">56.80</text>
						</view>
						<!-- button去购买 -->
						<button type="danger">去购买</button>
					</view>
				</view>
			</view>

			<!-- 图片详情页 -->
			<view class="details">
				<!-- <image src="../../static/images/note/dongzao.jpg" class="img"></image> -->
				<image src="../../static/images/index/crab.webp" class="img" c></image>
				<view class="info">
					<view class="title">
						[嘻螺会麻辣味袋装螺蛳粉] 麻辣鲜香 Q弹爽滑 300g/袋
					</view>
					<view class="buy">
						<!-- 价格 -->
						<view class="price">
							<text>￥</text>
							<text class="big">56.80</text>
						</view>
						<!-- button去购买 -->
						<button type="danger">去购买</button>
					</view>
				</view>
			</view>

			<!-- 图片详情页 -->
			<view class="details">
				<!-- <image src="../../static/images/note/dongzao.jpg" class="img"></image> -->
				<image src="../../static/images/index/crab.webp" class="img" c></image>
				<view class="info">
					<view class="title">
						[嘻螺会麻辣味袋装螺蛳粉] 麻辣鲜香 Q弹爽滑 300g/袋
					</view>
					<view class="buy">
						<!-- 价格 -->
						<view class="price">
							<text>￥</text>
							<text class="big">56.80</text>
						</view>
						<!-- button去购买 -->
						<button type="danger">去购买</button>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	import {
		getNoteDetail
	} from "@/api/index.js";
	export default {
		data() {
			return {
				typeShow: false,
				NoteDetail: [],
			}
		},
		methods: {
			// 点击更多笔记标签，跳转到更多笔记内容
			toNote() {
				uni.navigateTo({
					url: "/pages/note/note"
				})
			},
			// 点击进店标签，跳转到首页
			toIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 点击文中商品，跳出弹出层
			typeClick() {
				this.typeShow = true;
			},
			// 点击关闭图标，关闭弹出层
			close() {
				this.typeShow = false;
			},
			// 渲染笔记内容列表
			async getNoteData(n_id) {
				var {
					data
				} = await getNoteDetail(n_id);
				console.log(data)
				this.NoteDetail = data;
				// 因为富文本里存在!important，所以样式是改不了的，需要把!important替换成空的。（兼容小程序的方法）
				this.NoteDetail.content = this.NoteDetail.content.replace(/!important;/g, '')
				// this.NoteDetail.content = this.NoteDetail.content.replace(/img/g,'img style="width:100%"')
			}
		},
		onLoad(options) {
			this.getNoteData(options.n_id);
			console.log(options)
		}
	}
</script>

<style lang="scss">
	.note_container {
		padding-top: 40rpx;
		background-color: white;
		// height:4300rpx;

		// 笔记内容
		.note_details {
			// height: 3000rpx;
			padding: 0 20rpx;
			background-color: white;

			// 标题
			.title {
				font-size: 40rpx;
			}

			//富文本
			// /deep/深度解析
			.content {
				/deep/ img {
					width: 100%;
				}

				/deep/ .js-richtext-lazy-img {
					width: 100%;
				}

			}

			// 时间
			.date {
				margin: 30rpx 0;
				font-size: 24rpx;
				color: #999999;
			}

			// .内容
			.details {
				font-size: 32rpx;
				color: #585959;
			}

			// 公众号
			.official_Accounts {
				margin-top: 80rpx;
				font-size: 28rpx;
			}

			// 底部
			.buttom {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				margin-top: 60rpx;
				margin-bottom: 80rpx;

				// logo
				image {

					width: 100rpx;
					height: 100rpx;
				}

				// 店铺名
				text {
					margin: 20rpx 0;
					font-size: 28rpx;
				}

				// 标签
				.tags {
					display: flex;
					align-items: center;
					margin-bottom: 100rpx;

					.tag_first {
						width: 140rpx;
						height: 48rpx;
						line-height: 48rpx;
						 margin-right: -10rpx;
						text-align: center;
						font-size: 26rpx;
						border: 1px solid #FF7373;
						border-radius: 50rpx;
						color: #FF4444;
					}

					.tag_second {
						width: 100rpx;
						height: 48rpx;
						line-height: 48rpx;
						text-align: center;
						font-size: 26rpx;
						border: 1px solid #FF7373;
						border-radius: 50rpx;
						color: #FF4444;
						margin-left: 50rpx;
					}
				}
			}

			// 文中商品按钮
			.clickGoods {
				width: 220rpx;
				height: 80rpx;
				margin-top:200rpx;
				margin-right: 25rpx;
				font-size: 28rpx;
				color: white;
				border-radius: 50rpx;
				background-color: red;
			}
		}

		// 弹出层
		.tui-bottom-popup {
			// backgroundColor: #F7F8FA;
			background: red;
			height: 1000px;

			// top
			.top {
				position: relative;
				height: 100rpx;
				margin-bottom: 40rpx;
				margin-left:100rpx;
				line-height: 100rpx;
				text-align: center;
				background-color: white;
				// border-bottom: 1px solid black;
				/*下边阴影  黄色*/
				box-shadow: 0px 0px 40rpx 0px rgba(0, 0, 0, 0.1);
				;

				// 文中商品
				text {
					font-size: 32rpx;
				}

				// 关闭图标
				.close {
					position: absolute;
					top: 30rpx;
					right: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}
			}

			// 商品详情
			.details {
				display: flex;
				position: relative;
				// margin-top: 40rpx;
				height: 230rpx;
				margin: 20rpx 20rpx;
				border: 1px solid red;
				background-color: #FFFFFF;

				// 商品图片
				.img {
					width: 250rpx;
					height: 200rpx;
					border-radius: 10rpx;
					margin: 10rpx 3rpx 2rpx 12rpx;
				}

				// info
				.info {
					display: flex;
					justify-content: space-around;
					flex-direction: column;
					margin: 0 3rpx 0 5rpx;

					// 标题
					.title {
						margin: 0 0 28rpx;
						font-size: 28rpx;
						// 给标题第一行设空
						text-indent: 15rpx;

					}

					// 价格
					.buy {
						display: flex;
						justify-content: space-between;
						align-items: center;

						text {
							font-size: 24rpx;
							color: red;
						}

						.big {
							font-size: 32rpx;
						}
					}

					// 按钮
					button {
						width: 160rpx;
						height: 60rpx;
						line-height: 60rpx;
						margin-right: 20rpx;
						color: white;
						font-size: 28rpx;
						background-color: #FF4444;
						border-radius: 50rpx;
					}
				}
			}
		}
	}
</style>
