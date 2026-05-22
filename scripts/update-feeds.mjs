import { mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

function hash(text) {
  return createHash('sha1').update(String(text)).digest('hex').slice(0, 16);
}

function decodeHtml(text) {
  return String(text || '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function clean(text) {
  return decodeHtml(text).replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const majors = {
  safety: {
    label: '安全工程',
    keywords: ['安全工程', 'EHS', 'HSE', '安全评价', '隐患排查', '职业健康', '应急管理', '消防', '双重预防', '风险评估'],
    queries: ['安全工程 实习', 'EHS 实习', 'HSE 实习', '安全评价 实习', '安全工程 面经']
  },
  mining: {
    label: '采矿工程',
    keywords: ['采矿工程', '矿山', '矿业', '智能矿山', '通风', '爆破', '地压', '矿井', '露天矿'],
    queries: ['采矿工程 实习', '矿山 实习', '智能矿山 实习', '采矿工程 面经', '矿业 校招']
  },
  underground: {
    label: '城市地下空间工程',
    keywords: ['城市地下空间', '地下空间工程', '盾构', '隧道', '地铁', '基坑', '岩土', 'BIM', '监测', '管廊'],
    queries: ['城市地下空间工程 实习', '盾构 实习', '隧道 实习', '地铁工程 实习', '基坑监测 实习']
  }
};

const sources = [
  { name: '实习僧', category: 'job', makeUrl: q => `https://www.shixiseng.com/interns?keyword=${encodeURIComponent(q)}` },
  { name: '智联招聘', category: 'job', makeUrl: q => `https://sou.zhaopin.com/?kw=${encodeURIComponent(q)}` },
  { name: '前程无忧', category: 'job', makeUrl: q => `https://we.51job.com/pc/search?keyword=${encodeURIComponent(q)}` },
  { name: '应届生求职网', category: 'job', makeUrl: q => `https://www.yingjiesheng.com/so.php?word=${encodeURIComponent(q)}` },
  { name: '猎聘', category: 'job', makeUrl: q => `https://www.liepin.com/zhaopin/?key=${encodeURIComponent(q)}` },
  { name: 'Bilibili', category: 'social', makeUrl: q => `https://search.bilibili.com/all?keyword=${encodeURIComponent(q)}` },
  { name: '小红书', category: 'social', makeUrl: q => `https://www.xiaohongshu.com/search_result?keyword=${encodeURIComponent(q)}` },
  { name: '抖音', category: 'social', makeUrl: q => `https://www.douyin.com/search/${encodeURIComponent(q)}?type=general` }
];

const seedItems = [
  ['safety', 'job', '精选方向', 'EHS / HSE 实习：制造、新能源、化工、施工企业优先关注', '适合安全工程学生积累体系管理、隐患排查、培训、事故案例复盘和现场沟通经验。', 'https://www.shixiseng.com/interns?keyword=EHS%E5%AE%9E%E4%B9%A0'],
  ['safety', 'social', '精选方向', '安全工程实习面经：重点检索 EHS、HSE、安全评价和应急管理', '社媒经验适合了解真实投递路径、岗位日常和面试问题，请回到原平台核验信息。', 'https://search.bilibili.com/all?keyword=%E5%AE%89%E5%85%A8%E5%B7%A5%E7%A8%8B%20%E5%AE%9E%E4%B9%A0%20%E9%9D%A2%E7%BB%8F'],
  ['mining', 'job', '精选方向', '智能矿山 / 矿业数字化实习：关注建模、调度与安全监测', '适合采矿工程学生展示 CAD、三维建模、通风安全、生产调度和现场理解能力。', 'https://www.shixiseng.com/interns?keyword=%E6%99%BA%E8%83%BD%E7%9F%BF%E5%B1%B1'],
  ['mining', 'social', '精选方向', '采矿工程实习经验：重点检索矿山现场、智能矿山、央国企实习', '适合了解矿山岗位真实工作环境、暑期实习安排和专业能力要求。', 'https://search.bilibili.com/all?keyword=%E9%87%87%E7%9F%BF%E5%B7%A5%E7%A8%8B%20%E5%AE%9E%E4%B9%A0'],
  ['underground', 'job', '精选方向', '盾构 / 隧道 / 地铁工程实习：关注施工、监测和资料管理', '适合城市地下空间工程学生积累项目现场、BIM 协同、监测数据和工程文档经验。', 'https://www.shixiseng.com/interns?keyword=%E7%9B%BE%E6%9E%84%E5%AE%9E%E4%B9%A0'],
  ['underground', 'social', '精选方向', '地下空间工程实习经验：重点检索盾构、地铁、基坑监测、隧道工程', '适合了解施工现场、项目资料、监测岗位和工程单位实习体验。', 'https://search.bilibili.com/all?keyword=%E5%9C%B0%E4%B8%8B%E7%A9%BA%E9%97%B4%E5%B7%A5%E7%A8%8B%20%E5%AE%9E%E4%B9%A0']
].map(([major, category, source, title, summary, url]) => makeItem({ major, category, source, title, summary, url, status: 'seed' }));

function makeItem({ major, category, source, title, summary, url, status }) {
  return {
    id: hash(`${major}-${category}-${source}-${title}-${url}`),
    major,
    category,
    platform: source,
    source,
    title: clean(title),
    summary: clean(summary),
    url,
    status
  };
}

function scoreTitle(title, majorConfig) {
  const lower = title.toLowerCase();
  let score = 0;
  if (/实习|校招|面经|面试|就业|招聘|岗位|助理|intern/i.test(title)) score += 2;
  for (const keyword of majorConfig.keywords) {
    if (lower.includes(keyword.toLowerCase())) score += 2;
  }
  if (title.length >= 8 && title.length <= 90) score += 1;
  return score;
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 (compatible; CSUInternshipHub/1.0; +https://github.com/yuanhao-bai/csu-internship-hub)',
        'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8'
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function extractItems(html, pageUrl, source, major, majorConfig) {
  const items = [];
  const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = anchorRegex.exec(html)) !== null && items.length < 12) {
    const title = clean(match[2]);
    if (scoreTitle(title, majorConfig) < 3) continue;
    let url = pageUrl;
    try { url = new URL(match[1], pageUrl).href; } catch {}
    items.push(makeItem({
      major,
      category: source.category,
      source: source.name,
      title,
      url,
      summary: summarize(title, source.name, majorConfig.label),
      status: 'auto'
    }));
  }

  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const pageTitle = clean(titleMatch?.[1]);
  if (items.length === 0 && pageTitle) {
    items.push(makeItem({
      major,
      category: source.category,
      source: source.name,
      title: `${source.name}：${majorConfig.label}相关结果页`,
      url: pageUrl,
      summary: `已抓取到 ${source.name} 的公开搜索页，但页面结构限制了列表解析，请打开原页面查看最新结果。`,
      status: 'search-page'
    }));
  }
  return items;
}

function summarize(title, sourceName, majorLabel) {
  if (/面试|面经/.test(title)) return `来自 ${sourceName} 的${majorLabel}相关面试/经验内容，请打开原链接查看完整信息。`;
  if (/实习|岗位|招聘|校招|助理/.test(title)) return `来自 ${sourceName} 的${majorLabel}相关实习/就业信息，请以原网站发布时间和要求为准。`;
  return `来自 ${sourceName} 的${majorLabel}相关公开信息，已按关键词自动归类。`;
}

async function scrape() {
  const items = [...seedItems];
  const errors = [];

  for (const [major, config] of Object.entries(majors)) {
    for (const query of config.queries) {
      for (const source of sources) {
        const url = source.makeUrl(query);
        try {
          const html = await fetchHtml(url);
          items.push(...extractItems(html, url, source, major, config));
        } catch (error) {
          errors.push({ source: source.name, major, query, message: error.message });
          items.push(makeItem({
            major,
            category: source.category,
            source: source.name,
            title: `${source.name}：${query}`,
            url,
            summary: '该来源本次自动抓取受限，已保留公开搜索入口，方便用户进入原平台查看。',
            status: 'fallback'
          }));
        }
        await sleep(450);
      }
    }
  }

  const unique = [];
  const seen = new Set();
  for (const item of items) {
    const key = `${item.major}-${item.category}-${item.title}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }

  const output = {
    generatedAt: new Date().toISOString(),
    note: 'Automatically generated. Items keep titles, summaries, source names and original links only.',
    counts: {
      total: unique.length,
      safety: unique.filter(item => item.major === 'safety').length,
      mining: unique.filter(item => item.major === 'mining').length,
      underground: unique.filter(item => item.major === 'underground').length,
      job: unique.filter(item => item.category === 'job').length,
      social: unique.filter(item => item.category === 'social').length
    },
    errors,
    items: unique.slice(0, 180)
  };

  await mkdir('data', { recursive: true });
  await writeFile('data/feeds.json', JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${output.items.length} items to data/feeds.json`);
}

scrape().catch(error => {
  console.error(error);
  process.exit(1);
});
