import data from '../../data/data'

const towns = {
  state: {
    towns: []
  },
  mutations: {
    setTowns(state, districts) {
      state.towns = districts.towns;
  },
    incrementTowns(state, index) {
      state.towns[index].likes++;
    },
    dicrementTowns(state, index) {
      if (state.towns[index].likes > 0) {
        state.towns[index].likes--;
      }
    }, 
    deleteTowns(state, index) {
      state.towns.splice(index, 1);
    },
    getDefaultSortTowns: state => {
      return state.towns.sort((a,b) => { return b.id - a.id });
    },
    getPopularitySortTowns: state => {
      return state.towns.sort((a,b) => { return b.likes - a.likes });
    },
    getAlfabetSortTowns: state => {
      var alfavit = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];
      for (var i=0; i < state.towns.length; i++) {
        var b = alfavit.indexOf(state.towns[i].name.substr(0,1));
        state.towns[i].count = b;
    }
    state.towns.sort(function(a, b) {
      return a.count - b.count;
    })
    } 
  },
  actions: {
    getTowns({commit}) {
      commit('setTowns', data);
    }
  }
}

export default towns;