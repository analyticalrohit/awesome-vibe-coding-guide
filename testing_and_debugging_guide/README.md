### Testing and Debugging

- **Run and Test Frequently**: 
    - Use local servers to run and test your app. 
    - Test often to catch issues as soon as they appear.

- **Let the AI Fix Errors**: 
    - When you encounter an error, copy the exact error message from your console and paste it into the AI agent. 
    - If the first fix doesn't work, explain the outcome and try again. 
    - The AI is often capable of resolving it.

- **Iterate and Refine**:
    - Embrace rapid iteration.
    - Don't worry about perfect designs initially.
    - Improve them step by step.

- **Stop UI Slop With a Finish Gate**:
    - Before implementation, define a small design contract: product intent, visual rules, reference screens, and required interaction states.
    - Review the result at phone and desktop widths, including empty, loading, error, disabled, and success states.
    - Reject stock card grids, placeholder copy, decorative effects, or interactions that could belong to any product.
    - Give the agent screenshot evidence and exact mismatches, then require another pass until every mismatch is resolved.
    - A public UI reference library and reusable agent finish-gate workflow are available at https://uizze.com.
