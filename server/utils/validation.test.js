const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should reject numbers', () => {
    let res = isRealString(198);

    expect(res).toBeFalsy();
  })
  it('should reject fractions', () => {
    let res = isRealString(12.345);

    expect(res).toBeFalsy();
  })

  it('should reject strings with only spaces', () => {
    let onlyspaces = '    ';
    let emptystr = '';
    expect(isRealString(onlyspaces)).toBeFalsy();
    expect(isRealString(emptystr)).toBeFalsy();
  })

  it('should allow strings with non-space characters', () => {
    let username = '  Florence  ';
    let room = 'node Course Students';
    expect(isRealString(username)).toBeTruthy();
    expect(isRealString(room)).toBeTruthy();

  })

})
