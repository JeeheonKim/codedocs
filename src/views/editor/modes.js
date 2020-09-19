import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/yaml/yaml';

const getMode = (val) => {
  let output = '';
  switch (val) {
    case 'Javascript':
      output = 'javascript';
      break;
    case 'C':
      output = 'text/x-csrc';
      break;
    case 'C++':
      output = 'text/x-c++src';
      break;
    case 'Java':
      output = 'text/x-java';
      break;
    case 'Python':
      output = 'text/x-python';
      break;
    default:
      output = val;
  }
  return output;
};

export default {getMode};
