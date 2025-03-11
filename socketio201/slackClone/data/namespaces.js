
const Namespace = require('./../classes/Namespace')
const Room = require('./../classes/Room')

const wikiNs = new Namespace(
      0,
     'Wikipidia',
     'https://upload.wikimedia.org/wikipedia/en/thumb/8/80/Wikipedia-logo-v2.svg/103px-Wikipedia-logo-v2.svg.png',
     '/wiki'
     )



const mozNs = new Namespace(
      1,
     'Mozilla',
     'https://pngimg.com/uploads/firefox/firefox_PNG1.png',
     '/mozilla'
     )

const linuxNs = new Namespace(
      2,
     'linux',
     'https://www.pngall.com/wp-content/uploads/5/Linux-Logo-PNG-Download-Image.png',
     '/linux'
     )

wikiNs.addRoom(new Room(0, 'New Articles', 0));
wikiNs.addRoom(new Room(1, 'New Editors', 0));
wikiNs.addRoom(new Room(2, 'Other', 0));

mozNs.addRoom(new Room(0, 'FireFox', 1));
mozNs.addRoom(new Room(1, 'SeaMonkey', 1));
mozNs.addRoom(new Room(2, 'SpiderMOnkey', 1));
mozNs.addRoom(new Room(3, 'Rust', 1));
    
linuxNs.addRoom(new Room(0, 'Debian', 2));
linuxNs.addRoom(new Room(1, 'Red Hat', 2));
linuxNs.addRoom(new Room(2, 'Ubuntu', 2));
linuxNs.addRoom(new Room(3, 'Mac OS', 2));
    
const namespaces = [wikiNs, mozNs, linuxNs]

module.exports = namespaces; 