# Contributing to Awesome Image-Based Profiling

We welcome contributions of new papers, software, and reviews!

## How to Add a Resource

We use a Python script to automate metadata fetching and ensure data consistency.

### Prerequisites

1. Python 3.10+
2. Install dependencies:
   ```bash
   pip install requests
   ```

### Steps

1. **Fork** this repository.
2. Open your terminal in the repository root.
3. Run the management script:
   ```bash
   python scripts/manage_resources.py
   ```
4. Follow the prompts:
   - Paste the **DOI** of the paper (e.g., `10.1038/nmeth.4397`).
   - Select the appropriate **Category**.
   - Write a short, high-quality **Summary**.
5. The script will automatically update and sort `data/resources.json`.
6. Commit your changes:
   ```bash
   git add data/resources.json
   git commit -m "Add paper: [Paper Title]"
   ```
7. Open a **Pull Request**.

## Categories

- **Biology**: Papers focusing on biological discoveries made using profiling.
- **Software**: Tools, libraries, and protocols (e.g., CellProfiler, PyCytominer).
- **Reviews**: High-level overviews of the field.
- **Influential Papers**: Foundational texts that defined the field.
