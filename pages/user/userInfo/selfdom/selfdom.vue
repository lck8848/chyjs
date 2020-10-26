<template>
	<view class="selfdom-container">
		<view class="check">
			<view class="text">
				根据你的信息展示推荐商品
			</view>
			<switch :checked="checked" color="#fa1919" class="tui-switch-small switch" @change="change" />
		</view>
		<view class="intro">
			系统可能会根据你的信息向你展示推荐商品，如果你不希望我们的系统使用该类信息为你进行推荐，可点击上方按钮进行关闭，关闭后，我们的系统不会再利用该类信息为你展示个性化内容。
		</view>
	</view>
</template>

<script>
	import { updateUser } from '@/api/index.js';
	export default {
		data() {
			return {
				checked: false
			}
		},
		methods: {
			async change(e){
				let user = this.$store.state.user;
				user.selfdom = e.detail.value ?1 :0;
				this.$store.commit('saveUser', user)
				let {status} = await updateUser({id: user.id, selfdom: user.selfdom});
				if(status){
					uni.showToast({
						icon: "success",
						title: "更改信息失败"
					});
				}
			}
		},
		onShow() {
			this.checked = !!this.$store.state.user.selfdom
		}
	}
</script>

<style lang="scss" scoped>
.selfdom-container {
	padding-top: 32rpx;
	.check {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 32rpx;
		align-items: center;
		.text {
			font-size: 28rpx;
			color: #323233;
		}
	}
	.intro {
		margin: 24rpx 32rpx 0;
		color: #969799;
		font-size: 24rpx;
	}
}
</style>
