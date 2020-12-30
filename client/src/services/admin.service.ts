import axios from 'axios'
import { authHeader } from './auth-header'
import { Subject, Class_Year, SemesterSubjects } from '../entity/study.entity'
import { Notification } from '../entity/notification.entity'
import { User } from '../entity/user.entity'

const API_URL = '/api/admin/'

class AdminService {
  static async getUserBoard() {
    return axios.get<{users:User[], status:number}>
                    (API_URL + 'user', { headers: authHeader() })
  }

  static async getUserDetail(id: number) {
    return axios.get<{user:User, status:number}>
                    (API_URL + `user/${id}`, {headers: authHeader()})
  }

  static async changeApproveStatus(id: number){
    return axios.get(API_URL + `approve/${id}`, {headers: authHeader()})
    .then( res => {return(res.data)} )
    .catch( err =>  console.log(err))
  }

  static async deleteUser(id: number){
    return axios.get(API_URL + `delete/${id}`, {headers: authHeader()})
    .then( res => {return(res.data)} )
    .catch( err =>  console.log(err))
  }

  static async changeAdminStatus(id: number){
    return axios.get(API_URL + `change-admin/${id}`, {headers: authHeader()})
    .then( res => {return(res.data)} )
    .catch( err =>  console.log(err))
  }

  static async getSubjectBoard(){
    return axios.get<{subjects:Subject[], status:number}>
                  (API_URL + 'subject', {headers:authHeader()})
  }

  static async getClassYearBoard(){
    return axios.get<{years:Class_Year[], status:number}>
                  (API_URL + 'year', {headers:authHeader()})
  }

  static async getNotificationBoard(){
    return axios.get<{notifications:Notification[], status:number}>
                  (API_URL + 'notification', {headers:authHeader()})
  }

  static async getSemesterBoard(){
    return axios.get<{semesters:SemesterSubjects[], status:number}>
                  (API_URL + 'semester', {headers:authHeader()})
  }
}


export { AdminService }
