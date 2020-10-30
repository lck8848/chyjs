<template>
	<view class="list_box">
		<!-- 菜单左边 -->
		<view class="left">
			<scroll-view id="left_scroll-el" scroll-y="true" :scroll-into-view="leftScrollInto" :style="{ height: scrollHeight }">
				<view class="item" :id="'left-' + index" v-for="(item, index) in leftArray" :key="index" :class="{ active: index == leftIndex }"
				 :data-index="index" @tap="leftTap">
					{{ item.alias_name }}
				</view>
			</scroll-view>
		</view>
		<view class="main">
			<scroll-view scroll-y="true" :style="{ height: scrollHeight }" @scroll="mainScroll" :scroll-into-view="scrollInto"
			 scroll-with-animation="true" @touchstart="mainTouch" id="scroll-el">
				<block v-for="(item, index) in mainArray" :key="index">
					<navigator url=""></navigator>
					<view class="item" :id="'item-' + index">
						<view class="class-name">{{ item.alias_name }}</view>
						<view class="g-container">
							
							<view class="g-box"  v-for="(g, i) in item.goods" :key="i">
									<navigator :url="'/packageTother/pages/goods/detail?id='+g.id" open-type="navigate" hover-class="none">
										<image :src="g.show ? g.image_url : loadingIcon" class="left_img"></image>
									</navigator>
									<navigator :url="'/packageTother/pages/goods/detail?id='+g.id" open-type="navigate" hover-class="none">
										<view class="right-content">
											<view class="g-title">{{ g.title }}</view>
											<view class="g-mask">{{ g.sell_point }}</view>
											<view class="g-price">
												<view class="left-price">
													<text class="price-tag">¥</text>
													<text class="price-sale-price">{{ g.price }}</text>
												</view>
												<image src="/static/images/allGoods/btn-shopcart.png" class="btn_img"></image>
											</view>
										</view>
									</navigator>
							</view>
						</view>
					</view>
				</block>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import {
		getClassify,
		getClassifyGoods,
		getClassifyGoodsByAll
	} from '@/api/index.js';
	export default {
		data() {
			return {
				scrollHeight: '500px',
				leftArray: [],
				mainArray: [],
				topArr: [],
				left_topArr: [],
				leftIndex: 0,
				isMainScroll: true,
				scrollInto: '',
				leftScrollInto: '',
				tipsTop: '0px',
				left_tipsTop: '0px',
				is_click: false,
				loadingIcon: '',
				showtotop: false,
				scrollTop: 0
			};
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					/* 设置当前滚动容器的高，若非窗口的告诉，请自行修改 */
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});
		},
		computed: {},
		mounted() {
			this.getListData();
		},

		methods: {
			/* 获取列表数据 */
			async getListData() {
				let classify = await getClassify();
				
				let aliasCodes = [];
				this.leftArray = classify.data;

				this.leftArray.map(v => {
					aliasCodes.push(v.alias_code);
				});
				
				
				let total_num_res = getClassifyGoods('1051');
				let classifys = getClassifyGoodsByAll(aliasCodes);
				let listData = await Promise.all([total_num_res,classifys])
				
				
				this.leftArray.map((v, k) => {
					v.goods = listData[1].data[k];
				});
				this.leftArray[0].goods = listData[0].data;

				this.mainArray = this.leftArray;
				this.$nextTick(() => {
					this.getElementTop();
				});
			},
			//获取距离顶部的高度
			getScrollTop(selector) {
				return new Promise((resolve, reject) => {
					let query = uni.createSelectorQuery().in(this);
					query
						.select(selector + '')
						.boundingClientRect(data => {
							resolve(data.top);
						})
						.exec();
				});
			},
			/* 获取元素顶部信息 */
			async getElementTop() {
				/* Promise 对象数组 */
				let p_arr = [];
				let l_arr = [];

				/* 遍历数据，创建相应的 Promise 数组数据 */
				for (let i = 0; i < this.mainArray.length; i++) {
					const resu = await this.getScrollTop(`#item-${i}`);
					const left_resu = await this.getScrollTop(`#left-${i}`);
					p_arr.push(resu);
					l_arr.push(left_resu);
				}

				/* 主区域滚动容器的顶部距离 */
				this.getScrollTop('#scroll-el').then(res => {
					let top = res;
					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(p_arr).then(data => {
						this.tipsTop = `${data}px`;
						this.topArr = data;
					});
				});
				this.getScrollTop('#left_scroll-el').then(res => {
					let top = res;
					// #ifdef H5
					top += 43; //因固定提示块的需求，H5的默认标题栏是44px
					// #endif

					/* 所有节点信息返回后调用该方法 */
					Promise.all(l_arr).then(data => {
						this.left_tipsTop = `${data}px`;
						this.left_topArr = data;
					});
				});
			},

			/* 主区域滚动监听 */
			mainScroll(e) {
				if (!this.isMainScroll) {
					return;
				}
				let top = e.detail.scrollTop;
				let index = -1;
				if (top >= this.topArr[this.topArr.length - 1]) {
					index = this.topArr.length - 1;
				} else {
					index = this.topArr.findIndex((item, index) => {
						if (this.topArr[index + 1] - 8848 <= top) {
							for (let i = index - 2; i <= index + 2; i++) {
								if (i >= 0 && i <= this.mainArray.length - 1) {
									this.mainArray[i].goods.map(v => {
										v.show = true;
									});
								}
							}
						}
						return this.topArr[index + 1] >= top;
					});
				}
				if (this.is_click) {
					index++;
					this.is_click = false;
				}
				this.leftIndex = index < 0 ? 0 : index;
				this.leftScrollInto = `left-${index}`;
			},
			/* 主区域触摸 */
			mainTouch() {
				this.isMainScroll = true;
			},
			/* 左侧导航点击 */
			leftTap(e) {
				this.is_click = true;
				let index = e.currentTarget.dataset.index;
				this.isMainScroll = true;
				this.leftIndex = Number(index);
				this.scrollInto = `item-${index}`;
				if (index % 14 > 0) {
					if (this.leftIndex > 6) {
						this.leftScrollInto = `left_${this.leftIndex - 2}`;
					} else {
						this.leftScrollInto = `left_0`;
					}
				} else {
					this.leftScrollInto = `left_${this.leftIndex}`;
				}
			},

		}
	}

