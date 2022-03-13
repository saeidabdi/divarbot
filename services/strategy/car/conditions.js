const tools = require('../../../helper/tools')
const axios = require("axios");

const filter = ({post, config}) => {
    let score = 0;
    if (Object.keys(config).length === 0)
        return true;
    let scoreEarned = Object.keys(config).length * 10;
    if (config.flexible)
        scoreEarned -= 10;

    let list_data = post.widgets.list_data;
    if (!list_data)
        return score;

    if (list_data[0].format === 'group_info_row') {
        list_data[0].items.map(v => {
            switch (v.title) {
                case 'رنگ':
                    if (config.color && config.color === v.value)
                        score += 10;
                    break;
                case 'کارکرد':
                    if (config.karkard && config.karkard <= tools.string_2_number(v.value))
                        score += 10;
                    break;
                case 'مدل (سال تولید)':
                    if (config.model && config.model >= tools.string_2_number(v.value))
                        score += 10;
                    break;
            }

        })
    }

    list_data.map(l => {
        switch (l.title) {
            case 'وضعیت موتور':
                if (config.motor && config.motor === l.value)
                    score += 10;
                break;
            case 'وضعیت شاسی‌ها':
                if (config.shasi && config.shasi === l.value)
                    score += 10;
                break;
            case 'وضعیت بدنه':
                if (config.body) {
                    if (config.body.includes(l.value))
                        score += 10;
                }
                break;
            case 'گیربکس':
                if (config.girbox && config.girbox === l.value)
                    score += 10;
                break;
        }
    })

    let price = list_data.find(l => l.title === 'قیمت');
    if (price && config.price && tools.string_2_number(price.value) <= config.price)
        score += 10;
    else if (price && price.value && price.description && (price.description.includes('منصفانه‌ای') || price.description.includes('پایین')))
        score += 10;

    console.log('score', score)
    console.log('scoreEarned', scoreEarned)
    let sumWithScore = config.flexible || 0;
    if (score + sumWithScore >= scoreEarned)
        return true;
    return false;
}

module.exports = filter



