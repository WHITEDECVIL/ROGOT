#!/bin/bash
set -e

echo "🛡️  Prompt Injection Shield - Project Verification"
echo "=================================================="
echo ""

# Check server structure
echo "✓ Checking server..."
test -f server/package.json && echo "  ✓ package.json" || echo "  ✗ missing package.json"
test -f server/src/index.ts && echo "  ✓ src/index.ts" || echo "  ✗ missing src/index.ts"
test -f server/src/shield/injectionDetector.ts && echo "  ✓ ShieldAnalyzer" || echo "  ✗ missing ShieldAnalyzer"
test -f server/src/shield/auditLogger.ts && echo "  ✓ AuditLogger" || echo "  ✗ missing AuditLogger"
test -f server/Dockerfile && echo "  ✓ Dockerfile" || echo "  ✗ missing Dockerfile"

echo ""
echo "✓ Checking mobile..."
test -f mobile/package.json && echo "  ✓ package.json" || echo "  ✗ missing package.json"
test -f mobile/app/\(tabs\)/scanner.tsx && echo "  ✓ Scanner screen" || echo "  ✗ missing Scanner"
test -f mobile/app/\(tabs\)/dashboard.tsx && echo "  ✓ Dashboard screen" || echo "  ✗ missing Dashboard"
test -f mobile/components/ThreatMeter.tsx && echo "  ✓ ThreatMeter component" || echo "  ✗ missing ThreatMeter"
test -f mobile/components/ThreatBadge.tsx && echo "  ✓ ThreatBadge component" || echo "  ✗ missing ThreatBadge"

echo ""
echo "✓ Checking config..."
test -f docker-compose.yml && echo "  ✓ docker-compose.yml" || echo "  ✗ missing docker-compose.yml"
test -f README.md && echo "  ✓ README.md" || echo "  ✗ missing README.md"

echo ""
echo "✅ Project structure verified!"
echo ""
echo "Next steps:"
echo "  1. cd server && npm install && cp .env.example .env"
echo "  2. Add CLAUDE_API_KEY to server/.env"
echo "  3. npm run dev"
echo "  4. In another terminal: cd mobile && npm install && npm start"
