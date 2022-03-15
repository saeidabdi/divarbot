const tools = require('../../../helper/tools')

const filter = ({post, config}) => {
    let score = 0;
    if (Object.keys(config).length === 0)
        return true;
    let scoreEarned = Object.keys(config).length * 10;
    if (config.flexible)
        scoreEarned -= 10;

    let list_data = post.widgets.list_data;
    if (!list_data)
        return false;

    let brand = list_data.find(l => l.title === 'برند و تیپ');
    if(config.not && config.not.includes(brand.value))


    if (list_data[0].format === 'group_info_row') {
        list_data[0].items.map(v => {
            switch (v.title) {
                case 'رنگ':
                    if (config.color && config.color.includes(v.value))
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
    // if(config.flexible === 0)
    let sumWithScore = config.flexible || 10;
    if (score + sumWithScore >= scoreEarned)
        return true;
    return false;
}

module.exports = filter



