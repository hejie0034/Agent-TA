const faqItems = [
  {
    id: "course-create",
    category: "course",
    title: "如何创建课程？",
    summary: "教师开课的第一步，用于创建后续教学内容和班级。",
    keywords: ["创建课程", "新建课程", "开课", "课程名称", "课程封面", "建课"],
    answer: {
      entry: "教师首页点击【创建课程】。",
      steps: ["输入课程名称。", "选择或上传课程封面。", "点击确认创建。", "进入课程后继续设置教学团队、班级和教学内容。"],
      check: "创建成功后，教师首页会出现这门课程。",
      risk: "团队教学时通常由课程负责人创建课程，其他老师通过教学团队加入，不需要重复建课。"
    }
  },
  {
    id: "teaching-team",
    category: "course",
    title: "如何设置教学团队？",
    summary: "课程负责人可添加老师、分配班级并设置角色。",
    keywords: ["教学团队", "添加老师", "任课老师", "助教", "课程管理员", "分配班级", "角色"],
    answer: {
      entry: "进入课程后，打开【教学团队】或课程设置中的教学团队入口。",
      steps: ["点击添加老师。", "搜索并选择要加入的老师。", "为老师分配负责班级。", "按需要设置课程管理员、教师或助教角色。"],
      check: "教学团队列表中能看到新增老师，并显示对应角色和班级。",
      risk: "只有课程管理员可以设置教学团队，教师和助教通常不能修改团队。"
    }
  },
  {
    id: "class-setup",
    category: "course",
    title: "如何设置班级？",
    summary: "用于建立教学班，方便学生入班、发任务和统计成绩。",
    keywords: ["设置班级", "新建班级", "班课", "班级", "学生入班", "邀请码", "二维码"],
    answer: {
      entry: "进入课程后，打开【班级】或【班课】管理。",
      steps: ["点击新建班级。", "填写班级名称。", "保存班级。", "把入班二维码或邀请码发给学生。"],
      check: "班级列表中能看到新班级，学生加入后人数会更新。",
      risk: "发布作业、公告、考试前，请先确认选择的是正确班级。"
    }
  },
  {
    id: "invite-students",
    category: "course",
    title: "如何邀请学生加入班课？",
    summary: "学生可通过二维码、邀请码或老师提供的入口加入班课。",
    keywords: ["邀请学生", "加入班课", "扫码入班", "邀请码", "学生加入", "班课"],
    answer: {
      entry: "进入目标课程的班级管理页面。",
      steps: ["选择要邀请学生加入的班级。", "打开班级二维码或邀请码。", "把二维码或邀请码发给学生。", "学生加入后，在班级成员中核对名单。"],
      check: "班级人数增加，学生名单中出现对应学生。",
      risk: "学生加入失败时，先确认二维码是否过期、学生账号是否正确、班级是否仍允许加入。"
    }
  },
  {
    id: "announcement",
    category: "course",
    title: "如何发布公告？",
    summary: "用于向学生发布课程通知、安排和提醒。",
    keywords: ["公告", "发布公告", "通知", "课程通知", "阅读"],
    answer: {
      entry: "进入课程后点击【公告】，再点击【发布新公告】。",
      steps: ["输入公告标题和正文。", "选择发布对象或班级。", "确认内容无误后发布。", "发布后可返回公告列表查看。"],
      check: "公告列表中出现新公告，学生端可以看到。",
      risk: "课程管理员可对所有班级发布公告；任课教师和助教通常只能对自己负责的班级发布。"
    }
  },
  {
    id: "courseware-link",
    category: "content",
    title: "如何为班课关联教学课件？",
    summary: "把课件关联到班课后，学生才能按课程安排学习。",
    keywords: ["关联课件", "教学课件", "课件", "班课", "课程内容"],
    answer: {
      entry: "进入课程后，打开教学内容或课件相关入口。",
      steps: ["选择需要关联的班课。", "点击关联教学课件。", "选择已有课件或课程内容。", "保存后检查学生端是否可见。"],
      check: "班课中能看到已关联课件，学生端可以进入学习。",
      risk: "关联前请确认课件内容已完成，避免学生看到未整理好的内容。"
    }
  },
  {
    id: "learning-plan",
    category: "content",
    title: "如何设置学习计划？",
    summary: "用于安排学生学习时间、章节开放和学习进度。",
    keywords: ["学习计划", "学习安排", "开放时间", "学习进度", "计划"],
    answer: {
      entry: "进入课程后，打开【学习计划】或教学安排页面。",
      steps: ["选择要设置的班级或章节。", "设置学习时间、开放范围或截止时间。", "保存计划。", "用学生视角检查是否按计划显示。"],
      check: "学生端能按设置看到对应章节和学习任务。",
      risk: "时间设置会影响学生能否进入学习，发布前请核对日期。"
    }
  },
  {
    id: "progress-score",
    category: "content",
    title: "如何查看进度成绩？",
    summary: "查看学生课件学习进度、时长和成绩。",
    keywords: ["进度成绩", "学习进度", "课件成绩", "学习时长", "完成率"],
    answer: {
      entry: "进入课程后，打开【进度成绩】或学习统计页面。",
      steps: ["选择班级。", "查看学生学习进度、学习时长和成绩。", "按章节或学生筛选数据。", "需要留档时导出或下载统计表。"],
      check: "页面能显示学生维度或章节维度的学习数据。",
      risk: "学生端整体进度通常按节计算，和教师端考核规则可能不完全一样。"
    }
  },
  {
    id: "resource-add",
    category: "content",
    title: "如何添加资源？",
    summary: "把文档、视频、音频、图片等资源补充到课程中。",
    keywords: ["添加资源", "上传资源", "资源库", "视频", "文档", "图片", "音频"],
    answer: {
      entry: "进入课程的资源或教学内容页面，点击添加资源。",
      steps: ["选择资源类型。", "上传本地文件或选择已有资源。", "填写资源名称。", "保存后检查资源是否能打开。"],
      check: "资源出现在课程内容中，并且可以正常预览。",
      risk: "如果资源需要转码，请等待处理完成后再通知学生学习。"
    }
  },
  {
    id: "personal-homework",
    category: "activity",
    title: "如何布置个人作业？",
    summary: "适合每个学生单独提交作业。",
    keywords: ["个人作业", "布置作业", "发布作业", "作业", "提交"],
    answer: {
      entry: "进入课程后，打开【作业】并选择布置个人作业。",
      steps: ["填写作业标题和要求。", "设置提交时间和提交方式。", "选择发布班级。", "确认无误后发布。"],
      check: "作业列表显示已发布，学生端能看到提交入口。",
      risk: "发布前重点核对截止时间和班级，避免学生收不到或收到错误任务。"
    }
  },
  {
    id: "peer-review",
    category: "activity",
    title: "如何设置学生互评？",
    summary: "适合作业提交后让学生互相评价。",
    keywords: ["学生互评", "互评", "作业互评", "评价维度", "互评时间"],
    answer: {
      entry: "在作业设置页面找到互评设置。",
      steps: ["开启学生互评。", "设置互评开始和截止时间。", "设置评价规则、评价维度或分配方式。", "发布后查看互评完成情况。"],
      check: "互评阶段开始后，学生端能看到互评任务。",
      risk: "互评结果可能影响成绩，规则要在发布前说明清楚。"
    }
  },
  {
    id: "group-homework",
    category: "activity",
    title: "如何布置小组作业？",
    summary: "适合调研报告、实验报告等协作任务。",
    keywords: ["小组作业", "组内", "组间", "小组提交", "协作作业"],
    answer: {
      entry: "进入【作业】，选择布置小组作业。",
      steps: ["确认课程已经完成分组。", "填写作业要求和提交时间。", "设置教师评分或学生互评。", "选择班级并发布。"],
      check: "学生端以小组为单位看到作业任务。",
      risk: "小组作业通常由组内任意一位同学提交，请提前说明提交规则。"
    }
  },
  {
    id: "quiz-publish",
    category: "activity",
    title: "如何发布测验？",
    summary: "用于课堂小测或阶段性学习检查。",
    keywords: ["测验", "发布测验", "在线测验", "测试", "题目"],
    answer: {
      entry: "进入课程后，打开【测验】并点击发布测验。",
      steps: ["填写测验名称。", "添加或选择题目。", "设置答题时间、开放班级和提交规则。", "预览无误后发布。"],
      check: "测验列表显示已发布，学生端能进入答题。",
      risk: "测验发布前请核对题目答案和开放时间，避免影响学生成绩。"
    }
  },
  {
    id: "discussion",
    category: "activity",
    title: "如何发布讨论？",
    summary: "用于课程交流、答疑和课堂延伸讨论。",
    keywords: ["讨论", "发布讨论", "课程讨论", "话题", "回帖"],
    answer: {
      entry: "进入课程后，打开【讨论】并点击发布讨论。",
      steps: ["填写讨论主题和说明。", "选择参与班级。", "设置是否计分或是否限时。", "发布后查看学生回复。"],
      check: "讨论区出现新话题，学生端可以回复。",
      risk: "涉及评分的讨论，请提前说明积分或评分规则。"
    }
  },
  {
    id: "screen-cast",
    category: "classroom",
    title: "如何进行手机投屏互动？",
    summary: "用于课堂中把手机端内容投到电脑端展示互动。",
    keywords: ["手机投屏", "投屏", "电脑互动", "课堂互动", "移动教学"],
    answer: {
      entry: "在课堂互动或移动教学相关页面，打开手机投屏功能。",
      steps: ["确认电脑端和手机端登录同一教师账号。", "按页面提示完成连接。", "在手机端选择需要展示或互动的内容。", "课堂结束后关闭投屏。"],
      check: "电脑端能正常显示手机端操作内容。",
      risk: "投屏前请确认网络稳定，避免课堂中断。"
    }
  },
  {
    id: "question-bank-add",
    category: "exam",
    title: "如何添加题目到试题库？",
    summary: "可手动添加单选、多选、判断、填空、简答等题目。",
    keywords: ["试题库", "添加题目", "题库", "单选", "多选", "判断", "填空", "简答"],
    answer: {
      entry: "进入【题库】或【试题库】，点击添加题目。",
      steps: ["选择题型。", "填写题干、选项和答案。", "设置分值、解析或标签。", "保存题目。"],
      check: "题目出现在试题库列表中，可以被组卷引用。",
      risk: "保存前请核对正确答案，题目错误会影响测验或考试结果。"
    }
  },
  {
    id: "question-bank-import",
    category: "exam",
    title: "如何批量导入试题？",
    summary: "适合一次性录入大量题目。",
    keywords: ["批量导入", "导入试题", "Excel导入", "文本导入", "试题模板"],
    answer: {
      entry: "进入【题库】>【我的题库】>【批量导入】。",
      steps: ["选择文本导入、从试卷导入或从 Excel 导入。", "按页面提示下载模板。", "按模板填写题目。", "上传文件并检查导入结果。"],
      check: "导入成功后，题目会出现在题库中。",
      risk: "模板格式不要随意改动，否则可能导入失败。"
    }
  },
  {
    id: "question-bank-quote",
    category: "exam",
    title: "如何引用试题？",
    summary: "从已有题库中引用题目，减少重复录入。",
    keywords: ["引用试题", "引用题目", "题库引用", "已有题目"],
    answer: {
      entry: "进入试题库或组卷页面，选择引用试题。",
      steps: ["选择题库来源。", "按题型、标签或关键词筛选题目。", "勾选需要引用的试题。", "确认引用到当前题库或试卷。"],
      check: "被引用的题目能在当前题库或试卷中看到。",
      risk: "引用后请检查题目答案和适用课程，避免引用到不合适的题目。"
    }
  },
  {
    id: "paper-manual",
    category: "exam",
    title: "如何手动组卷？",
    summary: "教师自己选择题目组成试卷。",
    keywords: ["手动组卷", "试卷库", "组卷", "添加试题", "试卷"],
    answer: {
      entry: "进入【试卷库】，选择手动组卷。",
      steps: ["填写试卷名称。", "添加试题。", "设置每题分值和试卷总分。", "保存并预览试卷。"],
      check: "试卷库中出现新试卷，题目和分值显示正确。",
      risk: "组卷完成后请预览，重点检查题目顺序、答案和总分。"
    }
  },
  {
    id: "paper-auto",
    category: "exam",
    title: "如何自动组卷？",
    summary: "按题型、数量和规则自动生成试卷。",
    keywords: ["自动组卷", "随机组卷", "抽题", "组卷规则"],
    answer: {
      entry: "进入【试卷库】，选择自动组卷。",
      steps: ["设置题型、题量和分值。", "选择题库范围。", "设置抽题规则。", "生成后预览并保存试卷。"],
      check: "系统生成的试卷符合题量、分值和题库范围要求。",
      risk: "自动组卷后也要人工检查，避免题目难度或范围不合适。"
    }
  },
  {
    id: "paper-quote",
    category: "exam",
    title: "如何引用试卷？",
    summary: "从已有试卷中引用，快速复用考试内容。",
    keywords: ["引用试卷", "试卷引用", "复用试卷", "已有试卷"],
    answer: {
      entry: "进入【试卷库】，选择引用试卷。",
      steps: ["选择试卷来源。", "筛选或搜索目标试卷。", "确认引用。", "引用后检查试题和分值。"],
      check: "被引用试卷出现在当前试卷库。",
      risk: "引用试卷前请确认适用课程、题目内容和考试要求。"
    }
  },
  {
    id: "exam-arrange",
    category: "exam",
    title: "如何安排考试？",
    summary: "把试卷发布成正式考试，并设置时间、考生和规则。",
    keywords: ["安排考试", "在线考试", "考试", "考生", "试卷", "考试时间"],
    answer: {
      entry: "进入考试模块，点击安排考试或新建考试。",
      steps: ["选择试卷。", "设置考试时间、考试时长和考生范围。", "设置提交、查看成绩等规则。", "确认无误后发布考试。"],
      check: "考试列表中出现该考试，学生端能在规定时间进入。",
      risk: "考试属于高风险操作，发布前请重点核对时间、考生范围和试卷。"
    }
  },
  {
    id: "exam-grade",
    category: "exam",
    title: "如何批阅试卷主观题？",
    summary: "客观题通常自动判分，主观题需要教师批阅。",
    keywords: ["批阅", "主观题", "阅卷", "简答题", "试卷批改"],
    answer: {
      entry: "进入考试详情或阅卷页面，打开主观题批阅。",
      steps: ["选择需要批阅的学生或题目。", "查看学生答案。", "填写分数和评语。", "保存批阅结果。"],
      check: "主观题分数保存后，考试总分会更新。",
      risk: "批阅分数会影响考试成绩，保存前请核对评分标准。"
    }
  },
  {
    id: "exam-result",
    category: "exam",
    title: "如何查看考试成绩？",
    summary: "查看学生考试得分、提交状态和成绩明细。",
    keywords: ["考试成绩", "查看成绩", "成绩", "提交状态", "考试结果"],
    answer: {
      entry: "进入考试详情，打开成绩或考试结果页面。",
      steps: ["选择考试和班级。", "查看学生提交状态和得分。", "需要时查看答题明细。", "按页面入口导出成绩。"],
      check: "成绩列表能显示学生姓名、提交状态和分数。",
      risk: "成绩公布前请确认主观题已批阅完成。"
    }
  },
  {
    id: "exam-analysis",
    category: "exam",
    title: "如何查看考试分析？",
    summary: "查看考试整体情况、题目正确率和学生表现。",
    keywords: ["考试分析", "试卷分析", "正确率", "考试报告", "分析"],
    answer: {
      entry: "进入考试详情，打开考试分析或统计分析。",
      steps: ["选择目标考试。", "查看整体得分、最高分、平均分等数据。", "查看题目正确率和薄弱题目。", "按需要导出分析结果。"],
      check: "分析页面能显示班级和题目维度的数据。",
      risk: "分析数据应结合教学实际判断，不建议只看单一分数。"
    }
  },
  {
    id: "assessment-rule",
    category: "grade",
    title: "如何设置课程考核规则？",
    summary: "把课件学习、作业、讨论、点名、表现和考试汇总为课程成绩。",
    keywords: ["考核规则", "课程成绩", "成绩权重", "总成绩", "成绩汇总", "权重"],
    answer: {
      entry: "进入课程的成绩、考核或评价设置页面。",
      steps: ["选择参与考核的项目。", "设置课件学习、作业、讨论、课堂点名、课程表现、考试等权重。", "保存规则。", "查看成绩汇总是否按规则计算。"],
      check: "成绩汇总页能显示各项得分和总成绩。",
      risk: "考核规则会影响最终成绩，调整前请确认教学方案和学校要求。"
    }
  },
  {
    id: "courseware-score",
    category: "grade",
    title: "课件学习成绩如何计算？",
    summary: "课件学习成绩通常按章节平均分计算。",
    keywords: ["课件学习成绩", "章节平均", "学习成绩", "考核范围"],
    answer: {
      entry: "进入课程考核规则或课件学习成绩设置。",
      steps: ["查看课件学习成绩项。", "确认参与考核的章节范围。", "需要排除章节时进入设置修改考核范围。", "保存后查看成绩汇总。"],
      check: "课件学习成绩按设置范围参与总成绩计算。",
      risk: "默认通常所有章节参与考核，排除章节前请确认教学要求。"
    }
  },
  {
    id: "courseware-time",
    category: "grade",
    title: "课件学习时长如何计算？",
    summary: "支持累计时长、按章时长或按节时长计算。",
    keywords: ["学习时长", "累计时长", "按章", "按节", "时长计算"],
    answer: {
      entry: "进入课程考核规则中的课件学习时长设置。",
      steps: ["选择累计时长、按章时长或按节时长。", "设置达到满分所需时长。", "保存规则。", "查看学生时长得分。"],
      check: "学习时长成绩按选择的计算方式显示。",
      risk: "按章或按节计算会影响学生得分，请在开课前确定规则。"
    }
  },
  {
    id: "courseware-progress",
    category: "grade",
    title: "课件学习进度如何计算？",
    summary: "支持按章计算或按节计算。",
    keywords: ["学习进度", "进度计算", "按章计算", "按节计算", "完成进度"],
    answer: {
      entry: "进入课程考核规则中的课件学习进度设置。",
      steps: ["选择按章计算或按节计算。", "确认参与考核的章节。", "保存规则。", "查看成绩汇总中的进度得分。"],
      check: "学习进度成绩按所选规则更新。",
      risk: "学生端课件整体进度默认常按节显示，可能和教师设置的考核规则不同。"
    }
  },
  {
    id: "homework-score",
    category: "grade",
    title: "作业成绩如何计算？",
    summary: "可按所有作业平均分，也可给每份作业单独设置权重。",
    keywords: ["作业成绩", "作业权重", "平均分", "作业考核"],
    answer: {
      entry: "进入课程考核规则中的作业成绩设置。",
      steps: ["选择所有作业平均分或单独设置权重。", "确认哪些作业参与考核。", "保存规则。", "查看成绩汇总。"],
      check: "作业成绩按设置方式参与总成绩计算。",
      risk: "默认可能所有作业都参与考核，不参与的作业需要手动排除。"
    }
  },
  {
    id: "attendance-score",
    category: "grade",
    title: "课堂点名成绩如何计算？",
    summary: "根据签到记录扣分或得分。",
    keywords: ["课堂点名", "签到成绩", "缺勤", "迟到", "早退", "考勤"],
    answer: {
      entry: "进入课程考核规则中的课堂点名设置。",
      steps: ["设置点名在总成绩中的权重。", "设置缺勤、迟到、早退、病假、事假的扣分规则。", "保存后查看点名成绩。"],
      check: "学生点名记录会按规则进入成绩汇总。",
      risk: "扣分通常从总成绩中扣除，扣分上限为课堂点名所占权重。"
    }
  },
  {
    id: "mobile-diff",
    category: "support",
    title: "电脑端和 App 功能有什么区别？",
    summary: "部分教师操作更适合电脑端，App 偏移动教学和课堂互动。",
    keywords: ["电脑端", "App", "手机端", "移动教学", "功能区别"],
    answer: {
      entry: "先确认你使用的是电脑网页端还是手机 App。",
      steps: ["课程建设、题库、试卷、考试安排等复杂操作建议优先用电脑端。", "课堂互动、移动教学等场景可使用 App。", "如果两端入口不一致，以当前端实际页面为准。"],
      check: "回答路径应与你当前端的页面按钮一致。",
      risk: "不要把电脑端路径直接套到 App，涉及考试、成绩和发布操作时尤其要确认。"
    }
  },
  {
    id: "profile-edit",
    category: "support",
    title: "如何修改个人信息？",
    summary: "可在右上角头像处进入个人资料修改姓名、邮箱或密码。",
    keywords: ["个人信息", "个人资料", "修改密码", "邮箱", "姓名", "头像"],
    answer: {
      entry: "登录优学院后，点击右上角头像处的【个人资料】。",
      steps: ["进入个人资料页面。", "修改姓名、邮箱等信息。", "需要改密码时进入修改密码。", "保存修改。"],
      check: "重新进入个人资料后，信息显示为最新内容。",
      risk: "如果手机号、学校信息或账号权限不能修改，请联系管理员或人工客服。"
    }
  },
  {
    id: "contact-service",
    category: "support",
    title: "如何联系在线客服？",
    summary: "优学院官网右下角可进入在线客服。",
    keywords: ["客服", "在线客服", "联系人工", "咨询客服", "人工"],
    answer: {
      entry: "进入优学院官网，点击右下角【咨询客服】。",
      steps: ["说明你遇到的问题。", "提供端别、课程名称、页面位置和账号角色。", "如果有报错文字，复制给客服。", "等待客服确认处理方式。"],
      check: "客服能根据你提供的信息定位问题。",
      risk: "账号异常、权限未开通、系统报错、成绩异常等问题建议直接联系人工。"
    }
  },
  {
    id: "permission-missing",
    category: "support",
    title: "为什么看不到某个按钮？",
    summary: "常见原因是角色、班级分配、端别或学校版本不同。",
    keywords: ["看不到按钮", "没有入口", "找不到", "权限", "角色", "版本"],
    answer: {
      entry: "先确认当前账号角色、课程身份和使用端。",
      steps: ["确认自己是课程管理员、任课教师还是助教。", "确认是否已被分配到对应班级。", "确认当前使用电脑端还是 App。", "仍看不到时联系人工检查权限。"],
      check: "权限调整后重新登录，目标按钮应出现在对应页面。",
      risk: "涉及教学团队、考试、成绩等功能时，不同角色可操作范围不同。"
    }
  },
  {
    id: "system-error",
    category: "support",
    title: "遇到系统报错怎么办？",
    summary: "先记录信息，再刷新或联系人工。",
    keywords: ["报错", "保存失败", "加载失败", "系统异常", "打不开"],
    answer: {
      entry: "先停留在报错页面，记录报错信息。",
      steps: ["记录发生时间、页面名称、课程名称和账号角色。", "复制报错文字或保存截图。", "刷新页面或重新登录再试一次。", "仍失败时联系在线客服。"],
      check: "人工处理时能看到完整问题背景。",
      risk: "不要反复点击提交、发布、评分等按钮，避免重复操作。"
    }
  }
];

