/** @jsx React.DOM */
var Row = React.createClass({
	render: function(){
		var item = this.props.value;
		if(item.options.visible){
			return (
				<tr>
					<td>{item.title}</td>
					<td>{item.size}</td>
					<td>{item.coords.lat}</td>
					<td>{item.coords.lng}</td>
				</tr>
			);
		}
		else return null;
	}
});