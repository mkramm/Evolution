var React = require('react');
var ResearchStore = require('../stores/ResearchStore.js');
var ResourceStore = require('../stores/ResourceStore.js');
var ResourceActions = require('../actions/ResourceActions.js');
var ResearchActions = require('../actions/ResearchActions.js');


function _getResearchState () {
    var next = ResearchStore.getNextResearch();
    if (next === undefined) {
        return;
    }
    
    return {
        research: next,
        resources: ResourceStore.getAll()
    }
}

var ResearchButton = React.createClass({
    getInitialState: function () {
        return _getResearchState();
    },

    useYourBrain: function (){
        if(undefined !== this.state.research && this.state.resources[this.state.research.costs[0].id].amount >= this.state.research.costs[0].amount) {
            ResourceActions.increaseValue(this.state.research.costs[0].id, (this.state.research.costs[0].amount * -1));
            ResearchActions.finishResearch(this.state.research.id);
        }
    },
    
    componentDidMount: function() {
        ResearchStore.addResearchListener(this._onChange);
    },

    componentWillUnmount: function() {
        ResearchStore.removeResearchListener(this._onChange);
    },
    
    render: function () {  
       if(this.state.research === null) {
            // there is no Research to research any more
            return <span></span>;
        }
        
        return <button 
                className="btn btn-primary" 
                disabled={this.state.resources[this.state.research.costs[0].id].amount < this.state.research.costs[0].amount} 
                id="useYourBrain" 
                onClick={this.useYourBrain}>
                    Use Your Brain
                </button>;
    },
    
    _onChange: function() {
        this.setState(_getResearchState());
    }
});

module.exports = ResearchButton;