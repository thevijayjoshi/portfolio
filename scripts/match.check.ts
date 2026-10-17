// Sanity check for the assistant's keyword matching. Run: npm run check (Node 22.18+ runs .ts directly).
import assert from "node:assert/strict";
import { answerQuestion, matchAnswer, matchJobDescription, mentions, projectsUsing } from "../src/lib/match.ts";
import { projects } from "../src/data/projects.ts";

assert.ok(mentions("Built with Java", "Java"));
assert.ok(!mentions("Built with JavaScript", "Java"));
assert.ok(!mentions("as he said", "ai"));
assert.ok(!mentions("the rest of the team", "REST"));

assert.equal(matchAnswer("What's his notice period?")?.id, "private");
assert.equal(matchAnswer("Is he looking for AI jobs?")?.id, "private");
assert.equal(matchAnswer("What AI work has he done?")?.id, "ai");
assert.equal(matchAnswer("Has he built multi-tenant SaaS?")?.id, "tenancy");
assert.equal(matchAnswer("Does he know FHIR?")?.id, "interop");
assert.equal(matchAnswer("Is he good with React and Node?")?.id, "stack");
assert.equal(matchAnswer("qwerty"), undefined);

const jd = matchJobDescription(
  "We need React, Node.js and PostgreSQL. Bonus: Python, GraphQL, Kafka. Healthcare SaaS, rest of the stack is up to you.",
);
assert.deepEqual(jd.missing.sort(), ["GraphQL", "Python"]);
for (const term of ["React", "Node.js", "PostgreSQL", "Kafka", "Healthcare", "SaaS"]) assert.ok(jd.matched.includes(term), term);
assert.ok(!jd.matched.includes("REST APIs"));

assert.deepEqual(projectsUsing("Kafka", projects).map((p) => p.id), ["case-compass"]);
assert.deepEqual(projectsUsing("Stripe", projects).map((p) => p.id), ["case-everbetter", "case-primaryplus"]);

// Named technologies get a direct answer, with honest gaps.
assert.equal(answerQuestion("does he know kubernetes and graphql")?.text, "GraphQL and Kubernetes aren't on his list yet.");
assert.match(answerQuestion("Has he used Docker?")?.text ?? "", /Docker: yes, it's on his resume/);
assert.match(answerQuestion("Does he know React and Python?")?.text ?? "", /React: yes, used in WellQor Compass, Primary Plus and UnityHealth360\.\nPython isn't on his list yet\./);
assert.equal(answerQuestion("Does he know Kafka?")?.text, matchAnswer("Does he know Kafka?")?.answer);
assert.match(answerQuestion("What's his salary expectation?")?.text ?? "", /best discussed with Vijay directly/);
assert.ok(!answerQuestion("tell me the rest of it")?.text.includes("REST"));

console.log("match checks passed");
