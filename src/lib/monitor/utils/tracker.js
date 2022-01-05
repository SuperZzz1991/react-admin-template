import userAgent from 'user-agent'

function getExtraData() {
  return {
    title: document.title,
    url: window.location.href,
    timestamp: Date.now(),
    userAgent: userAgent.parse(navigator.userAgent).name
  }
}
//gif图片做上传图片速度快没有跨域问题，
class SendTracker {
  // send(data = {}) {
  //   let extraData = getExtraData();
  //   let logInfo = { ...extraData, ...data };

  //   // 图片打点
  //   const img = new window.Image();
  //   img.src = `${feeTarget}?d=${encodeURIComponent(JSON.stringify(logInfo))}`;
  // }
  send(data = {}) {
    let extraData = getExtraData()
    let logInfo = { ...extraData, ...data }
    console.log('SendTracker', logInfo)
  }
}

export default new SendTracker();
