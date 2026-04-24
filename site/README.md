# site · 源码


## 本地开发

```bash
npm install
npm run dev       # http://localhost:4321
```

## 构建

```bash
npm run build     # 产物在 dist/
npm run preview   # 预览 dist
```

## 目录

```
src/
├── content/
│   ├── books/        每本书 = 一个 .mdx
│   └── years/        每年一段手写段落
├── components/       鱼尾 / 印章 / 雷达图 / 书卡 …
├── layouts/          BaseLayout / BookLayout
├── pages/            首页 / 书 / 年 / 主题 / 系列 / 关于
├── content.config.ts
├── styles/global.css
└── assets/
```

## 新增一本书

1. 在 `src/content/books/` 新建 `{slug}.mdx`
2. frontmatter 必填字段见 `src/content.config.ts`
3. 正文按 IDEA §4 的结构：TL;DR / 我怎么看 / 读前 / 反对声音 / 如果你要读 / 变更日志
4. 如果 Aube 读过，写 `aubeReaction`（必须人写）
5. `npm run dev` 本地查看
6. `git push` → GitHub Actions 自动部署

详细的字段速查与常见动作，见 [`src/content/README.md`](./src/content/README.md)。

## 许可

- 内容：CC BY-NC-SA 4.0
- 代码：MIT
- 书封面 / 内页图：合理使用（《著作权法》第 24 条）
