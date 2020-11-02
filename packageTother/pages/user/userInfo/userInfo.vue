<template>
	<view class="user-info-container">
		<view class="user-title">
			基本信息
		</view>
		<view class="user-info">
			<list-cell padding="0" :unlined="true" :hover="false">
				<view class="item" >
					<view class="title">头像</view>
					<view class="content">
						<view class="photo-shell">
							<image class="img" :src="user.img_url" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</list-cell>
			<list-cell padding="0" :unlined="true" :hover="false">
				<view class="item">
					<view class="title">手机号</view>
					<view class="content">
						{{ user.phone ?user.phone :"未绑定" }}
					</view>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true" @tap="goQrcode()">
				<view class="item">
					<view class="title">会员码</view>
					<view class="content">
						<view class="icon-shell">
							<image class="img" src="http://47.106.36.197:7000/source/userImages/other/QR_code.svg" mode="widthFix"></image>
						</view>
					</view>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true" @click="input('name')">
				<view class="item">
					<view class="title">姓名</view>
					<view class="content">
						{{ user.name ?user.name :"请填写" }}
					</view>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true">
				<view class="item">
					<view class="title">性别</view>
					<picker mode="selector" :range="array" :value="sex"  @change="bindSexChange">
						<view class="">{{ user.sex ?user.sex :"保密" }}</view>
					</picker>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true">
				<view class="item">
					<view class="title">生日</view>
					<view class="content">
						<picker mode="date" :value="date" start="1900-01-01" :end="endDate" @change="bindDateChange">
							<view class="">{{date}}</view>
						</picker>
					</view>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true">
				<view class="item">
					<view class="title">地区</view>
					<view class="content">
						<picker mode="region" @change="bindPickerChange" :value="index">
							<view class="uni-input">{{addrValue}}</view>
						</picker>
					</view>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true" @click="input('wx_number')">
				<view class="item">
					<view class="title">微信号</view>
					<view class="content">
						{{ user.wx_number ?user.wx_number :"请填写" }}
					</view>
				</view>
			</list-cell>
			<list-cell :arrow="true" padding="0" :unlined="true" @tap="address()">
				<view class="item">
					<view class="title">收货地址</view>
					<view class="content"></view>
				</view>
			</list-cell>
		</view>
		<view class="user-title">
			通用设置
		</view>
		<list-cell :arrow="true" padding="0" :unlined="true" :hover="true" @tap="selfdom()">
			<view class="set">
				<view class="info">
					<view class="title">
						个性化推荐
					</view>
					<view class="make">
						开启后可看到你感兴趣的内容，建议开启
					</view>
				</view>
				<view class="check">
					{{user.selfdom ?"已允许" :"去设置"}}
				</view>
			</view>
		</list-cell>
		
		<tui-modal class="modal" :show="isShow" padding="30rpx 0 0" :custom="true">
			<view class="title">
				{{ mark === 'name' ?'修改姓名' :'修改微信号' }}
			</view>
			<view class="input-shell">
				<input class="input" type="text" v-model="value"  />
			</view>
			<view class="btn-shell">
				<view class="cancel btn" @tap="isShow=false">取消</view>
				<view class="confirm btn" @tap="updateUser(mark, value)">确定</view>
			</view>
		</tui-modal>
	</view>
</template>

