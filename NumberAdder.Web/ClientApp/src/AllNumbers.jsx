import React from 'react';
class AllNumbers extends React.Component {

onSelectClick = () => {
    const {onSelectClick, number} = this.props;
    onSelectClick(number)
}


    render() {
        const {number, isSelected, isLocked} = this.props;
        return (<>    
                <tr>
                    <td>{number}</td>
                    <td>
                        <button disabled={isLocked} onClick={this.onSelectClick} 
                        className={`btn ${isSelected ? 'btn-danger' : 'btn-success'}`}>
                        {isSelected ? 'Remove from selected' : 'Add to select'}</button>
                    </td>
                </tr>
        </>);
    }
}

export default AllNumbers;