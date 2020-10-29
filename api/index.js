import instance from './config.js';

//搜索
export async function getSearchResult({keyword, order, page, pageSize}){
	return await instance.get(`/getSearchResult?keyword=${keyword}&page=${page}&pageSize=${pageSize}&order=${order}`); 
}

//礼物
export async function getGift(page=1, pageSize=10){
	return await instance.get(`/getGift?page=${page}&pageSize=${pageSize}`); 
}

//详细分类
export async function getClassify(genre){
	return await instance.get(`/getClassify?genre=${genre}`); 
}

//获取对应分类商品
export async function getClassifyGoods(aliasCode, page=1, pageSize=10){
	return await instance.get(`/getClassifyGoods?aliasCode=${aliasCode}&page=${page}&pageSize=${pageSize}`); 
}

//获取对应分类所有商品
export async function getClassifyGoodsByAll(aliasCodes, page=1, pageSize=10){
	return await instance.get(`/getClassifyGoodsByAll?aliasCodes=${aliasCodes}&page=${page}&pageSize=${pageSize}`); 
}

//热销商品
export async function getHotGoods(pageSize=10){
	return await instance.get(`/getHotGoods?pageSize=${pageSize}`); 
}

//根据状态获取商品
export async function getGoodsByStatus(status, page=1, pageSize=10){
	return await instance.get(`/getGoodsByStatus?status=${status}&page=${page}&pageSize=${pageSize}`); 
}

//根据状态获取轮播图 await getCarouselListByStatus(1);
export function getCarouselListByStatus(is_show){
    return instance.post("/getCarouselListByStatus",{is_show});
}

//笔记首页列表
export async function getHomeNoteList(pageSize=10){
	return await instance.get(`/getHomeNoteList?pageSize=${pageSize}`); 
}

// 笔记更多列表
export async function getNoteList(page=1, pageSize=10){
	return await instance.get(`/getNoteList?page=${page}&pageSize=${pageSize}`); 
}

//笔记详情
export async function getNoteDetail(n_id){
	return await instance.get(`/getNoteDetail?n_id=${n_id}`); 
}

// 商品详情
export async function getGoodsDetail(g_id){
	return await instance.get(`/getGoodsDetail?g_id=${g_id}`); 
}

//推荐商品
export async function getRecommend(pageSize=16){
	return await instance.get(`/getRecommend?pageSize=${pageSize}`); 
}

//用户订单
export async function getOrderByUserId(userId, status, keyword=-1){
	return await instance.get(`/getOrderByUserId?u_id=${userId}&status=${status}&keyword=${keyword}`); 
}

//订单详情
export async function getOrderDetails(o_id){
	return await instance.get(`/getOrderDetails?o_id=${o_id}`); 
}


//根据商品ids字符串获取商品
export async function getGoodsByIds(ids){
	return await instance.get(`/getGoodsByIds?ids=${ids}`); 
}

//***下单数据
export async function getFakingData(){
	return await instance.get('/getFakingData'); 
}

export async function wxlogin(code, userInfo){
	return await instance.post('/wxlogin', {code, userInfo}); 
}

//添加地址
export async function addAddr(addr){
	return await instance.post('/addAddr', {addr}); 
}

export async function checkToken(token){
	return await instance.get(`/checkToken?token=${token}`);
}
export async function getAddr(user_id){
	return await instance.get(`/getAddr?user_id=${user_id}`);
}

//修改订单状态
export async function updateOrderStatus(oid, status){
	return await instance.post('/updateOrderStatus', {oid, status});
}
//查询地址
export async function getOneAddr(id){
	return await instance.get(`/getOneAddr?id=${id}`);
}
//修改用户属性
export async function updateUser(user){//   {id,phone}
	return await instance.post('/updateUser', {user});
}

//修改地址
export async function updateAddr(addr){
	return await instance.post('/updateAddr', {addr});
}

//删除地址
export async function deleteAddr(id){
	return await instance.get(`/deleteAddr?id=${id}`);
}

//删除地址
export async function deleteUser(id){
	return await instance.get(`/deleteUser?id=${id}`);
}

//获取购物车列表
export async function getCartList(userId){
	return await instance.get(`/getCartList?userId=${userId}`);
}

//根据id获取规格
export async function getSpec(goodsId){
	return await instance.get(`/getSpec?goodsId=${goodsId}`);
}

//修改购物车
export async function updateCart(cart){
	return await instance.post('/updateCart', {cart});
}

//删除购物车
export async function delCart(ids){
	return await instance.post('/delCart',{ids});
}

//添加购物车
export async function addCart(cart){	//{ userId, goodsId, sellerId, count, specId }
	return await instance.post(`/addCart`, cart);
}

//修改全部购物车选择状态
export async function updateAllCart({userId, checked}){
	return await instance.post(`/updateAllCart`, {userId, checked});
}

//根据商品id获得商家id
export async function getSellerIdByGoodsIds(ids){
	return await instance.post(`/getSellerIdByGoodsIds?ids=${ids}`);
}

//添加订单
export async function addOrder(order){
	return await instance.post(`/addOrder`, {order});
}