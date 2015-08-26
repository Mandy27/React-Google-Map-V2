/** @jsx React.DOM */
var Gmap = React.createClass({
	getInitialState: function(){
  		return {
  			map: null,
  			markers:[]
  		};
	},
	componentDidMount: function(){		// componentDidMount is called once the component is rendered
		console.log("DidMount");
		var newmap;
		var newmarkers=[];
    	newmap = new google.maps.Map(this.getDOMNode(), {
     		center: this.props.coord,
     		zoom: this.props.zoom
   		});
   		if(this.props.markers != undefined){
   			this.props.markers.forEach(function(item){
				var marker = new google.maps.Marker({
					id: item.id,
	    			position: item.coords,
	    			options: item.options,
	    			map: newmap,
	  			});
	  			newmarkers.push(marker);
			});
		}
		this.setState({map: newmap, markers: newmarkers});
	},
	componentWillReceiveProps: function(props){   // Any props change will cause this function fire
		//Assume only markers'info change
		var newmarkers = props.markers;
		var markers = this.state.markers;
		for(var i = 0; i < markers.length; i++){
			if(newmarkers[i].options.visible != markers[i].visible){
				markers[i].setVisible(newmarkers[i].options.visible);
			}
			markers[i].setPosition(new google.maps.LatLng(newmarkers[i].coords.lat, newmarkers[i].coords.lng));
     	}
	},
	render: function() {
  		return (
  			<div className="myMap"></div>
  		);
  	}
});
