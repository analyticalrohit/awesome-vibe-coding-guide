### Version Control and Deployment

- **Commit Early and Often**: 
    - Push your progress to GitHub regularly. 
    - This protects your work and tracks your project's history. 
    - You can also ask the agent to handle commits for you.

- **Deploy Early**: 
    - Use platforms like Vercel to deploy your app early and catch deployment issues.

- **Confirm What Goes Live**:
    - Build the production output before publishing; a local development server is not a deployed website.
    - For an account-connected option, [Shipvela's publishing skill](https://github.com/stefanautomateed/shipvela-codex/tree/main/plugins/shipvela/skills/publish) stages a small static site for owner review, then tracks the accepted deployment. It requires a Shipvela account and uses hosting allowance.
    - Review the target project and public file list. Keep `.env` files and credentials out of the upload; never place a server-only secret in browser code.
    - Treat queued or building as unfinished. Verify the successful job and its HTTPS URL, then test a deep link and a hard refresh before sharing it.
