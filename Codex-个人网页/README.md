# 张亚慧研究员个人主页

这是一个可部署到 Netlify 的静态个人主页。网站内容集中在 `content/site.json`，后台入口在 `/admin/`。

## 本地预览

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:4173/
```

## Netlify 部署

当前目录已经包含 `netlify.toml`，发布目录为项目根目录，不需要构建命令。

有 Node/npm 的环境中运行：

```powershell
npx netlify login
npx netlify init
npx netlify deploy --prod
```

如果已经有 Netlify 站点，也可以先进入当前目录后运行：

```powershell
npx netlify link
npx netlify deploy --prod
```

## 后台编辑

后台地址：

```text
https://yahuizhang.netlify.app/admin/
```

后台基于 Decap CMS 和 Netlify Git Gateway，字段配置在 `admin/config.yml`。

部署到 Netlify 后，在 Netlify 项目后台完成以下设置：

1. 打开 `Project configuration` -> `Identity`，启用 Identity。
2. 将注册方式改为 `Invite only`，不要开放注册。
3. 在 `Identity` -> `Services` 启用 `Git Gateway`。
4. 在 `Identity` -> `Invite users` 只邀请你的邮箱。
5. 用邀请邮件设置密码后，访问 `/admin/` 登录编辑。

这样只有被邀请的账号可以进入后台修改信息。后续导师简介、论文、项目、成员和照片都在后台表单中维护。

### 密码重置链接

如果 Netlify 邮件里的 `Reset password` 链接打开到首页，例如：

```text
https://yahuizhang.netlify.app/#recovery_token=...
```

首页脚本会自动跳转到：

```text
https://yahuizhang.netlify.app/admin/recovery.html#recovery_token=...
```

然后在专用页面输入新密码并保存。修改后需要重新部署到 Netlify 才会生效。

## Netlify 站点名称

为了使用以下免费 Netlify 二级域名：

```text
https://yahuizhang.netlify.app
```

部署后需要在 Netlify 后台进入 `Site configuration` -> `Site details`，将站点名称改为：

```text
yahuizhang
```

如果该名称已被占用，Netlify 会要求换一个站点名。

## 内容文件

- `content/site.json`：网站全部文字和列表数据
- `assets/uploads/`：后台上传图片保存位置
- `admin/config.yml`：后台字段结构
- `index.html`、`styles.css`、`script.js`：前台页面

## 注意

学校旧宣传页 `https://criwi.caf.ac.cn/info/1076/7270.htm` 当前对自动访问返回 420/422，未能直接同步原文。正式信息可在后台上线后录入，或把旧站内容复制给我，我可以继续帮你整理成正式版。
