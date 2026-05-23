const form = document.querySelector("#assessmentForm");
const progressValue = document.querySelector("#progressValue");
const progressBar = document.querySelector("#progressBar");
const accuracyRange = document.querySelector("#accuracyRange");
const accuracyValue = document.querySelector("#accuracyValue");
const clearButton = document.querySelector("#clearButton");
const toast = document.querySelector("#toast");
const resultPanel = document.querySelector("#resultPanel");
const editButton = document.querySelector("#editButton");
const createIprButton = document.querySelector("#createIprButton");
const iprPanel = document.querySelector("#iprPanel");
const iprForm = document.querySelector("#iprForm");
const milestonesTable = document.querySelector("#milestonesTable");
const developmentTable = document.querySelector("#developmentTable");
const downloadWordButton = document.querySelector("#downloadWordButton");
const resourceList = document.querySelector("#resourceList");
const competencyList = document.querySelector("#competencyList");

const fields = Array.from(
  form.querySelectorAll("input:not([type='range']), select, textarea")
);

const resources = [
  {
    title: "IIBA: Business Analysis Core Standard",
    url: "https://www.iiba.org/globalassets/standards-and-resources/core-standard/iiba-core-standard.pdf",
    description:
      "Базовая рамка бизнес-анализа: ценность, заинтересованные стороны, требования, изменения и контекст решения.",
  },
  {
    title: "OMG: Unified Modeling Language Specification",
    url: "https://www.omg.org/spec/UML/",
    description:
      "Официальная спецификация UML для прокачки моделирования процессов, состояний, взаимодействий и структуры системы.",
  },
  {
    title: "Handbook of Software Engineering Methods: Requirements",
    url: "https://open.oregonstate.education/setextbook/chapter/requirements/",
    description:
      "Открытая глава по требованиям: функциональные требования, атрибуты качества, проверяемость и связь с проектированием.",
  },
  {
    title: "Software Engineering for Self-Directed Learners",
    url: "https://se-education.org/se-book/",
    description:
      "Свободный учебник по инженерии ПО с разделами о требованиях, проектировании и командной разработке.",
  },
];

const competencies = [
  {
    title: "Выявление и анализ требований",
    fields: ["q1", "q2", "q7", "q8"],
    steps: [
      "Перед началом задачи фиксировать цель, границы, стейкхолдеров и открытые вопросы.",
      "Проводить разбор требований через сценарии, исключения и критерии приемки.",
      "Согласовывать спорные требования до передачи в разработку.",
    ],
    indicators: [
      "Сокращается количество возвратов требований на уточнение.",
      "В задачах явно описаны бизнес-цель, ограничения и критерии готовности.",
    ],
  },
  {
    title: "Документирование и управление знаниями",
    fields: ["q5", "q5_rating", "q6", "q6_rating"],
    steps: [
      "Использовать единый шаблон: контекст, требования, сценарии, ограничения, вопросы и решения.",
      "Добавлять примеры, диаграммы и ссылки на связанные артефакты.",
      "Проводить короткое ревью документации с разработкой и тестированием.",
    ],
    indicators: [
      "Коллеги реже обращаются за уточнениями по готовой документации.",
      "Документы можно использовать без устного сопровождения автора.",
    ],
  },
  {
    title: "Коммуникация и работа с обратной связью",
    fields: ["q3", "q4", "q7"],
    steps: [
      "Отделять проблему от человека и фиксировать договоренности письменно.",
      "На критичных обсуждениях предлагать два-три варианта решения с последствиями.",
      "Запрашивать обратную связь после спорных или срочных задач.",
    ],
    indicators: [
      "Снижается число конфликтных эскалаций.",
      "Команда быстрее приходит к согласованному решению по спорным вопросам.",
    ],
  },
  {
    title: "Проектирование решений",
    fields: ["q8", "q9", "q9_rating"],
    steps: [
      "Перед описанием решения проверять соответствие бизнес-цели и ограничениям проекта.",
      "Фиксировать альтернативы, компромиссы и причины выбранного подхода.",
      "Показывать влияние решения на интеграции, данные, роли и пользовательские сценарии.",
    ],
    indicators: [
      "Технические решения меньше дорабатываются после ревью.",
      "В описании решения видны ограничения, риски и зависимости.",
    ],
  },
  {
    title: "Оценка задач и управление рисками",
    fields: ["q7", "q10"],
    steps: [
      "Разбивать крупные задачи на проверяемые этапы и отдельно оценивать неопределенность.",
      "Фиксировать допущения, зависимости и риски до старта работ.",
      "Сравнивать плановую и фактическую оценку после завершения задачи.",
    ],
    indicators: [
      "Отклонения оценок становятся предсказуемыми и объяснимыми.",
      "Риски поднимаются до того, как начинают влиять на сроки.",
    ],
  },
];

function updateProgress() {
  const filled = fields.filter((field) => field.value.trim().length > 0).length;
  const percent = Math.round((filled / fields.length) * 100);

  progressValue.textContent = `${percent}%`;
  progressBar.style.width = `${percent}%`;
}

