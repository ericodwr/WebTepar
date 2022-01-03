
// Save Button
const saveBtn = document.querySelector('#save')
saveBtn.addEventListener('click', function() {
  const teamName = document.querySelector('#teamName').value
  const captName = document.querySelector('#captName').value
  const numberPlayers = document.querySelector('#number').value
  const locatio = document.querySelector('#location').value
  const phone = document.querySelector('#phone').value;
  
  const newTeam = {
    teamName:teamName,
    captName:captName,
    numberPlayers:numberPlayers,
    location:locatio,
    phone:phone,
  }
  
  if(!teamName, !captName, !phone) {
    alert(`Input Data Team!`)
  } else {
    teamData(newTeam);
    const completed = document.querySelector('.complete');
    completed.style.display = "flex";
    const main = document.querySelector('.main');
    const img = document.querySelector('#man');
    main.style.filter = 'blur(4px)';
    img.style.filter = 'blur(4px)';
  }
      
      
})


// Go to Find Enemy html
const findEnemy = document.querySelector('.btn-find');
findEnemy.addEventListener('click', () => {
  window.location.href = 'find.html';
})

// Create Local Storage
const storageKey = "Local Storage"
function teamData(team) {
  let teams = [];
  if(localStorage.getItem(storageKey) === null) {
    teams = [];
  } else {
    teams = JSON.parse(localStorage.getItem(storageKey))
  }

  teams.unshift(team);
  localStorage.setItem(storageKey, JSON.stringify(teams))
}

// Reset Team
const resetBtn = document.querySelector('#reset');
const reset = document.querySelector('.reset');
resetBtn.addEventListener('click', () => {
  if(localStorage.getItem(storageKey)) {
    localStorage.removeItem(storageKey);
    reset.style.display = "flex";
  } else {
    alert(`Tim not Found`);
  }
})

const closeBtn = document.querySelector('.btn-close');
closeBtn.addEventListener('click', () => {
  reset.style.display = "none";
})














