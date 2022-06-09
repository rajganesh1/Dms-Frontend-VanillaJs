class login{
    constructor(form,fields){
        this.form=form;
        this.fields=fields;
        this.validateOnSubmit();
    }

    validateOnSubmit(){
        let self=this;

        this.form.addEventListener("submit",(e)=>{
            e.preventDefault();
            var error=0;
            let email = '';
            let password = '';

            self.fields.forEach((field)=>{
                const input=document.querySelector(`#${field}`);
                if(self.validateFields(input)==false){
                    error++;
                }
                if(field == 'email') {
                    email = input.value.trim();
                }
                if(field == 'password') {
                    password = input.value.trim();
                }
            });
            if(error == 0){
                console.log("success");
                let api = `v1/login/${email}/${password}`;
                fetch(`http://localhost:6002/${api}`, { method: 'GET'}).then((response) => {
                    return response.json();
                }).then((data) => {
                    localStorage.setItem("id",data.id);
                    localStorage.setItem("accessToken",data.accessToken);
                    this.form.submit();
                }).catch(function (err) {
                    let elm = document.getElementsByClassName('validation-error-message');
                    elm[0].innerHTML = 'Invalid username or password';
                    console.warn('Something went wrong.', err);
                });
            }
        });
    }

    validateFields(field){
        if(field.value.trim() === ""){
            this.setStatus(
                field,
                `${field.previousElementSibling.innerText} cannot be blank`,"error"
            );
            return false;
        }
        else{
            if(field.type === "password"){
                if(field.value.length < 8){
                    this.setStatus(
                        field,
                        `${field.previousElementSibling.innerText} must be atleast 8 characters`,"error"
                    );
                    return false;
                }
                else{
                    this.setStatus(field, null, "success");
                    return true;
                }
            }
            else{
                this.setStatus(field, null, "success");
                return true;
            }
        }
    }
    setStatus(field,message,status){
        const errorMessage = field.parentElement.querySelector(".error-message");
        if(status === "success"){
            if(errorMessage){
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }
        if(status === "error"){
            errorMessage.innerText=message;
            field.classList.add("input-error");
        }
    }
}

const form=document.querySelector(".loginForm");
if(form){
    const fields=["email","password"];
    const validator=new login(form,fields);
}
