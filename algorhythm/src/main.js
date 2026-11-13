import { MyArray } from "../../MyArray/MyArray.js";
import { runTests } from "./tests.js";

const PERFORMANCE_ELEMENTS = 5000;

function element(tag, text, className) {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}

function renderTests(app) {
  const results = runTests();
  const failed = results.filter((result) => !result.passed).length;

  app.append(element("h1", "MyArray tests"));
  app.append(
    element(
      "p",
      `${results.length - failed} of ${results.length} tests passed`,
      failed ? "fail" : "pass",
    ),
  );

  const list = element("ul");
  for (const { name, passed, actual, expected } of results) {
    const details = passed ? "" : ` (expected ${expected}, got ${actual})`;
    list.append(
      element("li", `${passed ? "PASS" : "FAIL"} ${name}${details}`, passed ? "pass" : "fail"),
    );
  }
  app.append(list);
}

function renderPerformance(app) {
  const timings = new MyArray(PERFORMANCE_ELEMENTS).performance();

  app.append(element("h2", "Sorting performance"));
  const table = element("table");
  const header = element("tr");
  header.append(element("th", "Algorithm"), element("th", "Elements"), element("th", "Time (ms)"));
  table.append(header);
  for (const { algorithm, elements, milliseconds } of timings) {
    const row = element("tr");
    row.append(
      element("td", algorithm),
      element("td", elements),
      element("td", milliseconds.toFixed(3)),
    );
    table.append(row);
  }
  app.append(table);
}

const app = document.querySelector("#app");
renderTests(app);
renderPerformance(app);
