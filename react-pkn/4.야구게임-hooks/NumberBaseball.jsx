import React, {useRef, useState, useCallback} from 'react';
import Try from './Try'

function getNumbers()
{
    //숫자 4개 랜덤하게 뽑는 함수 (겹치지 않고)
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];

    for(let i=0; i<4; i+=1)
    {
        const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers); // usestate에 값을 넣을 때 // 함수를 넣을 때(함수에 리턴값이 answer로 들어가짐) -> 그 뒤에 함수는 실행되지 않는다.
    // getnumbers() 를 해도 usestate가 첫번째 리턴값을 answer에 넣어주는데, 리 랜더링 할 때 getnumbers()가 실행은 되지만 자동으로 무시하지만 --> 그렇게 하면 비효율적이니 실행안하게 한다. (lazy init)
    const [tries, setTries] = useState([]);
    const inputEl = useRef(null);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();

        if(value === answer.join(''))
        {
            setTries((t) => ([
                ...t,
                {
                  try: value,
                  result: '홈런!',
                }
            ]));

            setResult('홈런!');
            alert('게임을 다시 실행합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            inputEl.current.focus();

        }
        else
        {
            const answerArray = value.split('').map((v) => parseInt(v));

            let strike = 0;
            let ball = 0;

            if(tries.length >= 9)
            {
                setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
                alert('게임을 다시 시작합니다.');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
                inputEl.current.focus();
            }
            else
            {
                for(let i = 0; i<4; i+=1) {
                    if(answerArray[i] === answer[i])
                    {
                        strike += 1;
                    }
                    else if (answer.includes(answerArray[i]))
                    {
                        ball += 1;
                    }
                }

                setTries(t => ([
                    ...t,
                    {
                      try: value,
                      result: `${strike} 스트라이크, ${ball} 볼입니다.`,
                    }
                ]));
                
                setValue('');
                inputEl.current.focus();
            }
        }
    }, [value, answer]);

    const onChangeInput = useCallback((e) => setValue(e.target.value), []);


    const onRetry = useCallback((e) => {

        alert('게임을 다시 실행합니다.');
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
        inputEl.current.focus();
    });

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input
                    ref={inputEl}
                    maxLength={4}
                    value={value}
                    onChange={onChangeInput}
                />
                <button>입력!</button>
            </form>

            <button onClick={onRetry}>다시하기</button>

            <div> 시도 : {tries.length}</div>
            <ul>
                {
                    tries.map( (v, i) => {
                        return (
                            /*<li key = {v.fruit}> <b>{v.fruit}</b> - {v.taste}</li>*/
                            <Try key = {`${i+1}차 시도 : `} tryInfo = {v} />
                        )
                    }
                )}
            </ul>
        </>
    )
}


export default NumberBaseball;