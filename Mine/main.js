var bomx = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
var bomy = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1);
var board = new Array(9);
var dx = new Array(0,0,1,-1,1,-1,1,-1);
var dy = new Array(1,-1,0,0,-1,1,1,-1);
var opened=new Array(9);
var bn=0;
var rest=81;
//create 2D array
for (let i = 0; i < 9; i++) {
    board[i] = new Array(9);
    opened[i]=new Array(9);
}
//fill by zero
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        board[i][j] = 0;
        opened[i][j]=false;
    }
}
//get random positions for booms
for (let i = 0; i < 10; i++) {
    bomx[i] = parseInt(Math.random() * 100) % 9;
    bomy[i] = parseInt(Math.random() * 100) % 9;
    console.log("("+bomx[i]+", "+bomy[i]+") - ");
}
for (let i = 0; i < 10; i++) {
    board[bomx[i]][bomy[i]] = -1;
}
//put booms
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        if (board[i][j] == -1) {
            bn++;
            for (let k = 0; k < 8; k++) {
                let x = i + dx[k], y = j + dy[k];
                if (valid(x, y)&&board[x][y]!=-1)
                {
                    console.log(x+", "+y);
                    board[x][y]++;
                }
            }
        }
    }
}
rest-=bn;
function newGame() {
    document.getElementById("booms").innerHTML=bn;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let btn = document.createElement("button");
            btn.style = "width: 40px; height:40px; vertical-align: top; font-size: 16; color: white;";
            let name = "0";
            if (board[i][j] == -1)
                name = "x";
            else if (board[i][j] > 0)
                name = String(board[i][j]);
            let id = String(i * 10 + j);
            btn.id = id;
            btn.name = name;
            btn.onmousedown = function () { btnClick(id) };

            document.getElementById("board").appendChild(btn);
        }
        let nl = document.createElement("br");
        document.getElementById("board").appendChild(nl);
    }
}
function btnClick(id) {

    let b = document.getElementById(id);
    if (event.button == 2) {
        b.style.background="url(flag.png)";
        b.style.backgroundSize="40px auto";
        let cntr=parseInt(document.getElementById("booms").innerHTML)-1;
        document.getElementById("booms").innerHTML=cntr;
        
    }
    else {
        b.style.background="none";
        if (b.name == "x") {
            b.style.background="url('boom.png')";
            b.style.backgroundSize="30px auto";
            b.style.backgroundRepeat="no-repeat";
            document.getElementById("w").innerHTML="Game over!!";
            for(let i=0;i<10;i++)
            {
                let x=parseInt(bomx[i]),y=parseInt(bomy[i]);
                if(x==-1||y==-1)
                    break;
                let id=String(x*10+y);
                console.log(id+" - ");
                let btn=document.getElementById(id);
                btn.style.background="url('boom.png')";
                btn.style.backgroundSize="30px auto";
                btn.style.backgroundRepeat="no-repeat";
                
            }
        }
        else if (b.name == "0") {
            let x = parseInt(parseInt(b.id) / 10);
            let y = parseInt(parseInt(b.id) % 10);
            if(!opened[x][y])
                rest--;
            opened[x][y]=true;
            open(x, y);
        }
        else {
            let x = parseInt(parseInt(b.id) / 10);
            let y = parseInt(parseInt(b.id) % 10);
            if(!opened[x][y])
                rest--;
            opened[x][y]=true;
            b.style.backgroundColor="#0066ff";
            b.innerHTML = b.name;
        }

    }
    if(rest==0)
    {
        document.getElementById("w").innerHTML="Winner!!!";
    }

}
function valid(x, y) {
    return (x >= 0 && x < 9 && y >= 0 && y < 9);
}
function open(x, y) {
    if (!valid(x, y))
        return;
    if(!opened[x][y])
        rest--;
    opened[x][y]=true;
    let btn = document.getElementById(String(x * 10 + y));
    //btn.disabled = true;
    if(btn.name=="x")
        return;
    if (btn.name == "0") {
        btn.style.backgroundColor="#0066ff";
        for (let i = 0; i < 4; i++) {
            if(valid(x+dx[i],y+dy[i]))
            {
                if(!opened[x+dx[i]][y+dy[i]])
                    open(x + dx[i], y + dy[i]);
            }
        }
    }
    else {
        btn.style.backgroundColor="#0066ff";
        btn.innerHTML = btn.name;
    }
}
let timerLBL=document.getElementById("timer");
let mnt=0,sec=0;
setInterval(function(){sec++;
    mnt%=60;sec%=60;timerLBL.innerHTML=mnt+":"+sec;},1000);
newGame();
function rel()
{
    location.reload();
}