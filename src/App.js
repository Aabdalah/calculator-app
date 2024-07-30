import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from './Components/Header';
import Screen from './Components/Screen';
import ButtonBoard from './Components/ButtonBoard';

function App() {

  const [themeNumber, setThemeNumber] = useState(0);
  const[screenValue, setScreenValue] = useState("0");
  const[opDone,setOpDone] = useState(false);

  function handleClickTheme(){
    setThemeNumber((themeNumber + 1) % 3);
    changeBgBoddy((themeNumber + 1) % 3)
  }

  function handleClickValue(value){
    let nextScreenValue;
    let fnumber, snumber, operator;
    if(String(screenValue).match(/.\.$/g) && value.match(/\+|-|x|\//g)){
      return
    }
    if(value === "." && String(screenValue).match(/^[0-9.]+(\+|-|x|\/)$/g)){
      nextScreenValue = String(screenValue).concat("0",value);
      setScreenValue(nextScreenValue);
      setOpDone(false)
      return
    }
    if(value === "." && String(screenValue).match(/\./g)){
      return;
    }
    if((screenValue === "0" || screenValue ==="No division by zero" )&& (value.match(/0|=/g))){/*|\+|-|x|\/*/ 
      return;
    }
    if(value === "DEL"){
      if(String(screenValue).length === 1 || screenValue === "No division by zero"){
        setScreenValue("0")
        setOpDone(false);
        return
      }
      nextScreenValue = String(screenValue).slice(0,String(screenValue).length-1);
      setScreenValue(nextScreenValue)
      return
    }
    if(value === "RESET"){
      nextScreenValue = "0";
      setScreenValue(nextScreenValue);
      setOpDone(false);
      return
    }
    if(value.match(/\+|-|x|\//g) && String(screenValue).match(/(\+|-|x|\/)$/g)){
      return
    }
    if(value === "=" && !String(screenValue).match(/[0-9]+(\+|-|x|\/)[0-9]+/g)){
      return
    }

    if(screenValue === "0" && (value !== "." || screenValue ==="No division by zero") && !value.match(/\+|-|x|\//g)){
      nextScreenValue = value;
      setScreenValue(nextScreenValue);
      return;
    }
    if(!opDone || (opDone && value.match(/\+|-|x|\//g))){
      nextScreenValue = String(screenValue).concat("",value);
      setScreenValue(nextScreenValue);
      setOpDone(false)
    }else if(opDone){
      nextScreenValue = value;
      setScreenValue(nextScreenValue);
      setOpDone(false)
    }
    if(value.match(/\+|-|x|\/|=/g) && String(screenValue).match(/[0-9.]+(\+|-|x|\/)[0-9.]+/g)){
      operator = nextScreenValue.match(/\+|-|x|\//g) ? nextScreenValue.match(/\+|-|x|\//g)[0] : null;
      fnumber = nextScreenValue.match(/(-?[0-9]+\.)?[0-9]+(?=\+|-|x|\/)/g) ? nextScreenValue.match(/-?([0-9]+\.)?[0-9]+(?=\+|-|x|\/)/g)[0] : null;
      snumber = nextScreenValue.match(/(?<=\+|-|x|\/)[0-9.]+(\.[0-9]+)?/g) ? nextScreenValue.match(/(?<=\+|-|x|\/)[0-9]+(\.[0-9]+)?/g)[0] : null;
      if(operate && fnumber && snumber){
        nextScreenValue = operate(fnumber,snumber,operator);
        if(value.match(/\+|-|x|\//g)){
          setScreenValue(nextScreenValue + value)
        }else{
          setScreenValue(nextScreenValue);
          setOpDone(true);
        }
      }
    }
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
  console.log(op1)
  return isFloating(String(Number(op1) + Number(op2))) ? String((Number(op1) + Number(op2)).toFixed(2)) : String(Number(op1) + Number(op2));
}
function subtract(op1, op2){
  console.log(op1,op2,"he")
  return isFloating(op1 - op2) ? (op1 - op2).toFixed(2) : (op1 - op2);
}
function multiply(op1, op2){
  return isFloating(op1 * op2) ? (op1 * op2).toFixed(2) : (op1 * op2);
}
function divide(op1, op2){
  if(op2 === "0"){
    return "No division by zero"
  }
  return isFloating(op1 / op2) ? (op1 / op2).toFixed(2) : (op1 / op2);
}

function isFloating(x){
  let mod = Math.abs(x % 1);
  if(mod < 1 && mod > 0){
    return true;
  }
  return false;
}

export default App;

