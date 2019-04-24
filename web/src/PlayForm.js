import React from 'react'

export default class PlayForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            result: null
        }
    }

    onClickSubmit() {
        this.props.requests.play(
            this.state.playerOneInput,
            this.state.playerTwoInput,
            this);
    }

    invalid() {
        this.setState({result: "invalid input"})
    }

    playerOneWins() {
        this.setState({result: "Player One Wins!"})
    }

    playerTwoWins() {
        this.setState({result: "Player Two Wins!"})
    }

    tie() {
        this.setState({result: "Tie"})
    }

    onChangePlayerOneInput(event) {
        this.setState({
            playerOneInput: event.target.value
        });
    }

    onChangePlayerTwoInput(event) {
        this.setState({
            playerTwoInput: event.target.value
        });
    }

    onClickHistory() {
        this.props.requests.getHistory(this);
    }

    rounds(roundsList) {
        this.setState({history: roundsList});
    }

    noRounds() {
        this.setState({history: []});
    }

    render() {
        return (
            <div>
                <h1>RPS App</h1>
                <input
                    onChange={this.onChangePlayerOneInput.bind(this)}
                    name='player1'
                />
                <input
                    onChange={this.onChangePlayerTwoInput.bind(this)}
                    name='player2'
                />
                <button onClick={this.onClickSubmit.bind(this)}>登録</button>
                <button onClick={this.onClickHistory.bind(this)} id={"history"}>History</button>
                <div>{this.state.result}</div>
                <h2>History</h2>
                {this.state.history && this.state.history.length === 0 && (
                    <p>History is Empty</p>
                )}
                {this.state.history && this.state.history.map(round => (
                    <p>
                        {round.playerOneHand}, {round.playerTwoHand}, {round.result}
                    </p>
                ))}
            </div>
        )
    }
}
