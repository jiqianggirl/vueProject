const baseSize=100
function setRem() {
  const scale=document.documentElement.clientWidth/750;
  document.documentElement.style.fontSize=(baseSize*scale)+'px';
}
setRem();
window.onresize=function () {
  setRem();
}
