import nodemailer from 'nodemailer'
import express from 'express'
const app = express()

const API_URL = 'http://ik1-419-41929.vs.sakura.ne.jp'
const API_MAIL = 'hokumed.net@gmail.com'
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: API_MAIL,
    pass: app.get("MAIL_PW")
  }
})


function signupVerificationMail(
    to_mail: string,
    family: string,
    given: string,
    userID: number,
    token: string

  ){
  const mailOptions = {
    from: API_MAIL,
    to: to_mail,
    subject: "北医ネットへようこそ！",
    text: `${family} ${given} さん\n\n` +
    '北大医学科生専用ポータルサイト，"北医ネット"へようこそ．' +
    '当サイトは，学生全員の協力で成り立っているサイトです．その目的は，日々の勉強の'+
    '負担を軽減し学生生活をより充実したものにすることにあります．使用に当たっては，' +
    '以下の事を必ずお守りください．\n\n' +
    '・当サイトの存在を学生以外に口外しない．\n' +
    '・当サイトの資料を学生以外の目に晒さない．\n\n' +
    '上記が守られない場合，会員登録を取り消す場合があります．また，不適当だと判断される' +
    '資料は管理者が削除する可能性があります．同意して北医ネットを使用する場合，以下の' +
    '以下のURLからクリックしてください．管理者チームで学部在籍を確認次第，北医ネット' +
    'がご利用いただけます．\n\n' +
    `${API_URL}/api/user/activation/${userID}/${token}`
    // TO DO: replace with the domain.
  }
  console.log(process.env.HOKUI_PW)
  transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
}

function approvalNotification(
  to_mail: string,
  family: string,
  given: string,
){
  const mailOptions = {
    from: API_MAIL,
    to: to_mail,
    subject: '北医ネットへようこそ!',
    text: `${family} ${given} さん\n\n` +
    '北医ネットのユーザー登録が承認されました． 以下のURLからログインすることができます．\n\n'+
    `北医ネットを使って，有意義な学生生活を送りましょう．\n\n${API_URL}`
  }
  transporter.sendMail(mailOptions, (err, info)=>{
    if(err){
      console.log(err)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })

  const adminMailOptions = {
    from: API_MAIL,
    to: API_MAIL,
    subject: `承認確認メール: ${family} ${given} さん`,
    text: `${family} ${given} さんを管理者画面から承認しました．` +
    `${to_mail}に承認メールを送信しました．`  +
    'もし，このユーザーにメールが届いて居ない場合は，受診設定を確認してみてください．'
  }

  transporter.sendMail(adminMailOptions, (err, info)=>{
    if(err){
      console.log(err)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })


}

export { signupVerificationMail, approvalNotification }
