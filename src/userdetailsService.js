import axios from "axios"
class UserDetailService{
    saveUserDetails(userdetails){
        return axios.post("http://localhost:9090/users",userdetails)
    }
    validateUser(mobileNumber, password) {
        return axios.get(`http://localhost:9090/users/${mobileNumber}/${password}`)
      }
      savePatient(illnesses) {
        return axios.post("http://localhost:9090/save_disease_details", { illness: illnesses });
    }


}
export default new UserDetailService()