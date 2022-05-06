import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import api from './api' //引入定义的mock模拟接口

export function setupMock () {
  // 这个是用来注册mock的，当在生产中使用mock时，很重要
  createProdMockServer([...api])
}