var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

var AmountView = React.createClass({
  render: function () {
    var className = 'amount' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
    return <div className={className}>
      {this.props.amount}
    </div>;
  }
});

var FeatureButton = React.createClass({
  render: function () {
    var className = 'button' + this.props.internalId.charAt(0).toUpperCase() + this.props.internalId.slice(1);
    return <button onClick={this.props.handleClick} className={className}>{this.props.text}</button>;
  }
});



var App = React.createClass({
  getInitialState: function () {
    return {data:[
      {
        internalId: 'archaeen',
        text: 'Archaeon',
        value: 0
      }
    ]};
  },
  handleButtonClick: function(entry) {
    this.setState(function (state) {
      return {data: update(this.state.data, {[entry]: {value: {$set: state.data[entry].value + 1}}})}
    });
  },
  render: function () {
    return <div id="App">
            <div id="amountContainer">
                {this.state.data.map(function(result, i) {
                    return <AmountView amount={result.value} internalId={result.internalId} key={i} />
                })}
            </div>
            <div id="buttonContainer">
                {this.state.data.map(function(result, i) {
                    return <FeatureButton handleClick={this.handleButtonClick.bind(this, i)} internalId={result.internalId} text={result.text} key={i} />
                }.bind(this))}
            </div>
    </div>;
  }
});


ReactDOM.render(<App />, document.getElementById('container'));
