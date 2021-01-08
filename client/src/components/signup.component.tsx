import React from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import moment from 'moment'

import { AuthService } from '../services/auth.service'
import { FormRow, ClassYearBlock } from '../helpers/form.component' 
import { Form } from '../helpers/types.helper'

export const RequirePop = () => {
  // TO DO: convert it into pop up.
  return(
    <span> 入力必須項目です </span>
  )
}

/**
 * Implement for birthday input form.
 * Precisely to say, there are not valid input patten.
 * Date validation is done when button is pushed in SingUpFrom.
 */

function DateContainer(
    props:{name:string, content:any, register:any}
){
  return(
    <div className="col--xs-4">
      <select
        className="form__control"
        name={props.name}
        ref={props.register}
      >
        {props.content}
      </select>
    </div>
  )
}

const DateBlock = (props:{register:any}) => {
  let years = [<option id="birth_year_default" value="default"> 年を選択 </option>]
  let months = [<option id="birth_month_default" value="default"> 月を選択 </option>]
  let days = [<option id="birth_date_default" value="default"> 日を選択 </option>]

  var i
  for(i = 1980; i<= 2020 ; i++){
    years.push( <option id={"birth_year" +i } value={i}> {i}年 </option>)
  }
  for(i = 1; i <= 12; i++){
    months.push( <option id={"birth_month" +i } value={i}> {i}月 </option>)
  }
  for(i = 1; i <= 31; i++){
    days.push( <option id={"birth_month" +i } value={i}> {i}日 </option>)
  }
  return(
    <div className="form__group">
      <div className="col--sm-4">
        <label className="form__label">
          生年月日
        </label>
      </div>
        <div className="col--sm-8 col--no-gutter">
          <DateContainer name="birth_year" 
            content={years} register={props.register}
            />
          <DateContainer name="birth_month" 
            content={months} register={props.register}
          />
          <DateContainer name="birth_day" 
            content={days} register={props.register}
          />
        </div>
    </div>

  )
}

/**
 * The main part of sing up form.
 * The each input form is set by othter react functions.
 * After input is completed, sign up process starts.
 * If validation process fails, the process of sending data is not run.
 */
const SignUpForm = () => {
  const { register, handleSubmit, errors, formState, control, watch } =
                            useForm<Form['SignUp']>({mode:'onBlur'})
  const history = useHistory()

  const handleSignUp = (data: Form['SignUp']) =>{
    // date validation is done here. .
    console.log(data)
    const date_str = `${data.birth_year}-${data.birth_month}-${data.birth_day}`
    const date_bool = moment(date_str, 'YYYY-M-D',true).isValid()
    if (!date_bool){
      alert("日付を正しく選択してください．")
      return
    }
    data.birthday = new Date(date_str)
    console.log(data.birthday)
    AuthService.signup(data)
    .then((res) =>{
      alert(res.msg)
      history.push('/')
    })
  }

  const password = watch("password", "")
  const require_str = "入力必須項目です．"
  const require_json = {required: require_str}
  return(
    <form
      className="form row"
      role="form"
      name="signup"
      onSubmit={handleSubmit(handleSignUp)}
    >
        <div className="panel">
          <div className="panel__body">
            <FormRow
              title="苗字"
              name="family_name"
              id="signupFamilyName"
              placeholder="苗字"
              errors={errors} register={register}
              reg_json={require_json}
            />
            <FormRow
              title="名前"
              name="given_name"
              id="signupGivenName"
              placeholder="名前"
              errors={errors} register={register}
              reg_json={require_json}
            />
            <FormRow
              title= "ニックネーム"
              name="handle_name"
              id="signupHandleName"
              placeholder="ニックネーム"
              errors={errors} register={register}
              reg_json={{
                required:require_str,
                validate:  AuthService.checkHandle
              }}
            />
            {/*TO DO: dropdown and checkbox implementation. */}
            <DateBlock register={register}/>
            <FormRow
              title="ELMSメール"
              type="email"
              name="email"
              id="signupEmail"
              placeholder="example@eis.hokudai.ac.jp"
              errors={errors} register={register}
              reg_json={{
                required: require_str,
                pattern:{
                  value: !/^[A-Z0-9._%+-]+@(eis|elms).hokudai.ac.jp$/i,
                  message:"@以下は(elms or eis).hokudai.ac.jpのみ有効です．"
                },
                validate: AuthService.checkEmail
              }}
            />
            <FormRow
              title="携帯メール (空欄可)"
              type="email"
              name=""
              id="signupBobileEmail"
              placeholder="example@gmail.com"
              errors={errors} register={register}
              reg_json={{ }}
            />
            <ClassYearBlock register={register} name='class_year'/>
            <FormRow
              title="パスワード"
              type="password"
              name="password"
              id="signupPassword"
              placeholder="パスワード"
              errors={errors} register={register}
              reg_json={{
                required: require_str,
                minLength: {
                  value: 4,
                  message: "パスワードは4文字以上で入力してください．"
               }
              }}
            />
            <FormRow
              title="パスワードの確認"
              type="password"
              name="reenteredPassword"
              id="signupReenteredPassword"
              placeholder="もう一度パスワードを入力"
              errors={errors} register={register}
              reg_json = {{
                  required: require_str,
                  validate:
                  (value:string) => {
                    return(value === password || "パスワードが一致しません．")
                  }
              }}
            />
            <div className="panel_foot">
              <div className="form__group">
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={!formState.isValid}
                > Sign UP </button>
              </div>
            </div>
          </div>
        </div>
    </form>
  )
}


/**
 * Main frame work of sign up page.
 */
const SignUp = () => {
  return(
    <div className="topfix">
      <div className="container">
          <div className="col--sm-10 col--sm-offset-1">
            <h1> ユーザー登録 </h1>
            <p>
               氏名は本名を入力してください。 <br />
               認証確認メールはELMSメールアドレス宛に送信されます。 <br />
               メール認証後、ログイン可能となるのは管理者の承認後になりますのでご注意ください。<br />
               不具合等ございましたら
               {/*TO DO: link new mail address. */}
              <a href="'hokumed.net@gmail.com'">hokumed.net@gmail.com</a>
               までご連絡ください。
            </p>
            <SignUpForm />
          </div>
      </div>
    </div>
  )
}

export { SignUp }
