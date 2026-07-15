# Information Security Policy
**Organization:** Trellis Money  
**Version:** 1.1  
**Effective Date:** April 30, 2026  
**Last Reviewed:** July 14, 2026  
**Next Review Date:** July 14, 2027  
**Policy Owner:** Emilio Rivera  
**Approved By:** Emilio Rivera, Founder & CEO  

---

## 1. Purpose

This policy establishes the information security requirements for Trellis Money to protect the confidentiality, integrity, and availability of company and customer data. It defines how we identify, mitigate, and monitor information security risks across our systems, infrastructure, and third-party integrations — including financial data accessed via Plaid.

This policy is designed to satisfy the security obligations in the Plaid Developer Policy, including the maintenance of administrative, technical, and physical safeguards for End User Data, and applicable regulatory requirements such as the Safeguards Rule under the Gramm-Leach-Bliley Act (GLBA).

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

**Hosting model:** All server-side components are cloud-hosted. Application compute currently runs on Vercel's managed serverless platform, with data persisted in AWS RDS. A future migration of application compute to AWS EC2 is planned; this policy will be reviewed and updated **prior to** that transition to address the additional responsibilities of self-managed compute (OS hardening and patching, host-level monitoring, and network configuration).

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
- **Plaid:** Access tokens and item IDs are stored in the database with restricted access; Plaid secrets are stored only in server-side environment variables. Plaid API credentials (client ID and secret) are never published, distributed, or shared with third parties.
- **Stripe:** Secret keys are server-side only. Webhook signing secrets are validated on all incoming webhook requests.
- **Cloudinary:** Upload presets and API secrets are restricted to server-side usage only.

### 4.3 Authentication Requirements
- Multi-factor authentication (MFA) is required for all critical and production assets, including: Vercel, AWS, GitHub, Supabase dashboard, and Stripe dashboard
- Passwords must meet a minimum strength score (enforced via `zxcvbn` in the application) and are hashed using `bcrypt` before storage
- User sessions are managed through Supabase Auth with server-side session validation

### 4.4 Access Lifecycle and Reviews
Trellis Money maintains a defined process for requesting, granting, reviewing, approving, and revoking access to production assets and data:
- Access to production systems is requested in writing and approved by the Policy Owner before being granted
- Access to all production systems is reviewed quarterly
- Access is revoked within 24 hours of an employee or contractor departure
- A record of active access grants is maintained and reviewed by the Policy Owner

### 4.5 Network Segmentation
- The production database (AWS RDS) resides within a VPC with no direct public internet access; inbound connections are restricted by VPC security groups to authorized sources only
- Application compute (Vercel) communicates with the database tier only over encrypted connections
- Development and staging environments are logically separated from production and do not share production credentials or real user data

---

## 5. Data Handling and Encryption

### 5.1 Encryption in Transit
- All data in transit is encrypted using TLS 1.2 or higher for all client-server communications
- Vercel enforces HTTPS on all endpoints; HTTP requests are automatically redirected
- Database connections to AWS RDS use SSL/TLS

### 5.2 Encryption at Rest
- AWS RDS volume-level storage encryption is enabled on the production database; all data retrieved from the Plaid API is stored on this encrypted volume
- Supabase encrypts stored user credentials
- Plaid item tokens stored in the database are treated as Restricted data

### 5.3 Sensitive Data Handling
- Plaid `access_token` and `item_id` values are stored in the database but never logged, never returned to the client, and never exposed in error messages
- Full bank account numbers are never stored; only masked versions or metadata provided by Plaid are retained
- Stripe handles all raw card data via Stripe.js; Trellis Money never processes or stores raw card numbers
- Passwords are never stored in plaintext; only `bcrypt` hashes are stored

### 5.4 Data Retention and Deletion
- User financial data retrieved via Plaid is retained only as long as necessary to provide the service
- Upon account deletion, user data is removed from the production database within 30 days
- Plaid items are de-authorized via the Plaid API upon account deletion
- Users may request deletion of their data at any time by contacting Trellis Money

