import {Requests} from '../src/play'
import {FakeRepo} from "../src/fakeRepo";

describe('play function', () => {
    describe('Save History', () => {
        let testObserver;
        let fakeRepo;
        beforeEach(() => {
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
            fakeRepo = new FakeRepo();
        });
        it('saves an invalid game result after a game has been played', () => {
            new Requests(fakeRepo).play(
                'rock', 'イノシシ', testObserver);

            expect(fakeRepo.getRounds()).toEqual([{
                playerOneHand: "rock",
                playerTwoHand: "イノシシ",
                result: "invalid"
            }]);
        });
        it('saves a player 1 wins game result after a game has been played', () => {
            new Requests(fakeRepo).play(
                'rock', 'scissors', testObserver);

            expect(fakeRepo.getRounds()).toEqual([{
                playerOneHand: "rock",
                playerTwoHand: "scissors",
                result: "Player One Wins"
            }]);
        });
        it('saves a player 2 wins game result after a game has been played', () => {
            new Requests(fakeRepo).play(
                'scissors', 'rock', testObserver);

            expect(fakeRepo.getRounds()).toEqual([{
                playerOneHand: "scissors",
                playerTwoHand: "rock",
                result: "Player Two Wins"
            }]);
        });
        it('saves a tie game result after a game has been played', () => {
            new Requests(fakeRepo).play(
                'rock', 'rock', testObserver);

            expect(fakeRepo.getRounds()).toEqual([{
                playerOneHand: "rock",
                playerTwoHand: "rock",
                result: "Tie"
            }]);
        });
    });
    describe('Get History', () => {
        it('calls noRounds when empty history', () => {
            let fakeRepo = new FakeRepo();
            let spyObserver = jasmine.createSpyObj('observer', ['noRounds'])
            new Requests(fakeRepo).getHistory(spyObserver);

            expect(spyObserver.noRounds).toHaveBeenCalled();
        });
        it('calls rounds when not empty history', () => {
            let fakeRepo = new FakeRepo();
            let spyObserver = jasmine.createSpyObj('observer', ['rounds', 'playerTwoWins'])
            let requests = new Requests(fakeRepo);

            requests.play('rock', 'paper', spyObserver);
            requests.getHistory(spyObserver);

            expect(spyObserver.rounds).toHaveBeenCalled();
        });
    })
})
