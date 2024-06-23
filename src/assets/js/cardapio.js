/**
 * @typedef {object} MenuItem
 * @property {string} ID
 * @property {string} codigo
 * @property {string} nome
 * @property {string} descricao
 * @property {string} variavel
 * @property {string} preco
 * @property {string} formato
 * @property {number} unidades
 * @property {number} peso
 * @property {number} volume
 * @property {string} codigo_pai
 * @property {string} descricao_completa
 * @property {string} obs
 * @property {string} tags
 * @property {string} categorias
 * @property {string} img
 */
const fs = require('fs');
/**
 * @type {MenuItem[]}
 */
var cardapio = require('D:\\Ian\\Dev\\mango\\src\\assets\\json\\cardapio.json');
var _cardapio = [];
for (let i = 0; i < cardapio.length; i++) {
    var item = cardapio[i];
    item.ID = (i + 1) * 100;
    if (item.img == "") item.img = "placeholder.webp";
    //item.img = item.img.replace("/pratos/", "")
    _cardapio.push(item);
}
var json = JSON.stringify(_cardapio, undefined, "\t");
var json_min = JSON.stringify(_cardapio);
fs.writeFile(
    'D:\\Ian\\Dev\\mango\\src\\assets\\json\\cardapio.json',
    json,
    'utf-8',
    () => null
);
fs.writeFile(
    'D:\\Ian\\Dev\\mango\\src\\assets\\json\\cardapio_min.json',
    json_min,
    'utf-8',
    () => null
);