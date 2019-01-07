const expect = require('expect');

const{Users} = require('./users');

beforeEach(() => {
  users = new Users();
  users.users = [{
    id: '1',
    name: 'Mike',
    room: 'Node Course'
  },{
    id: '2',
    name: 'Florence',
    room: 'React Course'
  },{
    id: '3',
    name: 'Julie',
    room: 'Node Course'
  }];
});
describe('Users', () => {
  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Florence',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should return names for node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Florence']);
  });

  it('should remove user 1', () => {
    var userList = users.removeUser('1');
    var newUserList = [{
        id: '2',
        name: 'Florence',
        room: 'React Course'
      },{
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }];

    expect(userList).toEqual(newUserList);

  } );
  it('should remove user 2', () => {
    var userList = users.removeUser('2');
    var newUserList = [{
        id: '1',
        name: 'Mike',
        room: 'Node Course'
      },{
        id: '3',
        name: 'Julie',
        room: 'Node Course'
      }];

    expect(userList).toEqual(newUserList);
  } );

  it('should not remove user', () => {
    var userList = users.removeUser('44');

    expect(userList).toEqual(users.users);
  } );
  it('should find user 2', () => {
    var user = users.getUser('2');

    expect(user).toEqual([users.users[1]]);

  } );
  it('should not find user', () => {
    var user = users.getUser('44');
    expect(user).toEqual([]);
  } );

  it('should detect duplicate username', () => {
    var dupUser = 'Florence';
    var uniqUser = 'Oprah';
    var room1 = 'React Course';
    var room2 = 'Node Course';

    var result = users.isDuplicate(dupUser,room1);
    expect(result).toBeTruthy();
    result = users.isDuplicate(dupUser,room2);
    expect(result).toBeFalsy();
    result = users.isDuplicate(uniqUser);
    expect(result).toBeFalsy();
  })
});
