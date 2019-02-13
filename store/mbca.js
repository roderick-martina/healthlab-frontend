export const state = () => ({
  results: null,
  pagination: null,
  ethnicities: []
})

export const getters = {
  results(state) {
    return state.results
  },
  pagination(state) {
    return state.pagination
  },
  ethnicities(state) {
    return state.ethnicities
  },
}

export const mutations = {
  saveMbcaResults(state, result) {
    state.results = result
  },
  saveMbcaPagination(state, pagination) {
    state.pagination = pagination
  },
  saveEthnicities(state, ethnicities) {
    state.ethnicities = ethnicities
  }
}

export const actions = {
  handleMbcaResults({
    commit
  }, payload) {
    if(payload.data.meta){
      let pagination = {
        current_page: payload.data.meta.current_page,
        last_page: payload.data.meta.last_page,
        next_page_url: payload.data.links.next,
        prev_page_url: payload.data.links.prev
      }
      commit('saveMbcaResults', payload.data.data)
      commit('saveMbcaPagination', pagination)
    } else {
      let pagination = {
        current_page: payload.data.current_page,
        last_page: payload.data.last_page,
        next_page_url: payload.data.next_page_url,
        prev_page_url: payload.data.prev_page_url
      }
      commit('saveMbcaResults', payload.data.data)
      commit('saveMbcaPagination', pagination)
      commit('saveEthnicities',payload.ethnicicties)

    }
    
  }
}

// export const actions = {
//     fetchResult () {

//     }
// }