</script>

<style lang="scss" scoped>
	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;
		font-family: Times, TimesNR, 'New Century Schoolbook', Georgia, 'New York', serif;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 26rpx;

			.item {
				padding-left: 25rpx;
				position: relative;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					font-size: 30rpx;
					color: red;
					font-weight: 600;
					background-color: #fff;
					border-left: 4rpx solid red;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;

			.tips {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				height: 64rpx;
				position: fixed;
				top: 44px;
				right: 0;
				width: 530rpx;
				z-index: 10;
				background-color: #fff;
				padding-left: 10rpx;
			}

			.item {
				margin-bottom: 20rpx;

				.class-name {
					color: #666;
					margin-bottom: 22rpx;
					font-size: 12px;
					line-height: 30px;
				}

				.g-container {
					.g-box {
						display: flex;
						margin-bottom: 40rpx;
						
						.left_img {
							width: 176rpx;
							height: 176rpx;
							image{
								width: 100%;
								height: 100%;
							}
						}

						.right-content {
							width: 290rpx;
							margin-left: 20rpx;

							.g-title {
								margin-bottom: 4px;
								height: 100rpx;
								color: #323233;
								line-height: 20px;
								font-weight: bold;
								max-height: 40px;
								font-size: 14px;
								display: -webkit-box;
								/*设置为弹性盒子*/
								-webkit-line-clamp: 2;
								/*最多显示5行*/
								overflow: hidden;
								/*超出隐藏*/
								text-overflow: ellipsis;
								/*超出显示为省略号*/
								-webkit-box-orient: vertical;
								word-break: break-all;
								/*强制英文单词自动换行*/
							}

							.g-mask {
								height: 30rpx;
								margin: 10rpx 0;
								color: #969799;
								line-height: 16px;
								font-size: 12px;
								display: -webkit-box;
								/*设置为弹性盒子*/
								-webkit-line-clamp: 1;
								/*最多显示5行*/
								overflow: hidden;
								/*超出隐藏*/
								text-overflow: ellipsis;
								/*超出显示为省略号*/
								-webkit-box-orient: vertical;
								word-break: break-all;
								/*强制英文单词自动换行*/
							}

							.g-price {
								position: relative;
								display: flex;
								justify-content: space-between;

								.left-price {
									font-weight: 800;
									color: rgb(255, 68, 68);

									.price-tag {
										align-self: center;
										height: 14px;
										margin-right: 2px;
										font-size: 12px;
									}
								}

								.btn_img {
									position: absolute;
									width: 44rpx;
									height: 44rpx;
									right: -26rpx;
								}
							}
						}
					}
				}
			}
		}

		// 回到顶部
		.top-button {
			width: 70upx;
			height: 70upx;
			// 固定定位
			position: fixed;
			right: 50rpx;
			bottom: 60rpx;
			z-index: 900;

			.topimg {
				width: 100rpx;
				height: 100rpx;
				background-color: #FFFFF0;
				border-radius: 50rpx;
			}
		}

		// 回到顶部到这
	}
</style>
