const axios = require('axios');

class TtsMaker {
  async getVioceList(){
    let res = await axios({
      url: 'https://api.ttsmaker.cn/v1/get-voice-list',
      type: 'get',
      params: {
        token: 'ttsmaker_demo_token',
        language: 'en'
      }
    })
    console.log(111, res)
  }
}

const tts = new TtsMaker()
tts.getVioceList()




