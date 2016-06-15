import $ from 'jquery';
import config from '../../config/config.json';

function loadPullRequestComments(owner, repo, number) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls/${number}/comments`;
  return $.get({url});
}

function loadPullRequest(owner, repo, number) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls/${number}`;
  return $.get({url});
}

function loadPullRequests(owner, repo) {
  const url = `${config.apiBaseUrl}/repos/${owner}/${repo}/pulls`;
  return $.get({
    url
  });
}

export function getAllPullRequests(repoNames) {
  const promises = repoNames.map(repoName => {
    const [owner, repo] = repoName.split('/');
    return loadPullRequests(owner, repo);
  });

  return Promise.all(promises).then(results => {
    let pullRequests = [];
    results.forEach(result => {
      pullRequests = pullRequests.concat(result);
    });

    console.log(pullRequests);
    return pullRequests.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  });
}
