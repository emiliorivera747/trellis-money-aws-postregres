# Information Security Policy
**Organization:** Trellis Money  
**Version:** 1.0  
**Effective Date:** April 30, 2026  
**Last Reviewed:** April 30, 2026  
**Next Review Date:** April 30, 2027  
**Policy Owner:** Emilio Rivera  
**Approved By:** Emilio Rivera, Founder & CEO  

---

## 1. Purpose

This policy establishes the information security requirements for Trellis Money to protect the confidentiality, integrity, and availability of company and customer data. It defines how we identify, mitigate, and monitor information security risks across our systems, infrastructure, and third-party integrations — including financial data accessed via Plaid.

---

## 2. Scope

This policy applies to:
- All Trellis Money employees, contractors, and consultants
- All systems, services, and data owned or operated by Trellis Money
- All third-party vendors and integrations that access or process Trellis Money data

**In-scope systems include:**
- Production application hosted on Vercel
- AWS RDS PostgreSQL database
- Supabase authentication services
- Plaid financial data integration
- Stripe payment processing
- Cloudinary media storage
- Source code repository (GitHub)
- Development, staging, and production environments

---

## 3. Information Classification

All data handled by Trellis Money is classified into one of four tiers:

| Classification | Description | Examples |
|---|---|---|
| **Public** | Intentionally shared with the public | Marketing content, public pricing |
| **Internal** | Internal business use only | Internal documentation, team communications |
| **Confidential** | Sensitive business or user data requiring protection | User PII, email addresses, account metadata |
| **Restricted** | Highest sensitivity; regulated or financial data | Bank account numbers, Plaid tokens, transaction history, Stripe payment data |

**Rule:** All data sourced from Plaid, Stripe, or AWS RDS is classified as **Restricted** by default.

---

## 4. Access Control

### 4.1 Principle of Least Privilege
Access to systems and data is granted on a need-to-know basis. No user or service account is granted more access than required to perform their function.

### 4.2 System Access
- **Vercel:** Only authorized team members may access the Vercel dashboard. Production environment variables (including `DATABASE_URL`, `PLAID_SECRET`, `STRIPE_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`) are stored as encrypted Vercel environment variables and never committed to source code.
- **AWS RDS:** Database access is restricted to the application service role and authorized engineers via IAM. Direct public access to the RDS instance is disabled. VPC security groups restrict inbound connections.
- **GitHub:** Repository access is limited to active team members. The repository is set to private. Secrets are never committed to the repository; a `.gitignore` file and pre-commit checks enforce this.
- **Supabase:** Service role keys are stored only as server-side environment variables and never exposed to the client.
- **Plaid:** Access tokens and item IDs are stored in the database with restricted access; Plaid secrets are stored only in server-side environment variables.
- **Stripe:** Secret keys are server-side only. Webhook signing secrets are validated on all incoming webhook requests.
- **Cloudinary:** Upload presets and API secrets are restricted to server-side usage only.

### 4.3 Authentication Requirements
- Multi-factor authentication (MFA) is required for: Vercel, AWS, GitHub, Supabase dashboard, and Stripe dashboard
- Passwords must meet a minimum strength score (enforced via `zxcvbn` in the application) and are hashed using `bcrypt` before storage
- User sessions are managed through Supabase Auth with server-side session validation

### 4.4 Access Reviews
- Access to all production systems is reviewed quarterly
- Access is revoked within 24 hours of an employee or contractor departure
- A record of active access grants is maintained and reviewed by the Policy Owner

---

## 5. Data Handling and Encryption

### 5.1 Encryption in Transit
- All data in transit is encrypted using TLS 1.2 or higher
- Vercel enforces HTTPS on all endpoints; HTTP requests are automatically redirected
- Database connections to AWS RDS use SSL/TLS

### 5.2 Encryption at Rest
- AWS RDS storage encryption is enabled on the production database
- Supabase encrypts stored user credentials
- Plaid item tokens stored in the database are treated as Restricted data

### 5.3 Sensitive Data Handling
- Plaid `access_token` and `item_id` values are stored in the database but never logged or returned to the client
- Full bank account numbers are never stored; only masked versions or metadata provided by Plaid are retained
- Stripe handles all raw card data via Stripe.js; Trellis Money never processes or stores raw card numbers
- Passwords are never stored in plaintext; only `bcrypt` hashes are stored

