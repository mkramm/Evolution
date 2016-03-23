
var Archaeon = React.createClass({
  getInitialState: function () {
    return {
      value: 0
    }
  },
  handleClick: function (){
    this.setState(function(state) {
      return {value: state.value + 1};
    })
  },
  render: function() {
    var text = 'Archaeen';
    return <div>
      <button onClick={this.handleClick}>{text}</button>
      <div>
        {this.state.value}
      </div>
    </div>;
  }
});
var start = new Date().getTime();
setInterval(function() {
  ReactDOM.render(
    <Archaeon />,
    document.getElementById('archaeon')
  );
}, 50);
ReactDOM.render(
  <span></span>,
  document.getElementById('container')
);
