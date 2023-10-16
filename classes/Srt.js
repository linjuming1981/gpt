const ChatGpt = require('./ChatGpt.js');
const fs = require('fs');

class Srt {
  fileToItems(file) {
    // 读取字幕文件
    const subtitleData = fs.readFileSync(file, 'utf8');

    // 使用正则表达式匹配并提取数据
    const regex = /(\d+)\s+([\d:,]+)\s+-->\s+([\d:,]+)\s+([\s\S]+?)(?=\n|$)/g;
    const subtitles = [];
    let match;

    while ((match = regex.exec(subtitleData)) !== null) {
      const id = parseInt(match[1]);
      const time = match[2] + ' --> ' + match[3];
      const content = match[4].trim();

      subtitles.push({ id, time, content });
    }
    return subtitles;
  }

  itemsToFile(subtitles) {
    let arr = subtitles.map((n) => {
      return `${n.id}\n${n.time}\n${n.cnContent}`;
    });
    let code = arr.join('\n\n');
    console.log(code);
    fs.writeFileSync('../3_output.srt', code);
  }

  getDeeplEnConts(file) {
    let subtitles = this.fileToItems(file);
    let conts = subtitles.map((n) => {
      return `[${n.id}] ${n.content}`
    });
    conts = conts.join('\n-------\n');
    // fs.writeFileSync('../output.srt', conts);
    return conts;
  }

  deeplTranToSrt(deeplFile, orgSrtFile){
    const code = fs.readFileSync(deeplFile, 'utf8');
    let arr = code.split('-------').map(n => n.trim())
    const map = {}
    arr.forEach(n => {
      let [,id, tran] = n.match(/^\[([\d]+)\] (.*)$/)
      map[id] = tran
    })
    // console.log(map)

    const subtitles = this.fileToItems(orgSrtFile)
    subtitles.forEach(n => {
      n.tranText = map[n.id]
    })
    console.log(subtitles)
    arr = subtitles.map(n => {
      return `${n.id}\n${n.time}\n${n.tranText}`
    })
    let srtCont = arr.join('\n\n')
    console.log(srtCont)
    fs.writeFileSync('../output_srt.srt', srtCont)
  }

  async translateFile(file) {
    let cont = this.getConts(file);
    return;
    let gpt = new ChatGpt('translate');
    let resText = await gpt.post(cont);
    let arr = resText.match(/\{[^\}]+\}/g);

    let subtitles = this.fileToItems(file);
    arr.forEach((n) => {
      n.replace(/^\{(\d+)\|(.*)\}$/, (s, s1, s2) => {
        subtitles[s1 - 1].tran = s;
        subtitles[s1 - 1].cnContent = s2;
      });
    });

    this.itemsToFile(subtitles);

    // console.log(subtitles);
  }
}

module.exports = Srt;

// ---------
let srt = new Srt();
// let codes = srt.translateFile('../srts/4.srt');
// console.log(codes);

srt.deeplTranToSrt('../output_cn.srt', '../srts/4.srt')

/*
下面我将提供一段字幕文件中的代码，请帮我翻译成中文（序号和时间不要翻译，字幕内容行翻译），翻译后句子要通顺易懂
 */