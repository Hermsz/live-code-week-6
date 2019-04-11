let baseUrl = `http://localhost:3000`

new Vue({

  el: "#app",
  data: {
    joke: [],
    isLogin: false,
    email_login: "",
    password_login: ""
  },

  methods: {
    signIn() {
      console.log('masuk client js sign in')
      axios
      .post(`${baseUrl}/login`, {
        email: this.email_login,
        password: this.password_login
      })
      .then(({ data }) => {
        console.log("masuk client js then", data)
        localStorage.setItem('token', data.token)
        this.isLogin = true
      })
      .catch(err => {
        console.log(err.message);
      })

    },

    signOut() {
      Swal.fire({
        title: `Logging out ?`,
        type:'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sign Out'
      })
      .then(selected => {
        console.log(selected.value)
        if(selected.value) {
          Swal.fire({
            type: 'success',
            title: 'Log out success',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.clear()
          this.isLogin = false
        }
      })
    },

    getRandomJoke() {
      axios
        .get(`${baseUrl}/jokes`, {
          headers: {
            Accept: "application/json",
            token: localStorage.getItem('token')
          }
        })
        .then(({ data }) => {
          console.log(data, 'masuk  success data nya ---------')
          // belum dapet joke yang bener
          // this.joke = data
        })
        .catch(err => {
          console.log('Masuk error getRandomJoke()')
          console.log(err.messaqge)
        })
    }

  },

  computed: {

  },

  created: function() {
    if(localStorage.getItem('token')) {
      this.isLogin = true
      this.getRandomJoke()
    }
  }

})