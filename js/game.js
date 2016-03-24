var React = require('react');
var ReactDOM = require('react-dom');
var update = require('react-addons-update');

var start = new Date().getTime();
setInterval(function() {
  ReactDOM.render(
    <App />,
    document.getElementById('container')
  );
}, 50);



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
        value: 0,
        handleClick: function (a,b,c,d) {
          this.setState(function (state) {
            console.log(state);
          });
        }
      }
    ]};
  },
  handleButtonClick: function(i) {
    this.setState(function () {
      this.state
      return {}
    });
  },
  render: function () {
    var amount = 0;
    var internalId = 'Archaeen';

    return <div id="App">
      <div id="amountContainer">
        {this.state.data.map(function(result, i) {
          return <AmountView amount={result.value} internalId={result.internalId} key={i} />
        })}
      </div>
      <div id="buttonContainer">
        {this.state.data.map(function(result, i) {
          return <FeatureButton handleClick={result.handleClick.bind(this, i)} internalId={result.internalId} text={result.text} key={i} />
        }.bind(this))}
    </div>
    </div>;
  }
});
