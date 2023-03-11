import React, {Component} from 'react';
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
        e.preventDefault();
        if(this.state.value === this.state.answer.join(''))
        {
            this.setState({
                result : '홈런',
                tries : [...this.state.tries, {try:this.state.value, result : '홈런!'}],
                /*
                    배열에 값을 넣을 때 push를 쓰는데 리액트에서는 사용하면 안된다.
                    push를 쓰면 리액트에서 값이 변했다는 감지를 하지 못한다.
                    const array []; const array2 = ...array, 1] 이렇게 하면 참조하는 객체가 달라져서 해당 값 인지 가능
                */
            })

            alert('게임을 다시 시작합니다.');
                
            this.setState({
                value : '',
                ansser : getNumbers(),
                tries : [],
            });
        }
        else{
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9)
            {
                this.setState({
                    result : `10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`,
                });
                
                alert('게임을 다시 시작합니다.');
                
                this.setState({
                    value : '',
                    ansser : getNumbers(),
                    tries : [],
                });
            }
            else
            {
                for(let i = 0; i<4; i+=1) {
                    if(answerArray[i] === this.state.answer[i])
                    {
                        strike += 1;
                    }
                    else if (this.state.answer.includes(answerArray[i]))
                    {
                        ball += 1;
                    }
                }
                this.setState({
                    tries : [...this.state.tries,{try : this.state.value, result : `${strike} 스트라이크, ${ball} 볼`}]
                })
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


    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input maxLength={4} value = {this.state.value} onChange = {this.onChangeInput} />
                </form>

                <div> 시도 : {this.state.tries.length}</div>
                <ul>
                    {
                        this.state.tries.map( (v, i) => {
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