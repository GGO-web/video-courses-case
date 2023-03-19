import { axiosApiInstance } from '~/api'

class AuthenticationService {
  async getToken () {
    const { data: { token } } =
      await axiosApiInstance.get(
        '/auth/anonymous',
        {
          params: {
            platform: 'subscriptions'
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
          }
        }
      )

    return token
  }
}

export default new AuthenticationService()
