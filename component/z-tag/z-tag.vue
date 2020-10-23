<template>
	<view class="tag_container" :style="{{tagStyle}}">
		{{text}}
	</view>
</template>

<script>
	export default {
		name:"z-tag",
		props:{
			// 标签文本
			text:{
				type:String,
				default:""
			},
			// 宽高
			tagWidth:{
				type:[String,Number],
				default:"135rpx"
			},
			tagHeight:{
				type:[String,Number],
				default:"48rpx"
			},
			fontSize:{
				type:[String,Number],
				default:"26rpx"
			},
			fontColor:{
				type:String,
				default:"black"
			},
			// 背景色
			bgColor:{
				type:String,
				default:'#fff'
			},
			// 边框颜色
			bColor:{
				type:String,
				default:'#FF7373'
			}
		},
		computed:{
			tagStyle(){
				let style = {};
				style = {
					width:this.tagWidth,
					height:this.tagHeight,
					fontSize:this.fontSize,
					color:this.fontColor,
					backgroundColor:this.bgColor,
					border:1px solid + this.bColor
				}
				return style;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tag_container{
		border-radius: 50rpx;
	}
</style>
