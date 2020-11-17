let myList,myListArr;
myList=document.getElementById('myList');
myListArr = (localStorage.getItem("myTasks")===null)?[]:JSON.parse(localStorage.getItem("myTasks"));

let listMaker=(x,y)=>{
    let checked=(x.done)?"checked":"";
    return `<li class="${checked}"><input type="checkbox" onChange="ifChecked(${y})" ${checked} /> ${x.list} <button onClick=deleteMe(${y})>Remove</button></li>`;
}
function refresh(){
myList.innerHTML='';
myListArr.forEach((x,y)=>{
    myList.innerHTML+=listMaker(x,y);
});

}
refresh();//on load

let setLocal=()=>{
    localStorage.setItem("myTasks",JSON.stringify(myListArr));
    refresh();
}

let clearMe=()=>{
    [myListArr,myList.innerHTML]=[[],""];
    setLocal();
    
}

let addMe=()=>{
    let newTask=document.getElementById('newTask');
    if(!newTask.value.length == 0){
        myList.innerHTML+=listMaker(newTask.value);
    
    myListArr.push({list:newTask.value,done:false});   
    setLocal();
    newTask.value="";
    }
}

let deleteMe=(index)=>{
    myListArr.splice(index,1);
    setLocal();
}

function ifChecked(index){
    let checker=myListArr[index].done;
    let className= (!myListArr[index].done)?'checked':'';
    myListArr[index].done=!checker;
    localStorage.setItem("myTasks",JSON.stringify(myListArr));
    document.querySelectorAll('li')[index].className=className;

}