const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const body = JSON.parse(event.body);

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const owner = "bhavesh2803";
  const repo = "ChaloOnlineCustomer";
  const workflow = "chaloonline-flavor-build.yml";
  const branch = "main";

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflow}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      ref: branch,
      inputs: body
    })
  });

  const text = await response.text();

  return {
    statusCode: response.status,
    body: text
  };
};
