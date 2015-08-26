/** @jsx React.DOM */
var mapCoords ={lat: 32.867881, lng: -117.212951};
var mapZoom = 14;
//var carTitles=["Truck", "Sedan", "Van", "Motorcycle"];
// var carSizes=["xsmall","small","medium","large"];
var tableHeaders=["Title","Size","Latitude","Longtitude"];
var carArr = [{
		id: 1,
		title: "Truck",
		size: "large",
		coords: { lat: 32.867881, lng: -117.22 },
		options: { visible: true}
	},
	{
		id: 2,
		title: "Sedan",
		size: "small",
		coords: { lat: 32.868, lng: -117.23 },
		options: { visible: true }
	},
	{
		id: 3,
		title: "Van",
		size: "medium",
		coords: { lat: 32.87, lng: -117.21 },
		options: { visible: true }
	},
	{
		id: 4,
		title: "Motorcycle",
		size: "xsmall",
		coords: { lat: 32.869, lng: -117.21 },
		options: { visible: true }
	}];
var MapContainer = React.createClass({			// This will avoid re-render the dropdowns and only rerender the map
	getInitialState: function(){
		return {
			markers: this.props.markers
		};
	},
	componentDidMount: function(){					// Change coords of Cars input
		setInterval(function(){
			var markers = this.state.markers;
			for(var i = 0; i < markers.length; i++){
				markers[i].coords.lat= markers[i].coords.lat + (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
				markers[i].coords.lng= markers[i].coords.lng+ (Math.random() * (0.002 - 0.0001) + 0.0001) - 0.001;
		    }
		    this.setState({markers: markers});			// This will cause re-render
		}.bind(this), 1000);
	},
	render: function(){
		return (
			<div>
				<Gmap coord={this.props.coord} zoom={this.props.zoom} markers={this.state.markers}/>
				<Table headers={tableHeaders} rows={this.state.markers}/>
			</div>
		);
	}
});
var BodyContainer = React.createClass({
	getInitialState: function(){
		return {
			filterCar: "All",
			filterSize: "All",
			cars: carArr
		};
	},
	handleFilterCar: function(e){
		var select = e;
		var filter2 = this.state.filterSize;
		console.log("Select:"+select);
		console.log("Filter 2:"+filter2);
		if(select== "All" && filter2 == "All"){
			var cars = this.showAllCars();
		}
		else if (select== "All"){
			var cars = this.hideAllCars();
			cars.forEach(function(car){
				if(car.size == filter2){
					car.options.visible = true;
				}
			});
		}
		else if(filter2 == "All"){
			var cars = this.hideAllCars();
			cars.forEach(function(car){
				if(car.title == select){
					car.options.visible = true;
				}
			});
		}
		else {
			var cars = this.hideAllCars();
			cars.forEach(function(car){
				if(car.title == select && car.size == filter2){
					car.options.visible = true;
				}
			});
		}
		this.setState({
			filterCar: select,
			cars: cars
		});
	},
	handleFilterSize: function(e){
		var select = e;
		var filter1 = this.state.filterCar;
		console.log("Select:"+select);
		console.log("Filter 1:"+filter1);
		if(select== "All" && filter1 == "All"){
			var cars = this.showAllCars();
		}
		else if (select== "All"){
			var cars = this.hideAllCars();
			cars.forEach(function(car){
				if(car.title == filter1){
					car.options.visible = true;
				}
			});
		}
		else if(filter1 == "All"){
			var cars = this.hideAllCars();
			cars.forEach(function(car){
				if(car.size == select){
					car.options.visible = true;
				}
			});
		}
		else {
			var cars = this.hideAllCars();
			cars.forEach(function(car){
				if(car.size == select && car.title == filter1){
					car.options.visible = true;
				}
			});
		}
		this.setState({
			filterSize: select,
			cars: cars
		});
	},
	showAllCars: function(){
		var cars = this.state.cars;
		for(var i = 0; i < cars.length; i++){
	    	cars[i].options.visible = true;
	    }
	    return cars;
	},
	hideAllCars: function() {
		var cars = this.state.cars;
	   	for(var i = 0; i < cars.length; i++){
	    	cars[i].options.visible = false;
	    }
	    return cars;
	},
	render: function(){
		var carTitles = [];				// Get list of cars'title in array
		var carSizes = [];
		carArr.forEach(function(item){
			carTitles.push(item.title);
			carSizes.push(item.size);
		});
		return(
			<div>
				<Dropdown label={"Choose car: "} value={carTitles} handle={this.handleFilterCar}/>
				<Dropdown label={"Choose size: "} value={carSizes} handle={this.handleFilterSize}/>
				<MapContainer coord={mapCoords} zoom={mapZoom} markers={this.state.cars}/>
			</div>
		);
	}
});

React.render(<BodyContainer/>,document.getElementById("container"));