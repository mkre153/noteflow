# 🔒 Security Slash Commands for Claude Code

This directory contains custom security-focused slash commands for comprehensive security reviews and automated security fixes.

## Available Commands

### `/security` - Comprehensive Security Review
**Usage**: `/security [scope] [severity] [format]`

**Parameters**:
- `scope`: `all`, `frontend`, `backend`, `api`, `dependencies`, `env` (default: `all`)
- `severity`: `critical`, `high`, `medium`, `low`, `all` (default: `all`)
- `format`: `detailed`, `summary`, `json` (default: `detailed`)

**Examples**:
```bash
/security                           # Full comprehensive review
/security api high                  # API security, high severity only
/security dependencies critical     # Critical dependency vulnerabilities
/security all medium summary        # Medium+ issues, summary format
```

**Features**:
- Environment & configuration security
- Dependency vulnerability scanning
- Code security analysis (XSS, SQLi, CSRF)
- Authentication & authorization review
- Input validation assessment
- Infrastructure security checks
- Next.js/React specific security patterns

### `/security-scan` - Quick Security Scan
**Usage**: `/security-scan [file-pattern]`

**Parameters**:
- `file-pattern`: File pattern to scan (default: current directory)

**Examples**:
```bash
/security-scan                      # Scan entire project
/security-scan src/                 # Scan src directory only
/security-scan "*.ts"               # Scan TypeScript files only
```

**Quick Checks**:
- Hardcoded secrets detection
- SQL injection patterns
- XSS vulnerability patterns
- Insecure HTTP requests
- Environment variable exposure
- High-severity dependency vulnerabilities

### `/security-fix` - Apply Security Fixes
**Usage**: `/security-fix [fix-type] [target]`

**Parameters**:
- `fix-type`: `headers`, `rate`, `validation`, `env`, `deps`, `csp`
- `target`: Target file or scope for the fix

**Examples**:
```bash
/security-fix headers next.config.js    # Add security headers
/security-fix rate api                  # Add rate limiting to APIs
/security-fix validation forms          # Add input validation
/security-fix env all                   # Secure environment variables
/security-fix deps all                  # Update vulnerable dependencies
/security-fix csp all                   # Implement CSP headers
```

**Available Fixes**:
- **Security Headers**: HSTS, XSS Protection, Frame Options, etc.
- **Rate Limiting**: API endpoint protection
- **Input Validation**: Form and API input sanitization
- **Environment Security**: .env file protection
- **Dependency Updates**: Vulnerability patches
- **Content Security Policy**: CSP implementation

## Security Categories Covered

### 🔐 Authentication & Authorization
- JWT token handling and validation
- Session management security
- Access control implementation
- Password security practices

### 🛡️ Input Security
- XSS prevention mechanisms
- SQL injection protection
- CSRF token implementation
- Input sanitization patterns

### 🔒 Data Protection
- Sensitive data handling
- Encryption practices (at rest/transit)
- PII data protection compliance
- Data validation procedures

### 🌐 Network Security
- HTTPS enforcement
- Security headers configuration
- CORS policy implementation
- Rate limiting strategies

### 📦 Dependency Security
- Vulnerable package detection
- Outdated dependency identification
- License compliance checking
- Supply chain security assessment

### ⚙️ Configuration Security
- Environment variable protection
- Secret management practices
- Configuration file security
- Build process security

## Security Severity Levels

- **🚨 CRITICAL**: Immediate security threats requiring urgent action
- **⚠️ HIGH**: Significant security risks that should be addressed promptly
- **📋 MEDIUM**: Important security improvements recommended
- **📝 LOW**: Minor security enhancements and best practices

## Integration Workflow

1. **Initial Assessment**: Run `/security` for comprehensive review
2. **Quick Checks**: Use `/security-scan` during development
3. **Targeted Fixes**: Apply `/security-fix` for specific issues
4. **Regular Audits**: Schedule periodic `/security all high` reviews

## Best Practices

- Run security scans before every deployment
- Address critical and high severity issues immediately
- Implement security headers and rate limiting early
- Regular dependency updates and vulnerability monitoring
- Code review security checklist integration

## Example Workflow

```bash
# Daily development security check
/security-scan src/

# Pre-deployment comprehensive review
/security all high detailed

# Apply common security fixes
/security-fix headers next.config.js
/security-fix rate api
/security-fix validation all

# Dependency security maintenance
/security dependencies critical
/security-fix deps all
```

---

**Note**: These commands are designed for defensive security analysis and vulnerability detection. They help maintain security best practices and identify potential risks in your codebase.

For more advanced security testing, consider integrating with:
- OWASP ZAP for dynamic security testing
- SonarQube for static analysis
- Snyk for dependency vulnerability management
- GitHub Security Advisories for automated alerts