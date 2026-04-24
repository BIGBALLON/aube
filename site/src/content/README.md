# content/ · 只改这里就行

网站跑起来之后，日常维护只需要动这个目录。不改 `components/`、不改 `layouts/`、不改 `pages/`。

## 目录结构

```
src/content/
├── books/                    ← 一本书一个 .mdx
│   ├── covers/               ← 封面图（可选）
│   │   ├── mama-mai-lvdou.jpg
│   │   └── README.md
│   ├── mama-mai-lvdou.mdx
│   ├── dian-dian-dian.mdx
│   ├── boxi-he-pipu-da-sou-suo.mdx
│   └── yeye-yiding-you-banfa.mdx
│
└── years/                    ← 一年一个 .mdx（年度手写段落）
    ├── 2026.mdx
    └── 2027.mdx
```

## 常见动作

### 新增一本书

1. 在 `books/` 新建 `<slug>.mdx`（文件名就是 URL，比如 `mama-mai-lvdou` → `/book/mama-mai-lvdou`）
2. 参照任意一本现有书的 frontmatter 结构，填完整
3. （可选）把封面图放进 `books/covers/<slug>.jpg`，frontmatter 里加一行
   ```yaml
   coverImage: ./covers/<slug>.jpg
   ```
4. 正文 MDX 跟 frontmatter 同文件，想写多深就写多深

### 新增一年

- 在 `years/` 新建 `<year>.mdx`
- frontmatter 只要 `year`，剩下 `aubeAge` / `highlight` 可选
- 这一年读过的书，只要它们的 `readAtYear` 写了对应年份，会自动被归到这里

### 修订一本书

直接编辑 mdx。记得把 `lastUpdated` 改成当天日期，`变更日志` 那栏手写一行新的。

### 只修 frontmatter 不动正文

也没问题。改完保存就行，Astro 会自动 reload。

## 字段速查

### 必填

| 字段 | 类型 | 示例 |
|---|---|---|
| title | string | `妈妈买绿豆` |
| author | string | `曾阳晴` |
| publisher | string | `信谊` |
| publishYear | number | `2011` |
| verdict | 三选一 | `会推` / `看情况` / `不会推` |
| oneLiner | string | 一句话书评 |
| scores | object | 8 维度 0–5 打分，见 `content.config.ts` |
| lastUpdated | YYYY-MM-DD | |
| firstPublished | YYYY-MM-DD | |

### 可选

| 字段 | 说明 |
|---|---|
| titleEn | 英文/原文标题 |
| translator | 译者（引进版才填） |
| originYear | 原版年份 |
| themes | 主题标签数组 |
| series | 系列名，没系列写 `null` |
| seriesOrder | 系列内排序，从 `1` 开始 |
| readByAube | Aube 读过就 `true` |
| readAtYear | Aube 读的那一年 |
| aubeReaction | Aube 的反应（一句话） |
| coverImage | 封面图相对路径 |
| agesReal / agesClaimed | 内部盘点字段，页面不展示 |
| draft | `true` 就不发布 |

## 隐私红线（PLAN §14.2）

页面**永远不**出现：
- Aube 的年龄、生日、月份、季节（归档只按年份分桶）
- 任何城市 / 幼儿园 / 书店 / 小区名字
- Aube 的正面 / 侧面 / 视频

## 改完怎么上线

开发看效果：

```bash
cd site
npm run dev            # http://localhost:4321
```

部署：

```bash
cd site
npm run build
# 把 dist/ 推上去
```

## 遇到报错怎么办

最常见是 schema 校验挂了 —— 控制台会直接告诉你哪个字段缺了或类型不对。
照着提示补上就行。
