const wrap = (line, maxLen) => {
  if (line.length <= maxLen) {
    return line;
  }
  const indexOfBlank = line.lastIndexOf(' ', maxLen);
  let split;
  let offset;

  if (indexOfBlank > -1) {
    split = indexOfBlank;
    offset = 1;
  } else {
    split = maxLen;
    offset = 0;
  }
  return (
    line.substring(0, split) +
    '\n' +
    wrap(line.substring(split + offset), maxLen)
  );

  // let newStr = '';
  // let j = 0;

  // for (let i = 0; i < line.length; i++) {
  //   newStr += line[i];
  //   j++;

  //   if (j > maxLen) {
  //     newStr += '\n';
  //     console.log('hit maxlen');
  //     j = 0;
  //   }
  // }
  // return newStr;

  // while (i < line.length) {
  //   let space = line.indexOf(' ', i);

  //   i += space;
  // }
};

module.exports = wrap;