const faqCatalog = [
  { category: "一、开课", question: "如何创建课程？", source: "如何创建课程？" },
  { category: "一、开课", question: "团队教学时谁来创建课程？", source: "如何创建课程？" },
  { category: "一、开课", question: "如何上传课程封面？", source: "如何创建课程？" },
  { category: "一、开课", question: "如何设置教学团队？", source: "如何设置教学团队？" },
  { category: "一、开课", question: "如何给课程添加老师？", source: "如何设置教学团队？" },
  { category: "一、开课", question: "如何为任课老师分配班级？", source: "如何设置教学团队？" },
  { category: "一、开课", question: "如何设置老师角色？", source: "如何设置教学团队？" },
  { category: "一、开课", question: "如何设置班级？", source: "如何设置班级？" },
  { category: "一、开课", question: "如何邀请学生加入班课？", source: "如何邀请学生加入班课？" },
  { category: "一、开课", question: "学生扫码入班失败怎么办？", source: "如何邀请学生加入班课？" },
  { category: "一、开课", question: "如何发布公告？", source: "如何发布公告？" },
  { category: "二、教学内容", question: "如何为班课关联教学课件？", source: "如何为班课关联教学课件？" },
  { category: "二、教学内容", question: "如何设置学习计划？", source: "如何设置学习计划？" },
  { category: "二、教学内容", question: "如何查看进度成绩？", source: "如何查看进度成绩？" },
  { category: "二、教学内容", question: "如何查看学生学习时长？", source: "如何查看进度成绩？" },
  { category: "二、教学内容", question: "如何添加资源？", source: "如何添加资源？" },
  { category: "二、教学内容", question: "资源上传后不能预览怎么办？", source: "如何添加资源？" },
  { category: "三、教学活动", question: "如何布置个人作业？", source: "如何布置个人作业？" },
  { category: "三、教学活动", question: "发布作业前要检查什么？", source: "如何布置个人作业？" },
  { category: "三、教学活动", question: "如何设置学生互评？", source: "如何设置学生互评？" },
  { category: "三、教学活动", question: "如何布置小组作业？", source: "如何布置小组作业？" },
  { category: "三、教学活动", question: "小组作业由谁提交？", source: "如何布置小组作业？" },
  { category: "三、教学活动", question: "如何发布测验？", source: "如何发布测验？" },
  { category: "三、教学活动", question: "发布测验前要核对什么？", source: "如何发布测验？" },
  { category: "三、教学活动", question: "如何发布讨论？", source: "如何发布讨论？" },
  { category: "三、教学活动", question: "讨论可以计分吗？", source: "如何发布讨论？" },
  { category: "四、课堂互动", question: "如何进行手机投屏互动？", source: "如何进行手机投屏互动？" },
  { category: "四、课堂互动", question: "投屏前需要确认什么？", source: "如何进行手机投屏互动？" },
  { category: "五、考试题库", question: "如何添加题目到试题库？", source: "如何添加题目到试题库？" },
  { category: "五、考试题库", question: "如何批量导入试题？", source: "如何批量导入试题？" },
  { category: "五、考试题库", question: "Excel 导入试题失败怎么办？", source: "如何批量导入试题？" },
  { category: "五、考试题库", question: "如何引用试题？", source: "如何引用试题？" },
  { category: "五、考试题库", question: "如何手动组卷？", source: "如何手动组卷？" },
  { category: "五、考试题库", question: "如何自动组卷？", source: "如何自动组卷？" },
  { category: "五、考试题库", question: "如何引用试卷？", source: "如何引用试卷？" },
  { category: "五、考试题库", question: "如何安排考试？", source: "如何安排考试？" },
  { category: "五、考试题库", question: "如何批阅试卷主观题？", source: "如何批阅试卷主观题？" },
  { category: "五、考试题库", question: "如何查看考试成绩？", source: "如何查看考试成绩？" },
  { category: "五、考试题库", question: "如何查看考试分析？", source: "如何查看考试分析？" },
  { category: "六、成绩评价", question: "如何设置课程考核规则？", source: "如何设置课程考核规则？" },
  { category: "六、成绩评价", question: "课件学习成绩如何计算？", source: "课件学习成绩如何计算？" },
  { category: "六、成绩评价", question: "课件学习时长如何计算？", source: "课件学习时长如何计算？" },
  { category: "六、成绩评价", question: "课件学习进度如何计算？", source: "课件学习进度如何计算？" },
  { category: "六、成绩评价", question: "作业成绩如何计算？", source: "作业成绩如何计算？" },
  { category: "六、成绩评价", question: "课堂点名成绩如何计算？", source: "课堂点名成绩如何计算？" },
  { category: "七、常见问题", question: "电脑端和 App 功能有什么区别？", source: "电脑端和 App 功能有什么区别？" },
  { category: "七、常见问题", question: "如何修改个人信息？", source: "如何修改个人信息？" },
  { category: "七、常见问题", question: "如何联系在线客服？", source: "如何联系在线客服？" },
  { category: "七、常见问题", question: "为什么看不到某个按钮？", source: "为什么看不到某个按钮？" },
  { category: "七、常见问题", question: "遇到系统报错怎么办？", source: "遇到系统报错怎么办？" }
];

const state = {
  messages: [],
  sessions: readJson("ai-helper-sessions", []),
  feedback: readJson("ai-helper-feedback", []),
  currentSessionId: null,
  language: localStorage.getItem("ai-helper-language") === "en" ? "en" : "zh"
};

