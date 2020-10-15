<template>
	<view class="container">
		<view class="search-container" @click="Tosearch">
			<search  ref="search"></search>
		</view>
		
		
		
	</view>
</template>

<script>
	import search from "../../components/search/search"
	export default {
		components:{
			search
		},
		data() {
			return {
				href: 'https://uniapp.dcloud.io/component/README?id=uniui'
			}
		},
		methods: {
			Tosearch(){
				this.$refs.search.search()
			}
		}
	}
</script>

<style>
	.container {
		
	}
</style>
