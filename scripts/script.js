
Array.from(document.querySelectorAll('input')).forEach(input => {
  input.addEventListener('keyup', () => {
    updateUrl();
  })
  input.addEventListener('change', () => {
    updateUrl();
  })
})


function updateUrl() {

  var params = Array.from(document.querySelectorAll('[type="text"][data-qp]')).map(el => {
    return el.getAttribute('data-qp') + '=' + el.value;
  }).join('&');

  params += '&' + Array.from(document.querySelectorAll('[type="checkbox"][data-qp]')).map(el => {
    return el.getAttribute('data-qp') + '=' + (el.checked ? '1' : '0');
  }).join('&');

  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
  window.history.pushState({path:newurl},'',newurl);

}

function updateInputs() {

  Array.from(document.querySelectorAll('[type="text"][data-qp]')).forEach(input => {
    input.value = new URL(document.location.href).searchParams.get(input.getAttribute('data-qp'))
  })

  Array.from(document.querySelectorAll('[type="checkbox"][data-qp]')).forEach(input => {
    input.checked = (parseInt(new URL(document.location.href).searchParams.get(input.getAttribute('data-qp'))) ? true : false);
  })

}

function makeNotice() {
  var apikey = new URL(document.location.href).searchParams.get('apiKey');
  var noticeid = new URL(document.location.href).searchParams.get('notice_id');
  var global = (parseInt(new URL(document.location.href).searchParams.get('global')) ? true : false);
  var staging = (parseInt(new URL(document.location.href).searchParams.get('staging')) ? true : false);

  writeSDK(apikey, noticeid, global, staging)

}

window.onload = function() {
  if(new URL(document.location.href).searchParams.get('apiKey') && new URL(document.location.href).searchParams.get('notice_id')) {
    updateInputs()
    makeNotice()
  }
}


window.didomiOnReady = window.didomiOnReady || [];
window.didomiOnReady.push(function (Didomi) {

  document.getElementById('org').innerHTML = Didomi.getConfig().app.name;

});