const UI_TRANSLATIONS = {
  zh: {
    pageTitle: "AI 教师助手",
    sidebarLabel: "对话侧边栏",
    brandName: "小蜜蜂",
    brandStatus: "（我还在测试中哦）",
    newChat: "新建对话",
    history: "对话回溯",
    languageSwitcher: "语言切换",
    languageCurrent: "中文",
    languageTarget: "English",
    recommendedQuestions: "推荐问题",
    openCommonQuestions: "打开常见问题",
    closeCommonQuestions: "收起常见问题",
    questionIcon: "问",
    welcomeTitle: "老师您好，我是小蜜蜂",
    welcomeSubtitle: "不知道怎么问也没关系，点一个常见问题就能开始。",
    quickStart: "快速开始",
    quickStartDesc: "第一次使用，按四步完成开课",
    createCourse: "创建课程",
    createCourseDesc: "建立第一门课程",
    teachingTeam: "教学团队",
    teachingTeamDesc: "添加老师和分配班级",
    makeCourseware: "制作课件",
    makeCoursewareDesc: "添加并发布教学内容",
    assignHomework: "布置作业",
    assignHomeworkDesc: "设置要求、班级和时间",
    startClass: "开始上课",
    startClassDesc: "创建课堂并邀请学生",
    viewGrades: "查看成绩",
    viewGradesDesc: "了解学生学习情况",
    featureOverview: "功能总览",
    featureOverviewDesc: "看看平台能帮你做什么",
    knowledgeScope: "查看知识库范围",
    inputPlaceholder: "请输入你的问题，例如：如何发布作业？",
    send: "发送",
    close: "关闭",
    feedbackTitle: "很抱歉给您带来了不好的体验",
    feedbackPrompt: "请问您需要转人工吗？点击后将进入人工服务入口。",
    humanSupport: "转人工",
    notNow: "暂时不用",
    handoffTitle: "目前暂未接入人工",
    handoffPrompt: "麻烦您写下遇到的问题，我们将完善知识库，感谢您的反馈。",
    handoffPlaceholder: "请描述您遇到的问题",
    submitFeedback: "提交反馈",
    cancel: "取消",
    emptyHistory: "暂无对话",
    teacher: "教师",
    assistant: "小蜜蜂",
    textAnswer: "文字解答",
    imageTutorial: "图片教程",
    videoTutorial: "视频教程",
    noImageTutorial: "暂未提供图片教程",
    noVideoTutorial: "暂未提供视频教程",
    copy: "复制",
    edit: "重新编辑",
    regenerate: "重新生成",
    like: "点赞",
    dislike: "点踩",
    helpful: "有帮助",
    notHelpful: "没帮助",
    thinking: "DeepSeek 正在思考",
    visualGuide: "图片操作指引",
    videoGuide: "指导视频",
    switched: "已切换为中文",
    newChatStarted: "已开始新对话"
  },
  en: {
    pageTitle: "AI Teaching Assistant",
    sidebarLabel: "Conversation sidebar",
    brandName: "Little Bee",
    brandStatus: "(Beta)",
    newChat: "New chat",
    history: "Conversation history",
    languageSwitcher: "Language switcher",
    languageCurrent: "English",
    languageTarget: "中文",
    recommendedQuestions: "Suggested questions",
    openCommonQuestions: "Open common questions",
    closeCommonQuestions: "Close common questions",
    questionIcon: "Q",
    welcomeTitle: "Hello, I’m Little Bee",
    welcomeSubtitle: "Not sure what to ask? Choose a common question to get started.",
    quickStart: "Quick start",
    quickStartDesc: "Set up your first course in four steps",
    createCourse: "Create a course",
    createCourseDesc: "Build your first course",
    teachingTeam: "Teaching team",
    teachingTeamDesc: "Add teachers and assign classes",
    makeCourseware: "Create courseware",
    makeCoursewareDesc: "Add and publish learning content",
    assignHomework: "Assign homework",
    assignHomeworkDesc: "Set requirements, classes, and dates",
    startClass: "Start a class",
    startClassDesc: "Create a classroom session and invite students",
    viewGrades: "View progress",
    viewGradesDesc: "Review student progress and grades",
    featureOverview: "Feature overview",
    featureOverviewDesc: "See what you can do in uLearning",
    knowledgeScope: "View supported topics",
    inputPlaceholder: "Ask a question, e.g. How do I publish homework?",
    send: "Send",
    close: "Close",
    feedbackTitle: "We’re sorry this answer was not helpful",
    feedbackPrompt: "Would you like human support? This will open the support entry.",
    humanSupport: "Human support",
    notNow: "Not now",
    handoffTitle: "Human support is not connected yet",
    handoffPrompt: "Please describe the issue. Your feedback will help us improve the knowledge base.",
    handoffPlaceholder: "Describe the issue you encountered",
    submitFeedback: "Submit feedback",
    cancel: "Cancel",
    emptyHistory: "No conversations yet",
    teacher: "Teacher",
    assistant: "Little Bee",
    textAnswer: "Text guide",
    imageTutorial: "Image guide",
    videoTutorial: "Video guide",
    noImageTutorial: "No image guide is available yet.",
    noVideoTutorial: "No video guide is available yet.",
    copy: "Copy",
    edit: "Edit",
    regenerate: "Regenerate",
    like: "Helpful",
    dislike: "Not helpful",
    helpful: "Helpful",
    notHelpful: "Not helpful",
    thinking: "DeepSeek is thinking",
    visualGuide: "Visual step-by-step guide",
    videoGuide: "video tutorial",
    switched: "Switched to English",
    newChatStarted: "Started a new chat"
  }
};

const nodes = {
  chatPanel: document.querySelector(".chat-panel"),
  messages: document.querySelector("#messages"),
  form: document.querySelector("#chatForm"),
  input: document.querySelector("#chatInput"),
  historyList: document.querySelector("#historyList"),
  promptStrip: document.querySelector(".prompt-strip"),
  toast: document.querySelector("#toast"),
  feedbackDialog: document.querySelector("#feedbackDialog"),
  feedbackDialogClose: document.querySelector("#feedbackDialogClose"),
  dialogCancel: document.querySelector("#dialogCancel"),
  dialogHandoff: document.querySelector("#dialogHandoff"),
  handoffDialog: document.querySelector("#handoffDialog"),
  handoffDialogClose: document.querySelector("#handoffDialogClose"),
  handoffCancel: document.querySelector("#handoffCancel"),
  handoffSubmit: document.querySelector("#handoffSubmit"),
  handoffInput: document.querySelector("#handoffInput"),
  languageToggle: document.querySelector("#languageToggle")
};

function t(key) {
  return UI_TRANSLATIONS[state.language]?.[key] || UI_TRANSLATIONS.zh[key] || key;
}

function applyLanguage() {
  const language = state.language;
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  document.title = t("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  [
    ["data-i18n-placeholder", "placeholder"],
    ["data-i18n-title", "title"],
    ["data-i18n-aria-label", "aria-label"]
  ].forEach(([dataAttribute, targetAttribute]) => {
    document.querySelectorAll(`[${dataAttribute}]`).forEach((element) => {
      element.setAttribute(targetAttribute, t(element.getAttribute(dataAttribute)));
    });
  });
  if (nodes.languageToggle) {
    nodes.languageToggle.textContent = t("languageTarget");
    nodes.languageToggle.setAttribute(
      "aria-label",
      language === "en" ? "切换到中文" : "Switch to English"
    );
  }
  renderHistory();
}

function toggleLanguage() {
  state.language = state.language === "zh" ? "en" : "zh";
  localStorage.setItem("ai-helper-language", state.language);
  applyLanguage();
  showToast(t("switched"));
}

const welcome = "老师您好，欢迎来到ULearning花园，我是小蜜蜂，也是您的小助手，在这里遇到的任何问题都可以问我，很高兴为您答疑解惑。";
const beeMascotMarkup = `<span class="bee-mascot" aria-hidden="true"><span class="bee-wing bee-wing-left"></span><span class="bee-wing bee-wing-right"></span><span class="bee-body"><span class="bee-face"></span></span></span>`;

const overviewAnswer = [
  "uLearning Web 端教师侧的主要功能如下：",
  "",
  "课程管理",
  "创建课程、设置教学团队、设置班级、邀请学生入班。",
  "",
  "教学内容",
  "关联教学课件、设置学习计划、添加资源、查看进度成绩。",
  "",
  "教学活动",
  "布置个人作业、发布测验、发布讨论。",
  "",
  "考试题库",
  "批量导入试题、组卷、安排考试、阅卷、查看考试分析。",
  "",
  "成绩评价",
  "设置课程考核规则、查看课件成绩、查看作业成绩、查看课堂点名成绩。",
  "",
  "课堂互动",
  "开始上课、课堂中打开资源、发起投屏、结束投屏并导出数据。"
].join("\n");

const featureLinks = [
  ["Web 端", "电脑端和 App 功能有什么区别？"],
  ["Web端", "电脑端和 App 功能有什么区别？"],
  ["Web 端与 App 配合", "电脑端和 App 功能有什么区别？"],
  ["Web端与App配合", "电脑端和 App 功能有什么区别？"],
  ["App", "电脑端和 App 功能有什么区别？"],
  ["投屏", "如何发起投屏？"],
  ["课堂互动入口", "如何进行手机投屏互动？"],
  ["课堂互动", "如何进行手机投屏互动？"],
  ["创建课件", "如何创建课件？"],
  ["添加章节结构", "如何添加章节结构？"],
  ["填充课程内容", "如何填充课程内容？"],
  ["课件设置及发布", "如何进行课件设置及发布？"],
  ["创建课程", "如何创建课程？"],
  ["设置教学团队", "如何设置教学团队？"],
  ["设置班级", "如何设置班级？"],
  ["创建班级", "设置教学团队：创建班级"],
  ["添加学生", "设置教学团队：添加学生"],
  ["学生扫码加入", "设置教学团队：学生扫码加入"],
  ["老师添加学生", "设置教学团队：老师添加学生"],
  ["指定教师", "设置教学团队：指定教师"],
  ["邀请学生", "如何邀请学生加入班课？"],
  ["邀请学生入班", "如何邀请学生加入班课？"],
  ["发布公告", "如何发布公告？"],
  ["关联课件", "如何为班课关联教学课件？"],
  ["关联教学课件", "如何为班课关联教学课件？"],
  ["设置学习计划", "如何设置学习计划？"],
  ["查看进度成绩", "如何查看进度成绩？"],
  ["查看学习进度", "如何查看进度成绩？"],
  ["查看学习进度", "如何查看进度成绩？"],
  ["添加资源", "如何添加资源？"],
  ["布置作业", "如何布置个人作业？"],
  ["布置个人作业", "如何布置个人作业？"],
  ["学生互评", "如何设置学生互评？"],
  ["小组作业", "如何布置小组作业？"],
  ["发布测验", "如何发布测验？"],
  ["发布讨论", "如何发布讨论？"],
  ["手机投屏互动", "如何进行手机投屏互动？"],
  ["添加题目", "如何添加题目到试题库？"],
  ["批量导入试题", "如何批量导入试题？"],
  ["引用试题", "如何引用试题？"],
  ["手动组卷", "如何手动组卷？"],
  ["自动组卷", "如何自动组卷？"],
  ["引用试卷", "如何引用试卷？"],
  ["安排考试", "如何安排考试？"],
  ["查看成绩与分析", "如何查看考试分析？"],
  ["查看成绩分析", "如何查看考试分析？"],
  ["组卷", "如何手动组卷？"],
  ["批阅试卷", "如何批阅试卷主观题？"],
  ["阅卷", "如何批阅试卷主观题？"],
  ["批卷", "如何批阅试卷主观题？"],
  ["阅卷批卷", "如何批阅试卷主观题？"],
  ["查看考试成绩", "如何查看考试成绩？"],
  ["成绩查看", "如何查看考试成绩？"],
  ["查看成绩", "如何查看考试成绩？"],
  ["查看成绩与分析", "如何查看考试分析？"],
  ["查看考试分析", "如何查看考试分析？"],
  ["考试分析", "如何查看考试分析？"],
  ["设置考核规则", "如何设置课程考核规则？"],
  ["设置课程考核规则", "如何设置课程考核规则？"],
  ["查看课件成绩", "课件学习成绩如何计算？"],
  ["课件成绩", "课件学习成绩如何计算？"],
  ["查看作业成绩", "作业成绩如何计算？"],
  ["学习时长", "课件学习时长如何计算？"],
  ["学习进度", "课件学习进度如何计算？"],
  ["作业成绩", "作业成绩如何计算？"],
  ["查看课堂点名成绩", "课堂点名成绩如何计算？"],
  ["课堂点名成绩", "课堂点名成绩如何计算？"],
  ["开始上课", "如何开始上课？"],
  ["课堂中打开资源", "如何在课堂中打开资源？"],
  ["发起投屏", "如何发起投屏？"],
  ["结束投屏并导出数据", "如何结束投屏和导出数据？"],
  ["删除课程", "如何删除课程？"],
  ["修改个人信息", "如何修改个人信息？"],
  ["联系在线客服", "如何联系在线客服？"],
  ["权限异常", "为什么看不到某个按钮？"],
  ["系统报错", "遇到系统报错怎么办？"]
];

let videoGuides = [
  { title: "创建课件", question: "如何创建课件？", src: "指导视频/准备教学内容与班级/2.创建课件.mp4", aliases: ["创建课件", "新建课件"] },
  { title: "添加章节结构", question: "如何添加章节结构？", src: "指导视频/准备教学内容与班级/3.添加章节结构.mp4", aliases: ["添加章节结构", "章节结构", "添加章节"] },
  { title: "填充课程内容", question: "如何填充课程内容？", src: "指导视频/准备教学内容与班级/4.填充课程内容.mp4", aliases: ["填充课程内容", "课程内容", "添加课程内容"] },
  { title: "课件设置及发布", question: "如何进行课件设置及发布？", src: "指导视频/准备教学内容与班级/5.课件设置及发布.mp4", aliases: ["课件设置及发布", "课件发布", "发布课件", "设置课件"] },
  { title: "关联课件", question: "如何为班课关联教学课件？", src: "指导视频/准备教学内容与班级/6.关联课件PC.mp4", aliases: ["关联课件", "关联教学课件"] },
  { title: "添加教学团队", question: "如何设置教学团队？", src: "指导视频/准备教学内容与班级/8.添加教学团队pc.mp4", aliases: ["添加教学团队", "设置教学团队", "教学团队"] },
  { title: "发布课程公告", question: "如何发布公告？", src: "指导视频/准备教学内容与班级/9.发布课程公告PC.mp4", aliases: ["发布课程公告", "发布公告", "课程公告"] },
  { title: "设置学习计划", question: "如何设置学习计划？", src: "指导视频/准备教学内容与班级/10.设置学习计划.mp4", aliases: ["设置学习计划", "学习计划"] },
  { title: "邀请学生入班", question: "如何邀请学生加入班课？", src: "指导视频/准备教学内容与班级/11.邀请学生加班PC.mp4", aliases: ["邀请学生入班", "邀请学生加班", "邀请学生", "学生入班"] },
  { title: "查看进度成绩", question: "如何查看进度成绩？", src: "指导视频/准备教学内容与班级/12.查看进度成绩PC.mp4", aliases: ["查看进度成绩", "查看学习进度", "进度成绩"] },
  { title: "添加资源", question: "如何添加资源？", src: "指导视频/准备教学内容与班级/13.添加资源PC.mp4", aliases: ["添加资源", "上传资源"] },
  { title: "布置个人作业", question: "如何布置个人作业？", src: "指导视频/发布教学活动/14.布置个人作业PC.mp4", aliases: ["布置个人作业", "个人作业", "布置作业"] },
  { title: "布置小组作业", question: "如何布置小组作业？", src: "指导视频/发布教学活动/15.布置小组作业PC.mp4", aliases: ["布置小组作业", "小组作业"] },
  { title: "发布测验", question: "如何发布测验？", src: "指导视频/发布教学活动/16.发布测验.mp4", aliases: ["发布测验", "测验"] },
  { title: "批阅作业", question: "如何批阅作业？", src: "指导视频/发布教学活动/17.批阅作业PC.mp4", aliases: ["批阅作业", "作业批阅", "批改作业"] },
  { title: "发布讨论", question: "如何发布讨论？", src: "指导视频/发布教学活动/18.发布讨论PC.mp4", aliases: ["发布讨论", "课程讨论", "讨论"] },
  { title: "PC端发起直播", question: "如何在PC端发起直播？", src: "指导视频/发布教学活动/PC端发起直播.mp4", aliases: ["PC端发起直播", "发起直播", "直播"] },
  { title: "修改个人资料、密码", question: "如何修改个人资料或密码？", src: "指导视频/常见问题/27.修改个人资料、密码.mp4", aliases: ["修改个人资料", "修改个人信息", "修改密码", "个人资料"] },
  { title: "寻找在线客服方式", question: "如何联系在线客服？", src: "指导视频/常见问题/寻找在线客服方式.mp4", aliases: ["寻找在线客服", "在线客服", "联系在线客服"] },
  { title: "试题库-创建试题", question: "如何添加题目到试题库？", src: "指导视频/考核评价/19.试题库-创建试题.mp4", aliases: ["创建试题", "添加题目", "试题库", "添加试题"] },
  { title: "试卷库-添加试卷", question: "如何添加试卷？", src: "指导视频/考核评价/20.试卷库-添加试卷.mp4", aliases: ["添加试卷", "试卷库", "手动组卷", "创建试卷"] },
  { title: "设置课程考核规则", question: "如何设置课程考核规则？", src: "指导视频/考核评价/22.设置课程考核规则.mp4", aliases: ["设置课程考核规则", "设置考核规则", "考核规则"] },
  { title: "查看课程分析", question: "如何查看课程分析？", src: "指导视频/考核评价/23.查看课程分析.mp4", aliases: ["查看课程分析", "课程分析"] },
  { title: "发布考试", question: "如何安排考试？", src: "指导视频/考核评价/发布考试.mp4", aliases: ["发布考试", "安排考试"] },
  { title: "考试管理考试分析", question: "如何查看考试分析？", src: "指导视频/考核评价/考试管理考试分析等.mp4", aliases: ["考试管理", "考试分析", "查看考试分析", "查看考试成绩"] },
  { title: "课程证书", question: "如何设置课程证书？", src: "指导视频/考核评价/课程证书.mp4", aliases: ["课程证书", "设置课程证书", "证书"] },
  { title: "发起投屏", question: "如何发起投屏？", src: "指导视频/课堂投屏互动/24.发起投屏.mp4", aliases: ["发起投屏", "手机投屏", "投屏"] },
  { title: "结束投屏和导出数据", question: "如何结束投屏和导出数据？", src: "指导视频/课堂投屏互动/25.结束投屏和导出数据.mp4", aliases: ["结束投屏", "导出投屏数据", "导出数据"] }
];

