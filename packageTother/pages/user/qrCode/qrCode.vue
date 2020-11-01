<template>
	<view>
		<view class="component">
			<canvas class="canvas" :canvas-id="cid" :style="{width: `${size}px`, height: `${size}px`}" />
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/utils/uqrcode.js'
	import UniQrcode from '@/components/uni-qrcode/uni-qrcode'
	export default {
		data() {
			return {
				cid: "qrcode",
				size: 200,
				logo: ""
			};
		},
		methods: {
			make() {
				let filePath = uQRCode.make({
					canvasId: this.cid,
					text: this.logo,
					size: this.size,
					margin: 10,
					backgroundColor: "#fff",
					foregroundColor: "#000"
				});
			}
		},
		onLoad(option) {
			this.logo = option.imgUrl;
			this.make();
		},
		components: {
			UniQrcode
		}
	}
</script>

<style lang="scss">
	.canvas {
		margin: 40rpx auto;
	}
</style>
