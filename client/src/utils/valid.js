const valid = ({email,password, fullname,username,confirm_password}) => {
    const err = {}
        if(!fullname) {
            err.fullname = "Please add your Full Name"
        }
        if(!username){
            err.username = "Please input your username"
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email) {
            err.email = "Please Input your email address" 
        }
        else if(re.test(String(email).toLowerCase())===false){
            err.email = "Please Input a valid Email";
        }

        var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        if(!password) {
            err.password = "Please Input your Password" 
        }
        else if(password.length < 8){
            err.password = "Password must contain at least 8 characters"
        }
        else if(reg.test(password)===false){
            err.password = "Password must Contain At Least One Capital Alphabet One small case alphabet A number And A Specail Character";
        }

        if(password !== confirm_password) {
            err.confirm_password = "Confirm Password And Password Do not Match" 
        }
        return {
            errMessage: err,
            errLength: Object.keys(err).length
        }
}

export default valid;