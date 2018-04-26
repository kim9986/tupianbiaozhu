var pic = document.getElementById("importpic"),
      x_coor = document.getElementById("xCoor"),
      y_coor = document.getElementById("yCoor"),
      w_coor = document.getElementById("wCoor"),
      h_coor = document.getElementById("hCoor"),
      wplace = document.getElementById("workarea"),
      img = document.getElementsByTagName("image"),
      showarea = document.getElementById("showCode"),
      content = document.getElementById("showCode"),
      tool_rect = document.getElementById("tool_rect"),
      tool_eras = document.getElementById("tool_eras"),
      tool_sele = document.getElementById("tool_sele"),
      mleft = $("#importpic").offset().left,
      mtop = $("#importpic").offset().top,
      x1 = null, x2 = null, x3 = null, x4 = null, j = 0,
      y1 = null, y2 = null, y3 = null, y4 = null, o = 0,
      width = null, height = null, x1_coor = null,
      y1_coor = null, x2_coor = null, y2_coor = null,
      chose_x = null, chose_y = null, chose_w = null,
      chose_h = null, int_x = null, int_y = null, int_w = null,
      int_h = null, arr = [], rect = null, xyarr = [], newArr = [];

img[0].setAttribute("id", "svg_1");
img[0].x.baseVal.value = 0;
img[0].y.baseVal.value = 0;
img[0].width.baseVal.value = 640;
img[0].height.baseVal.value = 480;

document.ondragstart=function() {
    return false;
}

var e, scrollX, scrollY, x, y;
tool_rect.onclick = function () {
    var rect_x,rect_y;
    pic.onmousedown = function (event) {
        e = event || window.event;
        scrollX = document.documentElement.scrollLeft || $("#workarea").scrollLeft();
        scrollY = document.documentElement.scrollTop || $("#workarea").scrollTop();
        console.log(scrollX);
        console.log(scrollY);
        x = e.clientX + scrollX;
        y = e.clientY + scrollY;
        console.log(e.clientY);
        console.log(e.pageY);
        console.log(x, y);
        rect = document.createElementNS(this.namespaceURI, "rect");
        rect_x = x-mleft;
        rect_y  = y-mtop;
        x1 = x;
        y1 = y;
        y2 = y;
        x4 = x;
        // console.log(rect_x, rect_y);
        // console.log(x1, y1);
        this.appendChild(rect);
    }

    pic.onmousemove = function (e) {
        e.preventDefault();
        e = event || window.event;
        scrollX = document.documentElement.scrollLeft || $("#workarea").scrollLeft();
        scrollY = document.documentElement.scrollTop || $("#workarea").scrollTop();
        x = e.clientX + scrollX;
        y = e.clientY + scrollY;
        console.log(rect);
        if (rect) {
            x3 = x2 = x;
            y3 = y4 = y;
            width = x3-x1;
            height = y3-y1;
            if ((width > 0) && (height > 0)) {
                rect.setAttribute("x", rect_x);
                rect.setAttribute("y", rect_y);
                rect.setAttribute("width", width);
                rect.setAttribute("height", height);
                rect.setAttribute("style", "stroke:red;stroke-width:1px;fill-opacity:0;");
                x_coor.value = rect_x;
                y_coor.value = rect_y;
                w_coor.value = width;
                h_coor.value = height;     
            }
        }
    }

    wplace.onmouseup = function (e) {
        rect = null;
        xyarr = [];
        if ((x2 === null) && (x3 === null) && (y3 === null) && (y4 === null)) {

        } else {
            xyarr.push(x1+","+y1);
            xyarr.push(x3-x1);
            xyarr.push(y3-y1);
            arr.push(xyarr);
            x2 = x3 = null;
            y3 = y4 = null;
        }
        eras_rect();
    }
    // pic.addEventListener("mousedown", start_rect, false);
    // pic.addEventListener("mousemove", change_rect, false);
    // wplace.addEventListener("mouseup", end_rect, false);

    pic.addEventListener("mouseleave", function (e) {
        rect = null;
    }, false);
}