---

## 6. Change Management

- All code changes are made on branches and merged to the main branch via pull request; GitHub branch protection blocks direct commits to the production branch
- Code review and approval is required before changes are merged to the main branch
- Automated checks (build, type-checking, and tests) run in CI and must pass before a change can be deployed to production
- Vercel preview deployments are used to validate changes before promotion to production
- Database schema changes are managed through Drizzle migrations and reviewed before being applied to production

---

## 7. Vulnerability and Patch Management

- Dependencies are tracked via `pnpm-lock.yaml` and continuously scanned for known vulnerabilities using GitHub Dependabot and `npm audit`
- Patch SLAs: **critical** and **high**-severity vulnerabilities are remediated within 30 days of disclosure; medium and low severity within 90 days
- Operating systems and software on all endpoint devices with production access are configured for automatic security updates; critical OS patches are applied within 14 days of release
- Host- and infrastructure-level patching for production compute and managed services is handled by Vercel, AWS, and Supabase under their respective shared-responsibility models; Trellis Money is responsible for application-level dependencies and configuration
- Upon migration to AWS EC2, Trellis Money will assume responsibility for OS-level vulnerability scanning and patching of production hosts, and this section will be updated accordingly

---

## 8. Logging, Monitoring, and Audit Trails

- Application request logs, function logs, and error logs for production are captured through Vercel's logging and observability tooling
- Database events and metrics for AWS RDS are captured via Amazon CloudWatch
- Authentication events (sign-ups, logins, password resets, session activity) are logged via Supabase Auth
- Payment and billing events are logged via the Stripe Dashboard and validated webhook events
- Deployment history and code changes are fully audit-trailed through Vercel deployment records and Git commit history
- Alerting is configured for security-impacting events, including failed deployments, elevated error rates, and anomalous authentication activity, enabling real-time detection and triage
- Sensitive values (Plaid access tokens, passwords, session tokens, full account numbers) are never written to logs

---

## 9. Incident Response

### 9.1 What Constitutes a Security Incident
- Unauthorized access to Trellis Money systems or data
- Suspected or confirmed exposure of Restricted data (Plaid tokens, user financials, Stripe data)
- Compromised credentials for any production system
- Unexpected data modification or deletion in the production database

### 9.2 Response Steps
1. **Contain** — Immediately revoke compromised credentials, rotate affected secrets, disable affected accounts or services as needed
2. **Assess** — Determine what data was accessed, the scope of impact, and how access occurred
3. **Notify** — If any breach of security or unauthorized use involves Plaid-sourced data or Plaid credentials, notify Plaid promptly at **security@plaid.com**. Notify affected users and other relevant third parties (e.g., Stripe) within 72 hours per applicable requirements
4. **Remediate** — Fix the root cause, rotate all potentially affected secrets, and document the incident
5. **Review** — Conduct a post-incident review within 5 business days to identify process improvements

### 9.3 Contact
Security incidents should be reported immediately to: **emiliorivera@trellismoney.com**

---

## 10. Third-Party Vendor Management

Trellis Money uses the following approved third-party vendors that access or process sensitive data:

| Vendor | Purpose | Data Accessed |
|---|---|---|
| **Plaid** | Financial account linking and data aggregation | Bank account data, transaction history |
| **Stripe** | Payment processing | Payment method metadata |
| **AWS (RDS)** | Database hosting | All application data |
| **Vercel** | Application hosting and deployment | Application code, environment variables |
| **Supabase** | Authentication and user management | User credentials, session tokens |
| **Cloudinary** | Media storage | User-uploaded assets |

All third-party vendors are evaluated for security practices (including available SOC 2 / ISO 27001 attestations) prior to integration. Vendor access is limited to the minimum required for the integration to function. Vendor security policies are reviewed annually or upon material changes to the integration.

---

## 11. Physical, Endpoint, and Device Security

