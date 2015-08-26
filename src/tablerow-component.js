/** @jsx React.DOM */
var Row = React.createClass({
	render: function(){
		var item = this.props.value;
		var style = {
			border: '1px solid black',
			width: '20em'
		};
		if(item.options.visible){
			return (
				<tr>
					<td style={style}>{item.title}</td>
					<td style={style}>{item.size}</td>
					<td style={style}>{item.coords.lat}</td>
					<td style={style}>{item.coords.lng}</td>
				</tr>
			);
		}
		else return null;
	}
});