var label = label || {}, e, scrollX, scrollY, x, y, x1 = null, x2 = null, x3 = null, x4 = null, j = 0,
    y1 = null, y2 = null, y3 = null, y4 = null, o = 0,
    width = null, height = null, x1_coor = null,
    y1_coor = null, x2_coor = null, y2_coor = null,
    chose_x = null, chose_y = null, chose_w = null,
    chose_h = null, int_x = null, int_y = null, int_w = null,
    int_h = null, arr = [], xyarr = {}, newArr = [];
label = {
    //页面初始化函数
    rect:null,
    eras_arr:[],
    hiddenDangerImgList:[],
    mleft:0,
    mtop:0,
    zuobiaoquyu:[],
    gridRow:32,//可配置
    gridCol:32,//可配置
    perGridWidth:80,
    perGridHeight:60,
    gridArr:[],
    gridquyuorder:1,
    // biaozhuInfo:{},
    init:function() {
        var _this = this;
        $("#importpic image").attr("id", "svg_1");
        $("#importpic image").css({
            "x":0,
            "y":0,
            "width":640,
            "height":480
        });
        $("#importpic").css({
            "x":0,
            "y":0,
            "width":640,
            "height":480
        });
        _this.initWangGe();
        document.ondragstart=function() {
            return false;
        };
        _this.rectSelect();
        _this.erasTool();
        _this.selectTool();
        _this.getCoordinate();
        _this.reselectButton();
        _this.submitButton();
        _this.bangdingshiti();
        _this.clickConfirmCoorBtn();
    },
    //初始化网格
    initWangGe:function(){
        var _this =this;
        var gridCount = _this.gridRow * _this.gridCol;
        _this.perGridWidth = 640/_this.gridRow;
        _this.perGridHeight = 480/_this.gridCol;
        var gridHtml = "";
        gridHtml +=`<image xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="data:image/jpeg;base64,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"></image>`;
        // $("#svgroot").html(gridHtml);
        for(var i= 0;i<_this.gridRow;i++){
            for(var j=0;j<_this.gridCol;j++){
                gridHtml += `<rect x="${j*_this.perGridWidth}" y="${i*_this.perGridHeight}" width="${_this.perGridWidth}" height="${_this.perGridHeight}" style="stroke:grey;stroke-width:1px;stroke-dasharray:2 2;fill-opacity:0;" data-row="${i}" data-col="${j}"></rect>`
            }
        }
        $("#importpic").html(gridHtml);
    },
    //获取导入图片的偏移量
    getimportpicmleft:function(){
        var _this=this;
        _this.mleft = parseInt($("#importpic").offset().left);
        _this.mtop = parseInt($("#importpic").offset().top);
    },
    //矩形选框函数
    rectSelect:function() {
        var _this = this;
        $("#tool_rect").on("click", function() {
            _this.clickDown();
            _this.clickGrid();
            $("#importpic").on("mouseleave", function(e) {
                _this.rect = null;
            })
        })
    },
    //鼠标按下事件
    clickDown:function() {
        var _this = this, rect_x, rect_y;
        $("#importpic").on("mousedown", function(event) {
            _this.getimportpicmleft();
            e = event || window.event;
            scrollX = document.documentElement.scrollLeft || $("#workarea").scrollLeft();
            scrollY = document.documentElement.scrollTop || $("#workarea").scrollTop();
            x = e.clientX + scrollX;
            y = e.clientY + scrollY;
            _this.rect = document.createElementNS(this.namespaceURI, "rect");
            rect_x = x-_this.mleft;
            rect_y  = y-_this.mtop;
            x1 = x;
            y1 = y;
            y2 = y;
            x4 = x;
            this.appendChild(_this.rect);
            _this.clickMove(rect_x, rect_y);
        })
    },
    //鼠标移动事件
    clickMove:function(rect_x, rect_y) {
        var _this = this;
        $("#importpic").on("mousemove", function(event) {
            e = event || window.event;
            e.preventDefault();
            scrollX = document.documentElement.scrollLeft || $("#workarea").scrollLeft();
            scrollY = document.documentElement.scrollTop || $("#workarea").scrollTop();
            x = e.clientX + scrollX;
            y = e.clientY + scrollY;
            if (_this.rect !== null) {
                x3 = x2 = x;
                y3 = y4 = y;
                width = x3-x1;
                height = y3-y1;
                if ((width > 0) && (height > 0) && (rect_x !== null) && (rect_y !== null)) {
                    _this.rect.setAttribute("x", rect_x);
                    _this.rect.setAttribute("y", rect_y);
                    _this.rect.setAttribute("width", width);
                    _this.rect.setAttribute("height", height);
                    _this.rect.setAttribute("style", "stroke:red;stroke-width:1px;fill-opacity:0;");
                    $("#xCoor").val(rect_x);
                    $("#yCoor").val(rect_y);
                    $("#wCoor").val(width);
                    $("#hCoor").val(height);
                }
            }
        })
        _this.clickUp();
    },
    //鼠标抬起事件
    clickUp:function() {
        var _this = this;
        $("#workarea").on("mouseup", function() {
            _this.rect = null, xyarr = [];
            if ((x2 === null) && (x3 === null) && (y3 === null) && (y4 === null)) {

            } else {
                // _this.zuobiaoquyu.push({"x":$("#xCoor").val(),"y":$("#yCoor").val(),"width":$("#wCoor").val(),"height":$("#hCoor").val()});
                xyarr.push(x1+","+y1);
                xyarr.push(x3-x1);
                xyarr.push(y3-y1);
                arr.push(xyarr);
                x2 = x3 = null;
                y3 = y4 = null;
            }
            _this.erasRect();
        })
    },
    //获取矩形选框坐标与宽高
    getCoordinate:function() {
        var _this = this;
        for (o=0;o<$("input").length;o++) {
            $("input")[o].onclick = function () {
                for (j = 0;j < $("rect").length;j++) {
                    var x_float = parseFloat($("#xCoor").val());
                    var y_float = parseFloat($("#yCoor").val());
                    var w_float = parseFloat($("#wCoor").val());
                    var h_float = parseFloat($("#hCoor").val());
                    if (($("rect")[j].x.baseVal.value === x_float) && ($("rect")[j].y.baseVal.value === y_float) && ($("rect")[j].width.baseVal.value === w_float) && ($("rect")[j].height.baseVal.value === h_float)) {
                        var chose_rect = $("rect")[j];
                        this.addEventListener("change", function (e) {
                            chose_rect.setAttribute("x", $("#xCoor").val());
                            chose_rect.setAttribute("y", $("#yCoor").val());
                            chose_rect.setAttribute("width", $("#wCoor").val());
                            chose_rect.setAttribute("height", $("#hCoor").val());
                            var empty = [];
                            empty.push((x_float + "," +y_float));
                            empty.push(w_float);
                            empty.push(h_float);
                            _this.eras_arr.push(empty);
                        }, false)
                    }
                }
            }
        }
    },
    //取消矩形选框
    erasRect:function() {
        var _this = this;
        var all_rect = document.getElementsByTagName("rect");
        for (j =0;j < all_rect.length;j++) {
            if (all_rect[j].getAttribute("x") === null) {
                var parent =all_rect[j].parentNode;
                parent.removeChild(all_rect[j]);
            }
        }
    },
    //清除选框事件
    erasTool:function() {
        var _this = this;
        $("#tool_eras").on("click", function() {
            _this.getimportpicmleft();
            _this.eras_arr = [];
            var rects = $("#importpic rect");
            _.each(rects,function(value){
                var x = parseFloat(value.getAttribute("x"))+_this.mleft,
                    y = parseFloat(value.getAttribute("y"))+_this.mtop,
                    width = value.getAttribute("width"),
                    height = value.getAttribute("height");
                // console.log(x,y,width,height);
                var empty = [];
                empty.push((x+ "," +y));
                empty.push(parseFloat(width));
                empty.push(parseFloat(height));
                _this.eras_arr.push(empty);
            });
            // console.log(_this.eras_arr);
            // console.log($("#importpic rect").length);
            // if (_this.eras_arr.length === 0) {
            //     for (var k =0;k < arr.length;k++) {
            //         _this.eras_arr.push(arr[k]);
            //     }
            //     newArr = _this.eras_arr.splice(0, _this.eras_arr.length);
            // } else {
            newArr = _this.eras_arr;
            // }
            $("#importpic").on("mousedown", function(e) {
                // console.log(newArr.length);
                for (jj = 0;jj < newArr.length;jj++) {
                    x1_coor = parseFloat(newArr[jj][0].split(",")[0]);
                    y1_coor = parseFloat(newArr[jj][0].split(",")[1]);
                    x2_coor = x1_coor + newArr[jj][1];
                    y2_coor = y1_coor + newArr[jj][2];
                    if (((x1_coor < e.clientX) && (e.clientX < x2_coor)) && ((y1_coor < e.clientY) && (e.clientY < y2_coor))) {
                        chose_x = x1_coor-_this.mleft;
                        chose_y = y1_coor-_this.mtop;
                        chose_w = newArr[jj][1];
                        chose_h = newArr[jj][2];
                        for (o = 0;o < $("#importpic rect").length;o++) {
                            int_x = parseFloat($("rect")[o].getAttribute("x"));
                            int_y = parseFloat($("rect")[o].getAttribute("y"));
                            int_w = parseFloat($("rect")[o].getAttribute("width"));
                            int_h = parseFloat($("rect")[o].getAttribute("height"));
                            if ((chose_x === int_x) && (chose_y === int_y) && (chose_w === int_w) && (chose_h === int_h)) {
                                $("rect")[o].remove();
                                newArr.splice(jj, 1);
                            }
                        }

                    }
                }
            })
            _this.eras_arr = newArr;
            // pic.addEventListener("mousedown", eras_rect, false);
        })
    },
    //选择选框事件
    selectTool:function() {
        var _this = this;
        $("#tool_sele").on("click", function() {
            if (_this.eras_arr.length === 0) {
                for (var k =0;k < arr.length;k++) {
                    _this.eras_arr.push(arr[k]);
                }
                newArr = _this.eras_arr.splice(0, _this.eras_arr.length);
            } else {
                newArr = _this.eras_arr;
            }
            // console.log(_this.eras_arr);
            // console.log(newArr);
            $("#importpic").off("mousedown");
            $("#importpic").on("mousedown", function(e) {
                // _this.erasRect();
                for (j = 0;j < newArr.length;j++) {
                    x1_coor = parseFloat(newArr[j][0].split(",")[0]);
                    y1_coor = parseFloat(newArr[j][0].split(",")[1]);
                    x2_coor = x1_coor + newArr[j][1];
                    y2_coor = y1_coor + newArr[j][2];
                    if (((x1_coor < e.clientX) && (e.clientX < x2_coor)) && ((y1_coor < e.clientY) && (e.clientY < y2_coor))) {
                        chose_x = x1_coor-_this.mleft;
                        chose_y = y1_coor-_this.mtop;
                        chose_w = newArr[j][1];
                        chose_h = newArr[j][2];
                        for (o = 0;o < $("rect").length;o++) {
                            int_x = parseFloat($("rect")[o].getAttribute("x"));
                            int_y = parseFloat($("rect")[o].getAttribute("y"));
                            int_w = parseFloat($("rect")[o].getAttribute("width"));
                            int_h = parseFloat($("rect")[o].getAttribute("height"));
                            if ((chose_x === int_x) && (chose_y === int_y) && (chose_w === int_w) && (chose_h === int_h)) {
                                $("#xCoor").val(int_x);
                                $("#yCoor").val(int_y);
                                $("#wCoor").val(int_w);
                                $("#hCoor").val(int_h);
                            }
                        }
                    }
                }
            })
            // pic.addEventListener("click", select_rect, false);
        })
    },
    //---------------标注区域网格化
    //点击网格事件
    clickGrid:function(){
        var _this =this;
        $("#importpic").on("click","rect",function(e){
            // console.log(e.target);
            $(e.target).css("fill-opacity","0.3");
            $(e.target).attr("data-coor",`${_this.gridquyuorder}`);
            //每标注一个区域就让考试者点击一个按钮,该按钮触发清空数组的作用,并算出区域坐标
        });
    },
    //重选事件
    reselectButton:function() {
        $("#reset").on('click', function() {
            var rects = $("#importpic rect");
            _.each(rects,function(value){
                value.remove();
            })
        });
    },
    //确定按钮事件
    submitButton:function() {
        var _this=this;
        $("#submit").on("click", function() {
            var rects = $("#importpic rect");
            _.each(rects,function(value){
                var x = value.getAttribute("x"),
                    y = value.getAttribute("y"),
                    width = value.getAttribute("width"),
                    height = value.getAttribute("height");
                label.zuobiaoquyu.push({"x":x,"y":y,"width":width,"height":height})
            });
            if(_.isEmpty(label.zuobiaoquyu)){
                $("#checkQuYu").dialog({
                    resizable:false,
                    show:true,
                    hide:true,
                    modal:true,
                    open:function(){
                        $(".ui-dialog").css("text-align", "center");
                        $(this).html('标注区域不能为空！');
                    },
                    buttons:{
                        "关闭":function(){
                            $("#checkQuYu").dialog("close");
                        }
                    }
                });
                return false;
            }else {
                var yuantumingcheng = $("#hiddenImgList ul li span.imgName.selected").data("imgname");
                var params = {};
                params.isShiTi = false;
                params.yinhuanbianhao = addshiti.yinhuanbianhao;
                params.yuantumingcheng = yuantumingcheng;
                params.biaozhuquyu = _this.zuobiaoquyu;
                $.ajax({
                    type: "post",
                    url: Safirst.sdk.www + "api/shiti/insertImgMarkShiTi.do",
                    dataType: 'json',
                    data: {value: JSON.stringify(params)},
                    success: function (obJson, status) {
                        if (obJson.status === "success") {
                            $("#saveSuccess").dialog({
                                resizable: false,
                                show: true,
                                hide: true,
                                modal: true,
                                open: function () {
                                    $(".ui-dialog").css("text-align", "center");
                                    $(this).html('保存成功！');
                                },
                                buttons: {
                                    "关闭": function () {
                                        $("#saveSuccess").dialog("close");
                                        addshiti.getYinHuanPicList();
                                    }
                                }
                            })
                        }
                    }
                });
            }
        });
    },
    //绑定试题按钮事件
    bangdingshiti:function(){
        var _this=this;
        $("#saveShiTi").on("click",function(){
            var rects = $("#importpic rect");
            _.each(rects,function(value){
                var x = value.getAttribute("x"),
                    y = value.getAttribute("y"),
                    width = value.getAttribute("width"),
                    height = value.getAttribute("height");
                label.zuobiaoquyu.push({"x":x,"y":y,"width":width,"height":height})
            });
            $("#saveSuccess").dialog({
                resizable: false,
                show: true,
                hide: true,
                modal: true,
                open: function () {
                    $(".ui-dialog").css("text-align", "center");
                    $(this).html('绑定试题成功！');
                },
                buttons: {
                    "关闭": function () {
                        $("#saveSuccess").dialog("close");
                    }
                }
            })
        })
    },
    //如果一张图有多个区域,点击确定按钮开始标注下一个区域
    clickConfirmCoorBtn:function(){
        var _this =this;
        var gridArr = [];
        $("#confirmCoor").click(function(){
            console.log(_this.gridquyuorder);
            var $rectsSelected = $(`[data-coor=${_this.gridquyuorder}]`);
            console.log($rectsSelected);
            if($rectsSelected.length===0){
                alert("标注区域不能为空");
                return false;
            }
            var x1=parseFloat($rectsSelected[0].getAttribute("x"));
            var y1=parseFloat($rectsSelected[0].getAttribute("y"));
            var x2=parseFloat($rectsSelected[$rectsSelected.length-1].getAttribute("x"));
            var y2=parseFloat($rectsSelected[$rectsSelected.length-1].getAttribute("y"));
            console.log(x1,y1,x2+_this.perGridWidth-x1,y2+_this.perGridHeight-y1);
            _this.gridquyuorder++;
            console.log(_this.gridquyuorder);
        })
    }
};
$(document).ready(function() {
    label.init();
})
