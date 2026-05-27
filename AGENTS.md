# AGENTS.md

## Commit Style

- When creating or suggesting Git commits, use Conventional Commits by default.

## Product Scope

- This project is a student-facing demo for an inorganic chemistry "元素性质实验" learning flow.
- The app is not only about halogens. Halogens are the current demo/recommended learning path.
- The broader "元素性质实验" scope should be organized as a three-level learning structure:
  - Level 1: element zones, using s 区、p 区、d 区、ds 区 as the primary directories.
  - Level 2: experiment learning modules under each zone:
    - s 区
      - 碱金属和碱土金属
    - p 区
      - 卤素
      - 氢、氧、过氧化氢
      - 硫及其化合物
      - 氮和磷
      - 碳、硅、硼
      - 锡、铅、砷、锑、铋
    - d 区
      - d 区元素化合物的性质
    - ds 区
      - ds 区元素化合物的性质
  - Level 3: knowledge components (KC) inside a selected module. In the current demo, 卤素 is the selected module and uses the PPT-derived KC list.
- The app should not flatten all Level 2 modules as the primary navigation if a zone-level directory is being shown. The "元素区" page should show Level 1 zones first, then Level 2 modules inside the selected zone.

## Demo Logic

- The current demo should show this first-layer learning logic:
  - Students take a pre-class test.
  - The test covers the Level 2 experiment learning modules above, using question types such as fill-in-the-blank, true/false, and multiple choice.
  - The system estimates the student's baseline mastery across those modules.
  - In the demo scenario, the student performs poorly on 卤素 while other sections are relatively good.
  - The app therefore recommends learning p 区 -> 卤素 as the next path.
- Avoid implying that the whole app only studies halogens. Use wording such as "推荐学习：卤素" in the result summary and show the full p 区 -> 卤素 hierarchy on the element-zone page.
- The result analysis page should follow the same hierarchy as the element-zone page:
  - Lead with the weak path: p 区 -> 卤素.
  - Show Level 1 zone mastery for s 区、p 区、d 区、ds 区.
  - Then show Level 2 chapter/module mastery grouped under each zone, so students can scroll from zone-level diagnosis into chapter-level diagnosis.
  - Mark p 区 -> 卤素 as the recommended learning module.

## RAG / KC Framing

- After the app recommends 卤素, the halogen chapter can be broken into RAG knowledge components based on the PPT section points.
- The halogen KC examples include:
  - 13.1 卤族元素通性
  - 13.2 卤素单质
  - 13.3 卤化氢
  - 13.4 卤化物、卤素互化物和多卤化物
  - 13.5 卤素氧化物、含氧酸及其盐
  - 13.6 拟卤素
- These KC labels are useful for RAG retrieval, AI answers, content organization, and follow-up exercises.
- The pre-class result page should primarily diagnose broad experiment sections. The halogen KC breakdown should appear after the student enters the halogen learning path.

## UI Copy Direction

- Keep the student UI concise and task-oriented.
- Do not put demo/meta text in the app UI, such as "DEMO", "mock", "甲方 PPT", "无后端", or implementation explanations.
- Explanation of demo intent belongs in presenter narration, not in the student-facing interface.
