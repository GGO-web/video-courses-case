import axios, { AxiosError } from 'axios'
import { notification } from 'ant-design-vue'
import { ACCESS_TOKEN } from '../constants/consts'
import AuthenticationService from '~/services/authentication'

export const axiosApiInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + import.meta.env.VITE_API_VERSION,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
})

const requestInterceptorHandler = (config: any) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN)

  if (accessToken) {
    config.headers!.Authorization = `Bearer ${accessToken}`
  }

  return config
}

const responseErrorHandler = (error: AxiosError<any>) => {
  if (
    error.response?.status === 400 ||
    error.response?.status === 403 ||
    error.response?.data.responseStatus === 'INVALID_CREDENTIALS_EXCEPTION'
  ) {
    const details = error.response.data.details
    const detailsMessages = details
      ? Object.entries(details).map(([key, value]) => `${key}: ${value}`)
      : null

    notification.error({
      message: detailsMessages || error.response.data.message
    })
  }
}

axiosApiInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (error.response?.status === 401) {
      const originalRequest = error.config

      try {
        const authToken = await AuthenticationService.getToken()

        if (authToken) {
          localStorage.setItem(ACCESS_TOKEN, authToken)
        }

        return axiosApiInstance({
          url: originalRequest.url,
          baseURL: originalRequest.baseUrl,
          data: originalRequest.data
            ? JSON.parse(originalRequest.data)
            : originalRequest.data,
          method: originalRequest.method,
          params: originalRequest.params
        })
      } catch (e) {
        return Promise.reject(error)
      }
    }

    responseErrorHandler(error)

    return Promise.reject(error)
  }
)

axiosApiInstance.interceptors.request.use(requestInterceptorHandler)
