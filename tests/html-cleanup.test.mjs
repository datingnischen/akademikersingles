import assert from "node:assert/strict";
import test from "node:test";
import { limitStrong, withoutHeadingSkips } from "../lib/html-cleanup.ts";

test("heading levels never skip and siblings stay siblings", () => {
  assert.equal(
    withoutHeadingSkips("<h2>A</h2><h4>B</h4><h4>C</h4><h3>D</h3><h2>E</h2><h5>F</h5>"),
    "<h2>A</h2><h3>B</h3><h3>C</h3><h3>D</h3><h2>E</h2><h3>F</h3>",
  );
  assert.equal(withoutHeadingSkips('<h3 id="x">Erste</h3>'), '<h2 id="x">Erste</h2>');
});

test("strong tags are capped, deduplicated and empty ones keep the word gap", () => {
  const html = "<strong>a</strong><strong>b</strong><strong>a</strong><strong>c</strong><strong>d</strong><strong>e</strong>";
  assert.equal(limitStrong(html), '<strong>a</strong><strong>b</strong><span class="em-strong">a</span><strong>c</strong><strong>d</strong><span class="em-strong">e</span>');
  assert.equal(limitStrong("Nachhaltige<strong> </strong>französische"), "Nachhaltige französische");
});
