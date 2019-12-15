import data from '../../data/data'

const rivers = {
    state: {
      rivers: []
    },
    mutations: {
      setRivers(state, districts) {
        state.rivers = districts.rivers;
    },
      incrementRivers(state, index) {
        state.rivers[index].likes++;
      },
      dicrementRivers(state, index) {
        if (state.rivers[index].likes > 0) {
          state.rivers[index].likes--;
        }
      },
      deleteRivers(state, index) {
        state.rivers.splice(index, 1);
      },
      getDefaultSortRivers: state => {
        return state.rivers.sort((a,b) => { return b.id - a.id });
      },
      getPopularitySortRivers: state => {
        return state.rivers.sort((a,b) => { return b.likes - a.likes });
      },
      getAlfabetSortRivers: state => {
        var alfavit = ['А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'];
        for (var i=0; i < state.rivers.length; i++) {
          var b = alfavit.indexOf(state.rivers[i].name.substr(0,1));
          state.rivers[i].count = b;
      }
      state.rivers.sort(function(a, b) {
        return a.count - b.count;
      })
      } 
    },
    actions: {
      getRivers({commit}) {
        commit('setRivers', data);
      }
    }
  }

export default rivers;