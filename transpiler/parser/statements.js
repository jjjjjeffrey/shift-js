var statement = require('./statement');

var statements = function(state, optionalNumLoops, breakIfEndParen) {
  var a = [], s, count = 0;
  breakIfEndParen = breakIfEndParen || false;

  while (true) {
    if(count >= optionalNumLoops) {
      break;
    }
    if (state.token.id === ";") {
      a.push( { "type": "EmptyStatement" } );
      break;
    } else if (state.token.id === "}" || state.token.id === "(end)" || state.token.id === "EOF") {
      break;
    } else if (breakIfEndParen) {
      if (state.token.id === ')') {
        break;
      }
    }
    s = statement(state);
    if (s) {
      a.push(s);
      count++;
    }
  }
  return a.length === 0 ? null : a.length === 1 ? a[0] : a;
};

module.exports = statements;
