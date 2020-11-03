<template>
	<view class="lazyload-container" :id="uid">
		<image :src="imgUrl" mode="widthFix" @load="load" class="lazy-img luce"
		v-if="isLoad" v-show="isShow" :class="{'tran':tran}"></image>
		<view class="none-img" v-show="!isShow">
			<image src="http://47.106.36.197:7000/source/other/after_img.svg" mode="widthFix" class="none"></image>
		</view>
	</view>
</template>

<script>
	function generateUUID() {
	    return 'xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function(c) {
	        let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return v.toString(16);
	    })
	}
	export default {
		props: ["imgUrl", "scrollTop"],
		data() {
			return {
				uid: '',
				isLoad: false,
				isShow: false,
				tran: false,
				classArr: ['lazy-img', 'luce']
			};
		},
		watch: {
			scrollTop(val){
				this.onScroll(val);
			}
		},
		methods: {
			init(){
			    this.uid = 'uid-' + generateUUID();
			    this.$nextTick(this.onScroll);
			},
			onScroll(scrollTop){
				const id = this.uid;
				const query = uni.createSelectorQuery().in(this);
				query.select('#'+id).boundingClientRect(data => {
				    if(!data) return;
				    if(data.top < 900){
				        this.isLoad = true;
				    }
				}).exec();
			},
			load(){
				this.isShow = true;
				setTimeout(() => {
					this.tran = true;
				}, 50)
				
			}
		},
		mounted() {
		    this.init()
		}
	}
</script>

<style lang="scss">
.lazyload-container {
	width: 100%;
	.lazy-img {
		width: 100%;
		height: auto;
	}
	.luce {
		opacity:0.3;
	}
	.tran {
		transition: opacity 1.2s;
		opacity: 1;
	}
	.none-img {
		width: 80%;
		height: 100%;
		margin: auto;
		.none {
			width: 100%;
			height: auto;
			margin: auto;
		}
	}
}
</style>
