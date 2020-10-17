import instance from './config.js';

export async function getSearchResult(keyword, page=1, pageSize=10){
	return await instance.get(`/getSearchResult?keyword=${keyword}&page=${page}&pageSize=${pageSize}`); 
}

export async function getGift(page=1, pageSize=10){
	return await instance.get(`/getGift?page=${page}&pageSize=${pageSize}`); 
}

export async function getClassify(genre){
	return await instance.get(`/getClassify?genre=${genre}`); 
}

export async function getClassifyGoods(aliasCode){
	return await instance.get(`/getClassifyGoods?aliasCode=${aliasCode}`); 
}

export async function getHotGoods(pageSize=10){
	return await instance.get(`/getHotGoods?pageSize=${pageSize}`); 
}
