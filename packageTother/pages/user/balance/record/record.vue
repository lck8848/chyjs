<template>
	<view class="record-container">
		<view v-show="isEmpty" class="empty">
			<view class="img">
				<image src="@/static/images/user/buy-record.png" mode=""></image>
			</view>
			<view class="button">
				暂无账单记录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEmpty:true
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.record-container{
		.empty{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 100%;
			height: 400px;
			// .img{
			// 	width: 380rpx;
			// 	height: 380rpx;
			// 	image{
			// 		width: 100%;
			// 		height: 100%;
			// 	}
			// }
			.button{
				color: #C0C0C0;
			}
		}
	}

</style>
