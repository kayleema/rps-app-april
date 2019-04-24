import {FakeRepo} from '../src/fakeRepo'

describe('Fake HistoryRepo', () => {
    it('returns empty history', () => {
        let repo = new FakeRepo();

        let result = repo.getRounds();

        expect(result).toEqual([]);
    });

    it('returns saved history', () => {
        let repo = new FakeRepo();

        repo.save({
            playerOneHand: 'p1hand',
            playerTwoHand: 'p2hand',
            result: 'result'
        });
        let result = repo.getRounds();

        expect(result).toEqual([{
            playerOneHand: 'p1hand',
            playerTwoHand: 'p2hand',
            result: 'result'
        }]);
    });

    it('returns multiple saved history', () => {
        let repo = new FakeRepo();

        repo.save({
            playerOneHand: 'p1hand',
            playerTwoHand: 'p2hand',
            result: 'result'
        });
        repo.save({
            playerOneHand: 'p1hand2',
            playerTwoHand: 'p2hand2',
            result: 'result2'
        });
        let result = repo.getRounds();

        expect(result).toEqual([{
            playerOneHand: 'p1hand',
            playerTwoHand: 'p2hand',
            result: 'result'
        }, {
            playerOneHand: 'p1hand2',
            playerTwoHand: 'p2hand2',
            result: 'result2'
        }]);
    });
})