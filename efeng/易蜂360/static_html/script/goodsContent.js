/*鼠标经过预览图片函数*/
function preview(img) {
	$("#preview .jqzoom img").attr("src", $(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg", $(img).attr("bimg"));
}

/*图片放大镜效果*/
$(function() {
	$(".jqzoom").jqueryzoom({
		xzoom: 380,
		yzoom: 410
	});
});

/*Tab切换效果*/
function $$(id) {
	return typeof id == "string" ? document.getElementById(id) : id;
}

window.onload = function() {
	var titleName = $$("content-hd-nav").getElementsByTagName("li");
	var tabContent = $$("content-bd").getElementsByTagName("div");
	if (titleName.length != tabContent.length) {
		return;
	}
	for (var i = 0; i < titleName.length; i++) {
		titleName[i].id = i;
		titleName[i].onmouseover = function() {
			for (var j = 0; j < titleName.length; j++) {
				titleName[j].className = "";
				tabContent[j].style.display = "none"
			}
			this.className = "status-on";
			tabContent[this.id].style.display = "block";
		}
	}
}

/*单选框效果*/
$(document).ready(function() {
	var ul2_value = "";
	$(".item-select1 .item-list li").click(function() {
		$(this).toggleClass("checked");
		$(".item-select1 .item-list li[value!='" + $(this).attr("value") + "']").removeClass("checked");

		if ($(this).attr("class") == "checked") {
			ul2_value = $(this).attr("value");
		}
	});
});

$(document).ready(function() {
	var ul2_value = "";
	$(".item-select2 .item-list li").click(function() {
		$(this).toggleClass("checked");
		$(".item-select2 .item-list li[value!='" + $(this).attr("value") + "']").removeClass("checked");

		if ($(this).attr("class") == "checked") {
			ul2_value = $(this).attr("value");
		}
	});
});

/*数字加减效果*/
function addNum() {
	
	document.getElementById("item-num").value = parseInt(document.getElementById("item-num").value) + 1;
}

function subNum() {
	if (document.getElementById("item-num").value>1) {
		document.getElementById("item-num").value = parseInt(document.getElementById("item-num").value) - 1;
	} else{
		document.getElementById("item-num").value = parseInt(document.getElementById("item-num").value);
	}
		
	}
	/*限制最小值为1*/
$(document).ready(function() {
	$("#item-num").on('keyup', function() {
		var cur = parseInt($("#item-num").val()),
			max = parseInt($("#item-num").attr("max")),
			min = parseInt($("#item-num").attr("min"));
		if (cur > max) {
			$("#item-num").val(max);
		};
		if (cur < min) {
			$("#item-num").val(min);
		}
	})
});