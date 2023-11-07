const axios = require('axios')

class PlayGroundAi {
  async createImg(prompt) {
    let res = await axios({
      url: 'https://playgroundai.com/api/models/v2',
      method: 'post',
      data: { "schema": "image_gen", "prompt": "/imagine prompt: 3d animation, personality: [Illustrate a close-up shot of a middle-aged man, dressed in animal skins, with a robust physique reminiscent of a tiger or leopard. His weathered bronze skin and loose black hair should reflect a rugged and authoritative appearance. His sharp eyes should convey a sense of vigilance and attentiveness as he observes and guides the children. The setting should depict a sense of mentorship and discipline, with the man exuding a strong and nurturing presence]unreal engine, hyper real --q 2 --v 5.2 --ar 16:9", "negativePrompt": "", "negativePromptType": "custom", "guidance_scale": 7, "steps": 50, "high_noise_frac": 0.6, "seed": 149790792, "filter_id": "none", "scheduler": "PLMS", "num_images": 1, "modelType": "stable-diffusion-xl", "statusUUID": "7706375d-9eab-4f12-ba1e-852f949ed34d", "width": 512, "height": 512 }
    })
    console.log(111, res) // lily id 2541
  }

}

let pgAi = new PlayGroundAi()
pgAi.createImg()