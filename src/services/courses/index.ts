import { AxiosResponse } from 'axios'
import Api from '../Api'

class CoursesService extends Api {
  constructor (baseUrl: string) {
    super(baseUrl)
  }

  public async getCourses () {
    const response: AxiosResponse = await this.get('preview-courses')
    return response.data.courses
  }
}

export default new CoursesService('core')
