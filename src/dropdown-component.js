/** @jsx React.DOM */
var Dropdown = React.createClass({
	getInitialState: function(){
		return {
			selectedValue: "all",
		};
	},
	handleChange: function(e){
		this.setState({selectedValue: e.target.value});
		if(this.props.handle){				// child-parent communication
			this.props.handle(e.target.value);
		}
	},
	render: function(){
		var items = this.props.value.map(function(item){
			return <option value={item}>{item}</option>;
		});
		return (
			<div>
			  	<label>{this.props.label}</label>
			  	<select value={this.state.selectedValue} onChange={this.handleChange}>
					<option value="All">All</option>
					{items}
				</select>
			</div>
		);
	}
});