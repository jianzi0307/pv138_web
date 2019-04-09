import OSS from 'ali-oss'
import imageUtil from '@/utils/imageUtil'

/**
 * STS令牌
 */
interface StsToken {
  // AccessKeyId
  AccessKeyId: string
  // AccessKeySecret
  AccessKeySecret: string
  // 令牌
  SecurityToken: string
  // 过期时间
  Expiration: string
  // 端点
  Endpoint: string
  // 桶
  Bucket: string
}

/**
 * SSO操作类
 * @author jianzi0307@gmail.com
 * 使用方法：
 *  import { AliOssClient } from '@/utils/oss'
 *  let client = new AliOssClient(<stsToken>)
 */
class AliOssClient {
  private readonly endPoint: string
  private readonly region: string
  private readonly bucket: string
  private oss: OSS

  /**
   * 构造函数
   * @param stsToken STS令牌
   */
  constructor(stsToken: StsToken) {
    this.endPoint = stsToken.Endpoint
    this.region = this.endPoint.split('//')[1].split('.')[0] // 'oss-cn-beijing'
    this.bucket = stsToken.Bucket
    this.oss = new OSS({
      region: this.region,
      accessKeyId: stsToken.AccessKeyId,
      accessKeySecret: stsToken.AccessKeySecret,
      stsToken: stsToken.SecurityToken,
      bucket: stsToken.Bucket
    })
  }

  /**
   * 规范化上传对象到OSS
   * @see http://confluence.hxq.cn/pages/viewpage.action?pageId=1376702
   * @param type 分类：prescriptionOffline医疗机构，advisory问诊单，im融云聊天
   * @param objectName 对象名：日期/文件名，例如：20181119/20181119121212123.jpg
   * @param file 文件对象
   */
  public async putObject(type: string, objectName: string, file: File) {
    const self = this
    const fileName = 'data/' + process.env.VUE_APP_SYSTEMIDENTIFIER + '/' +
      process.env.VUE_APP_ENV + '/' +
      type + '/' + objectName
    const f = await imageUtil.handle(file, 0.8)
    return new Promise((resolve, reject) => {
      self.oss.put(fileName, f).then((result: any) => {
        resolve(result)
      }).catch((err: any) => reject(err))
    })
  }

  /**
   * 上传对象到OSS
   * @param objectName 对象名
   * @param file 文件对象
   */
  public async orgPutObject(objectName: string, file: File) {
    const self = this
    const f = await imageUtil.handle(file, 0.8)
    return new Promise((resolve, reject) => {
      self.oss.put(objectName, f).then((result: any) => {
        resolve(result)
      }).catch((err: any) => reject(err))
    })
  }

  /**
   * 拼接资源URL
   * 需要bucket读写权限为公共读
   * @param objectName 对象名
   */
  public async getObjectUrl(objectName: string) {
    return `https://${this.bucket}.${this.region}.aliyuncs.com/${objectName}`
  }

  /**
   * 带签名的资源URL
   * 无需bucket读写权限为公共读
   * @param objectName 对象名
   */
  public async generatePresignedUri(objectName: string) {
    return this.oss.signatureUrl(objectName)
  }
}

export {
  AliOssClient
}
