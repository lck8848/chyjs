<template>
	<view class="tui-addr-box">
		<form @submit="formSubmit">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" class="tui-input" name="nickname" v-model="addrData.nickname" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" class="tui-input" v-model="addrData.phone" name="phone" placeholder="请输入收货人手机号码" maxlength="11"
					 type="text" />
				</view>
			</tui-list-cell>
			<tui-list-cell :arrow="true" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title"><text class="tui-title-city-text">所在地区</text></view>
					
						<!-- <view class="uni-input">{{addrData.addr_area?addrData.addr_area:addrValue}}</view> -->
					<picker mode="region" @change="bindPickerChange" :value="index">
						<input v-if="isAddrShow" shape="circle" class="tui-input" v-model="addrValue" placeholder="请选择省/市/区"
						 maxlength="50" type="text" :disabled="true" />
						 <input v-if="!isAddrShow" shape="circle" class="tui-input" v-model="addrValue" :placeholder="addrData.addr_area"
						  maxlength="50" type="text" :disabled="true" />
					</picker>
				</view>
			</tui-list-cell>
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">详细地址</view>
					<input placeholder-class="tui-phcolor" shape="circle" class="tui-input" v-model="addrData.addr_detail" name="addr_detail" placeholder="请输入详细地址"
					 maxlength="50" type="text" />
				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">门牌号</view>
					<input placeholder-class="tui-phcolor" v-model="addrData.addr_house" shape="circle" class="tui-input" name="addr_house" placeholder="街道,门牌号等"
					 maxlength="50" type="text" />
				</view>
			</tui-list-cell>
		
			<!-- 默认地址 -->
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-swipe-cell">
					<view>设为默认地址</view>
					<switch :checked="isSwitch" @change="switchChange" color="#19be6b" name="switch" class="tui-switch-small" />
				</view>
			</tui-list-cell>
			<!-- 保存地址 -->
			<view class="tui-addr-save" v-show="!isShow">
				<tui-button shadow type="danger" formType="submit" height="88rpx" shape="circle">保存并使用</tui-button>
			</view>
			<view class="tui-addr-save" v-show="isShow">
				<tui-button updateAddr @tap="updateAddrData()"  shadow type="danger" height="88rpx" shape="circle">编辑</tui-button>			</view>
			<view class="tui-del" v-if="isShow">
				<tui-button @tap="delAddr(addrData.id)" shadow type="gray"  height="88rpx" shape="circle">删除收货地址</tui-button>
			</view>
		</form>
	</view>
</template>

<script>
	import {addAddr,updateUser,getOneAddr,updateAddr,deleteAddr} from "../../../api/index.js"
	export default {
		data() {
			return {
				index: 0,
				addrValue: "",
				isSwitch:true,
				isAddrShow:true,
				infoData: ["收货人",
					"手机号码",
					"所在地区",
					"详情地址",
					"门牌号",
					"默认"
				],
				isShow:false,
				addrData:""
			}
		},
		methods: {
			bindPickerChange(e) {
				let addrArr = e.target.value;
				this.addrValue = `${addrArr[0]} ${addrArr[1]} ${addrArr[2]}`;
				
			},
			// 开关
			switchChange:function(e){
				this.isSwitch = e.target.value
				console.log( e.target.value);
			},
			// 添加地址
			formSubmit: async function(e) {
				console.log('form发生了submit事件，携带数据为：', e.detail)
				let obj = e.detail.value;
				let objArr = Object.keys(obj);
				// 判断不能为空
				objArr.some((v, index) => {
					if (obj[v] === "") {
						uni.showToast({
							title: this.infoData[index] + '不能为空',
							icon: 'none',
						})
						return true;
					}
				})
			
				const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
				if (reg.test(e.detail.value.phone) == false) {
					uni.showToast({
						title: "手机格式错误，请输入正确的格式",
						icon: 'none',
					})
				} else {
					var user_id = this.$store.state.user.id
					e.detail.value.user_id = user_id
					e.detail.value.addr_area = this.addrValue
					var {code,addr_id} = await addAddr(e.detail.value);
					
					if(e.detail.value.switch === true){
						var res = await updateUser({id:user_id,addr_id:addr_id})
						let user = this.$store.state.user;
						user.addr_id = addr_id;
						this.$store.commit('saveUser', user);
					}
					if(code == 0){
						uni.showToast({
							title:"添加地址成功",
							icon:"none",
							mask:true,
						})
						
						uni.navigateTo({
							url: "/pages/user/address/address"
						})
					}
					
				}
			},
			async getAddr(id){
				var addr_id = this.$store.state.user.addr_id;
				if(addr_id == id){
					this.isSwitch = true
				}else{
					this.isSwitch =false
				}
				var data = await getOneAddr(id)
				this.addrData = data
			},
			// 删除
			async delAddr(id){
				uni.showModal({
					content:"确定要删除吗?",
					async success(e) {
						console.log(e.cancel);
						if(e.cancel === true){
							return
						}else{
							var { status } = await deleteAddr(id);
							if(!status){
								await uni.navigateTo({
									url:"/pages/user/address/address"
								}),
								await uni.showToast({
									title:"删除成功",
								})
							}else{
								uni.showToast({
									title:"删除失败",
									icon:"none"
								})
							}
						}
					}
				})
			},
			async updateAddrData(){
				if(this.addrValue !== ""){
					this.addrData.addr_area = this.addrValue
				}
				let addrData = this.addrData;
				let objArr = Object.keys(addrData);
				// 判断不能为空
				objArr.some((v, index) => {
					if (addrData[v] === "") {
						uni.showToast({
							title:'不能为空,请填写',
							icon: 'none',
						})
						return true;
					}
				})
				const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
				if (reg.test(addrData.phone) == false) {
					uni.showToast({
						title: "手机格式错误，请输入正确的格式",
						icon: 'none',
					})
				}else{
					var {status} = await updateAddr(addrData);
					var user_id = this.$store.state.user.id;
					console.log("user_id"+user_id);
					console.log("addr_id"+addrData.id)
					if(this.isSwitch == true){
						var res = await updateUser({id:user_id,addr_id:addrData.id})
						let user = this.$store.state.user;
						user.addr_id = addrData.id;
						this.$store.commit('saveUser', user);
					}
					if(status == 0){
						uni.showToast({
							title:"地址修改成功",
							icon:"none",
							mask:true,
						})
						
						uni.navigateTo({
							url: "/pages/user/address/address"
						})
					}
				}
			}
			
			
		
		
		},
		
		onLoad: function(option) {
			if(option.id){
				this.isShow = true;
				this.isAddrShow = false;
				this.getAddr(option.id)
			}
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
