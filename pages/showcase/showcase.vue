<template>
	<view>
		橱窗
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bg_list: ['http://47.106.36.197:7000/source/other/ranking_bg.png',
				'http://47.106.36.197:7000/source/other/recommend_bg.png',
				'http://47.106.36.197:7000/source/other/footmark_bg.png']
			}
		},
		methods: {
			
		},
		onLoad: function (option) {
			console.log(option.index);
		}
	}
</script>

<style>

</style>
