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
			selectedValue: "all",
			cars: carArr
		};
	},
	handleChange: function(e){
		var select = e.target.value;
		var cars = this.state.cars;
		if(select == "truck"){
			hideAllMarkers();
			cars[0].options.visible = true;
			this.setState({selectedValue: select, cars: cars});
		}
		else if(select == "sedan"){
			hideAllMarkers();
			cars[1].options.visible = true;
			this.setState({selectedValue: select, cars: cars});
		}
		else if(select == "van"){
			hideAllMarkers();
			cars[2].options.visible = true;
			this.setState({selectedValue: select, cars: cars});
		}
		else if(select == "motorcycle"){
			hideAllMarkers();
			cars[3].options.visible = true;
			this.setState({selectedValue: select, cars: cars});
		}
		else{
			showAllMarkers();
			this.setState({selectedValue: select, cars: cars});
		}
		function showAllMarkers(){
			for(var i = 0; i < cars.length; i++){
	    		cars[i].options.visible = true;
	    	}
		}
	    function hideAllMarkers() {
	    	for(var i = 0; i < cars.length; i++){
	    		cars[i].options.visible = false;
	    	}
	    }
	},
  	render: function() {
  		return (
  			<div>
	  			<div id="carList">
		  			<label> Choose car: </label>
		  			<select value={this.state.selectedValue} onChange={this.handleChange}>
					  <option value="all">All</option>
					  <option value="truck">Truck</option>
					  <option value="sedan">Sedan</option>
					  <option value="van">Van</option>
					  <option value="motorcycle">Motorcycle</option>
					</select>
				</div>
				<Gmap cars={this.state.cars}></Gmap>
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
  		this.props.cars.forEach(function(item){
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
		setInterval(function(){
			for(var i = 0; i < markers.length; i++){
		     	var l = markers[i].getPosition().lat() + (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
		     	var lo = markers[i].getPosition().lng()+ (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
			    markers[i].setPosition(new google.maps.LatLng(l, lo));
     		}
		}, 1000);
	},
	componentWillReceiveProps:function(nextProps){			//Check if any props are changing
		var markers = this.state.markers;
		for(var i = 0; i < markers.length; i++){
			if(nextProps.cars[i].options.visible != markers[i].visible){
				markers[i].setVisible(nextProps.cars[i].options.visible);
			}
		}
		this.setState({markers: markers});
	},
  	render: function() {
  		var cx = React.addons.classSet;
  		var classes = cx({
  			'gmap': this.state.gmap,
  			'markersMove': this.moveMarkers()
  		});
  		return (
  			<div>
  				<div className={classes}></div>
  			</div>
  		);
  	}
});

// React.render(<Gmap/>,document.getElementById("myMap"));
React.render(<CarList/>,document.getElementById("myMap"));