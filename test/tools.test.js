const tools = require('../helper/tools')

describe('tools', () => {

    it('convert p 2 e', () => {
        expect(tools.p2e('۱۲۰۰۰۰')).toBe('120000');
    })
    it('persian string price to number', () => {
        expect(tools.string_2_number('۱۲۰٬۰۰۰')).toBe(120000);
    })
})