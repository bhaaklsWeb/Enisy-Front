import * as topicsApi from '@/api/topics.js';
let readyResolver;
let readyPromise = new Promise(function (resolve) {
  readyResolver = resolve;
});
export default {
  namespaced: true,
  state: {
    items: null,
    processId: []
  },
  getters: {
    all: state => state.items,
    one: state => id => state.items[id],
    topicsReady: () => readyPromise,
    inProcess: (state) => id => state.processId.includes(id),
    indexProcess: state => id => state.processId.findIndex(pr => pr.id === id),
  },
  mutations: {
    setItems(state, items) {
      state.items = items;
    },
    startProcess(state, id) {
      state.processId.push(id);
    },
    endProcess(state, id) {
      state.processId = state.processId.filter(idr => idr !== id);
    }
  },
  actions: {
    async load({ commit }) {
      const resTopics = await topicsApi.all(); //при отсутсвии дост. к серверу - bad!
      await new Promise(resolve => setTimeout(resolve, 200));
      let tp = topicsMapper(resTopics);
      commit('setItems', tp);
      readyResolver();
      // return topics;
    }
  }
}

function topicsMapper(data) {
  const tmapped = {};
  let { topics } = data;
  topics.forEach((item) => {
    let { title, createdAt, pic, paragraphs } = item;
    let obj = { title, createdAt, pic, paragraphs };
    tmapped[item.id] = obj;
  });
  return tmapped;
}

// const stub = async() => {
//     try {
//         let arr = stb();
//         return arr;
//     }
//     catch(e) {
//         console.log(e)
//     }
// }

// function stb() {
//     return {
//         1: {
//             title: 'Dresden Green Vault robbery: Priceless diamonds stolen',
//             dateInfo: 'November 21, 2019 — NO COMENTS', pic: 'content-block__img1',
//             paragraph: [
//                 'Burglars have stolen three diamond jewellery sets from one of Europe\'s largest treasure collections - the Dresden Green Vault in eastern Germany.',
//                 'The historic sets consist of 37 parts each, and there are fears the thieves may try to break them up.',
//                 'Officials are still trying to establish exactly how much was stolen in the break-in early on Monday. Saxony\'s ruler, Augustus the Strong, created the collection in 1723 in what is one of the world\'s oldest museums.'
//             ]
//         },
//         3: {
//             title: 'Cannabis legalisation: Does it lead to harder drug use?',
//             dateInfo: 'November 20, 2019 — 1 COMENTS', pic: 'content-block__img2',
//             paragraph: [
//                 `
//                         There's strong disagreement among Democratic contenders for the US presidency about legalising cannabis and it's been a flashpoint in their televised debates.
//                         Joe Biden, currently the leading contender in the race, won't be drawn either way. He wants more evidence about whether using it could act as a "gateway" to
//                         the use of harder drugs before it's legalised throughout the US. "Before I legalise it nationally," said Biden, "I want to make sure we know a lot more about the science behind it."
//                         `
//             ]
//         }

//     };
// }