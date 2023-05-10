import React from 'react';
import SelectedNumbers from './SelectedNumbers';
import AllNumbers from './AllNumbers';
import { produce } from 'immer';

class NumberAdder extends React.Component {
    state = {
        allNumbers: [],
        selectedNumbers: [],
        lockedSelectedNumbers: []

    }
    generateRandomNumber = () => {
        var min = 1;
        var max = 1000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    onAddClick = () => {
        const { allNumbers } = this.state;
        const newState = produce(this.state, draftState => {
            draftState.allNumbers = [...allNumbers, this.generateRandomNumber()]
        });
        this.setState(newState)
    }
    onSelectClick = (n) => {
        const { selectedNumbers } = this.state;
        if (selectedNumbers.includes(n)) {
            this.setState({ selectedNumbers: selectedNumbers.filter(i => i !== n) });
        }
        else {

            this.setState({ selectedNumbers: [...selectedNumbers, n] });
        }

    }
    onLockClick = (n) => {
        const { lockedSelectedNumbers } = this.state;
        if (lockedSelectedNumbers.includes(n)) {
            this.setState({ lockedSelectedNumbers: lockedSelectedNumbers.filter(i => i !== n) });
        }
        else {
            this.setState({ lockedSelectedNumbers: [...lockedSelectedNumbers, n] });
        }
    }
    generateList = () => {
        const { selectedNumbers, lockedSelectedNumbers } = this.state;
        if (!selectedNumbers.length) {
            return
        }
        return (<>
            <div className="container">
                <div className="row p-5 rounded">
                    <div className="col-md-6 col-md-offset-3">
                        <h3>Selected Numbers </h3>
                        <ul className="list-group">
                            {selectedNumbers.map(n => <SelectedNumbers isLocked={lockedSelectedNumbers.includes(n)} onLockClick={this.onLockClick} number={n} />)}
                        </ul>
                    </div>
                </div>
            </div>
        </>
        )
    }

    render() {
        const { allNumbers, selectedNumbers, lockedSelectedNumbers } = this.state;
        return (<>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={this.onAddClick} className="btn btn-success btn-lg w-100">Add</button>
                    </div>
                </div>
                <div>
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Number</th>
                                <th>Add/Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allNumbers.map(n => <AllNumbers isSelected={selectedNumbers.includes(n)}
                                isLocked={lockedSelectedNumbers.includes(n)}
                                onSelectClick={this.onSelectClick} number={n} />)}
                        </tbody>
                    </table>
                </div>
            </div>
            {this.generateList()}
        </>
        );
    }
}

export default NumberAdder;