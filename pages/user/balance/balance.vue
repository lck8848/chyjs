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
						0.00
					</view>
				</view>
				<view class="benjin">
					<view class="name">
						本金(元)
					</view>
					<view class="fees">
						0.00
					</view>
				</view>
				<view class="dianpu">
					<view class="name">
						赠送金(元)
					</view>
					<view class="fees">
						0.00
					</view>
				</view>
			</view>
		</view>

		<view class="grid">
			<navigator url="">
				<view class="recharge">
					<image src="@/static/images/user/充值.png" mode=""></image>
					<text>充值</text>
				</view>
			</navigator>
			<navigator url="">
				<view class="bill ">
					<image src="@/static/images/user/账单.png" mode=""></image>
					<text>账单</text>
				</view>

			</navigator>
		</view>

		<view class="lianjie">
			<van-cell is-link icon="bag-o" title="去商城购物" link-type="switchTab" url="/pages/index/index" />
			<van-cell is-link title="适用店铺" icon="send-gift-o" link-type="navigateTo" url="/pages/user/balance/shops/shops" />
			<van-cell icon="clock-o" value="永久有效" title="有效期"  />
		</view>
		
		<view class="lianjie">
			<van-cell is-link icon="question-o" title="使用帮助" link-type="navigateTo" url="/pages/user/balance/tooltip/tooltip" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.balance-container {

		background-color: #f7f8fa;
		min-height: calc(100vh - 32px);

		.balance-page {
			margin: auto;
			width: 360px;
			height: 140px;
			border-radius: 20rpx;
			background-color: #ff5454;
			margin-top: 10px;
			color: #fff;
			padding: 15px;

			.chihuo {

				height: 100px;
			}

			.balance {
				display: flex;
				justify-content: center;
				justify-content: space-between;
				align-items: center;

				.dianpu {
					display: flex;

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
			width: 390px;
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
	
		.lianjie{
			margin: auto;
			border-radius: 20rpx;
			width: 390px;
			margin-top: 10px;
			margin-bottom: 10px;
		}
	}
</style>
