# B4UAgree - Empowering Your Online Privacy!

## Project Overview:
B4UAgree is a browser extension plug-in designed to enhance user awareness and understanding of privacy policies encountered during online browsing. Our goal is to empower users to make informed decisions about their online privacy by providing real-time analysis and summaries of privacy policies.

### Use Cases:
Operational Use Cases:
1. Real-time analysis and summary of privacy policies encountered during online browsing.

## Repository Layout:
**Current Contents:**
  * [/sprints](./sprints): Directory containing sprint-related documents.
  * [/MVP_FrontEnd](./MVP_FrontEnd): MVP Directory containing the final version of the extension.
 
  * `.DS_Store`: System file (Desktop Services Store)  
 * note all backend code is in our backend repo https://github.com/coder2343/B4UAgree_backend

#### Web Server - Building The System, Adding Chrome Extension:
1. Download the MVP_FrontEnd folder from this GitHub repo to your PC. 
2. Open the Chrome Browser.
3. Navigate to the puzzle piece icon in the upper right-hand corner and click.
4. Click "Manage Extensions" in the drop-down options.
5. Toggle "Developer Mode" to the right (should become blue).
6. Click "Load unpacked" and select the folder downloaded from the GitHub repository on your computer.
7. If encountering configuration errors, remove the "_pycache_" folder from the extension folder and repeat the steps.
8. Local Server [Outdated]: If errors persist, adjust the localhost address in content.js to reflect your PC's IP address.

#### Using Chrome Extension - Running/Testing The System:
1. Navigate to a webpage, preferably with a cookie policy (e.g., Barnes and Noble).
2. Click the puzzle piece in the right-hand corner.
3. Select B4UAgree from the drop-down menu.
4. A popup will appear within a minute (or less) with the privacy policy summary.
5. Note: The extension may not work on every site due to difficulties in finding a privacy policy, but an error screen should appear.

### Local Backend server
1. see the backend repo https://github.com/coder2343/B4UAgree_backend

## Issue Tracking:
We use a [Trello board](https://trello.com/invite/b/yHP9CPjB/ATTI94bb9185c9e2341b7aa2fe8585214bb5811623F3/b4uagree) for issue tracking. Each sprint planning report creates a set of Trello cards that map to specific tasks assigned to team members. We prioritize transparency and collaboration by encouraging the community to contribute, report issues, or suggest improvements through our Trello board.

## Navigating Sprints:
- Sprint planning and review reports are found in the [/sprints](./sprints) directory.
- Each sprint corresponds to a milestone, and tasks for the sprint are created as cards on our Trello board.
- The progress of each sprint can be tracked through the [Trello board](https://trello.com/invite/b/yHP9CPjB/ATTI94bb9185c9e2341b7aa2fe8585214bb5811623F3/b4uagree) associated with the project.

## Acknowledgments

We would like to acknowledge the following tools and inspirations:

- **Privacy Policy Score Calculation**: The `privacy_policy_score` file is based on the work from the [privacy-policy-evaluator](https://github.com/JPAntonisse/privacy-policy-evaluator) repository.
- **Flask Framework**: This project utilizes the Flask framework for building web applications. We are grateful to the Flask community for their excellent documentation and support.

Thank you for being a part of B4UAgree, where online privacy meets transparency! 🌐🔒
