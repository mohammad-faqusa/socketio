const Namespace = require('./../classes/Namespace')
const Room = require('./../classes/Room')

const wiki = new Namespace(
    0,
    'wikipedia',
    '/wiki',
    "https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png"
)
const mozilla = new Namespace(
    1,
    'mozilla',
    '/mozilla',
    'https://www.mozilla.org/media/img/logos/firefox/logo-quantum.9c5e96634f92.png'
)
const linux = new Namespace(
    2,
    'linux',
    '/linux',
    'https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png'
)

// constructor(roomId, roomTitle, namespaceId, privateRoom = false) {


wiki.addRoom(new Room(0, 'New Article', 0))
wiki.addRoom(new Room(1, 'Editors', 0))
wiki.addRoom(new Room(2, 'Other ', 0))

mozilla.addRoom(new Room(0, 'FireFox', 1))
mozilla.addRoom(new Room(1, 'SeaMonkey', 1))
mozilla.addRoom(new Room(2, 'Rust ', 1))

linux.addRoom(new Room(0, 'Debian', 2))
linux.addRoom(new Room(1, 'REd Hat', 2))
linux.addRoom(new Room(2, 'Ubuntu', 2))
linux.addRoom(new Room(3, 'Mac OS', 2))

const namespaces = [wiki, mozilla, linux] ; 

module.exports = namespaces 