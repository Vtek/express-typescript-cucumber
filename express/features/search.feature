Feature: Search on Google
  As a user, i want to search something on Google

  Scenario: Search with a value
    Given these websites on the web
    | Url                | Title | Description |
    | https://www.typescriptlang.org/ | TypeScript - JavaScript that scales. | TypeScript brings you optional static type-checking along with the latest ECMAScript features. |
    | https://github.com/Microsoft/TypeScript| GitHub - Microsoft/TypeScript: TypeScript is a superset of JavaScript | TypeScript is a language for application-scale JavaScript. TypeScript adds optional types, classes, and modules to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. |
    | https://cucumber.io/ | Cucumber | Cucumber makes your team amazing. At a glance, Cucumber might just look like another tool for running automated tests. But it's more than that. A single source of truth. Cucumber merges specification and test documentation into one cohesive whole. Living documentation. |
    | https://en.wikipedia.org/wiki/Cucumber_(software) | Cucumber (software) - Wikipedia | Cucumber is a software tool used by computer programmers for testing other software. It runs automated acceptance tests written in a behavior-driven development (BDD) style. Central to the Cucumber BDD approach is its plain language parser called Gherkin. |
    | https://www.npmjs.com/package/cucumber-tsflow|cucumber-tsflow - npm|Bindings provide the automation that connects a specification step in a Gherkin feature file to some code that executes for that step. When using Cucumber with TypeScript you can define this automation using a 'binding' class: import { binding } from "cucumber-tsflow";|
    | https://nodejs.org/|Node.js|Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.|
    | https://github.com/Azure/azure-sdk-for-node | Azure SDK for Node.js - GitHub | Azure SDK for Node.js - Documentation. Contribute to azure-sdk-for-node development by creating an account on GitHub. |
    When I search for "TypeScript" on Google
    Then results are
     | Url                | Title | Description |
    | https://www.typescriptlang.org/ | TypeScript - JavaScript that scales. | TypeScript brings you optional static type-checking along with the latest ECMAScript features. |
    | https://github.com/Microsoft/TypeScript| GitHub - Microsoft/TypeScript: TypeScript is a superset of JavaScript | TypeScript is a language for application-scale JavaScript. TypeScript adds optional types, classes, and modules to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. |
    | https://www.npmjs.com/package/cucumber-tsflow|cucumber-tsflow - npm|Bindings provide the automation that connects a specification step in a Gherkin feature file to some code that executes for that step. When using Cucumber with TypeScript you can define this automation using a 'binding' class: import { binding } from "cucumber-tsflow";|