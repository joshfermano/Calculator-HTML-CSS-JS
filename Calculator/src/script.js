document.addEventListener('DOMContentLoaded', () => {
  const display_input = document.querySelector('.input');
  const display_output = document.querySelector('.output');
  const keys = document.querySelectorAll('.key');

  let input = '';

  keys.forEach((key) => {
    const value = key.dataset.key;

    key.addEventListener('click', () => {
      if (value === 'clear') {
        input = '';
        display_input.innerHTML = '';
        display_output.innerHTML = '';
      } else if (value === 'backspace') {
        input = input.slice(0, -1);
        display_input.innerHTML = operatorInput(input);
      } else if (value === '=') {
        try {
          let result = eval(percentInput(input));
          display_output.innerHTML = properOutput(result);
        } catch (error) {
          display_output.innerHTML = 'Error';
        }
      } else if (value === 'brackets') {
        // Check Brackets
        if (
          input.indexOf('(') === -1 ||
          (input.indexOf('(') !== -1 &&
            input.indexOf(')') !== -1 &&
            input.lastIndexOf('(') < input.lastIndexOf(')'))
        ) {
          input += '(';
        } else if (
          (input.indexOf('(') !== -1 && input.indexOf(')') === -1) ||
          (input.indexOf('(') !== -1 &&
            input.indexOf(')') !== -1 &&
            input.lastIndexOf('(') > input.lastIndexOf(')'))
        ) {
          input += ')';
        }

        display_input.innerHTML = operatorInput(input);
      } else {
        if (validate(value)) {
          input += value;
          display_input.innerHTML = operatorInput(input);
        }
      }
    });
  });

  const operatorInput = (input) => {
    let input_array = input.split('');
    let input_array_length = input_array.length;

    for (let i = 0; i < input_array_length; i++) {
      if (input_array[i] === '*') {
        input_array[i] = `<span class="operator"> x </span>`;
      } else if (input_array[i] === '/') {
        input_array[i] = `<span class="operator"> ÷ </span>`;
      } else if (input_array[i] === '+') {
        input_array[i] = `<span class="operator"> + </span>`;
      } else if (input_array[i] === '-') {
        input_array[i] = `<span class="operator"> - </span>`;
      } else if (input_array[i] === '(') {
        input_array[i] = `<span class="brackets"> (</span>`;
      } else if (input_array[i] === ')') {
        input_array[i] = `<span class="brackets">) </span>`;
      } else if (input_array[i] === '%') {
        input_array[i] = `<span class="percent"> % </span>`;
      }
    }

    return input_array.join('');
  };

  const properOutput = (output) => {
    let output_str = output.toString();
    let decimal = output_str.split('.')[1];
    output_str = output_str.split('.')[0];

    let output_array = output_str.split('');

    if (output_array.length > 3) {
      for (let i = output_array.length - 3; i > 0; i -= 3) {
        output_array.splice(i, 0, ',');
      }
    }

    if (decimal) {
      output_array.push('.');
      output_array.push(decimal);
    }

    return output_array.join('');
  };

  const validate = (value) => {
    let last_input = input.slice(-1);
    let operators = ['+', '-', '*', '/'];

    if (value === '.' && last_input === '.') {
      return false;
    }

    if (operators.includes(value)) {
      if (operators.includes(last_input)) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  };

  const percentInput = (input) => {
    let input_arr = input.split('');

    for (let i = 0; i < input_arr.length; i++) {
      if (input_arr[i] === '%') {
        input_arr[i] = '/100';
      }
    }

    return input_arr.join('');
  };
});
