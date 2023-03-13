import React, {Component, createRef} from 'react';
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

class NumberBaseball extends Component
{
    state = {
        result : '',
        value : '',
        answer : getNumbers(),
        tries : [],

    }

    onSubmitForm = (e) => {
        const {value, tries, answer} = this.state;

        e.preventDefault();
        if(value === answer.join(''))
        {
            this.setState( (prevState) => {
                return {
                    result : '홈런',
                    tries : [...prevState.tries, {try:value, result : '홈런!'}],
                    /*
                        배열에 값을 넣을 때 push를 쓰는데 리액트에서는 사용하면 안된다.
                        push를 쓰면 리액트에서 값이 변했다는 감지를 하지 못한다.
                        const array []; const array2 = ...array, 1] 이렇게 하면 참조하는 객체가 달라져서 해당 값 인지 가능
                    */
                }
                
            })

            alert('게임을 다시 시작합니다.');
                
            this.setState({
                result : '',
                value : '',
                answer : getNumbers(),
                tries : [],
            });
            this.inputRef.current.focus();
        }
        else{
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length >= 9)
            {
                this.setState({
                    result : `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                
                alert('게임을 다시 시작합니다.');
                
                this.setState({
                    result : '',
                    value : '',
                    answer : getNumbers(),
                    tries : [],
                });
                this.inputRef.current.focus();
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

                this.setState( (prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        value : '',
                        /*
                            배열에 값을 넣을 때 push를 쓰는데 리액트에서는 사용하면 안된다.
                            push를 쓰면 리액트에서 값이 변했다는 감지를 하지 못한다.
                            const array []; const array2 = ...array, 1] 이렇게 하면 참조하는 객체가 달라져서 해당 값 인지 가능
                        */
                    } 
                })
                this.inputRef.current.focus();
            }
        }
        
    };
    /*
        화살표 함수를 사용하지 않으면,
        onSubmitForm() {
            this를 사용하지 못함
            
            this 사용하려면
            constructor(props)
            {
                super(props)
                this.state = {

                }
                this.onsubmitform this.onsubmitform.bind(this)
                이런식으로 체계를 잡아야함
            }
        }
    */

    onChangeInput = (e) => {
        console.log(this.state.answer);
        this.setState({
            value : e.target.value,
        });
    };

    inputRef = createRef(); // this.inputRef

    onRetry = (e) => {
        alert('게임을 다시 시작합니다.');
                
        this.setState({
            result : '',
            value : '',
            answer : getNumbers(),
            tries : [],
        });
    }

    render() {
        const { result, value, tries } = this.state;

        return (
            <>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />
                </form>

                <button onClick={this.onRetry}>다시하기</button>

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
}

export default NumberBaseball;