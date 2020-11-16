import axios from 'axios'
import * as fs from 'fs'
import * as FormData from 'form-data'
import * as https from 'https'
import concat = require('concat-stream')
import { IHttpInstance } from './Http'

/**
 * @description axios实现网络请求
 */
export class AxiosHttp implements IHttpInstance {
  get(url: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(url, options)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  getToResponse(url: string, options?: any): Promise<any> {
    return new Promise((resolve) => {
      axios
        .get(url, options)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          resolve(error.response)
        })
    })
  }

  post(url: string, data?: any, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data, options)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  postToResponse(url: string, data: string, options?: any): Promise<any> {
    return new Promise((resolve) => {
      axios
        .post(url, data, options)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          resolve(error.response)
        })
    })
  }

  put(url: string, data: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .put(url, data, options)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }

  putToResponse(url: string, data: string, options?: any): Promise<any> {
    return new Promise((resolve) => {
      axios
        .put(url, data, options)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          resolve(error.response)
        })
    })
  }

  delete(url: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, options)
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }

  deleteToResponse(url: string, options?: any): Promise<any> {
    return new Promise((resolve) => {
      axios
        .delete(url, options)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          resolve(error.response)
        })
    })
  }

  postWithCert(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpsAgent = new https.Agent({
        pfx: certFileContent,
        passphrase,
      })

      axios
        .post(url, data, { httpsAgent })
        .then((response) => {
          if (response.status === 200) {
            resolve(response.data)
          } else {
            reject(`error code ${response.status}`)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  upload(url: string, filePath: string, params?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let formData = new FormData()
      formData.append('media', fs.createReadStream(filePath))
      if (params) {
        formData.append('description', params)
      }
      formData.pipe(
        concat({ encoding: 'buffer' }, async (data) => {
          axios
            .post(url, data, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
            .then((response) => {
              if (response.status === 200) {
                resolve(response.data)
              } else {
                reject(`error code ${response.status}`)
              }
            })
            .catch((error) => {
              reject(error)
            })
        })
      )
    })
  }
}
