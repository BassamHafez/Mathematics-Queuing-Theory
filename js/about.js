// loading screen
$(document).ready(function(){
    $(".loading").fadeOut(400,function(){
    });
})

$(".Deterministic").click(function(){
    $(".choose").slideUp(500);
    $("#stocPage").hide(500);
    $("#detPage").show(500);
   
    function showOutputCaseOne(){
      $(".output").addClass("show-output");
    }
    
    // start deterministic
let Mu, Lambda, K,t ,n,M_Value; //input          
let tiValue, N0_tOutput, N1_tOutput, N2_tOutput;  //outputs
let W0_Output, W1_Output, W2_Output;        //outputs
let N2_firstValue,N2_secondValue,W1_firstValue,W1_secondValue;
let btnSolve=document.getElementById("solve");


btnSolve.onclick=function(){
  getData();
  showOutputCaseOne();
}


function getData() {

Mu = Number.parseFloat(document.getElementById("Mu").value);
Lambda = Number.parseFloat(document.getElementById("Lambda").value);
K = Number.parseFloat(document.getElementById("K").value);
t = Number.parseFloat(document.getElementById("t").value);
n = Number.parseInt(document.getElementById('n').value); 

  if (Lambda > Mu) {
    caseOne();
  }
  else if(Lambda<=Mu) {
    caseTwo();
  }
}

// // ========================  start case one   ==================== \\ 

function caseOne() { 
  get_Ti();
  getN_t();
  getWq();
  specialCase();
  displayCaseOne();
}
//get tiOutput
function get_Ti() {

  let response = nerdamer.solve(
    `(ti* ${Lambda})-(${Mu}*ti - ${Mu / Lambda}) - ${K}`,"ti");
  let num = response.symbol.elements[0].multiplier.num.value;
  let den = response.symbol.elements[0].multiplier.den.value;

  let myNum;
  let divider = 1 / Lambda;

  if (den != 0) {
    myNum = num / den;
  } else {
    myNum = num;
  }



  let testNumber = myNum; 

  let notFinal = true;
  let finalNumber;
  for (let index = 0; notFinal; index++) {
    finalNumber = testNumber;
    if (K === Math.round(Lambda * testNumber) - Math.round(Mu * testNumber - Mu / Lambda) ) {
      testNumber = testNumber - divider; 
      finalNumber = testNumber;

      if (K === Math.round(Lambda * testNumber) - Math.round(Mu * testNumber - Mu / Lambda)) {
        testNumber = testNumber - divider;
        finalNumber = Math.round(testNumber);
      } else {
        notFinal = false;
      }
    } else {
      notFinal = false;
    }

    finalNumber = Math.round(finalNumber);
  }
  tiValue = finalNumber;
}
//get N
function getN_t() {
  N0_tOutput = 0;
 
  let myt = `${Lambda * t - (Mu * t - Mu / Lambda)}`;
  myt = myt.toString();
  myt = myt.slice(0, myt.indexOf(".") + 3);
 

  N1_tOutput = Number(myt); 
    N2_firstValue = K - 1;
    N2_secondValue = K - 2;
}
//get wq
function getWq() {

  W0_Output = 0;

   W1_firstValue = (1 / Mu - 1 / Lambda) * (Lambda * tiValue - 2);
   W1_secondValue = (1 / Mu - 1 / Lambda) * (Lambda * tiValue - 3);
 
   W1_secondValue=Math.round(W1_secondValue);
   W1_firstValue=Math.round(W1_firstValue);


  let third_W = (1 / Mu - 1 / Lambda) * (n - 1);
  third_W = third_W.toString();
  third_W = third_W.slice(0, third_W.indexOf(".") + 3);
  
  W2_Output =Math.round(Number(third_W));
}

//special case
let checkTrue=true;

function specialCase(){
    let m;
    m=(Lambda/Mu);

  if(Number.isInteger(m)){
    N2_secondValue=null;
    W1_secondValue=null;
    checkTrue=true;
    displayCaseOne();
  }
  else{
    checkTrue=false;
  }
}
//get display case one
function displayCaseOne(){
    //display ti
    document.getElementById("tiOutput").innerHTML=`${tiValue}`;
    //display N
    document.getElementById("N0_tOutput").innerHTML=`${N0_tOutput} `;
    document.getElementById("N0Sub").innerHTML = `(t &#60; 1/λ)`;
    document.getElementById("N1_tOutput").innerHTML = `${N1_tOutput}`;
    document.getElementById("N1Sub").innerHTML = `(1/λ&#60;t&#60;ti)`;
    document.getElementById("N2_tOutput").innerHTML = `${N2_firstValue} , ${N2_secondValue}`;
    document.getElementById("N2Sub").innerHTML = `(t>=ti)`;
    //display Wq
    document.getElementById("W0_Output").innerHTML = `${W0_Output} `;
    document.getElementById("W0Sub").innerHTML = `(n=0)`;
    document.getElementById("W1_Output").innerHTML = `${W1_firstValue} , ${W1_secondValue}`;
    document.getElementById("W1Sub").innerHTML = `(n>=λti)`;
    document.getElementById('W2_Output').innerHTML = `${W2_Output}`;
    document.getElementById("W2Sub").innerHTML = `(n&#60;λti)`;

    if(checkTrue){
        document.getElementById("N2_tOutput").innerHTML = `${N2_firstValue}`;
        document.getElementById("W1_Output").innerHTML = `${W1_firstValue}`;
    }
    else{
        document.getElementById("N2_tOutput").innerHTML = `${N2_firstValue} , ${N2_secondValue}`;
        document.getElementById("W1_Output").innerHTML = `${W1_firstValue} , ${W1_secondValue}`;
    }

}





// // ========================  start case two   ==================== \\ 

let N0FirstValueCaseTwo,N0SecondValueCaseTwo;
let N2_firstValue_lambda_less_Mu , N2_secondtValue_lambda_less_Mu;

function caseTwo() {

  M_Value = Number.parseInt(document.getElementById('M').value);

  // case 1 .... m found
  if (M_Value>0&&Lambda<=Mu) {

    if (Lambda == Mu) {

      get_N_Lamda_Equal_Mu();
      get_Wq_Lamad_equal_Mu(); 
      showOutputCaseTwo_Lambda_equal_Mu()

    }
    else{  // ended 

      get_Ti_Case_Two();
      get_N_Case_Two();
      get_Wq_Lamad_less_Mu();
      showOutputCaseTwo_Lamda_less_Mu();
    }

  }

  else {// case 2  .... m not found 

    get_N_No_M();
    get_W_No_M();
    showOutputCaseTwo_No_M();
  }
}
// Case Two Lambda == Mu
function get_N_Lamda_Equal_Mu() {
  tiValue = 0;
  N0_tOutput = M_Value;
  N1_tOutput = null;
  N2_tOutput = null;
}
function get_Wq_Lamad_equal_Mu() {
  W0_Output = ( M_Value  - 1  ) * (1/Mu ) ; 
  W0_Output=Math.round(W0_Output);
  W1_Output =null ; 
  W2_Output = null ; 
}
function showOutputCaseTwo_Lambda_equal_Mu(){
  //display ti
  document.getElementById('tiOutput').innerHTML = `${tiValue}` ;

  //display N
  document.getElementById("N0_tOutput").innerHTML = `${N0_tOutput}`;
  document.getElementById("N0Sub").innerHTML=`(λ=Mu)`;
  document.getElementById("N1_tOutput").innerHTML = `${N1_tOutput}`; //null
  document.getElementById("N2_tOutput").innerHTML = `${N2_tOutput}`; //null

  //display Wq
  document.getElementById("W0_Output").innerHTML = `${W0_Output}`;
  document.getElementById("W0Sub").innerHTML=`(λ=Mu)`;
  document.getElementById("W1_Output").innerHTML = `${W1_Output} `; //null
  document.getElementById('W2_Output').innerHTML = `${W2_Output}`; //null
}




// Case Two Lambda < Mu
function get_Ti_Case_Two() {

  let response = nerdamer.solve(
    `(((ti* ${Mu})-(${Lambda}*ti)) - ${M_Value})`,"ti");
  let num = response.symbol.elements[0].multiplier.num.value;
  let den = response.symbol.elements[0].multiplier.den.value;

  let myNum;
  let divider = 1 / Lambda;

  if (den != 0) {
    myNum = num / den;
  } else {
    myNum = num;
  }

  let testNumber = Math.round(myNum) ; 

  tiValue = testNumber;
}
function get_N_Case_Two() {
  N0_tOutput = 0;
  N1_tOutput = M_Value + (Lambda * t) - (Mu * t);
  N1_tOutput = Math.round(N1_tOutput);

  N2_firstValue_lambda_less_Mu = 0;
  N2_secondtValue_lambda_less_Mu = 1;
}

function get_Wq_Lamad_less_Mu() {

  W0_Output = (M_Value - 1) / (2 * Mu);
  W0_Output=Math.round(W0_Output);

  W1_Output = 0;

  n = Number.parseFloat(n); 
  W2_Output = (((M_Value + n)-1) * (1 / Mu) )- (n * (1 / Lambda));
  W2_Output=Math.round(W2_Output);
}

function showOutputCaseTwo_Lamda_less_Mu(){
  //display ti
  document.getElementById("tiOutput").innerHTML = `${tiValue}`;
  console.log("ti is"+tiValue);
  //display n
  document.getElementById("N0_tOutput").innerHTML = `${N0_tOutput}`;
  document.getElementById("N0Sub").innerHTML = `(t &#60; ti)`;

  document.getElementById("N1_tOutput").innerHTML = `${N1_tOutput}`;
  document.getElementById("N1Sub").innerHTML = `(1/λ&#60;t&#60;ti) `;
  
  document.getElementById("N2_tOutput").innerHTML = `${N2_firstValue_lambda_less_Mu},${N2_secondtValue_lambda_less_Mu}`;
  document.getElementById("N2Sub").innerHTML = `(t>= ti)`;

  //display W
  document.getElementById("W0_Output").innerHTML = `${W0_Output}`;
  document.getElementById("W0Sub").innerHTML=`(n=0)`;
  document.getElementById("W1_Output").innerHTML = `${W1_Output} `;
  document.getElementById("W1Sub").innerHTML=`(n>=λti)`;
  document.getElementById('W2_Output').innerHTML = `${W2_Output}`;
  document.getElementById("W2Sub").innerHTML=`(n&#60;λti)`;
};





//case two No M
  function get_N_No_M(){
    N0FirstValueCaseTwo=0;
    N0SecondValueCaseTwo=1;
    N0_tOutput = null;
    N1_tOutput = null;
    N2_tOutput = null;
  } 

  function get_W_No_M(){
    W0_Output = 0;
    W1_Output = null;
    W2_Output = null;
  }
function showOutputCaseTwo_No_M(){
  //display N
  document.getElementById("N0_tOutput").innerHTML = `${N0FirstValueCaseTwo} or ${N0SecondValueCaseTwo}`;
  document.getElementById("N0Sub").innerHTML=`(M=0)`;
  document.getElementById("N1_tOutput").innerHTML = `${N1_tOutput}`; //null
  document.getElementById("N2_tOutput").innerHTML = `${N2_tOutput}`; //null
 
  //display W
  document.getElementById("W0_Output").innerHTML = `${W0_Output}`;
  document.getElementById("W0Sub").innerHTML=`(M=0)`;
  document.getElementById("W1_Output").innerHTML = `${W1_Output} `; //null
  document.getElementById('W2_Output').innerHTML = `${W2_Output}`; //null
}
})
$(".Stochastic").click(function(){
    $(".choose").slideUp(500);
    $("#detPage").hide(500);
    $("#stocPage").show(500);

function showOutputCaseOne() {
  $(".output").addClass("show-output");
}

let wrapperDiv = document.getElementById("wrapperId");
let btnSolve = document.getElementById("solveStoc");

btnSolve.onclick = function () {
  showOutputCaseOne(); 
  Stochastic();
};

function showGui() {
  $(".wrapper").fadeOut(500);
}


let Mu = Number.parseFloat(document.getElementById("Mu").value);
let Lambda = Number.parseFloat(document.getElementById("Lambda").value);
let K = Number.parseFloat(document.getElementById("K").value);
let c = Number.parseFloat(document.getElementById("c").value);
let n = Number.parseInt(document.getElementById('n').value);




//  =============================================
//  ================ start  stocastic ===========
//  =============================================

let mm1 = document.getElementById("mm1");
let mm1k = document.getElementById("mm1k");
let mmc = document.getElementById("mmc");
let mmck = document.getElementById("mmck");

// output labels
let p0_Output = document.getElementById("p0_Output");
let pn_Output = document.getElementById("pn_Output");
let lq_Output = document.getElementById("lq_Output");
let l_Output = document.getElementById("l_Output");
let W_Output = document.getElementById("W_Output");
let Wq_Output = document.getElementById("Wq_Output");


let choice = 0;

mm1.onclick = function () {
  showGui();
  choice = 1;
};
mm1k.onclick = function () {
  showGui();
  choice = 2;
};
mmc.onclick = function () {
  showGui();
  choice = 3;
};
mmck.onclick = function () {
  showGui();
  choice = 4;
};

function Stochastic() {
  if (choice == 1) {
    get_mm1();
  } else if (choice == 2) {
    get_mm1k();
  } else if (choice == 3) {
    get_mmc();
  } else if (choice == 4) {
    get_mmck();
  }
}

function get_mm1() {

  let Mu = Number.parseFloat(document.getElementById("Mu").value);
  let Lambda = Number.parseFloat(document.getElementById("Lambda").value);
  let K = Number.parseFloat(document.getElementById("K").value);
  let c = Number.parseFloat(document.getElementById("c").value);
  let n = Number.parseInt(document.getElementById('n').value);


  let row = Lambda / Mu;

  // calc p0
  let p0 = 1 - row;

  p0 = p0.toString();
  p0 = p0.slice(0, p0.indexOf(".") + 3);
  p0 = Number.parseFloat(p0);

  p0_Output.innerHTML = ` p0 = ${p0 }`;



  // ------ calc  p_n
  let p_n = Math.pow(row, n) * (1 - row);
  p_n = p_n.toString();
  p_n = p_n.slice(0, p_n.indexOf(".") + 3);
  p_n = Number.parseFloat(p_n);

  // ------ put p_n internal label
  pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;

  // calc L
  let L = Lambda / (Mu - Lambda);

  // ------ put L internal label
  l_Output.innerHTML = `  L = ${Math.round(L)} `;

  // calc Lq
  let Lq = (Math.pow(Lambda, 2) ) / (Mu* (Mu - Lambda) ) ;

  // ------ put L internal label
  lq_Output.innerHTML = `  L <sub>q</sub> = ${Math.round(Lq)} `;

  // calc W
  let W = 1 / (Mu - Lambda);

  // ------  put W internal label
  W_Output.innerHTML = ` W   = ${Math.round(W)} `;

  // calc Wq
  let Wq = Lambda / (Mu * (Mu - Lambda));

  // ------  put Wq internal label
  Wq_Output.innerHTML = ` W <sub> q </sub> = ${Math.round(Wq)} `;

  console.log('p0 = ' + p0)
  console.log('p_n = ' + p_n);
  console.log('W = ' + W)
  console.log('Wq = ' + Wq);
  console.log('L = ' + L)
  console.log('LQ = ' + Lq);
}

function get_mm1k() {
  console.log('from mm1k')
  let Mu = Number.parseFloat(document.getElementById("Mu").value);
  let Lambda = Number.parseFloat(document.getElementById("Lambda").value);
  let K = Number.parseFloat(document.getElementById("K").value);
  let c = Number.parseFloat(document.getElementById("c").value);
  let n = Number.parseInt(document.getElementById('n').value);
  

  let row = 0; 
  row = Number.parseFloat(Lambda / Mu);

  if (row != 1) {
    console.log(Mu)
    console.log(Lambda)
    console.log(n)
    //----- calc p0
    let p0 = 0; 
     p0 = Number.parseFloat((1 - row) / (1 - Math.pow(row, K + 1))) ;
    console.log(p0)
    

    p0 = p0.toString();
    p0 = p0.slice(0, p0.indexOf(".") + 3);
    p0 = Number.parseFloat(p0);
    p0_Output.innerHTML = ` p0 = ${p0}`;

    
    let p_n = (Math.pow(row, n) * (1 - row)) / (1 - Math.pow(row, K + 1));
    p_n = p_n.toString();
    p_n = p_n.slice(0, p_n.indexOf(".") + 3);
    p_n = Number.parseFloat(p_n);
    pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;

    //----- calc L
    let L = row * ((1 - (1 + K) * Math.pow(row, K) + K * Math.pow(row, K + 1)) /
      ((1 - row) * (1 - Math.pow(row, K + 1))));
    L = L.toString();
    L = L.slice(0, L.indexOf(".") + 3);
    L = Number.parseFloat(L);
    l_Output.innerHTML = `  L = ${L} `;

    // calc W
    let p_K = (Math.pow(row, K) * (1 - row)) / (1 - Math.pow(row, K + 1));
    W = L / (Lambda * (1 - p_K));
    W = W.toString();
    W = W.slice(0, W.indexOf(".") + 3);
    W = Number.parseFloat(W);
    W_Output.innerHTML = ` W   = ${W} `;

    // calc Lq
    let Lq = L - (row * (1 - p_K));
    Lq = Lq.toString();
    Lq = Lq.slice(0, Lq.indexOf(".") + 3);
    Lq = Number.parseFloat(Lq);
    lq_Output.innerHTML = `  L <sub>q</sub> = ${Lq} `;


    console.log('p0 = ' + p0)
    console.log('p_n = ' + p_n);
    console.log('W = ' + W)
    console.log('Wq = ' + Wq);
    console.log('L = ' + L)
    console.log('LQ = ' + Lq);
  }
  else {
    console.log("from row = 1");
    //----- calc p0
    let p0 = 1 / (K + 1);
    p0 = p0.toString();
    p0 = p0.slice(0, p0.indexOf(".") + 3);
    p0 = Number.parseFloat(p0);
    p0_Output.innerHTML = ` p0 = ${p0}`;

    //------ calc p_n
    let p_n = 1 / (K + 1);
    p_n = p_n.toString();
    p_n = p_n.slice(0, p_n.indexOf(".") + 3);
    p_n = Number.parseFloat(p_n);
    pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;

    //----- calc L
    let L = K / 2;
    L = L.toString();
    L = L.slice(0, L.indexOf(".") + 3);
    L = Number.parseFloat(L);
    l_Output.innerHTML = `  L = ${L} `;

    // calc W
    let p_K = 1 / (K + 1);
    W = L / (Lambda * (1 - p_K));
    W = W.toString();
    W = W.slice(0, W.indexOf(".") + 3);
    W = Number.parseFloat(W);
    W_Output.innerHTML = ` W   = ${W} `;

    // calc Lq
    let Lq = L - (row * (1 - p_K));
    Lq = Lq.toString();
    Lq = Lq.slice(0, Lq.indexOf(".") + 3);
    Lq = Number.parseFloat(Lq);
    lq_Output.innerHTML = `  L <sub>q</sub> = ${Lq} `;


    console.log('p0 = ' + p0)
    console.log('p_n = ' + p_n);
    console.log('W = ' + W)
    console.log('Wq = ' + Wq);
    console.log('L = ' + L)
    console.log('LQ = ' + Lq);
  }

  // calc Wq
  let Wq = W - 1 / Mu;
  Wq = Wq.toString();
  Wq = Wq.slice(0, Wq.indexOf(".") + 3);
  Wq = Number.parseFloat(Wq);
  Wq_Output.innerHTML = ` W <sub> q </sub> = ${Wq} `;
}

function factorial(n) {
  if (n < 0) return;
  if (n < 2) return 1;
  return n * factorial(n - 1);
}

function get_mmc() {
  console.log("form mmc");
  let Mu = Number.parseFloat(document.getElementById("Mu").value);
  let Lambda = Number.parseFloat(document.getElementById("Lambda").value);
  let n = Number.parseInt(document.getElementById("n").value);
  let c = Number.parseFloat(document.getElementById("c").value);
  let r = Lambda / Mu;
  let row = r / c;
  let W;
  let p0;

  // calc p0 
  if (row < 1) {
    p0, testNumber = 0;
    for (let i = 0; i <= c - 1; i++) {
      testNumber += Math.pow(r, i) / factorial(i);
    }
    testNumber = testNumber + (c * Math.pow(r, c)) / factorial(c) * (c - r);
    p0 = 1 / testNumber;
    p0 = p0.toString();
    p0 = p0.slice(0, p0.indexOf(".") + 3);
    p0 = Number.parseFloat(p0);
    p0_Output.innerHTML = ` p0 = ${p0}`;
  }
  else {
    p0, testNumber = 0;
    for (let i = 0; i <= c - 1; i++) {
      testNumber += (1 / factorial(i)) * Math.pow((Lambda / Mu), i);
    }
    testNumber = testNumber + (1 / factorial(c)) * (Math.pow((Lambda / Mu), c)) * ((c * Mu) / ((c * Mu) - Lambda));
    p0 = 1 / testNumber;
    p0 = p0.toString();
    p0 = p0.slice(0, p0.indexOf(".") + 3);
    p0 = Number.parseFloat(p0);
    p0_Output.innerHTML = ` p0 = ${p0}`;
  }

  // calc p_n
  if (n >= 0 && n < c) {

    let p_n = (Math.pow(Lambda, n) / (factorial(n) * Math.pow(Mu, n))) * p0;
    p_n = p_n.toString();
    p_n = p_n.slice(0, p_n.indexOf(".") + 3);
    p_n = Number.parseFloat(p_n);
    pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;

  }
  else {

    let p_n = (Math.pow(Lambda, n) / (Math.pow(c, (n - c)) * factorial(c) * Math.pow(Mu, n))) * p0;
    p_n = p_n.toString();
    p_n = p_n.slice(0, p_n.indexOf(".") + 3);
    p_n = Number.parseFloat(p_n);
    pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;
  }

  // calc Lq 
  let Lq = (Math.pow((Lambda / Mu), c) * (Lambda * Mu) / (factorial(c - 1) * Math.pow((c * Mu) - Lambda, 2))) * p0;

  Lq = Lq.toString();
  Lq = Lq.slice(0, Lq.indexOf(".") + 3);
  Lq = Number.parseFloat(Lq);
  lq_Output.innerHTML = `  L <sub>q</sub> = ${Lq} `;

  // calc Wq 
  let Wq = Lq / Lambda;
  Wq = Wq.toString();
  Wq = Wq.slice(0, Wq.indexOf(".") + 3);
  Wq = Number.parseFloat(Wq);
  Wq_Output.innerHTML = ` W <sub> q </sub> = ${Wq} `;

  // calc W 
  W = (Lq / Lambda) + (1 / Mu);
  W = W.toString();
  W = W.slice(0, W.indexOf(".") + 5);
  W = Number.parseFloat(W);
  W_Output.innerHTML = ` W   = ${W} `;

  // calc L
  let L = Lq + (Lambda / Mu);
  L = L.toString();
  L = L.slice(0, L.indexOf(".") + 3);
  L = Number.parseFloat(L);
  l_Output.innerHTML = `  L = ${L} `;

}
function get_mmck() {
  console.log("form mmck");
  let Mu = Number.parseFloat(document.getElementById("Mu").value);
  let Lambda = Number.parseFloat(document.getElementById("Lambda").value);
  let n = Number.parseInt(document.getElementById("n").value);
  let c = Number.parseFloat(document.getElementById("c").value);
  let r = Math.round(Lambda / Mu);
  let row = r / c;
  let K = Number.parseFloat(document.getElementById("K").value);
  let W;
  let p0, testNumber;

  // calc p0 
  if (row != 1) {
    p0, testNumber = 0;
    for (let i = 0; i <= c - 1; i++) {
      testNumber += Math.pow(r, i) / factorial(i);
    }
    testNumber = testNumber + (Math.pow(r, c) / factorial(c)) * ((1 - Math.pow(row, ((K - c) + 1))) / (1 - row));
    p0 = 1 / testNumber;
    p0_Output.innerHTML = ` p0 = ${p0}`;
  }
  else {
    p0, testNumber = 0;
    for (let i = 0; i <= c - 1; i++) {
      testNumber += Math.pow(r, i) / factorial(i);
    }
    testNumber = testNumber + ((Math.pow(r, c) / factorial(c))) * (K - c + 1);
    p0 = 1 / testNumber;
    p0_Output.innerHTML = ` p0 = ${p0}`;
  }

  let p_i;
  // calc p_n
  if (n >= 0 && n < c) {
    console.log('first')
    let p_n = (Math.pow(Lambda, n) / (factorial(n) * Math.pow(Mu, n))) * p0;
    p_n = p_n.toString();
    p_n = p_n.slice(0, p_n.indexOf(".") + 3);
    p_n = Number.parseFloat(p_n);
    pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;

    //--------------- Note -----------
    // calc Lq  
    console.log('P0 =' + p0);
    testNumber = 0
    for (let i = c + 1; i <= K; i++) {
      p_i = (Math.pow(Lambda, i) / (factorial(i) * Math.pow(Mu, i))) * p0;
      testNumber += (i - c) * p_i;
    }
    console.log(testNumber);
    Lq = testNumber;
    Lq = Lq.toString();
    Lq = Lq.slice(0, Lq.indexOf(".") + 3);
    Lq = Number.parseFloat(Lq);
    lq_Output.innerHTML = `  L <sub>q</sub> = ${Lq} `;

    // calc L
    testNumber = 0
    for (let i = 0; i <= c - 1; i++) {
      testNumber += ((c - i) * Math.pow(r, i)) / factorial(i);
    }

    let L = (Lq + c) - (p0 * testNumber);
    L = L.toString();
    L = L.slice(0, L.indexOf(".") + 3);
    L = Number.parseFloat(L);
    l_Output.innerHTML = `  L = ${L} `;

    // calc W 
    let p_K = (Math.pow(Lambda, K) / (factorial(K) * Math.pow(Mu, K))) * p0;
    W = (L / Lambda * (1 - p_K));
    W = W.toString();
    W = W.slice(0, W.indexOf(".") + 5);
    W = Number.parseFloat(W);
    W_Output.innerHTML = ` W   = ${W} `;

    // calc Wq 
    let Wq = (Lq / Lambda * (1 - p_K));
    Wq = Wq.toString();
    Wq = Wq.slice(0, Wq.indexOf(".") + 3);
    Wq = Number.parseFloat(Wq);
    Wq_Output.innerHTML = ` W <sub> q </sub> = ${Wq} `;


  }
  else if (n >= c && n <= K) {
    console.log('sec')
    let p_n = (Math.pow(Lambda, n) / (Math.pow(c, (n - c)) * factorial(c) * Math.pow(Mu, n))) * p0;
    p_n = p_n.toString();
    p_n = p_n.slice(0, p_n.indexOf(".") + 3);
    p_n = Number.parseFloat(p_n);
    pn_Output.innerHTML = `p <sub>${n}</sub> =   ${p_n}`;

    // calc Lq  
    console.log('P0 =' + p0);
    testNumber = 0
    for (let i = c + 1; i <= K; i++) {
      p_i = (Math.pow(Lambda, i) / (factorial(i) * Math.pow(Mu, i))) * p0;
      testNumber += (i - c) * p_i;
    }
    console.log(testNumber);
    Lq = testNumber;
    Lq = Lq.toString();
    Lq = Lq.slice(0, Lq.indexOf(".") + 3);
    Lq = Number.parseFloat(Lq);
    lq_Output.innerHTML = `  L <sub>q</sub> = ${Lq} `;

    // calc L
    testNumber = 0
    for (let i = 0; i <= c - 1; i++) {
      testNumber += ((c - i) * Math.pow(r, i)) / factorial(i);
    }

    let L = (Lq + c) - (p0 * testNumber);
    L = L.toString();
    L = L.slice(0, L.indexOf(".") + 3);
    L = Number.parseFloat(L);
    l_Output.innerHTML = `  L = ${L} `;

    // calc W 
    let p_K = (Math.pow(Lambda, K) / (Math.pow(c, (K - c)) * factorial(c) * Math.pow(Mu, K))) * p0;
    W = (L / Lambda * (1 - p_K));
    W = W.toString();
    W = W.slice(0, W.indexOf(".") + 5);
    W = Number.parseFloat(W);
    W_Output.innerHTML = ` W   = ${W} `;

    // calc Wq 
    let Wq = (Lq / Lambda * (1 - p_K));
    Wq = Wq.toString();
    Wq = Wq.slice(0, Wq.indexOf(".") + 3);
    Wq = Number.parseFloat(Wq);
    Wq_Output.innerHTML = ` W <sub> q </sub> = ${Wq} `;

  }
}

})

particlesJS.load('particles-js', 'assets/particles.json', function() {
  console.log('callback - particles.js config loaded');
});





