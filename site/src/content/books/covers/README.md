# 封面图 · covers/

单书封面图放这里。

## 约定

- 文件名和 mdx 同名，方便对应，比如：
  - `mama-mai-lvdou.mdx` → `covers/mama-mai-lvdou.jpg`
  - `bian-bian-bian.mdx` → `covers/bian-bian-bian.jpg`
- 支持 `.jpg` / `.png` / `.webp` / `.avif`
- 建议宽度 ≥ 600 px，比例贴近 3:4（书的标准封面比例）
- 体积控制在 300 KB 以内 —— Astro 会自动生成多尺寸 WebP

## 用法

在 mdx 的 frontmatter 里加一行相对路径：

```yaml
coverImage: ./covers/mama-mai-lvdou.jpg
```

没加这行，就回退到"书名 + 竖排"的文字占位封面。

## 版权说明

见 `/about` 「版权与反馈」：非营利教育性评论引用（《著作权法》§24）。
权利人若有疑义，GitHub issue 标 takedown 立即下架。
