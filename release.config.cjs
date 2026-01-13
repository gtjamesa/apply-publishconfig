/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
  branches: ['main', 'next'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
        releaseRules: [
          {type: 'docs', scope: 'README', release: 'patch'},
          {type: 'refactor', release: 'patch'},
          {scope: 'no-release', release: false},
        ],
      },
    ],
    '@semantic-release/release-notes-generator',
    ['@semantic-release/npm', {npmPublish: true}],
    '@semantic-release/github',
  ],
};