### 5.4 Data Retention and Deletion
- User financial data retrieved via Plaid is retained only as long as necessary to provide the service
- Upon account deletion, user data is removed from the production database within 30 days
- Plaid items are de-authorized via the Plaid API upon account deletion

---

## 6. Vulnerability and Dependency Management

- Dependencies are tracked via `pnpm-lock.yaml` and reviewed for known vulnerabilities using automated tooling (e.g., `npm audit` / GitHub Dependabot)
- Critical and high-severity vulnerabilities in dependencies are addressed within 30 days of disclosure
- The codebase undergoes code review before any changes are merged to the main branch
- Database schema changes are managed through Drizzle migrations and reviewed before being applied to production

---

## 7. Incident Response

### 7.1 What Constitutes a Security Incident
- Unauthorized access to Trellis Money systems or data
- Suspected or confirmed exposure of Restricted data (Plaid tokens, user financials, Stripe data)
- Compromised credentials for any production system
- Unexpected data modification or deletion in the production database

### 7.2 Response Steps
1. **Contain** — Immediately revoke compromised credentials, rotate affected secrets, disable affected accounts or services as needed
2. **Assess** — Determine what data was accessed, the scope of impact, and how access occurred
3. **Notify** — If user data or Plaid data was involved, notify affected users and relevant third parties (Plaid, Stripe) within 72 hours per applicable requirements
4. **Remediate** — Fix the root cause, rotate all potentially affected secrets, and document the incident
5. **Review** — Conduct a post-incident review within 5 business days to identify process improvements

### 7.3 Contact
Security incidents should be reported immediately to: **emiliorivera@trellismoney.com**

---

## 8. Third-Party Vendor Management

Trellis Money uses the following approved third-party vendors that access or process sensitive data:

| Vendor | Purpose | Data Accessed |
|---|---|---|
| **Plaid** | Financial account linking and data aggregation | Bank account data, transaction history |
| **Stripe** | Payment processing | Payment method metadata |
| **AWS (RDS)** | Database hosting | All application data |
| **Vercel** | Application hosting and deployment | Application code, environment variables |
| **Supabase** | Authentication and user management | User credentials, session tokens |
| **Cloudinary** | Media storage | User-uploaded assets |

All third-party vendors are evaluated for security practices prior to integration. Vendor access is limited to the minimum required for the integration to function. Vendor security policies are reviewed annually or upon material changes to the integration.

---

## 9. Physical Security

- All development work is performed on company-controlled or personally-owned devices with full-disk encryption enabled (FileVault on macOS)
- Device screen locks are enabled and trigger after 5 minutes of inactivity
- Sensitive data is not stored on local devices beyond what is required for active development; production credentials are not stored in plaintext on local machines
- Lost or stolen devices are reported immediately so production access credentials can be rotated

---

## 10. Acceptable Use

- Company systems and infrastructure are used for legitimate business purposes only
- Production environment variables and secrets are never shared via email, Slack, or any unencrypted channel; a secrets manager or encrypted channel is used
- Development and staging environments do not use real user data; test data or anonymized data is used instead
- Source code containing hardcoded secrets or credentials must not be committed; pre-commit hooks enforce this

---

## 11. Security Awareness and Training

- All team members review this policy upon joining and annually thereafter
- Team members are briefed on phishing awareness and secure credential handling
- This policy is stored in the company's private GitHub repository and version-controlled to maintain an audit trail of reviews and changes

---

## 12. Risk Assessment

An annual security risk assessment is conducted to:
- Identify new threats relevant to the application and infrastructure
- Evaluate the effectiveness of existing controls
- Prioritize remediation of identified gaps

Risk assessment findings are documented and tracked to resolution. The next scheduled review is **April 30, 2027**.

---

## 13. Policy Compliance and Exceptions

Violations of this policy may result in disciplinary action, termination, or legal consequences depending on severity. Any exceptions to this policy require written approval from the Policy Owner and must be documented with a compensating control.

---

## 14. Document History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 1.0 | April 30, 2026 | Emilio Rivera | Initial policy created |

---

*This document is classified as **Internal**. It should not be shared publicly but may be shared with authorized third-party auditors (e.g., Plaid partner review) under a confidentiality agreement.*
