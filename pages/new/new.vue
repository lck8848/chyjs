<template>
	<view class="new-container">
		<view class="tui-header">
			
			<view class="tui-header-top">
				<view :data-selected="1" class="tui-top-item" :class="selected == 1 ? 'active' : '' " @click="screen">综合</view>
				
				<view class="tui-top-item" :class="selected == 2 || selected == 3 ? 'active' : '' " >
					<view >价格</view>
					<view class="tui-price-arrow" >
						<view :data-selected="2" class="tui-icon-box tui-arrow-up"   @click="up">
							<tui-icon name="turningup" :size="16" :color="selected == 2 ? '#ff4444' : '' "></tui-icon>
						</view>
						<view :data-selected="3" class="tui-icon-box tui-arrow-down"  @click="down">
							<tui-icon name="turningdown" :size="16" :color="selected == 3 ? '#ff4444' : '' " ></tui-icon>
						</view>
							
					</view>
				</view>
				
				<view :data-selected="4" class="tui-top-item" @tap="newgood" :class="selected == 4 ? 'active' : '' ">上新</view>
				
			</view>
		</view>
		
		<view class="goods-list">
			<view class="item">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selected:1,
			};
		},
		methods:{
			screen(e){
				console.log(e)
				this.selected = 1
			},
			up(e){
				this.selected = 2
				console.log(e)
			},
			down(e){
				this.selected = 3
				console.log(e)
			},
			newgood(){
				this.selected = 4
			}
		}
	}
</script>

<style lang="scss" scoped>
	.new-container{
		.tui-header {
			width: 100%;
			padding: 30rpx;
			/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
			box-sizing: border-box;
			background-color: #fff;
			// position: fixed;
			// z-index: 1000;
			.tui-header-top{
				display: flex;
				align-items: center;
				justify-content: space-between;
				font-size: 28rpx;
				color: #333;
				.tui-top-item {
					height: 28rpx;
					line-height: 28rpx;
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.active {
					color:#FF4444 ;
					font-weight: bold;
				}
				
				.tui-topitem-active::after {
					content: '';
					position: absolute;
					width: 44rpx;
					height: 6rpx;
					background: #5677fc;
					border-radius: 6rpx;
					bottom: -10rpx;
					left: 50%;
					-webkit-transform: translateX(-50%);
					transform: translateX(-50%);
				}
				
				.tui-price-arrow {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					height: 30rpx;
					.tui-icon-box {
						line-height: 16px !important;
						padding: 0 !important;
						display: block !important;
						position: relative;
					}
					
					.tui-arrow-up {
						top: 5px;
					}
					
					.tui-arrow-down {
						top: -3px;
					}
					
				}
			}
			
		}
		
	}
</style>
