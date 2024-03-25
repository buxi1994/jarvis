import { ref, nextTick } from 'vue'
import { defineStore } from 'pinia'
import http from '@/utils/request'
import { sleep } from '@/utils/index'

export const useChatAnswerStore = defineStore('chatAnswer', () => {
  const chatAnswer = ref('')
  const chatStatus = ref('done')
  async function getChatAnswer(question) {
    // 假设这是根据异步操作成功或失败的条件
    let condition = true
    await sleep(1000)
    editStatus('loading')
    await sleep(1000)
    const res1 = `**以下是不同公司不同订单类型的相关介绍**
    1. 到货时间受许多因素影响，例如产品类型、供应商的库存、运输方式、发货地点和目的地等。对于特定订单的到货时间，您需要联系您的供应商或物流公司以获取更准确的信息。
    2. 对于国际订单，由于涉及到海关清关、运输等环节，所以时间可能会有所延迟。在这种情况下，建议您与供应商或物流公司联系，以了解具体原因和预期的交货时间。
    3. 总的来说，到货时间是一个相对复杂的问题，需要综合考虑各种因素。如果您有任何疑问或需要更详细的信息，请联系您的供应商或物流公司。\n\n${new Date()}`
    editAnswer(res1)
    await sleep(6000)
    const res2 = `**以下是不同公司不同订单类型的相关介绍**
                  1. 到货时间受许多因素影响，例如产品类型、供应商的库存、运输方式、发货地点和目的地等。对于特定订单的到货时间，您需要联系您的供应商或物流公司以获取更准确的信息。
                  2. 对于国际订单，由于涉及到海关清关、运输等环节，所以时间可能会有所延迟。在这种情况下，建议您与供应商或物流公司联系，以了解具体原因和预期的交货时间。
                  3. 总的来说，到货时间是一个相对复杂的问题，需要综合考虑各种因素。如果您有任何疑问或需要更详细的信息，请联系您的供应商或物流公司。\n\n${new Date()}`
    editAnswer(res2)
    editStatus('done')
  }
  async function stopChatAnswer() {
    await sleep(1000);
    editStatus('reload');
  }
  function editStatus(value) {
    chatStatus.value = value
  }
  function editAnswer(value) {
    chatAnswer.value += value
  }
  function reset() {
    chatAnswer.value = "";
    chatStatus.value = "done";
  }
  return { chatAnswer, chatStatus, getChatAnswer, editStatus, stopChatAnswer,reset }
})

// TODO setup
export const useToolsStore = defineStore('tools', {
  state: () => ({ tools: [] }),
  actions: {
    async get(params = {}) {
      try {
        params.type = 'link,action'
        params.relation = window.location.href
        const result = await http.get('https://localhost:8090/magicman/scene/toolsinfo', params)
        this.tools = result.dataList
      } catch (error) {
        this.tools = []
      }
    }
  }
})

// TODO setup
export const useRecommendStore = defineStore('recommend', {
  state: () => ({ recommend: [] }),
  actions: {
    async get(params = {}) {
      try {
        params.type = 'recommend'
        params.relation = window.location.href
        const result = await http.get('https://localhost:8090/magicman/scene/toolsinfo', params)
        this.recommend = result.dataList
      } catch (error) {
        this.recommend = []
      }
    }
  }
})
