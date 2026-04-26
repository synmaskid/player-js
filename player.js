async function loadData(){
  let res = await fetch('/p/data.html');
  let text = await res.text();

  let parser = new DOMParser();
  let doc = parser.parseFromString(text, 'text/html');
  let pre = doc.querySelector('pre');

  window.DATA = JSON.parse(pre.textContent.trim());
}

function getPath(){
  let params = new URLSearchParams(location.search);
  return {
    slug: params.get('slug'),
    ep: params.get('ep')
  }
}

function render(){
  let {slug, ep} = getPath();

  if(!slug || !ep) return;
  if(!DATA[slug]) return;

  let film = DATA[slug];
  let episode = film.episodes[ep];

  let app = document.getElementById('app');

if(!app){
  app = document.createElement('div');
  app.id = 'app';
  document.body.appendChild(app);
}
  app.innerHTML = `
    <h2>${film.title} - ${episode.name}</h2>
    <iframe src="${episode.server1}" width="100%" height="500"></iframe>
  `;
}

window.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  render();
});
