### Setup and Planning

- **Start from a Template**: 

    - Begin your project by cloning a template from GitHub or another source to provide a solid foundation. 
    - e.g. On Cursor, you can use the `Start from Repo` feature. 

- **Create a Comprehensive Plan**: 
    - Use an AI assistant like Claude or ChatGPT to create a detailed plan in markdown. 
    - Ask it clarifying questions and have it critique its own plan, then regenerate until it's solid. 
    - This plan becomes your instruction manual for the coding process. Save this plan in `plan.md` (or `Claude.md` if you run `/init` in Cursor) so the AI can reference it anytime.

- **Secure Your Secrets**: 
    - Always store API keys, tokens, and other sensitive data in environment files (`.env`). 
    - Never hard-code them directly into your source code. 
    - Add `.env*` and `/secrets` to `.gitignore`.
