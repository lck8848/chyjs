<template>
	<view class="bind-container">
		<view class="info">
			<view class="img-shell"><image class="img" src="http://47.106.36.197:7000/source/userImages/other/phone.png" mode="widthFix"></image></view>
			<view class="title">绑定手机号</view>
			<view class="tips">绑定后，手机号将用于登录有赞其他应用，如有赞微商城、有赞买家版、有赞批发、有赞收银</view>
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
					<input class="input" type="text" placeholder="请输入4位验证码" maxlength="4" v-model="codeVal" @input="ChangeCode" />
				</view>
				<view :class="['code', disabledCode ? 'getCode' : '']" @tap="getVerifyCode()" :disabled="disabledCode">{{ getCode }}</view>
			</view>
		</view>
		<view class="bottom_btn"><button :disabled="!disabled" @click="submit" :class="['btn_style', disabled ? 'verify' : '']">确定</button></view>
		<view class="no_acquire" @click="no_acquire">手机收不到验证码?</view>
	</view>
</template>

<script>
var zhenzisms = require('@/utils/zhenzisms.js');
import { updateUser } from '@/api/index.js';
export default {
	data() {
		return {
			phoneVal: '',
			codeVal: '',
			disabled: false,
			disabledCode: false, //是否可以点击
			getCode: '获取验证码' //显示文字
		};
	},
	methods: {
		ChangeCode(e) {
			// 验证码输入长度正确更改背景颜色,并改为可点击
			if (e.detail.value.length == 4) {
				this.disabled = true;
			} else {
				this.disabled = false;
			}
		},
		//确认按钮点击事件
		async submit() {
			//验证用户输入的验证码是否正确
			var result = zhenzisms.client.validateCode(this.phoneVal, this.codeVal);
			if (result == 'ok') {
				uni.showToast({
					title: '校验成功',
					icon: 'success'
				});
				//更数据库中用户的手机号
				let res = await updateUser({ id: this.$store.state.user.id, phone: this.phoneVal });
				if (res.status == 0) {
					this.$store.commit("updPhone",this.phoneVal);
					setTimeout(() => {
						uni.navigateTo({
							url: '../safety'
						});
					}, 1500);
				}
			} else if (result == 'empty') {
				uni.showToast({
					title: '未生成验证码',
					icon: 'none'
				});
			} else if (result == 'number_error') {
				uni.showToast({
					title: '手机号码不一致',
					icon: 'none'
				});
			} else if (result == 'code_error') {
				uni.showToast({
					title: '验证码不一致',
					icon: 'none'
				});
			} else if (result == 'code_expired') {
				uni.showToast({
					title: '验证码已过期',
					icon: 'none'
				});
			}
		},
		//获取验证码按钮点击事件
		getVerifyCode() {
			//判断手机号是否为空
			if (!this.phoneVal) {
				uni.showToast({
					title: '请输入手机号码',
					icon: 'none'
				});
				return;
			}
			const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
			//验证手机号格式
			if (!reg.test(this.phoneVal)) {
				uni.showToast({
					title: '手机格式错误',
					icon: 'none'
				});
				return;
			}
			//设置60秒倒计时
			var times = 60;
			var i = setInterval(() => {
				times--;
				if (times <= 0) {
					this.disabledCode = false;
					this.getCode = '重新发送';
					clearInterval(i);
				} else {
					this.disabledCode = true;
					this.getCode = '已发送(' + times + 's)';
				}
			}, 1000);
			
			//云短信
			let apiUrl = 'https://sms_developer.zhenzikj.com';
			let appId = '107003';
			let appSecret = '01615df7-f238-46f3-ab60-56e349af5bfb';
			zhenzisms.client.init(apiUrl, appId, appSecret);

			var params = {};
			params.number = this.phoneVal;
			params.templateId = '2054';
			var code = zhenzisms.client.createCode(4, 60, params.number); //生成验证码
			var templateParams = [code, '5分钟'];
			params.templateParams = templateParams;
			// params.messageId = '1111111';
			// params.clientIp = '221.221.221.111';

			// 生成的验证码
			// console.log(code);

			//发送验证码
			let res = zhenzisms.client.send(function(res) {
				wx.showToast({
					title: res.data.data,
					icon: 'none',
					duration: 2000
				});
			}, params);
		},
		no_acquire() {
			uni.showToast({
				title: '亲,这边建议您换个手机',
				icon: 'none'
			});
		}
	},
	onShow() {
	}
};
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
			border: 2rpx solid #caeedb;
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
	.bottom_btn {
		width: 92vw;
		margin: 0 auto;
		margin-top: 60rpx;
		margin-bottom: 32rpx;
		.btn_style {
			font-size: 30rpx;
			background-color: #7fdcac;
			color: #eef8f3;
		}
		.verify {
			background-color: #07c160;
		}
	}
	.getCode {
		color: #d3d3d3 !important;
	}
	.no_acquire {
		text-align: right;
		width: 93vw;
		font-size: 26rpx;
		color: #38f;
	}
}
</style>
