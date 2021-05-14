(function() {

  var view = `
    <style>
      body{
        margin:0;
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
      #button{
        display:block;
        width:40px;
        height:auto;
        cursor:pointer;
      }

    </style>

    <div id="wrapper">
      <div id="content">
        <div>
          blah
        </div>
      </div>
      <div>
        <img id="button" src="https://simpleicon.com/wp-content/uploads/rocket.png">
      </div>
    </div>
  `


  var iframe = document.createElement('iframe');
  iframe.setAttribute('id', 'ddo-iframe');
  iframe.setAttribute('style', 'display:block;width:400px;position:fixed;top:50%;left:0;transform:translate3d(calc(-100% + 50px), -50%, 0);border:none;transition-duration:0.3s;')
  document.body.appendChild(iframe)

  var _doc = iframe.contentWindow.document;
  var _win = iframe.contentWindow;
  _doc.body.innerHTML = view;

  _doc.getElementById('button').addEventListener('click', (e) => {
    e.view.frameElement.classList.toggle('ddo-ifr-visible');
  })

  var styles = `
    #ddo-iframe.ddo-ifr-visible { transform:translate3d(calc(-0% + 50px), -50%, 0)!important; }
  `;
  var styleSheet = document.createElement("style")
  styleSheet.type = "text/css"
  styleSheet.innerText = styles
  document.head.appendChild(styleSheet)


})();
