/**
 * Re-applies react-native-permissions Podfile setup after npm install.
 * setup_permissions only runs during `pod install`; npm install resets the podspec.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const permissionsRoot = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native-permissions',
);
const setupRb = path.join(permissionsRoot, 'scripts', 'setup.rb');
const podspecPath = path.join(permissionsRoot, 'RNPermissions.podspec');

if (!fs.existsSync(setupRb)) {
  console.warn('[permissions] react-native-permissions not installed, skipping.');
  process.exit(0);
}

const config = ['Camera', 'Microphone'];

try {
  const rubyConfig = config.map(p => `'${p}'`).join(', ');
  execSync(
    `ruby -e "require '${setupRb.replace(/'/g, "\\'")}'; setup_permissions([${rubyConfig}])"`,
    { stdio: 'pipe' },
  );
  const podspec = fs.readFileSync(podspecPath, 'utf8');
  if (!podspec.includes('ios/Camera')) {
    console.warn(
      '[permissions] RNPermissions.podspec was not patched. Run: npm run pod',
    );
    process.exit(0);
  }
  console.log('[permissions] iOS permission handlers linked (Camera, Microphone).');
} catch (error) {
  console.warn('[permissions] Could not patch podspec:', error.message);
  console.warn('[permissions] Run: npm run pod');
}
