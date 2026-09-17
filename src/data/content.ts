/**
 * ============================================================
 *  OUR LITTLE UNIVERSE — 内容中心
 * ============================================================
 *  以后只需要修改这个文件，就能替换整个 App 的文字、照片和音乐。
 *
 *  照片怎么放：
 *    把照片放到 public/photos/ 目录，文件名与下方配置一致即可，
 *    例如 story-01.jpg、about-01.jpg、birthday.jpg。
 *    照片不存在时页面会自动显示优雅的占位图，不会出现破图。
 *
 *  音乐怎么放：
 *    把音乐放到 public/music/our-song.mp3，
 *    然后把下方 music.enabled 改成 true。
 * ============================================================
 */

/** 照片目录 + 路径助手 */
export const photoDir = './photos/'
export const photo = (file: string) => `${photoDir}${file}`

/* ------------------------------------------------------------
 * Opening 开场
 * ------------------------------------------------------------ */
export const opening = {
  title: 'OUR LITTLE UNIVERSE',
  subtitle: 'A tiny universe made for you.',
  enterButton: '进入',
}

/* ------------------------------------------------------------
 * Home 主页
 * ------------------------------------------------------------ */
export const home = {
  title: 'OUR LITTLE UNIVERSE',
  welcome: '欢迎来到我们的世界。',
  entries: [
    { path: '/story', label: 'OUR STORY', subtitle: '我们的故事' },
    { path: '/letters', label: 'LETTERS', subtitle: '写给你的信' },
    { path: '/about', label: 'ABOUT YOU', subtitle: '关于你' },
    { path: '/future', label: 'OUR FUTURE', subtitle: '我们的未来' },
  ],
}

/* ------------------------------------------------------------
 * Our Story 我们的故事（纵向时间线）
 * 目前全部是占位内容，以后替换成真实故事。
 * highlight: true 的节点会用金色实心点标记（如生日当天）。
 * ------------------------------------------------------------ */
export interface StoryItem {
  date: string
  title: string
  photo: string
  text: string
  note?: string
  highlight?: boolean
}

export const story = {
  kicker: 'OUR STORY',
  title: '我们的故事',
  items: [
    {
      date: '2023.03',
      title: '第一次见面',
      photo: 'story-01.jpg',
      text: '这里以后写我们第一次见面的故事。',
    },
    {
      date: '2024.05.21',
      title: '第一次约会',
      photo: 'story-02.jpg',
      text: '这里以后写第一次约会的故事。',
    },
    {
      date: '2025.06.16',
      title: '第一次旅行',
      photo: 'story-03.jpg',
      text: '这里以后写第一次旅行的故事。',
    },
    {
      date: '2026.10.05',
      title: '第一次去找你',
      photo: 'story-04.jpg',
      text: '这里以后写第一次去找你的故事。',
    },
    {
      date: '2026.01.01',
      title: '一起跨年',
      photo: 'story-05.jpg',
      text: '这里以后放照片、视频和故事。',
    },
    {
      date: '2026.09.XX',
      title: '今天',
      photo: 'story-06.jpg',
      text: '生日快乐。',
      note: '这里以后放生日当天的照片和我想对她说的话。',
      highlight: true,
    },
  ] as StoryItem[],
  /* 时间线最后的未来部分：故事还在继续 */
  futureSection: {
    label: 'FUTURE',
    line1: '这里还没有故事。',
    line2: '因为我们的故事还在继续。',
  },
}

/* ------------------------------------------------------------
 * Letters 写给你的信
 * locked: true 的信件会显示 LOCKED，暂时无法打开。
 * paragraphs 支持多段；字符串里的 \n 会保留为换行。
 * ------------------------------------------------------------ */
export interface Letter {
  id: string
  title: string
  date?: string
  locked?: boolean
  lockedNote?: string
  unlockDate?: string
  paragraphs?: string[]
  signature?: string
}

export const letters = {
  kicker: 'LETTERS',
  title: '写给你的信',
  intro: '有些话，写在这里，慢慢说给你听。',
  list: [
    {
      id: 'to-you-now',
      title: '给现在的你',
      date: '2026 · 现在',
      paragraphs: [
        '这是第一封信的占位内容。\n以后我会把想对你说的话，一个字一个字地写在这里。',
        '（这封信的内容以后在 src/data/content.ts 里修改。）',
      ],
      signature: '爱你的我',
    },
    {
      id: 'when-you-are-sad',
      title: '你难过的时候',
      date: '任何时候',
      paragraphs: [
        '这是占位内容。\n以后这里会写：当你难过的时候，我希望你知道的那些事。',
      ],
      signature: '一直在的我',
    },
    {
      id: 'when-you-miss-me',
      title: '你想我的时候',
      date: '任何时候',
      paragraphs: [
        '这是占位内容。\n以后这里会写：你想我的时候，读到这里会笑出来的那些事。',
      ],
      signature: '也在想你的我',
    },
    {
      id: 'when-we-fight',
      title: '我们吵架的时候',
      date: '希望很少用到',
      paragraphs: [
        '这是占位内容。\n以后这里会写：我们吵架的时候，我希望我们都能想起的话。',
      ],
      signature: '先低头的我',
    },
    {
      id: 'happy-birthday',
      title: '生日快乐',
      date: '2026.09',
      paragraphs: [
        '这是占位内容。\n以后这里会写一封完整的生日信。',
        '今天，整个世界都应该对你温柔一点。',
      ],
      signature: '你的我',
    },
    {
      id: 'to-future-you',
      title: '给未来的你',
      locked: true,
      lockedNote: '这封信属于未来的你。',
      unlockDate: '2027 • 生日',
    },
  ] as Letter[],
}

