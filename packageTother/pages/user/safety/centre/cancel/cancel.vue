<template>
	<view class="cancel-container">
		<view class="wrapper">
			<view class="icon"><image src="/static/images/user/logout.png" class="icon_img"></image></view>
			<view class="title">注销后，将放弃所有资产和权益</view>
			<view class="tips">
				<ul>
					<li>身份、帐号信息、会员权益等资产将清空且无法恢复</li>
					<li>帐号注销后视作你自动放弃所有权益</li>
					<li>交易记录、分销员身份及佣金将清空</li>
					<li>帐号一旦被注销将不可恢复，请在操作前自行备份帐号相关的所有信息和数据</li>
					<li>帐号注销不代表注销前的帐号行为和相关责任得到豁免或减轻</li>
					<li>注销后，你将无法再登录有赞其他应用，如有赞微商城、有赞零售、有赞美业、微小店等</li>
				</ul>
			</view>
			<view class="btn_wrapper">
				<button :disabled="disabled" :class="['btn', !disabled ? 'select' : '']" @click="cancelUser"><span class="van-button__text">申请注销</span></button>
			</view>
			<view class="remand">
				<van-checkbox icon-size="18px" :value="checked" checked-color="#07c160" @change="onChange">勾选即表示已阅读并同意</van-checkbox>
				<text class="navTo" @click="navTo">《重要提醒》</text>
			</view>
		</view>
	</view>
</template>

<script>
import { updateUser, deleteUser } from '@/api/index.js';
export default {
	data() {
		return {
			checked: false,
			disabled: true
		};
	},
	methods: {
		onChange(event) {
			this.checked = event.detail;
			if (this.checked) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		},
		async cancelUser() {
			let res = await deleteUser(this.$store.state.user.id);
			this.$store.commit('delUser');
			if (this.$store.state.user == '' && res.status == 0) {
				uni.switchTab({
					url: '/pages/user/user'
				});
				uni.showToast({
					title: '注销成功'
				});
			}
		},
		navTo() {
			// uni.navigateTo({});
		}
	},
	onShow() {}
};
</script>

<style lang="scss" scoped>
.cancel-container {
	.wrapper {
		width: 100vw;
		.icon {
			margin: 90rpx auto 40rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 50%;
			.icon_img {
				width: 120rpx;
				height: 120rpx;
			}
		}
		.title {
			color: #333;
			font-size: 18px;
			text-align: center;
		}
		.tips {
			margin: 20px 40px 0;
			color: #666;
			font-size: 12px;
			border-top: 1px solid #e5e5e5;
			li {
				margin-top: 20px;
				padding-left: 8px;
				line-height: 1.4;
				position: relative;
			}
			li:before {
				content: '';
				display: inline-block;
				width: 4px;
				height: 4px;
				background: #4b0;
				border-radius: 50%;
				position: absolute;
				left: 0;
				top: 6px;
			}
		}
		.btn_wrapper {
			.btn {
				display: block;
				width: calc(100% - 30px);
				max-width: 346px;
				margin: 30px auto 0;
				opacity: 0.5;
				padding: 0 15px;
				font-size: 14px;
				color: #fff;
				background-color: #07c160;
				border: 1px solid #07c160;
				position: relative;
				box-sizing: border-box;
				height: 88rpx;
				line-height: 88rpx;
				text-align: center;
				border-radius: 2px;
				transition: opacity 0.2s;
				-webkit-appearance: none;
				text-align: center;
			}
			.select {
				opacity: 1;
			}
		}
		.remand {
			margin-top: 16px;
			font-size: 12px;
			height: 17px;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.navTo {
				color: #38f;
				line-height: 19px;
				margin-left: 6px;
			}
		}
	}
}
</style>
