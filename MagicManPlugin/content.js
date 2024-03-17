const pluginDiv = document.createElement('div');
pluginDiv.id = "magic_man";
pluginDiv.setAttribute("style", "position: absolute;z-index: 99999;");

document.body.appendChild(pluginDiv);

var script = document.createElement('script');
script.type='module';
script.src = 'https://localhost:8090/magicman-ui/plugin/dist/assets/index.js'
document.head.appendChild(script);


var link = document.createElement('link');
link.rel='stylesheet';
link.href = 'https://localhost:8090/magicman-ui/plugin/dist/assets/style.css'
document.head.appendChild(link);