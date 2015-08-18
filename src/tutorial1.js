/** @jsx React.DOM */
var CarList = React.createClass({
	getInitialState: function(){
		return {
			selectedValue: "all"
		};
	},
	handeChange: function(e){
		this.setState({selectedValue: e.target.value});
	},
  	render: function() {
  		return (
  			<div>
	  			<label> Choose car: </label>
	  			<select value={this.state.selectedValue} onChange={this.handeChange}>
				  <option value="all">All</option>
				  <option value="truck">Truck</option>
				  <option value="sedan">Sedan</option>
				  <option value="van">Van</option>
				  <option value="motorcycle">Motorcycle</option>
				</select>
			</div>
  		);
  	}
});

var Gmap = React.createClass({
	getInitialState: function(){
		var map;
    	map = new google.maps.Map(document.getElementById('myMap'), {
    		center: {lat: 32.867881, lng: -117.212951},
    		zoom: 14
  		});
  		return {
  			gmap: map
  		};
	},
  	render: function() {
  		return (
  			<div className={this.state.gmap}></div>
  		);
  	}
});


React.render(<Gmap/>,document.getElementById("myMap"));
React.render(<CarList/>,document.getElementById("carList"));