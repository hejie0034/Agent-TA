# FAQ 维护规范

每次收入新的操作教程、截图、视频或引导流程时，必须同步完成以下工作：

1. 在 `ulearning_teacher_faq.json` 新增或更新对应 FAQ。
2. 填写 `id`、`category`、`question`、`summary`、`keywords` 和完整的 `answer`。
3. 使用 `related` 配置 2 至 4 个最相关的前置操作、下一步或常见分支。
4. 确认自然语言问法能够命中新 FAQ。
5. 确认回答后会推荐 2 至 3 个真正相关的问题。
6. 运行 `python scripts/validate_faq.py`，确保字段、ID 和关联有效。

FAQ 正文只解决当前操作；后续操作通过推荐按钮逐步展开，避免一次输出过多内容。
