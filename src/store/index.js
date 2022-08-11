import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router'
import { auth } from '@/firebase'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from 'firebase/auth'

export default createStore({
  state:  {
    users: null,
    accounts: [],
    account: null,
  },
  getters: {
  },
  mutations: {
    // login register
    setUsers(state, user) {
      state.users = user
    },

    clearUsers(state) {
      state.users = null
    },
    //crud data
    getAccounts(state, accounts) {
      state.accounts = [...accounts]
    },

    getAccount(state, account) {
      state.account = {...account}
    },

    updateAccount(state) {
      state
    },

    deleteAccounts(state) {
      state
    },

    createAccounts(state) {
      state
    },
    
  },
  actions: {
    // LOGIN / REGISTER / LOGOUT
    async login ({ commit}, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User not found')
            break
          case 'auth/wrong-password':
            alert('Wrong password')
            break
          default:
            alert('Something went wrong')
        }

      return
      }

      commit('setUsers', auth.currentUser)

      console.log(this.state.users)

      router.push('/home')
    },

    async register ({ commit}, details) {
      const { email, password } = details

      try {
        await createUserWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('Email already in use')
            break
          case 'auth/invalid-email':
            alert('Invalid email address')
            break
          case 'auth/operation-not-allowed':
            alert('Operation not allowed')
            break
          case 'auth/weak-password':
            alert('Weak password')
            break
          default:
            alert('Something went wrong')
        }

      return
      }

      commit('setUsers', auth.currentUser)
      console.log(this.state.users)


      router.push('/login')
    },

    async logout ({ commit}) {
      await signOut(auth)

      commit('clearUsers')

      router.push('/login')
    },

    fetchUsers ({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('clearUsers')
        } else {
          commit('setUsers', user)

          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/')
          }
        }
      })
    },
  
    // CRUD DATABASE
    async getAllAcc ({ commit }) {
      const res = await axios.get('accounts')
      return new Promise((resolve) => {
          commit('getAccounts', res.data)
          resolve()
          
      })
    },

    async getAcc ({ commit }, id ) {
      const res = await axios.get(`accounts/${id}`)
      return new Promise((resolve) => {
        commit('getAccount', res.data)
        resolve()
        
    })
    },

    async updateAcc ({ commit }, data ) {
      await axios.put(`accounts/${data.id}`, data.form)
      return new Promise((resolve) => {
        commit('updateAccount')
        resolve()
        
    })
    },

    async deleteAcc ({ commit }, id ) {
      try {
        await axios.delete(`accounts/${id}`)
        commit('deleteAccounts')
      } catch (error) {
        console.log(error)
      }
    },

    async createAcc ({ commit }, form ) {
      try {
        await console.log(form)
        await axios.post('accounts', form)
        commit('createAccounts')
      } catch (error) {
        console.log(error)
      }
    }
  },

  
  modules: {
  }
})