let screenshotGuides = [
  {
    title: "创建课程",
    question: "如何创建课程？",
    aliases: ["创建课程", "新建课程", "快速创建课程", "开课"],
    steps: [
      { label: "Step 1", text: "在教师首页右侧点击“创建课程”，进入创建流程。", src: "截图教程/创建课程/step1.png" },
      { label: "Step 2", text: "填写课程名称，选择课程封面，然后点击创建。", src: "截图教程/创建课程/step2.png" },
      { label: "Step 3", text: "创建完成后，点击新课程进入课程编辑。", src: "截图教程/创建课程/step3.png" }
    ]
  },
  {
    title: "删除课程",
    question: "如何删除课程？",
    aliases: ["删除课程", "删课程", "移除课程", "确认删除"],
    steps: [
      { label: "Step 1", text: "在课程卡片右上角点击更多菜单，再选择删除课程。", src: "截图教程/删除课程/step1.png" },
      { label: "Step 2", text: "在弹窗中输入“确认删除”，再点击删除课程。", src: "截图教程/删除课程/step2.png" }
    ]
  },
  {
    id: "teaching-team-flow",
    title: "设置教学团队",
    question: "引导步骤二：设置教学团队",
    aliases: ["创建班级，添加学生，指定教师", "教学团队完整流程"],
    steps: [
      { label: "Step 1", text: "进入课程后，打开课程工作台。", src: "截图教程/如何设置教学团队/创建班级/step1.png" },
      { label: "Step 2", text: "进入教学团队与班级管理入口。", src: "截图教程/如何设置教学团队/创建班级/step2.png" }
    ]
  },
  {
    id: "teaching-team-create-class-flow",
    title: "创建班级",
    question: "设置教学团队：创建班级",
    aliases: ["创建班级", "新建班级"],
    steps: [
      { label: "Step 1", text: "进入课程后，打开教学团队与班级管理入口。", src: "截图教程/如何设置教学团队/创建班级/step1.png" },
      { label: "Step 2", text: "进入班级管理页面。", src: "截图教程/如何设置教学团队/创建班级/step2.png" },
      { label: "Step 3", text: "点击创建班级，填写班级信息后保存。", src: "截图教程/如何设置教学团队/创建班级/step3创建班级.png" }
    ]
  },
  {
    id: "teaching-team-student-scan-flow",
    title: "学生扫码加入",
    question: "设置教学团队：学生扫码加入",
    aliases: ["学生扫码加入", "学生扫码", "学生加入班级"],
    steps: [
      { label: "Step 1", text: "进入班级后，打开学生加入或入班二维码入口。", src: "截图教程/如何设置教学团队/加入学生-学生扫码/step1.png" },
      { label: "Step 2", text: "把二维码或加入信息发给学生，学生扫码后即可加入班级。", src: "截图教程/如何设置教学团队/加入学生-学生扫码/c45d6f9566964adc001f07700a2d4dfa.png" }
    ]
  },
  {
    id: "teaching-team-teacher-add-students-flow",
    title: "老师添加学生",
    question: "设置教学团队：老师添加学生",
    aliases: ["老师添加学生", "添加学生", "手动添加学生"],
    steps: [
      { label: "Step 1", text: "进入目标班级，点击添加学生。", src: "截图教程/如何设置教学团队/加入学生-老师添加/step1.png" },
      { label: "Step 2", text: "选择学生并确认添加，添加后回到班级成员列表检查名单。", src: "截图教程/如何设置教学团队/加入学生-老师添加/step2.png" }
    ]
  },
  {
    id: "teaching-team-assign-teacher-flow",
    title: "指定教师",
    question: "设置教学团队：指定教师",
    aliases: ["指定教师", "分配教师", "任课教师"],
    steps: [
      { label: "Step 1", text: "进入教学团队或班级教师设置入口，选择需要指定教师的班级。", src: "截图教程/如何设置教学团队/指定教师/step1.png" },
      { label: "Step 2", text: "选择教师并确认负责班级，保存后检查教师与班级关系。", src: "截图教程/如何设置教学团队/指定教师/step2.png" }
    ]
  },
  {
    id: "new-courseware-flow",
    title: "新建课件",
    question: "关联课件：新建课件",
    aliases: ["如何新建课件", "如何创建课件", "创建课件", "新建课件"],
    steps: [
      { label: "Step 1", text: "进入课程工作台，打开课件管理。", src: "截图教程/如何新建课件/step1.png" },
      { label: "Step 2", text: "点击新建课件。", src: "截图教程/如何新建课件/step2.png" },
      { label: "Step 3", text: "填写课件名称并创建。", src: "截图教程/如何新建课件/step3.png" },
      { label: "Step 4", text: "进入课件编辑页面，添加章节结构。", src: "截图教程/如何新建课件/step4.png" },
      { label: "Step 5", text: "在章节中添加教学内容。", src: "截图教程/如何新建课件/step5.png" },
      { label: "Step 6", text: "选择需要添加的内容或资源类型。", src: "截图教程/如何新建课件/step6.png" },
      { label: "Step 7", text: "完成内容编辑和课件设置。", src: "截图教程/如何新建课件/step7.png" },
      { label: "Step 8", text: "保存并发布课件，供班级关联使用。", src: "截图教程/如何新建课件/step8.png" }
    ]
  },
  {
    id: "courseware-library-flow",
    title: "从现有课件库导入课件",
    question: "关联课件：导入现有课件",
    aliases: ["如何从课件库导入课件"],
    steps: [
      { label: "Step 1", text: "进入课件管理，选择从课件库导入。", src: "截图教程/如何从课件库导入课件/step1.png" },
      { label: "Step 2", text: "在课件库中找到并选择需要的课件。", src: "截图教程/如何从课件库导入课件/step2.png" },
      { label: "Step 3", text: "确认导入，导入后即可继续编辑或关联班级。", src: "截图教程/如何从课件库导入课件/step3.png" }
    ]
  },
  {
    id: "own-courseware-flow",
    title: "添加自己的课件资源",
    question: "如何导入自己的课件？",
    aliases: ["添加课件资源", "导入自己的课件"],
    steps: [
      { label: "Step 1", text: "在课件内容中选择添加资源或上传本地文件。", src: "截图教程/如何导入自己的课件/step1.png" },
      { label: "Step 2", text: "选择文件并完成上传，保存后即可在课件中使用。", src: "截图教程/如何导入自己的课件/step2.png" }
    ]
  },
  {
    id: "start-class-flow",
    title: "开始上课",
    question: "引导步骤四：开始上课",
    aliases: ["如何开始上课"],
    steps: [
      { label: "Step 1", text: "进入需要授课的课程。", src: "截图教程/如何开始上课/step1.png" },
      { label: "Step 2", text: "选择对应班级和课堂入口。", src: "截图教程/如何开始上课/step2.png" },
      { label: "Step 3", text: "确认本次课堂使用的课件与教学内容。", src: "截图教程/如何开始上课/step3.png" },
      { label: "Step 4", text: "点击开始上课，进入课堂教学页面。", src: "截图教程/如何开始上课/step4.png" }
    ]
  },
  {
    id: "open-class-resource-flow",
    title: "在课堂中打开资源",
    question: "如何在课堂中打开资源？",
    aliases: ["课堂中打开资源", "上课时打开资源"],
    steps: [
      { label: "Step 1", text: "进入正在进行的课堂。", src: "截图教程/如何在课堂中打开资源/step1.png" },
      { label: "Step 2", text: "打开课堂中的课件或资源列表。", src: "截图教程/如何在课堂中打开资源/step2.png" },
      { label: "Step 3", text: "选择需要展示的资源并打开。", src: "截图教程/如何在课堂中打开资源/step3.png" }
    ]
  },
  {
    id: "ai-courseware-flow",
    title: "使用 AI 工作台生成课件",
    question: "新建课件后如何使用AI助手？",
    aliases: ["AI工作台一键生成课件", "使用AI助手生成课件"],
    steps: [
      { label: "Step 1", text: "进入课程工作台。", src: "截图教程/如何使用教师备课助手/step1.png" },
      { label: "Step 2", text: "打开教师备课助手，按提示输入要求，一键生成课件内容。", src: "截图教程/如何使用教师备课助手/step2.png" }
    ]
  }
];

const guidedResponses = [
  {
    triggers: ["快速开始", "我应该从哪里开始", "第一次使用应该从哪里开始", "老师应该从哪里开始"],
    answer: "第一次使用 uLearning，可以按下面 4 个步骤快速开始：\n\n一、创建课程\n二、设置教学团队\n三、关联课件\n四、开始上课",
    prompt: "点击任一步骤，查看具体操作：",
    actions: [
      { label: "一、创建课程", question: "引导步骤一：创建课程" },
      { label: "二、设置教学团队", question: "引导步骤二：设置教学团队" },
      { label: "三、关联课件", question: "引导步骤三：关联课件" },
      { label: "四、开始上课", question: "引导步骤四：开始上课" }
    ]
  },
  {
    triggers: ["引导步骤一：创建课程", "第一步创建课程"],
    answer: "好，我们先从创建课程开始。\n\n在教师首页点击【创建课程】，填写课程名称、选择封面并确认创建。",
    screenshotIds: ["创建课程"],
    prompt: "课程创建完成后，你接下来可以了解：",
    actions: [
      { label: "二、设置教学团队", question: "引导步骤二：设置教学团队" },
      { label: "如何设置班级", question: "如何设置班级？" },
      { label: "如何新建课件", question: "如何新建课件？" }
    ]
  },
  {
    triggers: ["引导步骤二：设置教学团队", "第二步设置教学团队"],
    answer: "课程建好后，我们来把上课需要的班级、学生和授课老师安排好。\n\n这一步可以按顺序完成，也可以先选择你现在要做的操作。",
    prompt: "请选择你要继续了解的操作：",
    actions: [
      { label: "创建班级", question: "设置教学团队：创建班级" },
      { label: "添加学生", question: "设置教学团队：添加学生" },
      { label: "指定教师", question: "设置教学团队：指定教师" }
    ]
  },
  {
    triggers: ["设置教学团队：创建班级"],
    answer: "先把授课班级建好，后面添加学生、指定教师都会基于这个班级来操作。",
    screenshotIds: ["teaching-team-create-class-flow"],
    prompt: "班级创建好后，下一步可以继续：",
    actions: [
      { label: "添加学生", question: "设置教学团队：添加学生" },
      { label: "指定教师", question: "设置教学团队：指定教师" },
      { label: "三、关联课件", question: "引导步骤三：关联课件" }
    ]
  },
  {
    triggers: ["设置教学团队：添加学生"],
    answer: "添加学生有两种常用方式：让学生扫码加入，或者由老师手动添加。请选择你现在想用的方式。",
    prompt: "请选择添加学生的方式：",
    actions: [
      { label: "学生扫码加入", question: "设置教学团队：学生扫码加入" },
      { label: "老师添加学生", question: "设置教学团队：老师添加学生" },
      { label: "返回教学团队步骤", question: "引导步骤二：设置教学团队" }
    ]
  },
  {
    triggers: ["设置教学团队：学生扫码加入"],
    answer: "如果学生比较方便自己操作，可以把入班二维码或加入信息发给学生，让学生扫码加入班级。",
    screenshotIds: ["teaching-team-student-scan-flow"],
    prompt: "学生加入后，你还可以继续：",
    actions: [
      { label: "老师添加学生", question: "设置教学团队：老师添加学生" },
      { label: "指定教师", question: "设置教学团队：指定教师" },
      { label: "三、关联课件", question: "引导步骤三：关联课件" }
    ]
  },
  {
    triggers: ["设置教学团队：老师添加学生"],
    answer: "如果老师已经有学生名单，或者需要手动确认学生，可以由老师在班级里添加学生。",
    screenshotIds: ["teaching-team-teacher-add-students-flow"],
    prompt: "学生添加好后，下一步可以继续：",
    actions: [
      { label: "学生扫码加入", question: "设置教学团队：学生扫码加入" },
      { label: "指定教师", question: "设置教学团队：指定教师" },
      { label: "三、关联课件", question: "引导步骤三：关联课件" }
    ]
  },
  {
    triggers: ["设置教学团队：指定教师"],
    answer: "班级和学生准备好后，再为班级指定授课教师，确保每位老师负责的班级是正确的。",
    screenshotIds: ["teaching-team-assign-teacher-flow"],
    prompt: "教师指定完成后，接下来可以继续：",
    actions: [
      { label: "添加学生", question: "设置教学团队：添加学生" },
      { label: "三、关联课件", question: "引导步骤三：关联课件" },
      { label: "四、开始上课", question: "引导步骤四：开始上课" }
    ]
  },
  {
    triggers: ["引导步骤三：关联课件", "第三步关联课件"],
    answer: "接下来准备上课要用的课件。请选择适合你的方式：",
    actions: [
      { label: "新建课件", question: "关联课件：新建课件" },
      { label: "导入现有课件", question: "关联课件：导入现有课件" },
      { label: "使用 AI 生成课件", question: "新建课件后如何使用AI助手？" }
    ]
  },
  {
    triggers: ["关联课件：新建课件"],
    answer: "好，我们来新建一份课件。\n\n新建课件后，可以自己添加章节和教学内容。",
    screenshotIds: ["new-courseware-flow"],
    prompt: "课件创建后，你接下来可以了解：",
    actions: [
      { label: "使用 AI 助手", question: "新建课件后如何使用AI助手？" },
      { label: "关联课件到班级", question: "如何为班课关联教学课件？" },
      { label: "四、开始上课", question: "引导步骤四：开始上课" }
    ]
  },
  {
    triggers: ["关联课件：导入现有课件"],
    answer: "如果已经有准备好的内容，直接导入会更方便。\n\n你可以从现有课件库导入；如果课件库里没有，也可以添加自己的课件资源。",
    screenshotIds: ["courseware-library-flow", "own-courseware-flow"],
    prompt: "课件导入后，你接下来可以了解：",
    actions: [
      { label: "关联课件到班级", question: "如何为班课关联教学课件？" },
      { label: "设置学习计划", question: "如何设置学习计划？" },
      { label: "四、开始上课", question: "引导步骤四：开始上课" }
    ]
  },
  {
    triggers: ["新建课件后如何使用ai助手", "使用ai助手生成课件"],
    answer: "想更快完成备课，可以让 AI 助手帮你生成内容。\n\n进入 AI 工作台中的教师备课助手，输入课程主题和要求，即可生成课件内容。",
    screenshotIds: ["ai-courseware-flow"],
    prompt: "AI 生成课件后，你接下来可以了解：",
    actions: [
      { label: "继续编辑课件", question: "如何新建课件？" },
      { label: "关联课件到班级", question: "如何为班课关联教学课件？" },
      { label: "四、开始上课", question: "引导步骤四：开始上课" }
    ]
  },
  {
    triggers: ["引导步骤四：开始上课", "第四步开始上课"],
    answer: "前面的准备完成后，就可以开始上课了。\n\n进入课程并选择对应班级，确认课件后点击【开始上课】。",
    screenshotIds: ["start-class-flow"],
    prompt: "进入课堂后，你还可以了解：",
    actions: [
      { label: "在课堂中打开资源", question: "如何在课堂中打开资源？" },
      { label: "发起投屏", question: "如何发起投屏？" },
      { label: "发布课堂测验", question: "如何发布测验？" }
    ]
  },
  {
    triggers: ["如何在课堂中打开资源", "课堂中打开资源"],
    answer: "上课过程中需要展示资料时，可以直接在课堂里打开。\n\n进入正在进行的课堂，打开课件或资源列表，选择需要展示的资源。",
    screenshotIds: ["open-class-resource-flow"],
    prompt: "展示资源后，你还可以了解：",
    actions: [
      { label: "发起投屏", question: "如何发起投屏？" },
      { label: "发布课堂测验", question: "如何发布测验？" },
      { label: "返回快速开始", question: "快速开始" }
    ]
  }
];

