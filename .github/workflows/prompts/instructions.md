---
mode: agent
description: "Manually test a site and create a report"
tools: ['changes', 'search/codebase', 'edit/editFiles', 'fetch', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'search/searchResults', 'runCommands/terminalLastCommand', 'runCommands/terminalSelection', 'testFailure', 'microsoft/playwright-mcp/*']
model: 'Claude Sonnet 4.5'
---

Example report format:

- **Scenario:** [Brief description]
- **Steps Taken:** [List of actions performed]
- **Outcome:** [What happened, including any assertions or accessibility checks]
**Issues Found:** [List any problems or unexpected results]

Generate a .md file with the report in th `manual-tests` directory and include any relevant screenshots or snapshots.

Take screenshots or snapshots of the page if necessary to illustrate issues or confirm expected behavior. close the browser after completing the manual test.