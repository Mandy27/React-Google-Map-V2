/** @jsx React.DOM */
var Table = React.createClass({
	render: function(){
		var headers = this.props.headers.map(function(item){
			return <th value={item}>{item}</th>;
		});
		var rows = this.props.rows.map(function(item){
			return <Row value={item}/>;
		});
		return (
			<table>
				<tr>
			    	{headers}
			  	</tr>
			  	{rows}
			</table>
		);
	}
});