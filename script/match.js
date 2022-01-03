// Get data from Storage
const matchTeam = JSON.parse(sessionStorage.getItem('MatchStorage'))

console.log(matchTeam)

// Get Selectors
const matches = document.querySelector('.matches') 


// Looping Data
for(team of matchTeam) {
  const match = document.createElement('div')
  match.classList.add('match')
  match.innerHTML = `
      <div class="match-text">
        <h1>${team.yourTeam}</h1>
        <h2>${team.you}</h2>
      </div>
    <img src="./assets/matchListPages/versus.png" alt="">
      <div class="match-text">
        <h1>${team.enemyTeam}</h1>
        <h2>${team.enemy}</h2>
      </div>
  </div>
  `
  matches.append(match)
  console.log(match.innerHTML)
}