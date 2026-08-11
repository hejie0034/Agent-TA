# Agent-TA｜AI 教师操作助手

面向 uLearning / 优学院 Web 教师端的操作问答助手。接收方克隆或下载本仓库后，可以按照本文完成配置、启动、测试和后续修改。

## 交付信息

| 项目 | 内容 |
| --- | --- |
| 当前版本 | V1.0.0 |
| 运行方式 | Python 本地 Web 服务 |
| 本地地址 | `http://127.0.0.1:8012` |
| 前端 | 原生 HTML、CSS、JavaScript |
| 后端 | Python |
| AI 服务商 | **DeepSeek（深度求索）** |
| API 类型 | DeepSeek 官方、OpenAI 兼容格式的 Chat Completions API |
| 默认 API 地址 | `https://api.deepseek.com/v1/chat/completions` |
| 默认模型 | `deepseek-chat` |
| API Key | 不包含，由接收方在 DeepSeek 平台申请并填写 |

> 本项目不是调用 OpenAI 的模型。接口报文采用 OpenAI 兼容格式，但默认服务商和模型均为 DeepSeek。

## 主要功能

- 回答课程、班级、课件、资源、作业、考试、成绩和课堂互动等教师端操作问题
- 当前正式回答库共 288 条 FAQ（基础教师 FAQ 237 条、2026 教师手册 FAQ 51 条）
- 展示文字、图片、视频三合一教程（96 组截图教程、320 张图片、29 个视频）
- 使用 DeepSeek 处理适度闲聊、未预设表达和英文翻译，同时保持“小蜜蜂/uLearning 助手”身份
- 支持中英文切换、相关问题推荐和规则式主动排障
- 在本地记录点赞、点踩、未回答问题和转人工反馈

> `切片读取知识库/`、`help知识库.docx` 等资料目前作为后续扩充储备，不应理解为已经接入在线回答检索。当前平台操作回答以两份 FAQ JSON 为准，图片和视频由教程匹配逻辑独立加载。

## 最快启动（Windows）

1. 下载并解压整个 `Agent-TA` 文件夹。
2. 双击 `启动小蜜蜂.bat`。
3. 首次运行会生成并打开 `.env`，填写自己的 `DEEPSEEK_API_KEY` 并保存。
4. 再次双击 `启动小蜜蜂.bat`，程序会检查依赖、启动服务并打开浏览器。
5. 使用结束后双击 `停止小蜜蜂.bat`。

真实 DeepSeek 密钥不会随项目交付。没有密钥时，页面和已收录的本地 FAQ 可以使用，但闲聊、动态生成及英文翻译能力不完整。

## 命令行启动

环境要求：Windows 10/11、Python 3.10 或更高版本、Chrome 或 Edge，以及可访问 DeepSeek API 的网络。

```powershell
git clone https://github.com/hejie0034/Agent-TA.git
cd Agent-TA
python -m pip install -r requirements.txt
Copy-Item .env.example .env
```

打开 `.env`，填写自己的 DeepSeek API Key：

```env
DEEPSEEK_API_KEY=在这里填写接收方自己的密钥
```

启动：

```powershell
python web_agent.py --port 8012
```

浏览器访问：

- 项目页面：<http://127.0.0.1:8012>
- 健康检查：<http://127.0.0.1:8012/api/health>

停止服务时，在运行窗口按 `Ctrl + C`。

## 工作流程与密钥安全

```text
浏览器前端
  ↓ 请求本项目 /api/chat
Python 后端（读取本地知识库和 .env）
  ↓ 携带服务端 API Key
DeepSeek API
```

真实密钥只应保存在本机 `.env` 中。`.env` 已被 `.gitignore` 排除，不应上传 GitHub、放进前端 JavaScript、写入文档或出现在截图中。仓库只交付不含密钥的 `.env.example`。

## 项目结构

```text
Agent-TA/
├─ index.html                   # 前端页面
├─ styles.css                   # 页面样式
├─ app.js                       # 前端交互逻辑
├─ web_agent.py                 # Web 服务、知识库检索和 AI 接口
├─ requirements.txt             # Python 依赖
├─ .env.example                 # 环境变量示例（不含密钥）
├─ ulearning_teacher_faq.json   # 基础教师 FAQ（237 条）
├─ manual_2026_faq.json         # 2026 手册 FAQ（51 条）
├─ manual_2026_guides.json      # 2026 手册图片教程索引
├─ deepseek_prompt.md           # DeepSeek 系统提示词
├─ 截图教程/                    # 教师端操作截图
├─ 视频教程/                    # 教师端操作视频
├─ 切片读取知识库/              # 知识库切片和索引数据
├─ scripts/                     # 知识库维护脚本
├─ docs/                        # 启动、部署、接口和测试文档
├─ 小蜜蜂全部问题清单.xlsx      # 全部问题的人工查看清单
├─ 小蜜蜂agent交付报告.docx     # 完整项目说明书
├─ 启动小蜜蜂.bat               # Windows 一键启动
├─ 停止小蜜蜂.bat               # Windows 一键停止
├─ version.txt                  # 当前版本
└─ README.md                    # 交付入口
```

## 交付文档

- [小蜜蜂 agent 交付报告](小蜜蜂agent交付报告.docx)
- [小蜜蜂全部问题清单](小蜜蜂全部问题清单.xlsx)
- [项目说明书](docs/项目说明书.md)
- [本地启动说明](docs/本地启动说明.md)
- [服务器部署说明](docs/服务器部署说明.md)
- [接口说明](docs/接口说明.md)
- [测试说明](docs/测试说明.md)
- [常见问题](docs/常见问题.md)
- [交付清单](docs/交付清单.md)

## 已知边界

- 当前是本地运行版，未包含 Docker 和生产级进程守护配置
- 服务默认只监听 `127.0.0.1`，同一局域网的其他电脑无法直接访问
- 不会自动点击或控制优学院教师端页面
- 回答质量受知识库完整度、截图清晰度和 DeepSeek 服务状态影响
- 用户反馈默认保存在运行机器本地，部署前需自行制定数据保留和隐私规则

## 发布前检查

```powershell
git status --short
git ls-files .env
```

第二条命令应没有输出。还应在一台未配置过本项目的电脑上，按《本地启动说明》完整运行一次。
