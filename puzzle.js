var time = 0;//设置定时时间
var pause = true;//设置是否暂停标志，true表示暂停
var set_timer;//设置定时函数
var d = new Array(10);//保存大DIV当前装的小DIV的编号
var d_direct = new Array(
    [0],//不使用第一个元素
    [2, 4],//div1可以交换的块
    [1, 3, 5],
    [2, 6],
    [1, 5, 7],
    [2, 4, 6, 8],
    [3, 5, 9],
    [4, 8],
    [5, 7, 9],
    [6, 8]
);
var d_posXY = new Array(
    [0],
    [0, 0],//表示left，top
    [150, 0],
    [300, 0],
    [0, 150],
    [150, 150],
    [300, 150],
    [0, 300],
    [150, 300],
    [300, 300]
);
d[1] = 1; d[2] = 2; d[3] = 3; d[4] = 4; d[5] = 5; d[6] = 6; d[7] = 7; d[8] = 8; d[9] = 0;
function move(id) {
    var i = 1;
    for (i = 1; i < 10; ++i) {//找出小div在大div中的位置,++i先自增在取值i
        if (d[i] == id){
            break;
        }
    }
    var target_d = 0;//小div可以去的位置，0表示不能移动
    target_d = whereCanTo(i);
    if (target_d != 0) {
        d[i] = 0;
        d[target_d] = id;//进行移动
        document.getElementById("d" + id).style.left = d_posXY[target_d][0] + "px";
        document.getElementById("d" + id).style.top = d_posXY[target_d][1] + "px";
    }
    var finish_flag = true;//游戏是否完成标志
    for (var k = 1; k < 9; ++k) {
        if (d[k] != k) {
            finish_flag = false;
            break;
        }
    }
    if (finish_flag == true) {
        if (!pause) {
            start();
        }
        alert("Congratulations!");
    }
}
function whereCanTo(cur_div) {//cur_div的可移动去向？
    var j = 0;
    var move_flag = false;//是否有可移动到的位置
    for (j = 0; j < d_direct[cur_div].length; ++j) {
        if (d[d_direct[cur_div][j]] == 0) {
            move_flag = true;
            break;
        }
    }
    if (move_flag == true) {
        return d_direct[cur_div][j];//可移动则返回可移动到的块
    } else {
        return 0;//否则返回0
    }
}

//定时函数
function timer() {
    time += 1;
    var min = parseInt(time / 60);
    var sec = time % 60;
    document.getElementById("timer").innerHTML = min + "分" + sec + "秒";
}

//开始游戏
function start() {
    if (pause) {
        document.getElementById("start").innerHTML = "暂停";
        pause = false;
        set_timer = setInterval(timer, 1000);
    } else {
        document.getElementById("start").innerHTML = "开始";
        pause = true;
        clearInterval(set_timer);
    }
}
function reset() {
    time = 0;
    random_d();
    if (pause) {
        start();
    }
}
function random_d() {
    for (var i = 9; i > 1; --i) {//从第9块开始与随机位置换位置，有bug。
        var to = parseInt(Math.random() * (i - 1) + 1);
        if (d[i] != 0) {
            document.getElementById("d" + d[i]).style.left = d_posXY[to][0] + "px";
            document.getElementById("d" + d[i]).style.top = d_posXY[to][1] + "px";
        }
        if (d[to] != 0) {
            document.getElementById("d" + d[to]).style.left = d_posXY[i][0] + "px";
            document.getElementById("d" + d[to]).style.top = d_posXY[i][1] + "px";
        }
        var temp = d[to];
        d[to] = d[i];
        d[i] = temp;
    }
}
window.onload = function () {
    reset();
}
