import Ajax from "./Ajax"
export default {
  // 登录

  async getTablelist (params) {
    let data = await Ajax.get('database/getTablelist.json', params)
    return data
  }


}