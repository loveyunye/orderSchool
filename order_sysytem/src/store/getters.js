const getters = {
  token: state => state.user.token,
  name:state => state.user.name,
  userMess:state => state.user.accountMess
}

export default getters