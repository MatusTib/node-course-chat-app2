var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate a correct message object', () => {
    let from = 'Florence';
    let text = 'Hey there. What time are we meeting?';

    let message = generateMessage(from,text);
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, text});
  })
})
