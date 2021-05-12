
Array.from(document.querySelectorAll('input')).forEach(input => {
  input.addEventListener('keyup', () => {
    updateUrl();
  })
})


function updateUrl() {

  var params = Array.from(document.querySelectorAll('[data-qp]')).map(el => {
    return el.getAttribute('data-qp') + "=" + el.value;
  }).join('&')

  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
  window.history.pushState({path:newurl},'',newurl);

}

function makeNotice() {
  var apikey = new URL(document.location.href).searchParams.get('apikey');
  var noticeid = new URL(document.location.href).searchParams.get('noticeid');

  writeSDK(apikey, noticeid)

}

document.getElementById('go').onclick = makeNotice;

window.onload = function() {
  if(new URL(document.location.href).searchParams.get('apikey') && new URL(document.location.href).searchParams.get('noticeid')) {
    makeNotice()
  }
}
