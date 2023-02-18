const React = require('react');
const {Component} = React;

function getNumbers()
{
    
}

class NumberBaseBall extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(), // ex: [1,3,5,7]
        tries: [], // push 쓰면 안 돼요
    };

  onSubmitForm = (e) => {

  };

  onChnageInput = (e) => {

  };

  render() {
    return (
      <>
        <div>{this.state.result}</div>
        <form onSubmit = {this.onSubmitForm}>
            <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
      </>
    )
  }
}

module.exports = NumberBaseBall;
