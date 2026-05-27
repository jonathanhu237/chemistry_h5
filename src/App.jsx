import { useEffect, useMemo, useState } from "react";

const logoSrc = `${import.meta.env.BASE_URL}sysu-logo.svg`;

const halogenKcs = [
  "13.1 卤族元素通性",
  "13.2 卤素单质",
  "13.3 卤化氢",
  "13.4 卤化物/互化物/多卤化物",
  "13.5 氧化物/含氧酸盐",
  "13.6 拟卤素",
];

const elementZones = [
  {
    id: "s",
    title: "s 区",
    subtitle: "活泼金属性质",
    color: "orange",
    modules: [
      { id: "alkali", title: "碱金属和碱土金属", scope: "典型 s 区元素", percent: 82, level: "良好", color: "purple" },
    ],
  },
  {
    id: "p",
    title: "p 区",
    subtitle: "非金属与 p 区元素专题",
    color: "teal",
    modules: [
      { id: "halogen", title: "卤素", scope: "F / Cl / Br / I", percent: 42, level: "薄弱", color: "teal", recommended: true },
      { id: "hydrogen-oxygen", title: "氢、氧、过氧化氢", scope: "H2 / O2 / H2O2", percent: 80, level: "良好", color: "blue" },
      { id: "sulfur", title: "硫及其化合物", scope: "硫单质 / 含硫化合物", percent: 76, level: "良好", color: "orange" },
      { id: "nitrogen-phosphorus", title: "氮和磷", scope: "氮族元素性质", percent: 78, level: "良好", color: "green" },
      { id: "carbon", title: "碳、硅、硼", scope: "碳族与硼相关性质", percent: 74, level: "良好", color: "coral" },
      { id: "tin-lead", title: "锡、铅、砷、锑、铋", scope: "p 区重元素", percent: 77, level: "良好", color: "blue" },
    ],
  },
  {
    id: "d",
    title: "d 区",
    subtitle: "过渡元素化合物",
    color: "blue",
    modules: [
      { id: "d-compounds", title: "d 区元素化合物的性质", scope: "过渡元素化合物", percent: 80, level: "良好", color: "purple" },
    ],
  },
  {
    id: "ds",
    title: "ds 区",
    subtitle: "铜锌等元素化合物",
    color: "coral",
    modules: [
      { id: "ds-compounds", title: "ds 区元素化合物的性质", scope: "铜、锌等化合物", percent: 84, level: "良好", color: "green" },
    ],
  },
];

const zoneResults = [
  { id: "s", title: "s 区", percent: 82, level: "良好", color: "orange", note: "碱金属和碱土金属" },
  { id: "p", title: "p 区", percent: 66, level: "存在薄弱", color: "teal", note: "卤素模块拉低整体表现", weak: true },
  { id: "d", title: "d 区", percent: 80, level: "良好", color: "blue", note: "d 区元素化合物" },
  { id: "ds", title: "ds 区", percent: 84, level: "良好", color: "coral", note: "ds 区元素化合物" },
];

