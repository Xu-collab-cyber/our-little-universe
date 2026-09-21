这里放背景音乐

默认文件名：our-song.m4a（AAC 音频，所有现代浏览器和手机均可播放；
也可以放 our-song.mp3，同时改 content.ts 里的 music.src 即可）

启用步骤：
1. 把音乐文件放到这个目录
2. 打开 src/data/content.ts，找到 music 配置，把 src 改成对应文件名
3. 把 enabled 设为 true
4. 重新构建（npm run build）

说明：
- 音乐默认不会自动播放（手机浏览器会阻止自动播放）。
- 由用户点击右下角的 ♪ 按钮开始 / 暂停。
- 音乐按钮挂在 App 层，切换页面不会中断播放。
- 音乐文件会随 PWA 一起缓存，离线也能播放。
