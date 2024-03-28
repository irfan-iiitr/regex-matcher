# Regex Matcher

This is a command-line tool that matches a given pattern against an input line using regular expressions.

## Usage

To use the regex matcher, follow these steps:

1. Install Node.js on your machine.
2. Clone this repository.
3. Open a terminal and navigate to the project directory.
4. Run the following command to install the dependencies:

   ```shell
   npm install
   ```

5. Run the following command to execute the regex matcher:

   ```shell
   node index.js -E <pattern>
   ```

   Replace `<pattern>` with the regular expression pattern you want to match.
6. Enter your input as needed.
7. After you have completed typing your input, press Ctrl + Z (Windows) or Ctrl + D (Unix-like systems), then press Enter.
8. The program will read an input line from the standard input and check if it matches the given pattern.
9. If a match is found, the program will output "Found". Otherwise, it will output "Not Found".

## Examples

Here are some examples of how to use the regex matcher:

- To match any digit in the input line:

  ```shell
  node index.js -E \d
  ```

- To match any alphanumeric character in the input line:

  ```shell
  node index.js -E \w
  ```

- To match a specific character or character group in the input line:

  ```shell
  node index.js -E [aeiou]
  ```

- To match a pattern at the beginning of the input line:

  ```shell
  node index.js -E ^pattern
  ```

- To match a pattern at the end of the input line:

  ```shell
  node index.js -E pattern$
  ```

- To match a pattern with one or more occurrences of a character:

  ```shell
  node index.js -E a+
  ```
- To match one of two characters in the input line (for example, either 'a' or 'b'):
  ```shell
  node index.js -E (a|b)
  ```
- To match zero or one occurrence of a character 'a' in the input line:
  ```shell
  node index.js -E a?
  ```

Feel free to explore more complex regular expressions and experiment with different patterns.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.