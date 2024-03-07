import { defineStore } from 'pinia'
import http from '@/utils/request'

export const chatAnswerStore = defineStore('chatAnswer', {
  state: () => ({ answer: '' }),
  actions: {
    get() {
      return new Promise((resolve, reject) => {
        // 假设这是根据异步操作成功或失败的条件
        let condition = true
        setTimeout(() => {
          if (condition) {
            const res = `**以下是不同公司不同订单类型的相关介绍**
              1. 到货时间受许多因素影响，例如产品类型、供应商的库存、运输方式、发货地点和目的地等。对于特定订单的到货时间，您需要联系您的供应商或物流公司以获取更准确的信息。
              2. 对于国际订单，由于涉及到海关清关、运输等环节，所以时间可能会有所延迟。在这种情况下，建议您与供应商或物流公司联系，以了解具体原因和预期的交货时间。
              3. 总的来说，到货时间是一个相对复杂的问题，需要综合考虑各种因素。如果您有任何疑问或需要更详细的信息，请联系您的供应商或物流公司。`
            this.answer = res
            resolve(res) // 如果操作成功，调用resolve并传递成功的值
          } else {
            let tips = ':zzz:服务器睡着了，请重试...'
            this.answer = tips
            resolve(tips) // 如果操作失败，调用reject并传递失败的原因
          }
        }, 3000)
      })
    }
  }
})

export const toolsStore = defineStore('toolsStore', {
  state: () => ({ tools: [] }),
  actions: {
    async get(params) {
      try {
        const result = await http.get('http://localhost:8080/magicman/scene/toolsinfo', params);
        this.tools = result.dataList;
      } catch (error) {
        this.tools = [];
      }
    }
  }
})
