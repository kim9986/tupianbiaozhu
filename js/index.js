var pic = document.getElementById("importpic"),
      x_coor = document.getElementById("x_coor"),
      y_coor = document.getElementById("y_coor"),
      w_coor = document.getElementById("w_coor"),
      h_coor = document.getElementById("h_coor"),
      wplace = document.getElementById("workarea"),
      img = document.getElementsByTagName("image"),
      showarea = document.getElementById("showCode"),
      content = document.getElementById("showCode"),
      tool_rect = document.getElementById("tool_rect"),
      tool_eras = document.getElementById("tool_eras"),
      mleft = $("#importpic").offset().left,
      mtop = $("#importpic").offset().top,
      x1 = null, x2 = null, x3 = null, x4 = null,
      y1 = null, y2 = null, y3 = null, y4 = null,
      arr = [], rect = null, xyarr = [];

img[0].setAttribute("id", "svg_1");
img[0].x.baseVal.value = 0;
img[0].y.baseVal.value = 0;
img[0].width.baseVal.value = 640;
img[0].height.baseVal.value = 480;

document.ondragstart=function() {
    return false;
}

tool_rect.onclick = function () {
        pic.addEventListener("mousedown", function (e) {
            rect = document.createElementNS(this.namespaceURI, "path");
            rect._d = "M" + (e.clientX-mleft) + "," + (e.clientY-mtop);
            rect._d2  = "H" + (e.clientX-mleft) + "Z";
            x1 = e.clientX;
            y1 = e.clientY;
            y2 = e.clientY;
            x4 = e.clientX;
            this.appendChild(rect);
        }, false);

        pic.addEventListener("mousemove", function (e) {
            e.preventDefault();
            if (rect) {
                var d = rect._d + "H" + (e.clientX-mleft) + "V" + (e.clientY-mtop) + rect._d2;
                x3 = x2 = e.clientX;
                y3 = y4 = e.clientY;
                rect.setAttribute("d", d);
                rect.setAttribute("style", "stroke:red;stroke-width:1px;fill-opacity:0;");
            }
        }, false);

        wplace.addEventListener("mouseup", function (e) {
            rect = null;
            xyarr = [];
            xyarr.push(x1+","+y1);
            xyarr.push(x3-x1);
            xyarr.push(y3-y1);
            arr.push(xyarr);
            x_coor.value = x1;
            y_coor.value = y1;
            w_coor.value = x3-x1;
            h_coor.value = y3-y1;
        }, false);

        pic.addEventListener("mouseleave", function (e) {
            rect = null;
        }, false);
}


x_coor.addEventListener("change", function (e) {
    console.log(x_coor.value);

}, false)



tool_eras.onclick = function () {
        var newArr = arr.splice(0,arr.length);
        pic.addEventListener("mousedown", function (e) {
            for (var j = 0;j < newArr.length;j++) {
                var x1_coor = parseInt(newArr[j][0].split(",")[0]);
                var y1_coor = parseInt(newArr[j][0].split(",")[1]);
                var x2_coor = x1_coor + newArr[j][1];
                var y2_coor = y1_coor + newArr[j][2];
                if (((x1_coor < e.clientX) && (e.clientX < x2_coor)) && ((y1_coor < e.clientY) && (e.clientY < y2_coor))) {
                    var chose_d = "M" + (x1_coor-mleft) + "," + (y1_coor-mtop) + "H" + (x2_coor-mleft) + "V" + (y2_coor-mtop) + "H" + (x1_coor-mleft) + "Z";
                    for (var o = 0;o < $("path").length;o++) {
                        if (chose_d === $("path")[o].getAttribute("d")) {
                            $("path")[o].remove();
                        }
                    }
                }
            }
        console.log(this);
        }, false);
}

$("#reset").on('click', function() {
    window.location.reload();
});

$("#submit").on("click", function() {
    console.log(arr);
    console.log(pic);
})

// $("#code").on("click", function () {
//     $("#show").attr("style", "display:inline-block;");
//     $("#showCode").text($("#svgroot")[0].innerHTML);
// })

// $("#copy").on("mousedown", function () {
//     $("#copy").attr("style", "background:grey;");
//     content.select();
//     document.execCommand("Copy");
// })

// $("#copy").on("mouseup", function () {
//     $("#copy").attr("style", "background:#EBE2E2;");
// })

// $("#close").on('click', function () {
//     $("#show").attr("style", "display:none;")
// });

