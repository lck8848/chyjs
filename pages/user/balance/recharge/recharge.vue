<template>
	<view class="recharge-container" >
		<view class="fees" @tap="show()">
			<text>选择充值余额</text>
			<text class="money">当前余额:¥0.00</text>
		</view>
		<tui-bottom-popup class="showcase" :show="isShow" :radius="true" :height="height" backgroundColor="#F7F8FA" @close="show()">

			<view class="show-title">
				适用门店
				<view class="img" @tap="show()">
					<image src="@/static/images/showcase/cancel.png" mode=""></image>
				</view>
				<view class="cancel" @tap="show()"></view>
			</view>

			<scroll-view class="content" :scroll-y="true">
				<view class="case">
					<view class="head">
						<view class="left">
							<view>吃货研究所店铺</view>
						</view>
						<view class="title">
							郎园vintage3号楼
						</view>
					</view>


				</view>
			</scroll-view>

			<view class="bottom">
				没有更多了
			</view>

		</tui-bottom-popup>
		<view class="input" @tap='KeyboarOpen' v-show="isFoucs">
			输入其他余额
		</view>
		
		<view class="item input2" v-show="!isFoucs">
			<view class="yuan">
				￥
			</view>
			<input @tap='KeyboarOpen' :disabled="true" type="text" v-model="fees" />
		</view>
		<number-keyboard tabBar ref='KeyboarHid' otherNum="." @input='onInput' psdLength='32'></number-keyboard>
		<button class="button-style" @tap="topUp" type="warn">立即充值</button>


	</view>
</template>

<script>
	import tuiBottomPopup from '@/components/thorui/tui-bottom-popup/tui-bottom-popup.vue';
	import numberKeyboard from '@/components/number-keyboard/number-keyboard.vue'
	export default {
		data() {
			return {
				isShow: false,
				height: 250,
				fees: "", //输入的内容
				isFoucs:true
			};
		},
		watch:{
			"fees":function(newVal){
				if(this.fees == ""){
					this.isFoucs = true
				}
			}
		},
		methods: {

			show() {
				this.isShow = !this.isShow;
			},

			//打开键盘
			KeyboarOpen(e) {
				console.log(e)
				// if(this.isFoucs == ""){
				// 	this.isFoucs = true;
				// }
				this.isFoucs = false
				this.$refs.KeyboarHid.open();
				
			},
			//输入的值
			onInput(val) {
			  this.fees = val;
			},
			// 充值
			topUp(){
				// todo
				console.log(this.fees)
			},
			
		},
		components: {
			tuiBottomPopup,
			numberKeyboard
		},
		
	}
</script>

<style lang="scss" scoped>
	.recharge-container {
		min-height: calc(100vh - 32px);
		.fees {
			padding: 20rpx;
			display: flex;
			flex-direction: column;
			font-size: 34rpx;

			.money {
				font-size: 28rpx;
				color: #969799;
			}
		}

		.showcase {
			.show-title {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 14px;

				.img {
					position: absolute;
					top: 4px;
					right: 10px;
					width: 20px;
					height: 20px;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.content {
				.case {

					.head {
						display: flex;
						flex-direction: column;
						margin-bottom: 5px;
						padding: 15px;

						.left {
							font-weight: 600;
						}

						.title {
							font-size: 13px;
						}
					}
				}
			}

			.bottom {
				position: relative;
				// top: 35px;
				text-align: center;
				font-size: 14px;
				color: #ccc;
			}
		}

		.button-style {
			position: fixed;
			width: 90vw;
			
			// left: 0px;
			bottom: 0;
			right: 0;
			left: 0;
			border-radius: 40px;
		}
		.item{
			display: flex;
			align-items: center;
		}
	}

	.input{
		width: 90%;
		height: 80rpx;
		border: 2px solid #CCCCCC;
		padding: 10px;
		margin: auto;
		line-height: 80rpx;
	}
	.input2{
		width: 90%;
		height: 80rpx;
		border: 2px solid #FF0000;
		padding: 10px;
		margin: auto;
		color: #FF0000;
		font-size: 16px;
		background-color: #ffecec;
	}
</style>
