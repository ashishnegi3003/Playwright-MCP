---
mode: agent
description: "Manually test a site and create a report"
tools: ['changes', 'search/codebase', 'edit/editFiles', 'fetch', 'openSimpleBrowser', 'problems', 'runCommands', 'runTasks', 'runTests', 'search', 'search/searchResults', 'runCommands/terminalLastCommand', 'runCommands/terminalSelection', 'testFailure', 'microsoft/playwright-mcp/*']
model: 'Claude Sonnet 4.5'
---

Instructions:
- Create a folder under `manual-tests` named testexecution{x}, where {x} is the test case number or ID.
- Use the Playwright MCP Server to navigate to the website and run testcase{x} and take SCREENSHOT for each step utilizing `browser_screenshot` tool and save pngs into testexecution{x} directory
- Create testresults{x}.md file inside testexecution{x} directory and document -
    - the scenario
    - steps taken along with embedded screenshots for each step
    - final outcome
    - any issues alogn with embedded screenshot for all unique issues
- Take screenshot pngs if any issur or error occurs with unique png name for each issue or error storing inside testexecution{x} folder


Example report format:

- **Scenario:** [Brief description]
- **Steps Taken:** [List of actions performed]
- **Outcome:** [What happened, including any assertions or accessibility checks- include embedded screenshots for each step]
**Issues Found:** [List any problems or unexpected results include embedded screenshot if needed]

Notes:
- Take screenshots or snapshots of the page if necessary to illustrate issues or confirm expected behavior. close the browser after completing the manual test.
- Use a separate testexecution{x} folder and a separate testevidence{x}.md file for each test case.
- Report back in clear, natural language:
    - What steps you performed (navigation, interactions, assertions).
    - What you observed (outcomes, UI changes, accessibility results).
    - Any issues, unexpected behaviors, or accessibility concerns found.
    - Reference URLs, element roles, and relevant details to support your findings.