init();

async function init() {
  await Promise.all([loadScreenshotGuides(), loadVideoGuides()]);
  applyLanguage();
  repairSessionTitles();
  startSession(false);
  renderHistory();
  bindEvents();
}

async function loadScreenshotGuides() {
  try {
    const response = await fetch(`/api/screenshot-guides?t=${Date.now()}`);
    if (!response.ok) return;
    const data = await response.json();
    const dynamicGuides = Array.isArray(data.guides) ? data.guides : [];
    if (!dynamicGuides.length) return;
    screenshotGuides = mergeScreenshotGuides(dynamicGuides, screenshotGuides);
  } catch (error) {
    console.warn("Failed to load screenshot guides", error);
  }
}

async function loadVideoGuides() {
  try {
    const response = await fetch(`/api/video-guides?t=${Date.now()}`);
    if (!response.ok) return;
    const data = await response.json();
    const dynamicGuides = Array.isArray(data.guides) ? data.guides : [];
    if (!dynamicGuides.length) return;
    videoGuides = mergeTutorialGuides(dynamicGuides, videoGuides, "src");
  } catch (error) {
    console.warn("Failed to load video guides", error);
  }
}

function mergeScreenshotGuides(primaryGuides, fallbackGuides) {
  return mergeTutorialGuides(primaryGuides, fallbackGuides, "path");
}

function mergeTutorialGuides(primaryGuides, fallbackGuides, identityField) {
  const merged = [];
  const seen = new Set();
  [...primaryGuides, ...fallbackGuides].forEach((guide) => {
    const key = normalize(guide[identityField] || guide.title || guide.question || guide.id || "");
    if (!key || seen.has(key)) return;
    seen.add(key);
    merged.push(guide);
  });
  return merged;
}

function repairSessionTitles() {
  let changed = false;
  state.sessions = state.sessions.map((session) => {
    const title = getSessionTitle(session);
    if (session.title === title && !isBadHistoryTitle(session.title)) return session;
    changed = true;
    return { ...session, title };
  });
  if (changed) saveJson("ai-helper-sessions", state.sessions);
}

function bindEvents() {
  document.addEventListener("pointerdown", unlockBeeAudio, { passive: true });
  document.addEventListener(
    "pointerover",
    (event) => {
      const bee = event.target.closest?.(".bee-mascot");
      if (!bee || bee.contains(event.relatedTarget)) return;
      playBeeBuzz();
    },
    { passive: true }
  );

  nodes.promptStrip.addEventListener("click", (event) => {
    if (event.target.closest(".prompt-panel-close")) {
      closePromptPanel();
      return;
    }
    const button = event.target.closest("[data-question], [data-url]");
    if (!button) {
      const toggle = event.target.closest(".prompt-collapsed-icon");
      if (toggle && nodes.chatPanel.classList.contains("has-conversation")) {
        const isOpen = nodes.promptStrip.classList.toggle("prompt-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      }
      return;
    }
    if (button.dataset.url) {
      window.open(button.dataset.url, "_blank", "noopener");
      return;
    }
    const displayQuestion =
      state.language === "en" && button.dataset.questionEn
        ? button.dataset.questionEn
        : button.dataset.question;
    ask(displayQuestion, button.dataset.question);
  });

  document.addEventListener("click", (event) => {
    if (nodes.promptStrip.contains(event.target)) return;
    closePromptPanel();
  });

  nodes.messages.addEventListener("click", (event) => {
    const tutorialTab = event.target.closest("[data-tutorial-tab]");
    if (tutorialTab) {
      switchTutorialTab(tutorialTab);
      return;
    }

    const scrollButton = event.target.closest("[data-screenshot-scroll]");
    if (scrollButton) {
      scrollScreenshotGuide(scrollButton);
      return;
    }

    const stepButton = event.target.closest("[data-screenshot-step]");
    if (stepButton) {
      activateScreenshotStep(stepButton);
      return;
    }

    const actionButton = event.target.closest("[data-message-action]");
    if (actionButton) {
      handleMessageAction(actionButton);
      return;
    }

    const button = event.target.closest("[data-followup]");
    if (!button) return;
    ask(button.dataset.followup);
  });

  nodes.form.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = nodes.input.value.trim();
    if (!question) return;
    nodes.input.value = "";
    nodes.input.style.height = "auto";
    ask(question);
  });

  nodes.input.addEventListener("input", () => {
    nodes.input.style.height = "auto";
    nodes.input.style.height = `${Math.min(nodes.input.scrollHeight, 150)}px`;
  });

  nodes.input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    if (!nodes.input.value.trim()) return;
    nodes.form.requestSubmit();
  });

  document.querySelector("#newChat").addEventListener("click", () => {
    startSession(true);
    showToast(t("newChatStarted"));
  });

  nodes.languageToggle?.addEventListener("click", toggleLanguage);

  document.querySelector("#knowledgeButton").addEventListener("click", () => {
    const content =
      state.language === "en"
        ? "I can help with course setup, learning content, teaching activities, classroom interaction, exams, grading, and common uLearning issues.\n\nType a question or choose one of the suggested questions above."
        : "我可以回答这些操作：开课、教学内容、教学活动、课堂互动、考试题库、成绩评价、常见问题。\n\n你可以直接输入问题，也可以点击页面开头的推荐问题快速开始。";
    addMessage(
      "assistant",
      content,
      state.language === "en" ? "uLearning Teaching Assistant" : "uLearning教师操作助手"
    );
    persistCurrentSession();
  });

  nodes.feedbackDialogClose.addEventListener("click", closeFeedbackDialog);
  nodes.dialogCancel.addEventListener("click", closeFeedbackDialog);
  nodes.feedbackDialog.addEventListener("click", (event) => {
    if (event.target === nodes.feedbackDialog) closeFeedbackDialog();
  });
  nodes.dialogHandoff.addEventListener("click", () => {
    closeFeedbackDialog();
    startManualHandoff();
  });
  nodes.handoffDialogClose.addEventListener("click", closeHandoffDialog);
  nodes.handoffCancel.addEventListener("click", closeHandoffDialog);
  nodes.handoffDialog.addEventListener("click", (event) => {
    if (event.target === nodes.handoffDialog) closeHandoffDialog();
  });
  nodes.handoffSubmit.addEventListener("click", submitHandoffFeedback);
}

function showVideoGuideMenu() {
  const grouped = videoGuides.reduce((result, video) => {
    const group = video.src.split("/")[1] || "视频教程";
    result[group] = result[group] || [];
    result[group].push(video);
    return result;
  }, {});
  addMessage(
    "assistant",
    state.language === "en" ? "Which feature would you like to watch a video tutorial for?" : "请问你想看什么功能的视频教程？",
    state.language === "en" ? "uLearning Teaching Assistant" : "uLearning教师操作助手",
    null,
    grouped
  );
  persistCurrentSession("操作视频教程");
}

function unlockBeeAudio() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;
  if (!playBeeBuzz.context) playBeeBuzz.context = new AudioContextClass();
  if (playBeeBuzz.context.state === "suspended") playBeeBuzz.context.resume().catch(() => {});
}

function playBeeBuzz() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const now = Date.now();
  if (now - (playBeeBuzz.lastAt || 0) < 800) return;
  playBeeBuzz.lastAt = now;
  unlockBeeAudio();
  const context = playBeeBuzz.context;
  if (!context || context.state !== "running") return;

  const start = context.currentTime;
  const end = start + 0.48;
  const envelope = context.createGain();
  const filter = context.createBiquadFilter();
  const buzz = context.createOscillator();
  const hum = context.createOscillator();
  const humLevel = context.createGain();
  const flutter = context.createOscillator();
  const flutterDepth = context.createGain();

  buzz.type = "triangle";
  buzz.frequency.setValueAtTime(158, start);
  hum.type = "sine";
  hum.frequency.setValueAtTime(237, start);
  humLevel.gain.setValueAtTime(0.28, start);
  flutter.type = "sine";
  flutter.frequency.setValueAtTime(19, start);
  flutterDepth.gain.setValueAtTime(3.2, start);
  flutter.connect(flutterDepth);
  flutterDepth.connect(buzz.frequency);

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(480, start);
  filter.Q.setValueAtTime(0.45, start);
  envelope.gain.setValueAtTime(0.0001, start);
  envelope.gain.exponentialRampToValueAtTime(0.028, start + 0.07);
  envelope.gain.setValueAtTime(0.028, end - 0.11);
  envelope.gain.exponentialRampToValueAtTime(0.0001, end);
  buzz.connect(filter);
  hum.connect(humLevel);
  humLevel.connect(filter);
  filter.connect(envelope);
  envelope.connect(context.destination);

  buzz.start(start);
  hum.start(start);
  flutter.start(start);
  buzz.stop(end);
  hum.stop(end);
  flutter.stop(end);
}

function startSession(createRecord) {
  state.currentSessionId = `session-${Date.now()}`;
  state.messages = [];
  nodes.messages.innerHTML = "";
  setConversationMode(false);
  if (createRecord) persistCurrentSession();
}

async function ask(question, queryQuestion = question) {
  closePromptPanel();
  if (nodes.promptStrip.contains(document.activeElement)) document.activeElement.blur();
  setConversationMode(true);
  addMessage("user", question, t("teacher"));
  const thinkingMessage = addThinkingMessage();
  const guidedResponse = state.language === "en" ? null : findGuidedResponse(queryQuestion);
  const result = await getAssistantAnswer(queryQuestion);
  window.setTimeout(() => {
    removeMessage(thinkingMessage);
    const video = null;
    const rawAnswer =
      isOverviewQuestion(queryQuestion) && state.language !== "en"
        ? overviewAnswer
        : result.answer;
    const answer = addContextualLead(rawAnswer, result, queryQuestion);
    const next = guidedResponse
      ? {
          type: "guided",
          prompt: guidedResponse.prompt,
          actions: guidedResponse.actions || [],
          screenshots: (guidedResponse.screenshotIds || []).map(findScreenshotGuideById).filter(Boolean)
        }
      : getTextAnswerGuidance(result, queryQuestion);
    addMessage(
      "assistant",
      answer,
      state.language === "en" ? "uLearning Teaching Assistant" : "uLearning教师操作助手",
      video,
      null,
      null,
      next,
      result.resolvedQuestion || queryQuestion,
      (result.matches || []).map((item) => item.question).filter(Boolean),
      Boolean(result.matched && !["small_talk", "general_chat", "troubleshooting"].includes(result.intent))
    );
    persistCurrentSession(question);
  }, 160);
}

async function getAssistantAnswer(question) {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: question, language: state.language })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (data.answer) return data;
  } catch (error) {
    console.warn("Backend chat failed.", error);
  }
  return {
    answer:
      state.language === "en"
        ? "The local service is not responding. Please confirm that the backend is running and try again."
        : "后端服务暂时没有响应，请先确认本地服务已经启动后再试。",
    matched: false
  };
}

function renderHistory() {
  if (!state.sessions.length) {
    nodes.historyList.innerHTML = `<div class="empty-history">${escapeHtml(t("emptyHistory"))}</div>`;
    return;
  }
  nodes.historyList.innerHTML = state.sessions
    .slice(0, 12)
    .map((item) => {
      const title = getSessionTitle(item);
      return `<button class="history-item ${item.id === state.currentSessionId ? "active" : ""}" type="button" data-session="${escapeAttr(item.id)}"><span class="history-title">${escapeHtml(title)}</span></button>`;
    })
    .join("");
  nodes.historyList.querySelectorAll(".history-item").forEach((button) => {
    button.addEventListener("click", () => loadSession(button.dataset.session));
  });
}

