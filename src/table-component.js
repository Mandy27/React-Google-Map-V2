/** @jsx React.DOM */
var Table = React.createClass({
	render: function(){
		var headers = this.props.headers.map(function(item){
			return <th value={item}>{item}</th>;
		});
		var rows = this.props.rows.map(function(item){
			return <Row value={item}/>;
		});
		var style = {
			border: '1px solid black',
			'margin-top': '2em'
		};
		return (
			<table style={style}>
				<tr>
			    	{headers}
			  	</tr>
			  	{rows}
			</table>
		);
	}
});