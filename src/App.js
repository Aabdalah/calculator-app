import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Screen from './Components/Screen';
import ButtonBoard from './Components/ButtonBoard';

function App() {

  const [themeNumber, setThemeNumber] = useState(0);
  const [firstNumber,setFirstNumber] = useState("0");
  const [secondNumber,setSecondNumber] = useState(null);
  const [operation,setOperation] = useState(null);
  const [screenValue, setScreenValue] = useState(firstNumber);
  function handleClickTheme(){
    setThemeNumber((themeNumber + 1) % 3);
    changeBgBoddy((themeNumber + 1) % 3)
  }
  
  function handleClickValue(value){
    if(value === "0" && firstNumber === "0"){
      return ;
    }

    if(String(screenValue).length >= 19 && value!== "DEL" && value!== "RESET"){
      return
    }

    if(value === "RESET"){
      setFirstNumber("0");
      setScreenValue("0");
      setSecondNumber(null);
      setOperation(null);
      return;
    }

    if(/[0-9]/.test(value) && firstNumber === "0" && !operation){//handle the first number
      console.log("first number 1");
      setFirstNumber(value);
      setScreenValue(value);
      // return;
    }else if(/[0-9]/.test(value) && firstNumber !== "0" && !operation){
      console.log("first number 2");
      setFirstNumber(firstNumber + value);
      setScreenValue(screenValue + value);
      // return;
    }

    if(/[\+\/\-x]/.test(value) && !secondNumber){//handle the first operation 
      console.log("operation");
      setOperation(value);
      setScreenValue(firstNumber + value);
      // return;
    }

    if(/[0-9]/.test(value) && operation){//handle second number 
      console.log("second number");
      if(value === "0" && secondNumber === "0"){
        return;
      }
      setSecondNumber(secondNumber ? secondNumber + value : value);
      setScreenValue(screenValue + value)
    }

    if(value === "=" && (firstNumber || firstNumber===0) && operation && secondNumber){//handle equal sign 
      console.log("eqial sign")
      let result = operate(String(firstNumber), String(secondNumber) ,String(operation));
      setFirstNumber(result);
      setSecondNumber(null);
      setOperation(null)
      setScreenValue(result);
    }

    if(/[\+\/\-x]/.test(value) && (firstNumber || firstNumber===0) && operation && secondNumber){//handle second operation 
      console.log("operation2")
      let result = operate(String(firstNumber), String(secondNumber) ,String(operation));
      setFirstNumber(result);
      setOperation(value)
      setSecondNumber(null);
      setScreenValue(result + value);
    }

    if(value === "DEL" && screenValue!=="No division by zero"){//handle the DEL 
      if(!secondNumber && !operation && String(firstNumber).length === 1){
        setFirstNumber("0");
        setScreenValue("0")
      }else if(!secondNumber && !operation && firstNumber){
        setFirstNumber((String(firstNumber).slice(0,String(firstNumber).length - 1)))
        setScreenValue((String(screenValue).slice(0,String(screenValue).length - 1)))
      }else if(!secondNumber && operation && firstNumber){
        setOperation(null);
        setScreenValue(String(screenValue).slice(0,String(screenValue).length - 1))
      }else if(String(secondNumber).length === 1 && operation && firstNumber){
        setSecondNumber(null);
        setScreenValue(String(screenValue).slice(0,String(screenValue).length-1));
      }else if(secondNumber && operation && firstNumber){
        setSecondNumber((String(secondNumber).slice(0,String(secondNumber).length - 1)))
        setScreenValue((String(screenValue).slice(0,String(screenValue).length - 1)))
      }
    }
    
    if(value === "."){//handle the .
      if(!secondNumber && !operation && freq(String(firstNumber),".") === 0){
        setFirstNumber(firstNumber + ".");
        setScreenValue(screenValue + ".")
      }else if(!secondNumber && operation && firstNumber){
        setSecondNumber("0" + value);
        setScreenValue(screenValue + "0" + value);
      }else if(freq(String(secondNumber),".") === 0 && operation && firstNumber){
        setSecondNumber(secondNumber + value);
        setScreenValue(screenValue + value)
      }
    }
    console.log(firstNumber,secondNumber,operation)
  }

  return (
    <div className={"App vh-100 d-flex flex-column align-items-center justify-content-center main-color-"+ themeNumber}>
      <Header themenumber={themeNumber} handleClickTheme={handleClickTheme}/>
      <Screen themenumber={themeNumber} screenvalue={screenValue}/>
      <ButtonBoard themenumber={themeNumber} handleclickvalue={handleClickValue}/>
    </div>
  );
}

function changeBgBoddy(x){
  document.body.className = "bg-main-theme-" + x;
}

function operate(fnumber, snumber, operator){
  return operator === "+" ? add(fnumber, snumber)
        :operator === "-" ? subtract(fnumber, snumber)
        :operator === "x" ? multiply(fnumber, snumber)
        :divide(fnumber, snumber);
}

function add(op1, op2){
  return isFloating(String(Number(op1) + Number(op2))) ? String(strip((Number(op1) + Number(op2)))) : String(Number(op1) + Number(op2));
}
function subtract(op1, op2){
  return isFloating(op1 - op2) ?  strip((op1 - op2)) : (op1 - op2);
}
function multiply(op1, op2){
  return isFloating(op1 * op2) ? strip((op1 * op2)): (op1 * op2);
}
function divide(op1, op2){
  if(op2 === "0"){
    return "No division by zero"
  }
  return isFloating(op1 / op2) ? strip((op1 / op2)) : (op1 / op2);
}

function isFloating(x){
  return String(x).length > 10;
}

function freq(string,c){
  let freq = 0;
  for(let i = 0 ; i < string.length ; i++){
    if(string[i] === c){
      freq++
    }
  }
  return freq;
}

function strip(number) {
  return (parseFloat(number.toPrecision(12)));
}

export default App;

