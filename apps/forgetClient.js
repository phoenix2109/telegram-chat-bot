const ForgeClient = require("forex-quotes").default;

const client = new ForgeClient('ARd6BPCkZjEMlc18acL3ilmg73h3qHJT');

module.exports = {
  symbols: async () => {
    let res = await client.getSymbols();
    // console.log(res);
    return res
  }
}