const fs = require('fs');

const html2json = require('html2json').html2json;


const part = "9";
const html = fs.readFileSync( `./vocabulary-part-${part}.html`, { encoding:'utf8', flag:'r' } )

let result = [];

const json = html2json(html)

const { child: myTab } = json

myTab.map( item => {

    if(item.tag == "li"){
        const itemObj = {}

        itemObj.english = item.attr['data-hw'] || ""
        itemObj.type = item.child[3].child[0]['text'] || ""
        itemObj.level = item.attr['data-ox5000'] || ""
        itemObj.url_definition = item.child[1].attr['href'] || ""
        itemObj.url_audion_1 = item.child[5]?.child[5]?.attr['data-src-mp3'] || ""
        itemObj.url_audion_2 = item.child[5]?.child[3]?.attr['data-src-mp3'] || ""

        result.push(itemObj)
    }
})

const jsonResult = JSON.stringify(result)

fs.writeFile(`result-part-${part}.json`, jsonResult, err => {
    if (err) {
      console.error(err);
    }
});