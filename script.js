const n = document.getElementById("size");
const arr = [];
let perArr = [];
const container = document.getElementById("container");
const arrInput = document.getElementById("input-arr");
const selectedInput = document.getElementById("select");



// function to intialise the array
function init(){
    let crr = [];
    let brr = arrInput.value.split(" ");
    let size = n.value;
    

    for(let i =0;i<size;i++){
        let val = Number(brr[i]);
        let random = Math.random();
        crr.push(random);
        arr[i] = val;
    }
    let drr = arr.map((element) =>{
        return element;
    })
    let err = crr.map((element) =>{
        return element;
    })
    drr.sort((a,b) =>a-b);
    err.sort((a,b) =>a-b);
    console.log(arr);

    for(let i =0;i<arr.length;i++){
        for(let j = 0;j<drr.length;j++){
            if(arr[i] == drr[j]){
                perArr[i] = err[j];
            }
        }
    }
    console.log(perArr);

    showBars();

}

// function to check sorting method
function play(){
    const copy = [...arr];
    console.log(selectedInput.value)
    if(selectedInput.value === "BubbleSort")
    {
        const moves =  bubbleSort(copy);
        console.log(moves)
        animate(moves);
    }
    if(selectedInput.value === "SelectionSort")
    {
        const moves =  selectionSort(copy);
        console.log(moves)
        animate(moves);
    }
    if(selectedInput.value === "InsertionSort")
    {
        const moves =  insertionSort(copy);
        console.log(moves)
        animate(moves);
    }

}
// reset function 
function reset(){
    location.reload();
}


// function to swap the bars according to the values
async function animate(moves){
    if(moves.length == 0){
        showBars();
        return;
    }
    const move = moves.shift();
    console.log(move)
    const [i,j] = move.indices;
    if(move.type == "swap"){
        await swapBars(i, j);
        console.log(i,j);
        [arr[i],arr[j]] = [arr[j],arr[i]];
        [perArr[i], perArr[j]] = [perArr[j], perArr[i]];
        
    }
    showBars(move);
    setTimeout(() =>{
        animate(moves);

    },2000)
}
// bubble sort algorithem
function bubbleSort(arr){
    const moves = [];
    for(let i = 0;i<arr.length;i++){
        for(let j = i+1;j<arr.length;j++){
            moves.push({indices:[i,j],type:"comp"});
            if(arr[i] > arr[j]){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                moves.push({indices:[i,j],type:"swap"});
              
            }
        }
    }
    return moves;

}
// selection sort algorithem
function selectionSort(arr){
    const moves = [];
    for(let i =0;i<arr.length;i++){
        let minIdx = i;
        moves.push({indices:[i,minIdx],type:"comp"});
        for(let j = i+1;j<arr.length;j++){
            if(arr[minIdx] > arr[j]){
                minIdx = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
        moves.push({indices:[i,minIdx],type:"swap"});
        
    }
    return moves
}
// insertion sort algorithem
function insertionSort(arr){
    const moves = [];
    for(let i=1;i<arr.length;i++){
        for(let j=i-1;j>=0;j--){
            moves.push({indices:[j,j+1],type:"comp"});
            if(arr[j+1]<arr[j]){
                let temp = arr[j+1];
                arr[j+1] = arr[j];
                arr[j] = temp;
                console.log(arr);
                moves.push({indices:[j+1,j],type:"swap"});
            }
            else{
                break;
            }
        }
    }
    console.log(arr);
    return moves;
}
   
// function to make bars and stylings
function showBars(move){
    
    container.innerHTML = "";
   
    for(let i =0;i<arr.length;i++){
        const bar = document.createElement("div");
        // const val = document.createElement("p");
       
        bar. innerText = Math.floor(arr[i]);
        container.style.width = "100%"
        container.style.height = "350px"
       
      
        let barHeight = (perArr[i] * 100);
        bar.style.height = `${barHeight}%`;
        if(move && move.indices.includes(i)){
            bar.style.backgroundColor = 
                move.type == "swap"?"lightgreen":"blue";
                bar.style.transform = "scale(1.1)";
           
        }
        container.append(bar);

        
    }

}
// function for bar interchange animation
async function swapBars(i, j) {
    const bar1 = container.children[i];
    const bar2 = container.children[j];
    
    const  tempHeight = bar1.style.height;
   
    bar1.style.height = bar2.style.height;
 
    bar2.style.height = tempHeight;
    
   

    // Add CSS transitions for smooth animation
    bar1.style.transition = "height 0.8s";
    bar2.style.transition = "height 0.8s";

    // Wait for the animation to complete
    await new Promise(resolve => setTimeout(resolve, 500));

    // Reset transitions and heights
    bar1.style.transition = "none";
    bar2.style.transition = "none";
}