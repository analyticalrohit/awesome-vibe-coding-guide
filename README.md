<p align="center">
  <a href="https://www.linkedin.com/in/analyticalrohit" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="https://awesomeneuron.substack.com/" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/Substack-%23006f5c.svg?style=for-the-badge&logo=substack&logoColor=FF6719" alt="Substack">
  </a>
   <a href="https://x.com/_rohit_tiwari_" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/X-%23000000.svg?style=for-the-badge&logo=X&logoColor=white" alt="X">
  </a>
     <a href="https://www.youtube.com/@awesomeneuron?sub_confirmation=1" style="text-decoration:none;">
    <img src="https://img.shields.io/badge/YouTube-%23FF0000.svg?style=for-the-badge&logo=YouTube&logoColor=white" alt="Youtube">
  </a>
     <a href="https://topmate.io/analyticalrohit" style="text-decoration:none;">
    <img src="https://raw.githubusercontent.com/analyticalrohit/analyticalrohit/refs/heads/main/assets/topmate_logo.png" alt="Topmate">
  </a>
</p>

# Awesome Vibe Coding Guide

Become a 10x Vibe Coder with this awesome guide to vibe coding. This repository compiles best practices, and tips for efficient and controlled AI-assisted coding, drawing from experiences with tools like Cursor. Vibe coding emphasizes a intuitive flow between human developers and AI, ensuring productivity without losing control.

<p align="center">
  <a href="https://awesomeneuron.substack.com/">
    <img src="./assets/awesome_vibe_coding_guide.gif">
  </a>
</p>

Whether you're using Cursor, windsurf, lovable or other AI tools, these guidelines help you maintain clarity, avoid common pitfalls, and build high-quality code iteratively.

## What is Vibe Coding?

Vibe coding is a mindset for AI assisted development where you "vibe" with the AI; leveraging its strengths while guiding it with clear instructions and iterative refinements. It's about creating a smooth workflow that feels natural, reduces errors, and increases your coding speed.

#### Key principles:

- **Clarity first**: Always provide detailed, structured prompts to the AI.
- **Iterative control**: Break tasks into small steps and review outputs.
- **Human oversight**: AI suggests; you decide and refine.

## Best Practices for Vibe Coding

### 1. Setup and Planning

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

### 2. Assisted Coding and Prompting

- **Use Agent Mode**: 
    - Turn on Agent mode to perform file-wide edits, generate tests, manage files, and even run CLI commands directly from the terminal through natural language commands.

- **Prompt with Clarity**: 
    - Be specific in your requests. For example, instead of `fix the sidebar`, use `Update Sidebar to include X behavior under Y condition`. 
    - Provide sample inputs, expected outputs, and edge cases to get the best results.
    - If you're making a big change like major refactoring or adding complex features. Encourage deeper thinking by using phrases such as `Think hard`, `Think deep`, `Think longer`.
    - Document effective prompts, keep a record of prompts that work best and reuse them often.

- **Keep Chats Focused**: 
    - Create a new, clean chat for each distinct task. 
    - This prevents the AI's context from getting confused or hallucinating.

- **Reset Context When Needed**: 
    - If the AI starts getting confused, renaming files incorrectly, or sharing irrelevant errors, don't hesitate to start fresh with a New chat. 
    - Resetting the context cleans the AI's state and often resolves the issue.

### 3. Testing and Debugging

- **Run and Test Frequently**: 
    - Use local servers to run and test your app. 
    - Test often to catch issues as soon as they appear.

- **Let the AI Fix Errors**: 
    - When you encounter an error, copy the exact error message from your console and paste it into the AI agent. 
    - If the first fix doesn't work, explain the outcome and try again. 
    - The AI is often capable of resolving it .

- **Iterate and Refine**:
    - Embrace rapid iteration.
    - Don't worry about perfect designs initially.
    - Improve them step by step.

### 4. Version Control and Deployment

- **Commit Early and Often**: 
    - Push your progress to GitHub regularly. 
    - This protects your work and tracks your project's history. 
    - You can also ask the agent to handle commits for you .

- **Deploy Early**: 
    - Use platforms like Vercel to deploy your app early and catch deployment issues.

## Important Note

When you use AI generated code, also focus on learning, not just running. Keep these points in mind:

- Learn on the go.
- Don’t just paste in code that works.
- Pause and ask yourself why it does what it does.
- If you’re unsure, ask AI to explain how it works.

Keep thinking, be curious, and use AI to increase your coding speed and deepen your knowledge.

## Contributing

We welcome contributions from the community! If you have a vibe coding best practice, tip, or improvement to suggest:

Please include changes in the relevant folders.

- [Setup and Planning](./setup_and_planning_guide/README.md)
- [Coding and prompting](./coding_and_prompting_guide/README.md)
- [Testing and Debugging](./testing_and_debugging_guide/README.md)
- [Version and Deployment](./version_and_deployment/README.md)

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingBestPractice`
3. Commit your changes: `git commit -m 'Add some AmazingBestPractice'`
4. Push to the branch: `git push origin feature/AmazingBestPractice`
5. Open a pull request

Thank you for helping us make vibe coding guide awesome!

## Newsletter
<div style="text-align: left;">
📌 Join 2000+ ML enthusiasts and professionals from 100 countries.<br>
✅ Learn AI for FREE with visuals, easy-to-follow insights.<br>
✅ Get cutting-edge topics like GenAI, RAGs, and LLMs in your inbox every week.
</div>
<br>
<div align="center">

[![Subscribe to AwesomeNeuron Newsletter](https://raw.githubusercontent.com/analyticalrohit/analyticalrohit/5ab83e498b11eefe57c91bc4f4cac10414276920/assets/subscribe_button.svg)](https://awesomeneuron.substack.com/)

</div>
<div style="text-align: left;">
    <a href="https://awesomeneuron.substack.com/">
        <img src="https://raw.githubusercontent.com/analyticalrohit/analyticalrohit/refs/heads/main/assets/awesomeneuron_logo.png" alt="AwesomeNeuron Newsletter">
</div>
<p align="center">
  <a href="https://awesomeneuron.substack.com/">
    <img src="https://raw.githubusercontent.com/analyticalrohit/analyticalrohit/refs/heads/main/assets/awesomeneuron_blog.gif" alt="AwesomeNeuron Newsletter">
  </a>
</p>

## License

This project is licensed under [MIT License](LICENSE).

---

⭐️ If you find this repository helpful, please consider giving it a star!