function loadSession(sessionId) {
  const session = state.sessions.find((item) => item.id === sessionId);
  if (!session) return;
  state.currentSessionId = session.id;
  state.messages = session.messages || [];
  setConversationMode(state.messages.some((message) => message.role === "user"));
  nodes.messages.innerHTML = "";
  state.messages.forEach((message) => renderMessage(message));
  renderHistory();
  nodes.messages.scrollTop = nodes.messages.scrollHeight;
}

function persistCurrentSession(titleHint) {
  const usefulMessages = state.messages.filter((item) => item.role === "user");
  const existingSession = state.sessions.find((item) => item.id === state.currentSessionId);
  const existingTitle = isBadHistoryTitle(existingSession?.title) ? "" : existingSession?.title;
  const rawTitle = existingTitle || usefulMessages[0]?.content || titleHint || "新对话";
  const title = normalizeSessionTitle(rawTitle);
  const session = {
    id: state.currentSessionId,
    title,
    updatedAt: new Date().toISOString(),
    messages: state.messages
  };
  state.sessions = state.sessions.filter((item) => item.id !== state.currentSessionId);
  state.sessions.unshift(session);
  state.sessions = state.sessions.slice(0, 20);
  saveJson("ai-helper-sessions", state.sessions);
  renderHistory();
}

function setConversationMode(hasConversation) {
  if (!hasConversation) closePromptPanel();
  nodes.chatPanel.classList.toggle("is-empty", !hasConversation);
  nodes.chatPanel.classList.toggle("has-conversation", hasConversation);
}

function closePromptPanel() {
  nodes.promptStrip.classList.remove("prompt-open");
  const toggle = nodes.promptStrip.querySelector(".prompt-collapsed-icon");
  if (toggle) toggle.setAttribute("aria-expanded", "false");
}

function getSessionTitle(session) {
  const userQuestion = (session.messages || []).find((item) => item.role === "user" && !isBadHistoryTitle(item.content))?.content;
  const title = isBadHistoryTitle(session.title) ? "" : session.title;
  return normalizeSessionTitle(title || userQuestion || "历史对话");
}

function normalizeSessionTitle(value) {
  const text = String(value || "")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return "新对话";
  return text.length > 22 ? `${text.slice(0, 22)}...` : text;
}

function isBadHistoryTitle(value) {
  const text = String(value || "").trim();
  return (
    !text ||
    /^\d{1,2}\/\d{1,2}\s+\d{1,2}:\d{2}$/.test(text) ||
    /^\d{1,2}-\d{1,2}\s+\d{1,2}:\d{2}$/.test(text) ||
    /^\d{4}-\d{1,2}-\d{1,2}/.test(text) ||
    /^Invalid Date$/i.test(text)
  );
}

function addMessage(role, content, meta, video, videoMenu, screenshot, guidance, sourceQuestion, blockedQuestions = [], tutorialMode = false) {
  const normalizedContent =
    role === "assistant" && tutorialMode
      ? ensureTutorialTextAnswer(content, findScreenshotGuide(sourceQuestion))
      : content;
  const localizedContent =
    state.language === "en" && role === "assistant"
      ? String(normalizedContent || "").replace(/\n{2,}/g, "\n")
      : normalizedContent;
  const message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content: normalizeMessageDisplayText(localizedContent),
    meta,
    video,
    videoMenu,
    screenshot,
    guidance,
    sourceQuestion,
    blockedQuestions,
    tutorialMode,
    at: new Date().toISOString()
  };
  state.messages.push(message);
  renderMessage(message);
  return message;
}

function normalizeMessageDisplayText(content) {
  return String(content || "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function addThinkingMessage() {
  const message = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role: "assistant",
    content: t("thinking"),
    meta: state.language === "en" ? "uLearning Teaching Assistant" : "uLearning教师操作助手",
    pending: true,
    at: new Date().toISOString()
  };
  state.messages.push(message);
  renderMessage(message);
  return message;
}

function removeMessage(message) {
  if (!message?.id) return;
  state.messages = state.messages.filter((item) => item.id !== message.id);
  const existing = nodes.messages.querySelector(`[data-message-id="${CSS.escape(message.id)}"]`);
  existing?.remove();
}

function renderMessage(message) {
  const messageElement = renderMessageToContainer(message, nodes.messages);
  prepareScreenshotImages(messageElement);
  window.requestAnimationFrame(() => {
    if (message.role === "assistant" && !message.pending) {
      nodes.messages.scrollTo({ top: Math.max(0, messageElement.offsetTop - 10), behavior: "smooth" });
      return;
    }
    nodes.messages.scrollTo({ top: nodes.messages.scrollHeight, behavior: "smooth" });
  });
}

function refreshMessage(message) {
  const existing = Array.from(nodes.messages.querySelectorAll("[data-message-id]")).find((item) => item.dataset.messageId === message.id);
  if (!existing) return;
  const scrollTop = nodes.messages.scrollTop;
  const replacement = document.createElement("div");
  renderMessageToContainer(message, replacement);
  const replacementEl = replacement.firstElementChild;
  existing.replaceWith(replacementEl);
  prepareScreenshotImages(replacementEl);
  nodes.messages.scrollTop = scrollTop;
}

function renderMessageToContainer(message, container) {
  if (!message.id) message.id = `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const el = document.createElement("article");
  const label = message.role === "user" ? t("teacher") : t("assistant");
  const hasScreenshotGuide = Boolean(message.screenshot || message.guidance?.screenshots?.length);
  const classNames = ["message", message.role];
  if (message.role === "assistant") classNames.push("has-avatar");
  if (message.pending) classNames.push("is-thinking");
  if (hasScreenshotGuide) classNames.push("has-screenshot");
  if (message.guidance) classNames.push("has-guidance");
  el.className = classNames.join(" ");
  el.dataset.messageId = message.id;
  const displayContent = normalizeMessageDisplayText(message.content);
  const matchedScreenshotGuide =
    message.role === "assistant" && !message.pending
      ? findScreenshotGuide(message.sourceQuestion)
      : null;
  const matchedVideoGuide =
    message.role === "assistant" && !message.pending
      ? findVideoGuide(message.sourceQuestion)
      : null;
  const unifiedTutorial = Boolean(message.tutorialMode || matchedScreenshotGuide || matchedVideoGuide);
  const content =
    message.pending
      ? `<div class="thinking-indicator" role="status"><span class="thinking-spinner" aria-hidden="true"></span><span>${escapeHtml(t("thinking"))}</span></div>`
      : message.role === "assistant" && hasScreenshotGuide && !unifiedTutorial
      ? ""
      : message.role === "assistant"
        ? renderAssistantContent(displayContent, message)
        : escapeHtml(displayContent);
  const screenshot = message.screenshot ? renderScreenshotGuide(message.screenshot) : "";
  const guidedScreenshots = (message.guidance?.screenshots || []).map(renderScreenshotGuide).join("");
  const video = "";
  const videoMenu = message.videoMenu ? renderVideoMenu(message.videoMenu) : "";
  const guidance = message.guidance ? renderGuidance(message.guidance) : "";
  const tutorial = unifiedTutorial
    ? renderUnifiedTutorialTabs(displayContent, matchedScreenshotGuide, matchedVideoGuide)
    : "";
  const tools = renderMessageTools(message).trim();
  const body = `<div class="message-body"><div class="message-meta"><span>${escapeHtml(label)}</span><time>${formatTime(message.at)}</time></div>${tutorial || (content ? `<div class="message-content">${content}</div>` : "")}${unifiedTutorial ? "" : screenshot}${unifiedTutorial ? "" : guidedScreenshots}${videoMenu}${video}${guidance}${tools}</div>`;
  el.innerHTML = message.role === "assistant" ? `<div class="message-avatar">${beeMascotMarkup}</div>${body}` : body;
  container.appendChild(el);
  return el;
}

function renderMessageTools(message) {
  if (message.pending) return "";
  if (message.role === "user") {
    return `
      <div class="message-tools" aria-label="提问操作">
        <button type="button" data-message-action="edit" data-message-id="${escapeAttr(message.id)}" title="${escapeAttr(t("edit"))}">✎ ${escapeHtml(t("edit"))}</button>
        <button type="button" data-message-action="copy" data-message-id="${escapeAttr(message.id)}" title="${escapeAttr(t("copy"))}">⧉ ${escapeHtml(t("copy"))}</button>
      </div>
    `;
  }
  return `
    <div class="message-tools" aria-label="回答操作">
      <button type="button" data-message-action="copy" data-message-id="${escapeAttr(message.id)}" title="${escapeAttr(t("copy"))}">⧉ ${escapeHtml(t("copy"))}</button>
      <button type="button" data-message-action="regenerate" data-message-id="${escapeAttr(message.id)}" title="${escapeAttr(t("regenerate"))}">↻ ${escapeHtml(t("regenerate"))}</button>
      <button class="${message.feedbackState?.type === "like" ? "active" : ""}" type="button" data-message-action="like" data-message-id="${escapeAttr(message.id)}" title="${escapeAttr(t("helpful"))}">♡ ${escapeHtml(t("like"))}</button>
      <button class="${message.feedbackState?.type === "dislike" ? "active" : ""}" type="button" data-message-action="dislike" data-message-id="${escapeAttr(message.id)}" title="${escapeAttr(t("notHelpful"))}"><span class="tool-icon broken-heart" aria-hidden="true">♡</span> ${escapeHtml(t("dislike"))}</button>
    </div>
  `;
}

async function handleMessageAction(button) {
  const message = state.messages.find((item) => item.id === button.dataset.messageId);
  if (!message) return;
  const action = button.dataset.messageAction;
  if (action === "copy") {
    await copyText(message.content);
    showToast("已复制");
    return;
  }
  if (action === "edit") {
    nodes.input.value = message.content;
    nodes.input.focus();
    nodes.input.style.height = "auto";
    nodes.input.style.height = `${Math.min(nodes.input.scrollHeight, 150)}px`;
    showToast("已放回输入框，可重新编辑");
    return;
  }
  if (action === "regenerate") {
    const index = state.messages.findIndex((item) => item.id === message.id);
    const previousQuestion = [...state.messages.slice(0, index)].reverse().find((item) => item.role === "user")?.content;
    if (!previousQuestion) {
      showToast("没有找到可重新生成的问题");
      return;
    }
    ask(previousQuestion);
    return;
  }
  if (action === "like" || action === "dislike") {
    await toggleMessageFeedback(message, action);
  }
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
}

async function toggleMessageFeedback(message, type) {
  if (message.feedbackState?.type === type) {
    await removeMessageFeedback(message);
    message.feedbackState = null;
    refreshMessage(message);
    persistCurrentSession();
    showToast(type === "like" ? "已取消点赞" : "已取消点踩");
    return;
  }

  if (message.feedbackState?.type) {
    await removeMessageFeedback(message);
  }
  await recordMessageFeedback(message, type);
  refreshMessage(message);
  persistCurrentSession();
  showToast(type === "like" ? "已记录：有帮助" : "已记录：没帮助");
  if (type === "dislike") openFeedbackDialog();
}

async function recordMessageFeedback(message, type) {
  const index = state.messages.findIndex((item) => item.id === message.id);
  const question = [...state.messages.slice(0, index)].reverse().find((item) => item.role === "user")?.content || "";
  const feedbackId = `${message.id}-${type}-${Date.now()}`;
  const item = {
    type,
    feedbackId,
    user: "教师",
    time: formatFeedbackTime(new Date()),
    question
  };
  message.feedbackState = { type, feedbackId };
  state.feedback.unshift(item);
  saveJson("ai-helper-feedback", state.feedback.slice(0, 120));
  await submitFeedbackRecord(item);
}

async function removeMessageFeedback(message) {
  if (!message.feedbackState?.feedbackId) return;
  await submitFeedbackRecord({
    action: "delete",
    type: message.feedbackState.type,
    feedbackId: message.feedbackState.feedbackId
  });
}

async function submitFeedbackRecord(item) {
  try {
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    });
  } catch (error) {
    console.warn("Feedback save failed.", error);
  }
}

function openFeedbackDialog() {
  nodes.feedbackDialog.classList.add("show");
  nodes.feedbackDialog.setAttribute("aria-hidden", "false");
}

function closeFeedbackDialog() {
  nodes.feedbackDialog.classList.remove("show");
  nodes.feedbackDialog.setAttribute("aria-hidden", "true");
}

function startManualHandoff() {
  nodes.handoffInput.value = "";
  nodes.handoffDialog.classList.add("show");
  nodes.handoffDialog.setAttribute("aria-hidden", "false");
  window.setTimeout(() => nodes.handoffInput.focus(), 0);
}

function closeHandoffDialog() {
  nodes.handoffDialog.classList.remove("show");
  nodes.handoffDialog.setAttribute("aria-hidden", "true");
}

async function submitHandoffFeedback() {
  const question = nodes.handoffInput.value.trim();
  if (!question) {
    showToast("请先写下遇到的问题");
    nodes.handoffInput.focus();
    return;
  }
  await submitFeedbackRecord({
    type: "handoff",
    feedbackId: `handoff-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    user: "教师",
    time: formatFeedbackTime(new Date()),
    question
  });
  closeHandoffDialog();
  showToast("已收到反馈，感谢你的补充");
}

function renderAssistantContent(content, message) {
  const text = stripMarkdownMarks(content);
  const sortedLinks = getClickableLinks(message).sort((a, b) => b[0].length - a[0].length);
  const renderedQuestions = new Set();
  let html = "";
  let index = 0;

  while (index < text.length) {
    const matched = sortedLinks.find(([keyword]) => isClickablePhraseMatch(text, keyword, index));
    if (!matched) {
      html += escapeHtml(text[index]);
      index += 1;
      continue;
    }

    const [keyword, question] = matched;
    if (renderedQuestions.has(question)) {
      html += escapeHtml(keyword);
    } else {
      html += `<button class="feature-link" type="button" data-followup="${escapeAttr(question)}">${escapeHtml(keyword)}</button>`;
      renderedQuestions.add(question);
    }
    index += keyword.length;
  }

  return html;
}

