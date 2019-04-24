export class Requests {
    constructor(repo) {
        this.repo = repo;
    }

    play(playerOneHand, playerTwoHand, observer) {
        new PlayRoundRequest(playerOneHand, playerTwoHand, observer, this.repo)
            .process()
    }

    getHistory(observer) {
        let result = this.repo.getRounds();
        if (result.length === 0) {
            observer.noRounds();
        } else {
            observer.rounds(result);
        }
    }
}

class PlayRoundRequest {
    constructor(playerOneHand, playerTwoHand, observer, repo) {
        this.playerOneHand = playerOneHand;
        this.playerTwoHand = playerTwoHand;
        this.observer = observer;
        this.repo = repo;
    }

    process() {
        if (!this.handsValid()) {
            this.observer.invalid();
            this.repo.save({
                playerOneHand: this.playerOneHand,
                playerTwoHand: this.playerTwoHand,
                result: 'invalid'
            });
        } else if (this.playerTwoWins()) {
            this.observer.playerTwoWins();
            this.repo.save({
                playerOneHand: this.playerOneHand,
                playerTwoHand: this.playerTwoHand,
                result: 'Player Two Wins'
            });
        } else if (this.isTie()) {
            this.observer.tie();
            this.repo.save({
                playerOneHand: this.playerOneHand,
                playerTwoHand: this.playerTwoHand,
                result: 'Tie'
            });
        } else {
            this.observer.playerOneWins();
            this.repo.save({
                playerOneHand: this.playerOneHand,
                playerTwoHand: this.playerTwoHand,
                result: 'Player One Wins'
            });
        }
    }

    playerTwoWins() {
        return this.playerOneHand === Hand.Scissors && this.playerTwoHand === Hand.Rock ||
            this.playerOneHand === Hand.Rock && this.playerTwoHand === Hand.Paper ||
            this.playerOneHand === Hand.Paper && this.playerTwoHand === Hand.Scissors
    }

    handsValid() {
        const validHands = [Hand.Scissors, Hand.Rock, Hand.Paper];
        return validHands.includes(this.playerOneHand) &&
            validHands.includes(this.playerTwoHand)
    }

    isTie() {
        return this.playerOneHand === this.playerTwoHand;
    }
}

const Hand = {
    Rock: "rock",
    Paper: "paper",
    Scissors: "scissors"
}

