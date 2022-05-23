import request from '@/utils/request'

const api_name = '/admin/hosp/hospital'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  //根据dictCode获取下级节点
  findByDictCode(dictCode){
    return request({
      url: `/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },

  //根据上级id获取子节点数据列表
  findByParentId(parentId){
    return request({
      url: `/admin/cmn/dict/findByParentId/${parentId}`,
      method: 'get'
    })
  },

  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'get'
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/show/${id}`,
      method: 'get'
    })
  },

  getByHosname(hosname) {
    return request({
      url: `/api/hosp/hospital/findByHosname/${hosname}`,
      method: 'get'
    })
  }
}
