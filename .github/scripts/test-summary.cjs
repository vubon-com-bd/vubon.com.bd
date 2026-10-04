/**
 * Test summary generator for GitHub Actions Step Summary.
 * Usage: node test-summary.cjs <results-file> <service-name>
 */
const fs = require('fs');

const [resultsFile, serviceName] = process.argv.slice(2);
const summaryFile = process.env.GITHUB_STEP_SUMMARY;

if (!summaryFile) {
  console.error('GITHUB_STEP_SUMMARY env not set');
  process.exit(0);
}

const write = (line) => fs.appendFileSync(summaryFile, line + '\n');

write('## 🧪 ' + serviceName + ' — Test Summary');
write('');

if (!fs.existsSync(resultsFile)) {
  write('⚠️ No test results file found at `' + resultsFile + '`');
  process.exit(0);
}

let r;
try {
  r = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
} catch (err) {
  write('⚠️ Failed to parse `' + resultsFile + '`: ' + err.message);
  process.exit(0);
}

const failed = r.testResults.filter((t) => t.status === 'failed');
const passed = r.testResults.filter((t) => t.status === 'passed');

write('| Metric | Count |');
write('|--------|-------|');
write('| ✅ Passed Suites | ' + passed.length + ' |');
write('| ❌ Failed Suites | ' + failed.length + ' |');
write('| 📦 Total Suites | ' + r.testResults.length + ' |');
write('');
write('| Total Tests | ' + r.numTotalTests + ' |');
write('| Passed | ' + r.numPassedTests + ' |');
write('| Failed | ' + r.numFailedTests + ' |');
write('');

if (failed.length > 0) {
  write('### ❌ Failed Test Files');
  write('');
  failed.forEach((t) => {
    const shortName = t.name.replace(process.cwd(), '').replace(/\\/g, '/');
    write('- `' + shortName + '`');
  });
  write('');

  write('### 🔍 Failure Details');
  write('');
  failed.forEach((t) => {
    const shortName = t.name.replace(process.cwd(), '').replace(/\\/g, '/');
    write('<details>');
    write('<summary>❌ ' + shortName + '</summary>');
    write('');
    t.assertionResults
      .filter((a) => a.status === 'failed')
      .forEach((a) => {
        write('**' + a.title + '**');
        write('```');
        const msgs = (a.failureMessages || []).join('\n').substring(0, 1000);
        write(msgs);
        write('```');
        write('');
      });
    write('</details>');
    write('');
  });
}

console.log('✅ Test summary written for ' + serviceName);
