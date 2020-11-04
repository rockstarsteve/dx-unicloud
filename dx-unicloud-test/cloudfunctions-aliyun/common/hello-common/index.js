// common/hello-common/index.js
function getVersion() {
  return '0.0.1'
}
function isLogin(event) {
  if(event.token == '123'){
	  return 'ok'
  } else{
	  return 'erro'
  }
}
module.exports = {
  getVersion,
  isLogin
}