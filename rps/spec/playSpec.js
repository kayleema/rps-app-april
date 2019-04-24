import {Requests} from '../src/play'

describe('play function', () => {
    let testRepo = {
        save: () => {
        }
    };

    describe('Player 1 wins', () => {
        let observer;
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['playerOneWins']);
        })

        it('rock vs scissors', () => {
            new Requests(testRepo).play("rock", "scissors", observer);

            expect(observer.playerOneWins).toHaveBeenCalled();
        })

        it('scissors vs paper', () => {
            new Requests(testRepo).play("scissors", "paper", observer);

            expect(observer.playerOneWins).toHaveBeenCalled();
        })

        it('paper vs rock', () => {
            new Requests(testRepo).play("paper", "rock", observer);

            expect(observer.playerOneWins).toHaveBeenCalled();
        })
    })

    describe('Player 2 wins', () => {
        let observer;
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['playerTwoWins']);
        })

        it('scissors vs rock', () => {
            new Requests(testRepo).play("scissors", "rock", observer);

            expect(observer.playerTwoWins).toHaveBeenCalled();
        })

        it('rock vs paper', () => {
            new Requests(testRepo).play("rock", "paper", observer);

            expect(observer.playerTwoWins).toHaveBeenCalled();
        })

        it('paper vs scissors', () => {
            new Requests(testRepo).play("paper", "scissors", observer);

            expect(observer.playerTwoWins).toHaveBeenCalled();
        })
    })

    describe('Tie', () => {
        let observer;
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['tie']);
        })

        it('scissors vs scissors', () => {
            new Requests(testRepo).play("scissors", "scissors", observer);

            expect(observer.tie).toHaveBeenCalled();
        })

        it('rock vs rock', () => {
            new Requests(testRepo).play("rock", "rock", observer);

            expect(observer.tie).toHaveBeenCalled();
        })

        it('paper vs paper', () => {
            new Requests(testRepo).play("paper", "paper", observer);

            expect(observer.tie).toHaveBeenCalled();
        })
    })

    describe('Invalid', () => {
        let observer;
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['invalid']);
        })

        it('scissors vs inoshishi', () => {
            new Requests(testRepo).play("scissors", "inoshishi", observer);

            expect(observer.invalid).toHaveBeenCalled();
        })

        it('random vs scissors', () => {
            new Requests(testRepo).play(Math.random(), "scissors", observer);

            expect(observer.invalid).toHaveBeenCalled();
        })
    })

    describe('Save History', () => {
        let spyRepo, testObserver;
        beforeEach(() => {
            spyRepo = jasmine.createSpyObj('repo', ['save']);
            testObserver = {
                invalid: () => {
                },
                playerOneWins: () => {
                },
                playerTwoWins: () => {
                },
                tie: () => {
                }
            };
        });

        it('saves an invalid game result after a game has been played', () => {
            new Requests(spyRepo).play(
                'rock', 'イノシシ', testObserver);

            expect(spyRepo.save).toHaveBeenCalledWith({
                playerOneHand: "rock",
                playerTwoHand: "イノシシ",
                result: "invalid"
            });
        });
        it('saves a player 1 wins game result after a game has been played', () => {
            new Requests(spyRepo).play(
                'rock', 'scissors', testObserver);

            expect(spyRepo.save).toHaveBeenCalledWith({
                playerOneHand: "rock",
                playerTwoHand: "scissors",
                result: "Player One Wins"
            });
        });
        it('saves a player 2 wins game result after a game has been played', () => {
            new Requests(spyRepo).play(
                'scissors', 'rock', testObserver);

            expect(spyRepo.save).toHaveBeenCalledWith({
                playerOneHand: "scissors",
                playerTwoHand: "rock",
                result: "Player Two Wins"
            });
        });
        it('saves a tie game result after a game has been played', () => {
            new Requests(spyRepo).play(
                'scissors', 'scissors', testObserver);

            expect(spyRepo.save).toHaveBeenCalledWith({
                playerOneHand: "scissors",
                playerTwoHand: "scissors",
                result: "Tie"
            });
        });
    });
    describe('Get History', () => {
        it('calls noRounds when empty history', () => {
            let observer = jasmine.createSpyObj('observer', ['noRounds']);
            let stubRepo = {
                getRounds: () => []
            };

            new Requests(stubRepo).getHistory(observer);

            expect(observer.noRounds).toHaveBeenCalled();
        });
        it('calls rounds when not empty history', () => {
            let observer = jasmine.createSpyObj('observer', ['rounds']);
            let stubRepo = {
                getRounds: () => [{
                    playerOneHand: "player1hand",
                    playerTwoHand: "player2hand",
                    result: "result"
                }]
            };

            new Requests(stubRepo).getHistory(observer);

            expect(observer.rounds).toHaveBeenCalledWith([{
                playerOneHand: "player1hand",
                playerTwoHand: "player2hand",
                result: "result"
            }]);
        });
    })
})
