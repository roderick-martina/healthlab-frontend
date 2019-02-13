export const state = () => ({
    results: null,
    pagination: null,
    activities: null,
})

export const getters = {
    results(state) {
      return state.results
    },
    pagination(state) {
      return state.pagination
    },
    activities(state) {
      return state.activities
    },
  }

  export const mutations = {
    saveBodpodResults(state, result) {
      state.results = result
    },
    saveBodpodPagination(state, pagination) {
      state.pagination = pagination
    },
    saveActivities(state, activities) {
      state.activities = activities
    }
  }

  export const actions = {
    handleBodpodResults({
      commit
    }, payload) {
      if(payload.data.meta){
        let pagination = {
          current_page: payload.data.meta.current_page,
          last_page: payload.data.meta.last_page,
          next_page_url: payload.data.links.next,
          prev_page_url: payload.data.links.prev
        }
        commit('saveBodpodResults', payload.data.data)
        commit('saveBodpodPagination', pagination)
      } else {
        let pagination = {
          current_page: payload.data.current_page,
          last_page: payload.data.last_page,
          next_page_url: payload.data.next_page_url,
          prev_page_url: payload.data.prev_page_url
        }
        commit('saveBodpodResults', payload.data.data)
        commit('saveBodpodPagination', pagination)
        commit('saveActivities',payload.activities)
      }
      
    }
  }