const periodicElements = [
  [1, "H", 1, 1, "p"],
  [2, "He", 18, 1, "p"],
  [3, "Li", 1, 2, "s"],
  [4, "Be", 2, 2, "s"],
  [5, "B", 13, 2, "p"],
  [6, "C", 14, 2, "p"],
  [7, "N", 15, 2, "p"],
  [8, "O", 16, 2, "p"],
  [9, "F", 17, 2, "p"],
  [10, "Ne", 18, 2, "p"],
  [11, "Na", 1, 3, "s"],
  [12, "Mg", 2, 3, "s"],
  [13, "Al", 13, 3, "p"],
  [14, "Si", 14, 3, "p"],
  [15, "P", 15, 3, "p"],
  [16, "S", 16, 3, "p"],
  [17, "Cl", 17, 3, "p"],
  [18, "Ar", 18, 3, "p"],
  [19, "K", 1, 4, "s"],
  [20, "Ca", 2, 4, "s"],
  [21, "Sc", 3, 4, "d"],
  [22, "Ti", 4, 4, "d"],
  [23, "V", 5, 4, "d"],
  [24, "Cr", 6, 4, "d"],
  [25, "Mn", 7, 4, "d"],
  [26, "Fe", 8, 4, "d"],
  [27, "Co", 9, 4, "d"],
  [28, "Ni", 10, 4, "d"],
  [29, "Cu", 11, 4, "ds"],
  [30, "Zn", 12, 4, "ds"],
  [31, "Ga", 13, 4, "p"],
  [32, "Ge", 14, 4, "p"],
  [33, "As", 15, 4, "p"],
  [34, "Se", 16, 4, "p"],
  [35, "Br", 17, 4, "p"],
  [36, "Kr", 18, 4, "p"],
  [37, "Rb", 1, 5, "s"],
  [38, "Sr", 2, 5, "s"],
  [39, "Y", 3, 5, "d"],
  [40, "Zr", 4, 5, "d"],
  [41, "Nb", 5, 5, "d"],
  [42, "Mo", 6, 5, "d"],
  [43, "Tc", 7, 5, "d"],
  [44, "Ru", 8, 5, "d"],
  [45, "Rh", 9, 5, "d"],
  [46, "Pd", 10, 5, "d"],
  [47, "Ag", 11, 5, "ds"],
  [48, "Cd", 12, 5, "ds"],
  [49, "In", 13, 5, "p"],
  [50, "Sn", 14, 5, "p"],
  [51, "Sb", 15, 5, "p"],
  [52, "Te", 16, 5, "p"],
  [53, "I", 17, 5, "p"],
  [54, "Xe", 18, 5, "p"],
  [55, "Cs", 1, 6, "s"],
  [56, "Ba", 2, 6, "s"],
  [57, "La", 3, 6, "f"],
  [72, "Hf", 4, 6, "d"],
  [73, "Ta", 5, 6, "d"],
  [74, "W", 6, 6, "d"],
  [75, "Re", 7, 6, "d"],
  [76, "Os", 8, 6, "d"],
  [77, "Ir", 9, 6, "d"],
  [78, "Pt", 10, 6, "d"],
  [79, "Au", 11, 6, "ds"],
  [80, "Hg", 12, 6, "ds"],
  [81, "Tl", 13, 6, "p"],
  [82, "Pb", 14, 6, "p"],
  [83, "Bi", 15, 6, "p"],
  [84, "Po", 16, 6, "p"],
  [85, "At", 17, 6, "p"],
  [86, "Rn", 18, 6, "p"],
  [87, "Fr", 1, 7, "s"],
  [88, "Ra", 2, 7, "s"],
  [89, "Ac", 3, 7, "f"],
  [104, "Rf", 4, 7, "d"],
  [105, "Db", 5, 7, "d"],
  [106, "Sg", 6, 7, "d"],
  [107, "Bh", 7, 7, "d"],
  [108, "Hs", 8, 7, "d"],
  [109, "Mt", 9, 7, "d"],
  [110, "Ds", 10, 7, "d"],
  [111, "Rg", 11, 7, "ds"],
  [112, "Cn", 12, 7, "ds"],
  [113, "Nh", 13, 7, "p"],
  [114, "Fl", 14, 7, "p"],
  [115, "Mc", 15, 7, "p"],
  [116, "Lv", 16, 7, "p"],
  [117, "Ts", 17, 7, "p"],
  [118, "Og", 18, 7, "p"],
].map(([number, symbol, group, period, zone]) => ({
  number,
  symbol,
  group,
  period,
  zone,
  recommended: ["F", "Cl", "Br", "I"].includes(symbol),
}));

