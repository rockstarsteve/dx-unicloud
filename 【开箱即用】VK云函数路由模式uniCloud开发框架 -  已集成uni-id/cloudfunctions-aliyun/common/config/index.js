module.exports = {
	"uni":{
		"passwordSecret": "passwordSecret",			// 加密密码所用的密钥
		"tokenSecret": "tokenSecret",						// 生成token所用的密钥
		"tokenExpiresIn": 2592000,							// 全平台token过期时间，未指定过期时间的平台会使用此值
		"tokenExpiresThreshold": 3600,					// 新增于uni-id 1.1.7版本，checkToken时如果token有效期小于此值则自动获取新token，如果不配置此参数则不开启自动获取新token功能
		"passwordErrorLimit": 6,								// 密码错误最大重试次数
		"bindTokenToDevice": false,							// 是否将token和设备绑定，设置为true会进行ua校验
		"passwordErrorRetryTime": 3600,					// 密码错误重试次数超限之后的冻结时间
		"autoSetInviteCode": true,							// 是否在用户注册时自动设置邀请码
		"forceInviteCode": false,								// 是否强制用户注册时必填邀请码，默认为false（需要注意的是目前只有短信验证码注册才可以填写邀请码）
		"app-plus": {
			"tokenExpiresIn": 2592000, 						// app端 token过期时间
			"oauth" : {
				// App微信登录所用到的appid、appsecret需要在微信开放平台获取，注意：不是公众平台而是开放平台
				"weixin" : {
					"appid" : "",
					"appsecret" : ""
				}
			}
		},
		"mp-weixin": {
			"oauth" : {
				// 微信小程序登录所用的appid、appsecret需要在对应的小程序管理控制台获取
				"weixin" : {
					"appid" : "",
					"appsecret" : ""
				}
			}
		},
		"mp-alipay": {
			"oauth" : {
				// 支付宝小程序登录用到的appid、privateKey请参考支付宝小程序的文档进行设置或者获取，https://opendocs.alipay.com/open/291/105971#LDsXr
				"alipay" : {
					"appid" : "",
					"privateKey" : ""
				}
			}
		},
		"service": {
			"sms": {
				"name": "重要",																		// 应用名称，对应短信模版的name
				"codeExpiresIn": 180,															// 验证码过期时间，单位为秒，注意一定要是60的整数倍
				"smsKey": "你的smsKey",														// 短信密钥key，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
				"smsSecret": "你的smsSecret"												// 短信密钥secret，开通短信服务处可以看到 https://dev.dcloud.net.cn/uniSms
			}
		}
	},
	"vk":{
		"service": {
			// 邮箱发送服务
			"email": {
				// qq邮箱参数配置
				"qq": {
					"host": "smtp.qq.com",
					"port": 465,
					"secure": true,
					"auth": {
						"user": "你的邮箱@qq.com",
						"pass": "邮箱授权码"
					}
				},
			},
			// 短信服务
			"sms": {
				// 阿里云短信服务
				"aliyun": {
					"accessKeyId": "",															// 短信密钥key
					"accessKeySecret": "",													// 短信密钥secret
					"endpoint":"https://dysmsapi.aliyuncs.com",			// api请求地址
					"apiVersion":"2017-05-25",																
					"SignName":"", 																	// 默认签名
					"TemplateCode":{
						"verifyCode":""																// 验证码短信模板 - 配合uni-id需要
					}
				}
			}
		},
		"db":{
			"unicloud":{
				"max_limit" : 500 // 最大limit限制(目前腾讯云最大1000,阿里云最大500)
			}
		}
	}
};
