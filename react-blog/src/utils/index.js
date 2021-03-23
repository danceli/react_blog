function getFormatTime() {
  let date = new Date();
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let month = date.getMonth();
  let year = date.getFullYear();
  let day = date.getDate();
  return `${months[month]} ${day},${year}`

}
function filterTime(str) {
  let now = Date.now();
  let itemTime = parseInt(str); 
  let diff = Math.floor((now - itemTime) / 1000);
  if(diff < 180 ) {
    return '现在'
  } else if(diff < 3600 && diff > 180) {
    return Math.floor(diff / 60) + '分钟前';
  } else if(diff < 86400 && diff > 3600) {
    return Math.floor(diff / 86400) + '小时前'
  } else if(diff < (86400 * 30) && diff > 86400) {
    return Math.floor(diff / 86400) + '天前'
  } else if(diff < (86400 * 30 * 24) && diff > (86400 * 30)) {
    return Math.floor(diff / (86400 * 30)) + '月前'
  }
}

export { getFormatTime, filterTime }