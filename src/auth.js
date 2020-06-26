
import Cookies from 'js-cookie'

var data_logged = {
    is_logged : false,
    token:'',
    path:''
}

function login(data_token,N) {
    Cookies.set('Tdata', {
        is_logged : true,
        tk:data_token,
        path:'',
        Num:N
    }, /* { expires: 0.00012 } */)
    window.location.replace('/')
}

export default data_logged

export { login }
