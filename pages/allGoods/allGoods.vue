<template>
	<view>
		<view class="container">
			<scroll-view
				scroll-y
				:scroll-with-animation="isTap"
				scroll-anchoring
				class="w-21 fixed left-0 z-10 left-big"
				:scroll-into-view="scrollView_leftId"
				:style="{ height: '100%' }"
			>
				<view
					:id="`left_${index}`"
					v-for="(item, index) in tabbar"
					:key="index"
					style="height: 110rpx;"
					class="w-full flex items-center justify-center left-view"
					:class="[currentTab == index ? ['active', 'relative', 'font-black', 'bgc-select'] : '']"
					:data-current="index"
					@tap.stop="swichNav"
				>
					<text>{{ item }}</text>
				</view>
			</scroll-view>
			<scroll-view
				@scroll="scroll"
				scroll-anchoring
				scroll-y
				scroll-with-animation
				class="w-full fixed pl-24 left-0"
				:scroll-into-view="scrollView_rightId"
				:style="{ height: '100%' }"
			>
				<!--内容部分 start 自定义可删除-->
				<block v-for="(item, index) in tabbar" :key="index">
					<t-linkage :distanceTop="distanceTop" :recalc="1" :scrollTop="scrollTop" :index="index" @linkage="linkage">
						<view class="page-view" :id="`right_${index}`">
							<view class="class-name">{{ item }}</view>
							<view class="g-container">
								<view class="g-box" @tap.stop="productList">
									<image src="/static/image/allGoods/Fm5hF8RwVJz0OPCe5mv4jICVhiXP.jpg!middle.webp" class="left_img"></image>
									<view class="right-content">
										<view class="g-title">［琯溪蜜柚礼盒装］柔嫩饱满 果香四溢 三种蜜柚 2粒/4粒可选</view>
										<view class="g-mask">9折会员价：28.8元-64.8元。</view>
										<view class="g-price">
											<view class="left-price">
												<text class="price-tag">¥</text>
												<text class="price-sale-price">26</text>
											</view>
											<image src="/static/image/allGoods/btn-shopcart.png" class="btn_img"></image>
										</view>
									</view>
								</view>
								<view class="g-box" @tap.stop="productList">
									<image src="/static/image/allGoods/Fm5hF8RwVJz0OPCe5mv4jICVhiXP.jpg!middle.webp" class="left_img"></image>
									<view class="right-content">
										<view class="g-title">［琯溪蜜柚礼盒装］柔嫩饱满 果香四溢 三种蜜柚 2粒/4粒可选</view>
										<view class="g-mask">9折会员价：28.8元-64.8元。</view>
										<view class="g-price">
											<view class="left-price">
												<text class="price-tag">¥</text>
												<text class="price-sale-price">26</text>
											</view>
											<image src="/static/image/allGoods/btn-shopcart.png" class="btn_img"></image>
										</view>
									</view>
								</view>
								<view class="g-box" @tap.stop="productList">
									<image src="/static/image/allGoods/Fm5hF8RwVJz0OPCe5mv4jICVhiXP.jpg!middle.webp" class="left_img"></image>
									<view class="right-content">
										<view class="g-title">［琯溪蜜柚礼盒装］柔嫩饱满 果香四溢 三种蜜柚 2粒/4粒可选</view>
										<view class="g-mask">9折会员价：28.8元-64.8元。</view>
										<view class="g-price">
											<view class="left-price">
												<text class="price-tag">¥</text>
												<text class="price-sale-price">26</text>
											</view>
											<image src="/static/image/allGoods/btn-shopcart.png" class="btn_img"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
					</t-linkage>
				</block>
				<!--内容部分 end 自定义可删除-->
			</scroll-view>
		</view>
	</view>
</template>

