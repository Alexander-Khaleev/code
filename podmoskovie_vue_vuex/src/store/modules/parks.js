import data from '../../data/data'

const parks = {
  state: {
    parks: []
  },
  mutations: {
    setParks(state, districts) {
      state.parks = districts.parks;
  },
    incrementParks(state, index) {
      state.parks[index].likes++;
    },
    dicrementParks(state, index) {
      if (state.parks[index].likes > 0) {
        state.parks[index].likes--;
      }
    },
    deleteParks(state, index) {
        state.parks.splice(index, 1);
    },
    getDefaultSortParks: state => {
      return state.parks.sort((a,b) => { return b.id - a.id });
    },
    getPopularitySortParks: state => {
      return state.parks.sort((a,b) => { return b.likes - a.likes });
    },
    getAlfabetSortParks: state => {
      var alfavit = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];
      for (var i=0; i < state.parks.length; i++) {
        var b = alfavit.indexOf(state.parks[i].name.substr(0,1));
        state.parks[i].count = b;
    }
    state.parks.sort(function(a, b) {
      return a.count - b.count;
    })
    }  
  },
  actions: {
    getParks({commit}) {
      commit('setParks', data);
    }
  }
}

export default parks;