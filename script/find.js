const teamData = JSON.parse(localStorage.getItem(`Local Storage`));
const main = document.querySelector('.main');
const teamList = document.querySelector('.myTeam > ul');
console.log(teamData);

if (teamData) {
  for (const team of teamData) {
    const teammates = document.createElement('li');
    teammates.innerHTML = `
    <p id="numberPlayers">${team.numberPlayers} Players</p>
    <h1 id="teamName">${team.teamName}</h1>
    <h2 id="location">${team.location}</h2>
    <h1 id="captName" hidden>${team.captName}</h1>
    `;
    teamList.append(teammates);
  }
}

// Choose Data Team
let selectTeam = document.querySelector('.selectTeam');
const teams = document.querySelector('.myTeam');
const teamq = teams.querySelector('ul > li');
selectTeam.addEventListener('click', () => {
  if (teamq === null) {
    alert(`Team not found`);
  } else {
    teams.classList.toggle('show');
    selectingTeam();
  }
});

// Select data Team
function selectingTeam() {
  const allTeams = document.querySelectorAll('.myTeam > ul > li');

  for (const all of allTeams) {
    all.addEventListener('click', (e) => {
      const selected = e.target.parentElement;
      // const yeah = selected.querySelector('h1')
      selectTeam.innerHTML = `
    <h1 id="teamName">${selected.querySelector('#teamName').innerHTML}</h1>
    <p id="location" hidden>${selected.querySelector('#location').innerHTML}</p>
    <p id="captName" hidden>${selected.querySelector(`#captName`).innerHTML}</p>
    `;
      teams.classList.remove('show');
      // selected.remove()
    });
  }
}

// Location
const locationText = document.querySelector('.locationList');
const ourLocation = document.querySelector('.location');
locationText.addEventListener('click', () => {
  ourLocation.classList.toggle('show');
  selectLocation();
});

// select Location
function selectLocation() {
  const allLocations = document.querySelectorAll('.location > ul > li');
  for (const locationa of allLocations) {
    locationa.addEventListener('click', (e) => {
      const selected = e.target;
      locationText.innerHTML = `<h1>${selected.innerHTML}</h1>`;
      ourLocation.classList.remove(`show`);
    });
  }
}

// Search Button
const searchBtn = document.querySelector('#search');
searchBtn.addEventListener('click', () => {
  const yup = selectTeam.querySelector('h1');
  if (yup.innerText === 'Data Team') {
    alert(`Choose your Team!`);
  } else {
    listed();
    if (locationText.innerText === 'Location') {
      addEnemy(dataEnemys);
      AcceptBtn();
    } else {
      table.querySelectorAll('tr').forEach((e) => e.remove());
      addEnemy(
        dataEnemys.filter((loc) => loc.location === locationText.innerText),
      );
      AcceptBtn();
    }
  }
});

// Data Enemy
const table = document.querySelector('.list > table > tbody');

// function Search Enemy
const addEnemy = (array) => {
  for (data of array) {
    const team = document.createElement('tr');
    team.innerHTML = `
      <td id="teamName">${data.teamName}</td>
      <td id="captName">${data.CaptName}</td>
      <td id="numberPlayer">${data.numberPlayer}</td>
      <td>${data.location}</td>
      <td>${data.phone}</td>
      <td><button>Accept</button></td>
    `;
    table.append(team);
  }
};

// Changing unlisted to list
const listed = () => {
  const unlisted = document.querySelector('.unlisted');
  unlisted.style.display = 'none';
  const list = document.querySelector('.list');
  list.style.display = 'flex';
};

// Options Button Element
const option = document.querySelector('.options');
const success = document.querySelector('.success');
const cancel = option.querySelector('#no');
const accept = option.querySelector('#yes');
const match = document.querySelector('#matchList');

// Options scroll function
function options(noscroll) {
  if (option.style.display === 'flex') {
    window.addEventListener('scroll', noscroll);
    accc = document.querySelectorAll(
      '.list > table > tbody > tr > td > button',
    );
    // Turn off button Accept
    for (acc of accc) {
      acc.style.pointerEvents = 'none';
    }
  }
  cancel.addEventListener('click', () => {
    option.style.display = 'none';
    window.removeEventListener('scroll', noscroll);
    main.style.filter = 'none';
    // Turn back on button Accept
    for (acc of accc) {
      acc.style.pointerEvents = 'all';
    }
  });
}

// Accept Buttons
function AcceptBtn() {
  const accBtns = document.querySelectorAll(
    '.list > table > tbody > tr > td > button',
  );
  for (accBtn of accBtns) {
    accBtn.addEventListener('click', (e) => {
      const enemyData = e.target.parentElement.parentElement;
      const captEnemy =
        e.target.parentElement.parentElement.querySelector(
          '#captName',
        ).innerText;
      const teamEnemy =
        e.target.parentElement.parentElement.querySelector(
          '#teamName',
        ).innerText;
      const captTeam = selectTeam.querySelector('#captName').innerText;
      const team = selectTeam.querySelector('#teamName').innerText;
      main.style.filter = 'blur(4px)';
      option.style.display = 'flex';

      // Options Notifications
      const y = window.scrollY + option.getBoundingClientRect();
      const numb = parseInt(y);
      function noscroll() {
        window.scrollTo(0, numb);
      }
      options(noscroll);

      // Accept Buttons
      accept.addEventListener('click', () => {
        // Save Data Team
        
        enemyData.remove();
        matchTeam(captTeam, team, captEnemy, teamEnemy);
        // myTeam(captTeam, team)
        option.style.display = 'none';
        success.style.display = 'flex';
      });
    });
  }
}

// Move to Match List
match.addEventListener('click', () => {
  window.location.href = 'match.html';
});

// Local Storage

// Local/Session Storage for MatchList
const matchStorageKey = 'MatchStorage';
function matchTeam(you, yourTeam, enemy, enemyTeam) {
  const TeamData = {
    you: you,
    yourTeam: yourTeam,
    enemy: enemy,
    enemyTeam: enemyTeam,
  };
  let teams = [];
  if (sessionStorage.getItem(matchStorageKey) === null) {
    teams = [];
  } else {
    teams = JSON.parse(sessionStorage.getItem(matchStorageKey));
  }
  teams.unshift(TeamData);
  sessionStorage.setItem(matchStorageKey, JSON.stringify(teams));
}

// localStorage.removeItem('enemyStorage');
// localStorage.removeItem('teamStorage');
