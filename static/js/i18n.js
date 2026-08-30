(() => {
  const messages = {
    zh: {
      'site.title': '未遂',
      'site.description': '唇瓣间隙有一颗无限大的恒星',
      'home.heading': '静候新篇',
      'home.copy': '旧的示例文章已经归档清空，新的故事正在路上。',
      'home.action': '认识我',
      'about.description': '关于 YKYsia 和这个博客',
      'about.heading': '关于这里',
      'about.copy': '这里用来保存思考、技术记录，以及生活里值得记住的片段。内容不必追赶时间，只希望每次落笔都比昨天更靠近真实。',
      'about.contact': '保持联系',
      'about.contact.copy': '欢迎通过以下任一邮箱与我联系，也可以前往 Link 页面找到我的其他主页。',
      'announcement.copy': '在逃研究生，正在更新博客中……\n偶尔失踪，通常是在和截止日期搏斗。',
      'link.intro': '在其他地方也可以找到我。',
      'link.code': '代码与项目',
      'link.notes': '技术笔记',
      'link.video': '视频主页',
      'link.music': '音乐足迹',
      'link.steam': '游戏与社区',
      'link.linkedin': '职业档案',
      'link.orcid': '研究者身份',
      'link.scopus': '学术成果索引',
      'link.x': '碎片与近况',
      'link.instagram': '照片与生活',
      'link.weibo.name': '新浪微博',
      'link.weibo': '中文社交主页',
      'link.baidu-scholar.name': '百度学术',
      'link.baidu-scholar': '学术主页',
      'link.tieba.name': '百度贴吧',
      'link.tieba': '社区主页',
      'music.notice': '受限于上传能力，音质有限，见谅 /(ㄒoㄒ)/~~\n耳机可以认真戴，期待请轻轻放。',
      'music.album': '专辑',
      'music.library': '首曲目 · 本地收藏',
      'movie.heading': '观影清单正在准备',
      'movie.copy': '喜欢的电影与观后感会在这里慢慢积累。',
      'empty.heading': '这里还没有内容',
      'empty.copy': '新的条目会在这里出现。',
      'empty.taxonomy': '以后的标签与分类会在这里出现。',
      'archive.heading': '归档还是空的',
      'archive.copy': '发布文章后，它们会按年份出现在这里。',
      '404.heading': '页面走丢了',
      '404.copy': '你访问的地址不存在，或者已经被移动。',
      '404.action': '返回首页'
    },
    en: {
      'site.title': 'Unfulfilled',
      'site.description': 'An infinitely large star rests between my lips.',
      'home.heading': 'Waiting for the Next Chapter',
      'home.copy': 'The old sample post has left the stage; new stories are finding their way here.',
      'home.action': 'Meet Me',
      'about.description': 'About YKYsia and this blog',
      'about.heading': 'About This Place',
      'about.copy': 'This is where I keep thoughts, technical notes, and fragments of life worth remembering. Nothing here needs to race the clock; each entry only hopes to land a little closer to the truth.',
      'about.contact': 'Stay in Touch',
      'about.contact.copy': 'Reach me through either email below, or visit the Link page to find me elsewhere.',
      'announcement.copy': 'Graduate student at large, currently updating the blog…\nIf I vanish, I am probably wrestling a deadline.',
      'link.intro': 'You can also find me in these corners of the internet.',
      'link.code': 'Code and projects',
      'link.notes': 'Technical notes',
      'link.video': 'Video channel',
      'link.music': 'Listening history',
      'link.steam': 'Games and community',
      'link.linkedin': 'Professional profile',
      'link.orcid': 'Researcher identity',
      'link.scopus': 'Research output index',
      'link.x': 'Notes and updates',
      'link.instagram': 'Photos and life',
      'link.weibo.name': 'Weibo',
      'link.weibo': 'Chinese social profile',
      'link.baidu-scholar.name': 'Baidu Scholar',
      'link.baidu-scholar': 'Academic profile',
      'link.tieba.name': 'Baidu Tieba',
      'link.tieba': 'Community profile',
      'music.notice': 'Upload limits put these tracks on a tiny sonic diet—please pardon the modest fidelity. /(ㄒoㄒ)/~~\nHeadphones on; expectations at a comfortable volume.',
      'music.album': 'Album',
      'music.library': ' tracks · local collection',
      'movie.heading': 'The Watchlist Is Warming Up',
      'movie.copy': 'Films I love and the thoughts they leave behind will gather here over time.',
      'empty.heading': 'Nothing Here Yet',
      'empty.copy': 'New entries will appear here.',
      'empty.taxonomy': 'Future tags and categories will appear here.',
      'archive.heading': 'The Archive Is Still Quiet',
      'archive.copy': 'Published posts will gather here by year.',
      '404.heading': 'This Page Wandered Off',
      '404.copy': 'The address does not exist, or the page has moved somewhere new.',
      '404.action': 'Back Home'
    }
  };

  const normalizeLanguage = value => value === 'en' ? 'en' : 'zh';

  const applyLanguage = language => {
    const lang = normalizeLanguage(language);
    const dictionary = messages[lang];
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.documentElement.dataset.language = lang;
    localStorage.setItem('site-language', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = dictionary[element.dataset.i18n];
      if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-title]').forEach(element => {
      const value = dictionary[element.dataset.i18nTitle];
      if (value !== undefined) element.title = value;
    });

    document.querySelectorAll('.language-toggle-label').forEach(label => {
      label.textContent = lang === 'zh' ? 'EN' : '中文';
    });

    document.querySelectorAll('.language-toggle').forEach(button => {
      button.setAttribute('aria-label', lang === 'zh' ? 'Switch to English' : '切换为中文');
      button.title = lang === 'zh' ? 'Switch to English' : '切换为中文';
    });

    if (document.body.dataset.pageKind === 'home') {
      document.title = lang === 'zh' ? '未遂 - YKYsia的博客' : "Unfulfilled - YKYsia's Blog";
    }

    window.dispatchEvent(new CustomEvent('site-language-change', { detail: { language: lang } }));
  };

  document.addEventListener('DOMContentLoaded', () => {
    const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
    const initialLanguage = normalizeLanguage(requestedLanguage || localStorage.getItem('site-language'));
    applyLanguage(initialLanguage);
    document.querySelectorAll('.language-toggle').forEach(button => {
      button.addEventListener('click', () => {
        applyLanguage(document.documentElement.dataset.language === 'zh' ? 'en' : 'zh');
      });
    });
  });

  window.siteI18n = { applyLanguage, messages };
})();
