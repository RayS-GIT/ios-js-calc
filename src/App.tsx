import { useState } from 'react'
import './App.css'

function App() {

const [answer, setAnswer] = useState("0");
const [expression, setExpression] = useState("");
const trimExp = expression.trim();

const isOperator = (calcDigit: string) => {
  return /[*/+-]/.test(calcDigit);
}

  const buttonPress = (calcDigit: string) => {
    if (calcDigit === "clear") {
      setAnswer("0");
      setExpression("");
    } else if (calcDigit === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (calcDigit === "percentage") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(calcDigit)) {
      setExpression(trimExp + " " + calcDigit + " ");
    } else if (calcDigit === "=") {
      calculate();
    } else if (calcDigit === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + calcDigit);
      }
    } else if (calcDigit === ".") {
      //split by operator for last digits. need to study these operations further
      const lastDigit = expression.split(/[-+/*]/g).pop();
      //last digit already has a decimal then return without adding another
      if (!lastDigit) return;
      
      if (lastDigit?.includes(".")) return;
      setExpression(expression + calcDigit);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + calcDigit);
      } else {
        setExpression(expression + calcDigit);
      }
    }
  };
  
  const calculate = () => {
    //do nothing if last digit is an operatot
    if (isOperator(trimExp.charAt(trimExp.length - 1))) return;
    //cleaning so only last op is used incase 2 of the are input together
    //eg 10 * - + 10 = 20
    const parts = trimExp.split("");
    const newParts = [];

    //go through the parts backwards
    for (let i = parts.length -1; i >=0; i--){
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExp = newParts.join(" ");
    if (isOperator(newExp.charAt(0))) {
      setAnswer(eval(answer + newExp) as string);
    } else {
      setAnswer(eval(newExp) as string);
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator App</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id="clear" onClick={() =>buttonPress("clear")}className="light-gray">C</button>
          <button id="negative" onClick={() =>buttonPress("negative")}className="light-gray">+/-</button>
          <button id="percentage" onClick={() =>buttonPress("percentage")}className="light-gray">%</button>
          <button id="divide" onClick={() =>buttonPress("/")}className="yellow">/</button>
          <button id="seven" onClick={() =>buttonPress("7")}className="dark-gray">7</button>
          <button id="eight" onClick={() =>buttonPress("8")}className="dark-gray">8</button>
          <button id="nine" onClick={() =>buttonPress("9")}className="dark-gray">9</button>
          <button id="multiply" onClick={() =>buttonPress("*")}className="yellow">*</button>
          <button id="four" onClick={() =>buttonPress("4")}className="dark-gray">4</button>
          <button id="five" onClick={() =>buttonPress("5")}className="dark-gray">5</button>
          <button id="six" onClick={() =>buttonPress("6")}className="dark-gray">6</button>
          <button id="subtract" onClick={() =>buttonPress("-")}className="yellow">-</button>
          <button id="one" onClick={() =>buttonPress("1")}className="dark-gray">1</button>
          <button id="two" onClick={() =>buttonPress("2")}className="dark-gray">2</button>
          <button id="three" onClick={() =>buttonPress("3")}className="dark-gray">3</button>
          <button id="add" onClick={() =>buttonPress("+")}className="yellow">+</button>
          <button id="zero" onClick={() =>buttonPress("0")}className="dark-gray">0</button>
          <button id="decimal" onClick={() =>buttonPress(".")}className="dark-gray">.</button>
          <button id="equals" onClick={() =>buttonPress("=")}className="yellow">=</button>
        </div>
      </div>

    </>
  )
}


export default App
