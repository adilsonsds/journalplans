export function loadLists() {
  var data = localStorage.getItem('journal-plans-data');
  var lists = [];
  if (data) {
    lists = JSON.parse(data);
  }
  else {
    lists = createDefaultDataToStartApp();
    updateLocalStorage(lists);
  }
  return lists;
}

export function saveCard(listIndex, cardIndex, data) {
  let lists = loadLists();
  lists[listIndex].cards[cardIndex] = data;
  updateLocalStorage(lists);
}

function updateLocalStorage(data) {
  localStorage.setItem('journal-plans-data', JSON.stringify(data));
}

function createDefaultDataToStartApp() {
  return [
    { title: 'Hoje', creatable: false, cards: [] },
    { title: 'Em breve', creatable: false, cards: [] },
    { title: 'Talvez', creatable: false, cards: [] },
  ]
}