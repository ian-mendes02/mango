var cardapio = require('./cardapio.json');
var fs = require('fs');
var new_cardapio = [];
for (let item of cardapio.cozinha) {
    item['category'] = 'cozinha';
    new_cardapio.push(item)
}
for (let item of cardapio.sushi_bar) {
    item['category'] = 'sushi_bar';
    new_cardapio.push(item)
}

var subitems = Object.keys(cardapio.drinks);

for (let i = 0; i < subitems.length; i++) {
    var new_items = [];
    var item = subitems[i];
    for (let subitem of cardapio.drinks[item]) {
        subitem['category'] = `drinks,${item}`;
        new_items.push(subitem);
    }
    new_cardapio = new_cardapio.concat(new_items);
}

new_cardapio = JSON.stringify(new_cardapio, null, '\t');

fs.writeFile('./cardapio_new.json', new_cardapio, 'utf8', () => {});