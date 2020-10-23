<template>
	<view class="order-steps">
		<view class="title-shell">
			<view class="title" v-for="(item, index) in options" :key="index" :style="{color: active===index ?color :'#b1b1b1'}">
				{{item}}
			</view>
		</view>
		<view class="spot-shell">
			<view class="spot" v-for="index in options.length" :key="index">
				<view class="line-shell" v-if="index !== 0">
					<view class="line"></view>
				</view>
				<view class="dot" v-if="active!==index"></view>
				<image class="draw" src="http://47.106.36.197:7000/source/other/draw.svg" mode="widthFix" v-if="active===index"
				:style="{backgroundColor:color}"></image>
				<view class="line-shell" v-if="index !== options.length-1">
					<view class="line"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			options: {
				type: Array,
				default () {
					return []
				}
			},
			active: {
				type: Number,
				default: 0
			},
			color: {
				type: String,
				default: '#04BF5E'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.order-steps {
	.title-shell {
		display: flex;
		justify-content: space-between;
		.title {
			color: #b1b1b1;
			font-size: 24rpx;
		}
	}
	
	.spot-shell {
		display: flex;
		justify-content: space-between;
		margin-top: 8rpx;
		.spot {
			flex: 1;
			display: flex;
			.dot {
				width: 12rpx;
				height: 12rpx;
				margin: auto 20rpx;
				border-radius: 50%;
				background-color: #b1b1b1;
			}
			.draw {
				width: 20rpx;
				height: 20rpx;
				margin: auto 20rpx;
				border-radius: 50%;
			}
			.line-shell {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.line {
					width: 100%;
					height: 4rpx;
					margin: auto 0;
					background-color: #b1b1b1;
				}
			}
		}
	}
}
</style>
