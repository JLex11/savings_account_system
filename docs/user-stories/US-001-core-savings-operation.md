# US-001 - Core Savings Operation

## User Story
As a system user,  
I want to execute the main savings operation (deposit or withdrawal),  
so that I get a correct, reliable, and validated result according to business rules.

## Functional Acceptance Criteria
1. Given the user enters valid data, when the main operation is executed, then the system processes the operation correctly.
2. The system must validate business rules before confirming the operation.
3. The system must display a clear result to the user:
   - Operation confirmation.
   - Error message in case of failure.
4. Input data must be validated:
   - Required fields.
   - Valid numeric values.
   - Invalid non-numeric values.
   - Allowed ranges.
5. Source code must be written completely in English.
6. The project must use a consistent naming convention (camelCase, snake_case, or PascalCase) according to each context.
7. The codebase must be hosted in a remote repository.

## Definition Of Done
- The operation can be executed from the SaveCash UI.
- API endpoints return consistent success and error responses.
- Validation errors are shown with clear user-facing messages.
- Code changes follow the selected naming conventions and English-only code identifiers/messages where applicable.
- Changes are committed and pushed to the GitHub remote repository.
