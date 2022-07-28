const fs = require('fs').promises;

async function escribir(){
    const lista = `arroz\npan\naceite\nsal\ncarne`

await fs.writeFile('shopping.txt', lista,'utf-8')
const datos = await fs.readFile('shopping.txt','utf-8')
console.log(datos)

await fs.rename('shopping.txt', 'mini-market.txt')
await fs.unlink('mini-market.txt')
}

escribir()