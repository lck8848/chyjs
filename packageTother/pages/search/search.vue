<template>
	<view class="search-container">
		
		<view class="tui-searchbox">
			<view class="tui-search-input">
				<icon type="search" :size='13' color='#333'></icon>
				<input confirm-type="search" placeholder="大家都在搜：螺蛳粉" :focus="true" auto-focus placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="key" @confirm="detail(key)" />
				<icon type="clear" :size='13' color='#bcbcbc' @tap="cleanKey" v-show="key"></icon>
			</view>
			<view class="tui-cancle" @tap="back">取消</view>
		</view>
			
			<!-- <view class="tui-btn-box"><tui-button type="green" @click="detail(key)">搜索</tui-button></view> -->
		<view class="container">
			<view class="tui-search-history">
				<view class="tui-history-header">
					<view class="tui-search-title">热门搜索</view>
				</view>
				<view class="tui-history-content">
					<block v-for="(item,index) in hot" :key="index" >
						<view class="tag" @click="getkey(item)">{{item}}</view>
					</block>
				</view>
			</view>
			
			<view class="tui-search-history"  v-if="history.length > 0" >
				<view class="tui-history-header">
					<view class="tui-search-title" >搜索历史</view>
					<tui-icon name="delete" :size='14' color='#333' @tap="openActionSheet" class="tui-icon-delete"></tui-icon>
				</view>
				<view class="tui-history-content">
					<block v-for="(item,index) in history" :key="index" >
						<view class="tag" @click="getkey(item)">{{item}}</view>
					</block>
				</view>
			</view>
			<!-- <view v-show="key">
				<view class="tui-header">
					<view class="tui-header-left tui-noboredr">搜索 “{{key}}”</view>
				</view>
				<view class="tui-result-box">
					<block v-for="(item,index) in searchList" :key="index">
						<view class="tui-result-item" hover-class="tui-opcity" :hover-stay-time="150">
							<rich-text :nodes="item.showKey"></rich-text>
						</view>
					</block>
				</view>
			</view> -->

			<!-- <view class="tui-search-hot">
				<view class="tui-hot-header">
					<view class="tui-search-title">大家正在搜</view>
				</view>
				<view class="tui-hot-content">
					<block v-for="(item,index) in hot" :key="index">
						<tui-tag type="gray" shape="circle">{{item}}</tui-tag>
					</block>
				</view>
			</view> -->
			<tui-actionsheet :show="showActionSheet" :tips="tips" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
		</view>
	</view>

</template>

<script>
	const util = require("@/utils/util.js")
	export default {
		data() {
			return {
				history:[] ,
				hot: [
					"海苔肉松卷",
					"榴莲千层",
					"螺蛳粉",
				],
				key: "",
				showActionSheet: false,
				tips: "确认清空搜索历史吗？",
				searchResult:["按照展示的列表输入关键词看效果","肉松","搜索关键词高亮显示","模拟搜索结果集","开源不易，需要鼓励","人人为我，我为人人"],
				searchList:[]
			}
		},
		methods: {
			getkey(val){
				this.detail(val)
			},
			detail(key){
				
				var data = key
				this.history.push_unique(data)
				
				for(var i = 0;i<this.history.length;i++){
				    if(this.history[i]==""||this.history[i]==null||typeof(this.history[i])==undefined){
				        this.history.splice(i,1);
				        i=i-1;
				    }
				}
				uni.setStorageSync('history',JSON.stringify(this.history))
				uni.navigateTo({
					url:"/packageTother/pages/search/search-result?keyword=" + key
				})
				
				
				
			},
			back: function() {
				uni.navigateBack();
			},
			cleanKey: function() {
				this.key = ''
			},
			closeActionSheet: function() {
				this.showActionSheet = false
			},
			openActionSheet: function() {
				this.showActionSheet = true
				
			},
			itemClick: function(e) {
				let index = e.index;
				if (index == 0) {
					this.showActionSheet = false;
					uni.removeStorageSync('history')
					this.history = []
					
				}
			},
			inputKey: function(e) {
				this.key = util.trim(e.detail.value);
				if (!this.key) {
					this.searchList = [];
					return;
				}
				//根据关键词查找
				let arr = []
				//实际开发中，根据搜索返回结果集，此处只是做展示提示搜索哪些文字
				this.searchResult.forEach((item) => {
					arr.push({
						key: item,
						showKey: util.replaceAll(item, this.key, `<label style="color:#E41F19">${this.key}</label>`)
					})
				})
				this.searchList = arr
			}
		},
		onLoad(){
			
			Array.prototype.push_unique = function () {
				for (var i = 0; i < arguments.length; i++) {
					var ele = arguments[i];
					if (this.indexOf(ele) == -1) {
						this.push(ele);
					}
				}
			};
			// this.history = JSON.parse(uni.getStorageSync('history'))
		},
		onShow() {
			this.history =!uni.getStorageSync('history') ? [] : JSON.parse(uni.getStorageSync('history'))
		}
	}
</script>

<style lang="scss" scoped>
	.search-container {
		height: 100vh;
		background-color: #fff;
	}
	.container {
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-searchbox {
		padding: 10rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		height: 100rpx;
		align-items: center;
		background-color: #f2f2f2;
	}

	.tui-search-input {
		width: 100%;
		height: 80rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
		background: #fff;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 28rpx;
	}

	.tui-input-plholder {
		font-size: 28rpx;
		color: #b2b2b2;
	}

	.tui-cancle {
		color: #666;
		font-size: 28rpx;
		padding-left: 30rpx;
		flex-shrink: 0;
	}

	.tui-history-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx 0;
	}
	.tui-history-content{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.tui-icon-delete {
		padding: 10rpx;
	}

	.tui-search-title {
		color: #999999;
		font-size: 24rpx;
	}

	.tui-hot-header {
		padding: 30rpx 0;
	}
	
	.tui-header {
		padding: 26rpx 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tui-header-left {
		font-size: 30rpx;
		color: #222;
		border-left: 4rpx solid #EB0909;
		padding-left: 10rpx;
		word-break: break-all;
	}
	
	.tui-noboredr {
		border-left: 0 !important;
	}

	.tui-result-box {
		font-size: 28rpx;
	}
	
	.tui-result-item {
		line-height: 28rpx;
		padding: 28rpx 0;
	}
	
	.tag {
		padding: 0 20rpx;
		height: 64rpx;
		line-height: 64rpx;
		margin: 0 20rpx 20rpx 0;
		color: #666;
		font-size: 24rpx;
		border-radius: 4rpx;
		background-color: #f6f6f6;
	}
	
</style>