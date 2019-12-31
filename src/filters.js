const timeFormat = (time) => {

  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);

  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return (m + ':' + s);
}

// 数字格式化
const numFormat = (num, mode = 0) => {
  let formatNum = '';
  if (mode === 0) {
    formatNum = num >= 10000 ? (num / 10000).toFixed(1) + '万' : num
  }
  return formatNum;
}

export {
  timeFormat,
  numFormat
}