<template>
	<view>
		<view class="component">
			<canvas canvas-id="qrcode" style="width: 354px;height: 354px;" />
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/utils/uqrcode.js'
	import UniQrcode from '@/components/uni-qrcode/uni-qrcode'
	export default {
		data() {
			return {
				size: uni.upx2px(590),
				imgUrl: ""
			};
		},
		methods: {
			async make() {
			      // 回调方式
			      uQRCode.make({
			        canvasId: 'qrcode',
			        componentInstance: this,
			        text: 'uQRCode',
			        size: 354,
			        margin: 10,
			        backgroundColor: '#ffffff',
			        foregroundColor: '#000000',
			        fileType: 'jpg',
			        correctLevel: uQRCode.errorCorrectLevel.H,
			        success: res => {
			          console.log(res)
			        }
				})
			}
		},
		async onLoad(option) {
			this.imgUrl = option.imgUrl;
			this.make();
		},
		components: {
			UniQrcode
		}
	}
</script>

<style lang="scss">

</style>
