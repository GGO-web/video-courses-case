import { AxiosResponse } from 'axios'
import Api from '../Api'

class CoursePreviewService extends Api {
  constructor (baseUrl: string) {
    super(baseUrl)
  }

  public async getCourse (courseId: string) {
    const response: AxiosResponse = await this.get(courseId)

    return response.data
  }
}

export default new CoursePreviewService('core/preview-courses')
