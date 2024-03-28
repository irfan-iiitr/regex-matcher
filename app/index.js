let exit_flag=true;

function match_digits(inputs, pattern) {
	for (let input of inputs) {
	  if (/\d/.test(input)) {
		return true;
	  }
	}
	return false;
  }
  
  function match_alphanum(inputs, pattern) {
	for (let c of inputs) {
	  if (/\w/.test(c)) {
		return true;
	  }
	}
	return false;
  }
  
  function match_group(input_line, pattern) {
	return input_line.search(new RegExp(`[${pattern}]`)) !== -1;
  }
  
  function match_character_group(text, regexp) {
	return regexp.includes(text);
  }
  
  function match_pattern(input_line, pattern) {
	
	if (pattern.length === 0) return true;
	if (pattern.length === 1 && pattern[0] === '?' && input_line.length === 0) return true;
	if (input_line.length === 0 && pattern[0] !== '$') return false;
  
	if (pattern.length > 1 && pattern[1] === '?') {
	  if (pattern[0] === input_line[0]) {
		return match_pattern(input_line.substr(1), pattern.substr(2));
	  }
	  return match_pattern(input_line, pattern.substr(2)) || match_pattern(input_line, pattern.substr(1));
	}
  
	if (pattern[0] === '.') {
	  return match_pattern(input_line.substr(1), pattern.substr(1));
	}
  
	if (pattern.length > 1 && pattern[1] === '+') {
	  const tempAdd = pattern[0] + pattern.substr(2);
	  return matchPlus(pattern[0], tempAdd, input_line);
	}
  
	if (pattern.substr(0, 2) === "\\d") {
	  if (/\d/.test(input_line[0])) {
		
		return match_pattern(input_line.substr(1), pattern.substr(2));
	  }
	  return match_pattern(input_line.substr(1), pattern);
	} else if (pattern.substr(0, 2) === "\\w") {
	  if (/\w/.test(input_line[0])) {
		return match_pattern(input_line.substr(1), pattern.substr(2));
	  }
	  return match_pattern(input_line.substr(1), pattern);
	} else if (pattern[0] === '$' && pattern.length === 1) {
	  return input_line.length === 0;
	} else if (pattern[0] === '[') {
	  const first = pattern.indexOf(']');
	  if (first === -1) {
		throw new Error("bad brackets bub");
	  }
	  const neg = pattern[1] === '^';
	  if (neg) {
		if (!match_group(input_line, pattern.substr(2, first - 1))) {
		  return match_pattern(input_line.substr(1), pattern.substr(first + 1));
		}
		return false;
	  }
	  if (match_group(input_line, pattern.substr(1, first - 1))) {
		return match_pattern(input_line.substr(1), pattern.substr(first + 1));
	  }
	  return false;
	} else if (pattern[0] === '^') {
	  const temp = pattern.substr(1);
	  const len = temp.length;
	  let i = 0;
	  while (i < len) {
		if (temp[i] !== input_line[i]) {
		  return false;
		}
		i++;
	  }
	  return match_pattern(input_line.substr(len), pattern.substr(len + 1));
	} else if (pattern[0] === '(') {
	  const fb = pattern.indexOf(')');
	  if (fb === -1) {
		throw new Error("bad brackets bub");
	  }
	  const ori = pattern.indexOf('|');
	  if (ori === -1) {
		throw new Error("bad brackets bub");
	  }
	  const s1 = pattern.substr(1, ori - 1);
	  const s2 = pattern.substr(ori + 1, fb - ori - 1);
	  return match_pattern(s1 + pattern.substr(fb + 1), input_line) || match_pattern(s2 + pattern.substr(fb + 1), input_line);
	}
  
	if (pattern[0] === input_line[0]) {
	  return match_pattern(input_line.substr(1), pattern.substr(1));
	}
  
	return false;
  }
  
  function matchPlus(c, regex, input) {
	let idx = 0;
	while (input[idx] === c) idx++;
	if (idx === 0) return false;
	return match_pattern(input.substr(idx), regex.substr(1));
  }
  
  function match_patterns(input_line, pattern) {
	if (pattern[0] === '+') {
	  throw new Error("invalid starting operator");
	}
	let idx = 0;
	do {
	  if (match_pattern(input_line, pattern)) {
		return true;
	  } else if (exit_flag === true) {
		exit_flag = false;
		return false;
	  }
	  input_line = input_line.substr(1); // move 1 step further
	} while (input_line !== "");
	return false;
  }

function main() {
	const pattern = process.argv[3];
	const inputLine = require("fs").readFileSync(0, "utf-8").trim();
	if (process.argv[2] !== "-E") {
		console.log("Expected first argument to be '-E'");
		process.exit(1);
	}
	// You can use print statements as follows for debugging, they'll be visible when running tests.
	console.log("Logs from your program will appear here");
	// Uncomment this block to pass the first stage
	if (match_patterns(inputLine, pattern)) {
		console.log(`Found`);
		process.exit(0);
	} else {
		console.log(`Not Found`);
		process.exit(1);
	}
}
main();