这里放背景音乐

默认文件名：our-song.mp3

启用步骤：
1. 把音乐文件放到这个目录，命名为 our-song.mp3
2. 打开 src/data/content.ts，找到 music 配置
3. 把 enabled: false 改成 enabled: true
4. 重新构建（npm run build）

说明：
- 音乐默认不会自动播放（手机浏览器会阻止自动播放）。
- 由用户点击右上角的 ♪ 按钮开始 / 暂停。
- 音乐文件会随 PWA 一起缓存，离线也能播放。
