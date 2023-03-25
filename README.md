# npm-mirror-sync-action

[![code-review](https://github.com/FrontEndDev-org/npm-mirror-sync-action/actions/workflows/code-review.yml/badge.svg)](https://github.com/FrontEndDev-org/npm-mirror-sync-action/actions/workflows/code-review.yml)
[![dependency-review](https://github.com/FrontEndDev-org/npm-mirror-sync-action/actions/workflows/dependency-review.yml/badge.svg)](https://github.com/FrontEndDev-org/npm-mirror-sync-action/actions/workflows/dependency-review.yml)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/e2124e485dbd406a9dd2678e69822a55)](https://app.codacy.com/gh/FrontEndDev-org/npm-mirror-sync-action/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![release](https://img.shields.io/github/v/release/FrontEndDev-org/npm-mirror-sync-action)
[![marketplace](https://img.shields.io/badge/marketplace-npm--mirror--sync--action-blueviolet)](https://github.com/marketplace/actions/npm-mirror-sync-action)
![license](https://img.shields.io/github/license/FrontEndDev-org/npm-mirror-sync-action)

🔄 将 npm 包新版本同步到 npm 镜像，支持 npmmirror.com

# 工作流配置

```yaml
jobs:
  release:
    runs-on: ubuntu-latest
      - uses: actions/checkout@v3
          - run: npm ci
          - run: npm run build
          - uses: FrontEndDev-org/publish-node-package-action@v1
            with:
              target: npm
              token: ${{ secrets.NPM_TOKEN }}
          - name: 自动将上一步发布的的 npm 包版本同步到 npmmirror.com
            uses: FrontEndDev-org/npm-mirror-sync-action@v1
```

# 配置项

| 参数名    | 可选性 | 描述                                                               |
| --------- | ------ | ------------------------------------------------------------------ |
| `name`    | 可选   | 待同步的 npm 包名称，默认从当前目录 package.json 里读取            |
| `target`  | 可选   | 同步镜像的目标，默认 npmmirror（即 npmmirror.com），暂无其他可选值 |
| `timeout` | 可选   | 同步超时时间，默认 30 秒                                           |
