<template>
	<view class="bind-container">
		<view class="info">
			<view class="img-shell">
				<image class="img" src="http://47.106.36.197:7000/source/userImages/other/phone.png" mode="widthFix"></image>
			</view>
			<view class="title">
				绑定手机号
			</view>
			<view class="tips">
				绑定后，手机号将用于登录有赞其他应用，如有赞微商城、有赞买家版、有赞批发、有赞收银
			</view>
		</view>
		<view class="group">
			<view class="item state">
				<view class="title">国家</view>
				<view class="content">+86</view>
			</view>
			<view class="item shell">
				<view class="title">手机号</view>
				<input class="input" type="text" placeholder="请输入手机号" maxlength="11" v-model="phoneVal" />
			</view>
			<view class="item-shell">
				<view class="item shell">
					<view class="title">验证码</view>
					<input class="input" type="text" placeholder="请输入6位验证码" maxlength="6" v-model="codeVal" />
				</view>
				<view class="code">获取验证码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneVal: "",
				codeVal: ""
			};
		}
	}
</script>

<style lang="scss">
.bind-container {
	.info {
		margin-top: 90rpx;
		text-align: center;
		.img-shell {
			display: inline-block;
			width: 120rpx;
			height: 120rpx;
			line-height: 120rpx;
			border: 2rpx solid #CAEEDB;
			border-radius: 50%;
			.img {
				vertical-align: middle;
				width: 80rpx;
				height: auto;
			}
		}
		.title {
			margin-top: 40rpx;
			font-size: 36rpx;
			color: #333;
		}
		.tips {
			display: inline-block;
			width: 540rpx;
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #999;
		}
	}
	.group {
		margin-top: 60rpx;
		font-size: 28rpx;
		background-color: #fff;
		.item {
			display: flex;
			padding: 20rpx 32rpx;
			border-bottom: 0.5rpx solid #f8f8f8;
			align-items: center;
			.title {
				width: 140rpx;
			}
			.input {
				flex: 1;
				height: 48rpx;
				color: #323233;
			}
		}
		.state {
			color: #333;
		}
		.shell {
			.title {
				margin-right: 24rpx;
				color: #646566;
			}
		}
		.item-shell {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.code {
				padding-right: 36rpx;
				width: 160rpx;
				color: #38f;
				text-align: center;
			}
		}
	}
}
</style>
