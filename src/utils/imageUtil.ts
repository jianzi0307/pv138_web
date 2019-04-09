import Exif from 'exif-js'

/**
 * 图片压缩处理工具
 */
class ImageUtil {
  /**
   * 处理图片
   * @param file 文件
   * @param quality 质量 0~1
   */
  public async handle (file: File, quality: number = 0.1) {
    const self = this
    const orientation = await self.getOrientation(file)
    const fileReader: any = (window as any).FileReader
    return new Promise((resolve, reject) => {
      // 看支持不支持FileReader
      if (!file || !fileReader) {
        reject(new Error('false'))
      }
      if (/^image/.test(file.type)) {
        // 创建一个reader
        const reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = () => {
          const result: any = reader.result
          const img = new Image()
          img.src = result
          // 判断图片是否大于100K,是就压缩，反之直接上传
          if (result.length <= (100 * 1024)) {
            const contentType = self.base64ContentType(result)
            const realData = self.base64RealData(result)
            const blob = self.b64toBlob(realData, contentType)
            resolve(blob)
          } else {
            img.onload = () => {
              const baseData = self.compress(img, orientation, quality)
              const contentType = self.base64ContentType(baseData)
              const realData = self.base64RealData(baseData)
              const blob = self.b64toBlob(realData, contentType)
              resolve(blob)
            }
          }
        }
      }
    })
  }

  /**
   * base64转Blob
   * @param b64Data base64字符串
   * @param contentType string 类型
   * @param sliceSize 分片大小
   * @returns Blob 阿里上传图片需要Blob型
   */
  protected b64toBlob (b64Data: string, contentType: string = '', sliceSize: number = 512) {
    const byteCharacters = atob(b64Data)
    const byteArrays = []
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize)
      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }
    return new Blob(byteArrays, {
      type: contentType
    })
  }

  /**
   * dataUrl图片类型
   * @param b64Data base64字符串
   */
  protected base64ContentType (b64Data: string) {
    const block = b64Data.split(';')
    const contentType = block[0].split(':')[1]
    return contentType
  }

  /**
   * dataUrl中的base64数据
   * @param b64Data base64字符串
   */
  protected base64RealData (b64Data: string) {
    const block = b64Data.split(';')
    const realData = block[1].split(',')[1]
    return realData
  }

  /**
   * 去获取拍照时的信息，解决拍出来的照片旋转问题
   * @param file 文件对象
   */
  protected async getOrientation (file: any) {
    return new Promise((resolve, reject) => {
      Exif.getData(file, function () {
        // @ts-ignore
        const orientation = Exif.getTag(this, 'Orientation')
        resolve(orientation)
      })
    })
  }

  /**
   * 旋转图片
   * @param img 图片
   * @param direction 方向
   * @param canvas 画布
   */
  protected rotateImg (img: any, direction: string, canvas: any) {
    // 最小与最大旋转方向，图片旋转4次后回到原方向
    const minStep = 0
    const maxStep = 3
    if (img === null) return
    // img的高度和宽度不能在img元素隐藏后获取，否则会出错
    const height = img.height
    const width = img.width
    let step = 2
    if (step === null) {
      step = minStep
    }
    let express: any
    if (direction === 'right') {
      step++
      // 旋转到原位置，即超过最大值
      express = (step > maxStep && (step = minStep))
    } else {
      step--
      express = (step < minStep && (step = maxStep))
    }
    console.log(express)
    // 旋转角度以弧度值为参数
    const degree = step * 90 * Math.PI / 180
    const ctx = canvas.getContext('2d')
    switch (step) {
      case 0:
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
        break
      case 1:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, 0, -height)
        break
      case 2:
        canvas.width = width
        canvas.height = height
        ctx.rotate(degree)
        ctx.drawImage(img, -width, -height)
        break
      case 3:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, -width, 0)
        break
    }
  }

  /**
   * 压缩图片
   * @param img 图片
   * @param Orientation Orientation
   * @param quality 质量
   */
  protected compress (img: any, Orientation: any, quality: number = 0.1) {
    const canvas: any = document.createElement('canvas')
    const ctx: any = canvas.getContext('2d')
    // 瓦片canvas
    const tCanvas: any = document.createElement('canvas')
    const tctx: any = tCanvas.getContext('2d')
    const initSize = img.src.length
    let width = img.width
    let height = img.height
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio = width * height / 4000000
    if (ratio > 1) {
      console.log('大于800万像素')
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 如果图片像素大于100万则使用瓦片绘制
    let count = width * height / 400000
    if (count > 1) {
      console.log('超过100W像素')
      count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
      // 计算每块瓦片的宽和高
      const nw = ~~(width / count)
      const nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio,
            nh * ratio, 0, 0, nw, nh)
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height)
    }
    // 修复ios上传图片的时候 被旋转的问题
    if (Orientation !== '' && Orientation !== 1) {
      switch (Orientation) {
        case 6: // 需要顺时针（向左）90度旋转
          this.rotateImg(img, 'left', canvas)
          break
        case 8: // 需要逆时针（向右）90度旋转
          this.rotateImg(img, 'right', canvas)
          break
        case 3: // 需要180度旋转
          // 转两次
          this.rotateImg(img, 'right', canvas)
          this.rotateImg(img, 'right', canvas)
          break
      }
    }
    // 进行最小压缩
    const ndata = canvas.toDataURL('image/jpeg', quality)
    console.log('压缩前：' + initSize)
    console.log('压缩后：' + ndata.length)
    console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    return ndata
  }
}

export default new ImageUtil()
