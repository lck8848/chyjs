<template>
	<view class="safety-container">
		<view class="block">
			<list-cell :arrow="true" padding="0" :unlined="true">
				<navigator url="./binding/binding">
					<view class="item">
						<view class="title">手机号</view>
						<view class="content">{{ phoneStatus }}</view>
					</view>
				</navigator>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true">
				<view class="item">
					<view class="title">关联账号</view>
					<view class="content">
						<image class="img" src="http://47.106.36.197:7000/source/userImages/other/wx.svg" mode="widthFix"></image>
						<image class="img" src="http://47.106.36.197:7000/source/userImages/other/wb.svg" mode="widthFix"></image>
						<image class="img" src="http://47.106.36.197:7000/source/userImages/other/zfb.svg" mode="widthFix"></image>
						<image class="img" src="http://47.106.36.197:7000/source/userImages/other/qq.svg" mode="widthFix"></image>
					</view>
				</view>
			</list-cell>
		</view>
		<view class="block">
			<list-cell :arrow="true" padding="0" :unlined="true">
				<view class="item">
					<view class="title">登录设备管理</view>
					<view class="content"></view>
				</view>
			</list-cell>
		</view>
		<view class="block">
			<list-cell :arrow="true" padding="0" :unlined="true">
				<navigator url="./centre/centre">
					<view class="item">
						<view class="title">安全中心</view>
						<view class="content"></view>
					</view>
				</navigator>
			</list-cell>
		</view>
	</view>
</template>

<script>
import listCell from '../../../components/thorui/tui-list-cell/tui-list-cell.vue';
export default {
	data() {
		return {
			phoneStatus: '未绑定'
		};
	},
	components: {
		listCell
	},
	onShow() {
		let phone = this.$store.state.user.phone;
		if (phone) {
			var dh = phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
			this.phoneStatus = dh;
		}
	}
};
</script>

<style lang="scss">
.safety-container {
	.block {
		margin-top: 24rpx;
		.item {
			display: flex;
			justify-content: space-between;
			padding: 24rpx 38rpx;
			font-size: 28rpx;
			border-bottom: 0.5rpx solid #f8f8f8;
			background-color: #fff;
			&:active {
				background-color: #f2f3f5;
			}
			.title {
				color: #323233;
			}
			.content {
				padding-right: 32rpx;
				color: #969799;
				.img {
					width: 44rpx;
					height: auto;
					margin-right: 4rpx;
				}
			}
		}
	}
}
</style>
