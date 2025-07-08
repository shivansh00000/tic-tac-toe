let nodeList = document.querySelectorAll(".btns");
let windiv = document.querySelector("#winner");
let btns = Array.from(nodeList);
let firstTurn= "O"; let turn=firstTurn;
let arrO=[]; let arrX=[];
let res=""; let count=0;
let owin=0; let xwin=0; let draw=0;

let winArr=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function arrEqual(a){
    try{
        for(let i=0 ; i<9 ; i++){
            if(winArr[i].every(item => a.includes(item))===true) {
                winArr[i].forEach(idx => {
                    btns[idx].style.border="5px solid #e3e0cc";
                    btns[idx].style.backgroundColor="#b0bdb0";
                });
                btns.forEach(btn => btn.disabled=true);
                return true;
            }
        } 
    }
    catch{return false};
}

function reset(){
    firstTurn= "O"; turn=firstTurn;
    arrO=[]; arrX=[];
    res="";     count=0;
    owin=0 ; xwin=0; draw=0;
    btns.forEach(btn => {
        btn.disabled=false;
        btn.innerText="";
        btn.style.border="none";
        btn.style.backgroundColor="#c5d5c5";
    });
    windiv.style.height="0";
    windiv.style.width="0";
    windiv.style.backgroundColor="transparent";
    document.querySelector("#result").innerText=``;
    document.querySelector("#winn").innerText=``;
    document.querySelector("#draww").innerText=``;
}

function play(){
    if(firstTurn==="O") firstTurn="X";
    if(firstTurn==="X") firstTurn="O";
    arrO=[]; arrX=[];
    res="";     count=0;
    btns.forEach(btn => {
        btn.disabled=false;
        btn.innerText="";
        btn.style.border="none";
        btn.style.backgroundColor="#c5d5c5";
    });
    windiv.style.height="0";
    windiv.style.width="0";
    windiv.style.backgroundColor="transparent";
    document.querySelector("#result").innerText=``;
    document.querySelector("#winn").innerText=``;
    document.querySelector("#draww").innerText=``;
}

function game(){
    btns.forEach((btn)=>{

        if(turn==="O"){
            document.querySelector("#o").style.backgroundColor="#9fa9a3";
            document.querySelector("#x").style.backgroundColor="transparent";
        }
        if(turn==="X"){
            document.querySelector("#x").style.backgroundColor="#9fa9a3";
            document.querySelector("#o").style.backgroundColor="transparent";
        }
        btn.onclick= function(){
            btn.innerText=turn;
            let idx=btns.indexOf(btn);
            btn.disabled=true;
            if(turn==="O") {
                arrO.push(idx);
                if(arrEqual(arrO)){
                    res="O";
                    owin++;
                    windiv.style.height="600px";
                    windiv.style.width="550px";
                    windiv.style.backgroundColor="#e3e0cc";
                    document.querySelector("#result").innerText=`${res}`;
                    document.querySelector("#winn").innerText=`WINNER!`;
                    windiv.onclick=(()=>{
                        play(); game();
                    });
                }
                turn="X";
                document.querySelector("#x").style.backgroundColor="#9fa9a3";
                document.querySelector("#o").style.backgroundColor="transparent";
            }
            else if(turn==="X") {
                arrX.push(idx);
                if(arrEqual(arrX)){
                    res="X";
                    xwin++;
                    windiv.style.height="600px";
                    windiv.style.width="550px";
                    windiv.style.backgroundColor="#e3e0cc";
                    document.querySelector("#result").innerText=`${res}`;
                    document.querySelector("#winn").innerText=`WINNER!`;
                    windiv.onclick=(()=>{
                        play(); game();
                    });
                }
                turn="O";
                document.querySelector("#o").style.backgroundColor="#9fa9a3";
                document.querySelector("#x").style.backgroundColor="transparent";
            }
            document.querySelector("#Owon").innerText=`O : ${owin}`;
            document.querySelector("#Xwon").innerText=`X : ${xwin}`;
            count++;
            if(count===9){
                res="DRAW!";
                draw++;
                windiv.style.height="600px";
                windiv.style.width="550px";
                windiv.style.backgroundColor="#e3e0cc";
                document.querySelector("#draww").innerText=`${res}`;
                windiv.onclick=(()=>{
                    play(); 
                    game();
                });
            }
        }
    })
    
    document.querySelector("#Owon").innerText=`O : ${owin}`;
    document.querySelector("#Xwon").innerText=`X : ${xwin}`;
    document.querySelector("#draw").innerText=`Draw : ${draw}`;

    document.querySelector("#newgame").onclick=(()=>{
        reset(); 
        game();
    });
    document.querySelector("#restart").onclick=(()=>{
        play(); 
        game();
    });
}
game();