<script>
	import listCell from '@/components/thorui/tui-list-cell/tui-list-cell.vue';
	import tuiModal from '@/components/thorui/tui-modal/tui-modal.vue';
	import { updateUser } from '@/api/index.js';
	export default {
		data() {
			return {
				user: "",
				value: "",
				isShow: false,
				mark: "",
				array:["保密","男","女"],
				date: "",
				sex:"",
				endDate: "" ,
				index: 0,
				addrValue: "",
			};
		},
		methods: {
			input(mark){
				this.mark = mark;
				this.isShow = true;
				this.value = this.user[mark];
			},
			goQrcode(){
				uni.navigateTo({
					url: `/packageTother/pages/user/qrCode/qrCode?imgUrl=${this.user.img_url}&name=${this.user.name}`
				})
			},
			async updateUser(mark, value){
				let user = {id: this.user.id};
				user[mark] = value;
				this.user[mark] = value;
				let {status} = await updateUser(user);
				if(!status){
					uni.showToast({
						icon: "success",
						title: "更改信息成功"
					});
					this.isShow = false;
				}
				
			},
			
			bindDateChange: function(e) {
				this.date = e.target.value;
				this.updateUser('birthday', this.date);
			},
			bindSexChange:function(e){
				this.sex = this.array[e.target.value];
				this.updateUser('sex', this.sex);
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			 
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindPickerChange(e){
				let addrArr = e.target.value;
				this.addrValue = `${addrArr[0]}-${addrArr[1]}-${addrArr[2]}`;
				this.updateUser('area', this.addrValue);
			},
			addrCode(index){
				switch (index.length){
					case 1:
						break;
					default:
						break;
				}
			},
			selfdom(){
				uni.navigateTo({
					url: '/packageTother/pages/user/userInfo/selfdom/selfdom'
				})
			},
			address(){
				uni.navigateTo({
					url: '/packageTother/pages/user/address/address'
				})
			}
		},
		onShow() {
			this.user = this.$store.state.user;
			this.date = this.user.birthday ?this.user.birthday :"请选择生日";
			this.endDate = this.getDate();
			this.addrValue = this.user.area ?this.user.area :"北京市-北京市-东城区";
		},
		components: {
			listCell,
			tuiModal
		}
	}
</script>

<style lang="scss" scoped>
.user-info-container {
	.user-title {
		padding: 30rpx 30rpx 10rpx;
		color: #999;
		font-size: 28rpx;
	}
	.user-info {
		padding-left: 30rpx;
		background-color: #fff;
		
		.item {
			display: flex;
			padding: 24rpx 36rpx 24rpx 0;
			color: #646566;
			align-items: center;
			border-bottom: 0.5rpx solid #f8f8f8;
			.title {
				width: 200rpx;
				margin-right: 40rpx;
			}
			.content {
				flex: 1;
				color: #323233;
				.photo-shell {
					width: 60rpx;
					.img {
						width: 100%;
						height: auto;
						border-radius: 50%;
						opacity: 0.5;
					}
				}
				.icon-shell {
					width: 48rpx;
					.img {
						width: 100%;
						height: auto;
					}
				}
			}
		}
	}
	.set {
		display: flex;
		justify-content: space-between;
		padding: 24rpx 36rpx 24rpx 36rpx;
		font-size: 28rpx;
		align-items: center;
		background-color: #fff;
		&:active {
			background-color: #F2F3F5;
		}
		.info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 92rpx;
			.title {
				color: #323233;
			}
			.make {
				color: #646566;
				font-size: 24rpx;
			}
		}
		.check {
			margin-right: 86rpx;
			color: #646566;
		}
	}
	.modal {
		.title {
			color: #333;
			font-size: 32rpx;
			text-align: center;
		}
		.input-shell {
			padding: 50rpx 30rpx 50rpx;
			.input {
				height: 68rpx;
				border: 2rpx solid #e5e5e5;
				font-size: 28rpx;
				color: #323233;
			}
		}
		.btn-shell {
			display: flex;
			position: relative;
			left: 0;
			right: 0;
			bottom: 0;
			border-top: 2rpx solid #e5e5e5;
			.btn {
				width: 50%;
				height: 100rpx;
				line-height: 100rpx;
				text-align: center;
				font-size: 32rpx;
			}
			.cancel {
				color: #323233;
				border-right: 2rpx solid #e5e5e5;
			}
			.confirm {
				color: #0983f6;
			}
		}
	}
}
</style>