for (o=0;o<$("input").length;o++) {
    $("input")[o].onclick = function () {
        // console.log("test");
        for (j = 0;j < $("rect").length;j++) {
            var x_float = parseFloat(x_coor.value);
            var y_float = parseFloat(y_coor.value);
            var w_float = parseFloat(w_coor.value);
            var h_float = parseFloat(h_coor.value);
            if (($("rect")[j].x.baseVal.value === x_float) && ($("rect")[j].y.baseVal.value === y_float) && ($("rect")[j].width.baseVal.value === w_float) && ($("rect")[j].height.baseVal.value === h_float)) {
                var chose_rect = $("rect")[j];
                this.addEventListener("change", function (e) {
                    console.log(x_coor.value, y_coor.value, w_coor.value, h_coor.value);
                    chose_rect.setAttribute("x", x_coor.value);
                    chose_rect.setAttribute("y", y_coor.value);
                    chose_rect.setAttribute("width", w_coor.value);
                    chose_rect.setAttribute("height", h_coor.value);
                    var empty = [];
                    empty.push((x_float + "," +y_float));
                    empty.push(w_float);
                    empty.push(h_float);
                    console.log(empty);
                    // eras_arr.push(empty);
                }, false)
            }
        }
    }
}

function eras_rect () {
    var all_rect = document.getElementsByTagName("rect");
    for (j =0;j < all_rect.length;j++) {
        if (all_rect[j].getAttribute("x") === null) {
            var parent = all_rect[j].parentNode;
            parent.removeChild(all_rect[j]);
        }
    }
}

var eras_arr = [];
tool_eras.onclick = function () {
    for (var k =0;k < arr.length;k++) {
        eras_arr.push(arr[k]);
    }
    newArr = eras_arr.splice(0, eras_arr.length);
    console.log(newArr);
    pic.onmousedown = function (e) {
        for (j = 0;j < newArr.length;j++) {
            x1_coor = parseFloat(newArr[j][0].split(",")[0]);
            y1_coor = parseFloat(newArr[j][0].split(",")[1]);
            x2_coor = x1_coor + newArr[j][1];
            y2_coor = y1_coor + newArr[j][2];
            if (((x1_coor < e.clientX) && (e.clientX < x2_coor)) && ((y1_coor < e.clientY) && (e.clientY < y2_coor))) {
                chose_x = x1_coor-mleft;
                chose_y = y1_coor-mtop;
                chose_w = newArr[j][1];
                chose_h = newArr[j][2];
                for (o = 0;o < $("rect").length;o++) {
                    int_x = parseFloat($("rect")[o].getAttribute("x"));
                    int_y = parseFloat($("rect")[o].getAttribute("y"));
                    int_w = parseFloat($("rect")[o].getAttribute("width"));
                    int_h = parseFloat($("rect")[o].getAttribute("height"));
                    if ((chose_x === int_x) && (chose_y === int_y) && (chose_w === int_w) && (chose_h === int_h)) {
                        $("rect")[o].remove();
                        // var parent = $("rect")[o].parentNode;
                        // parent.removeChild($("rect")[$("rect").length-1]);
                    }
                }
            }
        }
    }
    // pic.addEventListener("mousedown", eras_rect, false);
}

tool_sele.onclick = function () {
    console.log(eras_arr);
    for (var k =0;k < arr.length;k++) {
        eras_arr.push(arr[k]);
    }
    newArr = eras_arr.splice(0, eras_arr.length);
    console.log(newArr);
    pic.onmousedown = function (e) {
        eras_rect();
        for (j = 0;j < newArr.length;j++) {
                x1_coor = parseFloat(newArr[j][0].split(",")[0]);
                y1_coor = parseFloat(newArr[j][0].split(",")[1]);
                x2_coor = x1_coor + newArr[j][1];
                y2_coor = y1_coor + newArr[j][2];
                if (((x1_coor < e.clientX) && (e.clientX < x2_coor)) && ((y1_coor < e.clientY) && (e.clientY < y2_coor))) {
                    chose_x = x1_coor-mleft;
                    chose_y = y1_coor-mtop;
                    chose_w = newArr[j][1];
                    chose_h = newArr[j][2];
                    for (o = 0;o < $("rect").length;o++) {
                        int_x = parseFloat($("rect")[o].getAttribute("x"));
                        int_y = parseFloat($("rect")[o].getAttribute("y"));
                        int_w = parseFloat($("rect")[o].getAttribute("width"));
                        int_h = parseFloat($("rect")[o].getAttribute("height"));
                        if ((chose_x === int_x) && (chose_y === int_y) && (chose_w === int_w) && (chose_h === int_h)) {
                            x_coor.value = int_x;
                            y_coor.value = int_y;
                            w_coor.value = int_w;
                            h_coor.value = int_h;
                        }
                    }
                }
            }
    }
    // pic.addEventListener("click", select_rect, false);
}


$("#reset").on('click', function() {
    window.location.reload();
});

$("#submit").on("click", function() {
    console.log(arr);
    console.log(pic);
})


