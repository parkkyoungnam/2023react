const React = require('react');
//const {Component} = React;
const {useState, useRef} = React;

/*class WordRelay extends Component {
  state = {
    word : '바보',
    value : '',
    result : '',
  };
*/

const WordRelay = () => {
  const [word, setWord] = useState('바보');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);


  const onSubmitForm = (e) => {
    e.preventDefault();
    if(word[word.length - 1 ] === value[0])
    {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focous();
    }
    else
    {
      setResult('땡');
      setWord(value);
      setValue('');
      inputRef.current.focous();
    }
  };

  const  onChnageInput = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div>{word}</div>
        <form onSubmit = {onSubmitForm}>
          <input ref={inputRef} value = {value} onChange={onChnageInput} />
          <button>입력</button>
        </form>
      <div>{result}</div>
    </>
  )
}

module.exports = WordRelay;