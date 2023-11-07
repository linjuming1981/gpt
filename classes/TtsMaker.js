const axios = require('axios');

class TtsMaker {
  async getVioceList(){
    let res = await axios({
      url: 'https://api.ttsmaker.cn/v1/get-voice-list',
      method: 'get',
      params: {
        token: 'ttsmaker_demo_token',
        language: 'en'
      }
    })
    console.log(111, res) // lily id 2541
  }

  async createTtsOrder(){
    const params = {
      token: 'ttsmaker_demo_token',
      text: `Shikamura, located in the vast Cangmang Mountain Range, is surrounded by towering peaks and deep valleys, with vast mountains standing tall.

      In the early morning, the glow of the sunrise shimmers like scattered fragments of gold, bathing the people in a warm embrace.
      
      A group of children, ranging from four to fifteen years old, numbering in the dozens, are facing the sunrise in the open space in front of the village, engaged in vigorous exercises with lively voices. Each young face is filled with earnestness, the older ones exuding a fierce spirit, while the younger ones imitate with precision.
      
      A middle-aged man with a robust physique akin to that of a tiger or leopard is dressed in animal skins. His skin has a weathered bronze hue, and his black hair falls loosely. His sharp eyes sweep over each and every child, diligently guiding them.`,
      // text: 'Test Api',
      voice_id: 2541,
      audio_format: 'mp3',
      audio_speed: 1.0,
      audio_volume: 0,
      text_paragraph_pause_time: 0,
    }

    // console.log(JSON.stringify(params, null, 2))
    // return 


    let res = await axios({
      url: 'https://api.ttsmaker.cn/v1/create-tts-order',
      method: 'post',
      data: params
    })

    console.log(222, JSON.stringify(res.data, null, 2))

  }
}

const tts = new TtsMaker()
// tts.getVioceList()
tts.createTtsOrder()