<script>
import tLinkage from '@/component/views/t-linkage/t-linkage';
export default {
	components: {
		tLinkage
	},
	data() {
		return {
			tabbar: [
				'推荐分类',
				'进口超市',
				'国际名牌',
				'奢侈品',
				'海囤全球',
				'男装',
				'女装',
				'男鞋',
				'女鞋',
				'钟表珠宝',
				'手机数码',
				'电脑办公',
				'家用电器',
				'玩具乐器',
				'运动户外',
				'宠物生活',
				'特产馆'
			],
			height: 0, //scroll-view高度
			top: 0,
			currentTab: 0, //预设当前项的值
			scrollView_leftId: 'left_0',
			scrollView_rightId: 'right_0',
			scrollTop: 0,
			distanceTop: uni.upx2px(92),
			isScroll: true,
			isTap: true
		};
	},
	onLoad: function(options) {
		setTimeout(() => {
			uni.getSystemInfo({
				success: res => {
					let header = 92;
					let top = 0;
					//#ifdef H5
					top = 44;
					//#endif
					this.height = res.windowHeight - uni.upx2px(header);
					this.top = top + uni.upx2px(header);
				}
			});
		}, 50);
	},
	created(){
		
	},
	methods: {
		// 点击标题切换当前页时改变样式
		swichNav: function(e) {
			let cur = e.currentTarget.dataset.current;
			if (this.currentTab == cur) {
				return false;
			} else {
				this.currentTab = cur;
				this.checkCor();
			}
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor: function(isScroll) {
			if (!isScroll) {
				this.isScroll = false;
				this.isTap = true;
				console.info(this.currentTab, 'currentTab');
				if (this.currentTab > 6) {
					this.scrollView_leftId = `left_${this.currentTab - 2}`;
				} else {
					this.scrollView_leftId = `left_0`;
				}
				this.scrollView_rightId = `right_${this.currentTab}`;
			} else {
				this.scrollView_leftId = `left_${this.currentTab}`;
			}
		},
		productList(e) {
			let key = e.currentTarget.dataset.key;
			uni.navigateTo({
				url: '/pages/template/mall/productList/productList?searchKey=' + key
			});
		},
		search: function() {
			uni.navigateTo({
				url: '/pages/template/news/search/search'
			});
		},
		scroll(e) {
			//动画时长固定300ms
			if (!this.isScroll) {
				setTimeout(() => {
					this.isScroll = true;
				}, 150);
			} else {
				this.scrollTop = e.detail.scrollTop;
			}
		},
		linkage(e) {
			if (e.isLinkage && e.index != this.currentTab) {
				this.isTap = false;
				this.currentTab = e.index;
				this.checkCor(true);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #fcfcfc;
}
.w-21 {
	width: 21.3%;
}
.active::before {
	content: '';
	position: absolute;
	border-left: 6rpx solid #ff4444;
	height: 100%;
	left: 0;
}
/* 左侧导航布局 end*/
.page-view {
	width: 74%;
	overflow: hidden;
	box-sizing: border-box;
	padding-bottom: env(safe-area-inset-bottom);
	.g-container {
		.g-box {
			display: flex;
			margin-bottom: 40rpx;
			.left_img {
				width: 176rpx;
				height: 176rpx;
			}
			.right-content {
				width: 290rpx;
				margin-left: 20rpx;
				.g-title {
					margin-bottom: 4px;
					color: #323233;
					line-height: 20px;
					font-weight: bold;
					max-height: 40px;
					font-size: 14px;
					display: -webkit-box; /*设置为弹性盒子*/
					-webkit-line-clamp: 2; /*最多显示5行*/
					overflow: hidden; /*超出隐藏*/
					text-overflow: ellipsis; /*超出显示为省略号*/
					-webkit-box-orient: vertical;
					word-break: break-all; /*强制英文单词自动换行*/
				}
				.g-mask {
					height: 30rpx;
					margin: 10rpx 0;
					color: #969799;
					line-height: 16px;
					font-size: 12px;
					display: -webkit-box; /*设置为弹性盒子*/
					-webkit-line-clamp: 1; /*最多显示5行*/
					overflow: hidden; /*超出隐藏*/
					text-overflow: ellipsis; /*超出显示为省略号*/
					-webkit-box-orient: vertical;
					word-break: break-all; /*强制英文单词自动换行*/
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
.class-name {
	color: #666;
	margin-bottom: 22rpx;
	font-size: 12px;
	line-height: 30px;
}
.left-view {
	background-color: #f8f8f8;
	font-size: 28rpx;
}
.bgc-select {
	background-color: #ffffff;
}
</style>
