# Agent-TA

Agent-TA 是面向 uLearning / 优学院 Web 教师端的操作问答助手。项目使用原生 HTML、CSS 和 JavaScript 构建前端，并由一个 Python 服务同时提供网页、知识库问答接口和反馈记录功能。

## 主要功能

- 回答课程、班级、课件、资源、作业、考试、成绩和课堂互动等教师端操作问题
- 根据本地 FAQ 知识库检索相关答案
- 使用 DeepSeek 对检索结果进行自然语言整理
- 提供相关问题跳转和操作引导
- 记录点赞、点踩和转人工反馈

## 环境要求

- Python 3.10 或更高版本
- 可访问 DeepSeek API 的网络环境
- DeepSeek API Key

项目不需要 Node.js，也不需要分别启动前端和后端。

## 安装

### 1. 获取项目

使用 Git 克隆：

```bash
git clone https://github.com/hejie0034/Agent-TA.git
cd Agent-TA
```

也可以在 GitHub 页面点击 `Code` → `Download ZIP`，解压后进入项目目录。

### 2. 安装 Python 依赖

```bash
python -m pip install openpyxl
```

如果 Windows 找不到 `python` 命令，可以尝试：

```powershell
py -m pip install openpyxl
```

### 3. 配置 API Key

在项目根目录（与 `web_agent.py` 同级）新建一个名为 `.env` 的文件：

```env
DEEPSEEK_API_KEY=替换为你的DeepSeek_API_Key
DEEPSEEK_BASE_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
```

`.env` 已加入 `.gitignore`，请勿将真实 API Key 提交到 GitHub、聊天记录或截图中。

## 启动项目

在项目根目录运行：

```bash
python web_agent.py --port 8012
```

Windows 也可以使用：

```powershell
py web_agent.py --port 8012
```

看到下面的提示即表示服务已启动：

```text
Serving on http://127.0.0.1:8012
```

随后在浏览器打开：

<http://127.0.0.1:8012>

这个 Python 服务会同时提供前端页面和后端 API，不需要额外启动前端服务。

## 检查运行状态

浏览器访问下面的地址：

<http://127.0.0.1:8012/api/health>

返回结果中的关键字段：

- `ok: true`：服务运行正常
- `configured: true`：已经读取到 API Key
- `faqCount`：当前加载的 FAQ 数量

如果 `configured` 为 `false`，请检查 `.env` 是否位于项目根目录、变量名是否正确，然后重启服务。

## 常见问题

### 网页打不开

确认终端中的 Python 服务仍在运行，并检查使用的端口是否为 `8012`。如果端口被占用，可以更换端口：

```bash
python web_agent.py --port 8080
```

然后访问 <http://127.0.0.1:8080>。

### 提示缺少 `openpyxl`

重新安装依赖：

```bash
python -m pip install openpyxl
```

### 可以打开网页，但智能回答不可用

检查 `/api/health` 返回的 `configured` 是否为 `true`。如果为 `false`，通常是 `.env` 缺失、API Key 变量名错误，或者修改 `.env` 后没有重启服务。

### 没有 API Key 能否使用

页面和部分本地知识库匹配仍可运行，但 DeepSeek 的答案整理能力不可用。建议配置有效的 API Key 以获得完整体验。

### 如何停止服务

回到运行服务的终端，按 `Ctrl + C`。

## 项目结构

```text
Agent-TA/
├─ index.html                    # 前端页面
├─ styles.css                    # 页面样式
├─ app.js                        # 前端交互逻辑
├─ web_agent.py                  # Web 服务和问答接口
├─ ulearning_teacher_faq.json    # FAQ 知识库
├─ deepseek_prompt.md            # 模型提示词
├─ 截图教程/                     # 操作教程图片
├─ 切片读取知识库/               # 知识库切片和索引数据
├─ feedback/                     # 本地反馈文件目录
└─ .env                          # 本地密钥配置，不上传 GitHub
```

## 数据与隐私

- API Key 仅保存在本地 `.env` 文件中
- 未回答问题和反馈数据默认保存在项目本地
- 上传或分享项目前，请再次确认没有把 `.env`、日志或用户反馈文件加入 Git
- 如果 API Key 曾经公开，应立即到对应平台撤销并重新生成

