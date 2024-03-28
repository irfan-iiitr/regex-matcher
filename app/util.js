function isDigit(char){

	if(char >= '0' && char <= '9')
    return true;
	return false;
}

function isAlpha(char){
	if(char >= 'a' && char <= 'z') return true;
	if(char >= 'A' && char <= 'Z') return true;
	if(char === '_') return true;
	return false;
1
}
function hasAlphaNumeric(string){
	if(hasDigit(string)) return true;
	let alphaFound = false;
	for(const char of string){
		if(isAlpha(char)){
			alphaFound = true;
			break;
		}
	}
	return alphaFound;

1
}

function positiveCharacterGroups(inputLine,pattern){
   // console.log(inputLine,pattern);
    for(const char of pattern){
        if( inputLine.includes(char))
        return true;
    }
    return false;
}

function collectPatterns(input) {
    const patterns = [];
    input = typeof input === 'string' ? input.split('') : input;
    let i = 0;
    while (i < input.length) {
      if (input[i] === "\\") {
        patterns.push(input.slice(i, i + 2).join(''));
        i += 2;
      } else if (input[i] === "[") {
        const end = input.indexOf("]", i);
        patterns.push(input.slice(i, end + 1).join(''));
        i = end + 1;
      } else if (input[i] === "^") {
        const end = input.indexOf(" ", i);
        patterns.push(input.slice(i, end !== -1 ? end : undefined).join(''));
        i = end !== -1 ? end : input.length;
      } else {
        patterns.push(input[i]);
        i++;
      }
    }
    return patterns;
  }

module.exports = { isDigit, hasDigit, isAlpha, hasAlphaNumeric ,positiveCharacterGroups,collectPatterns};

