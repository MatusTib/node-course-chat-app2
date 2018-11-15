var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate a correct location object', () => {
    let from = 'Florence';
    let latitude = 12.345
    let longitude = 34.5678;
    let url = 'https://www.google.com/maps?q=12.345,34.5678';

    let locationMessage = generateLocationMessage(from,latitude,longitude);
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(url);

    expect(typeof locationMessage.createdAt).toBe('number');
    expect(locationMessage).toMatchObject({from, url});
  })

  it('should generate a correct location object with negative longitude', () => {
    let from = 'Florence';
    let latitude = 12.345
    let longitude = -34.5678;
    let url = 'https://www.google.com/maps?q=12.345,-34.5678';

    let locationMessage = generateLocationMessage(from,latitude,longitude);
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(url);

    expect(typeof locationMessage.createdAt).toBe('number');
    expect(locationMessage).toMatchObject({from, url});
  })

  it('should generate a correct location object with negative latitude and longitude', () => {
    let from = 'Florence';
    let latitude = -12.345
    let longitude = -34.5678;
    let url = 'https://www.google.com/maps?q=-12.345,-34.5678';

    let locationMessage = generateLocationMessage(from,latitude,longitude);
    expect(locationMessage.from).toBe(from);
    expect(locationMessage.url).toBe(url);

    expect(typeof locationMessage.createdAt).toBe('number');
    expect(locationMessage).toMatchObject({from, url});
  })

})
