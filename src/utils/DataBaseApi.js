import Ajax from "./Ajax"
export default {
  // 登录

  async getTablelist (params) {
    let data = await Ajax.get('database/getTablelist.json', params)
    return data
  },

  async getTemplatelist (params) {
    let data = await Ajax.get('database/getTemplatelist.json', params)
    return data
  },

  async updateTemplate (params) {
    let data = await Ajax.post('database/updateTemplate.json', params)
    return data
  },

  async createTemplate (params) {
    let data = await Ajax.post('database/createTemplate.json', params)
    return data
  }
  


}