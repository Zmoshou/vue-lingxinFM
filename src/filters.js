const timeFormat = (time) => {

  let m = Math.floor(time / 60);
  let s = Math.floor(time % 60);

  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  return (m + ':' + s);
}

export {
  timeFormat
}