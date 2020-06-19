import {
  Component,
  ComponentInterface,
  Element,
  getAssetPath,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core';
import { ComponentSize } from '../../interface';

const map = {
  activity: 'activity.svg',
  airplay: 'airplay.svg',
  'alert-circle': 'alert-circle.svg',
  'alert-octagon': 'alert-octagon.svg',
  'alert-triangle': 'alert-triangle.svg',
  'align-center': 'align-center.svg',
  'align-justify': 'align-justify.svg',
  'align-left': 'align-left.svg',
  'align-right': 'align-right.svg',
  anchor: 'anchor.svg',
  aperture: 'aperture.svg',
  archive: 'archive.svg',
  'arrow-down': 'arrow-down.svg',
  'arrow-down-circle': 'arrow-down-circle.svg',
  'arrow-down-left': 'arrow-down-left.svg',
  'arrow-down-right': 'arrow-down-right.svg',
  'arrow-left': 'arrow-left.svg',
  'arrow-left-circle': 'arrow-left-circle.svg',
  'arrow-right': 'arrow-right.svg',
  'arrow-right-circle': 'arrow-right-circle.svg',
  'arrow-up': 'arrow-up.svg',
  'arrow-up-circle': 'arrow-up-circle.svg',
  'arrow-up-left': 'arrow-up-left.svg',
  'arrow-up-right': 'arrow-up-right.svg',
  'at-sign': 'at-sign.svg',
  atSign: 'at-sign.svg',
  award: 'award.svg',
  'bar-chart': 'bar-chart.svg',
  'bar-chart-2': 'bar-chart-2.svg',
  battery: 'battery.svg',
  'battery-charging': 'battery-charging.svg',
  bell: 'bell.svg',
  'bell-off': 'bell-off.svg',
  bluetooth: 'bluetooth.svg',
  bold: 'bold.svg',
  book: 'book.svg',
  'book-open': 'book-open.svg',
  bookmark: 'bookmark.svg',
  box: 'box.svg',
  briefcase: 'briefcase.svg',
  calendar: 'calendar.svg',
  camera: 'camera.svg',
  'camera-off': 'camera-off.svg',
  cast: 'cast.svg',
  check: 'check.svg',
  'check-circle': 'check-circle.svg',
  'check-square': 'check-square.svg',
  'chevron-down': 'chevron-down.svg',
  'chevron-left': 'chevron-left.svg',
  'chevron-right': 'chevron-right.svg',
  'chevron-up': 'chevron-up.svg',
  'chevrons-down': 'chevrons-down.svg',
  'chevrons-left': 'chevrons-left.svg',
  'chevrons-right': 'chevrons-right.svg',
  'chevrons-up': 'chevrons-up.svg',
  chrome: 'chrome.svg',
  circle: 'circle.svg',
  clipboard: 'clipboard.svg',
  clock: 'clock.svg',
  cloud: 'cloud.svg',
  'cloud-drizzle': 'cloud-drizzle.svg',
  'cloud-lightning': 'cloud-lightning.svg',
  'cloud-off': 'cloud-off.svg',
  'cloud-rain': 'cloud-rain.svg',
  'cloud-snow': 'cloud-snow.svg',
  code: 'code.svg',
  codepen: 'codepen.svg',
  codesandbox: 'codesandbox.svg',
  coffee: 'coffee.svg',
  columns: 'columns.svg',
  command: 'command.svg',
  compass: 'compass.svg',
  copy: 'copy.svg',
  'corner-down-left': 'corner-down-left.svg',
  'corner-down-right': 'corner-down-right.svg',
  'corner-left-down': 'corner-left-down.svg',
  'corner-left-up': 'corner-left-up.svg',
  'corner-right-down': 'corner-right-down.svg',
  'corner-right-up': 'corner-right-up.svg',
  'corner-up-left': 'corner-up-left.svg',
  'corner-up-right': 'corner-up-right.svg',
  cpu: 'cpu.svg',
  'credit-card': 'credit-card.svg',
  crop: 'crop.svg',
  crosshair: 'crosshair.svg',
  database: 'database.svg',
  delete: 'delete.svg',
  disc: 'disc.svg',
  'dollar-sign': 'dollar-sign.svg',
  download: 'download.svg',
  'download-cloud': 'download-cloud.svg',
  droplet: 'droplet.svg',
  edit: 'edit.svg',
  'edit-2': 'edit-2.svg',
  'edit-3': 'edit-3.svg',
  'external-link': 'external-link.svg',
  eye: 'eye.svg',
  'eye-off': 'eye-off.svg',
  facebook: 'facebook.svg',
  'fast-forward': 'fast-forward.svg',
  feather: 'feather.svg',
  figma: 'figma.svg',
  file: 'file.svg',
  'file-minus': 'file-minus.svg',
  'file-plus': 'file-plus.svg',
  'file-text': 'file-text.svg',
  film: 'film.svg',
  filter: 'filter.svg',
  flag: 'flag.svg',
  folder: 'folder.svg',
  'folder-minus': 'folder-minus.svg',
  'folder-plus': 'folder-plus.svg',
  framer: 'framer.svg',
  frown: 'frown.svg',
  gift: 'gift.svg',
  'git-branch': 'git-branch.svg',
  'git-commit': 'git-commit.svg',
  'git-merge': 'git-merge.svg',
  'git-pull-request': 'git-pull-request.svg',
  github: 'github.svg',
  gitlab: 'gitlab.svg',
  globe: 'globe.svg',
  grid: 'grid.svg',
  'hard-drive': 'hard-drive.svg',
  hash: 'hash.svg',
  headphones: 'headphones.svg',
  heart: 'heart.svg',
  'help-circle': 'help-circle.svg',
  hexagon: 'hexagon.svg',
  home: 'home.svg',
  image: 'image.svg',
  inbox: 'inbox.svg',
  info: 'info.svg',
  instagram: 'instagram.svg',
  italic: 'italic.svg',
  key: 'key.svg',
  layers: 'layers.svg',
  layout: 'layout.svg',
  'life-buoy': 'life-buoy.svg',
  link: 'link.svg',
  'link-2': 'link-2.svg',
  linkedin: 'linkedin.svg',
  list: 'list.svg',
  loader: 'loader.svg',
  lock: 'lock.svg',
  'log-in': 'log-in.svg',
  'log-out': 'log-out.svg',
  logo: 'logo.svg',
  mail: 'mail.svg',
  map: 'map.svg',
  'map-pin': 'map-pin.svg',
  maximize: 'maximize.svg',
  'maximize-2': 'maximize-2.svg',
  meh: 'meh.svg',
  menu: 'menu.svg',
  'message-circle': 'message-circle.svg',
  'message-square': 'message-square.svg',
  mic: 'mic.svg',
  'mic-off': 'mic-off.svg',
  minimize: 'minimize.svg',
  'minimize-2': 'minimize-2.svg',
  minus: 'minus.svg',
  'minus-circle': 'minus-circle.svg',
  'minus-square': 'minus-square.svg',
  monitor: 'monitor.svg',
  moon: 'moon.svg',
  'more-horizontal': 'more-horizontal.svg',
  'more-vertical': 'more-vertical.svg',
  'mouse-pointer': 'mouse-pointer.svg',
  move: 'move.svg',
  music: 'music.svg',
  navigation: 'navigation.svg',
  'navigation-2': 'navigation-2.svg',
  octagon: 'octagon.svg',
  package: 'package.svg',
  paperclip: 'paperclip.svg',
  pause: 'pause.svg',
  'pause-circle': 'pause-circle.svg',
  'pen-tool': 'pen-tool.svg',
  percent: 'percent.svg',
  phone: 'phone.svg',
  'phone-call': 'phone-call.svg',
  'phone-forwarded': 'phone-forwarded.svg',
  'phone-incoming': 'phone-incoming.svg',
  'phone-missed': 'phone-missed.svg',
  'phone-off': 'phone-off.svg',
  'phone-outgoing': 'phone-outgoing.svg',
  'pie-chart': 'pie-chart.svg',
  play: 'play.svg',
  'play-circle': 'play-circle.svg',
  plus: 'plus.svg',
  'plus-circle': 'plus-circle.svg',
  'plus-square': 'plus-square.svg',
  pocket: 'pocket.svg',
  power: 'power.svg',
  printer: 'printer.svg',
  radio: 'radio.svg',
  'refresh-ccw': 'refresh-ccw.svg',
  'refresh-cw': 'refresh-cw.svg',
  repeat: 'repeat.svg',
  rewind: 'rewind.svg',
  'rotate-ccw': 'rotate-ccw.svg',
  'rotate-cw': 'rotate-cw.svg',
  rss: 'rss.svg',
  save: 'save.svg',
  scissors: 'scissors.svg',
  search: 'search.svg',
  send: 'send.svg',
  server: 'server.svg',
  settings: 'settings.svg',
  share: 'share.svg',
  'share-2': 'share-2.svg',
  shield: 'shield.svg',
  'shield-off': 'shield-off.svg',
  'shopping-bag': 'shopping-bag.svg',
  'shopping-cart': 'shopping-cart.svg',
  shuffle: 'shuffle.svg',
  sidebar: 'sidebar.svg',
  'skip-back': 'skip-back.svg',
  'skip-forward': 'skip-forward.svg',
  slack: 'slack.svg',
  slash: 'slash.svg',
  sliders: 'sliders.svg',
  smartphone: 'smartphone.svg',
  smile: 'smile.svg',
  speaker: 'speaker.svg',
  square: 'square.svg',
  star: 'star.svg',
  'stop-circle': 'stop-circle.svg',
  sun: 'sun.svg',
  sunrise: 'sunrise.svg',
  sunset: 'sunset.svg',
  tablet: 'tablet.svg',
  tag: 'tag.svg',
  target: 'target.svg',
  terminal: 'terminal.svg',
  thermometer: 'thermometer.svg',
  'thumbs-down': 'thumbs-down.svg',
  'thumbs-up': 'thumbs-up.svg',
  'toggle-left': 'toggle-left.svg',
  'toggle-right': 'toggle-right.svg',
  tool: 'tool.svg',
  trash: 'trash.svg',
  'trash-2': 'trash-2.svg',
  trello: 'trello.svg',
  'trending-down': 'trending-down.svg',
  'trending-up': 'trending-up.svg',
  triangle: 'triangle.svg',
  truck: 'truck.svg',
  tv: 'tv.svg',
  twitch: 'twitch.svg',
  twitter: 'twitter.svg',
  type: 'type.svg',
  umbrella: 'umbrella.svg',
  underline: 'underline.svg',
  unlock: 'unlock.svg',
  upload: 'upload.svg',
  'upload-cloud': 'upload-cloud.svg',
  user: 'user.svg',
  'user-check': 'user-check.svg',
  'user-minus': 'user-minus.svg',
  'user-plus': 'user-plus.svg',
  'user-x': 'user-x.svg',
  users: 'users.svg',
  video: 'video.svg',
  'video-off': 'video-off.svg',
  voicemail: 'voicemail.svg',
  volume: 'volume.svg',
  'volume-1': 'volume-1.svg',
  'volume-2': 'volume-2.svg',
  'volume-x': 'volume-x.svg',
  watch: 'watch.svg',
  wifi: 'wifi.svg',
  'wifi-off': 'wifi-off.svg',
  wind: 'wind.svg',
  x: 'x.svg',
  'x-circle': 'x-circle.svg',
  'x-octagon': 'x-octagon.svg',
  'x-square': 'x-square.svg',
  youtube: 'youtube.svg',
  zap: 'zap.svg',
  'zap-off': 'zap-off.svg',
  'zoom-in': 'zoom-in.svg',
  'zoom-out': 'zoom-out.svg',
};

export type Icons = keyof typeof map;

@Component({
  tag: 'eui-icon',
  styleUrl: 'icon.scss',
  scoped: true,
  assetsDirs: ['assets'],
})
export class Icon implements ComponentInterface {
  @Element() el: HTMLEuiIconElement;

  /**
   * sets the source of the image to one of your assets
   */
  @Prop({ reflect: true }) src?: string;

  /**
   * the name of the icon in case it used with the built in ones
   */
  @Prop({ reflect: true }) icon?: Icons;

  /**
   * type of the icon it can be svg or img, it takes a guess if not provided
   */
  @Prop() type?: 'img' | 'svg';

  // CSS properties
  /**
   * sets the size of the component
   *
   * @type {ComponentSize}
   */
  @Prop({ reflect: true }) size: ComponentSize = 'small';

  @State() innerType: string;
  @State() innerSrc: string;
  @State() error: boolean;

  componentWillRender(): Promise<void> | void {
    this.init();
  }

  getSrc(): string {
    return getAssetPath(`./assets/${map[this.icon]}`);
  }

  render(): HTMLEuiIconElement {
    return (
      !this.error &&
      (
        <Host
          style={{
            '--width' : 'var(--width-' + this.size + ')',
            '--height' : 'var(--height-' + this.size + ')',
            '--padding' : 'var(--padding-' + this.size + ')',
            '--stroke-width' : 'var(--stroke-width-' + this.size + ')',
          }}
        >
          {
            this.innerType === 'img' ? <img src={this.innerSrc} alt="" /> : <eui-svg src={this.innerSrc} />
          }
        </Host>
      )
    );
  }

  private init(): void {
    this.validateInput();

    if (this.src) {
      this.innerSrc = this.src;
    } else {
      this.innerType = 'svg';
      this.innerSrc = this.getSrc();
    }

    if (!this.type) {
      this.innerType = Icon.isSvg(this.innerSrc);
    } else {
      this.innerType = this.type;
    }
  }

  private validateInput(): void {
    if (!this.src && !this.icon) {
      this.error = true;
      console.error('You must provide an src or an icon to `eui-icon`');
      return;
    }
    this.error = false;
    if (this.src && this.icon) {
      console.warn(
        `You should only provide an src(${this.src}) or an icon(${this.icon}) to "eui-icon", defaults to src.`
      );
    }
    if (this.icon && !map[this.icon]) {
      console.warn(
        `The given icon is not recognised (${this.icon}), use one from the list`,
        Object.keys(map)
      );
    }
  }

  private static isSvg(url: string): 'svg' | 'img' {
    const guess = url.split(/[#?]/)[0].split('.').pop().trim();
    if (guess === 'svg') {
      return 'svg';
    } else {
      return 'img';
    }
  }
}
