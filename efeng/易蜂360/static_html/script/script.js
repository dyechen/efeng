// JavaScript Document	
window.onload = function() {
	document.getElementById('temp_2').getElementsByTagName('li').item(0).style.marginLeft = '0px';
}

window.onload = function WriteYearOptions() {
	var date = new Date(),
		NowYear = date.getFullYear();
	Year = "";
	Month = "";
	for (i = 0; i < 20; i++) {
		Year += "<option value='" + (NowYear + i) + "'>";
		Year += NowYear + i;
		Year += "</option>";
		if (i < 12) {
			Month += "<option value='" + (i + 1) + "'>";
			Month += i + 1;
			Month += "</option>";
		} else {
			Month = Month;
		}
	}
	$("select#yearselect").append(Year);
	$("select#Monthselect").append(Month);
}

function getValue(textid, butid) {
	document.getElementById(textid).value = document.getElementById(butid).value;
}

function settab(name, number, n) {
	for (i = 1; i <= n; i++) {
		var tab = document.getElementById(name + i);
		var tabdiv = document.getElementById(name + "div" + "_" + i);
		tab.className = i == number ? "loc" : "";
		tabdiv.style.display = i == number ? "block" : "none";
	}
}


/*分享*/
window._bd_share_config = {
	"common": {
		"bdSnsKey": {},
		"bdText": "",
		"bdMini": "2",
		"bdMiniList": false,
		"bdPic": "",
		"bdStyle": "0",
		"bdSize": "32"
	},
	"share": {}
};
with(document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5)];