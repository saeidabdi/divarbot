const car = require('../services/strategy/car/conditions')

describe('strategy', () => {
    describe('car', () => {
        it('car', () => {
            expect(car('۱۲۰۰۰۰')).toBe('120000');
        })

    })

})