function updateAccuracy() {
  accuracyValue.textContent = `${accuracyRange.value}/10`;
}

function showToast() {
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function getFieldValue(name) {
  const field = form.elements[name];
  return field ? field.value.trim() : "";
}

function getCompetencyScore(competency) {
  const filledCount = competency.fields.filter((name) => getFieldValue(name)).length;
  return competency.fields.length - filledCount;
}

function getSortedCompetencies() {
  return [...competencies].sort(
    (a, b) => getCompetencyScore(b) - getCompetencyScore(a)
  );
}

function renderResources() {
  resourceList.innerHTML = resources
    .map(
      (resource) => `
        <article class="resource-item">
          <a href="${resource.url}" target="_blank" rel="noreferrer">${resource.title}</a>
          <p>${resource.description}</p>
        </article>
      `
    )
    .join("");
}

function renderCompetencies() {
  const sortedCompetencies = getSortedCompetencies();

  competencyList.innerHTML = sortedCompetencies
    .map(
      (competency) => `
        <article class="competency-item">
          <strong>${competency.title}</strong>
          <p>Шаги развития:</p>
          <ol class="step-list">
            ${competency.steps.map((step) => `<li>${step}</li>`).join("")}
          </ol>
          <p>Индикаторы прогресса: ${competency.indicators.join(" ")}</p>
        </article>
      `
    )
    .join("");
}

function showResult() {
  renderResources();
  renderCompetencies();
  resultPanel.hidden = false;
  iprPanel.hidden = true;
  resultPanel.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getRuMonthYear() {
  return new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function addMonths(date, months) {
  const nextDate = new Date(date);
  nextDate.setMonth(nextDate.getMonth() + months);
  return nextDate;
}

function getMilestones() {
  const now = new Date();
  return [
    {
      term: getRuMonthYear(),
      description: "Инициация формирования индивидуального плана развития",
      result: "ИПР сформирован и принят к исполнению всеми участниками.",
    },
    {
      term: new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(
        addMonths(now, 6)
      ),
      description: "Промежуточная встреча по статусу выполнения ИПР",
      result:
        "Сверка по статусу выполнения, корректировка плана при необходимости, оценка достигнутых результатов.",
    },
    {
      term: new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(
        addMonths(now, 12)
      ),
      description: "Подведение итогов выполнения ИПР",
      result: "Подведение итогов выполнения ИПР, формирование следующего ИПР.",
    },
  ];
}

function splitText(value, fallback) {
  const normalized = value
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean);

  return normalized.length ? normalized : fallback;
}

function fillIprForm() {
  const employee = getFieldValue("employee") || "Имя фамилия";
  const grade = document.querySelector("#gradeSelect").value;
  const topCompetencies = getSortedCompetencies().slice(0, 3);

  iprForm.elements.iprEmployee.value = employee;
  iprForm.elements.iprPeriod.value = getRuMonthYear();
  iprForm.elements.iprGrade.value = grade;
  iprForm.elements.iprStrengths.value = splitText(getFieldValue("q1"), [
    "Системность мышления и внимательность к деталям.",
    "Готовность разбираться в предметной области и доводить задачи до результата.",
    "Конструктивное взаимодействие с командой проекта.",
  ]).join("\n");
  iprForm.elements.iprManagerStrengths.value = splitText(getFieldValue("q3"), [
    "Открытая коммуникация с командой и заказчиком.",
    "Готовность прислушиваться к мнению коллег.",
    "Ответственное отношение к качеству результата.",
  ]).join("\n");
  iprForm.elements.iprGrowthAreas.value = topCompetencies
    .map((competency) => competency.title)
    .join("\n");
  iprForm.elements.iprManagerGrowth.value = splitText(getFieldValue("q2"), [
    "Повысить точность оценки работ.",
    "Усилить качество и полноту проектной документации.",
    "Своевременно эскалировать риски и открытые вопросы.",
  ]).join("\n");

  renderMilestones();
  renderDevelopmentTasks(topCompetencies);
}

function renderMilestones() {
  milestonesTable.innerHTML = `
    <div class="ipr-row header">
      <div class="ipr-cell">Срок</div>
      <div class="ipr-cell">Описание</div>
      <div class="ipr-cell">Результат</div>
    </div>
    ${getMilestones()
      .map(
        (item) => `
          <div class="ipr-row">
            <div class="ipr-cell">${item.term}</div>
            <div class="ipr-cell">${item.description}</div>
            <div class="ipr-cell">${item.result}</div>
          </div>
        `
      )
      .join("")}
  `;
}

function renderDevelopmentTasks(selectedCompetencies) {
  developmentTable.innerHTML = `
    <div class="ipr-row header">
      <div class="ipr-cell">Задача</div>
      <div class="ipr-cell">Шаги достижения</div>
      <div class="ipr-cell">Индикаторы успешности</div>
    </div>
    ${selectedCompetencies
      .map(
        (competency) => `
          <div class="ipr-row">
            <div class="ipr-cell"><strong>Развитие компетенции</strong>${competency.title}</div>
            <div class="ipr-cell">${competency.steps.join("<br>")}</div>
            <div class="ipr-cell">${competency.indicators.join("<br>")}</div>
          </div>
        `
      )
      .join("")}
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textToListHtml(value) {
  return escapeHtml(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => `<li>${item}</li>`)
    .join("");
}

function buildWordDocument() {
  const values = Object.fromEntries(new FormData(iprForm).entries());
  const milestones = getMilestones();
  const selectedCompetencies = getSortedCompetencies().slice(0, 3);

  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>ИПР ${escapeHtml(values.iprEmployee)}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #111; line-height: 1.35; }
          h1 { text-align: center; font-size: 24pt; }
          h2 { margin-top: 22px; font-size: 15pt; text-transform: uppercase; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0 18px; }
          td, th { border: 1px solid #777; padding: 7px; vertical-align: top; }
          th { background: #e8f1ee; }
          ul, ol { margin-top: 4px; }
        </style>
      </head>
      <body>
        <h1>Индивидуальный план развития</h1>
        <p style="text-align:center;"><strong>${escapeHtml(values.iprEmployee)}</strong><br>${escapeHtml(
          values.iprPeriod
        )}</p>
        <p>Привет, ${escapeHtml(values.iprEmployee)}!</p>
        <p>Перед тобой индивидуальный план развития. Документ разработан с целью развития навыков аналитика и повышения качества проектной работы.</p>

        <h2>Описание текущей позиции</h2>
        <table>
          <tr><th>Должность</th><td>${escapeHtml(values.iprPosition)}</td></tr>
          <tr><th>Грейд</th><td>${escapeHtml(values.iprGrade)}</td></tr>
          <tr><th>Департамент</th><td>${escapeHtml(values.iprDepartment)}</td></tr>
          <tr><th>Направление</th><td>${escapeHtml(values.iprDirection)}</td></tr>
          <tr><th>Непосредственный руководитель</th><td>${escapeHtml(values.iprManager)}</td></tr>
        </table>

        <h2>Реперные точки по выполнению индивидуального плана развития</h2>
        <table>
          <tr><th>Срок</th><th>Описание</th><th>Результат</th></tr>
          ${milestones
            .map(
              (item) =>
                `<tr><td>${escapeHtml(item.term)}</td><td>${escapeHtml(
                  item.description
                )}</td><td>${escapeHtml(item.result)}</td></tr>`
            )
            .join("")}
        </table>

        <h2>Мои сильные стороны</h2>
        <ul>${textToListHtml(values.iprStrengths)}</ul>
        <h2>Сильные стороны - обратная связь от руководителя</h2>
        <ul>${textToListHtml(values.iprManagerStrengths)}</ul>
        <h2>Мои области роста</h2>
        <ul>${textToListHtml(values.iprGrowthAreas)}</ul>
        <h2>Области роста - обратная связь от руководителя</h2>
        <ul>${textToListHtml(values.iprManagerGrowth)}</ul>

        <h2>Шаги по достижению заявленных точек роста</h2>
        <table>
          <tr><th>Задача</th><th>Шаги достижения</th><th>Индикаторы успешности</th></tr>
          ${selectedCompetencies
            .map(
              (competency) => `
                <tr>
                  <td>Развитие компетенции "${escapeHtml(competency.title)}"</td>
                  <td><ol>${competency.steps
                    .map((step) => `<li>${escapeHtml(step)}</li>`)
                    .join("")}</ol></td>
                  <td><ul>${competency.indicators
                    .map((indicator) => `<li>${escapeHtml(indicator)}</li>`)
                    .join("")}</ul></td>
                </tr>
              `
            )
            .join("")}
        </table>

        <h2>Результат</h2>
        <p>Самостоятельно выполнять задачи полного цикла на проектах внедрения: от получения потребности заказчика до сдачи реализованной функциональности. Цель - качественное проектирование решений с учетом возможностей и ограничений платформы, целей проекта и ожиданий заказчика.</p>
      </body>
    </html>
  `;
}

function downloadWordDocument() {
  const employee = iprForm.elements.iprEmployee.value.trim() || "employee";
  const fileName = `IPR_${employee.replace(/[\\/:*?"<>|]+/g, "_")}.doc`;
  const blob = new Blob(["\ufeff", buildWordDocument()], {
    type: "application/msword;charset=utf-8",
  });
  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(link.href);
}

form.addEventListener("input", updateProgress);

accuracyRange.addEventListener("input", updateAccuracy);

clearButton.addEventListener("click", () => {
  form.reset();
  resultPanel.hidden = true;
  iprPanel.hidden = true;
  updateAccuracy();
  updateProgress();
});

editButton.addEventListener("click", () => {
  form.scrollIntoView({ behavior: "smooth", block: "start" });
});

createIprButton.addEventListener("click", () => {
  fillIprForm();
  iprPanel.hidden = false;
  iprPanel.scrollIntoView({ behavior: "smooth", block: "start" });
});

downloadWordButton.addEventListener("click", downloadWordDocument);

form.addEventListener("submit", (event) => {
  event.preventDefault();
  showResult();
  showToast();
});

updateAccuracy();
updateProgress();
