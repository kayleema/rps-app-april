import ReactDOM from 'react-dom'
import React from 'react'
import PlayForm from '../src/PlayForm'
import ReactTestUtils from 'react-dom/test-utils'

describe('WebSpec', function () {
    let domFixture

    beforeEach(() => {
        domFixture = document.createElement('div')
        document.querySelector('body').appendChild(domFixture)
    })

    afterEach(() => {
        domFixture.remove()
    })

    it('displays title', () => {
        ReactDOM.render(
            <PlayForm/>,
            domFixture,
        );

        expect(domFixture.innerText).toContain('RPS App')
    });

    describe('PlayForm', () => {
        it("displays invalid input when inputs aren't valid", () => {
            let requestsStub = {
                play: (playerOneHand, playerTwoHand, observer) => (
                    observer.invalid()
                )
            };

            ReactDOM.render(
                <PlayForm requests={requestsStub}/>,
                domFixture,
            );

            expect(domFixture.innerText).not.toContain('invalid input');

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('invalid input');
        });

        it('displays player 1 wins', () => {
            let requestsStub = {
                play: (playerOneHand, playerTwoHand, observer) => (
                    observer.playerOneWins()
                )
            };

            ReactDOM.render(
                <PlayForm requests={requestsStub}/>,
                domFixture,
            );

            expect(domFixture.innerText).not.toContain('Player One Wins!');

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('Player One Wins!');
        });

        it('displays player 2 wins', () => {
            let requestsStub = {
                play: (playerOneHand, playerTwoHand, observer) => (
                    observer.playerTwoWins()
                )
            };

            ReactDOM.render(
                <PlayForm requests={requestsStub}/>,
                domFixture,
            );

            expect(domFixture.innerText).not.toContain('Player Two Wins!');

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('Player Two Wins!');
        });

        it('displays tie', () => {

            let requestsStub = {
                play: (playerOneHand, playerTwoHand, observer) => (
                    observer.tie()
                )
            };

            ReactDOM.render(
                <PlayForm requests={requestsStub}/>,
                domFixture,
            );

            expect(domFixture.innerText).not.toContain('Tie');

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('Tie');
        });

        it('Calls Requests Play with input text', () => {
            let playSpy = jasmine.createSpy('playSpy');
            const requests = {
                play: playSpy
            };

            ReactDOM.render(
                <PlayForm requests={requests}/>,
                domFixture,
            );

            const input1 = document.querySelector(
                'input[name="player1"]'
            );
            const input2 = document.querySelector(
                'input[name="player2"]'
            );
            input1.value = 'player1Hand';
            ReactTestUtils.Simulate.change(input1);
            input2.value = 'player2Hand';
            ReactTestUtils.Simulate.change(input2);

            document.querySelector('button').click();

            expect(playSpy).toHaveBeenCalledWith(
                'player1Hand', 'player2Hand',
                jasmine.any(PlayForm));
        });

        it('displays empty history', () => {
            let requestsStub = {
                getHistory: (observer) => (
                    observer.noRounds()
                )
            };

            ReactDOM.render(
                <PlayForm requests={requestsStub}/>,
                domFixture,
            );

            expect(domFixture.innerText).not.toContain('History is Empty');

            document.querySelector('button#history').click();

            expect(domFixture.innerText).toContain('History is Empty');
        });

        it('displays history', () => {
            let requestsStub = {
                getHistory: (observer) => (
                    observer.rounds([
                        {playerOneHand: 'player1hand', playerTwoHand: 'player2hand', result: 'result'},
                    ])
                )
            };

            ReactDOM.render(
                <PlayForm requests={requestsStub}/>,
                domFixture,
            );

            expect(domFixture.innerText).not.toContain('player1hand, player2hand, result');

            document.querySelector('button#history').click();

            expect(domFixture.innerText).toContain('player1hand, player2hand, result');
        });
    })
})