const fBlockRows = [
  ["镧系", ["Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu"]],
  ["锕系", ["Th", "Pa", "U", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr"]],
];

const experiments = [
  ["blue", "卤素的氧化性", "Cl₂ 可置换 I⁻，观察有机层显色", "experiment"],
  ["blue", "卤素的还原性", "比较 Cl⁻、Br⁻、I⁻ 被氧化的难易"],
  ["coral", "次卤酸盐的氧化性", "漂白与氧化还原证据"],
  ["coral", "卤酸盐的氧化性", "酸性条件下的氧化反应"],
  ["orange", "卤化银的感光性", "沉淀颜色与光照变化"],
];

const completionChecks = [
  ["推荐路径", "p 区 · 卤素"],
  ["学习内容", "13.1 卤族元素通性"],
  ["实验记录", "卤素的氧化性"],
];

const experimentRecordChecks = [
  ["实验现象", "溶液由无色转为棕色，碘在有机层显色。"],
  ["反应方程式", "Cl₂ + 2I⁻ = 2Cl⁻ + I₂"],
  ["实验结论", "Cl₂ 可氧化 I⁻，氧化性强于 I₂。"],
];

const demoNavGroups = [
  {
    title: "主流程",
    items: [
      ["login", "登录"],
      ["quiz", "课前"],
      ["analysis", "分析"],
      ["periodic", "元素区"],
      ["halogen", "卤素学习"],
      ["element", "性质"],
      ["experiment", "实验"],
      ["record", "记录"],
      ["completion", "完成"],
      ["postquiz", "课后"],
      ["report", "总结"],
    ],
  },
];

const zoneCards = [
  ["s", "s 区元素", "碱金属 / 碱土金属", "暂不学习"],
  ["p", "p 区元素", "卤素性质", "进入学习"],
  ["d", "d 区元素", "过渡元素性质", "暂不学习"],
  ["ds", "ds 区元素", "铜、锌等相关性质", "暂不学习"],
];

const halogenKnowledgeCards = [
  {
    code: "13.1",
    title: "卤族元素通性",
    tag: "基础性质",
    summary: "卤素位于 p 区第 17 族，最重要的是把结构特点和氧化性递变联系起来。",
    points: [
      "最外层电子构型为 ns²np⁵，通常形成双原子分子 X₂。",
      "单质氧化性：F₂ > Cl₂ > Br₂ > I₂。",
      "卤离子还原性：I⁻ > Br⁻ > Cl⁻ > F⁻。",
    ],
    prompt: "看到置换反应时，先判断是哪一种卤素单质在氧化卤离子。",
    experiment: {
      label: "进入氧化性实验",
      copy: "观察 Cl₂ 置换 I⁻ 的颜色变化",
      target: "experiment",
    },
  },
  {
    code: "13.2",
    title: "卤素单质",
    tag: "单质性质",
    summary: "卤素单质的颜色、状态和反应活性随原子序数增加呈规律变化。",
    points: [
      "F₂、Cl₂ 为气体，Br₂ 为液体，I₂ 为固体。",
      "颜色逐渐加深，熔沸点整体升高。",
      "卤素单质可与金属或非金属反应生成卤化物。",
    ],
    prompt: "比较单质性质时，把颜色、状态、氧化性三个维度分开看。",
    experiment: {
      label: "进入氧化性实验",
      copy: "用置换反应比较单质氧化性",
      target: "experiment",
    },
  },
  {
    code: "13.3",
    title: "卤化氢",
    tag: "氢化物",
    summary: "卤化氢的酸性、稳定性和还原性变化方向不同，容易混淆。",
    points: [
      "热稳定性：HF > HCl > HBr > HI。",
      "水溶液酸性：HF 弱，HCl、HBr、HI 为强酸。",
      "还原性：HI > HBr > HCl > HF。",
    ],
    prompt: "HF 的特殊性来自强氢键和 H-F 键强度，不能只按周期趋势机械判断。",
  },
  {
    code: "13.4",
    title: "卤化物、互化物和多卤化物",
    tag: "化合物",
    summary: "这一组内容重点看卤离子的检验、沉淀颜色和复杂离子形成。",
    points: [
      "AgCl、AgBr、AgI 可用于卤离子检验。",
      "卤素互化物由不同卤素组成，中心原子常呈正氧化态。",
      "I₂ 与 I⁻ 可形成 I₃⁻，解释碘在碘化钾溶液中的溶解。",
    ],
    prompt: "做鉴别题时，先看沉淀颜色，再看是否溶于氨水或形成配合物。",
  },
  {
    code: "13.5",
    title: "卤素氧化物、含氧酸及其盐",
    tag: "含氧化合物",
    summary: "含氧酸及其盐常考氧化性变化，需要结合氧化态和溶液条件判断。",
    points: [
      "同一卤素中，含氧酸氧化态越高，氧化性判断越依赖条件。",
      "次氯酸及其盐常表现漂白和氧化能力。",
      "氯酸盐、高氯酸盐等在酸性或加热条件下反应性明显增强。",
    ],
    prompt: "遇到含氧酸盐题目，不要只背强弱，要同时看酸碱性和反应条件。",
  },
  {
    code: "13.6",
    title: "拟卤素",
    tag: "类比迁移",
    summary: "拟卤素的学习重点是用卤素规律进行类比，但不要把所有性质完全等同。",
    points: [
      "常见拟卤素包括氰、硫氰等相关体系。",
      "部分反应形式与卤素相似，例如形成类似卤化物的化合物。",
      "类比时要回到电子结构和具体反应条件。",
    ],
    prompt: "拟卤素题目通常考迁移能力，先找相似点，再找限制条件。",
  },
];

const miniElements = [
  ["H", "s", 1, 1, true],
  ["He", "noble", 18, 1],
  ["Li", "s", 1, 2],
  ["Be", "s", 2, 2],
  ["B", "p", 13, 2],
  ["C", "p", 14, 2],
  ["N", "p", 15, 2],
  ["O", "p", 16, 2],
  ["F", "p", 17, 2],
  ["Ne", "noble", 18, 2],
  ["Na", "s", 1, 3],
  ["Mg", "s", 2, 3],
  ["Al", "p", 13, 3],
  ["Si", "p", 14, 3],
  ["P", "p", 15, 3],
  ["S", "p", 16, 3],
  ["Cl", "halogen", 17, 3, true],
  ["Ar", "noble", 18, 3],
  ["K", "s", 1, 4],
  ["Ca", "s", 2, 4],
  ["Sc", "d", 3, 4],
  ["Ti", "d", 4, 4],
  ["V", "d", 5, 4],
  ["Cr", "d", 6, 4],
  ["Mn", "d", 7, 4],
  ["Fe", "d", 8, 4],
  ["Co", "d", 9, 4],
  ["Ni", "d", 10, 4],
  ["Cu", "ds", 11, 4],
  ["Zn", "ds", 12, 4],
  ["Ga", "p", 13, 4],
  ["Ge", "p", 14, 4],
  ["As", "p", 15, 4],
  ["Se", "p", 16, 4],
  ["Br", "halogen", 17, 4, true],
  ["Kr", "noble", 18, 4],
  ["Rb", "s", 1, 5],
  ["Sr", "s", 2, 5],
  ["Y", "d", 3, 5],
  ["Zr", "d", 4, 5],
  ["Nb", "d", 5, 5],
  ["Mo", "d", 6, 5],
  ["Tc", "d", 7, 5],
  ["Ru", "d", 8, 5],
  ["Rh", "d", 9, 5],
  ["Pd", "d", 10, 5],
  ["Ag", "ds", 11, 5],
  ["Cd", "ds", 12, 5],
  ["In", "p", 13, 5],
  ["Sn", "p", 14, 5],
  ["Sb", "p", 15, 5],
  ["Te", "p", 16, 5],
  ["I", "halogen", 17, 5, true],
  ["Xe", "noble", 18, 5],
  ["Cs", "s", 1, 6],
  ["Ba", "s", 2, 6],
  ["La", "f", 3, 6],
  ["Hf", "d", 4, 6],
  ["Ta", "d", 5, 6],
  ["W", "d", 6, 6],
  ["Re", "d", 7, 6],
  ["Os", "d", 8, 6],
  ["Ir", "d", 9, 6],
  ["Pt", "d", 10, 6],
  ["Au", "ds", 11, 6],
  ["Hg", "ds", 12, 6],
  ["Tl", "p", 13, 6],
  ["Pb", "p", 14, 6],
  ["Bi", "p", 15, 6],
  ["Po", "p", 16, 6],
  ["At", "p", 17, 6],
  ["Rn", "noble", 18, 6],
];

function StatusBar() {
  return (
    <div className="status-bar">
      <span>9:41</span>
      <span className="status-icons" aria-hidden="true">
        <i />
        <i />
        <i />
        <b />
      </span>
    </div>
  );
}

function Header({ title, left, right }) {
  return (
    <header className="page-header">
      {left ?? <button className="icon-btn ghost hidden" type="button" aria-label="占位" />}
      <h2>
        <img className="header-mark" src={logoSrc} alt="" aria-hidden="true" />
        {title}
      </h2>
      {right ?? <button className="icon-btn ghost hidden" type="button" aria-label="占位" />}
    </header>
  );
}

function IconButton({ label, children, onClick, hidden = false }) {
  return (
    <button
      className={`icon-btn ghost${hidden ? " hidden" : ""}`}
      type="button"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function DemoNavigator({ screen, go }) {
  return (
    <aside className="demo-nav" aria-label="演示跳转导航">
      <div className="demo-nav-title">
        <span>演示导航</span>
        <strong>{demoNavGroups.flatMap((group) => group.items).length}</strong>
      </div>
      {demoNavGroups.map((group) => (
        <div className="demo-nav-group" key={group.title}>
          <p>{group.title}</p>
          <div>
            {group.items.map(([target, label]) => (
              <button
                className={screen === target ? "active" : ""}
                key={target}
                type="button"
                onClick={() => go(target)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </aside>
  );
}

function LoginScreen({ go }) {
  return (
    <section className="screen screen-login active">
      <div className="login-panel">
        <div className="brand-lockup">
          <img src={logoSrc} alt="中山大学校徽" />
          <div>
            <strong>中山大学化学学院</strong>
            <span>School of Chemistry · SYSU</span>
          </div>
        </div>

        <div className="login-title">
          <h1>元素性质实验</h1>
        </div>
      </div>

      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          go("quiz");
        }}
      >
        <div className="login-form-title">
          <strong>学生登录</strong>
          <span>请输入姓名和学号，进入本次实验学习</span>
        </div>
        <label className="field">
          <span aria-hidden="true">□</span>
          <input type="text" name="name" placeholder="姓名：张三" autoComplete="name" />
        </label>
        <label className="field">
          <span aria-hidden="true">#</span>
          <input type="text" name="studentId" placeholder="学号：12345678" inputMode="numeric" />
        </label>
        <button className="primary-btn" type="submit">
          登录
        </button>
      </form>
    </section>
  );
}

function ChoiceGroup({ name, value, setValue, options }) {
  return options.map((option) => (
    <label className={`choice${value === option.value ? " selected" : ""}`} key={option.value}>
      <input
        type="radio"
        name={name}
        checked={value === option.value}
        onChange={() => setValue(option.value)}
      />
      {option.label}
    </label>
  ));
}

function QuizScreen({ go }) {
  const [q1, setQ1] = useState("B");
  const [q2, setQ2] = useState("right");
  const [q3, setQ3] = useState("");

  return (
    <section className="screen active">
      <Header
        title="课前小测试"
        left={<IconButton label="返回" onClick={() => go("login")}>‹</IconButton>}
      />
      <div className="progress-block">
        <div className="progress-meta">
          <span>3/10</span>
          <strong>课前摸底</strong>
        </div>
        <div className="progress">
          <span style={{ width: "30%" }} />
        </div>
      </div>

      <div className="quiz-card">
        <span className="question-type">选择题</span>
        <p className="question-title">1. 下列关于卤素单质氧化性递变的说法正确的是（ ）</p>
        <ChoiceGroup
          name="q1"
          value={q1}
          setValue={setQ1}
          options={[
            { value: "A", label: "A. I₂ 的氧化性最强" },
            { value: "B", label: "B. F₂、Cl₂、Br₂、I₂ 氧化性依次减弱" },
            { value: "C", label: "C. Br₂ 不能氧化 I⁻" },
            { value: "D", label: "D. Cl₂ 的氧化性弱于 I₂" },
          ]}
        />
      </div>

      <div className="quiz-card">
        <span className="question-type">判断题</span>
        <p className="question-title">
          2. H<sub>2</sub>O<sub>2</sub> 既可表现氧化性，也可表现还原性。
        </p>
        <ChoiceGroup
          name="q2"
          value={q2}
          setValue={setQ2}
          options={[
            { value: "right", label: "正确" },
            { value: "wrong", label: "错误" },
          ]}
        />
      </div>

      <div className="quiz-card">
        <span className="question-type">填空题</span>
        <p className="question-title">3. 碱金属和碱土金属主要属于元素周期表的 ____ 区。</p>
        <label className="fill-field">
          <input
            value={q3}
            onChange={(event) => setQ3(event.target.value)}
            placeholder="填写答案"
            aria-label="第 3 题答案"
          />
        </label>
      </div>

      <div className="bottom-action">
        <button className="primary-btn" type="button" onClick={() => go("analysis")}>
          提交
        </button>
      </div>
    </section>
  );
}

function AnalysisScreen({ go }) {
  return (
    <section className="screen analysis-screen active">
      <Header
        title="结果分析"
        left={<IconButton label="返回" onClick={() => go("quiz")}>‹</IconButton>}
        right={<IconButton label="继续" onClick={() => go("periodic")}>›</IconButton>}
      />

      <section className="analysis-summary-card">
        <div>
          <span>薄弱</span>
          <strong>p 区 · 卤素</strong>
        </div>
        <p>建议先学习卤素知识点，并完成氧化性实验。</p>
      </section>

      <section className="analysis-section">
        <div className="section-title">
          <h3>元素区掌握</h3>
        </div>
        <div className="zone-result-grid">
          {zoneResults.map((zone) => (
            <article className={`zone-result-card ${zone.color}${zone.weak ? " weak" : ""}`} key={zone.id}>
              <div>
                <span className={`dot ${zone.color}`} />
                <strong>{zone.title}</strong>
                <em>{zone.level}</em>
              </div>
              <p>{zone.note}</p>
              <div className="metric-track" aria-label={`${zone.title}掌握度 ${zone.percent}%`}>
                <span className={`metric-fill ${zone.color}`} style={{ width: `${zone.percent}%` }} />
              </div>
              <b>{zone.percent}%</b>
            </article>
          ))}
        </div>
      </section>

      <section className="analysis-section">
        <div className="section-title">
          <h3>学习模块掌握</h3>
        </div>
        <div className="analysis-zone-stack">
          {elementZones.map((zone) => {
            const zoneResult = zoneResults.find((item) => item.id === zone.id);
            return (
              <section className="analysis-zone-block" key={zone.id}>
                <div className="analysis-zone-title">
                  <div>
                    <span className={`dot ${zone.color}`} />
                    <strong>{zone.title}</strong>
                    <em>{zone.subtitle}</em>
                  </div>
                  <b>{zoneResult?.percent}%</b>
                </div>
                <div className="analysis-module-stack">
                  {zone.modules.map((module) => (
                    <article
                      className={`analysis-module-row ${module.color}${module.recommended ? " recommended" : ""}`}
                      key={module.id}
                    >
                      <div className="analysis-module-head">
                        <span className={`dot ${module.color}`} />
                        <strong>{module.title}</strong>
                        {module.recommended && <em>推荐学习</em>}
                      </div>
                      <p>{module.scope}</p>
                      <div className="metric-track" aria-label={`${module.title}掌握度 ${module.percent}%`}>
                        <span className={`metric-fill ${module.color}`} style={{ width: `${module.percent}%` }} />
                      </div>
                      <div className="analysis-module-foot">
                        <span>{module.level}</span>
                        <b>{module.percent}%</b>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <div className="bottom-action">
        <button className="primary-btn" type="button" onClick={() => go("periodic")}>
          进入元素区
        </button>
      </div>
    </section>
  );
}

function PeriodicScreen({ go }) {
  const [selectedZoneId, setSelectedZoneId] = useState("p");
  const selectedZone = elementZones.find((zone) => zone.id === selectedZoneId) ?? elementZones[1];
  const selectedZoneResult = zoneResults.find((zone) => zone.id === selectedZone.id);

  return (
    <section className="screen periodic-screen active">
      <Header
        title="元素区"
        left={<IconButton label="返回" onClick={() => go("analysis")}>‹</IconButton>}
      />

      <section className="periodic-table-panel">
        <div className="periodic-panel-head">
          <div>
            <span>元素周期表</span>
            <h3>按一级目录选区</h3>
          </div>
          <strong>{selectedZone.title}</strong>
        </div>

        <div className="periodic-table-scroll">
          <div className="periodic-group-row" aria-hidden="true">
            {Array.from({ length: 18 }, (_, index) => (
              <span key={index + 1}>{index + 1}</span>
            ))}
          </div>
          <div className="periodic-table-grid" aria-label="元素周期表">
            {periodicElements.map((element) => {
              const zone = elementZones.find((item) => item.id === element.zone);
              const isSelectable = element.zone !== "f";
              return (
                <button
                  aria-label={`${element.symbol}，${zone?.title ?? "f 区"}`}
                  className={`periodic-cell ${element.zone}${selectedZone.id === element.zone ? " active" : ""}${element.recommended ? " recommended" : ""}`}
                  disabled={!isSelectable}
                  key={`${element.symbol}-${element.number}`}
                  onClick={() => isSelectable && setSelectedZoneId(element.zone)}
                  style={{ gridColumn: element.group, gridRow: element.period }}
                  title={`${element.number} ${element.symbol}`}
                  type="button"
                >
                  <small>{element.number}</small>
                  <strong>{element.symbol}</strong>
                </button>
              );
            })}
          </div>
          <div className="periodic-f-block" aria-label="f 区补充展示">
            {fBlockRows.map(([label, symbols]) => (
              <div className="periodic-f-row" key={label}>
                <span>{label}</span>
                {symbols.map((symbol) => (
                  <i key={symbol}>{symbol}</i>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="periodic-zone-legend" role="tablist" aria-label="元素区一级目录">
          {elementZones.map((zone) => {
            const result = zoneResults.find((item) => item.id === zone.id);
            return (
              <button
                className={`${zone.color}${selectedZone.id === zone.id ? " active" : ""}`}
                key={zone.id}
                onClick={() => setSelectedZoneId(zone.id)}
                role="tab"
                aria-selected={selectedZone.id === zone.id}
                type="button"
              >
                <span>{zone.title}</span>
                <strong>{result?.percent}%</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section className={`zone-overview ${selectedZone.color}`}>
        <span>当前一级目录</span>
        <div>
          <h3>{selectedZone.title}</h3>
          <strong>{selectedZoneResult?.level} · {selectedZoneResult?.percent}%</strong>
        </div>
        <p>{selectedZone.subtitle}</p>
      </section>

      <div className="section-title module-section-title">
        <h3>{selectedZone.title}二级目录</h3>
        <span>{selectedZone.modules.length} 项</span>
      </div>

      <div className="study-module-grid" aria-label={`${selectedZone.title}二级目录`}>
        {selectedZone.modules.map((module) => (
          <button
            className={`study-module-card ${module.color}${module.recommended ? " recommended" : ""}`}
            key={module.id}
            type="button"
            aria-disabled={!module.recommended}
            onClick={module.recommended ? () => go("halogen") : undefined}
          >
            <div className="study-module-head">
              <span className={`dot ${module.color}`} />
              <strong>{module.title}</strong>
              {module.recommended && <em>推荐学习</em>}
            </div>
            <p>{module.scope}</p>
            <div className="study-module-track" aria-label={`${module.title}掌握度 ${module.percent}%`}>
              <span className={`metric-fill ${module.color}`} style={{ width: `${module.percent}%` }} />
            </div>
            <div className="study-module-foot">
              <span>{module.level} {module.percent}%</span>
              <b>{module.recommended ? "开始" : "已掌握"}</b>
            </div>
          </button>
        ))}
      </div>

      <div className="bottom-action split-action">
        <button className="outline-btn" type="button" onClick={() => go("analysis")}>返回分析</button>
        <button className="primary-btn" type="button" onClick={() => go("halogen")}>进入卤素学习</button>
      </div>
    </section>
  );
}

function HalogenLearningScreen({ go }) {
  return (
    <section className="screen halogen-learning-screen active">
      <Header
        title="卤素学习"
        left={<IconButton label="返回" onClick={() => go("periodic")}>‹</IconButton>}
        right={<IconButton label="性质" onClick={() => go("element")}>›</IconButton>}
      />

      <section className="halogen-learning-hero">
        <h3>卤素</h3>
        <p>6 个知识点 · 按顺序学习</p>
      </section>

      <section className="kc-section">
        <div className="kc-stack">
          {halogenKcs.map((item, index) => {
            const [code, ...titleParts] = item.split(" ");
            const title = titleParts.join(" ");
            return (
              <button
                className={`kc-card${index === 0 ? " active" : ""}`}
                key={item}
                type="button"
                onClick={() => go("element")}
              >
                <span>{code}</span>
                <strong>{title}</strong>
                <em>{index === 0 ? "开始" : "待学习"}</em>
              </button>
            );
          })}
        </div>
      </section>

      <div className="bottom-action">
        <button className="primary-btn" type="button" onClick={() => go("element")}>学习 13.1 卤族元素通性</button>
      </div>
    </section>
  );
}

function ElementScreen({ go }) {
  const [activeKnowledgeIndex, setActiveKnowledgeIndex] = useState(0);
  const knowledge = halogenKnowledgeCards[activeKnowledgeIndex];
  const hasPreviousKnowledge = activeKnowledgeIndex > 0;
  const hasNextKnowledge = activeKnowledgeIndex < halogenKnowledgeCards.length - 1;

  const goPreviousKnowledge = () => {
    if (hasPreviousKnowledge) {
      setActiveKnowledgeIndex((index) => index - 1);
      window.scrollTo(0, 0);
    }
  };

  const goNextKnowledge = () => {
    if (hasNextKnowledge) {
      setActiveKnowledgeIndex((index) => index + 1);
      window.scrollTo(0, 0);
      return;
    }
    go("completion");
  };

  return (
    <section className="screen element-screen active">
      <Header
        title="卤素学习"
        left={<IconButton label="返回" onClick={() => go("halogen")}>‹</IconButton>}
        right={<IconButton label={hasNextKnowledge ? "继续" : "完成"} onClick={goNextKnowledge}>›</IconButton>}
      />

      <section className="knowledge-card">
        <div className="knowledge-card-head">
          <span>{activeKnowledgeIndex + 1} / {halogenKnowledgeCards.length}</span>
          <em>{knowledge.tag}</em>
        </div>
        <strong>{knowledge.code}</strong>
        <h3>{knowledge.title}</h3>
        <p>{knowledge.summary}</p>

        <div className="knowledge-points">
          {knowledge.points.map((point) => (
            <div key={point}>
              <span />
              <p>{point}</p>
            </div>
          ))}
        </div>

        <div className="knowledge-note">
          <span>学习提示</span>
          <p>{knowledge.prompt}</p>
        </div>
      </section>

      {knowledge.experiment && (
        <button className="experiment-link-card" type="button" onClick={() => go(knowledge.experiment.target)}>
          <span className="experiment-link-copy">
            <span>实验</span>
            <strong>{knowledge.experiment.label}</strong>
            <small>{knowledge.experiment.copy}</small>
          </span>
          <span className="watch-cta" aria-hidden="true">
            <i>▶</i>
            观看
          </span>
        </button>
      )}

      <div className="bottom-action knowledge-nav-action">
        <button className="outline-btn" type="button" onClick={() => go("halogen")}>
          返回
        </button>
        <button className="outline-btn" type="button" onClick={goPreviousKnowledge} disabled={!hasPreviousKnowledge}>
          上一个知识点
        </button>
        <button className="primary-btn" type="button" onClick={goNextKnowledge}>
          {hasNextKnowledge ? "下一个知识点" : "完成学习"}
        </button>
      </div>
    </section>
  );
}

function ExperimentScreen({ go }) {
  return (
    <section className="screen experiment-screen active">
      <Header
        title="卤素的氧化性实验"
        left={<IconButton label="返回" onClick={() => go("element")}>‹</IconButton>}
        right={<IconButton label="记录" onClick={() => go("record")}>✓</IconButton>}
      />

      <div className="video-card" role="img" aria-label="实验视频：试管中发生紫色反应">
        <div className="video-scene">
          <div className="tube"><span /></div>
          <div className="light-line" />
        </div>
        <div className="video-controls">
          <span>▶</span>
          <strong>00:03 / 01:25</strong>
          <em>▮▮</em>
          <em>⛶</em>
        </div>
      </div>

      <article className="content-block experiment-copy">
        <h3>实验原理</h3>
        <p>
          Cl<sub>2</sub> &gt; Br<sub>2</sub> &gt; I<sub>2</sub> 的氧化性强弱比较。
        </p>
        <h3>实验现象</h3>
        <p>氯气可将碘离子氧化为碘，溶液由无色变为棕色。</p>
        <h3>反应方程式</h3>
        <p>
          Cl<sub>2</sub> + 2I<sup>-</sup> = 2Cl<sup>-</sup> + I<sub>2</sub>
        </p>
      </article>

      <div className="bottom-action split-action">
        <button className="outline-btn" type="button" onClick={() => go("element")}>
          返回性质
        </button>
        <button className="primary-btn" type="button" onClick={() => go("record")}>
          记录实验
        </button>
      </div>
    </section>
  );
}

function ExperimentRecordScreen({ go }) {
  return (
    <section className="screen experiment-record-screen active">
      <Header
        title="实验记录"
        left={<IconButton label="返回" onClick={() => go("experiment")}>‹</IconButton>}
      />

      <section className="record-summary-card">
        <span>观察确认</span>
        <h3>卤素的氧化性</h3>
        <p>根据实验视频确认关键现象、方程式和结论。</p>
      </section>

      <div className="record-check-list">
        {experimentRecordChecks.map(([title, copy]) => (
          <label key={title}>
            <input type="checkbox" defaultChecked />
            <span>
              <strong>{title}</strong>
              <em>{copy}</em>
            </span>
          </label>
        ))}
      </div>

      <div className="bottom-action split-action">
        <button className="outline-btn" type="button" onClick={() => go("experiment")}>
          返回实验
        </button>
        <button className="primary-btn" type="button" onClick={() => go("completion")}>
          确认完成
        </button>
      </div>
    </section>
  );
}

function CompletionScreen({ go }) {
  return (
    <section className="screen completion-screen active">
      <Header
        title="学习完成"
        left={<IconButton label="返回" onClick={() => go("record")}>‹</IconButton>}
      />

      <div className="celebrate">
        <div className="trophy" aria-hidden="true">
          <img src={logoSrc} alt="" />
        </div>
        <h3>推荐路径已完成</h3>
        <p>下一步进入课后测验，验证卤素模块学习效果。</p>
        <div className="checkpoint-list">
          {completionChecks.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
        <button className="outline-btn" type="button" onClick={() => go("record")}>返回</button>
        <button className="primary-btn" type="button" onClick={() => go("postquiz")}>
          进入课后测验
        </button>
      </div>
    </section>
  );
}

function PostQuizScreen({ go }) {
  const [q3, setQ3] = useState("B");

  return (
    <section className="screen postquiz-screen active">
      <Header
        title="课后小测试"
        left={<IconButton label="返回" onClick={() => go("completion")}>‹</IconButton>}
        right={<IconButton label="报告" onClick={() => go("report")}>◎</IconButton>}
      />
      <div className="progress-block">
        <div className="progress-meta">
          <span>1/10</span>
          <strong>课后测试</strong>
        </div>
        <div className="progress">
          <span style={{ width: "10%" }} />
        </div>
      </div>
      <div className="quiz-card">
        <span className="question-type">选择题</span>
        <p className="question-title">1. 下列关于氯气的说法正确的是（ ）</p>
        <ChoiceGroup
          name="q3"
          value={q3}
          setValue={setQ3}
          options={[
            { value: "A", label: "A. 氯气只具有氧化性" },
            { value: "B", label: "B. 氯气在常温下为黄绿色气体" },
            { value: "C", label: "C. 氯气与金属反应只表现还原性" },
            { value: "D", label: "D. 氯气的氧化性比溴单质弱" },
          ]}
        />
      </div>
      <div className="bottom-action">
        <button className="primary-btn" type="button" onClick={() => go("report")}>
          提交并查看总结
        </button>
      </div>
    </section>
  );
}

function ReportScreen({ go }) {
  return (
    <section className="screen report-screen active">
      <Header
        title="数据总结"
        left={<IconButton label="返回" onClick={() => go("postquiz")}>‹</IconButton>}
        right={<IconButton label="退出" onClick={() => go("login")}>↩</IconButton>}
      />

      <section className="student-card">
        <div className="avatar"><span /></div>
        <div>
          <h3>张同学</h3>
          <p>学号：2023001234</p>
        </div>
      </section>

      <section className="score-card">
        <span>您已完成学习</span>
        <strong>30<small>分</small></strong>
        <em>较课前提升</em>
      </section>

      <div className="score-grid">
        <div><span>课前测试得分</span><strong>58</strong><small>分</small></div>
        <div><span>课后测试得分</span><strong>88</strong><small>分</small></div>
      </div>

      <section className="overview-card">
        <h3>学习情况概览</h3>
        <div className="time-row">
          <strong>38 min</strong>
          <span>本次学习总时长</span>
        </div>
        <h4>学习路径</h4>
        <div className="path-line">
          <span>p区</span><i /><span>卤素</span><i /><span>实验</span><i /><span>课后测</span>
        </div>
        <h4>学习内容</h4>
        <p className="check green">p 区：卤素通性、F / Cl / Br / I 特殊性</p>
        <p className="check amber">相关实验：卤素的氧化性、卤素的还原性</p>
        <p className="check coral">AI 助教：实验现象与方程式</p>
      </section>

      <section className="radar-card">
        <h3>能力提升分析</h3>
        <div className="radar">
          <svg viewBox="0 0 220 180" role="img" aria-label="能力提升雷达图">
            <polygon points="110,8 196,58 178,150 42,150 24,58" fill="#f4f8fb" stroke="#d7e0ea" />
            <polygon points="110,32 170,68 158,132 62,132 50,68" fill="none" stroke="#d7e0ea" />
            <polygon points="110,56 148,78 140,114 80,114 72,78" fill="none" stroke="#d7e0ea" />
            <line x1="110" y1="8" x2="110" y2="150" stroke="#d7e0ea" />
            <line x1="24" y1="58" x2="178" y2="150" stroke="#d7e0ea" />
            <line x1="196" y1="58" x2="42" y2="150" stroke="#d7e0ea" />
            <polygon points="110,54 160,70 148,130 72,124 68,82" fill="rgba(45, 123, 225, .2)" stroke="#2d7be1" strokeWidth="3" />
            <polygon points="110,42 176,62 160,138 58,136 48,72" fill="rgba(0, 88, 38, .18)" stroke="#005826" strokeWidth="3" />
          </svg>
        </div>
        <div className="radar-legend">
          <span><i className="blue-bg" />课前</span>
          <span><i className="green-bg" />课后</span>
        </div>
      </section>

      <section className="weak-card">
        <h3>薄弱知识点（仍需加强）</h3>
        <div className="weak-item orange"><span>↻</span><p>卤素的还原性<br /><small>掌握度：60%</small></p></div>
        <div className="weak-item blue"><span>♙</span><p>卤化氢的特殊性<br /><small>掌握度：62%</small></p></div>
        <div className="weak-item orange"><span>⌬</span><p>含氧酸盐的氧化性<br /><small>掌握度：58%</small></p></div>
        <button className="soft-btn" type="button" onClick={() => go("periodic")}>回到元素区</button>
      </section>
    </section>
  );
}

export default function App() {
  const [screen, setScreen] = useState("login");

  const go = useMemo(
    () => (nextScreen) => {
      setScreen(nextScreen);
      window.scrollTo(0, 0);
    },
    [],
  );

  useEffect(() => {
    window.showScreen = go;
    return () => {
      delete window.showScreen;
    };
  }, [go]);

  return (
    <div className="demo-stage">
      <main className="phone-shell" aria-live="polite">
        <StatusBar />
        {screen === "login" && <LoginScreen go={go} />}
        {screen === "quiz" && <QuizScreen go={go} />}
        {screen === "analysis" && <AnalysisScreen go={go} />}
        {screen === "periodic" && <PeriodicScreen go={go} />}
        {screen === "halogen" && <HalogenLearningScreen go={go} />}
        {screen === "element" && <ElementScreen go={go} />}
        {screen === "experiment" && <ExperimentScreen go={go} />}
        {screen === "record" && <ExperimentRecordScreen go={go} />}
        {screen === "completion" && <CompletionScreen go={go} />}
        {screen === "postquiz" && <PostQuizScreen go={go} />}
        {screen === "report" && <ReportScreen go={go} />}
      </main>
      <DemoNavigator screen={screen} go={go} />
    </div>
  );
}
