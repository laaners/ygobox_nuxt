const txt = require('fs')
    .readFileSync('C:\\ProjectIgnis\\deck\\Zarc.ydk')
    .toString();

const ris = {};
const types = ["Poster", "Effect", "Ritual", "Fusion", "Synchro", "Xyz", "Link"];
let i = 0;
let encountered = false;
for(line of txt.split('\r\n').filter(_=>_ !== '')) {
    if(line.includes("side")) encountered = true;
    if(!encountered) continue;
    if(!isNaN(+line)) {
        if(!line.includes('152000')) {
            ris[types[i]] = +line;
        }
        i++;
    }
}

console.log(`"imgs": ${JSON.stringify(ris,null,4)}\n},`);