const React = require('react')
const { useState, useRef} = React;


const GuGuDan = () => {
    const [first, setFirst] = React.useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = React.useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = React.useState('');
    const [result, setResult] = React.useState('');
    const inputRef = React.useRef(null);

    const onChnageInput = (e) => {
      setValue(e.target.value);
    };

    const onSubmitForm = (e) => {
      e.preventDefault();
          if (parseInt(value) === first * second) {
            setResult('정답 : ' + value);
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue(' ');
            inputRef.current.focus();
          } else {
            setResult('땡'),
            setValue(' ');
            inputRef.current.focus();
          }
    };

    return(
      <>
        <div>{first}곱하기 {second} 는?</div>
        <form onSubmit={onSubmitForm}>
            <input ref={inputRef} onChange={onChnageInput} value = {value} />
            <button>입력</button>
        </form>
        <div id = "result">{result}</div>
      </>
    )
               
  }
  // 함수 컴포넌트 -> setstate 하지 않을 경우
  // 함수 컴포넌트에서도 setstate ref도 사용할 수 있도록 해줌. --> 리엑트 훅스
  // use가 훅스다.        


  module.exports = GuGuDan;