function getClickableLinks(message) {
  const links = [...featureLinks];
  links.push(
    ["一、创建课程", "引导步骤一：创建课程"],
    ["二、设置教学团队", "引导步骤二：设置教学团队"],
    ["三、关联课件", "引导步骤三：关联课件"],
    ["四、开始上课", "引导步骤四：开始上课"]
  );
  const seen = new Set();
  const sourceText = normalize(message?.sourceQuestion || "");
  const shouldBlockSourceTerms = sourceText && !isOverviewQuestion(sourceText);
  const blockedQuestions = new Set((message?.blockedQuestions || []).map(normalize));
  return links.filter(([keyword, question]) => {
    if (!keyword || keyword.length < 2) return false;
    if (!isExplicitActionPhrase(keyword)) return false;
    if (shouldBlockSourceTerms && blockedQuestions.has(normalize(question))) return false;
    if (shouldBlockSourceTerms && (sourceText === normalize(question) || sourceText.includes(normalize(question)) || sourceText.includes(normalize(keyword)))) {
      return false;
    }
    const key = `${keyword}@@${question}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function isClickablePhraseMatch(text, keyword, index) {
  if (!text.startsWith(keyword, index)) return false;
  const before = index > 0 ? text[index - 1] : "";
  const after = text[index + keyword.length] || "";
  if (after === "：" || after === ":") return false;
  return !isWordLikeChar(before) && !isWordLikeChar(after);
}

function isOverviewQuestion(text) {
  return ["有哪些功能", "能做什么", "功能包括", "主要功能"].some((term) => text.includes(normalize(term)));
}

function isWordLikeChar(char) {
  return /[\p{Script=Han}A-Za-z0-9]/u.test(char);
}

function renderGuidance(guidance) {
  const actions = guidance.actions || [];
  if (!guidance.prompt && !actions.length) return "";
  return `
    <section class="guided-next">
      <p>${escapeHtml(getGuidanceTitle(guidance.prompt))}</p>
      ${
        actions.length
          ? `<div class="guided-actions">${actions
              .map(
                (action) =>
                  `<button class="guided-action" type="button" data-followup="${escapeAttr(action.question)}">${escapeHtml(action.label)}</button>`
              )
              .join("")}</div>`
          : ""
      }
    </section>
  `;
}

function getGuidanceTitle(prompt) {
  return String(prompt || "")
    .trim()
    .replace(/[。；;：:]+$/, "") + (state.language === "en" ? ":" : "：");
}

function renderVideoGuide(video) {
  if (!video?.src) {
    return `<div class="tutorial-empty" role="status">${escapeHtml(t("noVideoTutorial"))}</div>`;
  }
  return `
    <figure class="video-guide">
      <figcaption>${state.language === "en" ? escapeHtml(t("videoTutorial")) : `${escapeHtml(video.title)} ${escapeHtml(t("videoGuide"))}`}</figcaption>
      <video controls preload="metadata" src="${escapeAttr(encodeURI(video.src))}"></video>
    </figure>
  `;
}

function renderScreenshotGuide(guide) {
  const steps = guide.steps || [];
  if (!steps.length) {
    return `<div class="tutorial-empty" role="status">${escapeHtml(t("noImageTutorial"))}</div>`;
  }
  const brief = state.language === "en" ? t("visualGuide") : getGuideBrief(guide);
  const prerequisite = state.language === "en" ? null : getGuidePrerequisite(guide);
  const stepCount = Math.max(steps.length, 1);
  const stepColumnWidth = getScreenshotStepColumnWidth(stepCount);
  const minimumCarouselHeight = getScreenshotMinimumHeight(stepCount);
  return `
    <section class="screenshot-guide ${stepCount >= 6 ? "is-dense" : ""}" aria-label="${escapeAttr(state.language === "en" ? t("imageTutorial") : `${guide.title}截图教程`)}">
      <div class="guide-brief">
        <strong>${escapeHtml(brief)}</strong>
        ${
          prerequisite
            ? `<div class="guide-prerequisite-inline">
                <span>开始前：${escapeHtml(prerequisite.label)}。${escapeHtml(prerequisite.reason)}</span>
                <button class="guide-prerequisite-action" type="button" data-followup="${escapeAttr(prerequisite.question)}">去查看</button>
              </div>`
            : ""
        }
      </div>
      <div class="screenshot-carousel" style="--step-count: ${stepCount}; --step-column-width: ${stepColumnWidth}px; --screenshot-min-height: ${minimumCarouselHeight}px;">
        <div class="screenshot-steps">
          ${steps
            .map(
              (item, stepIndex) => `
                <button class="screenshot-step ${stepIndex === 0 ? "active" : ""}" type="button" data-screenshot-step="${stepIndex}">
                  <span class="screenshot-step-index">Step ${stepIndex + 1}</span>
                  <span>${escapeHtml(localizedScreenshotStep(item, stepIndex))}</span>
                </button>
              `
            )
            .join("")}
        </div>
        <div class="screenshot-stage">
          <button class="screenshot-nav screenshot-nav-prev" type="button" data-screenshot-scroll="-1" aria-label="上一张截图">‹</button>
          <div class="screenshot-rail" tabindex="0">
            ${steps
              .map(
                (step, index) => `
                  <article class="screenshot-card" data-step-index="${index}">
                    <div class="screenshot-image-wrap">
                      <img src="${escapeAttr(encodeURI(step.src))}" alt="${escapeAttr(state.language === "en" ? `Visual guide, step ${index + 1}` : `${guide.title} ${step.label}`)}" loading="lazy" data-trim-screenshot>
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
          <button class="screenshot-nav screenshot-nav-next" type="button" data-screenshot-scroll="1" aria-label="下一张截图">›</button>
        </div>
      </div>
    </section>
  `;
}

function getScreenshotStepColumnWidth(stepCount) {
  if (stepCount <= 2) return 280;
  if (stepCount === 3) return 250;
  if (stepCount === 4) return 220;
  return stepCount >= 6 ? 230 : 200;
}

function getScreenshotMinimumHeight(stepCount) {
  if (stepCount >= 8) return 370;
  if (stepCount >= 6) return 320;
  return 0;
}

function prepareScreenshotImages(root = document) {
  root?.querySelectorAll?.("img[data-trim-screenshot]:not([data-trim-ready])").forEach((img) => {
    img.dataset.trimReady = "1";
    // Imported tutorials are normalized onto equal white canvases. Measure the
    // first active image once, then keep that height for every subsequent step.
    if (img.complete) {
      syncScreenshotCarouselHeight(img);
    } else {
      img.addEventListener("load", () => syncScreenshotCarouselHeight(img), { once: true });
    }
  });
}

function trimScreenshotImage(img) {
  if (!img.naturalWidth || !img.naturalHeight || img.dataset.trimmed) return;
  img.dataset.trimmed = "1";

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  ctx.drawImage(img, 0, 0);

  let data;
  try {
    data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  } catch (error) {
    return;
  }

  const top = findScreenshotTrimEdge(data, canvas.width, canvas.height, 1);
  const bottom = findScreenshotTrimEdge(data, canvas.width, canvas.height, -1);
  const padding = Math.max(4, Math.round(canvas.height * 0.008));
  const cropTop = Math.max(0, top - padding);
  const cropBottom = Math.min(canvas.height - 1, bottom + padding);
  const cropHeight = cropBottom - cropTop + 1;

  if (cropTop < 10 && canvas.height - cropBottom < 10) return;
  if (cropHeight < canvas.height * 0.45) return;

  const cropped = document.createElement("canvas");
  cropped.width = canvas.width;
  cropped.height = cropHeight;
  const croppedCtx = cropped.getContext("2d");
  if (!croppedCtx) return;

  croppedCtx.drawImage(canvas, 0, cropTop, canvas.width, cropHeight, 0, 0, canvas.width, cropHeight);
  img.addEventListener("load", () => syncScreenshotCarouselHeight(img), { once: true });
  img.src = cropped.toDataURL("image/png");
}

function observeScreenshotImageSize(img) {
  if (img.dataset.resizeObserved || typeof ResizeObserver === "undefined") return;
  img.dataset.resizeObserved = "1";
  const observer = new ResizeObserver(() => syncScreenshotCarouselHeight(img));
  observer.observe(img);
}

function syncScreenshotCarouselHeight(img, force = false) {
  const carousel = img.closest(".screenshot-carousel");
  const guide = img.closest(".screenshot-guide");
  const card = img.closest(".screenshot-card");
  const activeStep = guide?.querySelector(".screenshot-step.active");
  if (!force && card && activeStep && Number(card.dataset.stepIndex) !== Number(activeStep.dataset.screenshotStep)) return;
  const height = Math.round(img.getBoundingClientRect().height);
  if (!carousel || height <= 0) return;
  carousel.style.setProperty("--screenshot-image-height", `${height}px`);
}

function findScreenshotTrimEdge(data, width, height, direction) {
  const start = direction > 0 ? 0 : height - 1;
  const end = direction > 0 ? height : -1;
  const requiredInk = Math.max(8, Math.floor(width * 0.006));

  for (let y = start; y !== end; y += direction) {
    let ink = 0;
    for (let x = 0; x < width; x += 2) {
      const offset = (y * width + x) * 4;
      const r = data[offset];
      const g = data[offset + 1];
      const b = data[offset + 2];
      const a = data[offset + 3];
      if (a > 20 && (r < 244 || g < 244 || b < 244)) {
        ink += 2;
        if (ink >= requiredInk) return y;
      }
    }
  }

  return direction > 0 ? 0 : height - 1;
}

function scrollScreenshotGuide(button) {
  const guide = button.closest(".screenshot-guide");
  const rail = guide?.querySelector(".screenshot-rail");
  const card = rail?.querySelector(".screenshot-card");
  if (!rail || !card) return;
  const direction = Number(button.dataset.screenshotScroll) || 1;
  const currentIndex = Math.round(rail.scrollLeft / card.getBoundingClientRect().width);
  const maxIndex = rail.querySelectorAll(".screenshot-card").length - 1;
  const nextIndex = Math.max(0, Math.min(maxIndex, currentIndex + direction));
  scrollScreenshotRailTo(rail, nextIndex);
}

function activateScreenshotStep(button) {
  const guide = button.closest(".screenshot-guide");
  const rail = guide?.querySelector(".screenshot-rail");
  if (!rail) return;
  scrollScreenshotRailTo(rail, Number(button.dataset.screenshotStep) || 0);
}

function scrollScreenshotRailTo(rail, index) {
  const card = rail.querySelector(".screenshot-card");
  if (!card) return;
  rail.scrollTo({ left: index * card.getBoundingClientRect().width, behavior: "smooth" });
  const guide = rail.closest(".screenshot-guide");
  setActiveScreenshotStep(guide, index);
}

function scheduleActiveScreenshotHeightSync(guide, index) {
  const img = guide?.querySelector(`.screenshot-card[data-step-index="${index}"] img`);
  if (!img) return;
  const sync = () => syncScreenshotCarouselHeight(img, true);
  if (!img.complete) img.addEventListener("load", sync, { once: true });
  window.requestAnimationFrame(() => {
    sync();
    window.requestAnimationFrame(sync);
  });
  window.setTimeout(sync, 360);
}

function setActiveScreenshotStep(guide, index) {
  if (!guide) return;
  guide.querySelectorAll(".screenshot-step").forEach((step, stepIndex) => {
    step.classList.toggle("active", stepIndex === index);
  });
}

function shortenStepText(text) {
  return cleanSentence(text).replace(/^登录 uLearning 教师端。?/, "登录教师端");
}

function getGuideBrief(guide) {
  const title = String(guide.title || "这个功能").replace(/截图教程$/, "");
  if (title.includes("创建课程")) return "创建课程：帮助老师先搭好课程空间，后续班级、课件、作业和考试都会在这里开展。";
  if (title.includes("班级")) return "班级：帮助老师按教学班管理学生，方便发布活动、统计学习情况和查看成绩。";
  if (title.includes("学生")) return "学生管理：帮助老师把学生加入正确班级，后续作业、测验和课堂互动才能准确发放。";
  if (title.includes("教师") || title.includes("教学团队")) return "教学团队：帮助课程管理员分配任课教师、助教和负责班级，让协同教学更清晰。";
  if (title.includes("课件")) return "课件：帮助老师组织章节内容和学习资源，学生可以按课程安排进行学习。";
  if (title.includes("上课") || title.includes("课堂")) return "课堂：帮助老师把课件和互动带到授课现场，方便边讲解边组织学习活动。";
  if (title.includes("AI")) return "AI 助手：帮助老师快速生成、整理或分析教学内容，减少重复准备时间。";
  return `${title}：帮助老师更快完成对应教学操作，让课程管理流程更清楚。`;
}

function getGuidePrerequisite(guide) {
  const title = String(guide.title || "");
  if (title.includes("添加学生") || title.includes("邀请学生") || title.includes("学生扫码") || title.includes("老师添加学生")) {
    return {
      label: "创建班级",
      reason: "还没有班级时，学生无法加入到正确的教学对象中。",
      question: "设置教学团队：创建班级"
    };
  }
  if (title.includes("指定教师")) {
    return {
      label: "添加老师到教学团队",
      reason: "需要先把老师加入教学团队，后续才能给老师指定负责班级。",
      question: "如何设置教学团队？"
    };
  }
  if (title.includes("关联课件")) {
    return {
      label: "创建或准备课件",
      reason: "没有可用课件时，无法把教学内容关联到班课。",
      question: "如何创建课件？"
    };
  }
  if (title.includes("开始上课") || title.includes("进入课堂")) {
    return {
      label: "关联课件",
      reason: "课堂中需要调用已准备好的教学内容，未关联课件会影响上课流程。",
      question: "引导步骤三：关联课件"
    };
  }
  return null;
}

function renderVideoMenu(groups) {
  return `
    <section class="video-menu" aria-label="视频教程列表">
      ${Object.entries(groups)
        .map(([group, videos]) => {
          const buttons = videos
            .map(
              (video) =>
                `<button class="video-menu-button" type="button" data-followup="${escapeAttr(video.question)}">${escapeHtml(video.title)}</button>`
            )
            .join("");
          return `<div class="video-menu-group"><h3>${escapeHtml(group)}</h3><div class="video-menu-buttons">${buttons}</div></div>`;
        })
        .join("")}
    </section>
  `;
}

function findVideoGuide(question) {
  return findBestTutorialGuide(question, videoGuides);
}

function findScreenshotGuide(question) {
  if (isCreateCoursewareTutorialQuestion(question)) {
    const dynamicCoursewareGuide = findScreenshotGuideById("screenshot-如何新建课件");
    if (dynamicCoursewareGuide) return dynamicCoursewareGuide;
  }
  return findBestTutorialGuide(question, screenshotGuides);
}

function findBestTutorialGuide(question, guides) {
  const ranked = guides
    .map((guide) => ({ guide, score: tutorialGuideScore(question, guide) }))
    .filter((item) => item.score >= 70)
    .sort((left, right) => right.score - left.score);
  return ranked[0]?.guide || null;
}

function tutorialGuideScore(question, guide) {
  const text = normalize(question);
  const coreText = canonicalTutorialIntent(text);
  const terms = [guide.title, guide.question, guide.path, ...(guide.aliases || [])].filter(Boolean);
  let best = 0;
  terms.forEach((term) => {
    const normalizedTerm = normalize(term);
    const coreTerm = canonicalTutorialIntent(normalizedTerm);
    if (text === normalizedTerm) {
      best = Math.max(best, 240);
      return;
    }
    if (coreText.length >= 3 && coreText === coreTerm) {
      best = Math.max(best, 200);
      return;
    }
    if (
      coreText.length >= 4 &&
      coreTerm.length >= 4 &&
      (coreText.includes(coreTerm) || coreTerm.includes(coreText))
    ) {
      const coverage = Math.min(coreText.length, coreTerm.length) / Math.max(coreText.length, coreTerm.length);
      best = Math.max(best, 35 + Math.round(coverage * 45));
    }
  });
  return best;
}

function canonicalTutorialIntent(value) {
  return normalize(value)
    .replace(/^(麻烦|请问|请教|请)/, "")
    .replace(/^(如何|怎么|怎样|咋)/, "")
    .replace(/^(快速|立即|直接|马上|迅速|便捷)+/, "")
    .replace(/^(新建|新增)/, "创建")
    .replace(/^(创建|新建|新增|添加|做|建)(一个|一门|一项|一份|一名|个)/, "$1")
    .replace(/[？?。.]$/, "");
}

function isCreateCoursewareTutorialQuestion(question) {
  const text = normalize(question || "");
  return ["如何创建课件", "怎么创建课件", "怎样创建课件", "如何新建课件", "怎么新建课件"].some((term) =>
    text.includes(normalize(term))
  );
}

function ensureTutorialTextAnswer(answer, guide) {
  const text = normalizeMessageDisplayText(answer);
  if (state.language === "en") return text;
  const numberedSteps = text.match(/(?:^|\n)\s*\d+[、.．)]\s*\S+/g) || [];
  if (numberedSteps.length >= 2) return text;

  const screenshotSteps = (guide?.steps || [])
    .map((step) => String(step?.text || "").trim())
    .filter(Boolean);
  if (!screenshotSteps.length) return text;

  const title = String(guide?.title || guide?.question || "当前功能").replace(/\s+-\s+/g, " > ");
  const lines = [
    `入口位置：打开与【${title}】对应的功能页面。`,
    "",
    "操作步骤：",
    ...screenshotSteps.map((step, index) => `${index + 1}、${cleanSentence(step)}。`),
    "",
    "完成后看：页面进入最后一张截图所示状态，或列表中出现刚完成的操作结果。",
    "",
    "注意：提交、发布或保存前，请核对当前课程、班级和操作对象。"
  ];
  return normalizeMessageDisplayText(lines.join("\n"));
}

function renderUnifiedTutorialTabs(answer, guide, video) {
  return `
    <section class="answer-tutorial" data-answer-tutorial>
      <div class="tutorial-tabs" role="tablist" aria-label="${escapeAttr(state.language === "en" ? "Choose a guide format" : "选择教程形式")}">
        <button class="tutorial-tab active" type="button" role="tab" aria-selected="true" data-tutorial-tab="text">${escapeHtml(t("textAnswer"))}</button>
        <button class="tutorial-tab" type="button" role="tab" aria-selected="false" data-tutorial-tab="image">${escapeHtml(t("imageTutorial"))}</button>
        <button class="tutorial-tab" type="button" role="tab" aria-selected="false" data-tutorial-tab="video">${escapeHtml(t("videoTutorial"))}</button>
      </div>
      <div class="tutorial-panel active" role="tabpanel" data-tutorial-panel="text">
        <div class="message-content">${renderAssistantContent(answer)}</div>
      </div>
      <div class="tutorial-panel" role="tabpanel" data-tutorial-panel="image" hidden>
        ${guide ? renderScreenshotGuide(guide) : `<div class="tutorial-empty" role="status">${escapeHtml(t("noImageTutorial"))}</div>`}
      </div>
      <div class="tutorial-panel" role="tabpanel" data-tutorial-panel="video" hidden>
        ${renderVideoGuide(video)}
      </div>
    </section>
  `;
}

function localizedScreenshotStep(step, index) {
  if (state.language !== "en") return shortenStepText(step.text);
  const englishStep = String(step.textEn || "")
    .trim()
    .replace(/[。；;]+$/, "")
    .replace(/\.+$/, "");
  return englishStep ? `${englishStep}.` : "";
}

function switchTutorialTab(button) {
  const tutorial = button.closest("[data-answer-tutorial]");
  if (!tutorial) return;
  const target = button.dataset.tutorialTab;
  tutorial.querySelectorAll("[data-tutorial-tab]").forEach((tab) => {
    const active = tab.dataset.tutorialTab === target;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  tutorial.querySelectorAll("[data-tutorial-panel]").forEach((panel) => {
    const active = panel.dataset.tutorialPanel === target;
    panel.classList.toggle("active", active);
    panel.hidden = !active;
  });
  if (target === "image") prepareScreenshotImages(tutorial);
}

function isExplicitActionPhrase(keyword) {
  return /^(创建|新建|设置|邀请|添加|发布|关联|查看|布置|批量导入|导入|引用|手动组卷|自动组卷|组卷|安排|批阅|阅卷|开始|打开|发起|结束|导出|修改|删除|联系|填充)/.test(keyword);
}

function getScreenshotMatchTokens(value) {
  const actionWords = /^(如何|怎么|怎样|咋|添加|布置|发布|新建|创建|查看|设置|删除|编辑|导入|打开|使用|开始|进入|关联)+/;
  return String(value || "")
    .split(/[\s\-_/\\>：:，,。！？!?、；;（）()【】[\]“”"']+/)
    .map((item) => normalize(item).replace(actionWords, ""))
    .filter((item) => item.length >= 4 && !["教学活动", "教学资源", "单元内资源"].includes(item));
}

function findScreenshotGuideById(id) {
  return screenshotGuides.find((guide) => guide.id === id || guide.title === id);
}

function findGuidedResponse(question) {
  const text = normalize(question);
  return guidedResponses.find((item) => item.triggers.some((trigger) => text.includes(normalize(trigger))));
}

function getRelatedGuidance(result, question) {
  const related = (result.relatedQuestions || []).slice(0, 3);
  if (related.length) {
    return {
      prompt: "结合你刚才的问题，还可以继续了解：",
      actions: related
    };
  }

  const text = normalize(question);
  if (text.includes("创建课程")) {
    return {
      prompt: "课程创建完成后，要继续设置教学团队吗？",
      actions: [{ label: "设置教学团队", question: "引导步骤二：设置教学团队" }]
    };
  }
  if (["教学团队", "创建班级", "添加学生", "邀请学生", "指定教师"].some((term) => text.includes(normalize(term)))) {
    return {
      prompt: "人员和班级准备好后，要继续关联课件吗？",
      actions: [{ label: "关联课件", question: "引导步骤三：关联课件" }]
    };
  }
  if (["课件", "添加资源", "上传资源"].some((term) => text.includes(normalize(term)))) {
    return {
      prompt: "教学内容准备好后，要继续开始上课吗？",
      actions: [{ label: "开始上课", question: "引导步骤四：开始上课" }]
    };
  }
  return null;
}

function getContextualGuidance(result, question, screenshot) {
  if (screenshot) {
    return getScreenshotGuidance(screenshot, result, question);
  }

  return getTextAnswerGuidance(result, question);
}

function getTextAnswerGuidance(result, question) {
  const related = getDirectRelatedActions(result.relatedQuestions || [], question);
  if (related.length) {
    return {
      type: "related",
      prompt: state.language === "en" ? "You may also want to explore:" : "下面是我给您推荐的几个相关的功能教程：",
      actions: related
    };
  }

  if (state.language === "en") {
    const englishFallback = getEnglishGeneralGuidanceActions(question);
    return englishFallback.length
      ? {
          type: "general-guides",
          prompt: "You may also want to explore:",
          actions: englishFallback
        }
      : null;
  }

  const matchedGuides = getQuestionMatchedGuideActions(question);
  if (matchedGuides.length) {
    return {
      type: "matched-guides",
      prompt: "下面是我给您推荐的几个相关的功能教程：",
      actions: matchedGuides
    };
  }

  const fallback = getGeneralGuidanceActions(question);
  if (fallback.length) {
    return {
      type: "general-guides",
      prompt: "下面是我给您推荐的几个相关的功能教程：",
      actions: fallback
    };
  }

  return null;
}

function getEnglishGeneralGuidanceActions(sourceQuestion) {
  const actions = [
    { label: "Create a course", question: "How do I create a course?" },
    { label: "Set up a teaching team", question: "How do I set up a teaching team?" },
    { label: "Create courseware", question: "How do I create courseware?" },
    { label: "Assign homework", question: "How do I assign individual homework?" },
    { label: "Start a class", question: "How do I start a class?" }
  ];
  return actions
    .filter((item) => normalize(item.question) !== normalize(sourceQuestion))
    .slice(0, 4);
}

function getScreenshotGuidance(screenshot, result, question) {
  const actions = getSiblingScreenshotActions(screenshot, question);
  if (actions.length) {
    return {
      type: "screenshot-related",
      prompt: "下面是我给您推荐的几个相关的功能教程：",
      actions
    };
  }

  const related = getSpecificRelatedActions(result.relatedQuestions || [], question);
  if (related.length) {
    return {
      type: "related",
      prompt: "下面是我给您推荐的几个相关的功能教程：",
      actions: related
    };
  }

  const fallback = getFallbackScreenshotActions(screenshot);
  if (fallback.length) {
    return {
      type: "screenshot-fallback",
      prompt: "下面是我给您推荐的几个相关的功能教程：",
      actions: fallback
    };
  }

  return null;
}

function getSiblingScreenshotActions(currentGuide, question) {
  const currentPath = String(currentGuide.path || currentGuide.title || "");
  const parentPath = currentPath.split(">").slice(0, -1).join(">").trim();
  if (!parentPath) return [];

  return screenshotGuides
    .filter((guide) => guide !== currentGuide)
    .filter((guide) => String(guide.path || guide.title || "").startsWith(parentPath))
    .filter((guide) => !normalize(question).includes(normalize(guide.question || guide.title || "")))
    .slice(0, 3)
    .map((guide) => ({
      label: compactGuideLabel(guide),
      question: guide.question || guide.title
    }));
}

function getFallbackScreenshotActions(currentGuide) {
  return screenshotGuides
    .filter((guide) => guide !== currentGuide)
    .slice(0, 4)
    .map((guide) => ({
      label: compactGuideLabel(guide),
      question: guide.question || guide.title
    }));
}

function getDirectRelatedActions(questions, sourceQuestion) {
  return uniqueGuidanceActions(
    questions
      .filter((item) => item?.question)
      .filter((item) => normalize(item.question) !== normalize(sourceQuestion))
      .map((item) => ({
        label: item.label || item.question,
        question: item.question
      }))
  ).slice(0, 4);
}

function getQuestionMatchedGuideActions(question) {
  const questionTokens = getScreenshotMatchTokens(question);
  if (!questionTokens.length) return [];

  return uniqueGuidanceActions(
    screenshotGuides
      .filter((guide) => {
        const guideTokens = getScreenshotMatchTokens([guide.title, guide.question, guide.path, ...(guide.aliases || [])].join(" "));
        return questionTokens.some((token) => guideTokens.includes(token));
      })
      .map((guide) => ({
        label: compactGuideLabel(guide),
        question: guide.question || guide.title
      }))
  ).slice(0, 4);
}

function getGeneralGuidanceActions(sourceQuestion) {
  const baseActions = [
    { label: "如何快速创建一门课程？", question: "如何快速创建一门课程？" },
    { label: "如何设置教学团队？", question: "如何设置教学团队？" },
    { label: "如何布置作业？", question: "如何布置作业？" },
    { label: "如何开始上课？", question: "如何开始上课？" }
  ];
  return uniqueGuidanceActions(baseActions).filter((item) => normalize(item.question) !== normalize(sourceQuestion)).slice(0, 4);
}

function uniqueGuidanceActions(actions) {
  const seen = new Set();
  return actions.filter((action) => {
    const key = normalize(action.question || action.label || "");
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getSpecificRelatedActions(questions, sourceQuestion) {
  const sourceTokens = getScreenshotMatchTokens(sourceQuestion);
  return questions
    .filter((item) => item?.question)
    .filter((item) => {
      const text = normalize(item.question);
      if (text === normalize(sourceQuestion)) return false;
      const tokens = getScreenshotMatchTokens(item.question);
      return !sourceTokens.length || sourceTokens.some((token) => tokens.includes(token));
    })
    .slice(0, 3);
}

function compactGuideLabel(guide) {
  const title = String(guide.title || guide.question || "");
  return title.split(/\s+-\s+|>/).pop().trim() || title;
}

function addContextualLead(answer, result, question) {
  const text = String(answer || "").trim();
  if (!text) return text;

  const normalizedQuestion = normalize(question);
  let lead = "";

  if (["报错", "失败", "看不到", "找不到", "没有按钮", "权限"].some((term) => normalizedQuestion.includes(normalize(term)))) {
    lead =
      state.language === "en"
        ? "Let’s identify which step is causing the issue."
        : "先别着急，我们先定位问题出现在哪一步。";
  }

  return lead ? `${lead}\n\n${text}` : text;
}

function findBestMatch(question) {
  const text = normalize(question);
  let best = null;
  for (const item of faqItems) {
    const terms = [item.title, item.summary, ...item.keywords].map(normalize);
    let score = 0;
    for (const term of terms) {
      if (text.includes(term)) score += term.length > 2 ? 5 : 2;
      for (const part of splitTerm(term)) {
        if (part && text.includes(part)) score += 1;
      }
    }
    if (!best || score > best.score) best = { item, score };
  }
  if (best && best.score >= 2) return best;
  const catalogMatch = faqCatalog.find((item) => normalize(item.question) === text || text.includes(normalize(item.question)));
  if (!catalogMatch) return null;
  const sourceItem = faqItems.find((item) => item.title === catalogMatch.source);
  return sourceItem ? { item: sourceItem, score: 5 } : null;
}

function formatAnswer(item, score) {
  const data = item.answer;
  const steps = [];
  steps.push("1. 登录 uLearning 教师端。");
  steps.push(`2. ${cleanSentence(data.entry)}`);
  data.steps.forEach((step) => steps.push(`${steps.length + 1}. ${cleanSentence(step)}`));
  steps.push(`${steps.length + 1}. ${cleanSentence(data.check)}`);
  return steps.join("\n");
}

function fallbackAnswer(question) {
  return [
    "我需要再确认一下你看到的页面，才能给你准确步骤。",
    "请告诉我：",
    "1. 你现在用的是电脑网页端还是手机 App？",
    "2. 当前页面标题是什么？",
    "3. 你想完成的具体操作是什么？",
    "",
    `你的问题：${question}`
  ].join("\n");
}

function buildHandoffMessage(lastQuestion) {
  return [
    "这个问题建议联系人工处理。",
    `问题：${lastQuestion}`,
    "请同时提供：课程名称、当前页面、报错文字或遇到的问题现象。"
  ].join("\n");
}

function readJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function cleanSentence(value) {
  return String(value)
    .replace(/^先/, "")
    .replace(/。$/, "")
    .replace(/；$/, "")
    .trim() + "。";
}

function normalize(value) {
  return String(value).toLowerCase().replace(/\s+/g, "");
}

function splitTerm(term) {
  return term.split(/[，,、\/\s]+/).filter(Boolean);
}

function formatTime(value) {
  return new Date(value).toLocaleString(state.language === "en" ? "en-US" : "zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

function formatFeedbackTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  const pad = (number) => String(number).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function showToast(message) {
  nodes.toast.textContent = message;
  nodes.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => nodes.toast.classList.remove("show"), 2200);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return map[char];
  });
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function stripMarkdownMarks(value) {
  return String(value)
    .replace(/\*\*/g, "")
    .replace(/__/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .trim();
}
