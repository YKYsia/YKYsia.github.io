# YKYsia 的 Hugo 博客

本站已从 Hexo 生成文件迁移为 Hugo 源码，保留了原来的 Butterfly 风格、页面结构、深色模式和侧栏交互。

## 本地预览

安装 Hugo 0.165.0 或更高版本后，在仓库根目录运行：

```powershell
hugo server -D
```

然后打开 `http://localhost:1313/`。

## 新建文章

```powershell
hugo new content posts/my-new-post.md
```

编辑 `content/posts/my-new-post.md`，把开头的 `draft: true` 改成 `draft: false` 后即可发布。文章地址仍沿用 `/年/月/日/名称/` 格式。

## 发布

继续双击 `点击上传网站.bat` 即可提交并上传。GitHub Actions 会自动构建 Hugo 并发布 `public` 目录，不需要手动提交构建产物。

首次迁移后，需要在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
