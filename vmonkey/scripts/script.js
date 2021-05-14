function goDdo() {

  var keysNobj = [
    ['Didomi', '.getConfig().app.apiKey'],
    ['didomiRemoteConfig', '.notices[0].notice_id']
  ]


  var view = `
    <style>

      :root {
        --grey-text: #999999;
        --blue: #359cbf;
      }
      body{
        margin:1px;
        font-family: 'ProximaNovaCond', Arial, sans-serif;
      }
      .dido-line{
        margin:10px 0 20px 0;
      }
      #wrapper{
        width:100%;
        height:100%;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding: 10px 0px 10px 10px;
        box-sizing: border-box;
      }
      #info{
        height:80%;
        overflow:scroll;
      }
      #content{
        width:calc(100% - 60px);
        margin:5px 0 5px 5px;
        height:100%;
        background-color:#FFFFFF;
        box-shadow:1px 1px 5px rgba(0,0,0,0.5);
        border-radius:5px;
        box-sizing: border-box;
        padding: 20px 10px;
      }
      #gotosandbox{
        margin: 10px auto 10px auto;
        width: 50%;
        text-align: center;
        background-color: var(--blue);
        color: #FFFFFF;
        padding: 10px 0;
        cursor:pointer;
      }
      #button{
        display:block;
        width:40px;
        height:auto;
        cursor:pointer;
      }
      .dido-key{
        color: var(--grey-text);
        pointer-events:none;
      }
      .dido-val{
        color: var(--blue);
        margin:8px 0px;
      }

    </style>

    <div id="wrapper">
      <div id="content">
        <div id="info">
        </div>
        <div id="gotosandbox">Go to Sandbox</div>
      </div>
      <div>
        <img id="button" src="https://simpleicon.com/wp-content/uploads/rocket.png">
      </div>
    </div>
  `

  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'ddo-iframe');
  iframe.setAttribute('style', 'height:300px;display:block;width:400px;position:fixed;top:50%;left:0;transform:translate3d(calc(-100% + 50px), -50%, 0);border:none;transition-duration:0.3s;z-index:2147483647;')
  document.body.appendChild(iframe)

  var _doc = iframe.contentWindow.document;
  var _win = iframe.contentWindow;
  _doc.body.innerHTML = view;

  _doc.getElementById('button').addEventListener('click', (e) => {
    e.view.frameElement.classList.toggle('ddo-ifr-visible');
  });

  _doc.getElementById('gotosandbox').addEventListener('click', function() {
    var qs = Array.from(_doc.querySelectorAll('[data-prop]')).map(el => {
      return el.getAttribute('data-prop') + '=' + el.innerHTML;
    }).join('&')
    window.open('https://dvdtsr.github.io/allCMP/?' + qs)
  })

  function writeLine(arr) {
    var line = document.createElement('div');
    line.setAttribute('class', 'dido-line');
    var lline = document.createElement('div');
    lline.setAttribute('class', 'dido-span dido-key');
    lline.innerHTML = arr[1].substring(arr[1].lastIndexOf('.') +1 );
    line.appendChild(lline);
    var rline = document.createElement('div');
    rline.setAttribute('class', 'dido-span dido-val');
    rline.setAttribute('data-prop', arr[1].substring(arr[1].lastIndexOf('.') +1 ))
    rline.innerHTML = eval([arr[0]] + [arr[1]]);
    line.appendChild(rline);
    _doc.getElementById('info').appendChild(line);
  }

  keysNobj.forEach(function(arr) {
    writeLine(arr)
  })

  var styles = `
    #ddo-iframe.ddo-ifr-visible { transform:translate3d(calc(-0% + 50px), -50%, 0)!important; }
  `;
  var styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)


  ///*******///
/*

  var keysNobj = [
    ['Didomi', '.getConfig().app.apiKey'],
    ['didomiRemoteConfig', '.notices[0].notice_id']
  ]


  var container = document.createElement('dido-el');
  container.setAttribute('id', 'dido-container-121216');

  var info = document.createElement('dido-el');
  info.setAttribute('id', 'dido-info-121216');
  container.appendChild(info);

  var goto = document.createElement('div');
  goto.setAttribute('id', 'gotosandbox');
  goto.innerHTML = 'Go to SandBox';
  container.appendChild(goto);

  var btn = document.createElement('dido-el');
  btn.setAttribute('id', 'dido-btn-121216');
  document.body.appendChild(btn);

  document.body.appendChild(container);

  goto.addEventListener('click', function() {
    window.open('https://dvdtsr.github.io/allCMP/?apikey=' + Didomi.getConfig().app.apiKey + '&noticeid=' + didomiRemoteConfig.notices[0].notice_id)
    document.getElementById('dido-container-121216').classList.add('dido-visible-121216');
  })

  btn.addEventListener('click', function() {
    document.getElementById('dido-container-121216').classList.toggle('dido-visible-121216')
  })

  function writeLine(arr) {
    var line = document.createElement('dido-el');
    line.setAttribute('class', 'dido-line-121216');
    var lline = document.createElement('dido-el');
    lline.setAttribute('class', 'dido-span-121216 dido-key-121216');
    lline.innerHTML = arr[1].substring(arr[1].lastIndexOf('.') +1 );
    line.appendChild(lline);
    var rline = document.createElement('dido-el');
    rline.setAttribute('class', 'dido-span-121216 dido-val-121216');
    rline.innerHTML = eval([arr[0]] + [arr[1]]);
    line.appendChild(rline);
    info.appendChild(line);
  }

  keysNobj.forEach(function(arr) {
    writeLine(arr)
  })
*/

///*******///


};


window.count121216 = 0;
window.checkExist = window.checkExist || setInterval(function() {
   if(typeof Didomi !== 'undefined') {

    goDdo();
     clearInterval(checkExist);
   }
  if(count121216 > 10) {
    clearInterval(checkExist);

  }
  count121216 = count121216 + 1
}, 1000);
