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

//热销商品
export async function getHotGoods(pageSize=10){
	return await instance.get(`/getHotGoods?pageSize=${pageSize}`); 
}

//根据状态获取商品
export async function getGoodsByStatus(status, page=1, pageSize=10){
	return await instance.get(`/getGoodsByStatus?status=${status}&page=${page}&pageSize=${pageSize}`); 
}

//笔记首页列表
export async function getHomeNoteList(pageSize=10){
	return await instance.get(`/getHomeNoteList?pageSize=${pageSize}`); 
}

// 笔记更多列表
export async function getNoteList(page=1, pageSize=10){
	return await instance.get(`/getNoteList?page=${page}&pageSize=${pageSize}`); 
}

// 商品详情
export async function getGoodsDetail(g_id){
	return await instance.get(`/getGoodsDetail?g_id=${g_id}`); 
}