/* ------------------------------------------------------------
 * About You 关于你（10 件小事，全部占位，以后替换）
 * ------------------------------------------------------------ */
export interface AboutItem {
  no: number
  title: string
  photo: string
  text: string
}

export const about = {
  title: 'THINGS I LOVE ABOUT YOU',
  subtitle: '关于你的很多小事。',
  items: [
    { no: 1, title: '你的笑容', photo: 'about-01.jpg', text: '这里以后写我喜欢你的一个细节。' },
    { no: 2, title: '你开心的时候', photo: 'about-02.jpg', text: '这里以后写一个只有我注意到的细节。' },
    { no: 3, title: '你认真的样子', photo: 'about-03.jpg', text: '这里以后写我喜欢你的一个细节。' },
    { no: 4, title: '你说话的声音', photo: 'about-04.jpg', text: '这里以后写一个只有我注意到的细节。' },
    { no: 5, title: '你喊我名字的时候', photo: 'about-05.jpg', text: '这里以后写我喜欢你的一个细节。' },
    { no: 6, title: '你等我的耐心', photo: 'about-06.jpg', text: '这里以后写一个只有我注意到的细节。' },
    { no: 7, title: '你傻乎乎的样子', photo: 'about-07.jpg', text: '这里以后写我喜欢你的一个细节。' },
    { no: 8, title: '你生气也那么可爱', photo: 'about-08.jpg', text: '这里以后写一个只有我注意到的细节。' },
    { no: 9, title: '你和我在一起的时候', photo: 'about-09.jpg', text: '这里以后写我喜欢你的一个细节。' },
    { no: 10, title: '你是我的全部', photo: 'about-10.jpg', text: '这里以后写最重要的一句话。' },
  ] as AboutItem[],
}

/* ------------------------------------------------------------
 * Our Future 我们的未来
 * status: 'now' 表示我们现在所在的时间点（金色实心点）
 * ------------------------------------------------------------ */
export interface FutureMilestone {
  year: string
  label: string
  status: 'now' | 'future'
}

export const future = {
  kicker: 'OUR FUTURE',
  title: '我们的未来',
  milestones: [
    { year: '2026', label: '我们现在', status: 'now' },
    { year: '2027', label: '等待故事', status: 'future' },
    { year: '2028', label: '等待故事', status: 'future' },
    { year: '2029', label: '等待故事', status: 'future' },
    { year: '2030', label: '等待故事', status: 'future' },
  ] as FutureMilestone[],
  /* 这句话以后可以随时改 */
  note: ['我不知道未来会是什么样。', '但我希望未来的每一个版本里，都还有你。'],
}

/* ------------------------------------------------------------
 * Birthday 生日彩蛋
 * sequence 会按照顺序一段一段播放（轻触屏幕可以加快）。
 * 以后把这里换成真正想对她说的话。
 * ------------------------------------------------------------ */
export type BirthdayStep =
  | { type: 'text'; text: string }
  | { type: 'title'; text: string }
  | { type: 'photo'; src: string; alt: string }
  | { type: 'lines'; lines: string[] }

export const birthday = {
  sequence: [
    { type: 'text', text: 'Hey.' },
    { type: 'text', text: '今天是你的生日。' },
    { type: 'title', text: 'HAPPY BIRTHDAY' },
    { type: 'photo', src: 'birthday.jpg', alt: '生日快乐' },
    {
      type: 'lines',
      lines: [
        '谢谢你来到我的世界。',
        '我把我们的过去、现在，以及我希望和你一起经历的未来，都放进了这个小小的世界里。',
      ],
    },
    { type: 'text', text: '生日快乐。' },
  ] as BirthdayStep[],
}

/* ------------------------------------------------------------
 * Music 音乐系统（预留）
 * 现在还没有音乐。以后：
 *   1. 把音乐文件放到 public/music/our-song.mp3
 *   2. 把 enabled 改成 true
 * 音乐不会自动播放（手机浏览器会阻止），由用户点击 ♪ 开始。
 * ------------------------------------------------------------ */
export const music = {
  enabled: false, // ← 放入音乐后改成 true
  src: './music/our-song.mp3',
  title: 'Our Song',
  volume: 0.45,
  loop: true,
}
