<template>
	<view class="container">
		<!-- 登录 -->
		<!-- 二维码 -->
		<button open-type="getUserInfo" hover-class="none" @getuserinfo="getuserinfo">
			<view class="info">
				<view class="item">
					<view class="img"><image :src="infoData.img_url"></image></view>
					<view class="name">
						<view class="info_name">{{ infoData.name }}</view>
					</view>
				</view>
			</view>
		</button>
		<!-- 余额 -->
		<view class="fees"><van-cell icon="balance-o" title="查看余额" is-link @tap="getBalance" /></view>

		<order-shell></order-shell>

		<view class="userInfoitem">
			<van-cell icon="setting-o" title="账号设置" is-link @tap="getSafety" />
			<van-cell icon="user-o" title="个人信息" is-link @tap="goUserinfo" />
			<van-cell icon="location-o" title="收货地址" is-link @tap="getAddress" />
		</view>
		<!-- 回到顶部 -->
		<view class="top-button" @click="ToTop" @scroll="scroll" v-if="showtotop"><image src="/static/images/index/icon/top.png" class="topimg"></image></view>

		<recommend :scrollTop="scrollTop"></recommend>
	</view>
</template>

<script>
import recommend from '@/component/recommend/recommend.vue';
import orderShell from '@/component/order-shell/order-shell.vue';
import { wxlogin, checkToken } from '@/api/index.js';
export default {
	data() {
		return {
			infoData: {
				name: '点击显示微信头像',
				img_url: 'http://47.106.36.197:7000/source/userImages/other/avatar.png'
			},
			isLogin: false,
			scrollTop: 0,
			showtotop: false
		};
	},
	onPageScroll({ scrollTop }) {
		this.scrollTop = scrollTop;
		if (scrollTop >= 300) {
			this.showtotop = true;
		} else {
			this.showtotop = false;
		}
	},
	methods: {
		// 回到顶部
		ToTop() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
		getSafety() {
			var user_id = this.$store.state.user.id;
			if (user_id === undefined) {
				uni.showToast({
					title: '亲,请先登录',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: '/packageTother/pages/user/safety/safety'
			});
		},
		getBalance() {
			var user_id = this.$store.state.user.id;
			if (user_id === undefined) {
				uni.showToast({
					title: '亲,请先登录',
					icon: 'none'
				});
				return;
			}
			uni.navigateTo({
				url: "/packageTother/pages/user/balance/balance"
			});
		},
		getAddress() {
			var user_id = this.$store.state.user.id;
			if (user_id === undefined) {
				uni.showToast({
					title: '亲,请先登录',
					icon: 'none'
				});
				return;
			}

			uni.navigateTo({
				url: '/packageTother/pages/user/address/address'
			});
		},

		goUserinfo() {
			var user_id = this.$store.state.user.id;
			if (user_id === undefined) {
				uni.showToast({
					title: '亲,请先登录',
					icon: 'none'
				});
				return;
			}

			uni.navigateTo({
				url: '/packageTother/pages/user/userInfo/userInfo'
			});
		},

		// 登录
		async getuserinfo(e) {
			if (this.isLogin) {
				uni.navigateTo({
					url: '/packageTother/pages/user/userInfo/userInfo'
				});
				return;
			}
			uni.showLoading({
				title: "登录中...",
				mask: true
			})
			var _this = this;
			if (e.detail.errMsg === 'getUserInfo:ok') {
				uni.getUserInfo({
					success(res) {
						var { userInfo } = res;
						_this.infoData.name = userInfo.nickName;
						_this.infoData.img_url = userInfo.avatarUrl;

						uni.login({
							async success(res) {
								var code = res.code;
								var { token, user } = await wxlogin(code, userInfo);
								_this.$store.commit('saveUser', user);
								_this.$store.dispatch('getCartList');
								// uni.setStorage({
								// 	key: 'token',
								// 	data: token
								// });
								// uni.setStorage({
								// 	key: 'user',
								// 	data: JSON.stringify(user)
								// });
								_this.isLogin = true;
								uni.hideLoading();
							}
						});
					}
				});
			} else {
				uni.showToast({
					title: '授权失败，为了更好的体验请您先授权',
					icon: 'none'
				});
			}
		},

		CheckAuth() {
			// 查看微信小程序授权
			let _this = this;
			let userInfo = this.$store.state.user;
			if (userInfo === '') {
				this.infoData.name = '点击显示微信头像';
				this.infoData.img_url = 'http://47.106.36.197:7000/source/userImages/other/avatar.png';
				this.isLogin = false;
			}
			uni.getSetting({
				async success(res) {
					if (res.authSetting['scope.userInfo'] === undefined || res.authSetting['scope.userInfo'] == false) {
						_this.infoData.name = '点击显示微信头像';
						_this.infoData.img_url = 'http://47.106.36.197:7000/source/userImages/other/avatar.png';
					}
				}
			});
		}
	},

	components: {
		recommend,
		orderShell
	},
	onShow() {
		this.CheckAuth();
	}
};
</script>

<style lang="scss" scoped>
.container {
	background-color: #f9f9f9;
	height: 5270rpx;

	// 回到顶部
	.top-button {
		width: 70upx;
		height: 70upx;
		// 固定定位
		position: fixed;
		right: 49rpx;
		bottom: 60rpx;
		z-index: 5;

		.topimg {
			width: 100rpx;
			height: 100rpx;
		}
	}

	// 回到顶部到这

	.info {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		background-image: url(http://47.106.36.197:7000/source/userImages/other/user_back.png);
		background-size: 100% 100%;
		height: 375rpx;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 300rpx;

			.img {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100rpx;
					height: 100rpx;
				}
			}

			.name {
				width: 200px;

				.info_name {
					font-weight: 700;
				}

				.info_zhi {
					font-size: 24rpx;
					border: 1px solid #000000;
					text-align: center;
					color: #fff;
					background: #000000;
					border-radius: 20rpx;
				}
			}
		}
	}

	.fees {
		margin: auto;
		border-radius: 40rpx;
		width: 94vw;
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.userInfoitem {
		margin: auto;
		border-radius: 40rpx;
		width: 94vw;
		margin-top: 10px;
		margin-bottom: 10px;
	}
}

.signin {
	position: absolute;
	top: 40rpx;
	width: 120px;
	right: 0rpx;
}

.van_button {
	position: absolute;
	top: 40rpx;
	// width: 100px;
	right: 0rpx;
}
</style>
