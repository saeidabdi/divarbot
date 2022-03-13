const car = require('../services/strategy/car/conditions')
const axios = require('axios')

describe('strategy', () => {
    describe('car', () => {
        it('best wiht config', () => {
            axios.get('https://api.divar.ir/v8/posts/gYqwSNDv/')
                .then(response => {
                    let result = car({
                            post: response.data,
                            config: {
                                color: 'سفید',
                                karkard: '100000',
                                model: '1399',
                                motor: 'سالم',
                                shasi: 'سالم و پلمپ',
                                body: '/Argentina|سالم و بی‌خط و خش|خط و خش جزئی',
                                girbox: 'دنده‌ای',
                            }
                        }
                    )
                    console.log('result',result)
                    expect('ssssssss');
                })

        })

    })

})