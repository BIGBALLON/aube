import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * 书评集合
 *
 * schema 用 ({ image }) => z.object(...) 的签名，让 coverImage 走
 * Astro 图片优化管线（自动 WebP、多尺寸、懒加载）。
 * mdx frontmatter 里写相对路径，如：coverImage: ./covers/mama-mai-lvdou.jpg
 */
const books = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/books' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    titleEn: z.string().optional(),
    author: z.string(),
    translator: z.string().optional(),
    publisher: z.string(),
    publishYear: z.number(),
    originYear: z.number().optional(),

    themes: z.array(z.string()).default([]),
    series: z.string().nullable().default(null),
    seriesOrder: z.number().optional(),

    /**
     * 年龄建议字段：内部 metadata，页面不展示。
     * 如作者想提适龄，在正文里自然说即可。
     */
    agesReal: z.tuple([z.number(), z.number()]).optional(),
    agesClaimed: z.tuple([z.number(), z.number()]).optional(),

    readByAube: z.boolean().default(false),
    readAtYear: z.number().optional(),
    aubeReaction: z.string().optional(),

    /**
     * 8 维度评分（child-first）
     *   孩子当下：趣味 / 画面 / 故事 / 知识
     *   父母陪伴：共读
     *   长期影响：启发 / 价值观 / 耐读
     *
     * 知识 = 具体事实、词汇、概念（读完多认识 5 种蔬菜）
     * 启发 = 思维方式、情感共鸣、提问能力
     */
    scores: z.object({
      fun: z.number().min(0).max(5),       // 趣味 · 爱不爱？愿不愿意重读？
      art: z.number().min(0).max(5),       // 画面 · 插画品质、用色、构图
      story: z.number().min(0).max(5),     // 故事 · 语言节奏、叙事、情感
      knowledge: z.number().min(0).max(5), // 知识 · 词汇 / 认知 / 科普 / 生活
      discuss: z.number().min(0).max(5),   // 共读 · 适不适合被问、被讨论
      inspire: z.number().min(0).max(5),   // 启发 · 启发 > 说教
      values: z.number().min(0).max(5),    // 价值观 · 刻板印象、暴力尺度
      reread: z.number().min(0).max(5),    // 耐读 · 十年后还打不打动
    }),

    verdict: z.enum(['会推', '看情况', '不会推']),
    oneLiner: z.string(),

    lastUpdated: z.coerce.date(),
    firstPublished: z.coerce.date(),

    /**
     * 封面图 · 相对于当前 mdx 文件的路径
     * 约定放在 src/content/books/covers/<slug>.jpg
     * 不填就走文字竖排占位封面。建议宽度 ≥ 600px。
     */
    coverImage: image().optional(),

    draft: z.boolean().default(false),
  }),
});

/**
 * 年度归档 · 每年一篇手写段落
 */
const years = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/years' }),
  schema: z.object({
    year: z.number(),
    aubeAge: z.number().optional(), // 爸妈内部盘点用，页面不渲染
    highlight: z.string().optional(),
  }),
});

export const collections = { books, years };
