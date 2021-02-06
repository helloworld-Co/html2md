const codes = {
  success: 1
}

export default function ({ $axios, store, redirect, req }) {
  // 添加请求拦截器
  $axios.onRequest((req) => {

  })

  // 添加响应拦截器
  $axios.onResponse((res) => {
    return new Promise((resolve, reject) => {
      const { data = {} } = res
      if (data.code === codes.success) { // 成功
        resolve(data)
        return
      }

      reject(res)
    })
  })
}
