<template>
	<view class="balance-container">
		<view class="balance-page">
			<view class="chihuo">
				吃货研究所店铺余额
			</view>
			<view class="balance">
				<view class="dianpu">
					<view class="name">
						店铺余额(元)
					</view>
					<view class="fees">
						{{fees}}
					</view>
				</view>
			</view>
		</view>

		<view class="grid">
			<navigator url="/packageTother/pages/user/balance/recharge/recharge" open-type="navigate">
				<view class="recharge">
					<image src="@/packageTother/static/images/user/充值.png" mode=""></image>
					<text>充值</text>
				</view>
			</navigator>
			<navigator url="/packageTother/pages/user/balance/record/record" open-type="navigate">
				<view class="bill ">
					<image src="@/packageTother/static/images/user/账单.png" mode=""></image>
					<text>账单</text>
				</view>

			</navigator>
		</view>

		<view class="lianjie">
			<van-cell is-link icon="bag-o" title="去商城购物" link-type="switchTab" url="/pages/index/index" />
			<van-cell is-link title="适用店铺" icon="send-gift-o" link-type="navigateTo" url="/packageTother/pages/user/balance/shops/shops" />
			<van-cell icon="clock-o" value="永久有效" title="有效期" />
		</view>

		<view class="lianjie">
			<van-cell is-link icon="question-o" title="使用帮助" link-type="navigateTo" url="/packageTother/pages/user/balance/tooltip/tooltip" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fees:0.00
			};
		},
		onShow() {
			this.fees = this.$store.state.user.balance;
			console.log(this.$store.state.user)
		}
	}
</script>

<style lang="scss">
	.balance-container {

		background-color: #f7f8fa;
		min-height: calc(100vh - 32px);

		.balance-page {
			margin: auto;
			width: 88%;
			// height: 280rpx;
			border-radius: 20rpx;
			background-color: #ff5454;
			// margin-top: 10px;
			color: #fff;
			padding: 10px;

			.chihuo {
				font-size: 32rpx;
				font-weight: 600;
				height: 100px;
			}

			.balance {
				display: flex;
				align-items: center;
				justify-content: center;
				

				.dianpu {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;

				}

			}




		}

		.grid {
			margin: auto;
			margin-top: 20rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 94%;
			height: 60px;

			.recharge {
				width: 190px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 28px;
					height: 28px;

				}

				text {
					margin-left: 10px;
				}
			}

			.bill {
				width: 190px;
				height: 60px;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 28px;
					height: 28px;

				}

				text {
					margin-left: 10px;
				}
			}
		}

		.lianjie {
			margin: auto;
			border-radius: 20rpx;
			width: 94%;
			margin-top: 10px;
			margin-bottom: 10px;
		}
	}
</style>
