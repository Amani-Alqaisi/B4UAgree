# B4UAgree - Empowering Your Online Privacy!

## Project Overview:
B4UAgree is a browser extension plug-in designed to enhance user awareness and understanding of privacy policies encountered during online browsing. Our goal is to empower users to make informed decisions about their online privacy by providing real-time analysis and summaries of privacy policies.

### Use Cases:
Operational Use Cases:
1. Real-time analysis and summary of privacy policies encountered during online browsing.

## Repository Layout:
**Current Contents:**
  * [/sprints](./sprints): Directory containing sprint-related documents.
  * [/test-privacy](./test-privacy): Directory for privacy-related testing.
  * [/nlp-backend](./nlp-backend): Directory that houses backend logic for Natural Language Processing.
  * [/B4UAgree-Extension](./B4UAgree-Extention): Directory containing the front-end setup for the B4UAgree browser extension.
  * [/tutorial_test](./tutorial_test): Directory for practicing with JSON message passing.
  * [/Extension_BEST_FINAL](./Extension_BEST_FINAL): Directory containing the current working version of the extension.
  * `.DS_Store`: System file (Desktop Services Store)  


#### Web Server - Building The System, Adding Chrome Extension:
1. Download the Extension_BEST_FINAL folder from this GitHub repo to your PC. 
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

### Local Server [Outdated] - Building the System:
1. Download or pull the code from the designated repository.
2. Install required libraries/programs:
   - Python: Download and install Python.
   - Install Python libraries using pip:
     ```
     pip install -U sentence-transformers
     pip install Flask
     pip install flask_cors
     pip install bs4
     pip install bert-extractive-summarizer
     ```
   - If encountering permissions errors, add "--user" to the end of the pip install command.
3. Run the Flask controller by executing flask_controller.py in your preferred code editor or terminal. Ensure that the Flask server is running on your computer.

## Issue Tracking:
We use a [Trello board](https://trello.com/invite/b/yHP9CPjB/ATTI94bb9185c9e2341b7aa2fe8585214bb5811623F3/b4uagree) for issue tracking. Each sprint planning report creates a set of Trello cards that map to specific tasks assigned to team members. We prioritize transparency and collaboration by encouraging the community to contribute, report issues, or suggest improvements through our Trello board.

## Navigating Sprints:
- Sprint planning and review reports are found in the [/sprints](./sprints) directory.
- Each sprint corresponds to a milestone, and tasks for the sprint are created as cards on our Trello board.
- The progress of each sprint can be tracked through the [Trello board](https://trello.com/invite/b/yHP9CPjB/ATTI94bb9185c9e2341b7aa2fe8585214bb5811623F3/b4uagree) associated with the project.

Thank you for being a part of B4UAgree, where online privacy meets transparency! 🌐🔒