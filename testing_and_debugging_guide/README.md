### Testing and Debugging

- **Run and Test Frequently**: 
    - Use local servers to run and test your app. 
    - Test often to catch issues as soon as they appear.

- **Let the AI Fix Errors**: 
    - When you encounter an error, copy the exact error message from your console and paste it into the AI agent. 
    - If the first fix doesn't work, explain the outcome and try again. 
    - The AI is often capable of resolving it.

- **Inspect Agent Runs**:
    - When an AI task is slow, costly, or repeatedly failing, review the saved session logs instead of judging only the final answer.
    - Tools like [agenttrace](https://github.com/luoyuctl/agenttrace) can surface token usage, cost, latency gaps, tool failures, and retry loops across local Claude Code, Codex CLI, Gemini CLI, Aider, Cursor, Qwen Code, Cline, OpenCode/OpenClaw, and Kimi CLI session logs.

- **Iterate and Refine**:
    - Embrace rapid iteration.
    - Don't worry about perfect designs initially.
    - Improve them step by step.
