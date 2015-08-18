/** @jsx React.DOM */
var carArr = [{
		id: 1,
		coords: { lat: 32.867881, lng: -117.22 },
		options: { visible: true}
	},
	{
		id: 2,
		coords: { lat: 32.868, lng: -117.23 },
		options: { visible: true }
	},
	{
		id: 3,
		coords: { lat: 32.87, lng: -117.21 },
		options: { visible: true }
	},
	{
		id: 4,
		coords: { lat: 32.869, lng: -117.21 },
		options: { visible: true }
	}];

// Create Dropdown component
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

//Create Google map component
var Gmap = React.createClass({
	getInitialState: function(){
		var map;
    	map = new google.maps.Map(document.getElementById('myMap'), {
    		center: {lat: 32.867881, lng: -117.212951},
    		zoom: 14
  		});
  		var markers = [];
  		carArr.forEach(function(item){
			var marker = new google.maps.Marker({
				id: item.id,
    			position: item.coords,
    			options: item.options,
    			map: map,
  			});
  			markers.push(marker);
		});
  		return {
  			gmap: map,
  			markers: markers
  		};
	},
	moveMarkers: function(){
		var markers = this.state.markers;
		var move = function(markers){
			 for(var i = 0; i < markers.length; i++){
		     	var l = markers[i].getPosition().lat() + (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
		     	var lo = markers[i].getPosition().lng()+ (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
			    markers[i].setPosition(new google.maps.LatLng(l, lo));
     		}
		}
		var helper = function(markers){
			return function(){
				move(markers);
			}
		}

		setInterval(helper(markers), 1000);
	},
  	render: function() {
  		var cx = React.addons.classSet;
  		var classes = cx({
  			'gmap': this.state.gmap,
  			'markersMove': this.moveMarkers()
  		});
  		return (
  			<div className={classes}></div>
  		);
  	}
});

React.render(<Gmap/>,document.getElementById("myMap"));
React.render(<CarList/>,document.getElementById("carList"));