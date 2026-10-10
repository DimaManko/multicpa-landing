src/
│
├── app/
│ ├── router.tsx / и /:lang открывают одну страницу, неизвестный путь - 404
│ └── styles/ глобальные стили
│
├── pages/
│ ├── landing/ собирает виджеты и использует скролл
│ └── not-found/ страница с 404
│
├── widgets/
│ ├── header/ меню с лого
│ ├── hero/ первый экран и смена слова
│ ├── tasks/ MULTI-TASKS
│ ├── benefits/ MULTI-BENEFITS и бегущая строка
│ ├── multiply/ MULTIPLY WITH US и Scroll to top
│ ├── background/ живой фон и затемнение на втором экране
│ └── preloader/ комбинированный прелоадер
│
├── features/
│ ├── snap-scroll/ колесо, якорь, направление, GSAP
│ ├── contact-form/ модалка, валидация, отправка, окно благодарности
│ └── locale-switch/ кнопка смены языка, меняет адрес
│
└── shared/
├── api/ обёртка над fetch, benefits, tasks, multiply, POST /form
├── i18n/ словари подписей, которых нет в API
├── ui/ кнопки
└── assets/ иконки

## Архитектура (лёгкий FSD)

Стрелка значит «использует». Слой берёт только то, что ниже него. `shared` не знает ни один верхний слой.

```mermaid
flowchart TD
  subgraph appLayer ["app · запускает сайт и выбирает страницу"]
    direction LR
    router["<b>router</b><br/>/ и /:lang → лендинг<br/>остальное → 404"]
    styles["<b>styles</b><br/>глобальные стили"]
  end

  subgraph pagesLayer ["pages · только собирают экраны"]
    direction LR
    landing["<b>landing</b><br/>4 экрана, шапка, фон"]
    notFound["<b>not-found</b><br/>страница 404"]
  end

  subgraph widgetsLayer ["widgets · то, что видит пользователь"]
    direction LR
    header["<b>header</b><br/>меню на экраны 2–4"]
    hero["<b>hero</b><br/>смена слова · CSS"]
    tasks["<b>tasks</b><br/>MULTI-TASKS"]
    benefits["<b>benefits</b><br/>бегущая строка · CSS"]
    multiply["<b>multiply</b><br/>MULTIPLY WITH US<br/>Scroll to top"]
    background["<b>background</b><br/>фон и затемнение · CSS"]
    preloader["<b>preloader</b><br/>логотип и процент"]
  end

  subgraph featuresLayer ["features · то, с чем взаимодействуют"]
    direction LR
    snap["<b>snap-scroll</b><br/>колесо, якорь, GSAP"]
    form["<b>contact-form</b><br/>модалка, RHF, отправка"]
    locale["<b>locale-switch</b><br/>меняет / на /ru"]
  end

  subgraph sharedLayer ["shared · общий низ, не знает верхние слои"]
    direction LR
    api["<b>api</b><br/>fetch + x-api-key<br/>benefits, tasks, multiply, form"]
    i18n["<b>i18n</b><br/>словари подписей"]
    ui["<b>ui</b><br/>кнопки"]
    assets["<b>assets</b><br/>иконки"]
  end

  router --> landing
  router --> notFound
  landing --> header & hero & tasks & benefits & multiply & background & preloader
  landing --> snap
  header --> snap
  header --> locale
  hero --> form
  multiply --> form
  multiply --> snap
  tasks & benefits & multiply --> api
  form --> api
  form --> i18n
  locale --> i18n
  form --> ui
  header --> assets

  classDef appNode fill:#EDE4FF,stroke:#874FFF,color:#1E1E1E
  classDef pageNode fill:#E1F1FF,stroke:#3DADFF,color:#1E1E1E
  classDef widgetNode fill:#FFF4D6,stroke:#E8A302,color:#1E1E1E
  classDef featureNode fill:#FFE0F4,stroke:#F849C1,color:#1E1E1E
  classDef sharedNode fill:#DDF7E1,stroke:#3E9B4B,color:#1E1E1E

  class router,styles appNode
  class landing,notFound pageNode
  class header,hero,tasks,benefits,multiply,background,preloader widgetNode
  class snap,form,locale featureNode
  class api,i18n,ui,assets sharedNode

  style appLayer fill:#F7F2FF,stroke:#874FFF
  style pagesLayer fill:#F2F9FF,stroke:#3DADFF
  style widgetsLayer fill:#FFFBF0,stroke:#E8A302
  style featuresLayer fill:#FFF3FB,stroke:#F849C1
  style sharedLayer fill:#F1FCF3,stroke:#3E9B4B
```

| Слой       | Зачем                               | Что лежит                          |
| ---------- | ----------------------------------- | ---------------------------------- |
| `app`      | Запустить сайт и выбрать страницу   | Роутер, глобальные стили           |
| `pages`    | Собрать экраны в одну страницу      | Лендинг, 404                       |
| `widgets`  | Показать то, что видит пользователь | 4 экрана, шапка, фон, прелоадер    |
| `features` | Обработать действие пользователя    | Перелистывание, форма, смена языка |
| `shared`   | Дать общее всем слоям выше          | Запросы, словарь, кнопки, иконки   |

Языки не отдельные страницы: тот же лендинг открывается на `/` и `/ru`. Номер экрана в адрес не входит, его держит `snap-scroll` и читает якорь, например `#join`.
