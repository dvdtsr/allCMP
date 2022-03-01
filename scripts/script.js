var textArea = document.getElementsByTagName('textarea')[0];

function setCheckedStatus(el) {
  if(el.checked) {
    el.closest('.toggle_container').setAttribute('data-checked', 'true')
  }
  else{
    el.closest('.toggle_container').setAttribute('data-checked', 'false')
  }
}


Array.from(document.querySelectorAll('input')).forEach(input => {
  input.addEventListener('keyup', () => {
    updateUrl();
  })
  input.addEventListener('change', (e) => {
    setCheckedStatus(e.target);
    updateUrl();
  })
})

textArea.addEventListener('keyup', () => {
  updateUrl();
})




function updateUrl() {

  var params = Array.from(document.querySelectorAll('[type="text"][data-qp]')).map(el => {
    if(el.hasAttribute("data-encode")) {
      return el.getAttribute('data-qp') + '=' + btoa(encodeURIComponent(el.value))
    }
    return el.getAttribute('data-qp') + '=' + el.value;
  }).join('&');

  params += '&' + Array.from(document.querySelectorAll('[type="checkbox"][data-qp]')).map(el => {
    return el.getAttribute('data-qp') + '=' + (el.checked ? '1' : '0');
  }).join('&');

  if(isJSONvalid(textArea.value)) {
    var jsonStr = textArea.value;
    jsonStr = jsonStr.replace(/\s\s+/g, ' ');
    params += '&config=' + btoa(jsonStr);
  }

  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + params;
  window.history.pushState({path:newurl},'',newurl);

}

function updateInputs() {

  Array.from(document.querySelectorAll('[type="text"][data-qp]')).forEach(input => {
    if(input.hasAttribute("data-encode")) {
      input.value = decodeURIComponent(atob(new URL(document.location.href).searchParams.get(input.getAttribute('data-qp'))))
    }
    else{
      input.value = new URL(document.location.href).searchParams.get(input.getAttribute('data-qp'))
    }
  })

  Array.from(document.querySelectorAll('[type="checkbox"][data-qp]')).forEach(input => {
    input.checked = (parseInt(new URL(document.location.href).searchParams.get(input.getAttribute('data-qp'))) ? true : false);
  })

  if(new URL(document.location.href).searchParams.get('config')) {
    textArea.value = atob(new URL(document.location.href).searchParams.get('config'));
    prettyPrint();
  }

}

function makeNotice() {
  var apikey = new URL(document.location.href).searchParams.get('apiKey');
  var noticeid = new URL(document.location.href).searchParams.get('notice_id');
  var global = (parseInt(new URL(document.location.href).searchParams.get('global')) ? true : false);
  var staging = (parseInt(new URL(document.location.href).searchParams.get('staging')) ? true : false);

  writeSDK(apikey, noticeid, global, staging)

}

/* Custom JSON */

function prettyPrint() {
    var ugly = textArea.value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 2);
    textArea.value = pretty;
}


function isJSONvalid(text) {
  try {
    JSON.parse(text);
  } catch (e) {
    return false;
  }
  return true;
}

textArea.addEventListener('keyup', function() {
  if(!isJSONvalid(this.value)){
    this.setAttribute('class', 'invalid')
  }
  else{
    this.setAttribute('class', '')
  }
})


window.onload = function() {
  if(new URL(document.location.href).searchParams.get('apiKey') && new URL(document.location.href).searchParams.get('notice_id')) {
    updateInputs()
    makeNotice()
  }


  if(new URL(document.location.href).searchParams.get('config') && parseInt(new URL(document.location.href).searchParams.get('apply_conf'))) {
    window.didomiConfig = JSON.parse(atob(new URL(document.location.href).searchParams.get('config')));
  }

  Array.from(document.querySelectorAll('[type="checkbox"][data-qp]')).forEach(function(el) {
    setCheckedStatus(el)
  })
}

if(new URL(document.location.href).searchParams.get('extsrc') && parseInt(new URL(document.location.href).searchParams.get('loadext'))) {
  var src = decodeURIComponent(atob(new URL(document.location.href).searchParams.get('extsrc')));
  var element = document.createElement('div');
  switch(true) {
    case /.*\.js$/.test(src):
      element = document.createElement('script');
      element.src = src;
      element.type = 'text/javascript';
      break;
    case /.*\.css$/.test(src):
      element = document.createElement('link');
      element.href = src;
      element.type = 'text/css';
      element.ref = 'stylesheet';
      break;
    default :
      element.id = 'extsrc-message';
      element.innerHTML = 'unable to load external source, check the file extension: only .css and .js accepted (click to hide)';
      break;
  }
  document.body.appendChild(element);
}


document.addEventListener('click', function(e) {
  if(e.target.getAttribute('id') == 'extsrc-message') {
    document.getElementById('extsrc-message').parentNode.removeChild(document.getElementById('extsrc-message'));
  }
})
