<template>
	<view class="recharge-container">
		<view class="fees" @tap="show()">
			<text>选择充值余额</text>
			<text class="money">当前余额:¥0.00</text>
			
		</view>
		<tui-bottom-popup class="showcase" :show="isShow" :radius="true" height="300"  backgroundColor="#F7F8FA" @close="show()">
			<view class="show-title">
				适用门店
				<view class="img" @tap="show()">
					<image src="@/static/images/showcase/cancel.png" mode=""></image>
				</view>
				<view class="cancel" @tap="show()"></view>
			</view>
			
			<scroll-view class="content" :scroll-y="true" >
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
	</view>
</template>

<script>
	
	import tuiBottomPopup from '@/components/thorui/tui-bottom-popup/tui-bottom-popup.vue'; 
	export default {
		data() {
			return {
				isShow: false,
			};
		},
		methods:{
			
			show(){
				this.isShow = !this.isShow;
			},
			
		},
		components: {
			tuiBottomPopup
		}
		
	}
</script>

<style lang="scss">
.recharge-container{
	
	.fees{
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		font-size: 34rpx;
		.money{
			font-size: 28rpx;
			color: #969799;
		}
	}
	.showcase{
		.show-title{
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			.img{
				position: absolute;
				top: 4px;
				right: 10px;
				width: 20px;
				height: 20px;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.content{
			.case{
			
				.head{
					display: flex;
					flex-direction: column;
					margin-bottom: 5px;
					padding: 15px;
					.left{
						font-weight: 600;
					}
					.title{
						font-size: 13px;
					}
				}
			}
		}
		.bottom{
			position: relative;
			// top: 35px;
			text-align: center;
			font-size: 14px;
			color: #ccc;
		}
	}

}

</style>