- **Device inventory:** The Policy Owner maintains an inventory of all devices with access to production systems or Restricted data; only inventoried devices may be used to access production
- All development work is performed on company-controlled or personally-owned devices with full-disk encryption enabled (FileVault on macOS)
- Device screen locks are enabled and trigger after 5 minutes of inactivity
- Built-in endpoint protections (macOS Gatekeeper, XProtect, and automatic security updates) are enabled on all devices to protect against malicious code
- **Personal devices (BYOD):** Personally-owned devices may access production systems only if they meet the same requirements as company devices (full-disk encryption, screen lock, current OS with automatic updates) and are recorded in the device inventory; devices that do not meet these requirements are not granted production access
- Sensitive data is not stored on local devices beyond what is required for active development; production credentials are not stored in plaintext on local machines
- Lost or stolen devices are reported immediately so production access credentials can be rotated

---

## 12. Personnel Security

- Background checks are performed on all employees and contractors prior to being granted access to production systems or Restricted data, where permitted by applicable law
- All personnel agree to confidentiality obligations covering Confidential and Restricted data as a condition of engagement
- Access granted to personnel follows the access lifecycle process in Section 4.4

---

## 13. Acceptable Use

- Company systems and infrastructure are used for legitimate business purposes only
- Production environment variables and secrets are never shared via email, Slack, or any unencrypted channel; a secrets manager or encrypted channel is used
- Development and staging environments do not use real user data; test data or anonymized data is used instead
- Source code containing hardcoded secrets or credentials must not be committed; pre-commit hooks enforce this

---

## 14. Security Awareness and Training

- All team members complete security awareness training upon joining and at least annually thereafter, covering this policy, phishing awareness, and secure credential handling
- This policy is stored in the company's private GitHub repository and version-controlled to maintain an audit trail of reviews and changes

---

## 15. Consumer Privacy and Data Rights

- End users provide explicit, informed consent for the collection, processing, and storage of their financial data through Plaid Link's consent flow and Trellis Money's privacy policy before any data is retrieved
- End User Data obtained through Plaid is used solely to provide and improve the Trellis Money service, consistent with the Plaid Developer Policy and the consent obtained from the user
- **Trellis Money does not sell or rent consumer data obtained through the Plaid API**, and does not share it with third parties except with the approved vendors listed in Section 10 as required to provide the service
- Data retention and deletion are governed by Section 5.4

---

## 16. Risk Assessment and Independent Testing

An annual security risk assessment is conducted to:
- Identify new threats relevant to the application and infrastructure
- Evaluate the effectiveness of existing controls
- Prioritize remediation of identified gaps

Risk assessment findings are documented and tracked to resolution.

**Independent testing:** Trellis Money engages independent third parties to perform penetration testing of the production application at least annually, and additionally prior to major infrastructure changes (including the planned migration from Vercel to AWS EC2). Findings are triaged and remediated according to the patch SLAs in Section 7.

The next scheduled policy review is **July 14, 2027**.

---

## 17. Policy Compliance and Exceptions

Violations of this policy may result in disciplinary action, termination, or legal consequences depending on severity. Any exceptions to this policy require written approval from the Policy Owner and must be documented with a compensating control.

---

## 18. Document History

| Version | Date | Author | Summary of Changes |
|---|---|---|---|
| 1.0 | April 30, 2026 | Emilio Rivera | Initial policy created |
| 1.1 | July 14, 2026 | Emilio Rivera | Aligned with Plaid Developer Policy and Security Questionnaire (v6): added change management, logging/monitoring/audit trails, endpoint & device security, personnel security (background checks), consumer privacy & data-sale prohibition, independent penetration testing, network segmentation, and Plaid breach-notification requirement (security@plaid.com); documented current Vercel hosting model and planned EC2 migration |

---

*This document is classified as **Internal**. It should not be shared publicly but may be shared with authorized third-party auditors (e.g., Plaid partner review) under a confidentiality agreement.*
