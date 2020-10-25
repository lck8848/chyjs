<template>
	<view class="tui-addr-box">
		<form @submit="formSubmit">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="tui-title-city-text">所在地区</text></view>
					<picker :value="value" mode="multiSelector" @change="picker" @columnchange="columnPicker" :range="multiArray">
						<input placeholder-class="tui-phcolor" class="tui-input" :value="text" disabled name="city" placeholder="请选择省/市/区"
						 maxlength="50" type="text" />
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址</view>

					<input placeholder-class="tui-phcolor" shape="circle" class="tui-input" name="address" placeholder="请输入详细地址"
					 maxlength="50" type="text" />

				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">门牌号</view>

					<input placeholder-class="tui-phcolor" shape="circle" class="tui-input" name="house" placeholder="街道,门牌号等"
					 maxlength="50" type="text" />

				</view>
			</tui-list-cell>

			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch checked color="#19be6b" name="switch" class="tui-switch-small" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<tui-button shadow type="danger" formType="submit" height="88rpx" shape="circle">保存并使用</tui-button>
			</view>
			<view class="tui-del" v-if="false">
				<tui-button shadow type="gray" height="88rpx" shape="circle">删除收货地址</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	import cityData from "../../../utils/picker.city.js";

	import {
		addAddr
	} from "../../../api/index.js"
	export default {
		data() {
			return {
				selectList: cityData,
				multiArray: [], //picker数据
				value: [0, 0, 0],
				text: "",
				id: "",
				infoData: ["收货人",
					"手机号码",
					"所在地区",
					"详情地址",
					"门牌号",
					"默认"
				]
			}
		},
		methods: {
			picker: function(e) {
				let value = e.detail.value;
				if (this.selectList.length > 0) {
					let provice = this.selectList[value[0]].text
					let city = this.selectList[value[0]].children[value[1]].text
					let district = this.selectList[value[0]].children[value[1]].children[value[2]].text
					this.text = provice + " " + city + " " + district;
					this.id = this.selectList[value[0]].children[value[1]].children[value[2]].value
				}
				// console.log(this.id)
			},
			toArr(object) {
				let arr = [];
				for (let i in object) {
					arr.push(object[i].text);
				}
				// console.log(arr)
				return arr;
			},
			columnPicker:  function(e) {
				//第几列 下标从0开始
				let column = e.detail.column;
				//第几行 下标从0开始
				let value = e.detail.value;
				if (column === 0) {
					this.multiArray = [
						this.multiArray[0],
						this.toArr(this.selectList[value].children),
						this.toArr(this.selectList[value].children[0].children)
					];
					this.value = [value, 0, 0]
					// console.log(this.multiArray)
				} else if (column === 1) {
					this.multiArray = [
						this.multiArray[0],
						this.multiArray[1],
						this.toArr(this.selectList[this.value[0]].children[value].children)
					];
					this.value = [this.value[0], value, 0]
				}
			},
			// 添加地址
			formSubmit:async function(e) {
				console.log('form发生了submit事件，携带数据为：', e.detail)
				let obj = e.detail.value;
				let objArr = Object.keys(obj);
				// 判断不能为空
				objArr.some((v, index) => {
					// console.log(this.infoData[index]);
					if (obj[v] === "") {
						uni.showToast({
							title: this.infoData[index] + '不能为空',
							icon: 'none',
						})
						return true;
					}else{
						// 判断手机号
						const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
						if (reg.test(e.detail.value.mobile) == false) {
							uni.showToast({
								title: "手机格式错误，请输入正确的格式",
								icon: 'none',
							})
						}else{
							// var res = await addAddr(e.detail.value);
							// console.log(res);
							 uni.navigateTo({
								url:"/pages/user/address/address"
							})
						}
						
					}
				})
			},


		},

		onLoad: function() {
			this.multiArray = [
				this.toArr(this.selectList),
				this.toArr(this.selectList[0].children),
				this.toArr(this.selectList[0].children[0].children)
			]
		},
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-cell-title {
		font-size: 28rpx;
	}

	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}

	.tui-label-active {
		background: #E41F19;
		border-color: #E41F19;
		color: #fff;
	}

	.tui-swipe-cell {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #fff;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		border-radius: 6rpx;
		overflow: hidden;
		font-size: 28rpx;
	}

	.tui-switch-small {
		transform: scale(0.8);
		transform-origin: 100% center;
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx;
	}
</style>
