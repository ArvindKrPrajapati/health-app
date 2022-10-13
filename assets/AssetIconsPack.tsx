import React from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleSheet } from 'react-native';
import { IconPack, IconProvider } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import { Icons } from './icons';

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: props => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetIconsPack: IconPack<ImageProps | SvgProps> = {
  name: 'assets',
  icons: {
    leftArrow: createIcon(Icons.leftArrow),
    dropdown: createIcon(Icons.d),
    rightArrow: createIcon(Icons.rightArrow),
    upArrow: createIcon(Icons.upArrow),
    downArrow: createIcon(Icons.downArrow),
    downArr: createIcon(Icons.downArr),
    upArr: createIcon(Icons.upArr),
    website: createIcon(Icons.website),
    cancel: createIcon(Icons.cancel),
    headphone: createIcon(Icons.headphone),
    question: createIcon(Icons.question),
    eye: createIcon(Icons.eye),
    eyeHide: createIcon(Icons.eyeHide),
    happyFace: createIcon(Icons.happyFace),
    rightChevron: createIcon(Icons.rightChevron),
    leftChevron: createIcon(Icons.leftChevron),
    email: createIcon(Icons.email),
    facebook: createIcon(Icons.facebook),
    gg: createIcon(Icons.gg),
    user: createIcon(Icons.user),
    padLock: createIcon(Icons.padLock),
    openPadLock: createIcon(Icons.openPadLock),
    smartphone: createIcon(Icons.smartphone),
    refresh: createIcon(Icons.refresh),
    search: createIcon(Icons.search),
    search16: createIcon(Icons.search16),
    addNew: createIcon(Icons.addNew),
    menu: createIcon(Icons.menu),
    fire: createIcon(Icons.fire),
    chat: createIcon(Icons.chat),
    edit: createIcon(Icons.edit),
    star: createIcon(Icons.star),
    star1: createIcon(Icons.star1),
    download: createIcon(Icons.download),
    upload: createIcon(Icons.upload),
    paperPlane: createIcon(Icons.paperPlane),
    link: createIcon(Icons.link),
    haha: createIcon(Icons.haha),
    lovely: createIcon(Icons.lovely),
    wow: createIcon(Icons.wow),
    smile: createIcon(Icons.smile),
    addUser: createIcon(Icons.addUser),
    plusCircle: createIcon(Icons.plusCircle),
    like: createIcon(Icons.like),
    arrowRight16: createIcon(Icons.arrowRight16),
    creditCard: createIcon(Icons.creditCard),
    barChart1: createIcon(Icons.barChart1),
    image: createIcon(Icons.image),
    phoneCall: createIcon(Icons.phoneCall),
    phoneCall1: createIcon(Icons.phoneCall1),
    house: createIcon(Icons.house),
    volume: createIcon(Icons.volume),
    settings: createIcon(Icons.settings),
    beachHouse: createIcon(Icons.beachHouse),
    calendar: createIcon(Icons.calendar),
    diagonalArrow: createIcon(Icons.diagonalArrow),
    diagonalArrow3: createIcon(Icons.diagonalArrow3),
    fb: createIcon(Icons.fb),
    shopping: createIcon(Icons.shopping),
    crown: createIcon(Icons.crown),
    truck: createIcon(Icons.truck),
    heart: createIcon(Icons.heart),
    insurance: createIcon(Icons.insurance),
    worldWide: createIcon(Icons.worldWide),
    halfMoon: createIcon(Icons.halfMoon),
    target2: createIcon(Icons.target2),
    chat1: createIcon(Icons.chat1),
    pin: createIcon(Icons.pin),
    checked: createIcon(Icons.checked),
    check: createIcon(Icons.check),
    notification: createIcon(Icons.notification),
    filter: createIcon(Icons.filter),
    grid: createIcon(Icons.grid),
    list: createIcon(Icons.list),
    arrowRightCircle: createIcon(Icons.arrowRightCircle),
    pause: createIcon(Icons.pause),
    play: createIcon(Icons.play),
    music: createIcon(Icons.music),
    camera: createIcon(Icons.camera),
    radioCheck: createIcon(Icons.radioCheck),
    bookmark: createIcon(Icons.bookmark),
    book: createIcon(Icons.book),
    wallClock: createIcon(Icons.wallClock),
    redo: createIcon(Icons.redo),
    undo: createIcon(Icons.undo),
    add: createIcon(Icons.add),
    drawMenu: createIcon(Icons.drawMenu),
    fullscreen: createIcon(Icons.fullscreen),
    thumb: createIcon(Icons.thumb),
    union: createIcon(Icons.union),
    fb1: createIcon(Icons.fb1),
    ig: createIcon(Icons.ig),
    tw: createIcon(Icons.tw),
    exclude: createIcon(Icons.exclude),
    grow: createIcon(Icons.grow),
    down: createIcon(Icons.down),
    arrow: createIcon(Icons.arrow),
    littecoin: createIcon(Icons.littecoin),
    eth: createIcon(Icons.eth),
    bitcoin: createIcon(Icons.bitcoin),
    xrp: createIcon(Icons.xrp),
    tether: createIcon(Icons.tether),
    achain: createIcon(Icons.achain),
    exchange: createIcon(Icons.exchange),
    dollar: createIcon(Icons.dollar),
    downChevron: createIcon(Icons.downChevron),
    sold: createIcon(Icons.sold),
    bought: createIcon(Icons.bought),
    time: createIcon(Icons.time),
    trash: createIcon(Icons.trash),
    plus: createIcon(Icons.plus),
    minus: createIcon(Icons.minus),
    shop: createIcon(Icons.shop),
    motorcycle: createIcon(Icons.motorcycle),
    video: createIcon(Icons.video),
    billBoard: createIcon(Icons.billBoard),
    done: createIcon(Icons.check),
    dropdown: createIcon(Icons.arrDropdown),
  },
};
export default AssetIconsPack;
